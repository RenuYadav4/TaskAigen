// components/TaskSummary.jsx
import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const TaskSummary = () => {
  const {todos} = useContext(TodoContext);
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
    <h1 className="mt-5 text-[#F1FD6B] font-semibold text-xl ml-3">Your tasks summary</h1>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-4">
      {type.map((item, idx) => (
        <div
          key={idx}
          className="bg-slate-900/60 backdrop-blur-2xl p-4 rounded-2xl shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform"
        >
          <p className="text-white text-xl font-bold">{item.count}</p>
          <p className="text-white/70 text-sm mt-1">{item.label}</p>
        </div>
      ))}
    </div>
    </>
  );
};

export default TaskSummary;
