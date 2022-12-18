import http from '@/api/axios/index'

export default {
    changeUserData:async(reqData)=>{
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
}