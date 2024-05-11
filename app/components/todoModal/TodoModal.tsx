"use client";
import { NewTodoType, TodoType } from "@/types/commonTypes";
import { TodoModalProps } from "@/types/componentsTypes";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const TodoModal = ({
  isOpen,
  onClose,
  onAddTodo,
  onUpdateTodo,
  Todo,
}: TodoModalProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);

  const handleUpdateTodo = () => {
    const updateTodo: TodoType = {
      id: Todo.id,
      title: title || Todo.title,
      description: description || Todo.description,
      is_completed: isComplete || Todo.is_completed,
      user_id: userId || Todo.user_id,
    };

    onUpdateTodo(updateTodo);
    setTitle("");
    setDescription("");
    setIsComplete(false);
    setUserId(0);
    onClose();
  };

  const handleAddTodo = () => {
    // You can add validation logic here before adding the Todo
    const newTodo: NewTodoType = {
      title: title,
      description: description,
      is_completed: false,
      user_id: userId,
    };

    setTitle("");
    setDescription("");
    setIsComplete(false);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "block" : "hidden"}`}>
      <div className="modal-overlay absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80">
        <div className="modal-container bg-white w-96 mx-auto mt-20 p-6 rounded shadow-lg">
          <div className="mb-4">
            <div className="flex justify-between">
              <h3 className="text-2xl font-semibold mb-2">Add Todo</h3>
              <button onClick={onClose}>
                <FaTimes className="text-3xl text-red-500 hover:text-gray-700 cursor-pointer" />
              </button>
            </div>

            <label className="block text-gray-600 text-sm mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title || Todo.title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 mb-2"
            />
            <label
              className="block text-gray-600 text-sm mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={10}
              value={description || Todo.description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2 mb-2"
            />

            <label
              className="block text-gray-600 text-sm mb-2"
              htmlFor="userid"
            >
              User ID
            </label>

            <input
              type="number"
              id="userid"
              value={userId || Todo.user_id}
              onChange={(e) => setUserId(parseInt(e.target.value))}
              className="w-full border p-2 mb-2"
            />
          </div>

          <div className="flex justify-end">
            {Todo.id !== 0 ? (
              <button
                onClick={handleUpdateTodo}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                update Todo
              </button>
            ) : (
              <button
                onClick={handleAddTodo}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Todo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
