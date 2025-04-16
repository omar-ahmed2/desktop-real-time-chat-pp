import React, { useState } from "react";
import "./SettingsProfile.css";
import { FaUserCircle, FaPhone, FaEdit, FaSignOutAlt } from "react-icons/fa";

const SettingsProfile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("John Doe");
  const [status, setStatus] = useState("Hey there! I am using WhatsApp.");
  const [phone, setPhone] = useState("+1234567890");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file)); // عرض الصورة التي تم تحميلها
    }
  };

  return (
    <div className="profile-settings">
      <div className="profile-header">
        <div className="profile-pic">
          {profilePic ? (
            <img src={profilePic} alt="Profile" />
          ) : (
            <FaUserCircle size={100} />
          )}
          <input
            type="file"
            accept="image/*"
            id="upload-photo"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <label htmlFor="upload-photo" className="change-img-label">
            Change Image
          </label>
        </div>
        <h3>{name}</h3>
        <p>{status}</p>
      </div>

      <div className="profile-fields">
        <div className="field">
          <label>Name</label>
          <div className="editable-field">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            
          </div>
        </div>

        <div className="field">
          <label>Status</label>
          <div className="editable-field">
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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

        <button className="logout-btn">
          <FaSignOutAlt /> Log Out
        </button>
      </div>
    </div>
  );
};

export default SettingsProfile;
