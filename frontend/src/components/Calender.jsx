import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const Calendar = () => {
  const {
    today,
    currentMonth,
    setCurrentMonth,
    currentYear,
    setCurrentYear,
    months,
    weekdays,
    daysInMonth,
    firstDay
  } = useContext(TodoContext);

  // Generate calendar days
  const totalDays = daysInMonth(currentMonth, currentYear);
  const calendarDays = [];

//  if firstDay = 3,
// then this loop adds 3 nulls to represent empty spaces for
// Sunday, Monday, and Tuesday before the first real date starts.
  for (let i = 0; i < firstDay(currentMonth, currentYear); i++) calendarDays.push(null);
  for (let i = 1; i <= totalDays; i++) calendarDays.push(i);

  // Optional: Functions to navigate months
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="p-4 mb-50 bg-gray-900/90 rounded-2xl">
      <div className="flex justify-between items-center mb-2">
        <button onClick={prevMonth} className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600">{"<"}</button>
        <h2 className="text-xs md:text-lg font-bold">
          {months[currentMonth]} {currentYear}
        </h2>
        <button onClick={nextMonth} className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600">{">"}</button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 text-center font-medium text-xs mb-2">
        {weekdays.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 text-xs md:gap-2 text-center">
        {calendarDays.map((day, idx) => {
          const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          return (
            <div
              key={idx}
              className={`h-10 flex items-center justify-center rounded-full ${
                isToday ? "bg-yellow-500 text-white font-bold shadow-lg" : ""
              }`}
            >
              {day || ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
