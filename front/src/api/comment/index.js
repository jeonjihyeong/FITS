import http from '@/api/axios/index'

export default {
    writeComment: async(reqInfo)=>{
        await http.post(`/comment`,reqInfo
        ).then((res)=>{
            console.log(res.data.data);
        })
    }
}