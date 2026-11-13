import './Questions.css';
import { useState } from 'react';

function MultipleChoice({ question, onAnswer, className = '' }) {
    const [selected, setSelected] = useState(null);
    const [checked, setChecked] = useState(false);
    const correctIndex = Number(question.correctAnswer);

    function handleCheck() {
        setChecked(true);
        onAnswer(selected === correctIndex);
    }

    return (
        <div className={`multiple-choice ${className}`}>
            <h3>{ question.question }</h3>
            <div>
                <ul>
                    { question.options.map((option, index) => (
                        <li key={ option }>
                            <button
                                onClick={ () => setSelected(index)}
                                disabled={ checked }
                                aria-pressed={ selected === index }
                                className='button-option'
                            >
                                { option }
                            </button>
                        </li>
                    ))}
                </ul>
                <button onClick={ handleCheck } disabled={ selected === null || checked } className='main-button'>
                    Enviar
                </button>
            </div>
        </div>
    )
}

export default MultipleChoice;