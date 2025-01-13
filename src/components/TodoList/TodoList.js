import React, { useMemo } from 'react'
import SingleTask from '../SingleTask/SingleTask'
import styles from './TodoList.module.css'

const TodoList = React.memo(function TodoList({ todos = [], onDelete, onComplete, onEdit }) {

  const backgroundColors = useMemo(() => [
    "#86efac",
    "#fcd34d", 
    "#5eead4", 
    "#a5b4fc", 
    "#f0abfc", 
    "#fda4af"
  ], [])


  const getBackgroundColor = (index) => {
    return backgroundColors[index % backgroundColors.length]
  }

  return (
    <div className={styles.listContainer}>
      {todos.map((task, index) => (
        <SingleTask 
          key={task.id}
          task={task}
          backgroundColor={getBackgroundColor(index)}
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