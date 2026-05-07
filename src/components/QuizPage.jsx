import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { decode } from 'html-entities'

import QuestionAndAnswers from "./QuestionAndAnswers"

export default function QuizPage() {
  const [quizData, setQuizData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isCheckingAnswers, setIsCheckingAnswers] = useState(false)

  function getQuizData() {
    setError(null)
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
            correctAnswer: decodedCorrectAnswer,
            selectedAnswer: "",
          }
        })
        setQuizData(formattedQuizData)
        setLoading(false)
      })
  // .catch((err) => {
  //   setError("Too many requests. Please wait a moment and try again")
  //   setLoading(false)
  // })
  }

  useEffect(() => {
    getQuizData()
  }, [])

  function shuffleAnswers(correctAnswer, wrongAnswers) {
    const shuffled = [correctAnswer, ...wrongAnswers]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  function selectAnswer(id,ans) {
    setQuizData(prevData => prevData.map((quizInfo) => (
      quizInfo.id === id ? 
       {...quizInfo, selectedAnswer: ans} : quizInfo
    )))
  }

  const quizQNAElements = quizData.map(data => (
    <QuestionAndAnswers 
      key={data.id}
      id={data.id}
      question={data.question}
      correctAnswer={data.correctAnswer}
      answers={data.answersOptions} 
      selectedAnswer={data.selectedAnswer}
      handleClick={selectAnswer}
      isCheckingAnswers={isCheckingAnswers}
    />
  ))

  function handleClick() {
    if (isCheckingAnswers) {   
      setLoading(true)
      getQuizData()
      setIsCheckingAnswers(false)
    } else {
      setIsCheckingAnswers(true)
    }
  }

  function checkScores() {
    let correctAnswers = quizData.filter(data => {
      return data.correctAnswer === data.selectedAnswer
    })
    return correctAnswers.length
  }

  const allAnswered = quizData.every(quizInfo => quizInfo.selectedAnswer !== "")

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <section className="quiz-page">
      {quizQNAElements}
      <span className='score-text-and-button'>
        <p className='score-text'>
          {
            isCheckingAnswers ? 
            `You scored ${checkScores()} / ${quizData.length} correct answers` : 
            null
          }
        </p>
        <button 
          type="button" 
          className='check-answers-btn'
          onClick={handleClick}
          disabled={!allAnswered}
        >
          {isCheckingAnswers ? "Play again" : "Check answers"}
        </button>
      </span>
    </section>
  )
}


