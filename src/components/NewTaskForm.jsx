import Task from "./Task"

export default function NewTaskForm(props){
  return (
    <>
      <Task value={props.value} />
    </>
  )
}