import Link from "next/link";
import Card from "./components/card";
import { TodoType } from "@/types/commonTypes";

async function getTodos() {
  const res = await fetch("http://localhost:3000/api/todos");
  const data = await res.json();
  return data;
}
export default async function Home() {
  const todos: TodoType[] = await getTodos();
  return (
    <main>
      <div className="pt-6 pb-12 bg-gray-300">
        <div id="card" className="">
          <h2 className="text-center text-4xl xl:text-5xl">
            GetItDone: Turning To-Dos into Done!
          </h2>
          <Link href="/admin">
            <h2 className="text-center text-4xl xl:text-5xl">Admin</h2>
          </Link>
          {/* <link href="/admin">Admin</link> */}
          {/* <!-- container for all cards --> */}
          <div className="container w-100 lg:w-4/5 mx-auto flex flex-col">
            {todos.map((todo, i: number) => (
              <>
                <Link href={`/todo/${todo.id}`}>
                  <Card todo={todo} />
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
