import streakIcon from '../../assets/streak.png';

function StreakBadge({ streak }) {
    return (
        <div className="streak-badge pill-box">
            <img src={ streakIcon } alt="Ícono de racha" className="streak-icon"/>
                <p>{ streak } { streak === 1 ? 'día' : 'días' }</p>
        </div>
    )
}

export default StreakBadge;