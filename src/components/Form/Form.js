import styles from "./Form.module.css"
import {useRef, useEffect} from "react"
function Form({todoText, setTodoText, submitHandler, buttonText}) {
  const input = useRef()
  useEffect(() => {
    input.current.focus()
  }, [])
  return (
    <form className={styles.formContainer} onSubmit={submitHandler}>
      <input type="text" value={typeof todoText === "object" ? todoText.task : todoText} onChange={e => setTodoText(typeof todoText === "object" ? {...todoText, task: e.target.value} : e.target.value)} ref={input}/>
      <button type="submit">{buttonText}</button>

    </form>
  )
}

export default Form