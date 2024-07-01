import { decode } from "html-entities";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import "./Question.css";

export default function Question(props) {
  // Define PropTypes for type checking and documentation
  Question.propTypes = {
    id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correctAnswer: PropTypes.string.isRequired,
    selectedAnswer: PropTypes.string.isRequired,
    showAnswer: PropTypes.bool.isRequired,
    allAnswers: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      })
    ).isRequired,
    handleSelectAnswer: PropTypes.func.isRequired,
    showScore: PropTypes.bool.isRequired,
  };

  // Function to determine button classes based on answer state
  const getButtonClass = (answer) => {
    let buttonClass = "answer-button";
    if (props.showAnswer) {
      if (answer.text === props.correctAnswer) {
        buttonClass += " correct";
      } else if (answer.text === props.selectedAnswer) {
        buttonClass += " incorrect";
      }
    } else if (props.selectedAnswer === answer.text) {
      buttonClass += " selected";
    }
    return buttonClass;
  };

  const getIcon = () => {
    if (props.showAnswer) {
      return props.selectedAnswer === props.correctAnswer ? "✔️" : "❌";
    }
    return "";
  };

  // Map allAnswers to buttons displaying answer choices
  const answerButtons = props.allAnswers.map((answer) => (
    <button
      key={answer.id}
      onClick={() =>
        !props.showScore && props.handleSelectAnswer(props.id, answer.text)
      }
      className={getButtonClass(answer)}
    >
      {decode(answer.text)}
    </button>
  ));

  const icon = getIcon();

  return (
    <div className="container">
      <h3 className="question-text">{decode(props.question)}</h3>
      <div className="answers-container">
        <div className="answer-buttons">{answerButtons}</div>
        <div className="icon">{icon}</div>
      </div>
      <hr />
    </div>
  );
}
