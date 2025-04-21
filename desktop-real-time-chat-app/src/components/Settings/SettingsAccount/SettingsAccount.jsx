import React, { useState } from "react";
import "./SettingsAccount.css";
import {
  FaUserCircle,
  FaLock,
  FaPhone,
  FaEnvelope,
  FaTrashAlt,
  FaBell,
  FaCheck,
} from "react-icons/fa";

const SettingsAccount = ({ onSelectSection }) => {
  const [showPrivacyOptions, setShowPrivacyOptions] = useState(false);
  const [showPhoneOptions, setShowPhoneOptions] = useState(false);
  const [showEmailOptions, setShowEmailOptions] = useState(false);
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);
  const [showNotificationOptions, setShowNotificationOptions] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+1234567890");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [emailNotifications, setEmailNotifications] = useState({
    promotions: false,
    securityAlerts: false,
  });
  const [notificationPreferences, setNotificationPreferences] = useState({
    sound: false,
    push: false,
  });
  const [showPopup, setShowPopup] = useState(false);
  const [phoneUpdated, setPhoneUpdated] = useState(false);

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setNewPhoneNumber(value);
    }
  };

  const updatePhoneNumber = () => {
    if (newPhoneNumber.trim() !== "") {
      setPhoneNumber(newPhoneNumber);
      setNewPhoneNumber("");
      setPhoneUpdated(true);
      setTimeout(() => setPhoneUpdated(false), 3000);      
    }
  };

  return (
    <div className="account-settings">
      <h2 className="section-title">Account Settings</h2>

      <div className="setting-group">
        {/* Account Info */}
        <div className="setting-item" onClick={() => onSelectSection("profile")}>
          <FaUserCircle className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Account Info</span>
            <span className="setting-subtext">Update your name, email, or phone number</span>
          </div>
        </div>

        {/* Privacy */}
        <div className="setting-item" onClick={() => setShowPrivacyOptions(!showPrivacyOptions)}>
          <FaLock className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Privacy</span>
            <span className="setting-subtext">Control who can see your personal info</span>
          </div>
        </div>
        {showPrivacyOptions && (
          <div className="privacy-dropdown">
            <label>
              <input type="checkbox" /> Show email to others
            </label>
            <label>
              <input type="checkbox" /> Show phone number to contacts only
            </label>
            <label>
              <input type="checkbox" /> Make profile private
            </label>
          </div>
        )}

        {/* Phone Number */}
        <div className="setting-item" onClick={() => setShowPhoneOptions(!showPhoneOptions)}>
          <FaPhone className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Phone Number</span>
            <span className="setting-subtext">Verify or update your phone number</span>
          </div>
        </div>
        {showPhoneOptions && (
          <div className="setting-content">
            <p>Your current phone number is {phoneNumber}</p>
            <input
              type="tel"
              placeholder="Enter new phone number"
              value={newPhoneNumber}
              onChange={handlePhoneNumberChange}
              maxLength={15}
            />
            <button onClick={updatePhoneNumber}>Update</button>
            {phoneUpdated && (
              <div className="success-message">
                <FaCheck className="success-icon" />
                <span>Phone number updated</span>
              </div>
            )}
          </div>
        )}

        {/* Email Notifications */}
        <div className="setting-item" onClick={() => setShowEmailOptions(!showEmailOptions)}>
          <FaEnvelope className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Email Notifications</span>
            <span className="setting-subtext">Manage your email notifications preferences</span>
          </div>
        </div>
        {showEmailOptions && (
          <div className="setting-content">
            <label>
              <input
                type="checkbox"
                checked={emailNotifications.promotions}
                onChange={() =>
                  setEmailNotifications({
                    ...emailNotifications,
                    promotions: !emailNotifications.promotions,
                  })
                }
              />
              Promotions
            </label>
            <label>
              <input
                type="checkbox"
                checked={emailNotifications.securityAlerts}
                onChange={() =>
                  setEmailNotifications({
                    ...emailNotifications,
                    securityAlerts: !emailNotifications.securityAlerts,
                  })
                }
              />
              Security Alerts
            </label>
          </div>
        )}

        {/* Notification Preferences */}
        <div
          className="setting-item"
          onClick={() => setShowNotificationOptions(!showNotificationOptions)}
        >
          <FaBell className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Notification Preferences</span>
            <span className="setting-subtext">Set your notification preferences</span>
          </div>
        </div>
        {showNotificationOptions && (
          <div className="setting-content">
            <label>
              <input
                type="checkbox"
                checked={notificationPreferences.sound}
                onChange={() =>
                  setNotificationPreferences({
                    ...notificationPreferences,
                    sound: !notificationPreferences.sound,
                  })
                }
              />
              Sound Notifications
            </label>
            <label>
              <input
                type="checkbox"
                checked={notificationPreferences.push}
                onChange={() =>
                  setNotificationPreferences({
                    ...notificationPreferences,
                    push: !notificationPreferences.push,
                  })
                }
              />
              Push Notifications
            </label>
          </div>
        )}

        {/* Delete Account */}
        <div className="setting-item" onClick={() => setShowDeleteOptions(!showDeleteOptions)}>
          <FaTrashAlt className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Delete Account</span>
            <span className="setting-subtext">Permanently delete your account</span>
          </div>
        </div>
        {showDeleteOptions && (
          <div className="setting-content danger">
            <p>This will permanently delete your account and all associated data.</p>
            <button className="danger-btn" onClick={() => setShowPopup(true)}>
              Delete My Account
            </button>
          </div>
        )}
      </div>

      {/* Custom Alert Popup */}
      {showPopup && (
        <div className="custom-alert-backdrop">
          <div className="custom-alert">
            <p>Are you sure you want to delete your account?</p>
            <div className="alert-buttons">
              <button
                className="yes-btn"
                onClick={() => {
                  window.location.href = "/signup";
                }}
              >
                Yes
              </button>
              <button className="no-btn" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsAccount;
