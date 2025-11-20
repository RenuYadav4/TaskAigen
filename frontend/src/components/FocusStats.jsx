import React from "react";

const FocusStats = ({ stats }) => {
  const defaultStats = [
    { title: "Focus Hours Today", value: "3h 45m" },
  ];

  const data = stats || defaultStats;

  return (
    <div className="flex flex-col gap-3 w-full items-center px-2">
      <h3 className="mt-10 text-lg md:text-xl font-semibold text-[#f1fd6b] mb-2 text-center">
        Focus Stats
      </h3>

      <div className="flex flex-col items-center w-full">
        {data.map((stat, idx) => (
          <div
            key={idx}
            className="relative p-6 md:p-10 flex flex-col justify-end bg-gray-800/40 backdrop-blur-md border border-gray-700 rounded-xl w-full max-w-sm md:max-w-[35vw] h-[30vh] hover:shadow-[0_0_15px_#f1fd6b30] transition-all overflow-hidden"
          >
            {/* Background Image */}
            <img
              src="./timer.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-2">
              {/* Beautiful Creative Title */}
              <span className="text-[#f1fd6b] font-semibold text-sm md:text-lg italic tracking-wide break-words whitespace-normal">
                The time you invested in becoming a better you
              </span>

              {/* Existing Title */}
              <span className="text-gray-300 text-sm md:text-base">{stat.title}</span>

              {/* Bigger Value */}
              <span className="text-[#f1fd6b] font-extrabold text-2xl md:text-5xl mt-1 drop-shadow-[0_0_10px_#f1fd6b80]">
                {stat.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FocusStats;
