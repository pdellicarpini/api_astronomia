import './DetailsGrid.css';
import { getEventDate } from '../../utils/getEventDate';
import { formatEventTime } from '../../utils/formatEventDate';

function DetailsGrid({ event }) {
    const eventDate = new Date(getEventDate(event));

    return (
        <section className='event-details--grid'>
            <div className='fact-tile card'>
                <div className='d-flex gap-3 text-small text-soft'>
                    <i className="bi bi-calendar-event"></i>
                    <p>Fecha</p>
                </div>
                <p>
                    { eventDate.toLocaleDateString('es-AR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    }).replaceAll(' de ', ' ') }
                </p>
            </div>
            <div className='fact-tile fact-highlight card'>
                <div className='d-flex gap-3 text-small'>
                    <i className="bi bi-clock"></i>
                    <p>Horario</p>
                </div>
                <p>{ formatEventTime(eventDate)} hs</p>
            </div>
            <div className='fact-tile card'>
                <div className='d-flex gap-3 text-small text-soft'>
                    <i className="bi bi-hourglass"></i>
                    <p>Duración</p>
                </div>
                <p>Todo el día</p>
            </div>
            <div className='fact-tile card'>
                <div className='d-flex gap-3 text-small text-soft'>
                    <i className="bi bi-eye"></i>
                    <p>Visibilidad</p>
                </div>
                <p>{ event.visibility }</p>
            </div>
        </section>
    )
}

export default DetailsGrid;