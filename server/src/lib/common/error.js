const httpStatus = {
    ok:400,
    created:201,
    invalid_token:401,
    not_accept:406,
    expired_token:419,
    server_error:500,
}


const connection_error={
    INVALID_REQUEST: "invalid request",
    CONTROLLER_LOGIN_ERROR:"controller error to login",
    CONTROLLER_ACOUNT_ERROR:"controller error to acount",
    CONTROLLER_SEND_ACOUNT_MAIL_ERROR:"controller error to send acount mail",
}

const controller_error ={
    CONTROLLER_SEND_FIND_ID_MAIL_ERROR:{
        message:"controller error to send find id mail",
        status:httpStatus.not_accept
    },
    CONTROLLER_SEND_FIND_PW_MAIL_ERROR:{
        message:"controller error to send find pw mail",
        status:httpStatus.not_accept
    },
    CONTROLLER_CHANGE_PW_ERROR:{
        message:"controller error to change pw mail",
        status:httpStatus.not_accept
    },
}

const service_error={
    SERVICE_SAVE_USER_ERROR:{
        message:"Can not save user data in dataBase.",
        status:httpStatus.server_error
    },
    SERVICE_GET_USER_BY_ID_ERROR:{
        message:"Can not get user data by id.",
        status:httpStatus.server_error
    },
    SERVICE_GET_USER_BY_EMAIL_ERROR:{
        message:"Can not get user data by email.",
        status:httpStatus.server_error
    },
    SERVICE_GET_PW_DATA_ERROR:{
        message:"Can not get password data.",
        status:httpStatus.server_error
    },
    SERVICE_CHANGE_PW_ERROR:{
        message:"Can not change password.",
        status:httpStatus.server_error
    },
}

const lib_error={
    EXPIRED_TOKEN:{
        message:"만료된 토큰입니다.",
        status:httpStatus.expired_token
    },
    INVALID_TOKEN:{
        message:"유효하지 않은 토큰입니다.",
        status:httpStatus.invalid_token
    },
}

module.exports={
    ...connection_error,
    ...controller_error,
    ...service_error,
    ...lib_error,
}