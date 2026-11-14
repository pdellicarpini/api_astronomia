import './ForumFilter.css';
import { forumCategories } from '../../constants/forumCategories.js';

function ForumFilter({ selected, onSelect }) {
    return (
        <ul className='forum-filter'>
            { forumCategories.map(category => (
                <li key={ category }>
                    <button 
                        onClick={ () => onSelect(category)}
                        className={`pill-box ${ category === selected ? 'active' : ''}`} 
                    >
                        { category }
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default ForumFilter