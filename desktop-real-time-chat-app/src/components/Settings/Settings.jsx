import React, { useState } from 'react';
import './Settings.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function Settings() {
  const navigate = useNavigate();
  const status = "Available";
  const theme = "light";
  const [profilePicture, setProfilePicture] = useState(null);

  // Handle profile picture change
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="settings-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      <h1 className="settings-title">Settings</h1>

      {/* Profile Settings */}
      <section className="settings-section">
        <h2>Profile Settings</h2>
        <div className="setting-item">
          <label>Profile Picture:</label>
          <div className="profile-picture-container">
            <input type="file" onChange={handleProfilePictureChange} />
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" className="profile-picture" />
            ) : (
              <img src="/images/profile-placeholder.png" alt="Profile" className="profile-picture" />
            )}
          </div>
        </div>
        <div className="setting-item">
          <label>Username:</label>
          <input type="text" defaultValue="user123" className="input-field" />
        </div>
        <div className="setting-item">
          <label>Status (Bio):</label>
          <input type="text" value={status} className="input-field" />
        </div>
        <div className="setting-item">
          <label>Email:</label>
          <input type="email" defaultValue="user@example.com" className="input-field" />
        </div>
        <div className="setting-item">
          <label>Phone Number:</label>
          <input type="text" defaultValue="123-456-7890" className="input-field" />
        </div>
      </section>

      {/* Account Settings */}
      <section className="settings-section">
        <h2>Account Settings</h2>
        <div className="setting-item">
          <label>Password:</label>
          <input type="password" placeholder="Change password" className="input-field" />
        </div>
        <div className="setting-item">
          <label>
            <input type="checkbox" /> Two-factor Authentication
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input type="checkbox" /> Deactivate Account
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input type="checkbox" /> Log out from all devices
          </label>
        </div>
      </section>

      {/* Privacy Settings */}
      <section className="settings-section">
        <h2>Privacy Settings</h2>
        <div className="setting-item">
          <label>Who can see my last seen/status:</label>
          <select className="dropdown">
            <option value="everyone">Everyone</option>
            <option value="contacts">My Contacts</option>
            <option value="nobody">Nobody</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Who can message me:</label>
          <select className="dropdown">
            <option value="everyone">Everyone</option>
            <option value="contacts">My Contacts</option>
            <option value="nobody">Nobody</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Who can see my profile picture:</label>
          <select className="dropdown">
            <option value="everyone">Everyone</option>
            <option value="contacts">My Contacts</option>
            <option value="nobody">Nobody</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Blocked Users:</label>
          <button className="btn-action">View Blocked Users</button>
        </div>
      </section>

      {/* Notification Settings */}
      <section className="settings-section">
        <h2>Notification Settings</h2>
        <div className="setting-item">
          <label>
            <input type="checkbox" /> Enable Message Notifications
          </label>
        </div>
        <div className="setting-item">
          <label>Notification Sound:</label>
          <select className="dropdown">
            <option value="default">Default</option>
            <option value="chime">Chime</option>
            <option value="beep">Beep</option>
          </select>
        </div>
        <div className="setting-item">
          <label>
            <input type="checkbox" /> Mute Chats
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input type="checkbox" /> Group Chat Notifications
          </label>
        </div>
      </section>

      {/* Appearance/Theme Settings */}
      <section className="settings-section">
        <h2>Appearance / Theme</h2>
        <div className="setting-item">
          <label>Dark Mode:</label>
          <input type="checkbox" checked={theme === "dark"} className="checkbox" />
        </div>
        <div className="setting-item">
          <label>Choose Theme:</label>
          <select className="dropdown" value={theme}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Font Size:</label>
          <select className="dropdown">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </section>

      {/* Storage & Data Settings */}
      <section className="settings-section">
        <h2>Storage & Data</h2>
        <div className="setting-item">
          <label>Data Usage:</label>
          <span>5 GB Used</span>
        </div>
        <div className="setting-item">
          <label>Manage Attached Files:</label>
          <button className="btn-action">View Files</button>
        </div>
        <div className="setting-item">
          <label>
            <input type="checkbox" /> Auto-download Images
          </label>
        </div>
      </section>

      {/* Help & Support Settings */}
      <section className="settings-section">
        <h2>Help & Support</h2>
        <div className="setting-item">
          <button className="btn-action">Report an Issue</button>
        </div>
        <div className="setting-item">
          <button className="btn-action">FAQ</button>
        </div>
        <div className="setting-item">
          <button className="btn-action">Contact Us</button>
        </div>
      </section>

      {/* About App Settings */}
      <section className="settings-section">
        <h2>About App</h2>
        <div className="setting-item">
          <label>Version:</label>
          <span>1.0.0</span>
        </div>
        
      </section>

      <button className="save-button">Save Changes</button>
    </div>
  );
}

export default Settings;
