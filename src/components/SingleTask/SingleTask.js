import cx from 'classnames'
import React, { useCallback } from 'react'
import { FiEdit2, FiTrash } from 'react-icons/fi'
import styles from './SingleTask.module.css'

const SingleTask = React.memo(function SingleTask({
  task,
  onDelete,
  onComplete,
  onEdit,
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
    backgroundColor: 'white',
    border: '1px solid lightgray',
  }

  const containerClasses = cx(styles.taskContainer, {
    [styles.completed]: task.completed,
  })

  return (
    <div className={containerClasses} style={containerStyle}>
      <div className={styles.taskTitle} onClick={handleComplete}>
        <p>{task.task}</p>
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
