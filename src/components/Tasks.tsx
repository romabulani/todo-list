import React, { useCallback, useState } from "react";
import { ITask } from "../types";
import { tasksData } from "../data/constants";
import AddTaskForm from "./AddTaskForm";

const Tasks = () => {
  const [tasks, setTasks] = useState<ITask[]>(tasksData);
  const onTaskCompleted = useCallback(
    (id: number) => {
      const newTasks = tasks.map((task) =>
        task.id === id ? { ...task, status: "completed" } : task
      );
      setTasks(newTasks);
    },
    [tasks]
  );

  const onTaskDeleted = useCallback(
    (id: number) => {
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
    },
    [tasks]
  );

  const onAddTask = useCallback((taskObj: Partial<ITask>) => {
    const newTask = {...taskObj, status: "pending", id: tasks.length+1} as ITask
    setTasks([...tasks, newTask])
  }, [tasks])

  return (
    <>
    <div className="tasks-container">
      {tasks.map(({ id, title, description, category, status }) => (
        <div
          key={id}
          className={`${
            status === "completed" ? "completed-task" : "pending-task"
          } task`}
        >
          <p>Title: {title}</p>
          <p>Description: {description}</p>
          <p>Category: {category}</p>

          <div className="button-container">
            <button className="button" onClick={() => onTaskCompleted(id)}>
              Done
            </button>
            <button className="button" onClick={() => onTaskDeleted(id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
    <AddTaskForm onAddTask={onAddTask}/>
    </>
  );
};

export default Tasks;
