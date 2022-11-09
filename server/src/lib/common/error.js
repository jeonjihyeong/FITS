const controller_error ={
    LOGIN_ERROR:{
        message :"LOGIN_ERROR",
        status:406
    },
    ACOUNT_ERROR:{
        message:"ACOUNT_ERROR",
        status:404
    }
}

module.exports={
    ...controller_error
}