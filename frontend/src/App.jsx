// import Levels from './pages/Levels';
// import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import Register from './pages/Register';
import AstronomicalCalendar from './pages/AstronomicalCalendar';
import EventDetails from './pages/EventDetails';
import ScrollToTop from './components/common/ScrollToTop';
import Forum from './pages/Forum';

function App() {
  return (
    <>
      <ScrollToTop/>
      <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path='/lecciones/:id' element={ <Lesson/> } />
          <Route path='/registrarse' element={ <Register/> } />
          <Route path='/calendario' element={ <AstronomicalCalendar/> } />
          <Route path='/evento/:slug' element={ <EventDetails/> } />
          <Route path='/foro' element={ <Forum/> } />
      </Routes>
    </>
  )
} 

export default App;