import './Forum.css';
import api from '../services/api.js';
import Navbar from '../components/common/Navbar';
import ForumFilter from '../components/forum/ForumFilter.jsx';
import ForumPost from '../components/forum/ForumPost.jsx';
import LoginPrompt from '../components/common/LoginPrompt.jsx';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

function Forum() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState('Todo');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [promptMessage, setPromptMessage] = useState('');

    useEffect(() => {
        async function loadPosts() {
            try {
                const { data } = await api.get('/posts');
                setPosts(data.data.posts);
            } catch (err) {
                setError('No se pudieron cargar las publicaciones.');
            } finally {
                setLoading(false);
            }
        }

        loadPosts();
    }, []);

    function requireLogin(message) {
        setPromptMessage(message);
    }

    function handlePostDetails(postId) {
        navigate(`/post/${postId}`);
    }

    async function toggleLike(postId) {
        if (!user) return requireLogin('Iniciá sesión para dar me gusta.');

        try {
            const { data } = await api.post(`/posts/${postId}/like`);
            setPosts(prev => prev.map(post =>
                post._id === postId ? { ...post, likes: data.data.likes } : post
            ));
        } catch (err) {
            setError('No se pudo actualizar el like.');
        }
    }

    const visiblePosts = category === 'Todo' ? posts : posts.filter(post => post.category === category);

    return (
        <>
            <main className="main-container container-animation">
                <h1 className="title">Foro de la comunidad</h1>
                <ForumFilter selected={category} onSelect={setCategory} />
                <Link to='/foro/nuevo' className='main-button'>
                    <i className='bi bi-plus-lg'></i> Nuevo post
                </Link>

                {loading && !error && visiblePosts.length === 0 && (
                    <p className='text-soft'>Todavía no hay publicaciones en esta categoría.</p>
                )}

                {visiblePosts.map(post => (
                    <ForumPost key={post._id} post={post} onToggleLike={toggleLike} onClick={handlePostDetails}/>
                ))}
                {promptMessage && (
                    <LoginPrompt message={promptMessage} onClose={() => setPromptMessage('')} />
                )}
            </main>
            <Navbar />
        </>
    )
}

export default Forum;