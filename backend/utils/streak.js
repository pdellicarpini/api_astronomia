function dayKey(date) {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Argentina/Buenos_Aires' }).format(date);
}

function daysBetween(from, to) {
    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    return Math.round((Date.parse(dayKey(to)) - Date.parse(dayKey(from))) / MS_PER_DAY);
}

// racha que se muestra: si pasó más de un día sin actividad, vale 0
export function getActiveStreak(streak, now = new Date()) {
    if (!streak?.lastActivityAt) return 0;
    return daysBetween(streak.lastActivityAt, now) > 1 ? 0 : streak.current;
}

// racha nueva al completar una lección
export function nextStreak(streak, now = new Date()) {
    const gap = streak?.lastActivityAt ? daysBetween(streak.lastActivityAt, now) : null;

    if (gap === 0) return streak.current;       // hoy ya había contado
    if (gap === 1) return streak.current + 1;   // día consecutivo
    return 1;                                   // primera vez o racha cortada
}