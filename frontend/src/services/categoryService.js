// services/categoryService.js
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

// Get all categories
export const getCategories = async () => {
  return await axiosInstance.get(API_PATHS.CATEGORY.GET_ALL);
};

// Add a new category
export const addCategory = async (categoryData) => {
  return await axiosInstance.post(API_PATHS.CATEGORY.CREATE, categoryData);
};

// Delete a category
export const deleteCategory = async (id) => {
  return await axiosInstance.delete(API_PATHS.CATEGORY.DELETE(id));
};
