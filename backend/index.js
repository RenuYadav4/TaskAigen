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
const allowedOrigins = [
  "https://taskaigen-1.onrender.com",  // deployed frontend
  "http://localhost:5173"              // local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200,
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
