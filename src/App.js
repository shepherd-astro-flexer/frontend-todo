import React, { useState } from "react";
import "./App.css" // ! This is to import css from a relative path, we don't need any namee i.e import styles from "./App.css"
import sunIcon from "./images/icon-sun.svg";
import moonIcon from "./images/icon-moon.svg";
import CloseIcon from '@mui/icons-material/Close';

function App() {
  // ! Object is the key :)
  const [theme, setTheme] = useState("dark");
  const [todos, updateTodos] = useState([
    {
      name: "Complete onine Javascript course",
      id: 0,
      checked: false,
      dragging: false
    },{
      name: "Jog around the park 3x",
      id: 1,
      checked: false,
      dragging: false
    },{
      name: "10 minutes meditaton",
      id: 2,
      checked: false,
      dragging: false
    },{
      name: "Read for 1 hour",
      id: 3,
      checked: false,
      dragging: false
    },{
      name: "Pick up groceries",
      id: 4,
      checked: false,
      dragging: false
    },{
      name: "Complete Todo App On Frontend Mentor",
      id: 5,
      checked: false,
      dragging: false
    },
  ]);

  const [input, updateInput] = useState({
    name: "", // ! Both name and id will start as an empty string, then we are going to update them while typing
    id: todos.length,
    checked: false
  })

  const [filteredTodos, setFilteredTodos] = useState("All");
  // ! This is what we map instead of the todos state, then we use the state of 'filteredTodos' to determine what items do we want to filter out from the filteredArray
  const filteredArray = todos.filter(todo => {
    if (filteredTodos === "Active") {
      return !todo.checked;
    } else if (filteredTodos === "Completed") {
      return todo.checked;
    } else {
      return true;
    }
  })

  const filterMode = mode => {
    setFilteredTodos(mode);
  }

  const [activeTodos, updateActiveTodos] = useState(todos.length);

  const drag = (todoId, bool) => {
    updateTodos(prevValue => {
      return prevValue.map(val => {
        return todoId === val.id ? {...val, dragging: bool} : val;
      })
    })
  }
  return (
    <div className={`body ${theme === "dark" ? "dark" : "light"}`}>
      <header className={theme === "dark" ? "dark-theme" : "light-theme"}>
        <div className="title-container">
          <h1>TODO</h1>
          <img onClick={() => {
            setTheme(prevValue => {
              return prevValue === "dark" ? "light" : "dark";
            });
          }} className={`theme-toggle ${theme === "dark" ? "dark-hover" : "light-hover"}`} src={theme === "dark" ? sunIcon : moonIcon} alt="theme" />
        </div>
      </header>
      <div className="todos-body">
      <div className={`input-container ${theme === "dark" ? "todo-dark-bg" : "todo-light-bg"}`}>
        <label className="toggle-container">
          <input type="checkbox" onChange={e => {
            const checkbox = e.target.checked;
            updateActiveTodos(prevValue => {
              return checkbox && input.name !== "" ? prevValue + 1 : prevValue;
            })

            updateInput(prevValue => {
              return checkbox && input.name !== "" ? {...prevValue, name: "" , id: prevValue.id + 1} : prevValue;
            })
            
            updateTodos(prevValue => {
              return checkbox && input.name !== "" ? [...prevValue, input] : [...prevValue];
            })
          }} />
          <span className={`toggle-appear ${theme === "dark" ? "todo-dark-bg toggle-dark-border" : "todo-light-bg toggle-light-border"}`}></span>
        </label>
        <input className={theme === "dark" ? "todo-dark-bg todo-dark-text" : "todo-light-bg todo-light-text"} onChange={e => {
            const name = e.target.value;

            updateInput(prevValue => {
              return {...prevValue, name}});
        }} value={input.name} type="text" placeholder="Create a new todo..." autoCorrect="none" />
      </div>
      <div className="dark-shadow">
        {filteredArray.map((todo, idx) => {
          return (
            <div onDragStart={() => drag(todo.id, true)} onDragEnd={() => drag(todo.id, false)} 
            key={idx} id={idx} className={`todos-container draggable ${todo.dragging && "dragging"} ${theme === "dark" ? "todo-dark-bg todo-dark-bottom-border" : "todo-light-bg todo-light-bottom-border"}`} draggable="true">
              <label className="toggle-container">
                <input id={todo.id} onChange={e => {
                  const {checked} = e.target;
                  console.log(todo.id, checked);
                  updateActiveTodos(prevValue => {
                    return checked ? prevValue -1 : prevValue + 1;
                  })
                  // We change the current value of the checked property depending on the value of checked(e)
                  updateTodos(prevValue => {
                    return prevValue.map(val => {
                      return val.id === todo.id ? {...val, checked} : val;
                    })
                  })
                }} type="checkbox" value={todo.checked} checked={todo.checked} />
                <span className={`toggle-appear ${theme === "dark" ? "toggle-dark-border" : "toggle-light-border"}`}></span>
              </label>
              <p className={`todo-item ${todo.checked && theme === "dark" ? "checked-through dark-check-through" : ""} ${todo.checked && theme === "light" ? "checked-through light-check-through" : ""} ${theme === "dark" ? "todo-dark-text" : "todo-light-text"}`}>{todo.name}</p>
              <span onClick={() => {
              
                updateActiveTodos(prevValue => {
                  return !todo.checked ? prevValue - 1 : prevValue;
                })
                
                updateTodos(prevValue => {
                  return prevValue.filter(val => {
                    return todo.id !== val.id; // ! we are only using 1 equal sign, so the type won't matter when comparing
                  })
                })
              }} className={`close-button ${theme === "dark" ? "todo-dark-close" : "todo-light-close"}`}><CloseIcon /></span>
            </div>
          )
        })}
        <div className={`todos-container manipulate-cont ${theme === "dark" ? "todo-dark-bg todo-dark-filter-text" : "todo-light-bg todo-light-filter-text"}`}>
          <p className="items-left">{activeTodos} items left</p>
          <div className="middle-cont">
            <h5 className={`${filteredTodos === "All" ? "focused" : ""} ${theme === "dark" ? "h5-dark-text" : "h5-light-text"}`} onClick={e => {
              filterMode(e.target.innerText);
            }}>All</h5>
            <h5 className={`${filteredTodos === "Active" ? "focused" : ""} ${theme === "dark" ? "h5-dark-text" : "h5-light-text"}`} onClick={e => {
              filterMode(e.target.innerText);
            }}>Active</h5>
            <h5 className={`${filteredTodos === "Completed" ? "focused" : ""} ${theme === "dark" ? "h5-dark-text" : "h5-light-text"}`} onClick={e => {
              filterMode(e.target.innerText);
            }}>Completed</h5>
          </div>
          <p className="clear" onClick={() => {
            updateTodos(prevValue => {
              return prevValue.filter(prev => {
                return !prev.checked;
              })
            })
          }}>Clear Completed</p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;

            