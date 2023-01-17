
const request = require('../request/index.cjs');
const jwt = require('jsonwebtoken');
const payloadDefines = require('../../../types/payload.cjs');
const logger = require('../config/winston.cjs');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// enum
const AviewUrl = {
    AVIEW_STATUS: 'res/product.json',
    AUTHENTICATE_ACCESS_TOKEN: 'api/v1/auth/authenticate/access-token',
    GET_NODES: 'api/v1/mgmt/nodes',
    GET_CONNECTED_SERVERS: 'api/v1/registry/connected-servers',
    GET_DICOMSCPS: 'api/v1/mgmt/dicomscps',
    GET_DATA_STORAGES: 'api/v1/mgmt/datastorages',
    GET_LOW_DISK_LIMIT: 'api/v1/mgmt/env/site/SitePolicy.LowDiskSpaceAlert',
    GET_VOLUME_DISK: 'config/incoming-volumedisk' // /api/v1/data/{proxy_token}/config/volumedisks
};

const ErrorMessage = {
    CANNOT_CONNECTED: 'AVIEW 서버와 정상적으로 연결되지 않았습니다.',
    CANNOT_GENERATE_TOKEN: '토큰 생성에 실패했습니다.(recommend Retry)',
    INVALID_AUTH_TOKEN: '유효하지 않는 토큰입니다.(Wrong Secret Key)',
    CANNOT_GET_CONNECTED_SERVERS: 'ConnectedServers를 가져오기에 실패했습니다.',
    CANNOT_GET_NODES: 'Nodes를 가져오기에 실패했습니다.',
    CANNOT_GET_DICOMSCPS: 'DicomScps를 가져오기에 실패했습니다.',
    CANNOT_GET_STORAGES: 'Storages를 가져오기에 실패했습니다.',
    CANNOT_GET_STORAGES_SIZE: 'Storage Size를 가져오기에 실패했습니다.',
    INVALID_INPUT_FORM: '필요한 parameter가 존재하지 않습니다.'
};
const ServerType = {
    DATA: 'data',
    IMPORT: 'import',
    DICOMSCP: 'dicomscp'
};

Object.freeze(AviewUrl);
Object.freeze(ErrorMessage);
Object.freeze(ServerType);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Get  Aview Status
/**
 * @param {string} baseUrl
 * @return {Promise<boolean>}
 */
const isConnectedAview = async (baseUrl) => {
    if (!baseUrl) {
        logger.error(ErrorMessage.INVALID_INPUT_FORM);
        return false;
    }
    try {
        const url = `${baseUrl}/${AviewUrl.AVIEW_STATUS}`;
        await request(url, 'GET');
    } catch (err) {
        logger.error(ErrorMessage.CANNOT_CONNECTED.concat(JSON.stringify(err.message)));
        return false;
    }
    return true;
};

// Generate & authentication token
/**
 * @param {string} baseUrl
 * @param {string} secretKey
 * @return {Promise<payloadDefines.Authenticate|undefined>}
 */
const getAccessToken = async (baseUrl, secretKey) => {
    if (!baseUrl || !secretKey) {
        logger.error(ErrorMessage.INVALID_INPUT_FORM);
        return undefined;
    }
    /** @type {payloadDefines.Authenticate} */
    const authenticate = {};

    // generate token by secretKey
    const accessToken = await _generateToken(secretKey);
    if (accessToken === undefined) {
        logger.error(ErrorMessage.CANNOT_GENERATE_TOKEN);
        authenticate.err_not_generated = true;
        return authenticate;
    }

    // authentication token
    try {
        const url = `${baseUrl}/${AviewUrl.AUTHENTICATE_ACCESS_TOKEN}`;
        await request(url, 'POST', undefined, { access_token: accessToken });
    } catch (err) {
        logger.error(ErrorMessage.INVALID_AUTH_TOKEN.concat(JSON.stringify(err.message)));

        if (!_isJson(err.message)) authenticate.err_system = true;
        else authenticate.err_invalid = true; //cant make auth token from external token: signature is invalid"

        return authenticate;
    }
    authenticate.access_token = accessToken;
    return authenticate;
};

// Result Aview Status - node/dicomscp/storage
/**
 * @param {string} baseUrl
 * @param {string} accessToken
 * @return {Promise<payloadDefines.ResultAviewStatus>}
 */
