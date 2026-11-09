const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto'});
const units = [ ['day', 86400], ['hour', 3600], ['minute', 60] ]; // nros equivalentes a segundos

export function timeAgo(date) {
    const seconds = Math.round((new Date(date) - Date.now()) / 1000); // dif en milisegundos 
    for (const [unit, size] of units) {
        if (Math.abs(seconds) >= size) {
            return rtf.format(Math.round(seconds / size), unit);
        }
    }

    return 'ahora';
}