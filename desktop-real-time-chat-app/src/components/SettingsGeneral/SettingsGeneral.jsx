import React from "react";
import "./SettingsGeneral.css";
import { FaUserCircle, FaCheckCircle, FaLock, FaLanguage } from "react-icons/fa";

const SettingsGeneral = () => {
  return (
    <div className="general-settings">
      <h2 className="section-title">General Settings</h2>

      <div className="setting-group">
        <div className="setting-item">
          <FaUserCircle className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Account Info</span>
            <span className="setting-subtext">Update your name, email, or phone number</span>
          </div>
        </div>

        <div className="setting-item">
          <FaCheckCircle className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Two-step verification</span>
            <span className="setting-subtext">Add extra security to your account</span>
          </div>
        </div>

        <div className="setting-item">
          <FaLock className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Privacy</span>
            <span className="setting-subtext">Control who can see your information</span>
          </div>
        </div>

        <div className="setting-item">
          <FaLanguage className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Language</span>
            <span className="setting-subtext">Choose your preferred language</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsGeneral;
