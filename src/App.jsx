import { useState } from 'react'
import StartPage from './components/StartPage'
import QuizPage from './components/QuizPage'
import './App.css'

function App() {

  const [isStart, setIsStart] = useState(false)

  function startQuiz() {
    setIsStart(true)
  }

  return isStart ? <QuizPage /> : <StartPage startQuiz={startQuiz}/>

}

export default App
