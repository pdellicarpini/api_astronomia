function ProfileHeader({ avatar, username, level }) {
    return (
        <div className="profile-header pill-box">
            { avatar ? <img src={ avatar } alt={`Avatar ${username}`}/> : <div className="avatar-placeholder"> </div>}
            <div>
                <p>¡Hola, { username }!</p>
                <p className="user-level text-orange">{ level }</p>
            </div>
        </div>
    )
}

export default ProfileHeader;