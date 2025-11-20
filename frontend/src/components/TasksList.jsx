import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../context/TodoContext'
import { CategoryContext } from '../context/CategoryContext';
import TaskCards from './TaskCards';
import { AuthContext } from '../context/AuthContext';

const TasksList = () => {
  const { todos } = useContext(TodoContext);
  // const { isloading } = useContext(CategoryContext);
  const [selectedType, setSelectedType] = useState("Total");
  const completedCount = todos.filter(todo => todo.status === "completed").length;
  const pendingCount = todos.filter(todo => todo.status === "pending").length;
  const overdueCount = todos.filter(todo => todo.status === "overdue").length;
  const totalCount = todos.length;

  const type = [
    { label: "Completed", count: completedCount },
    { label: "Pending", count: pendingCount },
    { label: "Overdue", count: overdueCount },
    { label: "Total", count: totalCount }
  ];

  

  return (
    <>

      {/* heading */}
      <h1 className='p-4 text-xl md:text-2xl text-white font-semibold'>WorkSpace</h1>

      {/* dotted line separator */}
      <div className="relative z-[60] pointer-events-none">
        <div
          className="w-full h-[2px] mb-8"
          style={{
            backgroundImage: "radial-gradient(circle, #D8BFD8 25%, transparent 25%)",
            backgroundSize: "10px 10px",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "center",
            opacity: 0.9,
          }}
        ></div>
      </div>

      {/* cards wrapper */}
      <div className="relative">

        {/* glowing element for md and up - top centered */}
        <div className="hidden md:flex xl:hidden flex-col items-center justify-center mb-8 mt-[-20px] relative overflow-hidden pointer-events-none">
          {/* soft glowing orb */}
          <div className="absolute w-[220px] h-[220px] rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-400 to-amber-200 blur-[100px] opacity-25 animate-pulse"></div>

          {/* floating light ring */}
          <div className="absolute w-[180px] h-[180px] border border-fuchsia-300/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute w-[200px] h-[200px] border border-purple-400/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

          {/* elegant text */}
          <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-fuchsia-200 via-purple-200 to-amber-100 bg-clip-text text-transparent mt-6 z-10 animate-[float_6s_ease-in-out_infinite]">
            Illuminate your Focus
          </h2>
          <p className="text-gray-400 mt-2 text-sm text-center z-10 max-w-[250px]">
            Calm mind. Clear goals. A workspace that inspires momentum.
          </p>
        </div>

        <h1 className="ml-5 text-[22px] font-semibold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-4 max-w-[60vw]">
          <span className='text-2xl '>View</span> tasks faster with our intelligent view & <span className='text-3xl text-[#ad7ea4]'>search System</span>
        </h1>


        <div className='p-5 xl:justify-start flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap lg:flex-wrap xl:flex-nowrap justify-center gap-3'>
          {type.map((stat, index) => (
            <div
              key={index}
              className='flex flex-col bg-gray-950/40 justify-center items-center 
                        w-full sm:w-[45%] md:w-full lg:w-[22%] xl:w-[10vw]
                       h-[14vh] sm:h-[15vh] md:h-[20vh] lg:h-[18vh] xl:h-[20vh]
                       rounded-2xl shadow-sm border border-gray-600 
                      relative bottom-10 md:bottom-5 transition-all duration-300 hover:scale-[1.02]'
            >
              <button className='relative hover:underline cursor-pointer left-10 lg:left-8 xl:left-12
             md:bottom-6 lg:bottom-5 text-sm sm:text-sm md:text-lg lg:text-base'
                onClick={() => setSelectedType(stat.label)}
              >
                view
              </button>
              <p className='text-xl sm:text-2xl md:text-3xl text-gray-300'>{stat.count}</p>
              <div className='px-2 sm:px-3 relative right-6 sm:right-5 lg:right-4 xl:right-8 top-0 sm:top-2 cursor-pointer mt-3 sm:mt-0 bg-gradient-to-b from-purple-600 to-purple-100 rounded-lg'>
                <h3 className='text-xs sm:text-sm md:text-md text-black mb-1'>{stat.label}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* glowing element for xl - right side */}
        <div className="hidden xl:flex rounded-2xl flex-col items-center justify-center
                        absolute right-[6vw] top-0 h-full w-[35%] overflow-hidden pointer-events-none">

          {/* soft glowing orb */}
          <div className="absolute w-[280px] h-[280px] rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-400 to-amber-200 blur-[120px] opacity-25 animate-pulse"></div>

          {/* floating light ring */}
          <div className="absolute w-[220px] h-[220px] border border-fuchsia-300/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute w-[260px] h-[260px] border border-purple-400/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

          {/* elegant text */}
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-fuchsia-200 via-purple-200 to-amber-100 bg-clip-text text-transparent mt-8 z-10 animate-[float_6s_ease-in-out_infinite]">
            Illuminate your Focus
          </h2>
          <p className="text-gray-400 mt-2 text-sm text-center z-10 max-w-[250px]">
            Calm mind. Clear goals. A workspace that inspires momentum.
          </p>
        </div>
      </div>

      {/* tasklist */}
      <TaskCards filterType={selectedType} />

      {/* custom keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </>
  )
}

export default TasksList
