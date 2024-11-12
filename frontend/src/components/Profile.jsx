import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            const response = await fetch('/api/profile', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            }
        }
        fetchProfile();
    }, []);

    return (
        <div>
            {user && (
                <>
                    <img src={user.photo} alt={user.name} className="h-20 w-20 rounded-full" />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </>
            )}
        </div>
    );
};
export default Profile;
