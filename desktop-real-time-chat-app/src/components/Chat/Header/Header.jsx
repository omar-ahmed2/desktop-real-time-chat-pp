import "./Header.css";
import { useEffect } from "react";
import getSocket from "../../../socket";
const Header = ({
  selectedUser,
  onBackClick,
  showBackButton,
  setSelectedUser,
}) => {
  if (!selectedUser) {
    return (
      <div className="chat-header">
        <div className="header-left animate-fade-in">
          <div className="team-info"></div>
        </div>
      </div>
    );
  }
  const socket = getSocket();
  socket.on("user_update", async (updatedUser) => {
    console.log("selected user is being updated");
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return; // no token, can't fetch
      if (selectedUser && selectedUser._id === updatedUser.userId) {
        const res = await fetch(`http://localhost:3000/api/getuser`, {
          method: "POST", // since you need to send a body
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: selectedUser._id }),
        });

        if (!res.ok) {
          console.error("Failed to fetch updated user data");
          return;
        }

        const data = await res.json();

        // Update the selectedUser state with the fresh data
        setSelectedUser(data);
      }
    } catch (error) {
      console.error("Error fetching updated user:", error);
    }
  });

  // Display the user's full name or fallback to username
  const displayName =
    selectedUser.firstName && selectedUser.lastName
      ? `${selectedUser.firstName} ${selectedUser.lastName}`
      : selectedUser.name || "Unknown User";
  return (
    <div className="chat-header">
      {/* Show back button only on mobile when viewing a chat */}
      {showBackButton && (
        <button
          onClick={onBackClick}
          className="back-button animate-fade-in"
          aria-label="Back to chats list"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      <div
        className={`header-left animate-fade-in ${
          showBackButton ? "with-back-button" : ""
        }`}
      >
        <div className="team-info">
          <h2 className="team-name">{displayName}</h2>
          <div className="online-users">
            <div className="avatar-stack">
              {selectedUser.avatar ? (
                <img
                  src={selectedUser.avatar}
                  alt={displayName}
                  className="avatar"
                />
              ) : (
                <div className="avatar-placeholder">
                  {displayName.charAt(0)}
                </div>
              )}
            </div>
            <span
              className={`online-count px-2 py-1 rounded-full text-sm font-medium ${
                selectedUser?.activity
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {selectedUser?.activity ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
