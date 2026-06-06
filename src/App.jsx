import { useState } from 'react';
import NewTaskForm from "./components/NewTaskForm"
import TaskList from "./components/TaskList"
import Footer from "./components/Footer"


function App() {
  const dataList = [
    { id: 1, description: 'Completed task', created: 'created 17 seconds ago', className: 'completed' },
    { id: 2, description: 'Editing task', created: 'created 5 minutes ago', className: 'editing' },
    { id: 3, description: 'Active task', created: 'created 5 minutes ago', className: 'active' }
  ];

  const [todoList, setTodoList] = useState(dataList);

  return (
    <>
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
          <TaskList 
          tasks={todoList} 
          setTask={setTodoList}  />
      <Footer />
      </section>
    </section>
    </>
  )
}

export default App
