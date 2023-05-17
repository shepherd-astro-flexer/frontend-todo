import React, { useState } from "react";
import "./App.css" // ! This is to import css from a relative path, we don't need any namee i.e import styles from "./App.css"
import theme from "./images/icon-sun.svg";
import CloseIcon from '@mui/icons-material/Close';

function App() {
  // ! Object is the key :)
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
  // * This will be the value of todos if completed is clicked
  // ! Kapag empty ang allTodos, ang value nya is the todos array
  const [filteredTodos, setFilteredTodos] = useState("All");

  const counter = todos.filter(todo => {
    return !todo.checked;
  })
  
  const [todosLeft, setTodosLeft] = useState(counter.length);

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

            setTodosLeft(prevValue => {
              return checkbox && input.name !== "" ? prevValue + 1 : prevValue;
            })

            updateTodos(prevValue => {
              return checkbox && input.name !== "" ? [...prevValue, input] : [...prevValue];
            })
            // ! Test CONTINUE
            // ! After adding an item input.name value should change to an empty string
            // updateInput(prevValue => {
            //   return checkbox && input.name !== "" ? input.name = "" : prevValue;
            // })
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
            <div key={idx} id={idx} className="todos-container">
              <label className="toggle-container">
                <input id={todo.id} onChange={e => {
                  const {id, checked} = e.target;
                  console.log(id, checked);

                  setTodosLeft(prevValue => {
                    return checked ? prevValue - 1 : prevValue + 1;
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

                const counter = todos.filter(todo => {
                  return !todo.checked;
                })
                
                setTodosLeft(counter.length - 1);
                
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
          <p className="todos-left">{todosLeft} items left</p>
          <div className="middle-cont">
            <h5 onClick={e => {
              filterMode(e.target.innerText);
            }}>All</h5>
            <h5 onClick={e => {
              filterMode(e.target.innerText);
            }}>Active</h5>
            <h5 onClick={e => {
              filterMode(e.target.innerText);
            }}>Completed</h5>
          </div>
          <p onClick={() => {
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

            