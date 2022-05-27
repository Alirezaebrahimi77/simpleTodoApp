import Form from "../Form/Form"
import styles from "./Todo.module.css"
import TodoList from "../TodoList/TodoList"
import { useState, useEffect } from "react"
import {saveToLocalStorage} from "../../utils/saveLocally"

function Todo() {
  const [todos, setTodos] = useState([])
  const [todoText, setTodoText] = useState("")
  const [edit, setEdit] = useState({})
  

  const addTodoHandler = (e) => {
    e.preventDefault()
    const newArray = [...todos, {id: Math.floor(Math.random() * 100), task: todoText, completed: false}]
    setTodos(newArray)
    saveToLocalStorage(newArray, "AliTodos")
    setTodoText("")
  }

  const deleteHandler = (id) => {
    const filteredTodos = todos.filter(todo => todo.id !== id)
    setTodos(filteredTodos)
    saveToLocalStorage(filteredTodos, "AliTodos")
  }

  const editHandler = (id, oldTask) => {
    setEdit({id: id, task: oldTask})
  }

  const editTaskHandler = (e) => {
    e.preventDefault()
    let updatedTodos = [...todos]
    let index = updatedTodos.findIndex(item => item.id === edit.id)
    let updatedItem = updatedTodos[index]
    updatedItem.task = edit.task;
    updatedTodos[index] = updatedItem
    setTodos(updatedTodos)
    setEdit({})
    saveToLocalStorage(updatedTodos, "AliTodos")
  }

  const completeTask = (id) => {
    let updatedTodos = [...todos]
    let index = updatedTodos.findIndex(item => item.id === id)
    let updatedItem = updatedTodos[index]
    if(updatedItem.completed){
      updatedItem.completed = false
    }else{
      updatedItem.completed = true
    }
    
    updatedTodos[index] = updatedItem
    setTodos(updatedTodos)
    saveToLocalStorage(updatedTodos, "AliTodos")
  }

  useEffect(() => {
      const todos = localStorage.getItem("AliTodos") ? JSON.parse(localStorage.getItem("AliTodos")) : []
      setTodos(todos)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.title}>
          <h1>What's the Plan for Today?</h1>
      </div>

      {Object.keys(edit).length === 0? (
        <>
          <Form todoText={todoText} setTodoText={setTodoText} submitHandler={addTodoHandler} buttonText={"Add Todo"}/>
          <TodoList todos={todos} deleteHandler={deleteHandler} completeTask={completeTask} editHandler={editHandler}/>
        </>
      ):(
          <Form todoText={edit} setTodoText={setEdit} submitHandler={editTaskHandler} buttonText={"Edit"}/>
      )}
      
    </div>
  )
}

export default Todo