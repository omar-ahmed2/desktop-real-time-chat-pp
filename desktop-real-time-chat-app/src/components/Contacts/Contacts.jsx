import React, { useState } from "react";
import "./Contacts.css";
import Sidebar from "../Chat/Sidebar/Sidebar";

const Contacts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestionSearchQuery, setSuggestionSearchQuery] = useState("");
  const [addedFriends, setAddedFriends] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);

  const [friends, setFriends] = useState([
    {
      id: 1,
      name: "Omar Ahmed",
      email: "omar@gmail.com",
      online: true,
      avatar: "/images/Omar Ahmed.png",
    },
    {
      id: 2,
      name: "Kareem Hassan",
      email: "kareemh@gmail.com",
      online: true,
      avatar: "/images/Kareem.png",
    },
    {
      id: 3,
      name: "Amir Wagdy",
      email: "amir@gmail.com",
      online: true,
      avatar: "/images/amir.png",
    },
    {
      id: 4,
      name: "Moataz Tamer",
      email: "moataz@gmail.com",
      online: false,
      avatar: "/images/moataz.png",
    },
  ]);

  const [suggestions, setSuggestions] = useState([
    {
      id: 101,
      name: "Mohamed Ali",
      email: "mohamed@gmail.com",
      mutualFriends: 3,
      avatar: "/images/mohamed ali.png",
    },
    {
      id: 102,
      name: "Ramez Ahmed",
      email: "ramez@gmail.com",
      mutualFriends: 2,
      avatar: "/images/ramez.png",
    },
    {
      id: 103,
      name: "Mohamed Sami",
      email: "mohamed@gmail.com",
      mutualFriends: 5,
      avatar: "/images/mohamed sami.png",
    },
    {
      id: 104,
      name: "Mariem Omar",
      email: "mariem@gmail.com",
      mutualFriends: 1,
      avatar: "/images/mariem.png",
    },
  ]);

  const handleAddFriend = (personId) => {
    if (addedFriends.includes(personId)) {
      setAddedFriends(addedFriends.filter((id) => id !== personId));
    } else {
      setAddedFriends([...addedFriends, personId]);
    }
  };

  const handleMenuClick = (friendId) => {
    setMenuOpen(menuOpen === friendId ? null : friendId);
  };

  const handleMenuAction = (action, friendId) => {
    switch (action) {
      case "remove":
        setFriends(friends.filter((friend) => friend.id !== friendId));
        break;
      case "voice":
        console.log(`Initiating voice call with friend ${friendId}`);
        break;
      case "video":
        console.log(`Initiating video call with friend ${friendId}`);
        break;
      default:
        break;
    }
    setMenuOpen(null);
  };

  const filteredFriends = searchQuery
    ? friends.filter(
        (friend) =>
          friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          friend.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : friends;

  const filteredSuggestions = suggestionSearchQuery
    ? suggestions.filter(
        (person) =>
          person.name
            .toLowerCase()
            .includes(suggestionSearchQuery.toLowerCase()) ||
          person.email
            .toLowerCase()
            .includes(suggestionSearchQuery.toLowerCase())
      )
    : suggestions;

  const getInitials = (name) => {
    return name.split(" ")[0][0].toUpperCase();
  };

  const getAvatarColor = (id) => {
    const colors = [
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#009688",
      "#ff5722",
      "#795548",
    ];
    return colors[id % colors.length];
  };

  return (
    <div className="contacts-page">
      <div className="contacts-main-card">
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
              <h2>
                <span className="contact-icon" style={{ color: "#5e35b1" }}>
                  👫
                </span>{" "}
                Friends List
              </h2>
              <span className="friends-count">{friends.length} friends</span>
            </div>

            <div className="friends-list">
              {filteredFriends.map((friend) => (
                <div key={friend.id} className="friend-card">
                  <div className="avatar">
                    {friend.avatar ? (
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="friend-avatar"
                      />
                    ) : (
                      <span
                        style={{ backgroundColor: getAvatarColor(friend.id) }}
                      >
                        {getInitials(friend.name)}
                      </span>
                    )}
                    {friend.online && (
                      <span className="online-indicator"></span>
                    )}
                  </div>
                  <div className="friend-info">
                    <h3 className="friend-name">{friend.name}</h3>
                    <p className="friend-email">{friend.email}</p>
                    {friend.online ? (
                      <p className="status online">Online</p>
                    ) : (
                      <p className="status offline">Offline</p>
                    )}
                  </div>
                  <div className="friend-actions">
                    <button className="message-btn">Message</button>
                    <button
                      className="menu-btn"
                      onClick={() => handleMenuClick(friend.id)}
                    >
                      ⋮
                    </button>
                    {menuOpen === friend.id && (
                      <div className="friend-menu">
                        <button
                          onClick={() => handleMenuAction("remove", friend.id)}
                        >
                          Remove Friend
                        </button>
                        <button
                          onClick={() => handleMenuAction("voice", friend.id)}
                        >
                          Voice Call
                        </button>
                        <button
                          onClick={() => handleMenuAction("video", friend.id)}
                        >
                          Video Call
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
              
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search suggestions..."
              value={suggestionSearchQuery}
              onChange={(e) => setSuggestionSearchQuery(e.target.value)}
            />
          </div>
           <h2 className="add-friends">
              <span className="contact-icon" style={{ color: "#5e35b1" }}>
                👥
              </span>
              Add New Friends
            </h2>

          <div className="suggestions-list">
            {filteredSuggestions.map((person) => (
              <div key={person.id} className="suggestion-card">
                <div className="avatar">
                  {person.avatar ? (
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="suggestion-avatar"
                    />
                  ) : (
                    <span
                      style={{ backgroundColor: getAvatarColor(person.id) }}
                    >
                      {getInitials(person.name)}
                    </span>
                  )}
                </div>
                <div className="friend-info">
                  <h3 className="friend-name">{person.name}</h3>
                  <p className="friend-email">{person.email}</p>
                  <p className="mutual-friends">
                    {person.mutualFriends} mutual friends
                  </p>
                </div>
                <button
                  className={`add-friend-btn ${
                    addedFriends.includes(person.id) ? "added" : ""
                  }`}
                  onClick={() => handleAddFriend(person.id)}
                >
                  {addedFriends.includes(person.id) ? (
                    <>
                      <span className="checkmark">✓</span> Done
                    </>
                  ) : (
                    "Add Friend"
                  )}
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
