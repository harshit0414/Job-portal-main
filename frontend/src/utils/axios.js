import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true   // 🔥 IMPORTANT
});

export default axiosInstance;
