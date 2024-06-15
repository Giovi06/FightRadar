import React from 'react';

const UserCard = ({ user, onSwipe }) => {
    return (
        <div className="user-card">
            <img src={user.image} alt={user.name} />
            <h2>{user.name}, {user.age}</h2>
            <button onClick={() => onSwipe(user.id)}>Swipe</button>
        </div>
    );
};

export default UserCard;
