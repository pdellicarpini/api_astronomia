import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import ProtectedRoute from './components/login-register/ProtectedRoute';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import Forum from './pages/Forum';
import AstronomicalCalendar from './pages/AstronomicalCalendar';
import EventDetails from './pages/EventDetails';
import NewPost from './pages/NewPost';
import Profile from './pages/Profile';
import PostDetail from './pages/PostDetail';

function App() {
  return (
    <>
      <ScrollToTop/>
      <Routes>
          // auth
          <Route path='/iniciar-sesion' element={ <LoginPage/> } />
          <Route path='/registrarse' element={ <RegisterPage/> } />
          <Route path='/mi-perfil/:id' element={ <Profile/> } />

          // lecciones
          <Route path='/' element={ <ProtectedRoute><Home/></ProtectedRoute> } />
          <Route path='/lecciones/:id' element={ <ProtectedRoute><Lesson/></ProtectedRoute> } />
          
          // calendario
          <Route path='/calendario' element={ <AstronomicalCalendar/> } />
          <Route path='/evento/:slug' element={ <EventDetails/> } />
          
          // foro
          <Route path='/foro' element={ <Forum/> } />
          <Route path='/foro/nuevo' element={ <ProtectedRoute><NewPost/></ProtectedRoute> } />
          <Route path='/post/:id' element={ <ProtectedRoute><PostDetail/></ProtectedRoute> } />
      </Routes>
    </>
  )
} 

export default App;