import React from "react";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Diet & Nutrition",
    desc: "Track meals, hydration, and maintain a healthy lifestyle.",
    image: "./diet-plans.jpg", // replace with your image
  },
  {
    title: "Study & Learning",
    desc: "Boost your learning goals with consistent study routines.",
    image: "study.jpg", // replace with your image
  },
  {
    title: "Workout & Fitness",
    desc: "Stay active with daily exercise plans and progress tracking.",
    image: "workout.jpg", // replace with your image
  },
];

const CategoryExamples = () => {
  return (
    <div className="w-full px-6 py-10 text-white">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-2xl md:text-3xl font-bold text-center mb-8"
      >
        Make Your Tasks Specific to Your Goals
      </motion.h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-[#f1fd6b] hover:shadow-2xl transition-shadow cursor-pointer"
          >
            {/* Image */}
            <div className="h-40 w-full overflow-hidden">
              <motion.img
                src={cat.image}
                alt={cat.title}
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-1">{cat.title}</h3>
              <p className="text-gray-400 text-sm">{cat.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryExamples;
