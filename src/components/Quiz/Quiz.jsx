import getQuestions from '../../services/getQuestions';
import Question from '../Questions/Question';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useLocation } from 'react-router-dom';
import './Quiz.css';

export default function Quiz() {
	const [questionsArr, setQuestionsArr] = useState([]);
	const [error, setError] = useState(false);
	const location = useLocation();
	const { gameOptions } = location.state || { category: "", difficulty: "", type: "" };

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const questions = await getQuestions(gameOptions);
				if (!questions || questions.length === 0) {
					setError(true);
					setQuestionsArr([]);
				} else {
					const formattedQuestions = questions.map(question => ({
						...question,
						id: nanoid(),
						selectedAnswer: "",
						showAnswer: false
					}));
					setQuestionsArr(formattedQuestions);
					setError(false);
				}
			} catch (error) {
				console.error("Error fetching questions:", error);
				setError(true);
				setQuestionsArr([]);
			}
		};

		fetchQuestions();
		
	}, [gameOptions]);

	if (error) {
		return <div>Error: No questions available or failed to fetch questions.</div>;
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
