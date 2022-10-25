import axios from 'axios'

// 글전체 목록 가지고 오기
const getNote=async(userIdx)=>{
    const token = localStorage.getItem("accessToken")
    await axios.get(`${process.env.VUE_APP_SERVER_URL}/note`,{
        headers:{
            authorization: token,
        }
    }).then((res)=>{
        if (res.data.message){
            console.log(res.data.message);
        }
    })
}


export default {
    getNote,
}