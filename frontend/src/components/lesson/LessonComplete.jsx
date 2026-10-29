
function LessonComplete({ mistakes, onExit, user, xpEarned = 15 }) {
    const precision = 100 - (mistakes * 100 / 8);
    return (
        <div className="lesson-complete">
            <div className="lesson-complete__feedback">
                <div className="lesson-complete__icon" aria-hidden="true">
                    <i className="bi bi-star-fill"></i>
                </div>

                <h1>{`¡Muy bien, ${ user }!`}</h1>
                <p className="text-soft">Lección 1 completada</p>
            </div>

            <div className="lesson-complete__xp">
                    <span className="text text-soft">
                        Experiencia ganada
                    </span>
                    <div className="lesson-complete__xp-info">
                        <span className="lesson-complete__xp-icon" aria-hidden="true">
                            <i class="bi bi-lightning-charge"></i>
                        </span>
                        <p>
                            <strong>+{xpEarned}</strong> XP
                        </p>
                </div>
            </div>

            <div className="lesson-complete__card">
                <div className="lesson-complete__stat">
                    <span>Errores cometidos</span>
                    <strong>{mistakes}</strong>
                </div>
                <div className="lesson-complete__stat">
                    <span>Precisión</span>
                    <div>
                        <i className="bi bi-bullseye"></i>
                        <strong>{ parseInt(precision) }%</strong>
                    </div>
                </div>
                <button
                    onClick={onExit}
                    className="main-button"
                >
                    Volver al inicio
                </button>
            </div>
            <p className="lesson-complete__encouragement">
                    Cada pregunta te acerca a descubrir algo nuevo.
            </p>
        </div>
    );
}

export default LessonComplete;
