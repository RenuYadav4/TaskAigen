

import Todo from "../models/Todo.js";

export const updateOverdueTodos = async () => {
  try {
    const now = new Date();
    await Todo.updateMany(
      { status: "pending", dueDate: { $lt: now } },
      { $set: { status: "overdue" } }
    );
    // console.log("Overdue tasks updated");
  } catch (error) {
    console.error("Error updating overdue tasks:", error);
  }
};
