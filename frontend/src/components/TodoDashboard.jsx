import React, { useContext, useEffect, useState } from 'react'
import Daysofmonths from './Daysofmonths';
import Progress from './Progress';
import Graph from './Graph';
import TaskSummary from './TaskSummary';
import FocusStats from './FocusStats';
import { AuthContext } from '../context/AuthContext';
import Categories from './Categories';
import PlanGenerator from './planGenerator';
// import { getUserProgress } from '../services/authService';


const TodoDashboard = () => {
    const userImageUrl = "https://i.pravatar.cc/150?img=3"; // URL of the image
    const { user, loading, openGenerator } = useContext(AuthContext);

    const displayUsername = loading ? "loadding..." : (user.name);
    console.log(user);

    const now = new Date();
    const readableTime = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
    // progress

    return (
        <div className='flex flex-col bg-gradient-to-t from-[#333b1f] via-slate-950 to-[#738545] backdrop-blur-xl items-center md:items-start md:p-2 w-[70vw] md:w-[82vw] lg:w-full '>
            <div className='flex w-full'>
                {/* user name aligned to right */}
                <div className="w-full flex-1 z-10 sticky top-0 flex justify-start">
                    <div className="flex items-center gap-2 p-1 ">
                        {/* Profile Image */}
                        <div
                            className="h-12 w-12 rounded-full bg-cover bg-center border border-white"
                            style={{ backgroundImage: `url(${userImageUrl})` }}
                        ></div>

                        {/* Name */}
                        <p className="text-base md:text-lg font-medium">{displayUsername}</p>
                    </div>
                </div>

                <div className='flex justify-end mt-2 text-sm md:text-lg'>
                    <span>{readableTime}</span>
                </div>

            </div>

            {/* content */}
            <div className='xl:flex'>
                <div className='flex flex-col md:flex md:flex-row gap-8'>
                    <div className="flex flex-col items-center gap-4 mt-2 lg:p-1">
                        <Daysofmonths />
                        <Progress />

                    </div>
                    {/* graph */}
                    <div >
                        <Graph />
                        <TaskSummary />
                        <FocusStats />
                        {/* <AiPlanGenerator/> */}
                    </div>

                    {openGenerator &&
                        <PlanGenerator />
                    }
                </div>


                {/* hero image */}
                <div className="ml-5 hidden xl:flex flex-col items-center justify-end h-[80vh] w-[20vw] 
                bg-gradient-to-tl from-[#585c33] to-transparent backdrop-blur-2xl 
                rounded-3xl border-2 border-white/20 relative overflow-hidden  p-4">

                    {/* Glowing / Illumination Behind Image */}
                    <div className="absolute inset-0 flex justify-center items-end z-0">
                        <div className="w-3/4 h-[70vh] rounded-full bg-white/10 blur-3xl"></div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative flex justify-center items-end w-full h-[65vh]">

                        <img
                            src="/heroImage.jpg"
                            alt="Hero"
                            className=" h-full object-contain relative z-10  transform scale-x-[-1]"
                        />

                        {/* Elliptical Shadow */}
                        <div className="absolute bottom-2 w-3/4 h-4 bg-black/30 rounded-full blur-lg z-0"></div>
                    </div>

                    {/* Motivational Text */}
                    <h2 className="text-white text-center text-2xl  m font-bold drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)] mb-15">
                        Achieve your daily goals
                    </h2>

                    {/* Clickable Add Tasks */}
                    <p
                        onClick={() => alert("Add Task clicked!")}
                        className="absolute bottom-4 right-4 text-white font-semibold cursor-pointer 
               hover:text-yellow-300 text-lg transition-colors duration-300"
                    >
                        + Add Tasks
                    </p>

                </div>

            </div>
            <Categories />
        </div>
    )
}

export default TodoDashboard