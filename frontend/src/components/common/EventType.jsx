import './EventType.css';
import { typeLabels } from '../../constants/typeLabels';
import { typeIcons } from '../../constants/typeIcons.js';

function EventType({ event, className }) { 
    return (
        <div className={`event-type ${ className }`}>
            <i className={`
                ${typeIcons[event.extendedProps.type].icon} 
                ${typeIcons[event.extendedProps.type].style}
            `}></i>
            <p>{typeLabels[event.extendedProps.type]}</p>
        </div>
    )
}

export default EventType;