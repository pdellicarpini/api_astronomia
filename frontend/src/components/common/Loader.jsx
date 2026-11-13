import './Loader.css';

function Loader({ text = 'Cargando...' }) {
    return (
        <div className='loader' role='status' aria-live='polite'>
            <div className='loader--orbit' aria-hidden='true'>
                <span className='loader--planet'></span>
            </div>
            <p className='text text-muted'>{ text }</p>
        </div>
    )
}

export default Loader;