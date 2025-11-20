import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import TodoDashboard from '../components/TodoDashboard';
import { TodoContext } from '../context/TodoContext';
import Calendar from '../components/Calender';
import { Outlet } from 'react-router-dom';

const Home = () => {
  const { isSmallScreen, setIsSmallScreen, setHovered, hovered } = useContext(TodoContext);
  const effectiveSmallScreen = hovered ? false : isSmallScreen;
  const [showCalendar, setShowCalendar] = useState(false);


  return (
    <div className=" flex relative min-h-screen  items-center justify-center bg-gradient-to-br from-slate-950 via-gray-900 to-black overflow-hidden text-white">
      {/* <Navbar/> */}
      <Sidebar
        setShowCalendar={setShowCalendar}
        isSmallScreen={effectiveSmallScreen}
        setHovered={setHovered}
        setIsSmallScreen={setIsSmallScreen}
      />

      <div
        className={`flex flex-col overflow-y-auto hide-scrollbar shadow-amber-200 shadow-md  h-[92vh] md:w-[82%] xl:w-[80%] rounded-2xl 
        ${isSmallScreen ? "w-[70%] relative left-10" : "lg:w-[72%] left-30 relative"}`}
      >

        <Outlet />
      </div>

      <div className="ml-25 z-20 left-25  absolute flex w-full justify-start">
        {showCalendar && <Calendar />}

      </div>

    </div>
  )
}

export default Home