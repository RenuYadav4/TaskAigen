import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import categoryRouter from "./routes/category.js";
import connectDb from "./config/db.js";
import userRouter from "./routes/user.js";
import todoRouter from "./routes/todoRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

dotenv.config();
connectDb(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://your-frontend-domain.com"]
    : ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRouter);
app.use("/api/todos", todoRouter);
app.use("/api/categories",categoryRouter);
app.use("/api/ai",aiRouter);

// Start server
console.log("Routers loaded:", { categoryRouter, todoRouter, userRouter });
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
