import styles from "./Form.module.css"

function Form({todoText, setTodoText, submitHandler, buttonText}) {
  return (
    <form className={styles.formContainer} onSubmit={submitHandler}>
      <input type="text" value={typeof todoText === "object" ? todoText.task : todoText} onChange={e => setTodoText(typeof todoText === "object" ? {...todoText, task: e.target.value} : e.target.value)}/>
      <button type="submit">{buttonText}</button>

    </form>
  )
}

export default Form