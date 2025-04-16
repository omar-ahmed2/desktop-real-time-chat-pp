import React from "react";
import "./SettingsPrivacy.css";
import { FaShieldAlt, FaEye, FaUserShield, FaLock } from "react-icons/fa";

const SettingsPrivacy = () => {
  return (
    <div className="privacy-settings">
      <h2 className="section-title">Privacy Settings</h2>

      <div className="setting-group">
        <div className="setting-item">
          <FaShieldAlt className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Privacy Protection</span>
            <span className="setting-subtext">Manage your privacy settings</span>
          </div>
          <span className="setting-action">Edit</span>
        </div>

        <div className="setting-item">
          <FaEye className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Profile Visibility</span>
            <span className="setting-subtext">Choose who can see your profile</span>
          </div>
          <span className="setting-action">Edit</span>
        </div>

        <div className="setting-item">
          <FaUserShield className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Account Protection</span>
            <span className="setting-subtext">Add extra protection to your account</span>
          </div>
          <span className="setting-action">Enable</span>
        </div>

        <div className="setting-item">
          <FaLock className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Two-Factor Authentication</span>
            <span className="setting-subtext">Enable two-factor authentication for added security</span>
          </div>
          <span className="setting-action">Enable</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsPrivacy;
