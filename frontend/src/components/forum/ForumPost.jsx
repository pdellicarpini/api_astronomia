import './ForumPost.css';
import { users, currentUser } from '../../mocks/users'; 

function ForumPost({ post, onToggleLike }) {
    const author = users.find(user => user._id === post.authorId)
    if (!author) return null;

    const liked = post.likes.includes(currentUser._id)
    
    return (
        <div className="card">
            <div className='forum-user'>
                <div className='forum-user--info'>
                    {author.profileImg ? <img src={author.profileImg} alt={`Avatar ${author.name}`} className='profile-img' /> : <div className="avatar-placeholder"> </div>}
                    <p className='text-bold'>{author.name}</p>
                    <p className='pill-box text-small'>{author.level}</p>
                </div>
                <p className='text-info text-small'>{ post.category }</p>
                <h2 className='subtitle'>{ post.title }</h2>
                <p className='text-soft'>{ post.body }</p>
            </div>
            <div className='forum-comment'>
                Agregar comentario...
            </div>
            <div className='forum-interactions d-flex text-small gap-5'>
                <button className='d-flex gap-2 text-soft' onClick={ () => onToggleLike(post._id) } aria-label='Me gusta'>
                    <i className={`bi ${ liked ? 'bi-heart-fill' : 'bi-heart' } text-orange`}></i>
                    <span>{ post.likes.length }</span>
                </button>
                <p className='d-flex gap-2 text-soft'>
                    <i className="bi bi-chat text-info"></i>
                    <span>{ post.comments.length }</span>
                </p>
                <p className='text-muted text-small'>Hace 2 hs</p>
            </div>
        </div>
    )
}

export default ForumPost;