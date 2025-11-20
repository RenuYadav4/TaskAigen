import React, { useContext, useState } from "react";
import { CategoryContext } from "../context/CategoryContext";
import { TodoContext } from "../context/TodoContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaTasks, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const { categories } = useContext(CategoryContext);
  const { todos } = useContext(TodoContext);
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState(null);

  const getTasksByCategory = (categoryId) => {
    return todos.filter(
      (task) =>
        task.category === categoryId || task.category?._id === categoryId
    );
  };

  const toggleExpand = (categoryId) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  return (
    <div className="mt-10 px-6 py-10 text-gray-100 min-h-screen">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#9bb85a] via-[#859f4b] to-[#738545] bg-clip-text text-transparent drop-shadow-lg">
           Explore Your Task Categories 
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Organize, focus, and sparkle while managing your goals 
        </p>
      </div>

{categories.length > 0 && (
  <p className="mb-15 px-6 md:text-lg sm:text-base lg:text-xl text-[#d7dbce] font-medium inline-block border-l-4 border-[#8fab4f] pl-4 drop-shadow-md">
    Tip: Select any category from the sidebar to add tasks to it — your added tasks will be shown here inside their categories.
  </p>
)}



      {/* No categories */}
      {(!categories || categories.length === 0) && (
        <p className="text-center text-gray-500 italic">
          No categories yet... time to add your first one! 
        </p>
      )}

      {/* Categories Grid */}
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start">
        {categories.map((cat, index) => {
          const catTasks = getTasksByCategory(cat._id);
          const isExpanded = expandedCategory === cat._id;
          const visibleTasks = isExpanded ? catTasks : catTasks.slice(0, 3);

          return (
            <motion.div
              key={cat._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-3xl p-8 backdrop-blur-md bg-[#11170e]/80 border border-[#738545]/20 hover:border-[#738545]/50 shadow-lg hover:shadow-[#738545]/30 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Decorative glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#738545]/20 rounded-full blur-3xl"></div>

              {/* Header */}
              <div className="flex items-center justify-between mb-6 z-10">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#a6c264]">
                  {cat.name}
                </h2>
                <FaTasks className="text-[#9bb85a] text-xl" />
              </div>

              {/* Task List with Animated Height */}
              <AnimatePresence>
                <motion.div
                  key={isExpanded ? "expanded" : "collapsed"}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-3 mb-4 z-10 overflow-hidden"
                >
                  {catTasks.length > 0 ? (
                    visibleTasks.map((task) => (
                      <motion.div
                        key={task._id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-r from-[#161d11] to-[#1d2616] border border-[#738545]/20 rounded-lg px-4 py-2 text-sm text-gray-200 flex justify-between items-center hover:border-[#a3bb5f]/40 transition-all duration-300"
                      >
                        <span className="truncate max-w-[70%]">
                          {task.title}
                        </span>
                        <span
                          className={`text-xs px-2 py-[2px] rounded-full font-medium ${
                            task.status === "completed"
                              ? "bg-green-500/20 text-green-300"
                              : task.status === "overdue"
                              ? "bg-red-500/20 text-red-300"
                              : "bg-yellow-500/20 text-yellow-300"
                          }`}
                        >
                          {task.status}
                        </span>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic text-sm text-center">
                      No tasks yet  Add one to get started!
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Toggle Button */}
              {catTasks.length > 3 && (
                <button
                  onClick={() => toggleExpand(cat._id)}
                  className="text-[#a3bb5f] text-xs mb-4 hover:underline self-end transition-all duration-200 z-10"
                >
                  {isExpanded ? "View Less ↑" : "View All ↓"}
                </button>
              )}

              {/* Bottom Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-[#859f4b] via-[#8fab4f] to-[#738545] rounded-full py-3 hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-[#8fab4f]/30 z-10"
                onClick={() => navigate(`/tasks?category=${cat._id}`)}
              >
                Do Task Now <FaArrowRight className="text-xs mt-[1px]" />
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
