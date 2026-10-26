import { useEffect, useState } from 'react';

function Matching({ question, onAnswer }) {
    const [leftSelect, setLeftSelect] = useState(null);
    const [rightSelect, setRightSelect] = useState(null);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const isWrongPair = leftSelect !== null && rightSelect !== null

    function handleRightClick(index) {
        if (leftSelect === null) {
            setRightSelect(index);
        } else if (leftSelect === index) {
            setMatchedPairs(matches => [...matches, index]);

            setLeftSelect(null);
            setRightSelect(null);
        } else {
            setRightSelect(index);
            setTimeout(() => {
                setLeftSelect(null);
                setRightSelect(null);
            }, 500);
        }
    }

    function handleLeftClick(index) {
        if (rightSelect === null) {
            setLeftSelect(index);
        } else if (rightSelect === index) {
            setMatchedPairs(matches => [...matches, index]);

            setLeftSelect(null);
            setRightSelect(null);
        } else {
            setLeftSelect(index);
            setTimeout(() => {
                setLeftSelect(null);
                setRightSelect(null);
            }, 500);
        }
    }

    useEffect(() => {
        if (matchedPairs.length === question.options.length) {
            onAnswer(true)
        }
    }, [matchedPairs, question.options.length]);

    return (
        <div className='matching'>
            <h3>{ question.question }</h3>
            <div>
                <ul className='matching-left-column'>
                    { question.options.map((option, index) => (
                        <li key={ option }>
                            <button
                                onClick={ () => handleLeftClick(index) }
                                aria-pressed={ leftSelect === index }
                                disabled={ matchedPairs.includes(index) || isWrongPair }
                                className={ `button-option ${ matchedPairs.includes(index) ? 'button-matching--correct' : '' } ${ isWrongPair && leftSelect === index ? 'button-matching--wrong' : '' }` }
                            >
                                { option }
                            </button>
                        </li>
                    ))}
                </ul>
                <ul className='matching-right-column'>
                    { question.matchOptions.map((matchOption, index) => (
                        <li key={ matchOption }>
                            <button
                                onClick={ () => handleRightClick(index) }
                                aria-pressed={ rightSelect === index }
                                disabled={ matchedPairs.includes(index) || isWrongPair }                          
                                className={ `button-option ${ matchedPairs.includes(index) ? 'button-matching--correct' : '' } ${ isWrongPair && rightSelect === index ? 'button-matching--wrong' : '' }` }
                            >
                                { matchOption }
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Matching;