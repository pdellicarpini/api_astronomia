import './Timeline.css';
import { getPeakPosition, formatShortDate, formatEventTime, isSameDay } from '../../utils/formatEventDate';

function Timeline({ startDate, peakDate, endDate }) {
    if (!startDate || !peakDate || !endDate) return null;

    const position = getPeakPosition(startDate, peakDate, endDate);
    const sameDay = isSameDay(startDate, endDate);

    const formatEnd = sameDay ? (d) => `${formatEventTime(d)} hs` : formatShortDate;
    const peakText = sameDay ? `${formatEventTime(peakDate)} hs` : `${formatShortDate(peakDate)}, ${formatEventTime(peakDate)} hs`;

    let labelClass = 'timeline-peak-label--center';
    let labelStyle = { left: `${position}%` };
    if (position < 15) {
        labelClass = 'timeline-peak-label--start';
        labelStyle = {};
    } else if (position > 85) {
        labelClass = 'timeline-peak-label--end';
        labelStyle = {};
    }

    return (
        <section className="timeline-card card">
            <h2 className="subtitle">Línea de tiempo</h2>
            <div className="timeline-track">
                <div className="timeline-fill" style={{ width: `${position}%` }}></div>
                <span className={`timeline-peak-label ${labelClass}`} style={labelStyle}>
                    Pico · {peakText}
                </span>
                <span className="timeline-marker" style={{ left: `${position}%` }}></span>
            </div>
            <div className="timeline-ends">
                <span>Inicio · {formatEnd(startDate)}</span>
                <span>Fin · {formatEnd(endDate)}</span>
            </div>
        </section>
    )
}

export default Timeline;