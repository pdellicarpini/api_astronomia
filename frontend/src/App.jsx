// import Levels from './pages/Levels';
// import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lesson from './pages/Lesson';

function App() {
  return (
    <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/lessons/:id' element={ <Lesson/> } />
    </Routes>
  )
} 

export default App;