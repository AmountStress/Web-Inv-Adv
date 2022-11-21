import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export const TaskContext = createContext();

export function TaskContextProvider(props) {
  const [tasks, setTasks] = useState([]);

  function createTask(task) {
    setTasks([
      ...tasks,
      {
        title: task.title,
        id: tasks.length + 1,
        description: task.description,
      },
    ]);
  }

  const fecthListTask = () => {
    axios
      .get("http://127.0.0.1:8000/api/categorias")
      .then((res) => {
        setTasks(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fecthListTask();
  }, []);

  function deleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
    axios.delete("http://127.0.0.1:8000/api/categorias/" + taskId);
  }

  function editTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        deleteTask,
        editTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}

export default TaskContextProvider;
