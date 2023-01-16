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
    async function(error){
        const {
            config,
            response:{status},
        }=error;
        if(status===419){
            const originalRequest = config;
            console.log(error.response.status);
            const accessToken = localStorage.getItem('accessToken')
            const refreshToken = localStorage.getItem('refreshToken')
            try{
                await axios.get(`${process.env.VUE_APP_SERVER_URL}/refresh`,{
                    headers:{
                        authorization:accessToken,
                        refresh:refreshToken
                    }
                })
            }catch(err){
                console.log(err);
            }
            console.log("refreshing")
            localStorage.setItem("accessToken",res.data.token.accessToken);
            localStorage.setItem("refreshToken",res.data.token.refreshToken);
            axios.defaults.headers.common.Authorization = res.data.token.accessToken;
            originalRequest.headers.Authorization = res.data.token.accessToken;
            const res = await axios(originalRequest)
            return res
        }
        return Promise.reject(error);
    }
)

export default instance;