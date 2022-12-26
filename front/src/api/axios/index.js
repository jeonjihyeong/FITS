import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_SERVER_URL,
});

instance.interceptors.request.use(
    function(config){
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        if (accessToken!==null&&accessToken!==undefined){
            config={
                ...config,
                headers:{
                    authorization: accessToken,
                    refreshToken: refreshToken
                    // {
                    //     accessToken:accessToken,
                    //     refreshToken:refreshToken
                    // }
                },
            }
        }
        return config;
    },
    function (error){
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    function(response){

        return response;
    },
    function(error){
        const {
            config,
            response:{status},
        }=error;
        if(status===419){
            const originalRequest = config;
            console.log(error.response.status);
            const accessToken = localStorage.getItem('accessToken')
            const refreshToken = localStorage.getItem('refreshToken')
            axios.get(`${process.env.VUE_APP_SERVER_URL}/refresh`,{
                headers:{
                    authorization:accessToken,
                    refresh:refreshToken
                    
                }
            }).then((res)=>{
                console.log("refreshing")
                localStorage.setItem("accessToken",res.data.token.accessToken);
                localStorage.setItem("refreshToken",res.data.token.refreshToken);
                axios.defaults.headers.common.Authorization = res.data.token.accessToken;
                originalRequest.headers.Authorization = res.data.token.accessToken;
                return axios(originalRequest)
            }).catch((err)=>{
                console.log(err)
            })
        }
        return Promise.reject(error);
    }
)

export default instance;