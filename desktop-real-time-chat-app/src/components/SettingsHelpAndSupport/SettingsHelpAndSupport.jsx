import React, { useState } from "react";
import "./SettingsHelpAndSupport.css";
import {
  FaQuestionCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";

const SettingsHelpAndSupport = () => {
  const [openSection, setOpenSection] = useState(null);
  const [isReportSent, setIsReportSent] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isContactSent, setIsContactSent] = useState(false);
  const [openFaq, setOpenFaq] = useState({});
  const [selectedFile, setSelectedFile] = useState("");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
    setIsReportSent(false);
    setIsEmailSent(false);
    setIsContactSent(false);
    setSelectedFile("");
  };

  const toggleFaq = (questionKey) => {
    setOpenFaq((prev) => ({
      ...prev,
      [questionKey]: !prev[questionKey],
    }));
  };

  return (
    <div className="help-settings">
      <h2 className="section-title">Help & Support</h2>

      <div className="setting-group">
        {/* Report an Issue */}
        <div className="setting-item" onClick={() => toggleSection("report")}>
          <FaExclamationCircle className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Report an Issue</span>
            <span className="setting-subtext">Let us know about any problems</span>
          </div>
        </div>
        {openSection === "report" && (
          <div className="card-small">
            <label>Type of Issue:</label>
            <select>
              <option>Account Issue</option>
              <option>App Issue</option>
              <option>Technical Issue</option>
            </select>

            <label>Description of the Issue:</label>
            <textarea rows="4" placeholder="Please describe the issue" />

            <label>Attach Screenshot:</label>
            <label className="custom-file-upload">
              <input
                type="file"
                onChange={(e) =>
                  setSelectedFile(
                    e.target.files.length > 0 ? e.target.files[0].name : ""
                  )
                }
              />
              Choose File
            </label>
            {selectedFile && (
              <span className="file-name">{selectedFile}</span>
            )}

            <button className="btn-send" onClick={() => setIsReportSent(true)}>
              Send Report
            </button>

            {isReportSent && (
              <div className="status-msg">
                <FaCheckCircle className="status-icon" />
                Issue Reported Successfully
              </div>
            )}
          </div>
        )}

        {/* Email Support */}
        <div className="setting-item" onClick={() => toggleSection("email")}>
          <FaEnvelope className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Email Support</span>
            <span className="setting-subtext">Send us an email for assistance</span>
          </div>
        </div>
        {openSection === "email" && (
          <div className="card-small">
            <label>Subject:</label>
            <input type="text" placeholder="Subject of your email" />

            <label>Message:</label>
            <textarea rows="4" placeholder="Write your message" />

            <label>Issue Type (Optional):</label>
            <select>
              <option>Account Issue</option>
              <option>App Issue</option>
              <option>Technical Issue</option>
            </select>

            <button className="btn-send" onClick={() => setIsEmailSent(true)}>
              Send Email
            </button>

            {isEmailSent && (
              <div className="status-msg">
                <FaCheckCircle className="status-icon" />
                Email Sent Successfully
              </div>
            )}
          </div>
        )}

        {/* Contact Us */}
        <div className="setting-item" onClick={() => toggleSection("contact")}>
          <FaPhoneAlt className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">Contact Us</span>
            <span className="setting-subtext">Call us for support</span>
          </div>
        </div>
        {openSection === "contact" && (
          <div className="card-small">
            <label>Name:</label>
            <input type="text" placeholder="Your name" />

            <label>Email:</label>
            <input type="email" placeholder="Your email" />

            <label>Phone Number (Optional):</label>
            <input type="text" placeholder="Your phone number" />

            <label>Message:</label>
            <textarea rows="4" placeholder="Write your message" />

            <label>Contact Type:</label>
            <select>
              <option>Phone Call</option>
              <option>General Inquiry</option>
            </select>

            <button className="btn-send" onClick={() => setIsContactSent(true)}>
              Send Message
            </button>

            {isContactSent && (
              <div className="status-msg">
                <FaCheckCircle className="status-icon" />
                Message Sent Successfully
              </div>
            )}
          </div>
        )}

        {/* FAQ */}
        <div className="setting-item" onClick={() => toggleSection("faq")}>
          <FaQuestionCircle className="setting-icon" />
          <div className="setting-details">
            <span className="setting-title">FAQ</span>
            <span className="setting-subtext">Frequently Asked Questions</span>
          </div>
        </div>
        {openSection === "faq" && (
          <div className="card-small">
            <div className="faq-item">
              <button
                onClick={() => toggleFaq("refund")}
                className="faq-question-btn"
              >
                What is the refund policy?
              </button>
              {openFaq["refund"] && (
                <p className="faq-answer">
                  You can request a refund within 30 days of purchase. Please refer to our refund policy for more details.
                </p>
              )}
            </div>

            <div className="faq-item">
              <button
                onClick={() => toggleFaq("password")}
                className="faq-question-btn"
              >
                How do I change my password?
              </button>
              {openFaq["password"] && (
                <p className="faq-answer">
                  To change your password, go to your account settings and click "Change Password."
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsHelpAndSupport;
