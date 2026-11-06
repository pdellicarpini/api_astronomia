import Calendar from '../components/calendar/Calendar.jsx';
import NextEvent from '../components/calendar/NextEvent.jsx';
import UpcomingEvents from '../components/calendar/UpcomingEvents.jsx';
import './AstronomicalEvents.css';
import { events } from '../mocks/events.js';
import { typeIcons } from '../constants/typeIcons.js';
import { getEventDate } from '../utils/getEventDate.js';

export default function AstronomicalCalendar() {
  const eventsList = events.map(event => {
    return {
      id: event._id,
      title: event.title,
      date: new Date(getEventDate(event)),
      extendedProps: {
        type: event.type,
        slug: event.slug,
        visibility: event.visibility,
        visibilityDescription: event.visibilityDescription
      }
    }
  })

  function showIcons(info) {
    const type = info.event.extendedProps.type;
    const data = typeIcons[type];

    return (
      <div className='calendar-event'>
        <i className={data.icon + ' ' + data.style}></i>
      </div>
    )
  }

  // ordenar los eventos por fecha y filtrar solo los próximos 5
  const today = new Date();

  const upcomingEvents = eventsList.filter((event) => {
    return event.date >= today;
  });

  upcomingEvents.sort((eventA, eventB) => eventA.date - eventB.date);

  const nextFiveEvents = upcomingEvents.slice(1, 6)

  // obtener el próximo evento
  const nextEvent = upcomingEvents[0]

  return (
    <main className='main-container astronomical-calendar-container'>
      <Calendar events={eventsList} icons={showIcons} />
      
      {nextEvent ? (
        <NextEvent event={nextEvent} />
      ) : (
        <p>No hay próximos eventos astronómicos.</p>
      )}

      {nextFiveEvents.length > 0 && (
        <UpcomingEvents events={nextFiveEvents} />
      )}
    </main>
  );
}