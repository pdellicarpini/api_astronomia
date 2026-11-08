import './DayEvents.css';
import EventType from '../common/EventType';
import { typeIcons } from '../../constants/typeIcons';
import { formatEventDate, formatEventTime, formatShortDate, getEventDate } from '../../utils/formatEventDate';

function DayEvents({ title, events, onBack, onClick }) {
    return (
        <section className="day-events-section">
            <div className="d-flex justify-content-between align-items-center">
                <h2 className='title'>{title}</h2>
                <span className='pill-box'>{events.length} {events.length === 1 ? 'evento' : 'eventos'}</span>
            </div>
            <button className="main-button" onClick={onBack}> <i className="bi bi-arrow-left"></i> Volver a próximos eventos</button>

            {events.length === 0 ? (
                <div className='day-events--no-events card'>
                    <i className="bi bi-moon-stars"></i>
                    <p className='subtitle text-info'>No hay eventos para este día</p>
                    <p>Probá con otro día del calendario o volvé a los próximos eventos.</p>
                </div>
            ) : (
                events.map((event) => {
                    console.log(formatEventTime(getEventDate(event)))
                    return (
                        <div
                            role="button"
                            tabIndex="0"
                            onClick={() => onClick(event.slug)}
                            className='card day-events-card'
                            key={event._id}
                        >
                            <div className='upcoming-events--info-date'>
                                <i className={`
                                        ${typeIcons[event.type].icon} 
                                        ${typeIcons[event.type].style}
                                    `}></i>
                            </div>
                            <div>
                                <p>{event.title}</p>
                                {/* <p>{ formatShortDate(getEventDate(event.date))}</p> */}
                                <EventType className='upcoming-events--type' type={event.type} />
                                <p className='text-small text-soft'>{formatShortDate(getEventDate(event))} · {formatEventTime(getEventDate(event))} hs</p>
                            </div>
                            <button className='upcoming-events--toggle'><i className="bi bi-chevron-right align-self-center"></i></button>
                        </div>
                    )
                })
            )}
        </section>
    );
}

export default DayEvents;