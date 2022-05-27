import styles from './SingleTask.module.css'
import {FiTrash} from "react-icons/fi"
import {FiEdit2} from "react-icons/fi"
import cx from "classnames"
import React from "react"
function SingleTask({task, backgroundColor, deleteHandler, completeTask, editHandler}) {
  return (
    <div className={cx(styles.taskContainer, {[styles.completed]: task.completed})} style={{backgroundColor: backgroundColor}}>
      <div className={cx(styles.taskTitle)}>
        <p onClick={() => completeTask(task.id)}>{task.task}</p>
      </div>
      <div className={styles.taskActions}>
        <FiTrash className={styles.trash} onClick={() => deleteHandler(task.id)}/>
        <FiEdit2 className={styles.edit} onClick={() => editHandler(task.id, task.task)}/>
      </div>
    </div>
  )
}

export default SingleTask