import { render, screen, within } from '@testing-library/react'
import user from '@testing-library/user-event'
import App from './App'
import {
  PROJECT_TITLE,
  EDIT_PAGE_TITLE,
  HOME_PAGE_TITLE,
  STATUSES
} from './CONFIG'

describe('App', () => {
  const testTodo = {
    title: 'test title',
    description: 'test description',
    status: 'TODO'
  }
  const editedTestTodo = {
    title: 'edited title',
    description: 'edited description',
    status: 'IN_PROGRESS'
  }

  function renderApp () {
    render(<App />)

    return {
      projectTitle: screen.getByText(PROJECT_TITLE),
      getPageTitle: () => screen.getByTestId('page-title'),

      addTodoForm: {
        titleInput: screen.getByLabelText('Title'),
        descriptionInput: screen.getByPlaceholderText('Description'),
        button: screen.getByRole('button', { name: '+ Add' })
      },

      emptyListText: screen.getByText(
        'You have nothing to do Go get some sleep'
      ),

      getTodoList () {
        return screen.getAllByTestId('todo').map(todo => ({
          element: todo,
          title: within(todo).getByTestId('title').textContent,
          description: within(todo).getByTestId('description').textContent,
          status: within(todo).getByTestId('status').textContent,
          editButton: within(todo).getByTestId('edit-button')
        }))
      },

      editTodoForm () {
        return {
          titleInput: screen.getByLabelText('Title'),
          descriptionInput: screen.getByPlaceholderText('Description'),
          editButton: screen.getByTestId('edit-button'),
          cancelButton: screen.getByRole('button', { name: 'Cancel' })
        }
      }
    }
  }

  test('Home page is loaded', () => {
    const { projectTitle, getPageTitle } = renderApp()
    expect(projectTitle).toBeInTheDocument()
    expect(getPageTitle().textContent).toBe(HOME_PAGE_TITLE)
  })

  test('Add todo form is rendered', () => {
    const { addTodoForm } = renderApp()
    const { titleInput, descriptionInput, button } = addTodoForm
    expect(titleInput).toBeInTheDocument()
    expect(descriptionInput).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  test('Add todo form should get value', () => {
    const { addTodoForm } = renderApp()
    const { titleInput, descriptionInput, button } = addTodoForm

    user.type(titleInput, testTodo.title)
    expect(titleInput.value).toBe(testTodo.title)

    user.type(descriptionInput, testTodo.description)
    expect(descriptionInput.value).toBe(testTodo.description)

    user.click(button)
  })
  test('No task exist at beginning ', () => {
    const { emptyListText } = renderApp()
    expect(emptyListText).toBeInTheDocument()
    expect()
  })

  test('Add todo form should add todo', () => {
    const { addTodoForm, getTodoList } = renderApp()
    const { titleInput, descriptionInput, button } = addTodoForm

    user.type(titleInput, testTodo.title)
    user.type(descriptionInput, testTodo.description)
    user.click(button)

    const todoList = getTodoList()
    const { title, description, status, editButton } = todoList[0]

    expect(todoList.length).toBe(1)
    expect(title).toBe(testTodo.title)
    expect(description).toBe(testTodo.description)
    expect(status).toBe(STATUSES[testTodo.status].label)

    expect(editButton).toBeInTheDocument()
  })

  test('edit todo should render', () => {
    const { addTodoForm, getTodoList, getPageTitle, editTodoForm } = renderApp()
    const { titleInput, descriptionInput, button } = addTodoForm

    user.type(titleInput, testTodo.title)
    user.type(descriptionInput, testTodo.description)
    user.click(button)

    const { editButton } = getTodoList()[0]

    user.click(editButton)

    expect(getPageTitle().textContent).toBe(EDIT_PAGE_TITLE)

    const editForm = editTodoForm()
    expect(editForm.titleInput).toBeInTheDocument()
    expect(editForm.descriptionInput).toBeInTheDocument()
    expect(editForm.editButton).toBeInTheDocument()
    expect(editForm.cancelButton).toBeInTheDocument()

    expect(editForm.titleInput.value).toBe(testTodo.title)
    expect(editForm.descriptionInput.value).toBe(testTodo.description)
  })

  test('edit todo should work', () => {
    const { addTodoForm, getTodoList, editTodoForm } = renderApp()
    const { titleInput, descriptionInput, button } = addTodoForm

    user.type(titleInput, testTodo.title)
    user.type(descriptionInput, testTodo.description)
    user.click(button)

    const { editButton } = getTodoList()[0]

    user.click(editButton)

    const editForm = editTodoForm()

    user.clear(editForm.titleInput)
    user.type(editForm.titleInput, editedTestTodo.title)
    user.clear(editForm.descriptionInput)
    user.type(editForm.descriptionInput, editedTestTodo.description)
    user.click(editForm.editButton)

    const editedTodo = getTodoList()[0]

    expect(editedTodo.title).toBe(editedTestTodo.title)
    expect(editedTodo.description).toBe(editedTestTodo.description)
  })
})
