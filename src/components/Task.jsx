import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export default function Task({
  task,
  onToggle,
  onDelete,
  onStartEditing,
  onSave,
}) {
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef(false);
  console.log(task.id);
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      onSave(task.id, editText);
    }
  }

  const liClassName = [
    task.completed ? "completed" : "",
    task.isEditing ? "editing" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={liClassName}>
      <div className="view">
        <input
          id={task.id}
          ref={inputRef}
          className="toggle"
          defaultValue={editText}
          type="checkbox"
          defaultChecked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <label onDoubleClick={() => onStartEditing(task.id)}>
          <span className="description">{task.text}</span>
          <span className="created">
            {formatDistanceToNow(new Date(task.created), {
              includeSeconds: true,
              addSuffix: true,
              locale: ru,
            })}
          </span>
        </label>
        <button
          className="icon icon-edit"
          onClick={() => onStartEditing(task.id)}
          aria-label="Edit task"
        ></button>
        <button
          className="icon icon-destroy"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        ></button>
      </div>
      <input
        id={task.id}
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

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    created: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)])
      .isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStartEditing: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

Task.defaultProps = {
  task: [],
  onToggle: function () {},
  onDelete: function () {},
  onStartEditing: function () {},
  onSave: function () {},
};
