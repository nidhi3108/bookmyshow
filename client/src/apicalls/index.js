import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers :{
        withCredentials: true,
        "Content-Type": "application/json",
        Authorization:`Bearer ${localStorage.getItem("token")}`
                   //  0th      1 index
        //bearer nothing just announicng the client that i am barear of this token if we delete no issue
    }
})