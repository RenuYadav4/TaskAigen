import React from "react";
import { motion } from "framer-motion";
import { FaFolderOpen, FaPencilAlt, FaClipboardList, FaStopwatch, FaChartLine, FaTasks } from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "Create Custom Categories",
    desc: "Design your workspace with unlimited personalized categories to organize your life.",
    icon: <FaFolderOpen className="text-[#f1fd6b] text-6xl drop-shadow-[0_0_15px_#f1fd6b]" />,
  },
  {
    id: 2,
    title: "Edit & Rename Instantly",
    desc: "Easily rename, merge, or modify your categories anytime to fit your evolving goals.",
    icon: <FaPencilAlt className="text-[#6bfcfd] text-6xl drop-shadow-[0_0_15px_#6bfcfd]" />,
  },
  {
    id: 3,
    title: "Add Tasks to Categories",
    desc: "Assign specific tasks under each category and track your progress effortlessly.",
    icon: <FaClipboardList className="text-[#fda6ff] text-6xl drop-shadow-[0_0_15px_#fda6ff]" />,
  },
  {
    id: 4,
    title: "Focus Mode",
    desc: "Enter a distraction-free environment with a built-in timer to concentrate on your selected task.",
    icon: <FaStopwatch className="text-[#ffcb6b] text-6xl drop-shadow-[0_0_15px_#ffcb6b]" />,
  },
  {
    id: 5,
    title: "Focus Stats",
    desc: "Analyze your focus sessions with visual insights to track productivity trends over time.",
    icon: <FaChartLine className="text-[#6bffb0] text-6xl drop-shadow-[0_0_15px_#6bffb0]" />,
  },
  {
    id: 6,
    title: "Track Progress",
    desc: "Monitor task completion and daily achievements to stay on top of your goals.",
    icon: <FaTasks className="text-[#ff6b8f] text-6xl drop-shadow-[0_0_15px_#ff6b8f]" />,
  },
];

const Features = () => {
  return (
    <section className="relative w-full py-28 overflow-hidden  text-white">
      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-5"
        >
          <span className="bg-gradient-to-r from-[#f1fd6b] via-[#6bfcfd] to-[#fda6ff] bg-clip-text text-transparent">
            Smart Task Customization
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg mb-20"
        >
          Unlock total flexibility — craft your own system of focus by grouping, editing, and tracking tasks your way.
        </motion.p>

        {/* 3D Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              whileHover={{
                rotateY: 8,
                rotateX: -5,
                scale: 1.05,
              }}
              className="relative group backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 overflow-hidden transition-all duration-500"
              style={{
                boxShadow:
                  "0 0 25px rgba(255,255,255,0.04), 0 0 60px rgba(241,253,107,0.1)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Animated glow behind each card */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#f1fd6b1a] via-[#6bfcfd1a] to-[#fda6ff1a] blur-2xl"></div>

              {/* Card Content */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4">
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.4,
                  }}
                >
                  {feature.icon}
                </motion.div>

                <h3 className="text-xl md:text-2xl font-semibold text-white mt-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-gray-400 mt-16 text-sm italic"
        >
          “When tasks align with your mind, productivity becomes effortless.”
        </motion.p>
      </div>
    </section>
  );
};

export default Features;
