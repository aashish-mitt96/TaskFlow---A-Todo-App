import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import logo from "../assets/logo.png";

const ToDoPage = () => {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDate(now.toLocaleString()); 
    }, 1000); 
    return () => clearInterval(interval); 
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const timeAdded = new Date().toLocaleString();
      setTasks([
        ...tasks,
        { text: newTask, completed: false, timeAdded, timeCompleted: null },
      ]);
      setNewTask("");
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        const updatedTask = { ...task, completed: !task.completed };
        if (!task.completed) {
          updatedTask.timeCompleted = new Date().toLocaleString();
        } else {
          updatedTask.timeCompleted = null;
        }
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div
        className="flex flex-col justify-center items-center p-3"
        style={{ backgroundColor: "#062c40" }}
      >
        <span className="flex items-center">
          <img className="w-25 h-24 mx-2" src={logo} alt="Logo" />
          <p className="text-5xl font-bold text-white">TaskFlow</p>
        </span>
      </div>

      <div className="flex justify-center text-lg text-gray-700 mt-4">
        <p>Date: {currentDate}</p>
      </div>

      <div className="flex justify-center bg-gray-100">
        <div className="max-w-2xl w-full p-5 rounded-lg">
          <div className="flex items-center space-x-2 mb-5">
            <input
              type="text"
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 hover:border-green-500"
            />
            <button
              onClick={handleAddTask}
              className="px-4 py-2 text-white rounded-md hover:bg-green-900"
              style={{ backgroundColor: "rgb(131 219 205)" }}
            >
              Add
            </button>
          </div>

          <ul className="space-y-3">
            {tasks.map((task, index) => (
              <li
                key={index}
                className={`flex justify-between items-center p-3 border rounded-md ${
                  task.completed ? "bg-green-100" : "bg-white"
                }`}
              >
                <div className="flex items-center space-x-3 flex-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(index)}
                    className="w-5 h-5 accent-green-500"
                  />
                  <div className="flex-1">
                    <span
                      className={`${
                        task.completed
                          ? "line-through text-gray-500"
                          : "text-gray-800"
                      }`}
                    >
                      {task.text}
                    </span>
                    <div className="text-sm text-gray-500">
                      <p>Added: {task.timeAdded}</p>
                      {task.completed && <p>Completed: {task.timeCompleted}</p>}
                    </div>
                  </div>
                </div>
                <div className="w-10 flex justify-center">
                  <button
                    onClick={() => handleDeleteTask(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ToDoPage;
