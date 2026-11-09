// import Levels from './pages/Levels';
// import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import Register from './components/login-register/Register';
import AstronomicalCalendar from './pages/AstronomicalCalendar';
import EventDetails from './pages/EventDetails';
import ScrollToTop from './components/common/ScrollToTop';
import Forum from './pages/Forum';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/login-register/ProtectedRoute';

function App() {
  return (
    <>
      <ScrollToTop/>
      <Routes>
          <Route path='/iniciar-sesion' element={ <LoginPage/> } />
          <Route path='/registrarse' element={ <Register/> } />
          <Route path='/' element={ <ProtectedRoute><Home/></ProtectedRoute> } />
          <Route path='/lecciones/:id' element={ <ProtectedRoute><Lesson/></ProtectedRoute> } />
          <Route path='/calendario' element={ <AstronomicalCalendar/> } />
          <Route path='/evento/:slug' element={ <EventDetails/> } />
          <Route path='/foro' element={ <Forum/> } />
      </Routes>
    </>
  )
} 

export default App;