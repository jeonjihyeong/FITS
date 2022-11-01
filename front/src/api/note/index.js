import axios from 'axios'

// 글전체 목록 가지고 오기
const getNote=async()=>{
    const token = localStorage.getItem("accessToken")
    let result;
    await axios.get(`${process.env.VUE_APP_SERVER_URL}/note`,{
        headers:{
            authorization: token,
        }
    }).then((res)=>{
        if (res.data.message){
            console.log(res.data.message);
            if(res.data.message==='expired token'){
                alert("만료된 토큰입니다.")
                localStorage.removeItem('accessToken')
                result = "expired token"
                return;
            }
            return;
        }
        console.log(res.data.data)
        result = res.data.data
        return;
    }).catch((err)=>{
        console.log(err);
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

const getOneNote =async(noteIdx)=>{
    const token = localStorage.getItem("accessToken")
    let result;
    await axios.get(`${process.env.VUE_APP_SERVER_URL}/note/${noteIdx}`,{
        headers:{
            authorization:token
        }
    }).then((res)=>{
        if(res.status ===200){
            result = res.data.data;
            return;
        }
        console.log(res.data.message)
        return;
    }).catch((err)=>{
        console.log(err)
    })
    return result
}

export default {
    getNote,writeNote,getOneNote
}