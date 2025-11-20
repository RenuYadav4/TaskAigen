import mongoose from "mongoose";

const goalPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  goal: String,
  tasks: [
    {
      day: String,
      task: String,
    }
  ],
  achieved: { type: Boolean, default: false }
});

export default mongoose.model("GoalPlan", goalPlanSchema);
