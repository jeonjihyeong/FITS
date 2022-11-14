import http from '@/api/axios/index'
const writeComment=async(reqInfo)=>{
    await http.post(`/comment`,reqInfo
    ).then((res)=>{
        console.log(res.data.data);
    })
}

export default {
    writeComment
}