import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import { TodoContext } from "../context/TodoContext"; //  added
import Features from "../components/Features";
import { useNavigate } from "react-router-dom";
import CategoryExamples from "../components/CategoryExamples";
import { CgProfile } from "react-icons/cg";


const LandingPage = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { isSmallScreen } = useContext(TodoContext); //  added
  const [activeImage, setActiveImage] = useState(0); //  added
  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false);

  const previewImages = [
    "/dashboard.png",
    "/Categories.png",
    "/taskListPage.jpg",
    "/FocusMode.png",
    "/GeneratePlan.png",
  ];

  // auto image toggle animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % previewImages.length); // loops through all images
    }, 4000);
    return () => clearInterval(interval);
  }, []);


  // auto image toggle animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % previewImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // handler function for protected clicks
  const handleProtectedClick = (path) => {
    if (user) {
      navigate(path);
    } else {
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center relative overflow-hidden">
      {/* Navbar */}
      <nav className="w-full fixed top-0 bg-transparent backdrop-blur-md z-50 flex justify-between items-center px-8 py-4">
        <div className="text-xl font-bold text-[#f1fd6b] relative right-5">
          TaskAIgen
        </div>

        <div className="flex gap-3 items-center">
          {user ? (
            <div className="flex items-center gap-2 bg-white/10 border border-[#f1fd6b3a] px-4 py-1 rounded-full">
              <CgProfile className="text-2xl text-purple-500" />

              <span className="text-gray-300 font-semibold">{user.name}</span>
              <Link
                className="text-white hover:text-[#f1fd6b] transition"
              >
              </Link>
              <button
                onClick={logoutUser}
                className="cursor-pointer ml-2 px-3 py-1 rounded-full bg-gray-800 border-2 border-purple-400 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 md:px-5 md:py-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-[#f1fd6b3a] hover:bg-white/20 transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 md:px-5 md:py-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-[#f1fd6b3a] hover:bg-white/20 transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col gap-[-10px] items-center justify-center text-center h-screen relative px-4"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#f1fd6b1a] to-transparent blur-3xl opacity-40"></div>

        {[
          { icon: "", x: "-40%", y: "-30%", delay: 0 },
          { icon: "", x: "40%", y: "-25%", delay: 1 },
          { icon: "", x: "-30%", y: "30%", delay: 2 },
          { icon: "", x: "30%", y: "35%", delay: 3 },
          { icon: "", x: "0%", y: "50%", delay: 4 },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: [0.3, 1, 0.3],
              y: [0, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute text-3xl md:text-4xl text-[#f1fd6b]/70 select-none pointer-events-none"
            style={{ left: item.x, top: item.y }}
          >
            {item.icon}
          </motion.div>
        ))}

        <motion.img
          src="/Heroemlement.jpg"
          alt="Hero Element"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: [0.5, 1, 0.5],
            rotate: [0, 360],
            scale: [0.95, 1, 0.95],
            filter: [
              "drop-shadow(0 0 20px rgba(241,253,107,0.2))",
              "drop-shadow(0 0 35px rgba(241,253,107,0.6))",
              "drop-shadow(0 0 20px rgba(241,253,107,0.2))",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[50%] left-[50%] w-[250px] md:w-[400px] opacity-80 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        />

        <div className="relative z-10 flex flex-col w-full items-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
            Smarter Productivity with <span className="text-[#f1fd6b]">TaskAIgen</span>
          </h1>
          <p className="text-gray-200 text-lg max-w-xl mb-8 text-center">
            Customize your tasks by category, get AI-generated one-week plans for your goals,
            and manage everything from your secure dashboard — all in one intelligent productivity hub.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleProtectedClick("/dashboard/focus-mode")}
              className="px-6 cursor-pointer py-3 bg-[#f1fd6b] text-black rounded-full font-semibold hover:shadow-[0_0_20px_#f1fd6b] transition-all"
            >
              Try Focus Mode
            </button>

            <button
              onClick={() => {
                const featuresSection = document.getElementById("features-section");
                if (featuresSection) {
                  featuresSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-6 cursor-pointer py-3 border border-[#f1fd6b] rounded-full hover:bg-[#f1fd6b1a] transition-all"
            >
              Explore Features
            </button>
          </div>

          <p className="mt-8 text-sm text-gray-400 italic">
            “Productivity isn’t about doing more — it’s about feeling in control.”
          </p>
        </div>

        <button
          onClick={() => handleProtectedClick("/dashboard")}
          className="fixed z-10 bottom-30 animate-bounce px-10 py-5 border cursor-pointer bg-[#fff] text-[#000] border-[#fff] rounded-full  font-bold transition-all"
        >
          Get Started
        </button>

      </motion.section>

      {/*  Dashboard Preview Section (Newly Added) */}
      <div className="flex flex-col items-center justify-center mt-10 md:mt-20 px-4 lg:h-[100vh] lg:w-[100vw]">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#f1fd6b] mb-4">
          A Sneak Peek into Your TaskZen Dashboard
        </h2>
        <p className="text-gray-300 max-w-xl text-center mb-6">
          Experience the harmony of productivity — from tracking your focus hours to completing your todos seamlessly.
        </p>

        <div className="relative w-[85%] md:w-[60%] h-[300px] md:h-[400px] overflow-hidden flex items-center justify-center">
          {previewImages.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt={`Preview ${index + 1}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: activeImage === index ? 1 : 0,
                x: activeImage === index ? 0 : 50,
              }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="absolute w-full h-full object-contain rounded-2xl border border-[#f1fd6b3a] shadow-[0_0_25px_#f1fd6b30]"
            />
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          {previewImages.map((_, index) => (
            <motion.div
              key={index}
              animate={{
                scale: activeImage === index ? 1.3 : 1,
                backgroundColor: activeImage === index ? "#9ca3af" : "#4b5563",
              }}
              className="w-3 h-3 rounded-full"
            ></motion.div>
          ))}
        </div>

      </div>
      <div id="features-section">
        <CategoryExamples />
        <Features />

      </div>

      {/* alert */}
      {alertVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="fixed top-20 md:top-10 left-1/2 -translate-x-1/2 z-50 bg-[#1a1a1a] border border-[#f1fd6b3a] text-[#f1fd6b] px-6 py-3 rounded-full shadow-[0_0_20px_#f1fd6b40]"
        >
          ⚠️ You’re not logged in — please <span className="font-semibold">login</span> or <span className="font-semibold">sign up</span> to continue.
        </motion.div>
      )}

      <Footer />
    </div>
  );
};

export default LandingPage;
