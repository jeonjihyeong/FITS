import axios from 'axios'

const instance = axios.create({
    baseURL:process.env.VUE_APP_SERVER_URL,
});

instance.interceptors.request.use(
    function(config){
        const token = localStorage.getItem('accessToken')
        if (token!==null&&token!==undefined){
            config={
                ...config,
                headers:{
                    authorization:token
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
        return Promise.reject(error);
    }
)

export default instance;