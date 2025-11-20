// export const BASE_URL = "http://localhost:8000";
export const BASE_URL = "https://taskaigen.onrender.com";


export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/user/register",
        LOGIN: "/api/user/login",
    },
    USERS: {
        GET_ALL_USERS: "/api/user",
        GET_PROGRESS: "/api/user/progress",
    },
    TODO: {
        GET_ALL: "/api/todos",                  // GET all todos
        CREATE: "/api/todos",                   // POST new todo
        UPDATE: (id) => `/api/todos/${id}`,     // PUT update todo
        DELETE: (id) => `/api/todos/${id}`,
        DELETE_ALL: "/api/todos/delete_all",
        UPDATESTATUS: (id) => `/api/todos/${id}/status`,
    },
    CATEGORY: {
        GET_ALL: "/api/categories",
        CREATE: "/api/categories",
        DELETE: (id) => `/api/categories/${id}`,
    },
    AI: {
        GENERATE_PLAN: "/api/ai/generate",
    }
}