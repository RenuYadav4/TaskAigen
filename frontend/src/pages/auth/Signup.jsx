import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


const Signup = () => {
  const [swapped, setSwapped] = useState(false);
  const [stopAnimation, setStopAnimation] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();


  const [alertMessage, setAlertMessage] = useState(""); // New state for alert
  const [alertType, setAlertType] = useState("success"); // success or error
  const { setUser, setToken } = useContext(AuthContext);
  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(formData);
      const { token } = response.data;

      // store token in local storage
       localStorage.setItem("authToken", token);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        setUser(response.data);
        setToken(token);

      // Show success message
      setAlertMessage("Signup successful!");
      setAlertType("success");

      // Clear form fields
      setFormData({ name: "", email: "", password: "" });

      // Hide message after 2 seconds
      setTimeout(() => {
        setAlertMessage("");
        navigate("/"); // Home page
      }, 2000);

      console.log("User Registered:", response);
    } catch (error) {
      console.error("Signup error:", error);

      // Show error message
      setAlertMessage(error.response?.data?.message || "Signup failed. Try again!");
      setAlertType("error");

      // Hide message after 2 seconds
      setTimeout(() => setAlertMessage(""), 2000);
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMediumScreen(window.innerWidth >= 786);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (stopAnimation || !isMediumScreen) return;
    const interval = setInterval(() => setSwapped((prev) => !prev), 3000);
    return () => clearInterval(interval);
  }, [stopAnimation, isMediumScreen]);

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden text-white">
        {/* Neon Glow Orbs */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-blue-600 rounded-full blur-[120px] opacity-40"></div>
          <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-pink-600 rounded-full blur-[120px] opacity-40"></div>
          <div className="absolute top-[300px] left-[50%] translate-x-[-50%] w-[500px] h-[300px] bg-purple-700 rounded-full blur-[100px] opacity-20"></div>
        </div>

        {/* Main Container */}
        <div className="relative z-10 flex h-[70vh] w-[340px] md:h-[80vh] md:w-[750px] lg:w-[80vw] rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(255,255,255,0.1)] border border-white/10 backdrop-blur-lg bg-gradient-to-br from-gray-900/80 to-black/80">

          {/* Left Section - Form */}
          <motion.div
            animate={{ x: swapped ? "83%" : "0%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="flex-1 flex justify-center items-center bg-transparent"
          >
            <div className="flex flex-col items-center w-full relative">
              <h1 className="text-xl md:text-3xl xl:text-4xl font-semibold tracking-wide text-center mb-6 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                Join the <span className="font-extrabold">Family</span> to Grow
              </h1>

              {/* Alert Message */}
              {alertMessage && (
                <div
                  className={`absolute top-[-60px] w-[90%] md:w-[70%] lg:w-[60%] text-center py-2 rounded-lg ${alertType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    } shadow-lg`}
                >
                  {alertMessage}
                </div>
              )}

              {/* Social Buttons */}
              <div className="flex flex-col xl:flex-row gap-4 mb-6">
                <button className="flex items-center gap-3 px-4 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_#00FFFF] transition-all duration-300">
                  <img src="/google.png" alt="Sign up with Google" className="h-6 w-6" />
                  <span className="text-sm font-semibold text-gray-200">Sign Up with Google</span>
                </button>

                <button className="flex items-center gap-3 px-4 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_#FF00FF] transition-all duration-300">
                  <img src="/linkedin.png" alt="Sign up with Linkedin" className="h-6 w-6" />
                  <span className="text-sm font-semibold text-gray-200">Sign Up with Linkedin</span>
                </button>
              </div>

              {/* Form Inputs */}
              <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
                <div className="relative w-72 lg:w-80">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-md pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="border border-white/20 bg-black/30 rounded-xl px-10 py-3 w-full text-gray-100 placeholder-gray-500 focus:outline-none focus:border-pink-500 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] focus:shadow-[0_0_15px_#ff00ff]"
                    required
                    name="name"
                    value={name}
                    onChange={handleChange}
                    onFocus={() => setStopAnimation(true)}
                  />
                </div>

                <div className="relative w-72 lg:w-80">
                  <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-md pointer-events-none" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="border border-white/20 bg-black/30 rounded-xl px-10 py-3 w-full text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] focus:shadow-[0_0_15px_#00FFFF]"
                    required
                    name="email"
                    value={email}
                    onChange={handleChange}
                    onFocus={() => setStopAnimation(true)}
                  />
                </div>

                <div className="relative w-72 lg:w-80">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-md pointer-events-none" />
                  <input
                    type="password"
                    placeholder="Password"
                    className="border border-white/20 bg-black/30 rounded-xl px-10 py-3 w-full text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] focus:shadow-[0_0_15px_#a855f7]"
                    required
                    name="password"
                    value={password}
                    onChange={handleChange}
                    onFocus={() => setStopAnimation(true)}
                  />
                </div>

                <Button type="submit" />
              </form>
            </div>
          </motion.div>

          {/* Right Section - 3D Gradient Glass Panel */}
          <motion.div
            animate={{ x: swapped ? "-122%" : "0%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="hidden md:block relative w-[45%] bg-gradient-to-br from-pink-700/40 via-purple-700/30 to-blue-700/40 backdrop-blur-xl"
          >
            {/* Glow Edge */}
            <div className="absolute left-0 top-0 w-[6px] h-full bg-gradient-to-b from-pink-500 to-blue-400 shadow-[0_0_25px_#00ffff]"></div>

            <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
                Back to Productivity
              </h2>
              <p className="mt-4 lg:max-w-[20vw] text-gray-300 text-base drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                Log in to continue exploring your tasks and achieve more today!
              </p>

              <button
                onClick={() => navigate("/login")}
                className="mt-8 cursor-pointer border border-white/30 px-8 py-3 rounded-xl text-white font-bold tracking-wider hover:bg-white/10 hover:shadow-[0_0_25px_#00ffff] transition-all duration-300">
                LOG IN
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Signup;
