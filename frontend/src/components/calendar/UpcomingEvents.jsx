import './UpcomingEvents.css';
import EventType from '../common/EventType.jsx';

function UpcomingEvents({ events, onClick }) {
    return (
        <section className='upcoming-events--section'>
            <h2 className='subtitle'>Más adelante</h2>
            { events.map(event => {
                return (
                    <div 
                        role="button" 
                        tabIndex="0" 
                        onClick={ () => onClick(event.extendedProps.slug)} 
                        className='upcoming-events--card card' 
                        key={event.id}
                    >
                        <div className='upcoming-events--info'>
                            <div className='text-center upcoming-events--info-date'>
                                <p>{event.date.getDate()}</p>
                                <p>{event.date.toLocaleDateString('es-AR', {
                                    month: 'short'
                                })}</p>
                            </div>
                            <div>
                                <p>{event.title}</p>
                                <EventType className='upcoming-events--type' type={ event.extendedProps.type }/>
                            </div>
                        </div>
                        <button className='upcoming-events--toggle'><i className="bi bi-chevron-right align-self-center"></i></button>
                    </div>
                )
            })}
        </section>
    )
}

export default UpcomingEvents;