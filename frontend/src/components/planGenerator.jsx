import React, { useContext, useState } from "react";
import { X, Save } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { generatePlan } from "../services/aiService";

const PlanGenerator = () => {
  const { setOpenGenerator, user } = useContext(AuthContext);
  const [prompt, setPrompt] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt) return;

    setLoading(true);
    setError("");
    setTasks([]);
    const currentPrompt = prompt;
    setPrompt(""); // clear input immediately

    try {
      const res = await generatePlan(currentPrompt, user._id);

      if (res.data && res.data.tasks) {
        setTasks(res.data.tasks);
      } else {
        setError("AI did not return a valid plan.");
      }
    } catch (err) {
      console.error("Generate Error:", err);
      setError("Error generating response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-xl flex justify-center z-50">
      <div className="mt-10 w-[90%] max-w-2xl h-[80vh] rounded-3xl border border-white/20 
        bg-neutral-900/40 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)]
        flex flex-col overflow-hidden relative transition-all duration-300 
        hover:shadow-[0_0_2px_#D500F9] glass-card">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 
          border-b border-white/10 bg-white/5 backdrop-blur-md">
          <h2 className="text-lg font-semibold tracking-wide text-white/95">
            Plan Generator
          </h2>
          <div className="flex items-center gap-3">
            {tasks.length > 0 && (
              <button className="
                flex items-center gap-1 px-3 py-1.5 rounded-md text-sm 
                bg-gradient-to-r from-fuchsia-500 to-purple-600 
                hover:brightness-110 transition-all shadow-[0_0_15px_rgba(168,85,247,0.6)]
              ">
                <Save size={16} /> Save
              </button>
            )}
            <button
              onClick={() => setOpenGenerator(false)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Response */}
        <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
          {loading && <div className="text-gray-400">Generating plan...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {tasks.length > 0 && (
            <ul className="space-y-2 p-2 bg-neutral-800/30 rounded-xl text-gray-200">
              {tasks.map((t, index) => (
                <li key={index}>
                  <strong>{t.day}:</strong> {t.task}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-white/10 px-5 py-4 bg-neutral-900/40 backdrop-blur-xl">
          <div className="flex items-end gap-3">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows="2"
              placeholder="Describe your goal..."
              className="flex-1 p-3 rounded-xl border border-white/20 bg-neutral-800/40 
                text-gray-100 placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-indigo-500 
                shadow-[inset_0_0_10px_rgba(0,0,0,0.4)] resize-none"
              disabled={loading} // disable typing while generating
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt}
              className={`px-6 py-2 rounded-xl text-sm font-medium
                ${loading || !prompt
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-br from-indigo-500 cursor-pointer via-blue-600 to-cyan-500 shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:brightness-110 active:scale-95"
                }
                transition-all`}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
      </div>

      {/* Extra Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #6366f1, #a855f7); border-radius: 10px; }
        .glass-card { animation: fadePop 0.25s ease-out; }
        @keyframes fadePop { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } 
      `}</style>
    </div>
  );
};

export default PlanGenerator;
