import React, { useState } from "react";
import "./SettingsGeneral.css";
import {
  FaUserCircle,
  FaCheckCircle,
  FaLock,
  FaLanguage,
  FaCheck,
} from "react-icons/fa";

const SettingsGeneral = () => {
  const [activeOption, setActiveOption] = useState(null);
  const [accountSaved, setAccountSaved] = useState(false);
  const [verificationMode, setVerificationMode] = useState(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationDisabled, setVerificationDisabled] = useState(false);
  const [privacySaved, setPrivacySaved] = useState(false);
  const [languageApplied, setLanguageApplied] = useState(false);

  const toggleOption = (option) => {
    setActiveOption(activeOption === option ? null : option);

    if (option !== "two-step-verification") {
      setVerificationMode(null);
      setVerificationSent(false);
      setVerificationDisabled(false);
    }
    if (option !== "account-info") {
      setAccountSaved(false);
    }
    if (option !== "privacy") {
      setPrivacySaved(false);
    }
    if (option !== "language") {
      setLanguageApplied(false);
    }
  };

  const handleSaveAccountInfo = () => {
    setAccountSaved(true);
    setTimeout(() => setAccountSaved(false), 2000);
  };

  const handleSendVerification = () => {
    setVerificationSent(true);
    setTimeout(() => setVerificationSent(false), 2000);
  };

  const handleDisableVerification = () => {
    setVerificationDisabled(true);
    setVerificationSent(false);
    setTimeout(() => {
      setVerificationDisabled(false);
      setVerificationMode(null);
    }, 2000);
  };

  const handlePrivacySave = () => {
    setPrivacySaved(true);
    setTimeout(() => setPrivacySaved(false), 2000);
  };

  const handleApplyLanguage = () => {
    setLanguageApplied(true);
    setTimeout(() => setLanguageApplied(false), 2000);
  };

  return (
    <div className="general-settings">
      <h2 className="section-title">General Settings</h2>

      <div className="setting-group">
        {/* Account Info */}
        <div className="setting-item" onClick={() => toggleOption("account-info")}>
          <FaUserCircle className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Account Info</span>
            <span className="setting-subtext">Update your name, email, or phone number</span>
          </div>
          <span className="setting-action">Edit</span>
        </div>

        {activeOption === "account-info" && (
          <div className="customizer-box">
            <input type="text" placeholder="Name" className="input-field" />
            <input type="email" placeholder="Email" className="input-field" />
            <input type="tel" placeholder="Phone Number" className="input-field" />
            <button className="apply-btn" onClick={handleSaveAccountInfo}>Save Changes</button>
            {accountSaved && (
              <div className="verification-status">
                <FaCheck className="status-icon" />
                <span className="status-text">Changes Saved</span>
              </div>
            )}
          </div>
        )}

        {/* Two-step verification */}
        <div className="setting-item" onClick={() => toggleOption("two-step-verification")}>
          <FaCheckCircle className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Two-step verification</span>
            <span className="setting-subtext">Add extra security to your account</span>
          </div>
          <span className="setting-action">Edit</span>
        </div>

        {activeOption === "two-step-verification" && (
          <div className="customizer-box">
            {verificationMode === null && (
              <>
                <button className="apply-btn" onClick={() => setVerificationMode("enable")}>
                  Enable
                </button>
                <button
                  className="apply-btn"
                  style={{ backgroundColor: "#dc3545" }}
                  onClick={() => {
                    setVerificationMode("disable");
                    handleDisableVerification();
                  }}
                >
                  Disable
                </button>
              </>
            )}

            {verificationMode === "enable" && (
              <>
                <button className="apply-btn" onClick={handleSendVerification}>
                  Send Verification Code
                </button>
                {verificationSent && (
                  <div className="verification-status">
                    <FaCheck className="status-icon" />
                    <span className="status-text">Verification code sent</span>
                  </div>
                )}
              </>
            )}

            {verificationMode === "disable" && verificationDisabled && (
              <div className="verification-status">
                <FaCheck className="status-icon" />
                <span className="status-text">Disabled successfully</span>
              </div>
            )}
          </div>
        )}

        {/* Privacy */}
        <div className="setting-item" onClick={() => toggleOption("privacy")}>
          <FaLock className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Privacy</span>
            <span className="setting-subtext">Control who can see your information</span>
          </div>
          <span className="setting-action">Edit</span>
        </div>

        {activeOption === "privacy" && (
          <div className="customizer-box">
            <div className="privacy-option">
              <label>Who can see your profile picture?</label>
              <select className="dropdown">
                <option value="everyone">Everyone</option>
                <option value="contacts">Contacts</option>
                <option value="none">No one</option>
              </select>
            </div>
            <div className="privacy-option">
              <label>Who can see your status?</label>
              <select className="dropdown">
                <option value="everyone">Everyone</option>
                <option value="contacts">Contacts</option>
                <option value="none">No one</option>
              </select>
            </div>
            <button className="apply-btn" onClick={handlePrivacySave}>Save Changes</button>
            {privacySaved && (
              <div className="verification-status">
                <FaCheck className="status-icon" />
                <span className="status-text">Changes Saved</span>
              </div>
            )}
          </div>
        )}

        {/* Language */}
        <div className="setting-item" onClick={() => toggleOption("language")}>
          <FaLanguage className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Language</span>
            <span className="setting-subtext">Choose your preferred language</span>
          </div>
          <span className="setting-action">Edit</span>
        </div>

        {activeOption === "language" && (
          <div className="customizer-box">
            <select className="dropdown">
              <option value="english">English</option>
              <option value="arabic">Arabic</option>
              <option value="french">French</option>
            </select>
            <button className="apply-btn" onClick={handleApplyLanguage}>Apply</button>
            {languageApplied && (
              <div className="verification-status">
                <FaCheck className="status-icon" />
                <span className="status-text">Applied</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsGeneral;
  