import './EventDetails.css';
import EventHero from '../components/event/EventHero.jsx';
import DetailsGrid from '../components/event/DetailsGrid.jsx';
import InfoCard from '../components/event/InfoCard.jsx';
import Timeline from '../components/event/Timeline.jsx';
import Navbar from '../components/common/Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { events } from '../mocks/events';

function EventDetail() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const event = events.find(event => event.slug === slug);

    if (!event) {
        return (
            <div className='card'>
                <p>Evento no encontrado :c</p>
            </div>
        )
    }

    return (
        <>
            <main className='main-container event-details-container container-animation'>
                <button className='main-button event-details--button' onClick={() => navigate(-1)}>
                    <i className="bi bi-chevron-left"></i> Volver al calendario
                </button>

                <EventHero event={event} />
                <DetailsGrid event={event} />

                <p className='text-muted text-small text-center'>Todos los horarios son hora de Argentina (UTC-3)</p>

                <Timeline startDate={event.startDate} peakDate={event.peakDate} endDate={event.endDate} />
                <InfoCard event={event} />

                <div className='d-flex gap-2 text-small text-muted'>
                    <i className="bi bi-link-45deg"></i>
                    <p>Fuente: Mockup - Asteria</p>
                </div>
            </main>
            <Navbar />
        </>
    )
}

export default EventDetail;