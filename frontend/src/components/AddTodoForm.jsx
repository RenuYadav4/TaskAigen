import React, { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addTodo } from "../services/todoService";
import { TodoContext } from "../context/TodoContext";

const AddTodoForm = ({ isOpen, onClose, categoryId, onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const {setTodos} = useContext(TodoContext);

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  }, [isOpen, categoryId]);

  // Detect click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      const todoData = {
        title,
        description,
        dueDate,
        category: categoryId || null,
      };
      const res = await addTodo(todoData);

      
      // if (onTaskAdded) onTaskAdded(res.data.message);
      if (res.data && res.data.todo) {
        setTodos((prev) => [...prev, res.data.todo]);
      } else {
        setTodos((prev) => [...prev, res.data]);
      }
      onClose(); // close after adding
    } catch (err) {
      console.error("Error adding todo:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "tween", duration: 0.35 }}
          className="fixed inset-0 z-50 flex justify-end bg-black/30"
        >
          <motion.div
            ref={formRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="w-[90%] bg-gray-900 sm:w-[400px] h-full text-white shadow-2xl border-l border-white/10 flex flex-col p-6"
          >
            {/* Header */}
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-100">
                  {categoryId ? "Add Task to Category" : "Add Task"}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-200 transition text-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Subheading */}
              <p className="text-sm text-gray-400 italic">
                {categoryId
                  ? "You're adding this task under a specific category."
                  : "You're adding this task without any category — it will appear in common tasks."}
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col flex-grow justify-between"
            >
              <div>
                {/* Title Input */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-400 mb-1">
                    Task Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title..."
                    className="w-full bg-gray-800/60 p-3 rounded-md text-gray-200 focus:ring-2 focus:ring-blue-400 outline-none"
                    autoFocus
                  />
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-400 mb-1">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add details about this task..."
                    rows="3"
                    className="w-full bg-gray-800/60 p-3 rounded-md text-gray-200 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                  />
                </div>

                {/* Due Date */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-400 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                    className="w-full bg-gray-800/60 p-3 rounded-md text-gray-200 focus:ring-2 focus:ring-blue-400 outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-gray-700 rounded-lg hover:bg-gray-600 transition text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-blue-500 hover:bg-blue-400 rounded-lg font-medium text-white transition text-sm cursor-pointer disabled:opacity-70"
                >
                  {loading ? "Adding..." : "Add Task"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddTodoForm;
