const httpStatus = {
    ok:200,
    created:201,
    invalid_token:401,
    not_accept:406,
    expired_token:419,
    server_error:500,
}

const controller_error ={
    CONTROLLER_LOGIN_ERROR:{
        message :"controller error to login",
        status:httpStatus.not_accept
    },
    CONTROLLER_ACOUNT_ERROR:{
        message:"controller error to acount",
        status:httpStatus.not_accept
    },
    CONTROLLER_SEND_ACOUNT_MAIL_ERROR:{
        message:"controller error to send acount mail",
        status:httpStatus.not_accept
    },
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
    SERVICE_GET_USER_BY_ID:{
        message:"Can not get user data by id.",
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
    ...controller_error,
    ...service_error,
    ...lib_error,
}