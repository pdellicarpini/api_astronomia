import './EventHero.css';
import EventType from '../common/EventType';
import DaysRemaining from '../common/DaysRemaining';
import { getEventDate } from '../../utils/getEventDate';
import { formatEventDate } from '../../utils/formatEventDate';
import { typeIcons } from '../../constants/typeIcons';

function EventHero({ event }) {
    const eventDate = new Date(getEventDate(event));
    return (
        <section className='event-hero d-flex flex-column gap-5'>
            <div className='event-hero-card card'>
                <i className={`
                        ${typeIcons[event.type].icon} 
                        ${typeIcons[event.type].style}
                    `}></i>
                <EventType className='event-hero--badge' type={event.type} />
            </div>
            <div className='d-flex flex-column gap-1'>
                <h1 className='title--lg text-asteria-orange'>{event.title}</h1>
                <p className="text-soft text-small">
                    {formatEventDate(getEventDate(event))}
                </p>
                <DaysRemaining date={eventDate} className='text-muted' />
            </div>
        </section>
    );
}

export default EventHero;