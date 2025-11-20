import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

const Daysofmonths = () => {
  const {
    today,
    currentMonth,
    currentYear,
    months,
    weekdays,
    daysInMonth,
    currentWeek,
  } = useContext(TodoContext);

  // 🧮 Calculate start and end of week
  const startDay = (currentWeek - 1) * 7 + 1;
  const endDay = Math.min(startDay + 6, daysInMonth(currentMonth, currentYear));

  // 🗓 Create week dates
  const weekDates = [];
  for (let i = startDay; i <= endDay; i++) {
    weekDates.push(i);
  }

  return (
    <div className="h-[20vh] w-[65vw] md:h-35 md:w-[40vw] lg:w-[35vw] xl:h-45 xl:w-[30vw] rounded-3xl bg-slate-900/60 backdrop-blur-2xl p-4 xl:p-8 shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-semibold text-white text-shadow-2xs text-sm md:text-lg ">
          {months[currentMonth]} {currentYear}
        </h1>
        <h2 className="text-sm md:text-lg font-medium text-white text-shadow-2xs">
          Week {currentWeek}
        </h2>
      </div>

      {/* Week view */}
      <div className="grid grid-cols-7 gap-2 md:gap-4 xl:gap-7 text-center">
        {weekDates.map((date, index) => {
          const isToday =
            today.getDate() === date &&
            today.getMonth() === currentMonth &&
            today.getFullYear() === currentYear;

            const dayOfWeek = new Date(currentYear, currentMonth, date).getDay();

          return (
            <div
              key={date}
              className={`flex h-10 w-6 md:h-14 md:w-8 xl:h-16 xl:w-12 flex-col items-center justify-center p-2 rounded-lg transition-all duration-200
                ${isToday 
                  ? 'bg-[#f1fd6b] text-black scale-105 shadow-lg shadow-yellow-300' 
                  : 'bg-transparent text-white hover:bg-gray-200 hover:text-black shadow-md shadow-white/50'}
              `}
            >
              <span className="text-[10px] font-medium">{weekdays[dayOfWeek]}</span>
              <span className="text-sm font-semibold">{date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Daysofmonths;
