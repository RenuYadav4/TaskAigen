import Todo from "../models/Todo.js";
import { updateOverdueTodos } from "../utils/updateOverdue.js";
import User from "../models/User.js";
import { inactivityProgressUpdate } from "../utils/inactivityProgressUpdate.js";

export const createTodo = async (req, res) => {
    try {
        const { title, category, dueDate, description } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const todo = await Todo.create({
            userId: req.user._id,
            title,
            description: description || "",
            dueDate: dueDate || null,
            category: category || null,
            status: "pending",
        });

        await updateOverdueTodos();

        // const populatedTodo = await todo.populate("category", "name");
        const updatedTodo = await Todo.findById(todo._id).populate("category", "name");


        res.status(201).json({
            success: true,
            message: "Task added successfully",
            todo: updatedTodo,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create todo", error: error.message });
    }
}

export const getTodosByCategory = async (req, res) => {
    try {
        await updateOverdueTodos();
        const { categoryId } = req.params;
        const todos = await Todo.find({
            userId: req.user._id,
            category: categoryId,
        }).populate("category", "name").sort({ createdAt: -1 });

        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch category todos", error: error.message });
    }

}

export const getTodos = async (req, res) => {
    try {
        await updateOverdueTodos();
        const todos = await Todo.find({ userId: req.user._id }).populate("category", "name");
        // console.log("Fetched todos:", todos.map(t => ({
        //     title: t.title,
        //     category: t.category?.name
        //   })));

        if (!todos || todos.length === 0) {
            return res.status(200).json([]);
        }

        //You can’t directly modify createdAt in that object unless you convert it to a plain JavaScript object first.
        // const todo = todos.toObject();
        // todo.createdAt = new Date(todo.createdAt).toLocaleString(); // format readable date


        // Case 2: todos found → return them
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "FAiled to fetch todos", error: error.message });
    }
}


export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, status } = req.body;
        const todo = await Todo.findOneAndUpdate(
            { _id: id, userId: req.user._id },
            { title, status },
            { new: true }
        );
        if (!todo) return res.status(404).json({ message: "Todo not found" });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: "Failed to update todo", error: error.message });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user._id });
        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete todo", error: error.message });
    }
};


export const updateTodoStatus = async (req, res) => {
    try {        
        await updateOverdueTodos();
        const { id } = req.params;
        const { status } = req.body;

        if (!["pending", "completed", "overdue"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const todo = await Todo.findOneAndUpdate(
            { _id: id, userId: req.user._id },
            { status },
            { new: true }
        ).populate("category", "name");

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }


        // check incactivity and adjust
        // await updateUserProgress(req.user._id);

        // Reload user
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ Message: "User not found" });

        let updatedUser = user;

        if (status === "completed") {
            const today = new Date();
            const todayStr = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate) : null;
            const lastActiveDay = lastActive
                ? new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate())
                : null;

            // Increase progress only if new day
            if (!lastActiveDay || lastActiveDay.getTime() !== todayStr.getTime() || user.taskHistory.length === 0) {
                user.progress = Math.min((user.progress || 0) + 2, 100);

                user.lastActiveDate = todayStr;
                user.lastProgressChecked = todayStr;

                // NEW — single message
                user.message = "Great! Progress increased by 2% ";

                // Save task history
                const dayName = today.toLocaleDateString("en-US", { weekday: "long" });

                user.taskHistory.push({
                    day: dayName,
                    progress: user.progress
                });
            }
        } else {
            // If NOT completed (pending / overdue)
            user.message = `Task marked as ${status}.`;
        }

        updatedUser = await user.save();

        console.log(updatedUser);
        return res.status(200).json({
            user,
            success: true,
            message: user.message,
            todo,
            // progress: updatedUser.progress,
            // taskHistory: updatedUser.taskHistory
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to update status", error: error.message });
    }
};

export const deleteTodosBatchController = async (req, res) => {
    const { ids } = req.body; // array of task IDs
    console.log("Incoming IDs:", ids);

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: "No task IDs provided" });
    }

    try {

        await Todo.deleteMany({ _id: { $in: ids } });
        return res.status(204).send(); // success, no content
    } catch (error) {
        console.error("Error deleting tasks:", error);
        return res.status(500).json({ message: "Failed to delete tasks" });
    }
};