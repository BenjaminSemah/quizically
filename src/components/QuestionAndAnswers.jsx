export default function QuestionAndAnswers(props) {

  const answerElements = props.answers.map((answer) => (
    <li key={answer} className="answer-option">{answer}</li>
  ))

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
