import axios from "axios";

const axiosInstance = axios.create ({

baseURL:"https://tasky-backend-vqjg.onrender.com",
withCredentials:true
})


export default axiosInstance;