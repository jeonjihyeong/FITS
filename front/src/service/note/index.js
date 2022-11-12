import axios from 'axios'
import http from '@/service/axios'

// 글전체 목록 가지고 오기
const getNote=async()=>{
    // const token = localStorage.getItem("accessToken")
    let result;
    await http.get('/note',{
        // headers:{
        //     authorization: token,
        // }
    }).then((res)=>{
        if (res.data.message){
            console.log(res.data.message);
            return;
        }
        result = res.data.data
        return;
    }).catch((err)=>{
        console.log(err);
        if(err.response.data){
            result = err.response.data.message
            alert(result)
        }
    })
    console.log(result)
    return result;
}

// 글작성하기
const writeNote =async(reqData)=>{
    const token = localStorage.getItem("accessToken")
    await axios.post(`${process.env.VUE_APP_SERVER_URL}/note`,{
        ...reqData
    },
    {
        headers:{
            authorization:token,
        }
    }).then((res)=>{
        if (res.data.message){
            console.log(res.data.message);
            return;
        }
        console.log(res.data.data);
    }).catch((err)=>{
        console.log(err);
    })
    return;
}

// 글한개 가지고 오기
const getOneNote =async(noteIdx)=>{
    const token = localStorage.getItem("accessToken")
    let result;
    await axios.get(`${process.env.VUE_APP_SERVER_URL}/note/${noteIdx}`,{
        headers:{
            authorization:token
        }
    }).then((res)=>{
        if(res.status ===200){
            result = {
                noteInfo:res.data.data,
                comment:res.data.comment,
            }
            console.log(res.data.comment)
            return;
        }
        return;
    }).catch((err)=>{
        console.log(err)
    })
    return result
}

// 노트 삭제
const deleteNote=async(noteIdx)=>{
    const token = localStorage.getItem("accessToken");
    let result;
    await axios.delete(`${process.env.VUE_APP_SERVER_URL}/note/${noteIdx}`,{
        headers:{
            authorization:token
        }
    }).then((res)=>{
        if(res.status===200){
            alert("삭제 성공")
            result='success'
            return;
        }
    }).catch((err)=>{
        console.log(err)
    })
    return result
}

export default {
    getNote,writeNote,getOneNote,deleteNote
}