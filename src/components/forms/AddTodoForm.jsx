import { useState, useRef } from 'react'
import { useAddTodo } from '../../context'
import { STATUSES } from '../../CONFIG'
import TextAreaField from './TextAreaField'
import TextField from './TextField'
import { v1 as idGenerator } from 'uuid'

export default function AddTodoForm () {
  const initialValue = {
    id: idGenerator(),
    title: '',
    description: '',
    status: STATUSES.TODO,
    date: new Date()
  }

  const [newTodo, setNewTodo] = useState(initialValue)

  const addTodo = useAddTodo()

  let formRef = useRef(null)

  /*********** handle Change *************/

  const handleChange = event => {
    const { name, value } = event.target

    setNewTodo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  /*********** handle Submit *************/

  const handleSubmit = event => {
    event.preventDefault()

    if (!newTodo.title) {
      console.log('error')
      return
    }
    addTodo(newTodo)
    setNewTodo(initialValue)
    formRef.current?.reset()
  }

  return (
    <section className='add-todo form-wrapper'>
      <h2 className='title'>Add a new task</h2>
      <form onSubmit={handleSubmit} ref={formRef}>
        <TextField name='title' label='Title' handleChange={handleChange} />
        <TextAreaField
          name='description'
          placeholder='Description'
          handleChange={handleChange}
        />
        <div className='form-action'>
          <button type='submit'>
            <span>+</span> Add
          </button>
        </div>
      </form>
    </section>
  )
}
