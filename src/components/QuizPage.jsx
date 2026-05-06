import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { decode } from 'html-entities'

import QuestionAndAnswers from "./QuestionAndAnswers"

export default function QuizPage() {

  const [quizData, setQuizData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  function shuffleAnswers(correctAnswer, wrongAnswers) {
    const shuffled = [correctAnswer, ...wrongAnswers]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch questions')
        }
        return res.json()
      })
      .then(data => {
        const formattedQuizData = data.results.map(quizInfo => {
          const decodedQuestion = decode(quizInfo.question)
          const decodedCorrectAnswer = decode(quizInfo.correct_answer)
          const decodedIncorrectAnswers = quizInfo.incorrect_answers.map(ans => decode(ans))
          return {
            id: nanoid(),
            question: decodedQuestion,
            answersOptions: shuffleAnswers(decodedCorrectAnswer, decodedIncorrectAnswers),
            correct_answer: decodedCorrectAnswer,
            selectedAnswer: ""
          }
        })
        setQuizData(formattedQuizData)
        setLoading(false)
      })
      // .catch((err) => {
      //   setError("Too many requests. Please waith a moment and try again")
      //   setLoading(false)
      // })
  }, [])

  const quizQNAElements = quizData.map(data => (
    <QuestionAndAnswers 
      key={data.id} 
      question={data.question}
      answers={data.answersOptions} 
    />
  ))

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <section className="quiz-page">
      {quizQNAElements}
    </section>
  )
}


