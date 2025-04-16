import React, { useState } from "react";
import Sidebar from "./SettingsSidebar";
import "./settings.css";
import SettingsGeneral from "../SettingsGeneral/SettingsGeneral";
import SettingsAccount from "../SettingsAccount/SettingsAccount";
import SettingsPrivacy from "../SettingsPrivacy/SettingsPrivacy";
import SettingsNotifications from "../SettingsNotifications/SettingsNotifications";
import SettingsAppearance from "../SettingsAppearance/SettingsAppearance";
import SettingsHelpAndSupport from "../SettingsHelpAndSupport/SettingsHelpAndSupport";
import SettingsProfile from "../SettingsProfile/SettingsProfile";  // استيراد ملف الـ Profile
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [selectedSection, setSelectedSection] = useState("general");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // بيرجع للصفحة اللي قبلها
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "general":
        return <SettingsGeneral />;
      case "account":
        return <SettingsAccount />;
      case "privacy":
        return <SettingsPrivacy />;
      case "notifications":
        return <SettingsNotifications />;
      case "appearance":
        return <SettingsAppearance />;
      case "support":
        return <SettingsHelpAndSupport />;
      case "profile":  // إضافة حالة للبروفايل
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
      <div className="main-content">{renderContent()}</div>
    </div>
  );
};

export default Settings;
