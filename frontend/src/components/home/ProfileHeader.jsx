function ProfileHeader({ avatar, username, level }) {
    return (
        <div className="profile-header">
            { avatar ? <img src={ avatar } alt={`Avatar ${username}`}/> : <div className="avatar-placeholder"> </div>}
            <div>
                <p>¡Hola, { username }!</p>
                <p className="user-level">{ level }</p>
            </div>
        </div>
    )
}

export default ProfileHeader;