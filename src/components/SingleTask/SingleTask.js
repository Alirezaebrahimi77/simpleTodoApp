import React, { useCallback } from 'react'
import { FiTrash, FiEdit2 } from 'react-icons/fi'
import cx from 'classnames'
import styles from './SingleTask.module.css'

const SingleTask = React.memo(function SingleTask({
  task,
  backgroundColor,
  onDelete,
  onComplete,
  onEdit
}) {
  const handleComplete = useCallback(() => {
    onComplete(task.id)
  }, [onComplete, task.id])

  const handleDelete = useCallback(() => {
    onDelete(task.id)
  }, [onDelete, task.id])

  const handleEdit = useCallback(() => {
    onEdit(task.id, task.task)
  }, [onEdit, task.id, task.task])

  const containerStyle = {
    backgroundColor
  }

  const containerClasses = cx(styles.taskContainer, {
    [styles.completed]: task.completed
  })

  return (
    <div 
      className={containerClasses} 
      style={containerStyle}
      onClick={handleComplete}
    >
      <div className={styles.taskTitle}>
        <p >
          {task.task}
        </p>
      </div>
      <div className={styles.taskActions}>
        <FiTrash 
          className={styles.trash} 
          onClick={handleDelete}
          aria-label="Delete task"
        />
        <FiEdit2 
          className={styles.edit} 
          onClick={handleEdit}
          aria-label="Edit task"
        />
      </div>
    </div>
  )
})

SingleTask.displayName = 'SingleTask'

export default SingleTask