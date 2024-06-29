/* eslint-disable react/prop-types */
import { decode } from 'html-entities';
import './Question.css';


export default function Question(props) {
    const answerElements = props.allAnswers.map(answer => (
        <button 
            key={answer.id} 
            className={`answer-button ${props.selectedAnswer === answer.text ? 'selected' : ''}`}
            onClick={() => props.handleSelectAnswer(props.id, answer.text)}
        >
            { decode(answer.text) }
        </button>
    ));

    return (
        <div className='question-container'>
            <h3 className="question-text">{ decode(props.question) }</h3>
            <div className="answer-buttons">
                { answerElements }
            </div>
            <hr />
        </div>
    )
}
