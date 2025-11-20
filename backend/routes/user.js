import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getUser, registerUser, loginUser, deleteUser,    } from "../controllers/userController.js";
// import { protect } from "../authMiddleware.js";

dotenv.config();
const router = express.Router();

router.get("/", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/delete/:id", deleteUser);



export default router;

