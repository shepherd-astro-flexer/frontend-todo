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
    <div>
      <header className={theme === "dark" ? "dark-theme" : "light-theme"}>
        <div className="title-container">
          <h1>TODO</h1>
          <img onClick={() => {
            setTheme(prevValue => {
              return prevValue === "dark" ? "light" : "dark";
            });
          }} className="theme-toggle" src={theme === "dark" ? sunIcon : moonIcon} alt="theme" />
        </div>
      </header>
      <div className="input-container">
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
        {filteredArray.map((todo, idx) => {
          return (
            <div onDragStart={() => drag(todo.id, true)} onDragEnd={() => drag(todo.id, false)} 
            key={idx} id={idx} className={`todos-container draggable ${todo.dragging && "dragging"}`} draggable="true">
              <label className="toggle-container">
                <input id={todo.id} onChange={e => {
                  const {id, checked} = e.target;
                  console.log(id, checked);
                  updateActiveTodos(prevValue => {
                    return checked ? prevValue -1 : prevValue + 1;
                  })
                  // We change the current value of the checked property depending on the value of checked(e)
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

                updateActiveTodos(prevValue => {
                  return !todo.checked ? prevValue - 1 : prevValue;
                })
                
                updateTodos(prevValue => {
                  return prevValue.filter((val, idx) => {
                    return idx != id; // ! we are only using 1 equal sign, so the type won't matter when comparing
                  })
                })
              }} id={idx} className="close-button"><CloseIcon /></span>
            </div>
          )
        })}
        <div className="todos-container manipulate-cont">
          <p className="items-left">{activeTodos} items left</p>
          <div className="middle-cont">
            <h5 className={filteredTodos === "All" ? "focused" : ""} onClick={e => {
              filterMode(e.target.innerText);
            }}>All</h5>
            <h5 className={filteredTodos === "Active" ? "focused" : ""} onClick={e => {
              filterMode(e.target.innerText);
            }}>Active</h5>
            <h5 className={filteredTodos === "Completed" ? "focused" : ""} onClick={e => {
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
  );
}

export default App;
// updateAllTodos(prevValue => {
              //   return prevValue.map(item => {
              //     return mapIt.map(mapItem => {
              //       return item.id === mapItem.id ? mapItem : item;
              //     })
              //   })
              // }); // ! We save the current value
              // // ! We created a filter for active and completed arrays.
              // const active = todos.filter(todo => {
              //   return !todo.checked;
              // })

              // const completed = todos.filter(todo => {
              //   return todo.checked;
              // })

              // const isThereActive = todos.every(todo => {
              //   return !todo.checked;
              // })
              
              // console.log(active, completed);
              // console.log(e.target.innerText);
              // console.log(isThereActive);
              
              // updateActiveTodos(prevValue => {
              //   return isThereActive ? prevValue : [...prevValue, ...active];
              // })

              // updateCompletedTodos(prevValue => {
              //   return [...prevValue, ...completed];
              // })


              // // I think the problem is here
              // updateAllTodos();
              // // [...active, ...completed]
              // updateTodos(prevValue => {
              //   return prevValue.filter(todo => {
              //     return !todo.checked;
              //   })
              // })
               // const [counter, setCounter] = useState(0);
  // const [allTodos, updateAllTodos] = useState([]); // ! Test 
  // const [activeTodos, updateActiveTodos] = useState([]);
  // const [completedTodos, updateCompletedTodos] = useState([]);
  // const [showTodos, updateShowTodos] = useState(true);

            