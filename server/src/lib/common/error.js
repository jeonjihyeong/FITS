const httpStatus = {
    ok:200,
    created:201,
    not_accept:406,
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

const service_erro={
    SERVICE_GET_USER_BY_ID:{
        message:"Can not get user data by id.",
        status:500
    }
}

module.exports={
    ...controller_error
}