import express from "express";
import { protect } from "../authMiddleware.js";
import { createTodo, deleteTodo, deleteTodosBatchController, getTodos, getTodosByCategory, updateTodo, updateTodoStatus } from "../controllers/todoController.js";

const router = express.Router();

router.post("/",protect,createTodo);
router.get("/",protect,getTodos);
router.get("/category/:categoryId",protect,getTodosByCategory);
router.put("/:id",protect,updateTodo);
router.delete("/:id",protect,deleteTodo);

router.put("/:id/status", protect, updateTodoStatus);
router.delete("/delete_all",protect,deleteTodosBatchController);

export default router;