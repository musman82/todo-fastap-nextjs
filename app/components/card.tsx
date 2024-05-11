import React from "react";
import { TodoType } from "@/types/commonTypes";

const Card = (props: { todo: TodoType }) => {
  return (
    <div className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2">
      <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
        <h2 className="font-semibold text-3xl leading-tight truncate">
          {props.todo.title}
        </h2>
        <p className="mt-2">{props.todo.description}</p>
        <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
          {props.todo.user_id}
        </p>
      </div>
    </div>
  );
};
export default Card;
