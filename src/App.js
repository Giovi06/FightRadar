import React, { useState } from 'react';
import UserCard from './UserCard';

const App = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Anna', age: 25, image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Ben', age: 27, image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Clara', age: 22, image: 'https://via.placeholder.com/150' }
    ]);

    const handleSwipe = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div className="app">
            <h1>Tinder Clone</h1>
            <div className="card-container">
                {users.map(user => (
                    <UserCard key={user.id} user={user} onSwipe={handleSwipe} />
                ))}
            </div>
        </div>
    );
};

export default App;
