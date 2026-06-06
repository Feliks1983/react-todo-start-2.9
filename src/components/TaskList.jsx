import Task from './Task';


export default function TaskList(props){

  const taskList = props.tasks.map((task) => 
  <Task 
  className={task.className} 
  key={task.id}
  description={task.description} 
  created={task.created}
  onToggleClass={task.onToggleClass}
  onDeleteTask={task.onDeleteTask}
  onStartEdit={task.onStartEdit}
  onSaveEdit={task.onSaveEdit}
  />);
  
  return(
    <>
    <ul className="todo-list">
        {taskList}
    </ul>
    </>
  )
}