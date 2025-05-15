import React, { useState } from "react";
import Sidebar from "./SettingsSidebar";
import "./settings.css";
import SettingsGeneral from "./SettingsGeneral/SettingsGeneral";
import SettingsAccount from "./SettingsAccount/SettingsAccount";
import SettingsAppearance from "./SettingsAppearance/SettingsAppearance";
import SettingsProfile from "./SettingsProfile/SettingsProfile";  
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [selectedSection, setSelectedSection] = useState("general");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "general":
        return <SettingsGeneral />;
      case "account":
        return <SettingsAccount onSelectSection={setSelectedSection} />;
      case "appearance":
        return <SettingsAppearance />;
      case "profile":
        return <SettingsProfile />;
      default:
        return <h2>Welcome to Settings</h2>;
    }
  };

  return (
    <div className="settings-wrapper">
      <Sidebar
        selected={selectedSection}
        onSelect={setSelectedSection}
        onBack={handleBack}
      />
      <div className="main_content">{renderContent()}</div>
    </div>
  );
};

export default Settings;
