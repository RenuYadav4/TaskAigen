// components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0a0a0a] text-white border-t border-[#f1fd6b3a] mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-[#f1fd6b]">TaskZen</div>

        {/* Links */}
        <div className="flex gap-6">
          <Link to="/dashboard" className="hover:text-[#f1fd6b] transition-all">
            Dashboard
          </Link>
         
          <Link to="/login" className="hover:text-[#f1fd6b] transition-all">
            Login
          </Link>
          <Link to="/signup" className="hover:text-[#f1fd6b] transition-all">
            Sign Up
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-xl text-[#f1fd6b]">
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full text-center text-gray-500 text-sm py-4 border-t border-[#f1fd6b1a]">
        © {new Date().getFullYear()} TaskZen. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
