import FullCalendar from "@fullcalendar/react";import themePlugin from "@fullcalendar/react/themes/monarch"; 
import dayGridPlugin from "@fullcalendar/react/daygrid";

import '@fullcalendar/react/skeleton.css'; // ALWAYS NEED SKELETON
import '@fullcalendar/react/themes/monarch/theme.css'; // YOUR THEME

export default function Calendar() {
  return (
    <FullCalendar
      plugins={[themePlugin, dayGridPlugin]}
      initialView="dayGridMonth"
    />
  );
}