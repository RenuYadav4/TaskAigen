import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaSun,
  FaCalendarAlt,
  FaBell,
  FaTasks,
  FaChartLine,
  FaSignOutAlt,
  FaUserCircle,
  FaPlus,
  FaEdit,
  FaTrash,
  FaThLarge,
} from "react-icons/fa";
import { IoTimer } from "react-icons/io5";
import { TodoContext } from "../context/TodoContext";
import { AuthContext } from "../context/AuthContext";
import { CategoryContext } from "../context/CategoryContext";
import { addCategory, deleteCategory } from "../services/categoryService";
import AddTodoForm from "./AddTodoForm";
import { AnimatePresence, motion } from "framer-motion";

const Sidebar = ({ isSmallScreen, setHovered, setShowCalendar }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [reminderActive, setReminderActive] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const { hovered, todos } = useContext(TodoContext);
  const { logoutUser, user, loading, setOpenGenerator } = useContext(AuthContext);
  const dropdownRef = useRef();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [message, setMessage] = useState("");
  const { categories, setCategories, newCategory, setNewCategory, isLoading } = useContext(CategoryContext);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = () => {
    setHovered(false);
  };

  console.log(categories);
  const displayUsername = loading ? "Loading..." : (user?.name);

  const handleCalendarClick = () => {
    setHovered(false);
    setShowCalendar((prev) => !prev);
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() === "") return;

    try {
      const res = await addCategory({ name: newCategory });
      setCategories(prev => [...prev, res.data]);
      setNewCategory("");
      setShowAddCategory(false);
    } catch (err) {
      console.error("error adding category:", err);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const res = await deleteCategory(id);
      console.log(res);

      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (error) {
      console.log("error deleting category:", error);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddCategory();
    }
  };

  const handleTaskAdded = (msg, type = "success") => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(""), 2500);
  };


  const now = new Date();
  const readableTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const completedCount = todos.filter(todo => todo.status === "completed").length;
  const pendingCount = todos.filter(todo => todo.status === "pending").length;

  const type = [
    { label: "Completed", count: completedCount },
    { label: "Pending", count: pendingCount },

  ];

  return (
    <>

      {/* show message if task is added or not */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg z-50 transition-all duration-500
              ${message.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}
            `}          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      <aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`z-20  cursor-pointer shadow-purple-300 bg-gray-900 rounded-r-2xl shadow-md 
    flex flex-col p-4 space-y-6 transition-all duration-300 
    fixed left-0 h-[92vh] overflow-y-auto hide-scrollbar
    ${isSmallScreen ? "w-16 text-[10px]" : "w-60 text-[14px]"}`}
      >


        {/* User Profile */}
        <div className="relative flex-shrink-0" ref={dropdownRef}>
          <button
            onClick={() => {
              // if (isSmallScreen && !hovered) setHovered(true);
              setShowProfile((prev) => !prev);
            }}
            className="flex items-center gap-3 mb-6 w-full text-left cursor-pointer"
          >
            <FaUserCircle className={`${isSmallScreen ? "text-2xl" : "text-4xl"} text-white`} />
            {!isSmallScreen && (
              <div className="flex flex-col">
                <p className="text-white font-semibold">{displayUsername}</p>
                <p className="text-gray-400 text-sm">View Profile</p>
              </div>
            )}
          </button>

          {/* Profile Dropdown */}
          {showProfile && !isSmallScreen && (
            <div className="absolute left-0 mt-2 w-full bg-gray-800 rounded-xl border-2 border-purple-500  shadow-lg p-5 flex flex-col gap-4 z-20 ">
              <div className="flex items-center gap-3">
                <FaUserCircle className="text-4xl text-white" />
                <div>
                  <p className="text-white font-semibold">{user.name}</p>
                  <p className="text-gray-400 text-sm">View Profile</p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                {type.map((item) => (
                  <p>{item.label}: <span>{item.count}</span></p>
                ))}
              </div>


            </div>
          )}
          {/* add tasks */}
          {!isSmallScreen && <p
            onClick={() => {
              setSelectedCategoryId(null);
              setShowAddForm(true);
            }}
            className="absolute right-4 text-white  cursor-pointer 
  hover:text-yellow-300 text-lg transition-colors duration-300"
          >
            + Add Tasks
          </p>}
        </div>

        {/* Navigation */}
        <nav className="mt-5 flex-1 flex flex-col gap-2 overflow-y-auto hide-scrollbar">

          {/* My Day */}
          {/* <button
            onClick={handleOptionClick}
            className="cursor-pointer flex items-center gap-3 px-2 py-3 rounded-lg text-gray-200 hover:text-white hover:shadow-[0_0_8px_#ffffff] w-full text-left transition-all duration-300"
          >
            <FaSun className="text-xl" />
            {!isSmallScreen && "My Day"}
          </button> */}



          {/* Calendar */}
          <button
            onClick={handleCalendarClick}
            className="flex cursor-pointer items-center gap-3 px-2 py-3 rounded-lg text-gray-200 hover:text-white hover:shadow-[0_0_8px_#ffffff] w-full text-left transition-all duration-300"
          >
            <FaCalendarAlt className="text-xl" />
            {!isSmallScreen && "Calendar"}
          </button>

          {/* Reminder */}
          <button
            onClick={() => {
              setReminderActive(!reminderActive);
              handleOptionClick();
            }}
            className={`flex cursor-pointer items-center gap-3 px-2 py-3 rounded-lg text-gray-200 w-full text-left transition-all duration-300 ${reminderActive
              ? "bg-gray-700 text-white shadow-[0_0_8px_#ffffff]"
              : "hover:text-white hover:shadow-[0_0_8px_#ffffff]"
              }`}
          >
            <FaBell className="text-xl" />
            {!isSmallScreen && "Reminder"}
            {!isSmallScreen && <span className="ml-auto">{reminderActive ? "●" : "○"}</span>}
          </button>

          {/* ai section */}
          <button onClick={() => setOpenGenerator(true)} className="flex text-md cursor-pointer p-3 justify-center items-center group shadow-[0_0_8px_#D500F9] rounded-lg">
            <p>
              <span className={`${isSmallScreen ? "hidden" : "inline"}`}>
                Generate your plan by {" "}
              </span>
              <span className="bg-gradient-to-t from-[#4e1358] to-[#D500F9] py-1 px-1.5 rounded-md font-bold">Ai</span>
            </p>
          </button>


          <div className="border-t border-gray-700 my-3"></div>

          {/* Categories */}
          <div className="flex items-center gap-2 mb-2">
            {isSmallScreen ? (
              !hovered ? (
                <FaThLarge className="text-gray-400 text-lg" /> // Icon when not hovered
              ) : (
                <p className="text-gray-400 uppercase text-xs font-semibold">
                  Categories
                </p> // Text on hover for small screen
              )
            ) : (
              <p className="text-gray-400 uppercase text-xs font-semibold">
                Categories
              </p> // Always show text on large screens
            )}
          </div>

          {isLoading ? (
            <p className="text-gray-400">Loading categories...</p>
          ) : categories.length === 0 ? (
            <p>Add Categories to precise your tasks</p>
          ) : (
            categories.map((cat) => (
              <div
                key={cat._id}   //or cat._id
                className="flex justify-between items-center group hover:shadow-[0_0_8px_#ffffff] rounded-lg"
              >
                <button
                  onClick={() => {
                    setSelectedCategoryId(cat._id)
                    setShowAddForm(true);
                  }}
                  className="flex cursor-pointer items-center gap-3 p-2 rounded-lg text-gray-200 transition-all duration-300 hover:text-white w-full text-left"
                >
                  {!isSmallScreen && cat.name}
                </button>
                {!isSmallScreen && (
                  <FaTrash
                    onClick={() => handleDeleteCategory(cat._id)}
                    className="text-gray-500 opacity-0 group-hover:opacity-100 hover:text-red-500 cursor-pointer transition-all duration-200 mr-2"
                  />
                )}
              </div>
            ))
          )}


          {/* Add Category Button */}
          <button
            onClick={() => setShowAddCategory(true)}
            className="flex items-center gap-3 mt-2 p-2 text-gray-400 hover:text-white hover:shadow-[0_0_8px_#ffffff] rounded-lg transition-all duration-300"
          >
            <FaPlus className="text-lg" />
            {!isSmallScreen && "Add Category"}
          </button>

          {/* Add Category Popup */}
          {showAddCategory && (
            <div className="mt-3 flex flex-col gap-2 bg-gray-800 p-3 rounded-lg border border-gray-700">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="New category name"
                className="bg-gray-900 text-gray-100 px-3 py-2 rounded-lg text-sm outline-none border border-gray-700 focus:border-purple-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddCategory}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-1 text-sm"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddCategory(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg py-1 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="border-t border-gray-700 my-3"></div>

          {/* Other Links */}
          {/* <Link
            to="/dashboard/progress"
            onClick={handleOptionClick}
            className="flex cursor-pointer items-center gap-3 px-2 py-3 rounded-lg text-gray-200 transition-all duration-300 hover:text-white hover:shadow-[0_0_8px_#ffffff]"
          >
            <FaChartLine className="text-xl" />
            {!isSmallScreen && "Progress"}
          </Link> */}

          <Link
            to="/dashboard/workspace"
            onClick={handleOptionClick}
            className="flex cursor-pointer items-center gap-3 px-2 py-3 rounded-lg text-gray-200 transition-all duration-300 hover:text-white hover:shadow-[0_0_8px_#ffffff]"
          >
            <FaTasks className="text-xl" />
            {!isSmallScreen && "workspace"}
          </Link>

          {/* Focus Mode */}
          <Link
            to="/dashboard/focus-mode"
            onClick={handleOptionClick}
            className="flex cursor-pointer items-center gap-3 px-2 py-3 rounded-lg text-gray-200 transition-all duration-300 hover:text-white hover:shadow-[0_0_8px_#ffffff]"
          >
            <IoTimer className="text-xl" />
            {!isSmallScreen && "Focus Mode"}
          </Link>




          <Link
            onClick={logoutUser}
            className="flex cursor-poiner items-center gap-3 px-2 py-3 rounded-lg text-gray-200 transition-all duration-300 hover:text-white hover:shadow-[0_0_8px_#ffffff]"
          >
            <FaSignOutAlt className="text-xl" />
            {!isSmallScreen && "Logout"}
          </Link>

          <div
            className={`flex ${hovered ? "text-xl" : "text-[8px]"} text-purple-500 justify-end w-full lg:text-xl`}
          >
            <span>{readableTime}</span>
          </div>
        </nav>
      </aside>
      <AddTodoForm
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onTaskAdded={handleTaskAdded}
        categoryId={selectedCategoryId}
      />
    </>
  );
};

export default Sidebar;
