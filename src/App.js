import React, { useState } from "react";
import "./App.css" // ! This is to import css from a relative path, we don't need any namee i.e import styles from "./App.css"
import theme from "./images/icon-sun.svg";
import CloseIcon from '@mui/icons-material/Close';

function App() {
  const [inputText, updateInputText] = useState("");
  const [todos, updateTodos] = useState(["Complete onine Javascript course", "Jog around the park 3x", "10 minutes meditaton", "Read for 1 hour", "Pick up groceries", "Complete Todo App On Frontend Mentor"]);

  return (
    <div>
      <header>
        <div className="title-container">
          <h1>TODO</h1>
          <img className="theme-toggle" src={theme} alt="theme-image" />
        </div>
      </header>
      <div className="input-container">
        <label className="toggle-container">
          <input type="checkbox" onChange={e => {
            const checkbox = e.target.checked;
            
            updateTodos(prevValue => {
              return checkbox && inputText !== "" ? [...prevValue, inputText] : [...prevValue];
            })
          }} />
          <span className="toggle-appear"></span>
        </label>
        <input onChange={e => {
            const value = e.target.value;

            updateInputText(value);
        }} value={inputText} type="text" placeholder="Create a new todo..." autoCorrect="none" />
      </div>
      <div>
        {todos.map((todo, idx)=> {
          return (
            <div key={idx} id={idx} className="todos-container">
              <label className="toggle-container">
                <input onChange={e => {
                  console.log(e.target.checked);
                }} type="checkbox" />
                <span className="toggle-appear"></span>
              </label>
              <p className="todo-item">{todo}</p>
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
