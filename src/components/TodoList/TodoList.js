import React from 'react'
import SingleTask from '../SingleTask/SingleTask'
import styles from './TodoList.module.css'

const TodoList = React.memo(function TodoList({
  todos = [],
  onDelete,
  onComplete,
  onEdit,
}) {
  return (
    <div className={styles.listContainer}>
      {todos.map((task) => (
        <SingleTask
          key={task.id}
          task={task}
          onDelete={onDelete}
          onComplete={onComplete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
})

TodoList.displayName = 'TodoList'

export default TodoList
