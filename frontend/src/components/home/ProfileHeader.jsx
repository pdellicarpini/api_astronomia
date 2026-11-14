function ProfileHeader({ user, onClick }) {
    return (
        <div 
            className="profile-header pill-box" 
            role="button" tabIndex="0"  
            onClick={ () => onClick( user._id )} 
        >
            { user.profileImg ? <img src={ `${import.meta.env.VITE_UPLOADS_URL}/${user.profileImg}` } alt={`Avatar ${ user.name }`} className="profile-img"/> : <div className="avatar-placeholder"> </div>}
            <div>
                <p>¡Hola, { user.name }!</p>
                <p className="user-level text-orange">{ user.level.name }</p>
            </div>
        </div>
    )
}

export default ProfileHeader;