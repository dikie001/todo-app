import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth, db } from "../config/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState("");

  const navigate = useNavigate();
  const tasksCollection = collection(db, "tasks");

  useEffect(() => {
    const getTasks = async () => {
      try {
        const querySnapshot = await getDocs(tasksCollection);
        setTasks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) {
        console.log(e);
        toast.error("Network Error! Reload the page.");
      }
    };

    getTasks();
  }, []);

  const handleAddTask = () => {
    if (!task.trim()) {
      toast.error("Task cannot be empty!");
      return;
    }
    setCurrentTask(task);
    setShowModal(true); // Show modal before adding the task
  };

  const confirmAddTask = async () => {
    try {
      const newTask = { task: currentTask, description: taskDescription || "No description" };
      const docRef = await addDoc(tasksCollection, newTask);
      setTasks([...tasks, { id: docRef.id, ...newTask }]);
      setTask("");
      setTaskDescription("");
      setShowModal(false); // Close modal
      toast.success("Task added!");
    } catch (e) {
      console.log(e);
      toast.error("Failed to add task!");
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setTasks(tasks.filter(task => task.id !== id));
      toast.success("Task deleted!");
    } catch (e) {
      console.log(e);
      toast.error("Failed to delete task!");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out");
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
        <div className="relative bg-gradient-to-br from-[#1a032a] via-[#3b0764] to-[#0c011e] h-screen flex flex-col  items-center">
      <div>
        <h1 className="text-3xl absolute cursor-pointer font-bold top-1 left-1 text-cyan-300">
          flex
        </h1>
        <h1 onClick={logout} className="text-2xl cursor-pointer absolute underline font-semibold top-1 right-2 text-cyan-500">
          log out
        </h1>
      </div>
      <div className="md:w-200 md:border-2 md:flex md:flex-col md:items-center md:mt-20 md:px-5 md:py-5 md:border-purple-700 md:shadow-md md:shadow-purple-500">
        <h1 className="text-4xl font-extrabold text-cyan-400 mt-20 md:mt-10 ">
          ToDo App
        </h1>
        <div className="mt-4">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border-2 shadow-lg shadow-purple-500 border-cyan-500 py-2 px-2 focus:border-purple-700 border-r-0 outline-none text-cyan-50 font-semibold rounded-l-lg text-xl md:px-8"
            type="text"
            placeholder="Enter a task"
          />
          <button
            onClick={handleAddTask}
            className="bg-cyan-500 text-xl py-2 shadow-lg shadow-purple-500 rounded-r-lg px-3 border-2 border-cyan-500 text-black font-bold hover:text-orange-800"
          >
            Add
          </button>
          <div className="mt-4">
            {tasks.map((task) => (
              <div key={task.id} className="border-2 mt-2 p-2 border-cyan-400 rounded-md flex flex-col items-center">
                <h1 className="text-2xl text-white font-bold">{task.task}</h1>
                <p className="text-gray-300">{task.description}</p>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL FOR ADDING DESCRIPTION */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
          <div className="bg-purple-800 p-5 rounded-lg shadow-lg w-96 text-white">
            <h2 className="text-xl font-bold">Add Task Description</h2>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Enter task description"
              className="w-full mt-2 p-2 bg-gray-900 border border-purple-600 rounded-md outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-purple-400 font-bold px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmAddTask}
                className="bg-cyan-400 px-4 py-2 font-bold rounded-md hover:bg-purple-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="">
        <h1 className="text-gray-500 ">powered by dikie</h1>
    </div>
    </div>
    
    </>

  );
  
};

export default TodoApp;
