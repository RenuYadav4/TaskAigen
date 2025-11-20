import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import { CategoryContext } from "../context/CategoryContext";
import { deleteTodo, deleteTodosBatch, updateTodo, updateTodoStatus } from "../services/todoService";
import { AuthContext } from "../context/AuthContext";

const TaskCards = ({ filterType }) => {
    const { todos, setTodos } = useContext(TodoContext);
    const { isloading } = useContext(CategoryContext);
    const { setUser,setProgressData ,user } = useContext(AuthContext);
    const [completed, setCompleted] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [editingTask, setEditingTask] = useState(null);
    const [editForm, setEditForm] = useState({
        title: "",
        description: "",
        dueDate: "",
    });
    const [selectedTasks, setSelectedTasks] = useState([]);
    const selectAllRef = useRef();

    const filteredTasks = useMemo(() => {
        let tasks = todos;

        //   filter by search term first
        if (searchTerm.trim()) {
            tasks = tasks.filter((task) => task.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // apply type filter from parent
        if (filterType && filterType != "Total") {
            tasks = tasks.filter((task) => task.status.toLowerCase() === filterType.toLowerCase());
        }

        return tasks;

    }, [todos, searchTerm, filterType]);


    useEffect(() => {
        if (selectedTasks.length > 0 && selectedTasks.length < filteredTasks.length) {
            selectAllRef.current.indeterminate = true;
        } else {
            // selectAllRef.current.indeterminate = false;
        }
    }, [selectedTasks, filteredTasks]);

    // wherever handleMarkCompleted exists (e.g., TodoItem or TodoList)
    const handleMarkCompleted = async (index, taskId) => {
        // optimistic UI
        setCompleted((prev) => ({ ...prev, [index]: true }));

        try {
            const res = await updateTodoStatus(taskId, { status: "completed" });
            // res contains userProgress already (we return userProgress from controller)
            // update tasks locally
            setTodos((prev) => prev.map(t => t._id === taskId ? { ...t, status: "completed" } : t));

            // Update dashboard progress using fresh backend value (non-blocking)
            // If you have getUserProgress endpoint, you can call it, but it's better to use the returned userProgress:
            if (res !== undefined) {
                setProgressData(prev => ({
                    ...prev,
                    progress: res.data.progress,
                    message: res.data.progress === 0 ? "🌱 Start Growing" : `⚡ Your progress is ${res.data.userProgress}%`,
                }));
            } else {
                // fallback — fetch progress endpoint but don't block UI
                getUserProgress().then(({ data }) => {
                    setProgressData(data);
                }).catch(console.error);
            }
            console.log(res.data);
            if (res?.data?.user) {
                localStorage.setItem("userInfo", JSON.stringify(res.data.user));
                setUser(res.data.user);
            }

            console.log("Task marked as completed!");
        } catch (error) {
            console.error("Failed to update task status:", error);
            setCompleted((prev) => ({ ...prev, [index]: false }));
            alert("Failed to mark task as completed. Please try again.");
        }
    };


    const handleDelete = async (id) => {
        if (!id) return console.error("No task ID found for deletion");

        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this task?");
            if (!confirmDelete) return;

            const res = await deleteTodo(id);
            if (res.status === 200 || res.status === 204) {
                setTodos((prev) => prev.filter((task) => task._id !== id));
            } else {
                alert("Failed to delete task. Please try again");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("Something went wrong while deleting the task.");
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task._id);
        setEditForm({
            title: task.title,
            description: task.description,
            dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
        });
    };

    const handleSaveEdit = async (id) => {
        try {
            const updatedTask = {
                title: editForm.title,
                description: editForm.description,
                dueDate: editForm.dueDate,
            };
            const res = await updateTodo(id, updatedTask);
            console.log(res);

            if (res.status === 200) {
                setTodos((prev) =>
                    prev.map((task) => (task._id === id ? { ...task, ...updatedTask } : task))
                );
                setEditingTask(null);
            } else {
                alert("Failed to update task");
            }
        } catch (error) {
            console.error("Error updating task:", error);
            alert("Something went wrong while updating the task.");
        }
    };

    // handleSelectAll
    const handleSelectAll = () => {
        if (selectedTasks.length === filteredTasks.length) {
            setSelectedTasks([]);
        } else {
            setSelectedTasks(filteredTasks.map(task => task._id))
        }
    }

    const handleSelectTask = (id) => {
        if (selectedTasks.includes(id)) {
            // remove if already selected
            setSelectedTasks(prev => prev.filter(taskId => taskId !== id));
        } else {
            // select if not selcted when clicking the checkbox
            setSelectedTasks([...selectedTasks, id]);
        }
    }

    // delete all
    const handleDeleteSelected = async () => {
        if (selectedTasks.length === 0) return;
        console.log("Deleting IDs:", selectedTasks); // check ids before sending


        const confirmDelete = window.confirm("Are your sure you want to delete all the  selected tasks?");
        if (!confirmDelete) return;

        try {
            const res = await deleteTodosBatch(selectedTasks); // call backend batch delete
            console.log(res);
            if (res.status === 200 || res.status === 204) {
                // Update frontend state after deletion
                setTodos(prev => prev.filter(task => !selectedTasks.includes(task._id)));
                setSelectedTasks([]);
                alert("Selected tasks deleted successfully!");
            } else {
                alert("Failed to delete tasks. Please try again.");
            }
        } catch (error) {
            console.error("Failed to delete tasks:", error);
            alert("Something went wrong while deleting tasks.");
        }
    };

    return (
        <div>

            <div className="flex">
                {/* search */}
                <div>
                    <h1 className="text-lg md:text-2xl px-5 text-gray-200 font-semibold">
                        <span className="text-[#cde37d] font-bold">Search</span> your task here
                    </h1>

                    <div className="px-5 mt-3">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by category..."
                            className="w-full mdw-[300px] px-4 py-2 sm:py-3 rounded-full border border-gray-700 
          bg-gray-950/60 text-gray-100 placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-purple-500 
          focus:border-purple-400 shadow-md text-sm sm:text-base 
          transition-all duration-300 hover:bg-gray-900/70"
                        />
                    </div>
                </div>

                {/* checkbox for delet all */}
                {/* <div className="flex items-center gap-4 px-5 mt-5">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            ref={selectAllRef}
                            checked={selectedTasks.length === filteredTasks.length && filteredTasks.length > 0}
                            onChange={handleSelectAll}
                            className="w-4 h-4 accent-purple-500 cursor-pointer"
                        />
                        <span className="text-gray-300 text-sm">Select all</span>
                    </label>

                    <button
                        onClick={handleDeleteSelected}
                        disabled={selectedTasks.length === 0}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all
        ${selectedTasks.length === 0
                                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                                : "bg-red-500 text-white hover:bg-red-600 shadow-md"
                            }`}
                    >
                        Delete selected
                    </button>
                </div> */}

            </div>

            <div>
                {isloading ? (
                    <div className="text-center text-gray-500 py-8 animate-pulse">Loading tasks...</div>
                ) : filteredTasks && filteredTasks.length > 0 ? (
                    <div className="px-5 py-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {filteredTasks.map((task, index) => {
                            const isCompleted = completed[index] || task.status === "completed";
                            const isEditing = editingTask === task._id;

                            return (
                                <div
                                    key={index}
                                    className="relative bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a]
                  border border-gray-700 rounded-2xl shadow-md shadow-black/40
                  hover:shadow-purple-700/20 transition-all duration-300
                  p-5 flex flex-col justify-between
                  w-full max-w-[340px] h-auto min-h-[280px] mx-auto"
                                >
                                    {/* Done Button (Top Right) */}
                                    <button
                                        onClick={() => handleMarkCompleted(index, task._id)}
                                        className={`absolute top-3 right-3 px-3 py-[4px] rounded-full text-xs font-semibold transition-all duration-300 ${isCompleted
                                            ? "bg-green-600 text-white cursor-default"
                                            : "bg-gray-800 hover:bg-green-600 text-gray-300 hover:text-white"
                                            }`}
                                        disabled={isCompleted}
                                    >
                                        {isCompleted ? "✔" : "Done"}
                                    </button>

                                    {/* Main Content */}
                                    {isEditing ? (
                                        <div className="flex flex-col gap-3 mt-2">
                                            <input
                                                type="text"
                                                value={editForm.title}
                                                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                                placeholder="Enter title"
                                                className="w-full px-3 py-2 rounded-md bg-gray-900 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            />
                                            <textarea
                                                rows={2}
                                                value={editForm.description}
                                                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                                placeholder="Enter description"
                                                className="w-full px-3 py-2 rounded-md bg-gray-900 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            />
                                            <div>
                                                <label className="text-xs text-gray-400 block mb-1">Due Date:</label>
                                                <input
                                                    type="date"
                                                    value={editForm.dueDate}
                                                    onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-md bg-gray-900 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                />
                                            </div>
                                            <div className="flex justify-end gap-3 mt-2">
                                                <button
                                                    onClick={() => setEditingTask(null)}
                                                    className="text-gray-400 hover:text-gray-200 text-sm"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => handleSaveEdit(task._id)}
                                                    className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm hover:bg-purple-700"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex">
                                                <div>
                                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-100 leading-tight truncate mb-2">
                                                      <span className="font-light text-lg ">Task:</span>  {task.title}
                                                    </h2>
                                                    <p className="text-gray-400 text-sm sm:text-base mb-3 line-clamp-2">
                                                       Description: {task.description || "No description provided"}
                                                    </p>
                                                </div>

                                                {/* checkbox */}
                                                <input
                                                    // type="checkbox"
                                                    checked={selectedTasks.includes(task._id)}
                                                    onChange={() => handleSelectTask(task._id)}
                                                    className="w-4 h-4  accent-purple-500 cursor-pointer ml-3"
                                                />

                                            </div>



                                            {/* Light Gray Separator */}
                                            <div className="border-t border-gray-700/60 my-3"></div>

                                            {/* Category & Status Section (spaced below) */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-xs text-gray-400">Category:</span>
                                                    {task.category ? (
                                                        <span className="w-fit px-3 py-[4px] rounded-md text-xs sm:text-sm font-medium text-black bg-[#d9f7be] border border-[#b5e48c] shadow-sm">
                                                            {task.category.name}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-500 text-xs italic">No category</span>
                                                    )}
                                                </div>

                                                <div className="flex flex-col gap-1 text-right">
                                                    <span className="text-xs text-gray-400">Status:</span>
                                                    <span
                                                        className={`w-fit px-3 py-[4px] rounded-md text-xs sm:text-sm font-medium border shadow-sm ${isCompleted
                                                            ? "bg-[#fbc4e0] border-[#f8a8ce] text-black"
                                                            : "bg-[#fde1ef] border-[#f4b7d5] text-black"
                                                            }`}
                                                    >
                                                        {isCompleted ? "completed" : task.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* Bottom Row */}
                                    <div className="flex items-center justify-between border-t border-gray-700 pt-2 mt-auto">
                                        {task.dueDate ? (
                                            <p className="text-gray-500 text-xs italic">
                                                deadline : {new Date(task.dueDate).toLocaleDateString(undefined, {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        ) : (
                                            <p className="text-gray-600 text-xs italic">No due date</p>
                                        )}

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleEdit(task)}
                                                className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors duration-200 text-xs sm:text-sm"
                                                title="Edit Task"
                                            >
                                                <i className="fas fa-edit"></i>
                                                <span>Update</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(task._id)}
                                                className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors duration-200 text-xs sm:text-sm"
                                                title="Delete Task"
                                            >
                                                <i className="fas fa-trash"></i>
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-8">No tasks found</div>
                )}
            </div>
        </div>
    );
};

export default TaskCards;
