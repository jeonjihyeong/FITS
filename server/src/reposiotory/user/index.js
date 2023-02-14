const { connection_error } = require("../../lib/common/error")

//회원정보 변경
const chagneUserData =async(userIdx, newData)=>{
    try{
        await models['user'].update({
            ...newData
        },{
            where:{userIdx:userIdx}
        })
    }catch(err){
        throw new Error(connection_error.REPOSITORY_CHANGE_USER_DATA_ERROR)
    }
}

module.exports={
    chagneUserData
}