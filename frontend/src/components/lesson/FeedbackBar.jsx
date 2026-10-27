function FeedbackBar({ isCorrect, onNext, explanation }) {
    if (isCorrect === null) return null;

    return (
        <div
            className={ `feedback-bar feedback-bar--${ isCorrect ? 'correct' : 'wrong' }` }
            role="status"
        >
            <div className="feedback-bar__text">
                <p className="feedback-bar__title">
                    { isCorrect
                        ? <><i className="bi bi-check-circle" aria-hidden="true"></i> ¡Correcto!</>
                        : <><i className="bi bi-x-circle" aria-hidden="true"></i> Incorrecto</> }
                </p>
                { explanation && (
                    <p className="feedback-bar__explanation">{ explanation }</p>
                ) }
            </div>
            <button onClick={ onNext }>Continuar</button>
        </div>
    );
}

export default FeedbackBar;