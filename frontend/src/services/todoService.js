import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

// Get all todos
export const getTodos = async () => {
    return await axiosInstance.get(API_PATHS.TODO.GET_ALL);
};

//  Get todos by category
export const getTodosByCategory = async (categoryId) => {
  return await axiosInstance.get(`/api/todos/category/${categoryId}`);
};

// Add a new todo
export const addTodo = async (todoData) => {
    return await axiosInstance.post(API_PATHS.TODO.CREATE,todoData);
}

// Delete todo
export const deleteTodo = async (id) => {
    return await axiosInstance.delete(API_PATHS.TODO.DELETE(id));
}

// update todo
export const updateTodo = async (id,updatedData) => {
    return await axiosInstance.put(API_PATHS.TODO.UPDATE(id),updatedData);
}

// sttus is a single value
export const updateTodoStatus = async (id, status)=>{
    return await axiosInstance.put(API_PATHS.TODO.UPDATESTATUS(id),status);
}

export const deleteTodosBatch = async (ids)=>{
    console.log("Deleting IDs:", ids); // <-- check this
    return await axiosInstance.delete(API_PATHS.TODO.DELETE_ALL,{data:{ids}});
}