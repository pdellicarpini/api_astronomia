import LessonCard from '../components/home/LessonCard.jsx';
import ProfileHeader from '../components/home/ProfileHeader.jsx';
import LevelsCard from '../components/home/LevelsCard.jsx';
import StreakBadge from '../components/home/StreakBadge.jsx';
import Navbar from '../components/common/Navbar.jsx';
import Loader from '../components/common/Loader.jsx';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHome } from '../services/homeService.js';
import { useAuth } from '../context/AuthContext.jsx';

function Home() {
    const navigate = useNavigate();
    const pathRef = useRef(null);
    const [home, setHome] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        getHome().then(setHome).catch(err => setError(err.message));
    }, []);

    const lessons = home?.lessons ?? [];
    const currentId = lessons.find(lesson => lesson.status.current)?._id;

    useEffect(() => {
        const current = pathRef.current?.querySelector('[aria-current="step"]');
        if (!current) return;

        const { top, bottom } = current.getBoundingClientRect();
        const isVisible = top >= 0 && bottom <= window.innerHeight;
        if (!isVisible) current.scrollIntoView({ block: 'center' });
    }, [currentId]);

    // handlers

    function handleStart(lessonId) {
        navigate(`/lecciones/${lessonId}`);
    }

    function handleProfileDetails(userId) {
        navigate(`/mi-perfil/${userId}`);
    }

    if (error) {
        return (
            <main className='main-container'>
                <p className='text'>{error}</p>
            </main>
        )
    }

    if (!home) return <Loader />

    const { user, levels } = home;
    const completedCount = lessons.filter(lesson => lesson.status === 'completed').length;

    return (
        <>
            <main className='main-container container-animation'>
                <header className='user-header'>
                    <ProfileHeader
                        user={user}
                        onClick={handleProfileDetails}
                    />
                    <StreakBadge
                        streak={user.streak.current}
                    />
                </header>

                <LevelsCard
                    currentLevel={user.level}
                    levels={levels}
                    completed={completedCount}
                    total={lessons.length}
                />

                <ol className='path' ref={pathRef} aria-label='Lecciones del nivel'>
                    {lessons.map((lesson, i) => (
                        <LessonCard
                            key={lesson._id}
                            lesson={lesson}
                            status={lesson.status}
                            previusStatus={lessons[i - 1]?.status}
                            isLast={i === lessons.length - 1}
                            onStart={handleStart}
                        />
                    ))}

                    <li className='step step--last step--soon'>
                        <div className='step__node icon-circle icon-circle--locked'>
                            <i className='bi bi-rocket-takeoff'></i>
                        </div>
                        <div className='step__body'>
                            <p className='text text-muted soon-text'>El viaje continúa: más lecciones en camino...</p>
                        </div>
                    </li>
                </ol>

            </main>
            <Navbar />
        </>
    )
}

export default Home;