const resultAviewStatus = async (baseUrl, accessToken) => {
    if (!baseUrl || !accessToken) {
        logger.error(ErrorMessage.INVALID_INPUT_FORM);
        return { nodes: undefined, dicomScps: undefined, storages: undefined };
    }
    // get node status
    const nodes = await _getNodesStatus(baseUrl, accessToken);
    // get connectedServers status
    const connectedServers = await _getConnectedServers(baseUrl, accessToken);
    // get dicomScps status
    const dicomScps = await _getDicomScpsStatus(baseUrl, accessToken, connectedServers);
    // get storage status
    const storages = await _getStoragesStatus(baseUrl, accessToken, connectedServers);
    return { nodes, dicomScps, storages };
};

// Get Nodes Status
/**
 * @param {string} baseUrl
 * @param {string} accessToken
 * @return {Promise<payloadDefines.NodesStatus|undefined>}
 */
const _getNodesStatus = async (baseUrl, accessToken) => {
    /** @type {any} */
    let currentNodes;
    try {
        const url = `${baseUrl}/${AviewUrl.GET_NODES}`;
        currentNodes = await request(url, 'GET', accessToken);
    } catch (err) {
        logger.error(ErrorMessage.CANNOT_GET_NODES.concat(JSON.stringify(err.message)));
        return undefined;
    }

    /** @type {payloadDefines.Node[]} */
    const nodes = currentNodes.items;
    // Node Connected 비교
    /** @type {payloadDefines.Node[]} */
    const connecteds = [];
    /** @type {payloadDefines.Node[]} */
    const disconnecteds = [];

    // classifed seperate nodes
    for (const { name, node_key, connected } of nodes) {
        const node = { name, node_key };
        connected ? connecteds.push(node) : disconnecteds.push(node);
    }

    return { connecteds, disconnecteds };
};

// Get connected-servers
/**
 * @param {string} baseUrl
 * @param {string} accessToken
 * @return {Promise<Map<string, string>|undefined>}
 */
const _getConnectedServers = async (baseUrl, accessToken) => {
    /** @type {any} */
    let connectedServerList;
    try {
        const url = `${baseUrl}/${AviewUrl.GET_CONNECTED_SERVERS}`;
        connectedServerList = await request(url, 'GET', accessToken);
    } catch (err) {
        logger.error(ErrorMessage.CANNOT_GET_CONNECTED_SERVERS.concat(JSON.stringify(err.message)));
        return undefined;
    }
    // server filter data|import|dicomscp
    const filteredServers = connectedServerList.items.filter(({ name }) => {
        return name === ServerType.DATA || name === ServerType.IMPORT || name === ServerType.DICOMSCP;
    });

    // ConnectedServer set map
    let connectedServers = new Map(); //token, name

    // classifed type
    filteredServers.forEach(({ token, name }) => {
        connectedServers.set(token, name);
    });
    return connectedServers;
};

// Get DicomScps Status
/**
 * @param {string} baseUrl
 * @param {string} accessToken
 * @param {Map<string, string>|undefined} connectedServers
 * @return {Promise<payloadDefines.DicomScpsStatus|undefined>}
 */
const _getDicomScpsStatus = async (baseUrl, accessToken, connectedServers) => {
    if (!connectedServers) return undefined;
    /** @type {any} */
    let currentDicomScps;
    try {
        const url = `${baseUrl}/${AviewUrl.GET_DICOMSCPS}`;
        currentDicomScps = await request(url, 'GET', accessToken);
    } catch (err) {
        logger.error(ErrorMessage.CANNOT_GET_DICOMSCPS.concat(JSON.stringify(err.message)));
        return undefined;
    }

    /** @type {payloadDefines.DicomScp[]} */
    const dicomScps = currentDicomScps.items;

    /** @type {payloadDefines.DicomScp[]} */
    const connecteds = [];

    /** @type {payloadDefines.DicomScp[]} */
    const disconnecteds = [];

    if (dicomScps.length === 0) return { connecteds, disconnecteds };

    // classfied seperate dicomScps
    for (const { ae_title, ip_address, port, token } of dicomScps) {
        const dicomScp = { ae_title, ip_address, port };
        connectedServers.has(token ?? '') ? connecteds.push(dicomScp) : disconnecteds.push(dicomScp);
    }

    return { connecteds, disconnecteds };
};

// Get Storages Status
/**
 * @param {string} baseUrl
 * @param {string} accessToken
 * @param {Map<string, string>|undefined} connectedServers
 * @return {Promise<payloadDefines.StoragesStatus|undefined>}
 */
