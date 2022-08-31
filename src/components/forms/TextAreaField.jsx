export default function TextAreaField ({ handleChange, label, ...props }) {
  return (
    <div className='form-item type-text'>
      <textarea onChange={handleChange} placeholder=' ' {...props} />
      <div className='line'> </div>
      <label>{label}</label>
    </div>
  )
}
