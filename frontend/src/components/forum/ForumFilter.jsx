import './ForumFilter.css';

function ForumFilter({ categories, selected, onSelect }) {
    return (
        <ul className='forum-filter'>
            { categories.map(category => (
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