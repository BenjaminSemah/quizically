export default function StartPage({ startQuiz }) {
  return (
    <section className="start-page">
      <h1 className="game-title">Quizically</h1>
      <p className="game-subtext">
        Test your general knowledge with 5 random questions.
      </p>
      <button type="button" className="start-btn" onClick={startQuiz}>Start Quiz</button>
    </section>
  )
}
