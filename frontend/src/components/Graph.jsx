import React, { useContext } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { AuthContext } from "../context/AuthContext";

const Graph = () => {
  const { user } = useContext(AuthContext);

  const data =
    user?.taskHistory?.map((item) => ({
      day: item.day,
      progress: item.progress, // correct raw value: 0,2,4
    })) || [];

  return (
    <div className=" bg-gray-900 shadow-[#f1fd6b] shadow-lg p-5 rounded-2xl w-full h-[320px] flex flex-col">
      <h2 className="text-white text-lg font-semibold mb-4 flex items-center justify-between">
        Weekly Progress
        <span className="text-sm text-gray-400 font-normal">Activity Overview</span>
      </h2>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f1fd6b" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#f1fd6b" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#4b5563"
              opacity={0.4}
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            {/* Correct Y-axis for 0,2,4 values */}
            <YAxis
              ticks={[0, 2, 4]}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => [`${value}`, "Progress"]}
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #f1fd6b",
                borderRadius: "10px",
                color: "#fff",
              }}
              cursor={{ stroke: "#f1fd6b", strokeWidth: 1 }}
            />

            <Area
              type="monotone"
              dataKey="progress"
              stroke="#f1fd6b"
              strokeWidth={3}
              fill="url(#colorProgress)"
              dot={{ r: 5, stroke: "#f1fd6b", strokeWidth: 2, fill: "#1f2937" }}
              activeDot={{ r: 7, fill: "#f1fd6b", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;
