/* eslint-disable react/prop-types */
import { decode } from 'html-entities';

export default function Question(props) {
    return (
        <div className=''>
            <h3 className="question-text">{ decode(props.question) }</h3>
        </div>
    )
}