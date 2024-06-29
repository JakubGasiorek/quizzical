import Question from '../Questions/Question';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useLocation } from 'react-router-dom';
import './Quiz.css';

export default function Quiz() {
	const [questionsArr, setQuestionsArr] = useState([]);
	const [error, setError] = useState(false);
	const location = useLocation();
	const { questions } = location.state || { category: "", difficulty: "", type: "", questions: [] };

	function shuffleAnswers(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	useEffect(() => {
		if (questions.length === 0) {
			setError(true);
			setQuestionsArr([]);
		} else {
			const formattedQuestions = questions.map(question => ({
				...question,
				id: nanoid(),
				selectedAnswer: "",
				showAnswer: false,
				allAnswers: shuffleAnswers([
					...question.incorrect_answers.map(answer => ({ text: answer, id: nanoid() })),
					{ text: question.correct_answer, id: nanoid() }
				])
			}));
			setQuestionsArr(formattedQuestions);
			setError(false);
		}
	}, [questions]);

	if (error) {
		return <div>Error: No questions available or failed to fetch questions.</div>;
	}

	const handleSelectAnswer = (questionId, answer) => {
		setQuestionsArr(prevQuestionsArr => (
			prevQuestionsArr.map(question => (
				question.id === questionId
					? { ...question, selectedAnswer: answer }
					: question
			))
		));
	}

	const questionElements = questionsArr.map(question => (
		<Question
			key={question.id}
			id={question.id}
			question={question.question}
			correctAnswer={question.correct_answer}
			incorrectAnswers={question.incorrect_answers}
			difficulty={question.difficulty}
			category={question.category}
			selectedAnswer={question.selectedAnswer}
			showAnswer={question.showAnswer}
			allAnswers={question.allAnswers}
			handleSelectAnswer={handleSelectAnswer}
		/>
	));

	return (
		<main>
			<div className='questions-container'>{questionElements}</div>
			<div className='controls-container'>
				<button className="btn-check">Check answers</button>
			</div>
		</main>
	);
}
