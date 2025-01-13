import { useState, useEffect, useCallback } from "react"
import Form from "../Form/Form"
import TodoList from "../TodoList/TodoList"
import { saveToLocalStorage } from "../../utils/saveLocally"
import styles from "./Todo.module.css"

function Todo() {
  const [todos, setTodos] = useState([])
  const [todoText, setTodoText] = useState("")
  const [edit, setEdit] = useState({})
  const [filtered, setFiltered] = useState([])

  // Generate a more unique ID using timestamp + random number
  const generateId = () => {
    return Date.now() + Math.floor(Math.random() * 1000)
  }

  const updateTodosAndSave = useCallback((newTodos) => {
    setTodos(newTodos)
    setFiltered(newTodos)
    saveToLocalStorage(newTodos, "todos")
  }, [])

  const addTodoHandler = (e) => {
    e.preventDefault()
    if (!todoText.trim()) {
      alert("Please type your todo")
      return
    }
    const newTodo = {
      id: generateId(),
      task: todoText,
      completed: false
    }
    updateTodosAndSave([...todos, newTodo])
    setTodoText("")
  }

  const handleOnDelete = useCallback((id) => {
    const filteredTodos = todos.filter(todo => todo.id !== id)
    updateTodosAndSave(filteredTodos)
  }, [todos, updateTodosAndSave])

  const handleOnEdit = useCallback((id, oldTask) => {
    setEdit({ id, task: oldTask })
  }, [])

  const editTaskHandler = (e) => {
    e.preventDefault()
    if (!edit.task.trim()) {
      alert("Please type your todo")
      return
    }
    
    const updatedTodos = todos.map(todo => 
      todo.id === edit.id ? { ...todo, task: edit.task } : todo
    )
    
    updateTodosAndSave(updatedTodos)
    setEdit({})
  }

  const handleTaskCompletion = useCallback((id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    updateTodosAndSave(updatedTodos)
  }, [todos, updateTodosAndSave])

  const handleFiltering = useCallback((value) => {
    const filterMap = {
      completed: () => todos.filter(todo => todo.completed),
      uncompleted: () => todos.filter(todo => !todo.completed),
      all: () => todos
    }
    
    setFiltered(filterMap[value]?.() || todos)
  }, [todos])

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]")
    setTodos(savedTodos)
    setFiltered(savedTodos)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>What's the Plan for Today?</h1>
      </div>
      {Object.keys(edit).length === 0 ? (
        <>
          <Form 
            todoText={todoText} 
            setTodoText={setTodoText} 
            submitHandler={addTodoHandler} 
            buttonText="Add Todo"
          />
          {todos.length > 0 && (
            <div className={styles.filterContainer}>
              <select onChange={(e) => handleFiltering(e.target.value)}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="uncompleted">Uncompleted</option>
              </select>
            </div>
          )}
          <TodoList 
            todos={filtered}
            onDelete={handleOnDelete}
            onComplete={handleTaskCompletion}
            onEdit={handleOnEdit}
          />
        </>
      ) : (
        <Form 
          todoText={edit}
          setTodoText={setEdit}
          submitHandler={editTaskHandler}
          buttonText="Edit"
        />
      )}
    </div>
  )
}

export default Todo