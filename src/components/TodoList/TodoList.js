import SingleTask from '../SingleTask/SingleTask'
import styles from './TodoList.module.css'
import React from "react"
function TodoList({todos, deleteHandler, completeTask, editHandler}) {

  const backgroundColors = ["#86efac", "#fcd34d", "#5eead4", "#a5b4fc", "#f0abfc", "#fda4af"];

  return (
    <div className={styles.listContainer}>
      {todos?.map((task, index) => (
        <SingleTask 
        key={task.id} 
        task={task}
        backgroundColor={backgroundColors[index]}
        deleteHandler={deleteHandler}
        completeTask={completeTask}
        editHandler={editHandler}
        />

      ))}
    </div>
  )
}

export default React.memo(TodoList)