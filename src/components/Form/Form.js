import React, { useRef, useEffect, useCallback } from 'react'
import styles from './Form.module.css'

function Form({ todoText, setTodoText, submitHandler, buttonText }) {
  const inputRef = useRef(null)
  
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleChange = useCallback((e) => {
    const value = e.target.value
    
    if (typeof todoText === 'object') {
      setTodoText(prev => ({
        ...prev,
        task: value
      }))
    } else {
      setTodoText(value)
    }
  }, [setTodoText, todoText])

  // Get current input value based on todoText type
  const inputValue = typeof todoText === 'object' ? todoText.task : todoText

  return (
    <form 
      className={styles.formContainer} 
      onSubmit={submitHandler}
    >
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        ref={inputRef}
        placeholder="Enter your todo"
        aria-label="Todo input"
      />
      <button 
        type="submit"
        aria-label={buttonText}
      >
        {buttonText}
      </button>
    </form>
  )
}

export default React.memo(Form)