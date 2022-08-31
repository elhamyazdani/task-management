import { TodoContextProvider } from './context'
import TodoPage from './components/TodoPage'

function App () {
  return (
    <div className='App'>
      <TodoContextProvider>
        <TodoPage />
      </TodoContextProvider>
    </div>
  )
}

export default App
