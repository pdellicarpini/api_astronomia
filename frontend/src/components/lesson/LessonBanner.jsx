function LessonBanner({ lessonId, title, progress, onExit }) {
    return (
        <div className="lesson-banner">
            <div className="lesson-banner__text">
                <p>Lección {lessonId}</p>
                <h2>{title}</h2>
            </div>

            <div className="lesson-banner__progress">
                <progress value={progress} max="1" />
            </div>
        </div>
    );
}

export default LessonBanner;
