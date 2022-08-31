import { PROJECT_TITLE } from '../CONFIG'
import '../assets/styles/components/Header.scss'

export default function Header ({ pageTitle }) {
  return (
    <header className='header'>
      <span>{PROJECT_TITLE}</span>
      <span>{'>'}</span>
      <span data-testid='page-title'>
        {pageTitle}
      </span>
    </header>
  )
}
