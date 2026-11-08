import './NextEvent.css';
import { typeIcons } from '../../constants/typeIcons.js';
import { formatEventDate, formatEventTime } from '../../utils/formatEventDate.js';
import EventType from '../common/EventType.jsx';
import DaysRemaining from '../common/DaysRemaining.jsx';

function NextEvent({ event, onClick }) {
    return (
        <section className='next-event-section'>
            <h2 className='subtitle'>Lo próximo en el cielo</h2>
            <div className='next-event-card--img'>
                <i className={`
                    ${typeIcons[event.extendedProps.type].icon} 
                    ${typeIcons[event.extendedProps.type].style}
                `}></i>
            </div>
            <div className='next-event-card card'>
                <div className='next-event-card--info'>
                    <div className='d-flex justify-content-between'>
                    <EventType type={ event.extendedProps.type }/>
                    <DaysRemaining date={ event.date }/>
                    </div>
                    <div>
                        <h3 className='title--lg'>{ event.title }</h3>
                        <p className='text-soft'>
                            { formatEventDate(event.date, false)} a las {formatEventTime(event.date)} hs · hora de Argentina (UTC-3)
                        </p>
                        <div className='next-event-card--visibility text-muted'>
                            <i className="bi bi-eye"></i>
                            <p>{ event.extendedProps.visibility}</p>
                        </div>
                    </div>
                    <button className='main-button' onClick={ () => onClick(event.extendedProps.slug)}>
                        Ver detalle
                    </button>
                </div>
            </div>
        </section>
    )
}

export default NextEvent;