import http from '@/api/axios/index'

export default {
    writeComment: async(reqInfo)=>{
        try{
            await http.post(`/comment`,reqInfo)
        }catch(err){
            console.log(err);
        }
        if(res.data.message){
            console.log(res.data.message);
            return 0;
        }
        console.log(res.data.data);
        return 1;
    }
}