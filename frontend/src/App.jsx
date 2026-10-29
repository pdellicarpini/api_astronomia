// import Levels from './pages/Levels';
// import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/lessons/:id' element={ <Lesson/> } />
        <Route path='/register' element={ <Register/> } />
    </Routes>
  )
} 

export default App;