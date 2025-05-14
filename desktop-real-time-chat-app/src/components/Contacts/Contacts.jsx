import React, { useState, useEffect, useContext } from "react";
import "./Contacts.css";
import Sidebar from "../Chat/Sidebar/Sidebar";
import { useUsers } from "../../hooks/useUsers";
import { sendFriendRequest, removeFriend } from "../../hooks/useFriendSystem";
import authContext from "../../authContext";
import getSocket from "../../socket"; // Import the socket

const Contacts = () => {
  const { user, addFriend, removeFriendAuth, setUser, fetchUserFromServer } =
    useContext(authContext);
  const { data: users, isloading, error } = useUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestionSearchQuery, setSuggestionSearchQuery] = useState("");
  const [addedFriends, setAddedFriends] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [friends, setFriends] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  
  // Fetch suggestions
  useEffect(() => {
    if (Array.isArray(users) && user?.email) {
      const filtered = users.filter(
        (fuser) =>
          fuser.email !== user.email && !user.friends.includes(fuser._id)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [users, user]);

  // Fetch friends
  useEffect(() => {
    if (Array.isArray(user?.friends) && user.friends.length > 0) {
      if (Array.isArray(users)) {
        const friendsList = users.filter((fuser) =>
          user.friends.includes(fuser._id)
        );
        setFriends(friendsList);
      } else {
        setFriends([]);
      }
    } else {
      setFriends([]);
    }
  }, [users, user]);

  // Define the emitFriendRequestAccepted function
  const emitFriendRequestAccepted = (userId, friendId) => {
    const socket = getSocket();
    // Emit an event to notify the server that a friend request was accepted
    socket.emit('friend_request_accepted', { 
      userId, 
      friendId 
    });
    console.log("Friend request accepted between", userId, "and", friendId);
  };

  // Updated handleAddFriend method
  const handleAddFriend = async (personId) => {
    if (addedFriends.includes(personId)) {
      setAddedFriends(addedFriends.filter((id) => id !== personId));
    } else {
      try {
        const response = await sendFriendRequest(user._id, personId);
        if (response) {
          // Update local state to reflect changes
          if (response.user) {
            setUser(response.user);
            sessionStorage.setItem('user', JSON.stringify(response.user));
            
            // If they became friends immediately (accepting an existing request)
            if (response.user.friends.includes(personId)) {
              addFriend(personId);
              emitFriendRequestAccepted(user._id, personId);
            }
          }
          
          setAddedFriends((prevAddedFriends) => [...prevAddedFriends, personId]);
        }
      } catch (error) {
        console.error("Error adding friend:", error);
      }
    }
  };

  const handleMenuClick = (friendId) => {
    setMenuOpen(menuOpen === friendId ? null : friendId);
  };

  const handleMenuAction = async (action, friendId) => {
    switch (action) {
      case "remove":
        const response = await removeFriend(user._id, friendId);
        if (response && !response.user.friends.includes(response.friend._id)) {
          removeFriendAuth(friendId);
          setUser(response.user);
          sessionStorage.setItem('user', JSON.stringify(response.user));
          
          // Tell the socket about the friend removal
          const socket = getSocket();
          socket.emit('friend_removed', { userId: user._id, friendId });
        }
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
          `${friend.firstName} ${friend.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          friend.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : friends;

  const filteredSuggestions = suggestionSearchQuery
    ? suggestions.filter(
        (person) =>
          `${person.firstName} ${person.lastName}`
            .toLowerCase()
            .includes(suggestionSearchQuery.toLowerCase()) ||
          person.email
            .toLowerCase()
            .includes(suggestionSearchQuery.toLowerCase())
      )
    : suggestions;

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.split(" ");
    return parts[0][0].toUpperCase();
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

  if (isloading || !users || !filteredSuggestions) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users: {error.message}</div>;
  }

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
                <div key={friend._id} className="friend-card">
                  <div className="avatar">
                    {friend.avatar ? (
                      <img
                        src={friend.avatar}
                        alt={`${friend.firstName} ${friend.lastName}`}
                        className="friend-avatar"
                      />
                    ) : (
                      <span
                        style={{ backgroundColor: getAvatarColor(friend._id) }}
                      >
                        {getInitials(`${friend.firstName} ${friend.lastName}`)}
                      </span>
                    )}
                    {friend.online && (
                      <span className="online-indicator"></span>
                    )}
                  </div>
                  <div className="friend-info">
                    <h3 className="friend-name">
                      {`${friend.firstName} ${friend.lastName}`}
                    </h3>
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
                      onClick={() => handleMenuClick(friend._id)}
                    >
                      ⋮
                    </button>
                    {menuOpen === friend._id && (
                      <div className="friend-menu">
                        <button
                          onClick={() => handleMenuAction("remove", friend._id)}
                        >
                          Remove Friend
                        </button>
                        <button
                          onClick={() => handleMenuAction("voice", friend._id)}
                        >
                          Voice Call
                        </button>
                        <button
                          onClick={() => handleMenuAction("video", friend._id)}
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
              <div key={person._id} className="suggestion-card">
                <div className="avatar">
                  {person.avatar ? (
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="suggestion-avatar"
                    />
                  ) : (
                    <span
                      style={{ backgroundColor: getAvatarColor(person._id) }}
                    >
                      {getInitials(`${person.firstName} ${person.lastName}`)}
                    </span>
                  )}
                </div>
                <div className="friend-info">
                  <h3 className="friend-name">{`${person.firstName} ${person.lastName}`}</h3>
                  <p className="friend-email">{person.email}</p>
                  <p className="mutual-friends">
                    {person.mutualFriends || 0} mutual friends
                  </p>
                </div>
                <button
                  className={`add-friend-btn ${
                    addedFriends.includes(person._id) ? "added" : ""
                  }`}
                  onClick={() => handleAddFriend(person._id)}
                >
                  {addedFriends.includes(person._id) ? (
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