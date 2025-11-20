import jwt from "jsonwebtoken";
import User from "./models/User.js";
import { inactivityProgressUpdate } from "./utils/inactivityProgressUpdate.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]; 
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log(" Missing or invalid auth header:", authHeader);
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log( decoded);

    req.user = await User.findById(decoded.id).select("-password");

if (req.user) {
      await inactivityProgressUpdate(req.user);
    }

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    // console.log(" User found in protect:", req.user._id);
    next();
  } catch (error) {
    console.error(" Auth error:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
