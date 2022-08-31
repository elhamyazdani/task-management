import { useEditingTodo } from '../context'

import Header from './Header'
import AddTodoForm from './forms/AddTodoForm'
import TodoList from './TodoList'
import EditTodoForm from './forms/EditTodoForm'

import { EDIT_PAGE_TITLE, HOME_PAGE_TITLE } from '../CONFIG'

import '../assets/styles/TodoPage.scss'
import '../assets/styles/components/form.scss'

export default function TodoPage () {
  const editingTodo = useEditingTodo()

  return (
    <main>
      <Header pageTitle={editingTodo ? EDIT_PAGE_TITLE : HOME_PAGE_TITLE} />
        {editingTodo ? (
          <EditTodoForm />
        ) : (
          <>
            <AddTodoForm />
            <TodoList />
          </>
        )}
    </main>
  )
}
