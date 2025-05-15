import React from "react";
import {
  FaUser,
  FaLock,
  FaBell,
  FaPalette,
  FaQuestionCircle,
  FaDesktop,
  FaArrowLeft,
} from "react-icons/fa";
import "./settings.css";

const Sidebar = ({ selected, onSelect, onBack }) => {
  const sections = [
    { id: "general", label: "General", icon: <FaDesktop /> },
    { id: "account", label: "Account", icon: <FaLock /> },
    { id: "appearance", label: "Appearance", icon: <FaPalette /> },
  ];

  return (
    <div className="settings-sidebar">
      {/* Back Button */}
      <div className="back-button" onClick={onBack}>
        <span className="back-icon"><FaArrowLeft /></span> Back
      </div>

      <h2 className="sidebar_header">Settings</h2>

      {/* Sidebar Menu */}
      <ul className="sidebar-menu">
        {sections.map((section) => (
          <li
            key={section.id}
            className={`sidebar-item ${selected === section.id ? "active" : ""}`}
            onClick={() => onSelect(section.id)}
          >
            <span className="icon">{section.icon}</span>
            <span>{section.label}</span>
          </li>
        ))}
      </ul>

      {/* Profile Section */}
      <div className="profile-section">
        <div
          className={`sidebar-item ${selected === "profile" ? "active" : ""}`}
          onClick={() => onSelect("profile")}
        >
          <span className="icon"><FaUser /></span>
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
