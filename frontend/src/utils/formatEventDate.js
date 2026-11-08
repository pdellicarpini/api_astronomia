export function formatEventDate(date) {
    const value =
        typeof date === 'string' && date.length === 10
            ? date + 'T12:00:00-03:00'
            : date;

    const formattedDate = new Date(value).toLocaleDateString('es-AR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        timeZone: 'America/Argentina/Buenos_Aires',
    });

    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

export function formatShortDate(date) {
    return new Date(date).toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'short',
        hour12: false,
        timeZone: 'America/Argentina/Buenos_Aires',
    });
}

export function formatEventTime(date) {
    return new Date(date).toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'America/Argentina/Buenos_Aires'
    });
}

export function getPeakPosition(startDate, peakDate, endDate){
    const start = new Date(startDate).getTime();
    const peak = new Date(peakDate).getTime();
    const end = new Date(endDate).getTime();

    const total = end - start;
    if (total <= 0) return 0;

    const position = ((peak - start) / total) * 100;
    return Math.min(100, Math.max(0, position));
}

export function isSameDay(a, b) {
    const options = { timeZone: 'America/Argentina/Buenos_Aires' }
    return (
        new Date(a).toLocaleDateString('es-AR', options) ===  new Date(b).toLocaleDateString('es-AR', options)
    )
}

export function getEventDate(event) {
    return event.peakDate || event.startDate;
}

export function toDateKey(date) {
    return new Date(date).toLocaleDateString('en-CA', { timeZone: 'America/Argentina/Buenos_Aires' })
}