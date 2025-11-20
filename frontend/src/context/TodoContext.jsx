import React, { createContext, useState, useEffect, useContext } from "react";
import { getTodos } from "../services/todoService";
import { AuthContext } from "./AuthContext";
import { CategoryContext } from "./CategoryContext";

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  // ===== Screen size state =====
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { user } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useState(CategoryContext)

  useEffect(() => {
    const checkScreenSize = () => {
      const small = window.innerWidth < 866;
      setIsSmallScreen(small);
      console.log("isSmallScreen:", small);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // ===== Calendar state =====
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentWeek, setCurrentWeek] = useState(1);

  //set weeknumer
  useEffect(() => {
    const date = today.getDate();
    console.log(date);
    let weeknumber = Math.ceil(date / 7);
    setCurrentWeek(weeknumber);
  }, [today]);


  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // , JavaScript automatically rolls back one day from the first day of the month.
  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  // It returns the weekday number (0–6) of the 1st day of that month.
  const firstDay = (month, year) => new Date(year, month, 1).getDay();

  const [todos, setTodos] = useState([]);

  // get todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await getTodos();
        console.log(res);
        setTodos(res.data);
      } catch (error) {
        console.log("Error fetching todos", error);
      }
      finally {
        // setIsLoading(true);
      }
    }
   fetchTodos();
    
  }, [user]);
console.log(user);

  return (
    <TodoContext.Provider
      value={{
        // Screen
        isSmallScreen,
        setIsSmallScreen,

        // Calendar
        today,
        currentMonth,
        setCurrentMonth,
        currentYear,
        setCurrentYear,
        months,
        weekdays,
        daysInMonth,
        firstDay,

        // cuurent week
        currentWeek,
        hovered,
        setHovered,

        // todo
        todos,
        setTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
