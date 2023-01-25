const { connection_error } = require("../../lib/common/error")
const redisClient = require("../../lib/common/redis.util")

const logout=async(id)=>{
    let logOutResult
    try{
        logOutResult = await redisClient.del(id)
    }catch(err){
        throw new Error(connection_error.SERVICE_DEL_USER_IP_ERROR)
    }
    return logOutResult
}

module.exports={
    logout
}