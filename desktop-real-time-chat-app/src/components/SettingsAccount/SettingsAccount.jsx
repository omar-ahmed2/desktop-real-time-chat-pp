import React from "react";
import "./SettingsAccount.css";
import { FaUserCircle, FaLock, FaPhone, FaEnvelope, FaTrashAlt, FaBell } from "react-icons/fa";

const SettingsAccount = () => {
  return (
    <div className="account-settings">
      <h2 className="section-title">Account Settings</h2>

      <div className="setting-group">
        {/* Account Info */}
        <div className="setting-item">
          <FaUserCircle className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Account Info</span>
            <span className="setting-subtext">Update your name, email, or phone number</span>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="setting-item">
          <FaLock className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Privacy</span>
            <span className="setting-subtext">Control who can see your personal info</span>
          </div>
        </div>

        {/* Phone Number */}
        <div className="setting-item">
          <FaPhone className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Phone Number</span>
            <span className="setting-subtext">Verify or update your phone number</span>
          </div>
        </div>

        {/* Email Settings */}
        <div className="setting-item">
          <FaEnvelope className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Email Notifications</span>
            <span className="setting-subtext">Manage your email notifications preferences</span>
          </div>
        </div>

        {/* Delete Account */}
        <div className="setting-item">
          <FaTrashAlt className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Delete Account</span>
            <span className="setting-subtext">Permanently delete your account</span>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="setting-item">
          <FaBell className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Notification Preferences</span>
            <span className="setting-subtext">Set your notification preferences</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsAccount;
