import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

export const generatePlan = (goal, userId) => {
  return axiosInstance.post("/api/ai/generate", {
    prompt: goal,
    userId: userId
  });
};