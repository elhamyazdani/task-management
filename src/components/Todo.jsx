import { useSetEditingTodo } from '../context'
import '../assets/styles/components/Todo.scss'
import editIcon from '../assets/images/edit.svg'

export default function Todo ({ todo }) {
  const setEditingTodo = useSetEditingTodo()

  const handleEditButton = () => setEditingTodo(todo)

  return (
    <div className='todo' data-testid='todo'>
      <div className='title' data-testid='title'>
        {todo.title}
      </div>
      <div className='description' data-testid='description'>
        <p>{todo.description}</p>
      </div>
      <div className='footer'>
        <div className='status' data-testid='status'>
          {todo.status.label}
        </div>
        <button onClick={handleEditButton} data-testid='edit-button'>
          <img src={editIcon} alt='edit' />
        </button>
      </div>
    </div>
  )
}