const _getStoragesStatus = async (baseUrl, accessToken, connectedServers) => {
    if (!connectedServers) return undefined;
    /** @type {any} */
    let currentStorages;

    // get storage list
    try {
        const storageUrl = `${baseUrl}/${AviewUrl.GET_DATA_STORAGES}`;
        currentStorages = await request(storageUrl, 'GET', accessToken);
    } catch (err) {
        logger.error(ErrorMessage.CANNOT_GET_STORAGES.concat(JSON.stringify(err.message)));
        return undefined;
    }

    // get storage + disk
    /** @type {payloadDefines.Storage[]} */
    let storages = [];
    try {
        // get lowDiskLimit
        const lowDiskUrl = `${baseUrl}/${AviewUrl.GET_LOW_DISK_LIMIT}`;
        /** @type {any} */
        const lowDiskLimit = await request(lowDiskUrl, 'GET', accessToken);

        // get storage size & compare to limit disk
        const setStorageSize = currentStorages.items.map(async (storage) => {
            const diskSizeUrl = `${baseUrl}/api/v1/data/${storage.data_token}/${AviewUrl.GET_VOLUME_DISK}`;
            /** @type {any} */
            const { disk_total_size_mib, disk_used_size_mib } = await request(diskSizeUrl, 'GET', accessToken);

            // disk sive vs LowdiskLimit
            const isLowDisk = _isWarningDisk(disk_total_size_mib, disk_used_size_mib, lowDiskLimit.value);

            /** @type {payloadDefines.Storage} */
            const s = { ...storage };

            if (isLowDisk) {
                const low_disk = {
                    low_disk: {
                        disk_total_size_mib,
                        disk_used_size_mib
                    }
                };
                s.warnings = low_disk;
            }
            return s;
        });
        storages = await Promise.all(setStorageSize);
    } catch (err) {
        logger.error(ErrorMessage.CANNOT_GET_STORAGES_SIZE.concat(JSON.stringify(err.message)));
        storages = currentStorages.items.map((storage) => {
            /** @type {payloadDefines.Storage} */
            const s = {
                ...storage,
                warnings: {
                    low_disk: { err_system: true }
                }
            };
            return s;
        });
    }

    // Storages Data setting
    /** @type {payloadDefines.Storage[]} */
    const connecteds = [];

    /** @type {payloadDefines.Storage[]} */
    const disconnecteds = [];

    // connected disconnected
    for (const { name, data_token, import_token, warnings } of storages) {
        /** @type {payloadDefines.Storage} */
        const storage = {
            name,
            connected_data: data_token ? connectedServers.has(data_token) : false,
            connected_import: import_token ? connectedServers.has(import_token) : false,
            warnings
        };

        if (!storage.connected_data || !storage.connected_import) disconnecteds.push(storage);
        else connecteds.push(storage);
    }

    return { connecteds, disconnecteds };
};

// check currentDisk > limit
/**
 * @param {number} totalSize
 * @param {number} usedSize
 * @param {number} limitPercent
 * @return {boolean}
 */
const _isWarningDisk = (totalSize, usedSize, limitPercent) => {
    const usedSizePercent = Math.ceil((usedSize / totalSize) * 100);
    if (100 - usedSizePercent <= limitPercent) {
        return true;
    }
    return false;
};

// Generate Access Token
/**
 * @param {string} secretKey
 * @return {Promise<string|undefined>}
 */
const _generateToken = async (secretKey) => {
    // jwt set payload, secretkey, options(expireData)
    const payload = {
        payload: {
            email: 'test@aview.external',
            username: 'tester',
            display_name: 'External User',
            access_level: 600,
            permission: null
        }
    };
    const key = {
        secretKey: secretKey //settingData.auth_secret_key
    };
    const signOptions = {
        expiresIn: 7258089661 // 2200년 1월 1일
    };
    return new Promise((resolve, reject) => {
        jwt.sign(payload, key.secretKey, signOptions, (err, encoded) => {
            if (err) {
                logger.error(ErrorMessage.CANNOT_GENERATE_TOKEN);
                return undefined;
            }
            resolve(encoded);
        });
    });
};

// token에서 나온 error가 aview 에러인지, 통신 에러인지 구별하기 위한 함수
/**
 * @param {string} str
 * @return {boolean}
 */
const _isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (err) {
        return false;
    }
    return true;
};

module.exports = {
    isConnectedAview,
    getAccessToken,
    resultAviewStatus
};