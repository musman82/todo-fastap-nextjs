"use client";
import { useState } from "react";
import { BiCommentEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { TodoType } from "@/types/commonTypes";
import TodoModal from "@/app/components/todoModal/TodoModal";

async function getTodos() {
  const res = await fetch("http://localhost:3000/api/todos");
  const data = await res.json();
  return data;
}
export default async function TodoList() {
  const todos: TodoType[] = await getTodos();
  const [Todos, setTodos] = useState<TodoType[]>(todos);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [Todo, setTodo] = useState<TodoType>({
    id: 0,
    title: "",
    description: "",
    is_completed: false,
    user_id: 0,
  });

  const onAddTodo = (Todo: TodoType) => {
    setTodos([...Todos, Todo]);
  };
  const onClose = () => {
    setIsOpen(false);
    setTodo({
      id: 0,
      title: "",
      description: "",
      is_completed: false,
      user_id: 0,
    });
  };

  const onUpdateTodo = (TodoRecord: TodoType) => {
    console.log(TodoRecord);
    setTodos(Todos.map((e) => (e.id === TodoRecord.id ? TodoRecord : e)));
    setTodo({
      id: 0,
      title: "",
      description: "",
      is_completed: false,
      user_id: 0,
    });
  };

  const onDeleteHandler = (Todo: TodoType) => {
    const filterdTodos: TodoType[] = Todos.filter((e) => e.id !== Todo.id);
    setTodos(filterdTodos);
  };

  const onEditHandler = (Todo: TodoType) => {
    setTodo(Todo);
    setIsOpen(true);
  };
  return (
    <div className="m-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Todo List</h2>
        <button
          className="flex justify-center items-center mb-2 bg-green-500 rounded p-1"
          onClick={() => setIsOpen(true)}
        >
          {/* <MdAddChart /> */}
          Add Todo
        </button>
      </div>

      <TodoModal
        Todo={Todo}
        isOpen={isOpen}
        onClose={onClose}
        onAddTodo={onAddTodo}
        onUpdateTodo={onUpdateTodo}
      />

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">User ID</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Todos.length > 0 ? (
            Todos.map((Todo) => (
              <tr key={Todo.title} className="hover:bg-gray-50 text-center">
                <td className="py-2 px-4 border-b">{Todo.title}</td>
                <td className="py-2 px-4 border-b">{Todo.description}</td>
                <td className="py-2 px-4 border-b">{Todo.is_completed}</td>
                <td className="py-2 px-4 border-b">{Todo.user_id}</td>
                <td className="flex justify-center py-2 px-4 border-b">
                  <button
                    onClick={() => onEditHandler(Todo)}
                    className="flex mr-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    {" "}
                    <BiCommentEdit className="mt-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteHandler(Todo)}
                    className="flex ml-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    <MdDeleteForever className="mt-1" /> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                No Todo Found!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
