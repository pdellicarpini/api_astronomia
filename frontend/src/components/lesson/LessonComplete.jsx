import './LessonComplete.css';

function LessonComplete({ mistakes, total, lessonOrder, onExit, user, xpEarned = 0 }) {
    const precision = Math.round(total * 100 / (total + mistakes));
    return (
        <div className="lesson-complete">
            <div className="lesson-complete--feedback">
                <div className="lesson-complete--icon" aria-hidden="true">
                    <i className="bi bi-star-fill"></i>
                </div>

                <h1>{`¡Muy bien, ${ user }!`}</h1>
                <p className="text-soft">Lección { lessonOrder } completada</p>
            </div>

            { xpEarned > 0 && (
                <div className="lesson-complete--xp">
                        <span className="text text-soft">
                            Experiencia ganada
                        </span>
                        <div className="lesson-complete--xp-info">
                            <span className="lesson-complete--xp-icon" aria-hidden="true">
                                <i class="bi bi-lightning-charge"></i>
                            </span>
                            <p>
                                <strong>+{ xpEarned }</strong> XP
                            </p>
                    </div>
                </div>
            )}

            <div className="lesson-complete--card">
                <div className="lesson-complete--stat">
                    <span>Errores cometidos</span>
                    <strong>{ mistakes }</strong>
                </div>
                <div className="lesson-complete--stat">
                    <span>Precisión</span>
                    <div>
                        <i className="bi bi-bullseye"></i>
                        <strong>{ precision }%</strong>
                    </div>
                </div>
                <button
                    onClick={ onExit }
                    className="main-button"
                >
                    Volver al inicio
                </button>
            </div>
            <p className="lesson-complete--encouragement">
                Cada pregunta te acerca a descubrir algo nuevo.
            </p>
        </div>
    );
}

export default LessonComplete;
