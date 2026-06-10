import { useState } from 'react';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import dataList from './components/todoList'

const initialTasks = dataList.map(item => ({
  id: item.id,
  text: item.title,        
  completed: item.completed,
  creat: 'created',    
  isEditing: false,         
}));

let nextId = 0;

export default function App() {
  const [todoList, setTodoList] = useState(initialTasks);
  const [filter, setFilter] = useState('all');

  function handleChangeTask (id) {
    setTodoList(todoList.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  function handleDeleteTask (id) {
    setTodoList(todoList.filter((task )=> task.id !== id));
  };

  function startEditing(id) {
    setTodoList(todoList.map(task => 
      task.id === id ? { ...task, isEditing: true } : task
    ));
  };

  function saveTask(id, newText) {
    if (!newText) {
      setTodoList(todoList.map((task) => task.id === id ? { ...task, isEditing: false } : task));
      return;
    }
    setTodoList(todoList.map(task => 
      task.id === id ? { ...task, text: newText, isEditing: false } : task
    ));
  };

  function clearCompleted() {
    setTodoList(todoList.filter((task) => !task.completed));
  };

  function handleAddTask(text) {
    setTodoList([
      ...todoList,
      {
        id: nextId++,
        text: text,
        isEditing: false,
      },
    ]);
  }

  const activeCount = todoList.filter(t => !t.completed).length;
  const completedCount = todoList.filter(t => t.completed).length;

  const filteredTasks = todoList.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });
  return (
    <section className="todoapp">
      <NewTaskForm             
        key={todoList.id} 
        tasks={filteredTasks} 
        handleAddTask={handleAddTask} 
        />
        <section className="main">
          <TaskList
            key={todoList.id} 
            tasks={filteredTasks} 
            onToggle={handleChangeTask}
            onDelete={handleDeleteTask}
            onStartEditing={startEditing}
            onSave={saveTask}
          />
        </section>

          <Footer 
            onactiveCount={activeCount}
            oncompletedCount={completedCount}
            onFilter={filter}
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
          />
    </section>
  );
}