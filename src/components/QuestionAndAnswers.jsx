export default function QuestionAndAnswers(props) {

  const answerElements = props.answers.map((answer) => {

    function checkAnswer() {
      if (props.isCheckingAnswers) {
        if (answer === props.correctAnswer) {
          return "correct"
        } else {
          return answer === props.selectedAnswer ? "wrong" : ""
        }
      } else {
        return answer === props.selectedAnswer ? "selected" : ""
      }

    }


    return (
      <li 
        key={answer} 
        className={`answer-option ${checkAnswer()}`}
        onClick={() => props.handleClick(props.id, answer)}
      >
        {answer}
      </li>
    )
  })

  return (
    <>
      <div className="qna-container">
        <h2 className="question-text">
          {props.question}
        </h2>
        <ul className="possible-answers">
          {answerElements}
        </ul>
      </div>
      <hr className="question-divider" />
    </>
  )
}
