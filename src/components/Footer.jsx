import TasksFilter from './TasksFilter';

export default function Footer({ 
  onactiveCount, 
  oncompletedCount, 
  onFilter, 
  onFilterChange, 
  onClearCompleted,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{onactiveCount}</strong> {onactiveCount === 1 ? 'item' : 'items'} left
      </span>
      <TasksFilter 
        onFilter={onFilter} 
        onFilterChange={onFilterChange} 
      />
      {oncompletedCount > 0 && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
}