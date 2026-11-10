import api from '../services/api.js';
import LessonCard from '../components/home/LessonCard.jsx';
import ProfileHeader from '../components/home/ProfileHeader.jsx';
import LevelsCard from '../components/home/LevelsCard.jsx';
import StreakBadge from '../components/home/StreakBadge.jsx';
import Navbar from '../components/common/Navbar.jsx';
import { useEffect, useRef, useState } from 'react';
import { lessons } from '../mocks/lessons.js';
import { currentUser } from '../mocks/users.js';
import { levels } from '../mocks/levels.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const pathRef = useRef(null);
    const currentId = lessons.find(lesson => lesson.status === 'current')?._id;
    console.log(user)

    useEffect(() => {
        const current = pathRef.current?.querySelector('[aria-current="step"]');
        if (!current) return;

        const { top, bottom } = current.getBoundingClientRect();
        const isVisible = top >= 0 && bottom <= window.innerHeight;
        if (!isVisible) current.scrollIntoView({ block: 'center' });
    }, [currentId]);

    function handleStart(lessonId) {
        navigate(`/lecciones/${lessonId}`);
    }

    const currentLevel = levels.find(level => level.name === currentUser.level);
    const completedCount = lessons.filter(lesson => lesson.status === 'completed').length;
    const auth = useAuth()
    console.log(auth);
    return (
        <>
            <main className='main-container container-animation'>
                <header className='user-header'>
                    <ProfileHeader
                        avatar={currentUser.profileImg}
                        username={currentUser.name}
                        level={currentUser.level}
                    />
                    <StreakBadge
                        streak={currentUser.streak}
                    />
                </header>

                <LevelsCard
                    currentLevel={currentLevel}
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