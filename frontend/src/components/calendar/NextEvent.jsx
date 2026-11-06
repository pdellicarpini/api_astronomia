import './NextEvent.css';
import { typeIcons } from '../../constants/typeIcons.js';
import EventType from '../common/EventType.jsx';

function NextEvent({ event }) {
    const today = new Date();
    const difference = event.date - today;
    const daysRemaining = Math.ceil(difference / (1000 * 60 * 60 * 24));

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
                    <EventType event={ event }/>
                        <div className='next-event-card--time text-soft'>
                            <i className="bi bi-clock-history"></i>
                            <p>{ daysRemaining === 0 ? '¡Es hoy!' 
                                : daysRemaining === 1 ? 'Es mañana'
                                : `Faltan ${ daysRemaining } días`
                            } </p>
                        </div>
                    </div>
                    <div>
                        <h3 className='title--lg'>{ event.title }</h3>
                        <p className='text-soft'>{ event.date.toLocaleDateString('es-AR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long'
                        }) } a las { event.date.toLocaleTimeString('es-AR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        }) }hs · hora de Argentina (UTC-3)</p>
                        <div className='next-event-card--visibility text-muted'>
                            <i className="bi bi-eye"></i>
                            <p>{ event.extendedProps.visibility}</p>
                        </div>
                    </div>
                    <button className='main-button'>Ver detalle</button>
                </div>
            </div>
        </section>
    )
}

export default NextEvent;