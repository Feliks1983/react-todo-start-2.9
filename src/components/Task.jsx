import { useState, useRef, useEffect } from "react";
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
  const inputRef = useRef(null);

  useEffect(() => {
    if (task.isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [task.isEditing]);

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

  const timeAgoSeconds = formatDistanceToNow(new Date(task.created), {
    includeSeconds: true,
    addSuffix: true,
    locale: ru,
  });

  const timeAgoMinuts = formatDistanceToNow(new Date(task.created), {
    includeMinutes: true,
    addSuffix: true,
    locale: ru,
  });

  return (
    <li className={liClassName}>
      <div className="view">
        <input
          className="toggle"
          defaultValue={editText}
          type="checkbox"
          defaultChecked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <label onDoubleClick={() => onStartEditing(task.id)}>
          <span className="description">{task.text}</span>
          <span className="created">{`создано ${timeAgoSeconds}/${timeAgoMinuts}`}</span>
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
    isEditing: PropTypes.bool.isRequired,
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
