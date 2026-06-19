import { useState } from "react";
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import dataList from "./components/todoList";

const initialTasks = dataList.map((item, index) => ({
  id: item.id,
  text: item.title,
  completed: item.completed,
  created: Date.now() - (index + 1) * 1000 * 60,
}));

let newId = (tasks) => {
  if (tasks.length === 0) return 1;
  return Math.max(...tasks.map((task) => task.id)) + 1;
};

export default function App() {
  const [todoList, setTodoList] = useState(initialTasks);
  const [filter, setFilter] = useState("all");

  function handleChangeTask(id) {
    setTodoList(
      todoList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function handleDeleteTask(id) {
    setTodoList(todoList.filter((task) => task.id !== id));
  }

  function saveTask(id, newText) {
    if (!newText) {
      setTodoList(
        todoList.map((task) =>
          task.id === id ? { ...task, isEditing: false } : task,
        ),
      );
      return;
    }
    setTodoList(
      todoList.map((task) =>
        task.id === id ? { ...task, text: newText, isEditing: false } : task,
      ),
    );
  }

  function clearCompleted() {
    setTodoList(todoList.filter((task) => !task.completed));
  }

  function handleAddTask(text) {
    let todoId = newId(todoList);
    const newTask = {
      id: todoId,
      text,
      completed: false,
      created: Date.now(),
    };
    setTodoList([...todoList, newTask]);
  }
  const activeCount = todoList.filter((t) => !t.completed).length;
  const completedCount = todoList.filter((t) => t.completed).length;

  const filteredTasks = todoList.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });
  return (
    <section className="todoapp">
      <NewTaskForm handleAddTask={handleAddTask} />
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onToggle={handleChangeTask}
          onDelete={handleDeleteTask}
          onSave={saveTask}
        />
      </section>
      <Footer
        ActiveCount={activeCount}
        CompletedCount={completedCount}
        Filter={filter}
        FilterChange={setFilter}
        onClearCompleted={clearCompleted}
      />
    </section>
  );
}
