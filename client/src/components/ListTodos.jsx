import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import Status from "./Status";

const ListTodos = () => {

    const[todos, setTodos] = useState([]);

    //DELETE FUNCTION

    const deleteToDo = async (id) => {
        try {
            const deleteToDo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (err) {
            console.error(err);
        }
    }

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos")
            const jsonData = await response.json()
            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getTodos();
    }, [])

  return (
    <>
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>*/}
        {todos.map(todo => (
            <tr key={todo.todo_id}>
                <td className="font-weight-light">{todo.description}</td>
                <td>
                    <EditTodo todo={todo}/>
                </td>
                <td>
                  <Status />
                </td>
                <td>
                    <button className="btn btn-danger" onClick={() => deleteToDo(todo.todo_id)}>Delete</button>
                </td>
            </tr>
        ))}
        </tbody>
      </table>
    </>
  );
};

export default ListTodos;
