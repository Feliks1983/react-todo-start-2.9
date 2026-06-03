export default function Completed(){
  return(<>
    <li class="completed">
      <div class="view">
        <input class="toggle" type="checkbox" />
        <label>
          <span class="description">Completed task</span>
          <span class="created">created 17 seconds ago</span>
        </label>
        <button class="icon icon-edit"></button>
        <button class="icon icon-destroy"></button>
      </div>
    </li>
  </>)
}