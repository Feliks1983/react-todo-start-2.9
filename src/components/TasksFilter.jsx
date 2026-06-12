import PropTypes from "prop-types";

export default function TasksFilter({ onFilter, onFilterChange }) {
  const filters = ["all", "active", "completed"];

  return (
    <ul className="filters">
      {filters.map((filter) => (
        <li key={filter}>
          <button
            className={onFilter === filter ? "selected" : ""}
            onClick={() => onFilterChange(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        </li>
      ))}
    </ul>
  );
}

TasksFilter.propTypes = {
  onFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

TasksFilter.defaultProps = {
  onFilter: "all",
  onFilterChange: function () {},
};