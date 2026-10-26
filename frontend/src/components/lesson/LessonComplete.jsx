function LessonComplete({ mistakes, onExit }) {
    return (
        <div>
            <h2>¡Lección completada!</h2>
            <p>Errores: { mistakes }</p>
            <button onClick={ onExit }>Volver al inicio</button>
        </div>
    );
}

export default LessonComplete;