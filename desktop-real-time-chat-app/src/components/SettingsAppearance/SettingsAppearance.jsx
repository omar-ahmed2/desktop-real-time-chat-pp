import React from "react";
import "./SettingsAppearance.css";
import { FaMoon, FaSun, FaDesktop, FaImage } from "react-icons/fa";

const SettingsAppearance = () => {
  return (
    <div className="appearance-settings">
      <h2 className="section-title">Appearance Settings</h2>

      <div className="setting-group">
        <div className="setting-item">
          <FaMoon className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Dark Mode</span>
            <span className="setting-subtext">Enable dark mode for better night-time viewing</span>
          </div>
          <span className="setting-action">Edit</span>
        </div>

        <div className="setting-item">
          <FaSun className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Light Mode</span>
            <span className="setting-subtext">Switch back to the light theme for better visibility during the day</span>
          </div>
          <span className="setting-action">Edit</span>
        </div>

        <div className="setting-item">
          <FaDesktop className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Desktop Mode</span>
            <span className="setting-subtext">Enable a more desktop-friendly layout</span>
          </div>
          <span className="setting-action">Edit</span>
        </div>

        <div className="setting-item">
          <FaImage className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Wallpaper</span>
            <span className="setting-subtext">Change the wallpaper for a personalized experience</span>
          </div>
          <span className="setting-action">Change</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsAppearance;
