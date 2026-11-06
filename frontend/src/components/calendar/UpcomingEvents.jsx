import './UpcomingEvents.css';
import { typeLabels } from '../../constants/typeLabels';
import { typeIcons } from '../../constants/typeIcons.js';
import EventType from '../common/EventType.jsx';

function UpcomingEvents({ events }) {
    return (
        <section className='upcoming-events--section'>
            <h2 className='subtitle'>Más adelante</h2>
            { events.map(event => {
                return (
                    <div role="button" tabIndex="0" className='upcoming-events--card card' key={event.id}>
                        <div className='upcoming-events--info'>
                            <div className='text-center upcoming-events--info-date'>
                                <p>{event.date.getDate()}</p>
                                <p>{event.date.toLocaleDateString('es-AR', {
                                    month: 'short'
                                })}</p>
                            </div>
                            <div>
                                <p>{event.title}</p>
                                <EventType className='upcoming-events--type' event={ event }/>
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