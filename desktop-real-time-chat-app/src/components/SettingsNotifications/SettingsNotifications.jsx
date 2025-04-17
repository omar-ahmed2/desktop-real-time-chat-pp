import React, { useState } from "react";
import "./SettingsNotifications.css";
import {
  FaBell,
  FaComment,
  FaMobileAlt,
  FaDesktop,
  FaCheckCircle,
} from "react-icons/fa";

const SettingsNotifications = () => {
  const [openSection, setOpenSection] = useState("");

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? "" : section));
  };

  return (
    <div className="notifications-settings">
      <h2 className="section-title">Notifications Settings</h2>

      <div className="setting-group">
        {/* Message Notifications */}
        <div className="setting-item" onClick={() => toggleSection("message")}>
          <FaBell className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Message Notifications</span>
            <span className="setting-subtext">
              Enable or disable message notifications
            </span>
          </div>
          <span className="setting-action">Edit</span>
        </div>
        {openSection === "message" && (
          <div className="card-small">
            <label>
              <input type="checkbox" /> Mute incoming message notifications
            </label>
            <label>
              <input type="checkbox" /> Show message previews
            </label>
            <div className="status-msg">
              <FaCheckCircle className="status-icon" />
              Message Notification Settings Updated
            </div>
          </div>
        )}

        {/* Group Notifications */}
        <div className="setting-item" onClick={() => toggleSection("group")}>
          <FaComment className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Group Notifications</span>
            <span className="setting-subtext">
              Control notifications for group chats
            </span>
          </div>
          <span className="setting-action">Edit</span>
        </div>
        {openSection === "group" && (
          <div className="card-small">
            <label>
              <input type="checkbox" /> Mute group chats
            </label>
            <label>
              <input type="checkbox" /> Notify on mentions only
            </label>
            <div className="status-msg">
              <FaCheckCircle className="status-icon" />
              Group Notification Settings Updated
            </div>
          </div>
        )}

        {/* Mobile Notifications */}
        <div className="setting-item" onClick={() => toggleSection("mobile")}>
          <FaMobileAlt className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Mobile Notifications</span>
            <span className="setting-subtext">
              Enable or disable notifications on your phone
            </span>
          </div>
          <span className="setting-action">Edit</span>
        </div>
        {openSection === "mobile" && (
          <div className="card-small">
            <label>
              <input type="checkbox" /> Enable push notifications
            </label>
            <label>
              <input type="checkbox" /> Vibrate on notification
            </label>
            <div className="status-msg">
              <FaCheckCircle className="status-icon" />
              Mobile Notification Settings Updated
            </div>
          </div>
        )}

        {/* Desktop Notifications */}
        <div className="setting-item" onClick={() => toggleSection("desktop")}>
          <FaDesktop className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Desktop Notifications</span>
            <span className="setting-subtext">
              Enable or disable notifications on desktop
            </span>
          </div>
          <span className="setting-action">Edit</span>
        </div>
        {openSection === "desktop" && (
          <div className="card-small">
            <label>
              <input type="checkbox" /> Show notifications on desktop
            </label>
            <label>
              <input type="checkbox" /> Play sound for desktop alerts
            </label>
            <div className="status-msg">
              <FaCheckCircle className="status-icon" />
              Desktop Notification Settings Updated
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsNotifications;
