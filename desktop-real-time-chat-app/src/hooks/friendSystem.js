export const sendFriendRequest = async (userId, friendId) => {
  const token = sessionStorage.getItem('token');

  try {
    const res = await fetch('http://localhost:3000/api/sendfriend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, friendId }), // Sending the userId and friendId in the body
    });

    if (!res.ok) {
      throw new Error('Failed to send friend request');
    }
    const data = await res.json();
    return data; 

  } catch (err) {
    console.error(err);
  }
};
export const removeFriend = async (userId, friendId) => {
  const token = sessionStorage.getItem('token');

  try {
    const res = await fetch('http://localhost:3000/api/removefriend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, friendId }), // Sending the userId and friendId in the body
    });

    if (!res.ok) {
      throw new Error('Failed to remove friend');
    }
    const data = await res.json();
    return data; 

  } catch (err) {
    console.error(err);
  }
};