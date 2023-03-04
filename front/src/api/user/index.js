import http from '@/api/axios/index'

export const changeUserData = async(reqData)=>{
    http.put(`/user`,reqData
    ).then((res)=>{
        let result=false
        if(res.data.message){
            console.log("회원정보를 변경하지 못했습니다.")
            return result;
        }
        console.log("회원정보를 변경하였습니다.");
        result =true
        return result
    }).catch((err)=>{
        console.log(err);

    })
}

export const getUserInfo = async(userIdx)=>{
    let result;
    try{
        result = http.get(`/user/?user=${userIdx}`)
    }catch(err){
        console.log(err)
    }
    return result 
}