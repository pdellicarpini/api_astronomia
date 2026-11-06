export function getEventDate(event) {
    return event.peakDate || event.startDate;
}