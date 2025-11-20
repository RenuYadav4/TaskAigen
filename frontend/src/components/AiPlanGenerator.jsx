import { useState } from "react";
import axios from "axios";

export default function AiPlanGenerator() {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!goal.trim()) return;

    setLoading(true);
    setError("");
    setPlan(null);

    try {
      const res = await axios.post("http://localhost:8000/api/ai/generate", { goal });
      setPlan(res.data);
    } catch (err) {
      setError("Failed to generate plan. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow rounded mt-8">
      <h2 className="text-2xl font-bold mb-4">AI Weekly Plan Generator</h2>

      <input
  type="text"
  placeholder="Enter your goal..."
  value={goal}
  onChange={(e) => setGoal(e.target.value)}
  className="w-full p-2 border border-gray-300 rounded mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
/>


      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-500  px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading ? "Generating..." : "Generate Plan"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {plan && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Summary:</h3>
          <p className="mb-4">{plan.summary}</p>

          {plan.days.map((day, index) => (
            <div key={index} className="mb-4">
              <h4 className="font-semibold">{day.day}</h4>
              <ul className="list-disc list-inside">
                {day.tasks.map((task, i) => (
                  <li key={i}>
                    <strong>{task.title}:</strong> {task.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
