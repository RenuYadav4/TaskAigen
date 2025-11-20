import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { motion, resolveElements } from "framer-motion";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const { user ,setUser, setToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      console.log(response);
      const { token } = response.data;
     console.log(response.data);

      if (token) {
        // localStorage.setItem(
        //   "userInfo",
        //   JSON.stringify({ name: response.data.name, email: response.data.email })
        // );
        localStorage.setItem("authToken", token);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        setUser(response.data);
        setToken(token);

        setAlertMessage("Login successful");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          setAlertMessage("");
          navigate("/"); // Home page
        }, 2000);
      }
      console.log("User Logged In:", response);
    } catch (error) {
      console.error("login error:", error);
      setAlertMessage(error.response?.data?.message || "Login failed. Try again!");
      setTimeout(() => setAlertMessage(""), 2000);
    }
  };

  console.log(user);
  // 🌐 Handle Google Login
  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  // 🌐 Handle LinkedIn Login
  const handleLinkedInLogin = () => {
    window.open("http://localhost:5000/auth/linkedin", "_self");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#f1fd6b1a] to-transparent blur-3xl opacity-30"></div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-md bg-white/5 border border-[#f1fd6b3a] backdrop-blur-md rounded-2xl p-8 md:p-10"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[#f1fd6b]">
          Welcome Back
        </h2>

        {alertMessage && (
          <div
            className="absolute top-[-60px] w-[90%] md:w-[70%] lg:w-[60%] text-center py-2 rounded-lg text-white shadow-lg"
          >
            {alertMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col text-left">
            <label className="text-sm mb-2 text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border border-[#f1fd6b3a] rounded-full px-4 py-2 focus:outline-none focus:border-[#f1fd6b] text-white placeholder-gray-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col text-left">
            <label className="text-sm mb-2 text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border border-[#f1fd6b3a] rounded-full px-4 py-2 focus:outline-none focus:border-[#f1fd6b] text-white placeholder-gray-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-[#f1fd6b] text-black font-semibold py-2 rounded-full hover:shadow-[0_0_20px_#f1fd6b] transition-all"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center my-6">
          <span className="text-gray-400 text-sm">or continue with</span>
        </div>

        {/* OAuth Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center gap-2 bg-white/10 border border-[#f1fd6b3a] text-white px-4 py-2 rounded-full hover:bg-white/20 transition"
          >
            <FaGoogle className="text-[#f1fd6b]" /> Google
          </button>

          <button
            onClick={handleLinkedInLogin}
            className="flex items-center gap-2 bg-white/10 border border-[#f1fd6b3a] text-white px-4 py-2 rounded-full hover:bg-white/20 transition"
          >
            <FaLinkedin className="text-[#0077B5]" /> LinkedIn
          </button>
        </div>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#f1fd6b] hover:underline hover:text-[#f8ff9c]"
          >
            Sign Up
          </Link>
        </p>

        <div className="flex justify-center mt-6">
          <Link
            to="/"
            className="text-xs text-gray-500 hover:text-[#f1fd6b] transition"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
