const httpStatus = {
    ok:200,
    created:201,
    invalid_token:401,
    not_accept:406,
    expired_token:419,
    server_error:500,
}

const controller_error ={
    LOGIN_ERROR:{
        message :"LOGIN_ERROR",
        status:406
    },
    ACOUNT_ERROR:{
        message:"ACOUNT_ERROR",
        status:404
    },
    ACOUNT_ERROR:{
        message:"ACOUNT_ERROR",
        status:404
    },
    ACOUNT_ERROR:{
        message:"ACOUNT_ERROR",
        status:404
    },
    ACOUNT_ERROR:{
        message:"ACOUNT_ERROR",
        status:404
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