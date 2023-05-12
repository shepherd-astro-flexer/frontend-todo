import React, { useState } from "react";
import "./App.css" // ! This is to import css from a relative path, we don't need any namee i.e import styles from "./App.css"
import theme from "./images/icon-sun.svg";
import CloseIcon from '@mui/icons-material/Close';

function App() {
  const [todos, updateTodos] = useState([
    {
      name: "Complete onine Javascript course",
      id: 0,
      checked: false
    },
    {
      name: "Jog around the park 3x",
      id: 1,
      checked: false
    },
    {
      name: "10 minutes meditaton",
      id: 2,
      checked: false
    },
    {
      name: "Read for 1 hour",
      id: 3,
      checked: false
    },
    {
      name: "Pick up groceries",
      id: 4,
      checked: false
    },
    {
      name: "Complete Todo App On Frontend Mentor",
      id: 5,
      checked: false
    },
  ]);

  const [input, updateInput] = useState({
    name: "", // ! Both name and id will start as an empty string, then we are going to update them while typing
    id: "",
    checked: false
  })

  return (
    <div>
      <header>
        <div className="title-container">
          <h1>TODO</h1>
          <img className="theme-toggle" src={theme} alt="theme" />
        </div>
      </header>
      <div className="input-container">
        <label className="toggle-container">
          <input type="checkbox" onChange={e => {
            const checkbox = e.target.checked;

            updateTodos(prevValue => {
              return checkbox && input.name !== "" ? [...prevValue, input] : [...prevValue];
            })
          }} />
          <span className="toggle-appear"></span>
        </label>
        <input onChange={e => {
            const name = e.target.value;

            updateInput(prevValue => {
              return {
                ...prevValue,
                name,
                id: todos.length
              }
            });
        }} value={input.name} type="text" placeholder="Create a new todo..." autoCorrect="none" />
      </div>
      <div>
        {todos.map((todo, idx)=> {
          return (
            <div key={idx} id={idx} className="todos-container">
              <label className="toggle-container">
                <input id={todo.id} onChange={e => {
                  const {id, checked} = e.target;
                  console.log(id)

                  updateTodos(prevValue => {
                    return prevValue.map(val => {
                      return val.id == id ? {...val, checked} : val;
                    })
                  })
                }} type="checkbox" value={todo.checked} checked={todo.checked} />
                <span className="toggle-appear"></span>
              </label>
              <p className={`todo-item ${todo.checked ? "checked-through" : ""}`}>{todo.name}</p>
              <span onClick={e => {
                const id = e.currentTarget.id;
                
                updateTodos(prevValue => {
                  return prevValue.filter((val, idx) => {
                    return idx != id; // ! we are only using 1 equal sign, so the type won't matter when comparing
                  })
                })
              }} id={idx} className="close-button"><CloseIcon /></span>
            </div>
          )
        })}
        <div className="todos-container">
          
        </div>
      </div>
    </div>
  );
}

export default App;
