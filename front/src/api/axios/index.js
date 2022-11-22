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
                    authorization:{
                        accessToken:accessToken,
                        refreshToken:refreshToken
                    }
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
        if(error.response.status===419){
            console.log(error.response.status);
            const accessToken = localStorage.getItem('accessToken')
            const refreshToken = localStorage.getItem('refreshToken')
            axios.get(`${process.env.VUE_APP_SERVER_URL}/refresh`,{
                headers:{
                    authorization:{
                        accessToken:accessToken,
                        refreshToken:refreshToken
                    }
                }
            })
        }
        return Promise.reject(error);
    }
)

export default instance;