import Completed from "./components/Completed"
import Footer from "./components/Footer"
import NewTaskForm from "./components/NewTaskForm"
import TaskList from "./components/TaskList"


function App() {

  return (
    <>
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" placeholder="What needs to be done?" autofocus />
      </header>
      <section class="main">
        <ul class="todo-list">
          <Completed />
          <TaskList />
          <NewTaskForm />
        </ul>
        <Footer />
      </section>
    </section>
    </>
  )
}

export default App
