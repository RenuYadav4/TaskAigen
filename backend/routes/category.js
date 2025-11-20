import express from "express";
import { protect } from "../authMiddleware.js";
import { getCategories, createCategory, deleteCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/",protect,getCategories);
router.post("/",protect,createCategory);
router.delete("/:id",protect,deleteCategory);
router.get("/test", (req, res) => {
    res.send("Category route works");
  })

export default router;