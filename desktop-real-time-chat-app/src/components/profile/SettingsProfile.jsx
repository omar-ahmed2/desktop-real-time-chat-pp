import React, { useState } from "react";
import "./SettingsProfile.css";
import { FaUserCircle, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import AuthContext from "../../authContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const SettingsProfile = () => {
  const { logout, user ,setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(user?.avatar || null);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone || "");

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image file (JPEG, PNG, or GIF)");
        return;
      }

      // Optional: Show preview immediately
      setProfilePic(URL.createObjectURL(file));

      // Prepare form data
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch("http://localhost:3000/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      const ts = Date.now();
      const newUrl = `http://localhost:3000${data.avatar}?t=${ts}`;

      // immediate preview + global state update
      setProfilePic(newUrl);
      setUser((u) => ({ ...u, avatar: newUrl }));
    }
  };
const handleSave = async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("You must be logged in");
      return;
    }
    const body = {
      userFirstName: firstName,
      userLastName: lastName,
      userEmail: email,  // if your API supports updating status
      userPhone: phone,
    };

    const res = await fetch("http://localhost:3000/auth/edituser", {
      method: "POST", // or POST depending on your API
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert("Failed to save changes: " + errorData.message);
      return;
    }

    const data = await res.json();

    // Optionally update global user state with latest data:
    setUser((u) => ({
      ...u,
      firstName,
      lastName,
      phone,
      avatar: profilePic,
      email, // if you track it globally
    }));

    alert("Changes saved successfully!");
  } catch (error) {
    alert("Error saving changes: " + error.message);
  }
};
  const handleRemovePhoto = () => {
    setProfilePic(null);
  };

  const handleBackToChat = () => {
    navigate("/chat");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="profile-settings">
      <button className="back-button" onClick={handleBackToChat}>
        <FaArrowLeft /> Back to Chat
      </button>
      <div className="profile-header">
        <div className="profile-pic">
          {profilePic ? (
            <img src={profilePic} alt="Profile" />
          ) : (
            <FaUserCircle size={100} />
          )}
        </div>
        <div className="photo-buttons">
          <input
            type="file"
            accept="image/*"
            id="upload-photo"
            onChange={handleImageChange}
            style={{ display: "none" }}
            className="upload-photo"
          />
          <label htmlFor="upload-photo" className="btn change-btn">
            Change Photo
          </label>
          <button onClick={handleRemovePhoto} className="btn remove-btn">
            Remove Photo
          </button>
        </div>
        <h3>
          {firstName} {lastName}
        </h3>
        <p>{email}</p>
      </div>

      <div className="profile-fields">
        <div className="field name-fields-row">
          <div className="field">
            <label>First Name</label>
            <div className="editable-field">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label>Last Name</label>
            <div className="editable-field">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="field">
          <label>Email</label>
          <div className="editable-field">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label>Phone</label>
          <div className="editable-field">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Log Out
        </button>
      </div>
    </div>
  );
};

export default SettingsProfile;
