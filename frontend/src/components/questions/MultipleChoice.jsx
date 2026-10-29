import { useState } from 'react';

function MultipleChoice({ question, onAnswer, className = '' }) {
    const [selected, setSelected] = useState(null);
    const [checked, setChecked] = useState(false);

    function handleCheck() {
        setChecked(true);
        onAnswer(selected === question.correctAnswer);
    }

    return (
        <div className={`multiple-choice ${className}`}>
            <h3>{ question.question }</h3>
            <div>
                <ul>
                    { question.options.map(option => (
                        <li key={ option }>
                            <button
                                onClick={ () => setSelected(option)}
                                disabled={ checked }
                                aria-pressed={ selected === option }
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