import express from "express";
import { generateGoalPlan } from "../controllers/aiController.js";
import GoalPlan from "../models/GoalPlan.js";


const router = express.Router();

router.post("/generate",generateGoalPlan);

// 2️ Route to fetch the active plan of a user
// router.get("/my-plan/:userId", getMyPlan);

export default router;