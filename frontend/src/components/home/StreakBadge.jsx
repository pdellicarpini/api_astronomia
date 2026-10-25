import streakIcon from '../../assets/streak.png';

function StreakBadge({ streak }) {
    return (
        <div className="streak-badge">
            <img src={ streakIcon } alt="Ícono de racha" className="streak-icon"/>
            <div>
                <p>{ streak }</p>
                <p>{ streak === 1 ? 'día' : 'días' }</p>
            </div>
        </div>
    )
}

export default StreakBadge;