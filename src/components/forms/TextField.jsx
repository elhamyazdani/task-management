export default function TextField ({ handleChange, label, name, ...props }) {
  return (
    <div className='form-item type-text'>
      <input id={name} name={name} onChange={handleChange} placeholder=' ' {...props} />
      <div className='line'> </div>
      <label htmlFor={name}>{label}</label>
    </div>
  )
}
