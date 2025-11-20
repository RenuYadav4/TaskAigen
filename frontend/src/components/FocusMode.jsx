import React, { useState, useContext, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TodoContext } from "../context/TodoContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const FocusMode = () => {
  const { todos } = useContext(TodoContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedTask, setSelectedTask] = useState("");
  const [focusDuration, setFocusDuration] = useState(25 * 60);
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [quote, setQuote] = useState("");

  const audioRef = useRef(null);

  // quotes
  const quotes = [
    "Breathe in. Focus on the present moment.",
    "One task. One breath.",
    "You are exactly where you need to be.",
    "Small steps, deep focus.",
    "Calm mind, sharp purpose."
  ];

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => setTime((prev) => prev - 1), 1000);
    } 
    else if (time === 0) {
      clearInterval(interval);
      setIsRunning(false);
      setSessionCompleted(true);

      // play completion sound
      if (audioRef.current) {
        audioRef.current.play();
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  // redirect if not logged in
  useEffect(() => {
    if (!user) {
      alert("Please login to use Focus Mode");
      navigate("/login");
    }
  }, [user, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleStart = () => {
    if (!selectedTask) {
      alert("Please select a task first.");
      return;
    }
    setIsRunning(true);
  };

  const handleReset = () => {
    setTime(focusDuration);
    setSessionCompleted(false);
    setIsRunning(false);
  };

  const handleDurationChange = (minutes) => {
    const sec = minutes * 60;
    setFocusDuration(sec);
    setTime(sec);
    setSessionCompleted(false);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col items-center pt-20 relative overflow-hidden">

      {/* Sound */}
      <audio ref={audioRef} src="/sounds/focus-complete.mp3" preload="auto" />

      {/* Soft glowing animated orb */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute top-[20%] w-[700px] h-[700px] rounded-full bg-[#f1fd6b15] blur-3xl"
      />

      <div className="relative z-10 w-[90%] max-w-xl text-center">

        {/* Header message */}
        <p className="text-gray-300 mb-3 text-lg">
          You should focus at least 
          <span className="text-[#f1fd6b] font-semibold"> 25 minutes </span>
          a day to build consistency.
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-[#f1fd6b] mb-6 drop-shadow-[0_0_10px_#f1fd6b]">
          Focus Mode
        </h1>

        {/* Task dropdown */}
        <div className="mb-6 w-full text-left">
          <label className="block text-gray-300 mb-2 text-lg">
            Select a Task
          </label>
          <select
            className="w-full bg-white/10 border border-[#f1fd6b3a] rounded-lg p-3 focus:border-[#f1fd6b] outline-none"
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
          >
            <option value="">-- Choose a task --</option>
            {todos?.length > 0 ? (
              todos.map((todo) => (
                <option className="text-black" key={todo._id} value={todo.title}>
                  {todo.title}
                </option>
              ))
            ) : (
              <option disabled>No tasks found</option>
            )}
          </select>
        </div>

        {/* Focus duration options */}
        <div className="flex justify-center gap-3 mb-6">
          {[15, 25, 45, 60].map((min) => (
            <button
              key={min}
              onClick={() => handleDurationChange(min)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                focusDuration === min * 60
                  ? "bg-[#f1fd6b] text-black font-semibold shadow-[0_0_15px_#f1fd6b]"
                  : "border-[#f1fd6b3a] text-gray-300 hover:bg-white/10"
              }`}
            >
              {min} min
            </button>
          ))}
        </div>

        {/* Animated Timer */}
        <motion.div
          animate={{
            scale: isRunning ? [1, 1.03, 1] : 1,
            boxShadow: isRunning
              ? ["0 0 20px #f1fd6b70", "0 0 35px #f1fd6bbb", "0 0 20px #f1fd6b70"]
              : "0 0 0px transparent",
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-56 h-56 md:w-64 md:h-64 rounded-full border-4 border-[#f1fd6b] flex items-center justify-center text-5xl font-bold text-[#f1fd6b] mb-8"
        >
          {formatTime(time)}
        </motion.div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          {!isRunning && !sessionCompleted && (
            <button
              onClick={handleStart}
              className="px-6 py-3 bg-[#f1fd6b] text-black font-semibold rounded-full hover:shadow-[0_0_25px_#f1fd6b] transition-all"
            >
              Start
            </button>
          )}

          {isRunning && (
            <button
              onClick={() => setIsRunning(false)}
              className="px-6 py-3 bg-white/10 border border-[#f1fd6b3a] rounded-full hover:bg-white/20"
            >
              Pause
            </button>
          )}

          {(isRunning || sessionCompleted) && (
            <button
              onClick={handleReset}
              className="px-6 py-3 border border-[#f1fd6b] rounded-full hover:bg-[#f1fd6b15]"
            >
              Reset
            </button>
          )}
        </div>

        {/* Quote */}
        <p className="mt-8 text-gray-300 italic text-lg">“{quote}”</p>

        {/* Session complete message */}
        {sessionCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-10 bg-[#f1fd6b20] border border-[#f1fd6b40] px-6 py-4 rounded-xl text-[#f1fd6b] text-lg shadow-[0_0_25px_#f1fd6b50]"
          >
             Great job! You completed a{" "}
            <span className="font-semibold">{focusDuration / 60} minute</span>{" "}
            session on <span className="font-semibold">{selectedTask}</span>.
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FocusMode;
