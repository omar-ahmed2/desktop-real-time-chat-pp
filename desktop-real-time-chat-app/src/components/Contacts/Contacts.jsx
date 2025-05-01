import React, { useState } from 'react';
import './Contacts.css';
import Sidebar from '../Chat/Sidebar/Sidebar';

const Contacts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [addedFriends, setAddedFriends] = useState([]);
  
  const [friends, setFriends] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', online: true, avatar: '/profile1.jpg' },
    { id: 2, name: 'Sarah Parker', email: 'sarah@example.com', online: false, avatar: '/profile2.jpg' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', online: true, avatar: '/profile3.jpg' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', online: false, avatar: '/profile4.jpg' }
  ]);

  const [suggestions, setSuggestions] = useState([
    { id: 101, name: 'Thomas Anderson', email: 'thomas@example.com', mutualFriends: 3 },
    { id: 102, name: 'Lisa Campbell', email: 'lisa.c@example.com', mutualFriends: 2 },
    { id: 103, name: 'James Wilson', email: 'james@example.com', mutualFriends: 5 },
    { id: 104, name: 'Emma Thompson', email: 'emma@example.com', mutualFriends: 1 }
  ]);
  
  const handleAddFriend = (personId) => {
    if (addedFriends.includes(personId)) {
      // Remove from added friends if already added
      setAddedFriends(addedFriends.filter(id => id !== personId));
    } else {
      // Add to added friends
      setAddedFriends([...addedFriends, personId]);
    }
  };

  const filteredFriends = searchQuery 
    ? friends.filter(friend => 
        friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        friend.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : friends;
  
  // Helper function to get initials from name
  const getInitials = (name) => {
    return name.split(' ')[0][0].toUpperCase();
  };

  const getAvatarColor = (id) => {
    const colors = ['#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#009688', '#ff5722', '#795548'];
    return colors[id % colors.length];
  };

  return (
    <div className="contacts-page">
      <Sidebar />
      <div className="contacts-container">
        <div className="search-container">
          <input 
            type="text" 
            className="search-input"
            placeholder="Search contacts..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="contacts-section">
          <div className="section-header">
            <h2><span className="contact-icon" style={{ color: '#5e35b1' }}>👫</span> Friends List</h2>
            <span className="friends-count">{friends.length} friends</span>
          </div>
          
          <div className="friends-list">
            {filteredFriends.map(friend => (
              <div key={friend.id} className="friend-card">
                <div className="avatar" style={{backgroundColor: getAvatarColor(friend.id)}}>
                  <span>{getInitials(friend.name)}</span>
                  {friend.online && <span className="online-indicator"></span>}
                </div>
                <div className="friend-info">
                  <h3 className="friend-name">{friend.name}</h3>
                  <p className="friend-email">{friend.email}</p>
                  {friend.online ? 
                    <p className="status online">Online</p> : 
                    <p className="status offline">Offline</p>
                  }
                </div>
                <button className="message-btn">Message</button>
              </div>
            ))}
          </div>
        </div>

        <div className="contacts-section">
          <div className="section-header">
            <h2><span className="contact-icon" style={{ color: '#5e35b1' }}>👥</span> People You May Know</h2>
            <span className="friends-count">{suggestions.length} people</span>
          </div>
          
          <div className="suggestions-list">
            {suggestions.map(person => (
              <div key={person.id} className="suggestion-card">
                <div className="avatar" style={{backgroundColor: getAvatarColor(person.id)}}>
                  <span>{getInitials(person.name)}</span>
                </div>
                <div className="friend-info">
                  <h3 className="friend-name">{person.name}</h3>
                  <p className="friend-email">{person.email}</p>
                  <p className="mutual-friends">{person.mutualFriends} mutual friends</p>
                </div>
                <button 
                  className={`add-friend-btn ${addedFriends.includes(person.id) ? 'added' : ''}`}
                  onClick={() => handleAddFriend(person.id)}
                >
                  {addedFriends.includes(person.id) ? <><span className="checkmark">✓</span> Done</> : 'Add Friend'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
