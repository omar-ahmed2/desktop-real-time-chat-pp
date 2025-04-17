import React, { useState } from "react";
import "./SettingsAppearance.css";
import { FaMoon, FaSun, FaDesktop, FaImage, FaEdit } from "react-icons/fa";

const SettingsAppearance = () => {
  const [activeOption, setActiveOption] = useState(null);

  const toggleOption = (option) => {
    setActiveOption(activeOption === option ? null : option);
  };

  return (
    <div className="appearance-settings">
      <h2 className="section-title">Appearance Settings</h2>

      <div className="setting-group">
        {/* Dark Mode */}
        <div className="setting-item" onClick={() => toggleOption("dark")}>
          <FaMoon className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Dark Mode</span>
            <span className="setting-subtext">Enable dark mode for better night-time viewing</span>
          </div>
          <span className="setting-action">Edit</span>
        </div>
        {activeOption === "dark" && (
          <div className="customizer-box">
            <p className="customizer-title">Choose Dark Theme Style:</p>
            <div className="theme-options">
              <div className="theme-item">
                <div className="theme-preview dark-theme-1">🌑</div>
                <span className="theme-label">Dark 1</span>
              </div>
              <div className="theme-item">
                <div className="theme-preview dark-theme-2">🌚</div>
                <span className="theme-label">Dark 2</span>
              </div>
              <div className="theme-item">
                <div className="theme-preview dark-theme-3">🌙</div>
                <span className="theme-label">Dark 3</span>
              </div>
            </div>
            <button className="apply-btn">Apply</button>
          </div>
        )}

        {/* Light Mode */}
        <div className="setting-item" onClick={() => toggleOption("light")}>
          <FaSun className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Light Mode</span>
            <span className="setting-subtext">Switch back to the light theme for better visibility during the day</span>
          </div>
          <span className="setting-action">Edit</span>
        </div>
        {activeOption === "light" && (
          <div className="customizer-box">
            <p className="customizer-title">Choose Light Theme Style:</p>
            <div className="theme-options">
              <div className="theme-item">
                <div className="theme-preview light-theme-1">☀️</div>
                <span className="theme-label">Light 1</span>
              </div>
              <div className="theme-item">
                <div className="theme-preview light-theme-2">🌞</div>
                <span className="theme-label">Light 2</span>
              </div>
              <div className="theme-item">
                <div className="theme-preview light-theme-3">🌅</div>
                <span className="theme-label">Light 3</span>
              </div>
            </div>
            <button className="apply-btn">Apply</button>
          </div>
        )}

        {/* Desktop Mode */}
        <div className="setting-item" onClick={() => toggleOption("desktop")}>
          <FaDesktop className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Desktop Mode</span>
            <span className="setting-subtext">Enable a more desktop-friendly layout</span>
          </div>
          <span className="setting-action">Edit</span>
        </div>
        {activeOption === "desktop" && (
          <div className="customizer-box">
            <p className="customizer-title">Choose Layout:</p>
            <div className="layout-options">
              <div className="layout-item compact-view">Compact View</div>
              <div className="layout-item wide-view">Wide View</div>
              <div className="layout-item grid-view">Grid View</div>
            </div>
            <button className="apply-btn">Apply</button>
          </div>
        )}

        {/* Wallpaper */}
        <div className="setting-item" onClick={() => toggleOption("wallpaper")}>
          <FaImage className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Wallpaper</span>
            <span className="setting-subtext">Change the wallpaper for a personalized experience</span>
          </div>
          <span className="setting-action">Change</span>
        </div>
        {activeOption === "wallpaper" && (
          <div className="customizer-box">
            <p className="customizer-title">Choose a Wallpaper:</p>
            <div className="wallpaper-thumbs">
              <div className="wallpaper-item">🌄</div>
              <div className="wallpaper-item">🌆</div>
              <div className="wallpaper-item">🌌</div>
            </div>
            <button className="apply-btn">Upload from device</button>
            <button className="apply-btn">Apply</button>
          </div>
        )}

        {/* Text Size */}
        <div className="setting-item" onClick={() => toggleOption("text-size")}>
          <FaEdit className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Text Size</span>
            <span className="setting-subtext">Choose the size of text for better readability</span>
          </div>
          <span className="setting-action">Change</span>
        </div>
        {activeOption === "text-size" && (
          <div className="customizer-box">
            <p className="customizer-title">Choose Text Size:</p>
            <select className="text-size-dropdown">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
            <button className="apply-btn">Apply</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsAppearance;
