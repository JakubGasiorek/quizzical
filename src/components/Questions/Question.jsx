/* eslint-disable react/prop-types */
import { decode } from "html-entities";
import "./Question.css";

export default function Question(props) {
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
