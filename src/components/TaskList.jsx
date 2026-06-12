import Task from "./Task";
import PropTypes from "prop-types";

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onStartEditing,
  onSave,
}) {
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

TaskList.propTypes = {
  tasks: PropTypes.shape({
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
  tasks: [],
  onToggle: function () {},
  onDelete: function () {},
  onStartEditing: function () {},
  onSave: function () {},
};
