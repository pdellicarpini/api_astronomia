import { useEffect, useState } from 'react';
import shuffle from '../../utils/shuffle.js';

function Matching({ question, onAnswer }) {
    const [leftSelect, setLeftSelect] = useState(null);
    const [rightSelect, setRightSelect] = useState(null);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const isWrongPair = leftSelect !== null && rightSelect !== null

    // estados para mezclar las columnas
    const [leftItems] = useState(() => 
        shuffle(question.options.map((option, index) => ({
            text: option,
            originalIndex: index
        })))
    );
    const [rightItems] = useState(() => 
        shuffle(question.matchOptions.map((matchOption, index) => ({
            text: matchOption,
            originalIndex: index
        })))
    );

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
                    { leftItems.map(item => (
                        <li key={ item.text }>
                            <button
                                onClick={ () => handleLeftClick(item.originalIndex) }
                                aria-pressed={ leftSelect === item.originalIndex }
                                disabled={ matchedPairs.includes(item.originalIndex) || isWrongPair }
                                className={ `button-option 
                                    ${ matchedPairs.includes(item.originalIndex) ? 'button-matching--correct' : '' } 
                                    ${ isWrongPair && leftSelect === item.originalIndex ? 'button-matching--wrong' : '' }` }
                            >
                                { item.text }
                            </button>
                        </li>
                    ))}
                </ul>
                <ul className='matching-right-column'>
                    { rightItems.map(item => (
                        <li key={ item.text }>
                            <button
                                onClick={ () => handleRightClick(item.originalIndex) }
                                aria-pressed={ rightSelect === item.originalIndex }
                                disabled={ matchedPairs.includes(item.originalIndex) || isWrongPair }                          
                                className={ `button-option 
                                    ${ matchedPairs.includes(item.originalIndex) ? 'button-matching--correct' : '' } 
                                    ${ isWrongPair && rightSelect === item.originalIndex ? 'button-matching--wrong' : '' }` }
                            >
                                { item.text }
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Matching;