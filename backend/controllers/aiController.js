import { GoogleGenAI } from "@google/genai";
import GoalPlan from "../models/GoalPlan.js";

export const generateGoalPlan = async (req, res) => {
  try {
    const { prompt: goal, userId } = req.body;

    if (!goal || !userId) {
      return res.status(400).json({ message: "Goal and userId are required" });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const fullPrompt = `
    Create a one-week actionable task plan for this goal: "${goal}"

    Return ONLY valid JSON in this format:
    {
      "goal": "string",
      "tasks": [
        {"day": "Day 1", "task": "string"},
        {"day": "Day 2", "task": "string"},
        {"day": "Day 3", "task": "string"},
        {"day": "Day 4", "task": "string"},
        {"day": "Day 5", "task": "string"},
        {"day": "Day 6", "task": "string"},
        {"day": "Day 7", "task": "string"}
      ]
    }
    `;

    // ------------------------
    // 🔥 RETRY LOGIC ADDED HERE
    // ------------------------
    let response;
    const maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: fullPrompt,
        });
        break; // success → exit loop
      } catch (err) {
        if (err.status === 503 && attempt < maxRetries) {
          console.log(`Model overloaded. Retrying in 1s... (Attempt ${attempt})`);
          await new Promise((r) => setTimeout(r, 1000));
          continue;
        }
        throw err; // throw real error
      }
    }
    // ------------------------

    const text = response.text;

    const jsonMatch = text.match(/```json([\s\S]*?)```/);
    let jsonString;

    if (jsonMatch) {
      jsonString = jsonMatch[1];
    } else {
      const fallback = text.match(/\{[\s\S]*\}/);
      if (!fallback) throw new Error("AI did not return JSON");
      jsonString = fallback[0];
    }

    const cleanJson = JSON.parse(jsonString);

    const newPlan = await GoalPlan.create({
      userId,
      goal: cleanJson.goal,
      tasks: cleanJson.tasks,
      achieved: false,
    });

    return res.status(201).json(newPlan);

  } catch (error) {
    console.error("AI ERROR:", error);
    return res.status(500).json({ message: "Failed to generate plan" });
  }
};
