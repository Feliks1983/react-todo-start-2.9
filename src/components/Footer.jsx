import TasksFilter from "./TasksFilter";
import PropTypes from "prop-types";

export default function Footer({
  onActiveCount,
  onCompletedCount,
  onFilter,
  onFilterChange,
  onClearCompleted,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{onActiveCount}</strong>{" "}
        {onActiveCount === 1 ? "item" : "items"} left
      </span>
      <TasksFilter onFilter={onFilter} onFilterChange={onFilterChange} />
      {onCompletedCount > 0 && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
}

Footer.propTypes = {
  onActiveCount: PropTypes.number.isRequired,
  onCompletedCount: PropTypes.number.isRequired,
  onFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  onActiveCount: 0,
  onCompletedCount: 0,
  onFilter: "all",
  onFilterChange: function () {},
  onClearCompleted: function () {},
};
