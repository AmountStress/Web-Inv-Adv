import { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import axios from "axios";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { createTask } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/categorias", {
      nombre: title,
      descripcion: description,
    });
    createTask({
      title,
      description,
    });
    setTitle("");
    setDescription("");
  };
 
  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-10 mb-4">
        <h1 className="text-2xl font-bold text-white mb-3"> Crea tu tarea</h1>
        <input
          placeholder="Add your task"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="w-full bg-slate-900 text-white p-2 rounded-md mb-4"
          autoFocus
          required
        />
        <textarea
          placeholder="Write the description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full bg-slate-900 text-white p-2 rounded-md mb-4"
          required
        ></textarea>
        <button
          className="bg-indigo-500 px-2 py-1 text-white"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
