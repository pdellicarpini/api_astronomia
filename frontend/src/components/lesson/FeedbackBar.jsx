function FeedbackBar({ isCorrect, onNext }) {
    if (isCorrect === null) return null;

    return (
        <div className={ `feedback-bar feedback-bar--${ isCorrect ? 'correct' : 'wrong' }` }>
            <p>{ isCorrect ? <> <i className="bi bi-check-circle"></i> ¡Correcto! </>  : <> <i className="bi bi-x-circle"></i> Incorrecto </> }</p>
            <button onClick={ onNext }>Continuar</button>
        </div>
    );
}

export default FeedbackBar;