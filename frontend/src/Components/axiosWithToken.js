import axios from "axios"

// axios instance with token
let token = localStorage.getItem('token')
console.log(token);
export const axiosWithToken = axios.create({
    headers: {
        Authorization: `Bearer ${token}`
    }
})
