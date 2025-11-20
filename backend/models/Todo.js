import mongoose, { mongo } from "mongoose";

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "",
        trim: true,
    },
    dueDate: {
        type: Date,
        default: null,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "overdue"],
        default: "pending",
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null, // null means common task
    },
    completedAt: { type: Date }, // Set when task is completed
    // progressUpdated: { type: Boolean, default: false }

}, { timestamps: true });

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;