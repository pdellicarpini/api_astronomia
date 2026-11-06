import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/react/daygrid';
import timeGridPlugin from '@fullcalendar/react/timegrid';
import interactionPlugin from '@fullcalendar/react/interaction';
import esLocale from '@fullcalendar/react/locales/es';
import '@fullcalendar/react/skeleton.css';
import { typeIcons } from '../../constants/typeIcons.js';
import './Calendar.css';

function Calendar({ events, icons }) {
    return (
        <>
            <section className='calendar-section'>
                <FullCalendar
                    events={ events }
                    eventContent={ icons }
                    height='auto'
                    contentHeight='auto'
                    className='asteria-calendar'
                    plugins={ [dayGridPlugin, timeGridPlugin, interactionPlugin] }
                    initialView='dayGridMonth'
                    locale={esLocale}
                    timeZone="America/Argentina/Buenos_Aires"
                    titleFormat={ (arg) => {
                        const month = new Date(2026, arg.date.month).toLocaleDateString('es-AR', {
                            month: 'long',
                        });
                        const year = arg.date.year;

                        return `${month} ${year}`;
                    } }
                    headerToolbar={ {
                        start: 'prev',
                        center: 'title',
                        end: 'next'
                    } }
                    // showNonCurrentDates={false}
                    fixedWeekCount={false}
                    buttons={ {
                        prev: {
                            iconContent: <i className='bi bi-chevron-left'></i>,
                            hint: 'Mes anterior'
                        },
                        next: {
                            iconContent: <i className='bi bi-chevron-right'></i>,
                            hint: 'Mes siguiente'
                        },
                        today: {
                            text: 'Actual',
                            hint: 'Ir al mes actual'
                        }
                    } }
                    toolbarClass='calendar-toolbar-section'
                    buttonClass={ (info) => {
                        if (info.name === 'prev' || info.name === 'next') {
                            return 'calendar-nav-button';
                        }

                        return 'calendar-view-button';
                    } }
                    tableHeaderClass='calendar-days-header'
                    dayRowClass='calendar-week-row'
                    dayCellClass={ (info) => {
                        if (info.isToday) return 'calendar-today';
                        if (info.isOther) return 'calendar-day-other';

                        return '';
                    } }
                    dayCellTopClass='calendar-day-top'
                    dayCellInnerClass='calendar-day-events'
                    dayCellBottomClass='calendar-day-bottom'
                    dayHeaderAlign='center'
                />
                <div>
                    <ul className='events-type'>
                        {
                            Object.values(typeIcons).map((data) => {
                                return (
                                    <li key={data.style}>
                                        <i className={`${data.icon} ${data.style}`}></i>
                                        {data.label}
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </section>
        </>
    );
}

export default Calendar;