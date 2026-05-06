import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { decode } from 'html-entities'

import QuestionAndAnswers from "./QuestionAndAnswers"

export default function QuizPage() {

  const [quizData, setQuizData] = useState([])
  const [randomAnswers, setRandomAnswers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  console.log(quizData)

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch questions')
        }
        return res.json()
      })
      .then(data => {
        setQuizData(data.results)
        setLoading(false)
      })
      .catch((err) => setError(err.message))
  }, [])

  // TO-DO: Shift this logic into the useEffect

  function shuffleAnswers(string, array) {
    const shuffled = [string, ...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const QandAElements = quizData.map(data => {
    const question = decode(data.question)
    const shuffledAnswers = shuffleAnswers(data.correct_answer, data.incorrect_answers)
    return (
      <QuestionAndAnswers key={nanoid()} question={question} answers={shuffledAnswers} />
    )
  })

  return (
    <section className="quiz-page">
      {QandAElements}
    </section>
  )
}


