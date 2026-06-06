
export default function Task(props){
  return(
    <>
      <li className={props.className}>
          <div className="view">
            <input key={props.id} className="toggle" type="checkbox" />
            <label>
              <span className="description">{props.description}</span>
              <span className="created">{props.created}</span>
            </label>
            <button className="icon icon-edit"></button>
            <button className="icon icon-destroy"></button>
          </div>
          {props.className === 'editing' && (
            <input type="text" className="edit" defaultValue={props.description} />
          )}
      </li>
    </>
  )
}