import React from "react";
import "./SettingsHelpAndSupport.css";
import { FaQuestionCircle, FaPhoneAlt, FaEnvelope, FaExclamationCircle } from "react-icons/fa";

const SettingsHelpAndSupport = () => {
  return (
    <div className="help-settings">
      <h2 className="section-title">Help & Support</h2>

      <div className="setting-group">
        <div className="setting-item">
          <FaQuestionCircle className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">FAQ</span>
            <span className="setting-subtext">Frequently Asked Questions</span>
          </div>
        </div>

        <div className="setting-item">
          <FaPhoneAlt className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Contact Us</span>
            <span className="setting-subtext">Call us for support</span>
          </div>
        </div>

        <div className="setting-item">
          <FaEnvelope className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Email Support</span>
            <span className="setting-subtext">Send us an email for assistance</span>
          </div>
        </div>

        <div className="setting-item">
          <FaExclamationCircle className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Report an Issue</span>
            <span className="setting-subtext">Let us know about any problems</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsHelpAndSupport;
