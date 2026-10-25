import LessonCard from '../components/home/LessonCard.jsx';
import ProfileHeader from '../components/home/ProfileHeader.jsx';
import LevelsCard from '../components/home/LevelsCard.jsx';
import StreakBadge from '../components/home/StreakBadge.jsx';
import { lessons } from '../mocks/lessons.js';
import { currentUser } from '../mocks/users.js';
import { levels } from '../mocks/levels.js';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    function handleStart(lessonId) {
        navigate(`/lessons/${lessonId}`);
    }

    const currentLevel = levels.find(level => level.name === currentUser.level);

    return (
        <main>
                <header className='user-header'>
                    <ProfileHeader 
                        avatar={ currentUser.profileImg }
                        username={ currentUser.name }
                        level={ currentUser.level }
                    />
                    <StreakBadge 
                        streak={ currentUser.streak }
                    />
                </header>

                <LevelsCard currentLevel={ currentLevel } levels={ levels }/>
                
                <section className='lessons-section'>
                    <p>Repasá las lecciones completadas volviendo a tomarlas ¡A seguir practicando!</p>
                    { lessons.map ( lesson => (
                        <LessonCard 
                            key={ lesson._id }
                            lesson={ lesson }
                            status={ lesson.status }
                            onStart={ handleStart }
                        />
                    ))}
                </section>
        </main>
    )
}

export default Home;