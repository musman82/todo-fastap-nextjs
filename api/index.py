from fastapi import FastAPI, HTTPException
import uvicorn
from sqlmodel import Session, select
from dotenv import load_dotenv
load_dotenv()

from .models.todos import Todos, UpdateTodo, Users
from .config.db import create_tables  , engine

app = FastAPI()

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}

# Create Users
@app.post("/api/users")
def create_todo(user: Users):
    with Session(engine) as session:
        session.add(user)
        session.commit()
        session.refresh(user)
        return {"status": 200, "message": "user created successfully"}
    
# Authorize Users
@app.post("/api/login")
def read_user(email: str, password: str):
    with Session(engine) as session:
        statement = select(Users).where(Users.email == email,Users.password == password)
        results = session.exec(statement)
        user = results.first
    if user is None:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    return {"user": user}

# Get Todo List
@app.get("/api/todos")
def get_todos():
    with Session(engine) as session:
        statement = select(Todos)
        results = session.exec(statement)
        data = results.all()
        print(data)
        return data

@app.get("/api/todos-user/{user_id}")
def get_todos_single(user_id:int):
    with Session(engine) as session:
        statement = select(Todos).where(Todos.user_id == user_id)
        results = session.exec(statement)
        data = results.all()
        print(data)
        return data

@app.get("/api/todos/{todo_id}")
def get_todos_single(todo_id:int):
    with Session(engine) as session:
        statement = select(Todos).where(Todos.id == todo_id)
        results = session.exec(statement)
        data = results.all()
        print(data)
        return data


@app.put("/api/todo/{todo_id}")
def update_todo(todo_id:int, todo: UpdateTodo):
    with Session(engine) as session:
        db_todo = session.get(Todos, todo_id)
        if not db_todo:
            raise HTTPException(status_code=404, detail="Todo not found")
        todo_data = todo.model_dump(exclude_unset=True)
        db_todo.sqlmodel_update(todo_data)
        session.add(db_todo)
        session.commit()
        session.refresh(db_todo)
        return {"status": 200, "message": "todo updated successfully"}


@app.post("/api/todos")
def create_todo(todo: Todos):
    with Session(engine) as session:
        session.add(todo)
        session.commit()
        session.refresh(todo)
        return {"status": 200, "message": "todo created successfully"}


@app.delete("/todos/{todo_id}")
def delete_todo(todo_id:int):
    with Session(engine) as session:
        print(todo_id)
        db_todo = session.get(Todos, todo_id)
        print(db_todo)
        if not db_todo:
            raise HTTPException(status_code=404, detail="Todo not found")
        session.delete(db_todo)
        return  {"status": 200, "message": "todo deleted successfully"}

def start():
    create_tables()
    print("In Start Method")
    uvicorn.run("api.index:app", host="127.0.0.1", port=8000, reload=True)