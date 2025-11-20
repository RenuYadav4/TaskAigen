import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    progress: { type: Number, default: 0 }, // 0–100
    lastActiveDate: { type: Date, default: Date.now },
    message: { type: String, default: "" },   
     lastProgressChecked: { type: Date , default: Date.now},            // date when progress was last updated
    taskHistory: [
        {
            day: String,
            progress: Number
        }
    ]
    
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User;