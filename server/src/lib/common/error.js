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
    INVALID_REQUEST: "Invalid request",

}

const connection_error={
    CONTROLLER_LOGIN_ERROR:"controller error to login",
    CONTROLLER_ACOUNT_ERROR:"controller error to acount",
    CONTROLLER_SEND_ACOUNT_MAIL_ERROR:"controller error to send acount mail",

    SERVICE_GET_USER_DATA:"Can not get user Data to login - service layer.",
    SERVICE_GET_USER_DATA:"Can not get user Data to login - service layer.",
    SERVICE_GET_USER_DATA:"Can not get user Data to login - service layer.",


}


const authentication_error={
    EXPIRED_TOKEN:"만료된 토큰입니다.",
    INVALID_TOKEN:"유효하지 않은 토큰입니다.",
}

module.exports={
    connection_error,
    server_warning,
    authentication_error
}