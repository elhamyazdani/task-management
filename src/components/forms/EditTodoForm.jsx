import { useState } from 'react'
import { useEditingTodo, useEditTodo, useSetEditingTodo } from '../../context'
import SelectBox from './SelectBox'
import TextAreaField from './TextAreaField'
import TextField from './TextField'
import editIcon from '../../assets/images/edit-white.svg'

import { STATUSES } from '../../CONFIG'

export default function EditTodoForm () {
  const editingTodo = useEditingTodo()
  const setEditingTodo = useSetEditingTodo()
  const editTodo = useEditTodo()

  const [editingTodoValue, setEditingTodoValue] = useState({
    ...editingTodo
  })

  const statusOptions = [editingTodo.status]
  statusOptions.push(
    ...editingTodo.status.nextPosableStatuses.map(status => STATUSES[status])
  )

  /*********** handle Change *************/

  const handleChange = event => {
    let { name, value } = event.target

    if (event.target.name === 'status') {
      value = STATUSES[value]
    }

    setEditingTodoValue(prev => ({
      ...prev,
      [name]: value
    }))
  }

  /*********** handle Submit *************/

  const handleSubmit = event => {
    event.preventDefault()

    if (!editingTodoValue.title) {
      // show error
      console.log('error')
      return
    }
    editTodo(editingTodoValue)
    setEditingTodo(null)
  }

  /*********** handle Cancel *************/

  const handleCancel = event => {
    event.preventDefault()
    setEditingTodo(null)
  }

  return (
    <section className='edit-todo form-wrapper'>
      <h2 className='title'>Edit the task</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          name='title'
          label='Title'
          value={editingTodoValue.title}
          handleChange={handleChange}
        />
        <TextAreaField
          name='description'
          placeholder='Description'
          value={editingTodoValue.description}
          handleChange={handleChange}
        />
        <SelectBox
          name='status'
          defaultOption={editingTodoValue.status}
          handleChange={handleChange}
          options={statusOptions}
        />
        <div className='form-actions'>
          <button type='submit' data-testid='edit-button'>
            <img src={editIcon} alt='Edit'/> Edit
          </button>
          <button type='clear' onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}
