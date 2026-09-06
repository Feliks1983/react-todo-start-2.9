import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export default function Task({ task, onToggle, onDelete, onSave }) {
  const [editText, setEditText] = useState(task.text);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  function startEditing() {
    setEditText(task.text);
    setIsEditing(true);
  }

  function handleSave() {
    if (editText.trim()) {
      onSave(task.id, editText.trim());
    }
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  }

  const createdDate = task.createdAt ? new Date(task.createdAt) : null;

  const validCreatedDate = createdDate && !Number.isNaN(createdDate.getTime());

  const liClassName = [
    task.completed ? "completed" : "",
    isEditing ? "editing" : "",
  ]
    .filter(Boolean)
    .join(" ");

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
        <label onDoubleClick={startEditing}>
          <span className="description">{task.text}</span>
          <span className="created">
            {validCreatedDate
              ? formatDistanceToNow(createdDate, {
                  includeSeconds: true,
                  addSuffix: true,
                  locale: ru,
                })
              : "Дата неизвестна"}
          </span>
        </label>
        <button
          className="icon icon-edit"
          onClick={startEditing}
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
        defaultValue={editText}
        onChange={(e) => setEditText(e.target.value)}
        onBlur={handleSave}
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
  onSave: PropTypes.func.isRequired,
};

Task.defaultProps = {
  task: [],
  onToggle: function () {},
  onDelete: function () {},
  onSave: function () {},
};
