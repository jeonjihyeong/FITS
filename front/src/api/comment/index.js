import axios from "axios";

const writeComment=async(reqInfo)=>{
    const token =localStorage.getItem("accessToken");
    await axios.post(`${process.env.VUE_APP_SERVER_URL}/comment`,{
        comment:reqInfo.comment,
        noteIdx:reqInfo.noteIdx
    },{
        headers:{
            authorization:token
        }
    }).then((res)=>{
        console.log(res.data.data);
    })
}

export default {
    writeComment
}