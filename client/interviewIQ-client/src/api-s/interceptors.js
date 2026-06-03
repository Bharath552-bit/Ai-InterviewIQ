import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({baseURL:`http://localhost:4000`})

api.interceptors.request.use((req)=>{

    const token = localStorage.getItem("token")

    if(!token){
        window.location.href = "http://localhost:5173/login"
        return
    }

    req.headers.Authorization = `Bearer ${token}`

    return req
}
,
(err)=>{
    return Promise.reject(err)
})

api.interceptors.response.use((res)=>{

    return res.data
}
,
(err)=>{

    const errMessage = err?.response?.data?.message

    if(err.status == 401 && (errMessage == "Token expired" || errMessage == "Invalid token")){
        localStorage.clear()

        window.location.href = "http://localhost:5173/login"

        toast.error(errMessage)
        return
    }

    return Promise.reject(err)
})


export {api}