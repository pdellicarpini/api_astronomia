function LessonComplete({ mistakes, onExit, user }) {
    return (
        <div className="lesson-complete">
            <div className="lesson-complete__feedback">
                <h1>{`¡Muy Bien, ${ user }!`}</h1>
            </div>
            <div className="lesson-complete__card">
                <h2>¡Lección completada!</h2>
                <p>Errores: { mistakes }</p>
                <button onClick={ onExit } className="main-button">Volver al inicio</button>
            </div>
        </div>
    );
}

export default LessonComplete;