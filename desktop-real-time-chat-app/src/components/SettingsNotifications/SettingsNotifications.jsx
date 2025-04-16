import React from "react";
import "./SettingsNotifications.css";
import { FaBell, FaComment, FaMobileAlt, FaDesktop } from "react-icons/fa";

const SettingsNotifications = () => {
  return (
    <div className="notifications-settings">
      <h2 className="section-title">Notifications Settings</h2>

      <div className="setting-group">
        <div className="setting-item">
          <FaBell className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Message Notifications</span>
            <span className="setting-subtext">Enable or disable message notifications</span>
          </div>
          <span className="setting-action">Edit</span>
        </div>

        <div className="setting-item">
          <FaComment className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Group Notifications</span>
            <span className="setting-subtext">Control notifications for group chats</span>
          </div>
          <span className="setting-action">Edit</span>
        </div>

        <div className="setting-item">
          <FaMobileAlt className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Mobile Notifications</span>
            <span className="setting-subtext">Enable or disable notifications on your phone</span>
          </div>
          <span className="setting-action">Edit</span>
        </div>

        <div className="setting-item">
          <FaDesktop className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Desktop Notifications</span>
            <span className="setting-subtext">Enable or disable notifications on desktop</span>
          </div>
          <span className="setting-action">Edit</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsNotifications;
