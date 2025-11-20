import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

// Register
export const registerUser = async (userData)=>{
    return await axiosInstance.post(API_PATHS.AUTH.REGISTER, userData);
}

// Login 
export const loginUser = async (userData)=>{
    console.log("Sending login data:", userData);

    return await axiosInstance.post(API_PATHS.AUTH.LOGIN,userData);

}

