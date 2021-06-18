import React, { useState,useEffect } from "react";
import './App.css';
import Form from "./components/Form";
import TodoList from "./components/TodoList";



function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
 

//RUN ONCE when the app start
useEffect(() => {
  getLocalTodos();
}, []);

  //USE EFFECT
  useEffect(() => {
    const filterHandler = () => {
      switch(status) {
        case "completed":
          setFilteredTodos(todos.filter(todo => todo.completed === true));
          break;
         case "uncompleted":
            setFilteredTodos(todos.filter(todo => todo.completed === false));
            break;
        default:
          setFilteredTodos(todos);
          break;
      }
    };
    filterHandler();
  }, [todos, status]);

 
// save to local

const saveLocalTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
  }; 
const getLocalTodos = () => {
  if (localStorage.getItem("todos") === null) {
    localStorage.setItem("todos", JSON.stringify([]));
  } else {
   let todoLocal = JSON.parse(localStorage.getItem("todos"));
   console.log(todoLocal);
  }
};

  return (
    <div className="App">
        <header>
           <h1> Todo ist </h1>
    </header>
    <Form  setStatus={setStatus} inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText}/>
    <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos} />
    </div>
  );
}

export default App;
