import './AstronomicalCalendar.css';
import Calendar from '../components/calendar/Calendar.jsx';
import NextEvent from '../components/calendar/NextEvent.jsx';
import UpcomingEvents from '../components/calendar/UpcomingEvents.jsx';
import DayEvents from '../components/calendar/DayEvents.jsx';
import Navbar from '../components/common/Navbar.jsx';
import { events } from '../mocks/events.js';
import { typeIcons } from '../constants/typeIcons.js';
import { getEventDate } from '../utils/getEventDate.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { formatEventDate, toDateKey } from '../utils/formatEventDate.js';

export default function AstronomicalCalendar() {
  const [selectedDay, setSelectedDay] = useState(null);
  const navigate = useNavigate();

  // handlers
  function handleEventClick(eventSlug) {
    navigate(`/evento/${eventSlug}`);
  }

  function handleDayClick(dateStr) {
    setSelectedDay(selectedDay === dateStr ? null : dateStr);
  }

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

  // día seleccionado en el calendario
  const dayEvents = selectedDay ? events.filter((event) => toDateKey(getEventDate(event)) === selectedDay) : [];

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
    <>
    <main className='main-container container-animation'>
      <Calendar onDayClick={ handleDayClick } events={eventsList} icons={showIcons} />

      { selectedDay ? (
        <DayEvents 
        title={ formatEventDate(selectedDay)}
        events={ dayEvents }
        onBack={() => setSelectedDay(null)}
        onClick={handleEventClick}
        />
      ) : (
        <>
          { nextEvent ? (
            <NextEvent onClick={ handleEventClick } event={ nextEvent } />
          ) : (
            <p>No hay próximos eventos astronómicos.</p>
          )}

          {nextFiveEvents.length > 0 && (
            <UpcomingEvents onClick={handleEventClick} events={ nextFiveEvents } />
          )}
            </>
      )}
    </main>
    <Navbar />
    </>
  );
}