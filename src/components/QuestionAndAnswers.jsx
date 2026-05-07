export default function QuestionAndAnswers({
  id,
  question,
  correctAnswer,
  answers,
  selectedAnswer,
  handleClick,
  isCheckingAnswers
}) {

  const answerElements = answers.map((answer) => {

    function checkAnswer() {
      if (isCheckingAnswers) {
        if (answer === correctAnswer) {
          return "correct"
        } else {
          return answer === selectedAnswer ? "wrong" : ""
        }
      } else {
        return answer === selectedAnswer ? "selected" : ""
      }
    }

    return (
      <li 
        key={answer} 
        className={`answer-option ${checkAnswer()}`}
        onClick={() => isCheckingAnswers ? null :  handleClick(id, answer)}
      >
        {answer}
      </li>
    )
  })

  return (
    <>
      <div className="qna-container">
        <h2 className="question-text">
          {question}
        </h2>
        <ul className="possible-answers">
          {answerElements}
        </ul>
      </div>
      <hr className="question-divider" />
    </>
  )
}
