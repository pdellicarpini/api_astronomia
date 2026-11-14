import './NewPost.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/postService.js';
import { forumCategories } from '../constants/forumCategories';

const titleMax = 100;
const bodyMax = 2000;

function NewPost() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [body, setBody] = useState('');
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');
    const postCategories = forumCategories.filter(category => category !== 'Todo');

    const canSubmit = Boolean(title.trim() && category && body.trim()) && !sending;

    async function handleSubmit(event) {
        event.preventDefault();
        if (!canSubmit) return;

        setSending(true);
        setError('');

        try {
            await createPost({ title, category, body });
            navigate('/foro');
        } catch (err) {
            setError(err.message);
            setSending(false);
        }
    }

    return (
        <main className='container-animation new-post-container'>
            <header className='d-flex align-items-center gap-5'>
                <button
                    onClick={() => navigate(-1)} aria-label='Volver' className='chevron-button'
                >
                    <i className='bi bi-chevron-left'></i>
                </button>
                <h1 className='title'>Nuevo post</h1>
            </header>

            <form onSubmit={handleSubmit} className='new-post--form'>
                <fieldset className='post--categories'>
                    <legend className='label text-soft'>Categoría</legend>
                    <div className='new-post--chips'>
                        {postCategories.map(item => (
                            <button
                                type='button'
                                key={item}
                                aria-pressed={category === item}
                                className='post-chip'
                                onClick={() => setCategory(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </fieldset>

                <div className='card new-post--field'>
                    <label htmlFor='post-title' className='label'>Título</label>
                    <input
                        id='post-title'
                        type='text'
                        value={title}
                        maxLength={titleMax}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <p className='text-small text-soft align-self-end'>{title.length}/{titleMax}</p>
                </div>

                <div className='card new-post--field field--grow'>
                    <label htmlFor='post-body' className='label'>Texto</label>
                    <textarea
                        id='post-body'
                        rows={8}
                        value={body}
                        maxLength={bodyMax}
                        onChange={e => setBody(e.target.value)}
                    />
                    <p className='text-small text-soft align-self-end'>{body.length}/{bodyMax}</p>
                </div>

                {error && <p className='text' role='alert'>{error}</p>}

                <button type='submit' className='main-button' disabled={!canSubmit}>
                    {sending ? 'Publicando...' : 'Publicar'}
                </button>

                <p className='text-small text-muted text-center'>Tu post será visible para toda la comunidad</p>
            </form>
        </main>
    )
}

export default NewPost;