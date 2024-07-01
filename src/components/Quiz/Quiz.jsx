import Question from "../Questions/Question";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { useLocation, useNavigate } from "react-router-dom";
import "./Quiz.css";

export default function Quiz() {
  const [questionsArr, setQuestionsArr] = useState([]);
  const [error, setError] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { questions } = location.state || {
    category: "",
    difficulty: "",
    type: "",
    questions: [],
  };

  // Function to shuffle answers randomly
  function shuffleAnswers(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Effect to format questions when questions state changes
  useEffect(() => {
    if (questions.length === 0) {
      setError(true);
      setQuestionsArr([]);
    } else {
      const formattedQuestions = questions.map((question) => ({
        ...question,
        id: nanoid(),
        selectedAnswer: "",
        showAnswer: false,
        allAnswers: shuffleAnswers([
          ...question.incorrect_answers.map((answer) => ({
            text: answer,
            id: nanoid(),
          })),
          { text: question.correct_answer, id: nanoid() },
        ]),
      }));
      setQuestionsArr(formattedQuestions);
      setError(false);
    }
  }, [questions]);

  if (error) {
    return (
      <div>Error: No questions available or failed to fetch questions.</div>
    );
  }
  // Function to handle selecting an answer for a question
  const handleSelectAnswer = (questionId, answer) => {
    if (!showScore) {
      setQuestionsArr((prevQuestionsArr) =>
        prevQuestionsArr.map((question) =>
          question.id === questionId
            ? { ...question, selectedAnswer: answer }
            : question
        )
      );
    }
  };
  const handleCheckAnswers = () => {
    let correctCount = 0;
    const updatedQuestions = questionsArr.map((question) => {
      if (question.selectedAnswer === question.correct_answer) {
        correctCount++;
      }
      return { ...question, showAnswer: true };
    });
    setQuestionsArr(updatedQuestions);
    setCorrectAnswersCount(correctCount);
    setShowScore(true);
  };

  const handleGoToStart = () => {
    navigate("/");
  };

  // Map questions array to Question components for rendering
  const questionElements = questionsArr.map((question) => (
    <Question
      key={question.id}
      id={question.id}
      question={question.question}
      correctAnswer={question.correct_answer}
      selectedAnswer={question.selectedAnswer}
      showAnswer={question.showAnswer}
      allAnswers={question.allAnswers}
      handleSelectAnswer={handleSelectAnswer}
      showScore={showScore}
    />
  ));

  return (
    <main>
      <div className="questions-container">{questionElements}</div>
      <div className="controls-container">
        <button
          disabled={showScore}
          className="btn-check"
          onClick={handleCheckAnswers}
        >
          Check answers
        </button>
        {showScore && (
          <div className="score-container">
            You scored {correctAnswersCount} out of {questionsArr.length}
          </div>
        )}
        {showScore && (
          <button className="btn-check play-again" onClick={handleGoToStart}>
            Play again
          </button>
        )}
      </div>
    </main>
  );
}
