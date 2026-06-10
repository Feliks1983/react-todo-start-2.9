import Task from './Task';

export default function TaskList({ 
  tasks, 
  onToggle, 
  onDelete, 
  onStartEditing, 
  onSave }) {
  return (
      <ul className="todo-list">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onStartEditing={onStartEditing}
            onSave={onSave}
          />
        ))}
      </ul>
  );
}