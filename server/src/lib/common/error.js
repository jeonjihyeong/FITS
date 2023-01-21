const httpStatus = {
    ok:400,
    created:201,
    invalid_token:401,
    not_accept:406,
    expired_token:419,
    server_error:500,
}
/*
    server_warning : 서버 요청이 이상하거나 필요값이 들어오지 않았을때 - warn으로 로깅,
    logic_error: 올바른 로직이지만 정상흐름이 아닌 경우 - 클라이언트로 전송해야 하는 에러,
    connection_error: 파일간 또는 db와의 통신에러 - undefined 를 보내서 프론트에서 처리
    authentication_error: 인증오류 토큰에 대한 부분 / (이 경우에는 인터셉터 처리를 위해 401에러를 날려야 함)
*/

const server_warning={
    INVALID_REQUEST_WARN: "Invalid request",
    DUPLICATE_LOGIN_WARN: "Other browser use this id",

}

const connection_error={
    CONTROLLER_LOGIN_ERROR:"CONTROLLER ERROR : login error",
    CONTROLLER_SIGN_UP_ERROR:"CONTROLLER ERROR : acount error",
    CONTROLLER_SEND_SIGN_UP_MAIL_ERROR:"CONTROLLER ERROR : send acount mail error",
    CONTROLLER_SEND_FIND_ID_MAIL_ERROR:"CONTROLLER ERROR : send find id mail error",
    CONTROLLER_SEND_FIND_PW_MAIL_ERROR:"CONTROLLER ERROR : send find pw mail error",
    CONTROLLER_CHANGE_PW_ERROR:"CONTROLLER ERROR : change pw.",


    SERVICE_GET_USER_DATA_ERROR : "SERVICE ERROR[login] : Can not get user Data.",
    SERVICE_GET_IP_ERROR : "SERVICE ERROR[_CheckDuplicateLogin] : Can not get Ip in redis.",
    SERVICE_SET_LOGIN_DATA_ERROR : "SERVICE ERROR[login]: Can not set login Data in redis.",
    SERVICE_DUPLICATE_CHECK_ERROR : "SERVICE ERROR : Can not check Duplicate Id",
    SERVICE_SET_SIGN_UP_ERROR :"SERVICE ERROR : Can not save user in DB.",
    SERVICE_SEND_SIGN_UP_MAIL_ERROR : "SERVICE ERROR: Can not send sign up mail.",
    SERVICE_GET_USER_DATA_BY_EMAIL_ERROR:"SERVICE ERROR : Can not get user data by Email.",
    
    
    SERVICE_GET_USER_ERROR:"SERVICE ERROR : Can not .",
    SERVICE_GET_USER_DATA:"SERVICE ERROR : change pw.",

}

const logic_error={
    LOGIN_ID_FAILED: 'Id is not correct',
    LOGIN_PW_FAILED: 'Pw is not correct',
    SIGN_UP_DUPLICATE_ID: 'This Id is already exist.',
    NOT_EXIST_USER_BY_EMAIL: 'This is not exist user by email.'
}

const authentication_error={
    EXPIRED_TOKEN:"만료된 토큰입니다.",
    INVALID_TOKEN:"유효하지 않은 토큰입니다.",
}

module.exports={
    connection_error,
    server_warning,
    authentication_error,
    logic_error
}