import './EventType.css';
import { typeLabels } from '../../constants/typeLabels';
import { typeIcons } from '../../constants/typeIcons.js';

function EventType({ type, className }) { 
    return (
        <div className={`event-type ${ className }`}>
            <i className={`
                ${typeIcons[type].icon} 
                ${typeIcons[type].style}
            `}></i>
            <p>{typeLabels[type]}</p>
        </div>
    )
}

export default EventType;