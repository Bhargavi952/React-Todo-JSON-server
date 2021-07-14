import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import "./Todo.css";
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setErorr] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getTodo(page);
  }, [page]);
  const getTodo = (page) => {
    fetch(`http://localhost:3006/todos?_page=${page}&_limit=4`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTodos(res);
        setLoading(false);
      })
      .catch((e) => {
        setErorr(e.message);
      });
  };
  const addTodo = (payload) => {
    fetch("http://localhost:3006/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        setLoading(false);
        return getTodo();
      })
      .catch((e) => {
        setErorr(e.message);
      });
  };
  const handleAddTodo = () => {
    const payload = {
      title: text,
      status: false,
    };
    addTodo(payload);
    setText("");
    console.log(todos);
  };
  return (
    <div className="todoCont">
      {loading ? (
        "Loading..........."
      ) : error ? (
        "Something went wrong"
      ) : (
        <div>
          <h1>TODO</h1>
          <TextField
            id="outlined-basic"
            label="Enter Task"
            variant="outlined"
            size="small"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            type="text"
          />
          <Button
            size="small"
            style={{ marginTop: "5px" }}
            variant="outlined"
            onClick={handleAddTodo}
          >
            Add todo
          </Button>
          <div>
            {todos.map((item, i) => {
              return (
                <div key={i}>
                  <h1>{item.title}</h1>
                </div>
              );
            })}
            {todos.length > 0 ? (
              <div className="btn">
                <Button
                  variant="outlined"
                  disabled={page === 1}
                  onClick={() => {
                    setPage(page - 1);
                  }}
                >
                  Prev
                </Button>
                <Button
                  variant="outlined"
                  disabled={todos.length < 0}
                  onClick={() => {
                    setPage(page + 1);
                  }}
                >
                  Next
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
