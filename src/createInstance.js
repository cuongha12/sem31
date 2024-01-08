import axios from "axios"
import jwtDecode from "jwt-decode";
import { loginSuccess } from "./redux/AuthSlice";

export const refreshToken = async () => {
    try {
        const res = await axios.post('/refresh', {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        
        console.log(error);
    }
}

export const refreshTokenUser = async () => {
    try {
        const res = await axios.post('/user/refresh', {
            withCredentials: true
        })
        return res.data
    } catch (error) {

        console.log(error);
    }
}

export const createAxios = (user, dispatch) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(async (config) => {
        let date = new Date();
        const decodedToken = jwtDecode(user?.accessToken)
        if (decodedToken.exp < date.getTime()) {
            const data = await refreshToken();
            const refreshUser = {
                ...user,
                accessToken: data.accessToken
            }
            dispatch(loginSuccess(refreshUser))
            config.headers['Authorization'] = `Bearer ${data.accessToken}`
        }
        return config
    },
        (err) => {

            return Promise.reject(err)
        })
    return newInstance
}

export const createAxiosJwt = (user, dispatch) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(async (config) => {
            let date = new Date();
            const decodedToken = jwtDecode(user?.accessToken)
            if (decodedToken.exp < date.getTime()) {
                const data = await refreshTokenUser();
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken
                }
                dispatch(loginSuccess(refreshUser))
                config.headers['Authorization'] = `Bearer ${data.accessToken}`
            }
            return config
        },
        (err) => {

            return Promise.reject(err)
        })
    return newInstance
}
