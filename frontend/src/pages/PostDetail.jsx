import './PostDetail.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import ForumPost from '../components/forum/ForumPost';
import Comment from '../components/forum/Comment';
import LoginPrompt from '../components/common/LoginPrompt';
import Loader from '../components/common/Loader';
import { useAuth } from '../context/AuthContext';
import { getPostById, toggleLike, addComment } from '../services/postService';

const commentMax = 1000;

function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [post, setPost] = useState(null);
    const [error, setError] = useState('');
    const [body, setBody] = useState('');
    const [sending, setSending] = useState(false);
    const [actionError, setActionError] = useState('');
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        setPost(null);
        setError('');
        getPostById(id)
            .then(setPost)
            .catch(err => setError(err.message));
    }, [id]);

    async function handleLike(postId) {
        if (!user) return setShowLogin(true);

        try {
            const likes = await toggleLike(postId);
            setPost(prev => ({ ...prev, likes }));
        } catch (err) {
            setActionError(err.message);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!user) return setShowLogin(true);
        if (!body.trim() || sending) return;

        setSending(true);
        setActionError('');

        try {
            const comments = await addComment(post._id, body);
            setPost(prev => ({ ...prev, comments }));
            setBody('');
        } catch (err) {
            setActionError(err.message);
        } finally {
            setSending(false);
        }
    }

    if (error) {
        return (
            <main className='main-container post-detail'>
                <p className='text'>{error}</p>
                <button className='main-button' onClick={() => navigate('/foro')}>Volver al foro</button>
            </main>
        );
    }

    if (!post) return <Loader />;

    return (
        <>
            <main className="main-container post-detail">
                <header className='post-detail--header'>
                    <button aria-label='Volver' className='chevron-button' onClick={() => navigate('/foro')}>
                        <i className='bi bi-chevron-left'></i>
                    </button>
                    <h1 className='subtitle'>Post</h1>
                </header>

                <ForumPost post={post} onToggleLike={handleLike} isDetail />

                <section className="comments">
                    <h3 className='comments--title'>Comentarios · {post.comments.length}</h3>
                    {post.comments.length === 0
                        ? <p className='text-soft'>Todavía no hay comentarios. ¡Sé la primera persona en comentar!</p>
                        : post.comments.map(comment => <Comment key={comment._id} comment={comment} />)
                    }
                </section>

                {actionError && <p className='text' role='alert'>{actionError}</p>}
            </main>
            <form className='composer' aria-label='Agregar comentario' onSubmit={handleSubmit}>
                <div className='comment--avatar'></div>
                <textarea
                    className='composer--input'
                    placeholder={user ? 'Agregar comentario...' : 'Iniciá sesión para comentar'}
                    aria-label='Escribí tu comentario'
                    rows='1'
                    value={body}
                    maxLength={commentMax}
                    readOnly={!user}
                    onFocus={() => { if (!user) setShowLogin(true); }}
                    onChange={e => setBody(e.target.value)}
                ></textarea>
                <button
                    className='composer--send'
                    type='submit'
                    aria-label='Enviar comentario'
                    disabled={!body.trim() || sending}
                >
                    <i className='bi bi-send'></i>
                </button>
            </form>

            {showLogin && (
                <LoginPrompt message='Iniciá sesión para participar.' onClose={() => setShowLogin(false)} />
            )}
            <Navbar />
        </>
    );
}

export default PostDetail;