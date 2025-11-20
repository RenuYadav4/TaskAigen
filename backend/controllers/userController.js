import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Todo from "../models/Todo.js";
import { inactivityProgressUpdate } from "../utils/inactivityProgressUpdate.js";

// Verify what the authenticated user is allowed to access.
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },   //payload
        process.env.JWT_SECRET,    //it is a signature key for the token no one can genertae or verfy vakid tokens without it.
        { expiresIn: "30d" }
    );
};

export const getUser = async (req, res) => {
    try {
        // Fetch only the logged-in user
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

       await inactivityProgressUpdate(user);

        // Return updated user
        return res.status(200).json(user);

    } catch (error) {
        console.error("Get user error:", error);
        return res.status(500).json({ message: error.message });
    }
};


export const registerUser = async (req, res) => {
    try {
        console.log("Incoming Body", req.body);
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
 
        // Hashpass
        // if user is unique then create it
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password.toString(), salt);

        const user = await User.create({
            name,
            email,
            password: hashPassword,
        })

        // return user data
        // res.status(201).json({
        //     _id: user._id,
        //     name: user.name,
        //     email: user.email,
        //     token: generateToken(user._id),
            
        // });

          // Update inactivity progress before sending
        //   await inactivityProgressUpdate(user);

          // Remove password from response
          const { password: _, ...safeUser } = user.toObject();
  
          res.status(201).json({
              ...safeUser,
              token: generateToken(user._id),
          });

    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({ msg: error.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatched = await bcrypt.compare(password.toString(), user.password);
        if (!isMatched) {
            return res.status(401).json({ msg: "Invalid password" });
        }


        // return res.json({
        //     _id: user._id,
        //     name: user.name,
        //     email: user.email,
        //     token: generateToken(user._id)
        // });
        await inactivityProgressUpdate(user);

        // Remove password from response
        const { password: _, ...safeUser } = user.toObject();

        res.json({
            ...safeUser,
            token: generateToken(user._id),
        });

    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ msg: "Server error" });
    }
}


export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.json({ message: " User deleted successfully" });
    } catch (error) {
        console.error("Delete error", error);
        res.status(500).json({ message: "Server error" });
    }
} 



