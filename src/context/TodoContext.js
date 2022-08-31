import { createContext, useContext, useState } from 'react'

const useStore = () => {
  const [todoList, setTodoList] = useState([])
  const [editingTodo, setEditingTodo] = useState()

  const sortTodoList = (a, b) => b.date.getTime() - a.date.getTime()

  return {
    todoList,

    addTodo: todo => {
      setTodoList(prevTodoList => [...prevTodoList, todo].sort(sortTodoList))
    },

    editTodo: editedTodo => {
      let editedTodoList = []
      setTodoList(prevTodoList => {
        editedTodoList = prevTodoList.filter(
          prevTodo => prevTodo.id !== editedTodo.id
        )
        editedTodoList.push(editedTodo)
        editedTodoList.sort(sortTodoList)
        return editedTodoList
      })
    },
    editingTodo,
    setEditingTodo: todo => setEditingTodo(todo)
  }
}

const TodoContext = createContext(null)

export const TodoContextProvider = ({ children }) => (
  <TodoContext.Provider value={useStore()}>{children}</TodoContext.Provider>
)

export const useTodoList = () => useContext(TodoContext).todoList
export const useAddTodo = () => useContext(TodoContext).addTodo
export const useEditTodo = () => useContext(TodoContext).editTodo
export const useEditingTodo = () => useContext(TodoContext).editingTodo
export const useSetEditingTodo = () => useContext(TodoContext).setEditingTodo
