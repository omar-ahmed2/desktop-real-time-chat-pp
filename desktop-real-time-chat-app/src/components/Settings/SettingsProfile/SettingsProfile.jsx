import React, { useState } from "react";
import "./SettingsProfile.css";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import AuthContext from "../../../authContext.jsx";
import { useContext } from "react";
const SettingsProfile = () => {
  const { logout , user} = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState(user.avatar);
  const [name, setName] = useState(`${user.firstName} ${user.lastName}`);
  const [status, setStatus] = useState("Hey there! I am using WhatsApp.");
  const [phone, setPhone] = useState(user.phone);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = () => {
    setProfilePic(null);
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
        </div>
        <div className="photo-buttons">
          <input
            type="file"
            accept="image/*"
            id="upload-photo"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <label htmlFor="upload-photo" className="btn change-btn">
            Change Photo
          </label>
          <button onClick={handleRemovePhoto} className="btn remove-btn">
            Remove Photo
          </button>
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

        <button className="logout-btn" onClick={logout}>
          <FaSignOutAlt /> Log Out
        </button>
      </div>
    </div>
  );
};

export default SettingsProfile;
