import './EventDetails.css';
import EventType from '../components/common/EventType';

function EventDetail({ event }){
    return (
        <main className='main-container event-details-container'>
            <button className='main-button event-details--button'><i className="bi bi-chevron-left"></i> Volver al calendario</button>

            <section className='event-hero d-flex flex-column gap-5'>
                <div className='event-hero-card card'>
                    <i className="bi bi-moon-stars-fill text-info"></i>
                    <div className='event-hero--badge'>
                        <i className="bi bi-moon-fill"></i>
                        <p>Fase lunar</p>
                    </div>
                </div>
                <div className='d-flex flex-column gap-1'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h1 className='title--lg text-asteria-orange'>Luna nueva</h1>
                        <div className='event-details--time text-soft'>
                            <i className="bi bi-clock-history"></i>
                            <p>Faltan 4 días</p>
                        </div>
                    </div>
                    <p className='text-soft text-small'>Lunes, 9 de noviembre de 2026</p>
                </div>
            </section>
            
            <section className='event-details--grid'>
                <div className='fact-tile card'>
                    <div className='d-flex gap-3 text-small text-soft'>
                        <i className="bi bi-calendar-event"></i>
                        <p>Fecha</p>
                    </div>
                    <p>9 nov 2026</p>
                </div>
                <div className='fact-tile fact-highlight card'>
                    <div className='d-flex gap-3 text-small'>
                        <i className="bi bi-clock"></i>
                        <p>Horario</p>
                    </div>
                    <p>04:00 hs</p>
                </div>
                <div className='fact-tile card'>
                    <div className='d-flex gap-3 text-small text-soft'>
                        <i class="bi bi-hourglass"></i>
                        <p>Duración</p>
                    </div>
                    <p>Todo el día</p>
                </div>
                <div className='fact-tile card'>
                    <div className='d-flex gap-3 text-small text-soft'>
                        <i className="bi bi-eye"></i>
                        <p>Visibilidad</p>
                    </div>
                    <p>Global</p>
                </div>
            </section>

            <p className='text-muted text-small text-center'>Todos los horarios son hora de Argentina (UTC-3)</p>

            <section className='timeline-card card'>
                <div>
                    <h2 className='subtitle'>Línea de tiempo</h2>
                    <p className='text-orange text-small'>Pico · 04:00</p>
                </div>
                <div className='timeline'>
                    <div></div>
                </div>
                <div className='d-flex justify-content-between text-small'>
                    <span>Inicio · 00:00</span>
                    <span>Fin · 23:59</span>
                </div>
            </section>

            <section className='info-card d-flex flex-column gap-5'>
                <div className='d-flex flex-column card'>
                    <h2 className='subtitle'>Sobre este evento</h2>
                    <p className='text-soft'>La Luna nueva ocurre cuando nuestro satélite se encuentra aproximadamente entre la Tierra y el Sol. Desde nuestra perspectiva, su cara iluminada queda orientada en dirección opuesta a la Tierra, por lo que resulta prácticamente invisible en el cielo nocturno.</p>
                </div>
                <div className='d-flex flex-column card'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <h2 className='subtitle'>Dónde se ve</h2>
                        <span>Global</span>
                    </div>
                    <p className='text-soft'>La fase lunar ocurre simultáneamente en todo el planeta. Es una excelente oportunidad para observar objetos débiles del cielo profundo debido a la ausencia de luz lunar.</p>
                </div>
            </section>

            <div className='d-flex gap-2 text-small text-muted'>
                <i className="bi bi-link-45deg"></i>
                <p>Fuente: Mockup - Asteria</p>
            </div>
        </main>
    )
}

export default EventDetail;