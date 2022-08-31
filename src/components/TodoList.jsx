import { useTodoList } from '../context'
import Todo from './Todo'
import '../assets/styles/components/TodoList.scss'

export default function TodoList () {
  const todoList = useTodoList()

  return (
    <section className='todo-list'>
      <h2 className='title'>Tasks</h2>
      <div className='body'>
        {todoList.length ? (
          <div className='has-todo'>
            {todoList.map(todo => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </div>
        ) : (
          <div className='no-todo'>
            <p>
              You have nothing to do <br />
              Go get some sleep
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
