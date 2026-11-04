// import Levels from './pages/Levels';
// import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import Register from './pages/Register';
import Calendar from './pages/Calendar';

function App() {
  return (
    <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/lessons/:id' element={ <Lesson/> } />
        <Route path='/register' element={ <Register/> } />
        <Route path='/calendar' element={ <Calendar/> } />
    </Routes>
  )
} 

export default App;