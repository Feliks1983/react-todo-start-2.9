import NewTaskForm from "./components/NewTaskForm"
import Footer from "./components/Footer"
import TaskList from "./components/TaskList"


function App() {

  return (
    <>
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
      <TaskList />
      <Footer />
      </section>
    </section>
    </>
  )
}

export default App
