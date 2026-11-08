import './DaysRemaining.css';

function DaysRemaining({ date, className }) {
    const today = new Date();
    const eventDate = new Date(date);
    const difference = eventDate - today;
    const daysRemaining = Math.ceil(difference / (1000 * 60 * 60 * 24));

    return (
        <div className={ `next-event-card--time text-soft ${ className }` }>
            <i className="bi bi-clock-history"></i>
            <p>{daysRemaining === 0 ? '¡Es hoy!'
                : daysRemaining === 1 ? 'Es mañana'
                    : `Faltan ${daysRemaining} días`
            } </p>
        </div>
    )
}

export default DaysRemaining;