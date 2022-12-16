import http from '@/api/axios/index'

export default {
    changeUserData:async(reqData)=>{
        http.put(`/user/`,reqData
        ).then((res)=>{
            console.log('성공')
            console.log(res)
        })
    }
}