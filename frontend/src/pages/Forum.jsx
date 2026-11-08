import './Forum.css';
import Navbar from '../components/common/Navbar';
import ForumFilter from '../components/forum/ForumFilter.jsx';
import ForumPost from '../components/forum/ForumPost.jsx';
import { currentUser } from '../mocks/users.js'
import { posts as initialPosts } from '../mocks/posts.js';
import { useEffect, useState } from 'react';

function Forum() {
    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem('posts');
        return saved ? JSON.parse(saved) : initialPosts;
    });

    const [category, setCategory] = useState('Todo');
    const categories = [
        'Todo',
        'Preguntas',
        'Observaciones', 
        'Astrofotografía', 
        'Charlas'
    ]

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    const toggleLike = (postId) => {
        setPosts(posts.map(post => 
            post._id !== postId ? post : {
                ...post,
                likes: post.likes.includes(currentUser._id) 
                ? post.likes.filter(id => id !== currentUser._id)
                : [...post.likes, currentUser._id]
            }
        ));
    }

    const visiblePosts = category === 'Todo' ? posts : posts.filter(post => post.category === category);

    return (
        <>
            <main className="main-container container-animation">
                <h1 className="title">Foro de la comunidad</h1>
                <ForumFilter categories={ categories } selected={ category } onSelect={ setCategory } />
                { visiblePosts.map(post => (
                    <ForumPost key={ post._id } post={ post } onToggleLike={ toggleLike }/>
                ))}
            </main>
            <Navbar />
        </>
    )
}

export default Forum;