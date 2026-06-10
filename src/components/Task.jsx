import { useState, useRef, useEffect } from 'react';

export default function Task({ 
  task, 
  onToggle, 
  onDelete,
  onStartEditing, 
  onSave }) {

  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (task.isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [task.isEditing]);

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      onSave(task.id, editText);
    }
  };
  
  const liClassName = [
    task.completed ? 'completed' : '',
    task.isEditing ? 'editing' : ''
  ].filter(Boolean).join(' ');

  return (
    <li className={liClassName}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <label onDoubleClick={() => onStartEditing(task.id)}>
          <span className="description">{task.text}</span>
          <span className="created">{task.creat}</span>
        </label>
        <button 
          className="icon icon-edit" 
          onClick={() => onStartEditing(task.id)} 
          aria-label="Edit task"></button>
        <button 
          className="icon icon-destroy" 
          onClick={() => onDelete(task.id)} 
          aria-label="Delete task"
        ></button>
      </div>

        <input
          ref={inputRef}
          type="text"
          className="edit"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={() => onSave(task.id, editText)} 
          onKeyDown={handleKeyDown}
        />

    </li>
  );
}