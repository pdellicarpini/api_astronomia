import './ForumPost.css';
import { useAuth } from '../../context/AuthContext';
import { timeAgo } from '../../utils/timeAgo';
import { useEffect } from 'react';


const categoryClass = {
    Preguntas: 'text-info',
    Observaciones: 'text-green',
    Astrofotografía: 'text-orange',
    Charlas: 'text-gold'
}

function ForumPost({ post, onToggleLike }) {
    const { user } = useAuth();
    const { author } = post;
    const liked = user ? post.likes.includes(user.id) : false;

    console.log('Autor:', author);
    console.log('Nivel:', author?.level);
    return (
        <div className="card">
            <div className='forum-user'>
                <div className='forum-user--info'>
                    {author?.profileImg ? <img src={author.profileImg} alt={`Avatar ${author.name}`} className='profile-img' /> : <div className="avatar-placeholder"> </div>}
                    <p className='text-bold'>{author?.name ?? 'Usuario eliminado'}</p>
                    {author?.level && (
                        <p className='pill-box text-small'>{author.level.name}</p>
                    )}
                </div>
                <p className={`${categoryClass[post.category]} text-small`}>{post.category}</p>
                <h2 className='subtitle'>{post.title}</h2>
                <p className='text-soft'>{post.body}</p>
            </div>
            <div className='forum-comment'>
                Agregar comentario...
            </div>
            <div className='forum-interactions d-flex text-small gap-5'>
                <button
                    className='d-flex gap-2 text-soft'
                    onClick={() => onToggleLike(post._id)}
                    aria-label='Me gusta'
                >
                    <i className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'} text-orange`}></i>
                    <span>{post.likes.length}</span>
                </button>
                <p className='d-flex gap-2 text-soft'>
                    <i className="bi bi-chat text-info"></i>
                    <span>{post.comments.length}</span>
                </p>
                <p className='text-muted text-small'>{timeAgo(post.createdAt)}</p>
            </div>
        </div>
    )
}

export default ForumPost;