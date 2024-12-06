import React, { useState } from "react";
import { ITask } from "../types";

type IAddTaskForm = {
  onAddTask: (taskObj: Partial<ITask>) => void;
};

type FormData = {
  title: string;
  category: string;
  description: string;
};
const AddTaskForm = ({ onAddTask }: IAddTaskForm) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
  });

  const onChangeHandler = (key: keyof FormData, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAddTask(formData);
      }}
    >
      <input
        value={formData?.title}
        placeholder="Add Title"
        onChange={(e) => onChangeHandler("title", e.target.value)}
      />
      <input
        value={formData?.category}
        placeholder="Add Category"
        onChange={(e) => onChangeHandler("category", e.target.value)}
      />
      <input
        value={formData?.description}
        placeholder="Add Description"
        onChange={(e) => onChangeHandler("description", e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTaskForm;
