import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Progress = () => {
  const [radius, setRadius] = useState(50);
  const { user,  } = useContext(AuthContext);

  // Update radius on window resize
  useEffect(() => {
    const updateRadius = () => {
      setRadius(window.innerWidth < 640 ? 45 : 60); // small screen radius = 35, large = 50
    };

    updateRadius(); // initial call
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * user.progress) / 100;

  return (
    <div className="w-[65vw] lg:w-[30vw] mx-auto p-3 md:p-2 shadow-lg flex flex-col items-center gap-6  md:w-80 xl:w-118 rounded-3xl 
                    bg-slate-900/30 backdrop-blur-2xl xl:p-8 ">
      {/* Circular Progress */}
      <div
        className="relative animate-pulse flex items-center justify-center "
        style={{
          width: radius * 2 + strokeWidth * 2,
          height: radius * 2 + strokeWidth * 2,
        }}
      >
        <svg width={radius * 2 + strokeWidth * 2} height={radius * 2 + strokeWidth * 2}>
          {/* Background circle */}
          <circle
            r={radius}
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            fill="transparent"
            stroke="#4B5563"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Progress circle */}
          <circle
            r={radius}
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            fill="transparent"
            stroke="#f1fd6b"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${radius + strokeWidth} ${radius + strokeWidth})`}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-white text-xs md:text-3xl font-bold">{user.progress}%</span>
          {/* <span className="text-gray-300 text-xs">{user.messages}</span> */}
        </div>
      </div>

      {/* Buttons below progress */}
      <div className="flex flex-col gap-3 w-full md:w-[70%] lg:w-[80%]">
        <button className="cursor-pointer w-full py-2 md:p-3  bg-gray-700 text-white font-medium rounded-full hover:bg-gray-600 hover:shadow-amber-200 hover:shadow-2xs">
          {/* {user.message} */}
          {`${user.message ? user.message : "do some tasks to make progress"}`}
        </button>

        <Link to="/dashboard/workspace"  className="cursor-pointer flex justify-center w-full py-2 md:p-3 bg-gray-700 text-white font-medium rounded-full hover:bg-gray-600 hover:shadow-amber-200 hover:shadow-2xs">
          Submit Now
        </Link>
        <button className=" cursor-pointer w-full  py-2 md:p-3 bg-gray-700 text-white font-medium rounded-full hover:bg-gray-600 hover:shadow-amber-200 hover:shadow-2xs">
          Review Progress
        </button>
      </div>
    </div>
  );
};

export default Progress;
