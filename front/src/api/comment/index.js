import http from '@/api/axios/index'

export const writeComment = async(reqInfo)=>{
    let result;
    try{
        result = await http.post(`/comment`,reqInfo)
    }catch(err){
        console.log(err);
    }
    if(result.data.message){
        console.log(result.data.message);
        return 0;
    }
    console.log(result.data.data);
    return 1;
}