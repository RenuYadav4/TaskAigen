import axios from "axios";

import { BASE_URL } from "./apiPath";

const axiosInstance = axios.create({

    baseURL: BASE_URL,
    headers: {
        "Content-Type" : "application/json",
        Accept: "application/json",
    }
    }
);

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken"); // get token from localStorage
      console.log("🚀 Auth Token being sent:", token); // <--- debug here
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // attach token
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log("❌ Interceptor caught error:", error.response?.status);
      if (error.response?.status === 401) {
        console.log("🚫 Removing expired token...");
        // Token expired or invalid
        localStorage.removeItem("authToken");
        
        localStorage.removeItem("userInfo");
        // window.location.href = "/login"; // auto redirect

        window.dispatchEvent(new Event("tokenExpired"));

      }
      return Promise.reject(error);
    }
  );
  
  
export default axiosInstance;