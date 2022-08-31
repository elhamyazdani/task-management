import { useState } from 'react'
import '../../assets/styles/components/SelectBox.scss'

export default function SelectBox ({
  name,
  handleChange,
  options,
  defaultOption = ''
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(defaultOption)

  const handleOptionClick = option => {
    setSelectedOption(option)
    setIsOpen(false)
    handleChange({target:{ name: name, value: option.name }})
  }

  const toggleOpen = () => setIsOpen(isOpen => !isOpen)

  return (
    <div className='form-item type-select'>
      <div className='selected' onClick={toggleOpen}>
        {selectedOption.label}
      </div>
      {isOpen && (
        <ul>
          {options.map(option => (
            <li key={option.name} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}{' '}
    </div>
  )
}
