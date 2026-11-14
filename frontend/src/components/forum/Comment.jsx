import './Comment.css';
import { timeAgo } from '../../utils/timeAgo';

function Comment({ comment }) {
    const { author } = comment;

    return (
        <div className='comment'>
            { author?.profileImg
                ? <img src={ author.profileImg } alt={ `Avatar ${ author.name }` } className='comment--avatar' />
                : <div className='comment--avatar'></div> }
            <div className='comment--content'>
                <div className='comment--header'>
                    <p className='text-bold text-small'>{ author?.name ?? 'Usuario eliminado' }</p>
                    { author?.level && <p className='pill-box text-small'>{ author.level.name }</p> }
                </div>
                <p className='text-soft'>{ comment.body }</p>
                <p className='text-end text-muted text-small'>{ timeAgo(comment.createdAt) }</p>
            </div>
        </div>
    );
}

export default Comment;