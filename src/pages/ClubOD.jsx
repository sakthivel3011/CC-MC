import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/styles/ClubOD.css';

const ClubOD = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [formData, setFormData] = useState({
    rollNo: '',
    name: '',
    department: '',
    year: '',
    eventName: '',
    eventFeedback: '',
    selectedDates: [],
    singleDate: '',
    attendanceType: 'full-day', // New field for full-day/half-day
    multipleMode: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState(''); // 'success', 'error', 'warning'

  // Helper function to show submission feedback
  const showSubmissionFeedback = (message, status = 'success', duration = 8000) => {
    setSubmitMessage(message);
    setSubmitStatus(status);
    setTimeout(() => {
      setSubmitMessage('');
      setSubmitStatus('');
    }, duration);
  };

  // Function to check recent submissions
  const getRecentSubmissions = () => {
    const submissions = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('od_')) {
        try {
          const submission = JSON.parse(localStorage.getItem(key));
          submissions.push(submission);
        } catch (e) {
          console.warn('Invalid submission data in localStorage:', key);
        }
      }
    }
    return submissions.sort((a, b) => new Date(b.localTimestamp) - new Date(a.localTimestamp));
  };

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  // Sample club members data
  const clubMembers = {
    '23ADR145': { name: 'sakthivel', department: 'Aids', year: '3rd Year' },
    'EC21002': { name: 'Jane Smith', department: 'Electronics', year: '3rd Year' },
    'ME21003': { name: 'Mike Johnson', department: 'Mechanical', year: '3rd Year' },
    'CS22001': { name: 'Sarah Wilson', department: 'Computer Science', year: '2nd Year' },
    'IT21004': { name: 'David Brown', department: 'Information Technology', year: '3rd Year' }
  };

  const departments = [
    'AIDS', 'AIML', 'CSE', 'AUTO', 'CHEM', 'FT', 'CIVIL', 'CSD', 'IT',
    'EEE', 'EIE', 'ECE', 'MECH', 'MTS', 'MSC', 'MCA', 'MBA', 'BSC', 'ME', 'ARCH'
  ];

  const handlePopupAgree = () => {
    setShowPopup(false);
  };

  const handleRollNoChange = (e) => {
    const rollNo = e.target.value.toUpperCase();
    setFormData(prev => ({ ...prev, rollNo }));

    // Auto-fill if roll number exists in club members
    if (clubMembers[rollNo]) {
      setFormData(prev => ({
        ...prev,
        name: clubMembers[rollNo].name,
        department: clubMembers[rollNo].department,
        year: clubMembers[rollNo].year
      }));
    } else {
      // Clear auto-filled data if roll number doesn't exist
      setFormData(prev => ({
        ...prev,
        name: '',
        department: '',
        year: ''
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateModeToggle = () => {
    setFormData(prev => ({
      ...prev,
      multipleMode: !prev.multipleMode,
      selectedDates: [],
      singleDate: ''
    }));
  };

  const handleSingleDateChange = (e) => {
    setFormData(prev => ({ ...prev, singleDate: e.target.value }));
  };

  const handleMultipleDateChange = (e) => {
    const date = e.target.value;
    setFormData(prev => ({
      ...prev,
      selectedDates: prev.selectedDates.includes(date)
        ? prev.selectedDates.filter(d => d !== date)
        : [...prev.selectedDates, date]
    }));
  };

  const addDateToMultiple = () => {
    const dateInput = document.getElementById('multipleDateInput');
    const date = dateInput.value;
    if (date && !formData.selectedDates.includes(date)) {
      setFormData(prev => ({
        ...prev,
        selectedDates: [...prev.selectedDates, date]
      }));
      dateInput.value = '';
    }
  };

  const removeDateFromMultiple = (dateToRemove) => {
    setFormData(prev => ({
      ...prev,
      selectedDates: prev.selectedDates.filter(date => date !== dateToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Validation
    if (!formData.rollNo || !formData.name || !formData.department || !formData.year || !formData.eventName || !formData.eventFeedback) {
      showSubmissionFeedback('Please fill all required fields', 'error');
      setIsSubmitting(false);
      return;
    }

    if (!formData.multipleMode && !formData.singleDate) {
      showSubmissionFeedback('Please select a date', 'error');
      setIsSubmitting(false);
      return;
    }

    if (formData.multipleMode && formData.selectedDates.length === 0) {
      showSubmissionFeedback('Please select at least one date', 'error');
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare data for Google Apps Script
      const submissionData = {
        rollNo: formData.rollNo,
        name: formData.name,
        department: formData.department,
        year: formData.year,
        eventName: formData.eventName,
        eventFeedback: formData.eventFeedback,
        dates: formData.multipleMode ? formData.selectedDates.join(', ') : formData.singleDate,
        attendanceType: formData.attendanceType,
        submissionTime: new Date().toLocaleString(),
        isMember: clubMembers[formData.rollNo] ? 'Yes' : 'No'
      };

      console.log('Submitting data:', submissionData);

      // Store submission locally as backup
      const submissionId = `od_${Date.now()}_${formData.rollNo}`;
      localStorage.setItem(submissionId, JSON.stringify({
        ...submissionData,
        submissionId,
        localTimestamp: new Date().toISOString()
      }));

      // Updated Google Apps Script URL - Make sure this is your correct deployed script URL
      const scriptURL = 'https://script.google.com/macros/s/AKfycbzASYPaGwyJ2NZEJGGCo5179PfUIZvIkxkq3Kj5fTbsg1Mxfvcv7WPgR8QxuCWN8q3j/exec';
      
      // Create FormData for better compatibility with Google Apps Script
      const formDataToSend = new FormData();
      Object.keys(submissionData).forEach(key => {
        formDataToSend.append(key, submissionData[key]);
      });

      const response = await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Apps Script
        body: formDataToSend,
      });

      // Since we're using no-cors mode, we can't check response status
      // We'll assume success if no error is thrown
      showSubmissionFeedback(
        `🎉 OD application submitted successfully! 
         Submission ID: ${submissionId.slice(-8)}
         You will receive confirmation soon. Keep this ID for your records.`, 
        'success', 10000
      );
      
      // Reset form
      setFormData({
        rollNo: '',
        name: '',
        department: '',
        year: '',
        eventName: '',
        eventFeedback: '',
        selectedDates: [],
        singleDate: '',
        attendanceType: 'full-day',
        multipleMode: false
      });

    } catch (error) {
      console.error('Submission error:', error);
      
      // Try alternative method with URLSearchParams
      try {
        const fallbackSubmissionData = {
          rollNo: formData.rollNo,
          name: formData.name,
          department: formData.department,
          year: formData.year,
          eventName: formData.eventName,
          eventFeedback: formData.eventFeedback,
          dates: formData.multipleMode ? formData.selectedDates.join(', ') : formData.singleDate,
          attendanceType: formData.attendanceType,
          submissionTime: new Date().toLocaleString(),
          isMember: clubMembers[formData.rollNo] ? 'Yes' : 'No'
        };

        const fallbackScriptURL = 'https://script.google.com/macros/s/AKfycbyQ_rM3kHopvmHcX9bcX68jJ7KPZ8U4MifW8EIFcK2CfSRJbBFsl8FbzFoG_LSgtkCy/exec';
        
        const urlParams = new URLSearchParams();
        Object.keys(fallbackSubmissionData).forEach(key => {
          urlParams.append(key, fallbackSubmissionData[key]);
        });

        await fetch(fallbackScriptURL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: urlParams
        });

        const fallbackSubmissionId = `od_fallback_${Date.now()}_${formData.rollNo}`;
        showSubmissionFeedback(
          `🎉 OD application submitted successfully! 
           Submission ID: ${fallbackSubmissionId.slice(-8)}
           You will receive confirmation soon. Keep this ID for your records.`, 
          'success', 10000
        );
        
        // Reset form
        setFormData({
          rollNo: '',
          name: '',
          department: '',
          year: '',
          eventName: '',
          eventFeedback: '',
          selectedDates: [],
          singleDate: '',
          attendanceType: 'full-day',
          multipleMode: false
        });

      } catch (fallbackError) {
        console.error('Fallback submission error:', fallbackError);
        showSubmissionFeedback('⚠️ Unable to submit application. Please check your internet connection and try again. If the problem persists, contact the admin.', 'error', 10000);
      }
    }

    setIsSubmitting(false);
  };

return (
    <div className="club-od-container" style={{ background: "#f5f6fa" }}>
        {/* Popup for club members only */}
        {showPopup && (
            <div className="popup-overlay" data-aos="fade">
                <div className="popup-content" style={{ background: "#fff", color: "#222" }}>
                    <div className="popup-header">
                        <h2>🎯 Club Member OD Application</h2>
                    </div>
                    <div className="popup-body">
                        <p>This application is exclusively for club members to request OD (On Duty) for events.</p>
                        <p>✨ Features:</p>
                        <ul>
                            <li>📝 Submit OD requests for events</li>
                            <li>📅 Select single or multiple dates</li>
                            <li>⏰ Choose full-day or half-day</li>
                            <li>⚡ Auto-fill details for registered members</li>
                            <li>💬 Provide event feedback</li>
                        </ul>
                        <p><strong>Are you a club member?</strong></p>
                    </div>
                    <div className="popup-footer">
                        <button className="agree-btn" onClick={handlePopupAgree} style={{ background: "#4b6cb7", color: "#fff" }}>
                            Yes, I'm a Club Member
                        </button>
                    </div>
                </div>
            </div>
        )}

        <div className="od-content" style={{ background: "#fff", color: "#222" }}>
            <div className="od-header" data-aos="fade-down">
                <h1>🎓 Club Member OD Application</h1>
                <p>Submit your On Duty request for club events</p>
            </div>

            <form className="od-form" onSubmit={handleSubmit}>
                <div className="form-section" data-aos="fade-right">
                    <h3>📋 Personal Information</h3>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="rollNo">Roll Number *</label>
                            <input
                                type="text"
                                id="rollNo"
                                name="rollNo"
                                value={formData.rollNo}
                                onChange={handleRollNoChange}
                                placeholder="Enter your roll number (e.g., 23ADR145)"
                                required
                                className="form-input"
                                style={{ background: "#f0f0f5", color: "#222" }}
                            />
                            {clubMembers[formData.rollNo] && (
                                <span className="member-badge" style={{ background: "#4b6cb7", color: "#fff" }}>✅ Club Member</span>
                            )}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Full Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                required
                                className="form-input"
                                style={{ background: "#f0f0f5", color: "#222" }}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="department">Department *</label>
                            <select
                                id="department"
                                name="department"
                                value={formData.department}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                                style={{ background: "#f0f0f5", color: "#222" }}
                            >
                                <option value="">Select Department</option>
                                {departments.map((dept, index) => (
                                    <option key={index} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="year">Year *</label>
                            <select
                                id="year"
                                name="year"
                                value={formData.year}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                                style={{ background: "#f0f0f5", color: "#222" }}
                            >
                                <option value="">Select Year</option>
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="4th Year">4th Year</option>
                                <option value="5th Year">5th Year</option>
                                <option value="Other">Other (Specify below)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-section" data-aos="fade-left">
                    <h3>🎪 Event Information</h3>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="eventName">Event Name *</label>
                            <select
                                id="eventName"
                                name="eventName"
                                value={formData.eventName}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                                style={{ background: "#f0f0f5", color: "#222" }}
                            >
                                <option value="">Select Event</option>
                                <option value="Onam-2k25">Onam-2k25</option>
                                <option value="Raaga-3.O">Raaga-3.O</option>
                                <option value="Office Bearers Meet">Office Bearers Meet</option>
                                <option value="Other">Other</option>
                            </select>
                            {formData.eventName === "Other" && (
                                <input
                                    type="text"
                                    id="eventNameOther"
                                    name="eventName"
                                    value={formData.eventNameOther || ""}
                                    onChange={e => setFormData(prev => ({ ...prev, eventName: e.target.value }))}
                                    placeholder="Enter event name"
                                    className="form-input"
                                    style={{ background: "#f0f0f5", color: "#222", marginTop: "8px" }}
                                />
                            )}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label htmlFor="eventFeedback">Event Feedback *</label>
                            <textarea
                                id="eventFeedback"
                                name="eventFeedback"
                                value={formData.eventFeedback}
                                onChange={handleInputChange}
                                placeholder="Share your experience, what you learned, or describe the event..."
                                rows="4"
                                required
                                className="form-input"
                                style={{ background: "#f0f0f5", color: "#222" }}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="form-section" data-aos="fade-up">
                    <h3>📅 Date Selection</h3>
                    
                    <div className="date-mode-toggle">
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={formData.multipleMode}
                                onChange={handleDateModeToggle}
                            />
                            <span className="slider"></span>
                            <span className="toggle-label">
                                {formData.multipleMode ? 'Multiple Dates Mode' : 'Single Date Mode'}
                            </span>
                        </label>
                    </div>

                    {!formData.multipleMode ? (
                        <>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="singleDate">Select Date *</label>
                                    <input
                                        type="date"
                                        id="singleDate"
                                        value={formData.singleDate}
                                        onChange={handleSingleDateChange}
                                        required
                                        className="form-input"
                                        style={{ background: "#f0f0f5", color: "#222" }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="attendanceType">Attendance Type *</label>
                                    <select
                                        id="attendanceType"
                                        name="attendanceType"
                                        value={formData.attendanceType}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                        style={{ background: "#f0f0f5", color: "#222" }}
                                    >
                                        <option value="full-day">Full Day</option>
                                        <option value="fn">Forenoon (FN)</option>
                                        <option value="an">Afternoon (AN)</option>
                                    </select>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="multiple-dates-section">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="multipleDateInput">Add Dates *</label>
                                    <div className="date-input-group">
                                        <input
                                            type="date"
                                            id="multipleDateInput"
                                            className="form-input"
                                            style={{ background: "#f0f0f5", color: "#222" }}
                                        />
                                        <button type="button" onClick={addDateToMultiple} className="add-date-btn" style={{ background: "#4b6cb7", color: "#fff" }}>
                                            Add Date
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="attendanceTypeMulti">Attendance Type *</label>
                                    <select
                                        id="attendanceTypeMulti"
                                        name="attendanceType"
                                        value={formData.attendanceType}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                        style={{ background: "#f0f0f5", color: "#222" }}
                                    >
                                        <option value="full-day">Full Day</option>
                                        <option value="fn">Forenoon (FN)</option>
                                        <option value="an">Afternoon (AN)</option>
                                    </select>
                                </div>
                            </div>
                            
                            {formData.selectedDates.length > 0 && (
                                <div className="selected-dates">
                                    <h4>Selected Dates:</h4>
                                    <div className="dates-list">
                                        {formData.selectedDates.map((date, index) => (
                                            <div key={index} className="date-chip" style={{ background: "#e1e8ed", color: "#222" }}>
                                                <span>{new Date(date).toLocaleDateString()}</span>
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeDateFromMultiple(date)}
                                                    className="remove-date-btn"
                                                    style={{ color: "#c0392b" }}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="form-actions" data-aos="zoom-in">
                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={isSubmitting}
                        style={{ background: "#4b6cb7", color: "#fff" }}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner"></span>
                                Submitting...
                            </>
                        ) : (
                            '🚀 Submit OD Application'
                        )}
                    </button>
                </div>

                {submitMessage && (
                    <div className={`submit-message ${submitStatus}`} style={{ 
                        color: submitStatus === 'success' ? "#27ae60" : submitStatus === 'error' ? "#c0392b" : "#f39c12",
                        background: submitStatus === 'success' ? "#d5f4e6" : submitStatus === 'error' ? "#fdeaea" : "#fef9e7",
                        border: `1px solid ${submitStatus === 'success' ? "#27ae60" : submitStatus === 'error' ? "#c0392b" : "#f39c12"}`,
                        borderRadius: "8px",
                        padding: "12px",
                        marginTop: "20px",
                        textAlign: "center",
                        fontWeight: "500"
                    }}>
                        {submitMessage}
                    </div>
                )}
            </form>
        </div>
    </div>
);
};

export default ClubOD;