// import Levels from './pages/Levels';
// import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import Register from './pages/Register';
import AstronomicalCalendar from './pages/AstronomicalCalendar';
import EventDetails from './pages/EventDetails';

function App() {
  return (
    <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/lessons/:id' element={ <Lesson/> } />
        <Route path='/register' element={ <Register/> } />
        <Route path='/calendar' element={ <AstronomicalCalendar/> } />
        <Route path='/event' element={ <EventDetails/> } />
    </Routes>
  )
} 

export default App;