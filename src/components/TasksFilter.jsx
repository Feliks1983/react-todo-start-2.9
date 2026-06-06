

export default function TasksFilter({ filter, onFilterChange }) {
  return (
    <ul className="filters">
      <li>
        <button
          className={filter === 'all' ? 'selected' : ''}
          onClick={() => onFilterChange?.('all')}
          type="button"
        >
          All
        </button>
      </li>
      <li>
        <button
          className={filter === 'active' ? 'selected' : ''}
          onClick={() => onFilterChange?.('active')}
          type="button"
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={filter === 'completed' ? 'selected' : ''}
          onClick={() => onFilterChange?.('completed')}
          type="button"
        >
          Completed
        </button>
      </li>
    </ul>
  );
}
