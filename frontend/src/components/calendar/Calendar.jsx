import './Calendar.css';
import '@fullcalendar/react/skeleton.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/react/daygrid';
import timeGridPlugin from '@fullcalendar/react/timegrid';
import interactionPlugin from '@fullcalendar/react/interaction';
import esLocale from '@fullcalendar/react/locales/es';
import { typeIcons } from '../../constants/typeIcons.js';
import { useState } from 'react';

function Calendar({ onDayClick, events, icons }) {
    const [selected, setSelected] = useState(null);

    return (
        <>
            <section className='calendar-section'>
                <FullCalendar
                    events={ events }
                    eventContent={ icons }
                    dateClick={(info) => {
                        setSelected(info.dateStr);
                        onDayClick(info.dateStr)
                    }}
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
                            return 'chevron-button';
                        }

                        return 'calendar-view-button';
                    } }
                    tableHeaderClass='calendar-days-header'
                    dayRowClass='calendar-week-row'
                    dayCellClass={ (info) => {
                        if (info.isToday) return 'calendar-today';
                        if (info.isOther) return 'calendar-day-other';

                        const cellDate = info.date.toLocaleDateString('en-CA', {
                            timeZone: 'America/Argentina/Buenos_Aires'
                        });

                        if (cellDate === selected) return 'calendar-day-selected';

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