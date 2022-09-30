import axios from 'axios'

const login =async(id,pw)=>{
    console.log(process.env.VUE_APP_SERVER_URL)
    await axios.post(`${process.env.VUE_APP_SERVER_URL}/signIn`,{
        id:id,
        pw:pw
    }).then((res)=>{
        if(res.status === 200){
            console.log("success");
            localStorage.setItem('accessToken',res.data.data)
            return;
        }
        console.log("failed");
        return;
    }).catch((err)=>{
        console.log(err);
        return;
    })
}

export default login