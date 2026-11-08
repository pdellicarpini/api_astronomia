function InfoCard({ event }) {
    return (
        <section className='info-card d-flex flex-column gap-5'>
                <div className='d-flex flex-column card'>
                    <h2 className='subtitle'>Sobre este evento</h2>
                    <p className='text-soft'>{ event.description }</p>
                </div>
                <div className='d-flex flex-column card'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <h2 className='subtitle'>Dónde se ve</h2>
                        <span>{ event.visibility }</span>
                    </div>
                    <p className='text-soft'>{ event.visibilityDescription }</p>
                </div>
            </section>
    )
}

export default InfoCard;