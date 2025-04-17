import React, { useState } from "react";
import "./SettingsPrivacy.css";
import { FaShieldAlt, FaEye, FaUserShield, FaLock, FaCheckCircle } from "react-icons/fa";

const SettingsPrivacy = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isProfileVisibilityOpen, setIsProfileVisibilityOpen] = useState(false);
  const [isAccountProtectionOpen, setIsAccountProtectionOpen] = useState(false);
  const [isTwoFactorAuthOpen, setIsTwoFactorAuthOpen] = useState(false);

  const [privacyProtectionStatus, setPrivacyProtectionStatus] = useState({
    name: false,
    email: false,
    phone: false,
  });
  const [profileVisibilityStatus, setProfileVisibilityStatus] = useState("Public");
  const [accountProtectionStatus, setAccountProtectionStatus] = useState(false);
  const [twoFactorAuthStatus, setTwoFactorAuthStatus] = useState(false);
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);

  const handlePrivacyToggle = (field) => {
    setPrivacyProtectionStatus((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleProfileVisibilityChange = (event) => {
    setProfileVisibilityStatus(event.target.value);
  };

  const handleTwoFactorAuthToggle = () => {
    setTwoFactorAuthStatus(!twoFactorAuthStatus);
    setVerificationCodeSent(false); // Reset when toggled off
  };

  return (
    <div className="privacy-settings">
      <h2 className="section-title">Privacy Settings</h2>

      {/* Privacy Protection Section */}
      <div className="setting-item" onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}>
        <FaShieldAlt className="setting-icon" />
        <div className="setting-details">
          <span className="setting-title">Privacy Protection</span>
          <span className="setting-subtext">Manage your privacy settings</span>
        </div>
      </div>
      {isPrivacyOpen && (
        <div className="card-small">
          <div className="privacy-options">
            {["name", "email", "phone"].map((field) => (
              <div className="privacy-option" key={field}>
                <label>
                  <input
                    type="checkbox"
                    checked={privacyProtectionStatus[field]}
                    onChange={() => handlePrivacyToggle(field)}
                  />
                  <span>Who can see your {field}</span>
                </label>
              </div>
            ))}
          </div>
          {Object.values(privacyProtectionStatus).some((status) => status) && (
            <div className="status-msg">
              <FaCheckCircle className="status-icon" /> Data Hidden Successfully
            </div>
          )}
        </div>
      )}

      {/* Profile Visibility Section */}
      <div className="setting-item" onClick={() => setIsProfileVisibilityOpen(!isProfileVisibilityOpen)}>
        <FaEye className="setting-icon" />
        <div className="setting-details">
          <span className="setting-title">Profile Visibility</span>
          <span className="setting-subtext">Choose who can see your profile</span>
        </div>
      </div>
      {isProfileVisibilityOpen && (
        <div className="card-small">
          <select
            value={profileVisibilityStatus}
            onChange={handleProfileVisibilityChange}
            className="visibility-select"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
            <option value="Custom">Custom</option>
          </select>
          <div className="status-msg">
            <FaCheckCircle className="status-icon" /> Profile Visibility Updated
          </div>
        </div>
      )}

      {/* Account Protection Section */}
      <div className="setting-item" onClick={() => setIsAccountProtectionOpen(!isAccountProtectionOpen)}>
        <FaUserShield className="setting-icon" />
        <div className="setting-details">
          <span className="setting-title">Account Protection</span>
          <span className="setting-subtext">Add extra protection to your account</span>
        </div>
      </div>
      {isAccountProtectionOpen && (
        <div className="card-small">
          <div className="privacy-option">
            <label>
              <input
                type="checkbox"
                checked={accountProtectionStatus}
                onChange={() => setAccountProtectionStatus(!accountProtectionStatus)}
              />
              <span>Enable protection against unauthorized logins</span>
            </label>
          </div>
          {accountProtectionStatus && (
            <div className="status-msg">
              <FaCheckCircle className="status-icon" /> Protection Enabled
            </div>
          )}
        </div>
      )}

      {/* Two-Factor Authentication Section */}
      <div className="setting-item" onClick={() => setIsTwoFactorAuthOpen(!isTwoFactorAuthOpen)}>
        <FaLock className="setting-icon" />
        <div className="setting-details">
          <span className="setting-title">Two-Factor Authentication</span>
          <span className="setting-subtext">Enable two-factor authentication for added security</span>
        </div>
      </div>
      {isTwoFactorAuthOpen && (
        <div className="card-small">
          <label>
            <input
              type="checkbox"
              checked={twoFactorAuthStatus}
              onChange={handleTwoFactorAuthToggle}
            />
            <span>Enable Two-Factor Authentication</span>
          </label>
          {twoFactorAuthStatus && (
            <>
              <div className="status-msg">
                <FaCheckCircle className="status-icon" /> Two-Factor Authentication Enabled
              </div>
              {!verificationCodeSent ? (
                <button
                  className="send-code-button"
                  onClick={() => setVerificationCodeSent(true)}
                >
                  Send Verification Code
                </button>
              ) : (
                <div className="status-msg">
                  <FaCheckCircle className="status-icon" /> Code Sent
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SettingsPrivacy;
