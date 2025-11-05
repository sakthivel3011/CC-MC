import React, { useState, useEffect } from 'react';

const SuggestionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    lastYearQueries: '',
    thisYearSuggestions: '',
    workingRole: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    rollNo: false,
    lastYearQueries: false,
    thisYearSuggestions: false,
    workingRole: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&display=swap');

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        overflow-x: hidden;
      }

      .modern-container {
        min-height: 100vh;
        background: linear-gradient(145deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%);
        font-family: 'Poppins', sans-serif;
        padding: 80px 20px;
        position: relative;
        overflow: hidden;
      }

      .particles {
        position: absolute;
        inset: 0;
        overflow: hidden;
      }

      .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: white;
        border-radius: 50%;
        animation: float 15s infinite;
        opacity: 0.6;
      }

      .particle:nth-child(1) { left: 10%; top: 20%; animation-delay: 0s; }
      .particle:nth-child(2) { left: 30%; top: 60%; animation-delay: 2s; }
      .particle:nth-child(3) { left: 50%; top: 30%; animation-delay: 4s; }
      .particle:nth-child(4) { left: 70%; top: 70%; animation-delay: 1s; }
      .particle:nth-child(5) { left: 85%; top: 40%; animation-delay: 3s; }
      .particle:nth-child(6) { left: 15%; top: 80%; animation-delay: 5s; }

      @keyframes float {
        0%, 100% {
          transform: translateY(0) translateX(0);
          opacity: 0.6;
        }
        25% {
          transform: translateY(-100px) translateX(50px);
          opacity: 0.9;
        }
        50% {
          transform: translateY(-50px) translateX(-50px);
          opacity: 0.4;
        }
        75% {
          transform: translateY(-150px) translateX(30px);
          opacity: 0.7;
        }
      }

      .glow-effect {
        position: absolute;
        width: 600px;
        height: 600px;
        border-radius: 50%;
        filter: blur(120px);
        opacity: 0.3;
        pointer-events: none;
      }

      .glow-1 {
        background: linear-gradient(135deg, #ec4899, #8b5cf6);
        top: -100px;
        left: -100px;
        animation: pulse 8s ease-in-out infinite;
      }

      .glow-2 {
        background: linear-gradient(135deg, #06b6d4, #3b82f6);
        bottom: -100px;
        right: -100px;
        animation: pulse 10s ease-in-out infinite reverse;
      }

      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
          opacity: 0.3;
        }
        50% {
          transform: scale(1.2);
          opacity: 0.5;
        }
      }

      .form-card {
        max-width: 850px;
        margin: 0 auto;
        position: relative;
        z-index: 10;
        background: rgba(30, 27, 75, 0.6);
        backdrop-filter: blur(30px);
        border-radius: 30px;
        padding: 60px 50px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 
          0 25px 50px rgba(0, 0, 0, 0.5),
          inset 0 1px 0 rgba(255, 255, 255, 0.1);
        animation: slideUp 1s ease-out;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(60px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .header-section {
        text-align: center;
        margin-bottom: 50px;
      }

      .badge {
        display: inline-block;
        background: linear-gradient(135deg, #ec4899, #8b5cf6);
        color: white;
        padding: 10px 30px;
        border-radius: 50px;
        font-size: 0.85rem;
        font-weight: 700;
        margin-bottom: 25px;
        letter-spacing: 2px;
        text-transform: uppercase;
        box-shadow: 0 10px 30px rgba(236, 72, 153, 0.4);
        animation: glow 3s ease-in-out infinite;
      }

      @keyframes glow {
        0%, 100% {
          box-shadow: 0 10px 30px rgba(236, 72, 153, 0.4);
        }
        50% {
          box-shadow: 0 10px 40px rgba(139, 92, 246, 0.6);
        }
      }

      .main-title {
        font-size: 4.5rem;
        font-weight: 900;
        font-family: 'Orbitron', sans-serif;
        background: linear-gradient(135deg, #ec4899, #8b5cf6, #06b6d4, #10b981);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        background-size: 300% 300%;
        animation: gradient-shift 5s ease infinite;
        margin-bottom: 15px;
        letter-spacing: -3px;
        line-height: 1.1;
      }

      @keyframes gradient-shift {
        0%, 100% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
      }

      .subtitle {
        font-size: 1.6rem;
        font-weight: 600;
        color: #a78bfa;
        letter-spacing: 3px;
        text-transform: uppercase;
      }

      .form-grid {
        display: grid;
        gap: 30px;
      }

      .input-group {
        position: relative;
        animation: fadeInUp 0.8s ease-out backwards;
      }

      .input-group:nth-child(1) { animation-delay: 0.1s; }
      .input-group:nth-child(2) { animation-delay: 0.2s; }
      .input-group:nth-child(3) { animation-delay: 0.3s; }
      .input-group:nth-child(4) { animation-delay: 0.4s; }
      .input-group:nth-child(5) { animation-delay: 0.5s; }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .input-label {
        display: block;
        font-weight: 700;
        font-size: 1rem;
        margin-bottom: 12px;
        color: #7951eeff;
        text-transform: uppercase;
        letter-spacing: 1px;
        
      }

      .required-star {
        color: #ec4899;
        margin-left: 5px;
        font-size: 1.2rem;
      }

      .input-field,
      .textarea-field,
      .select-field {
        width: 100%;
        padding: 18px 22px;
        background: #1a1f3a !important;
        border: 2px solid rgba(167, 139, 250, 0.3);
        border-radius: 15px;
        font-size: 1rem;
        font-family: 'Poppins', sans-serif;
        color: #ffffff !important;
        font-weight: 500;
        outline: none;
        transition: all 0.3s ease;
      }

      .input-field::placeholder,
      .textarea-field::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }

      .input-field:focus,
      .textarea-field:focus,
      .select-field:focus {
        background: #1a1f3a !important;
        border-color: #8b5cf6;
        box-shadow: 
          0 0 0 4px rgba(139, 92, 246, 0.2),
          0 10px 30px rgba(139, 92, 246, 0.3);
        transform: translateY(-2px);
      }
      }

      .input-field:hover,
      .textarea-field:hover,
      .select-field:hover {
        border-color: #ec4899;
      }

      .textarea-field {
        resize: vertical;
        min-height: 140px;
        line-height: 1.6;
      }

      .select-field {
        cursor: pointer;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23a78bfa' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 18px center;
        padding-right: 55px;
      }

      .select-field option {
        background: #1e1b4b;
        color: #ffffff;
        padding: 12px;
      }

      .error-msg {
        color: #ec4899;
        font-size: 0.875rem;
        margin-top: 8px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .error-icon {
        width: 16px;
        height: 16px;
      }

      .submit-section {
        margin-top: 45px;
        text-align: center;
      }

      .submit-button {
        background: linear-gradient(135deg, #ec4899, #8b5cf6, #06b6d4);
        background-size: 200% auto;
        color: #ffffff;
        border: none;
        padding: 20px 70px;
        font-size: 1.2rem;
        font-weight: 800;
        border-radius: 50px;
        cursor: pointer;
        font-family: 'Orbitron', sans-serif;
        letter-spacing: 2px;
        text-transform: uppercase;
        position: relative;
        overflow: hidden;
        box-shadow: 
          0 10px 40px rgba(236, 72, 153, 0.5),
          0 0 0 0 rgba(139, 92, 246, 0.4);
        transition: all 0.4s ease;
        animation: buttonPulse 2s ease-in-out infinite;
      }

      @keyframes buttonPulse {
        0%, 100% {
          box-shadow: 
            0 10px 40px rgba(236, 72, 153, 0.5),
            0 0 0 0 rgba(139, 92, 246, 0.4);
        }
        50% {
          box-shadow: 
            0 10px 50px rgba(236, 72, 153, 0.7),
            0 0 0 10px rgba(139, 92, 246, 0);
        }
      }

      .submit-button:hover:not(:disabled) {
        background-position: right center;
        transform: translateY(-5px) scale(1.05);
        box-shadow: 
          0 20px 50px rgba(236, 72, 153, 0.6),
          0 0 80px rgba(139, 92, 246, 0.4);
      }

      .submit-button:active:not(:disabled) {
        transform: translateY(-2px) scale(1.02);
      }

      .submit-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .loading-spinner {
        display: inline-block;
        width: 18px;
        height: 18px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top-color: #ffffff;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
        margin-right: 10px;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .notification-wrapper {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 15px;
        max-width: 400px;
      }

      .notification {
        background: rgba(30, 27, 75, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 18px;
        padding: 18px 22px;
        display: flex;
        align-items: center;
        gap: 14px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        animation: slideIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        border: 2px solid;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(400px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .notification.success {
        border-color: #10b981;
        box-shadow: 0 10px 40px rgba(16, 185, 129, 0.3);
      }

      .notification.error {
        border-color: #ec4899;
        box-shadow: 0 10px 40px rgba(236, 72, 153, 0.3);
      }

      .notification-icon {
        width: 28px;
        height: 28px;
        flex-shrink: 0;
      }

      .notification.success .notification-icon {
        color: #10b981;
      }

      .notification.error .notification-icon {
        color: #ec4899;
      }

      .notification-message {
        flex: 1;
        color: #ffffff;
        font-weight: 600;
        font-size: 0.95rem;
      }

      .notification-close {
        width: 22px;
        height: 22px;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.5);
        transition: all 0.3s;
        flex-shrink: 0;
      }

      .notification-close:hover {
        color: #ffffff;
        transform: rotate(90deg);
      }

      @media (max-width: 768px) {
        .modern-container {
          padding: 50px 15px;
        }

        .form-card {
          padding: 40px 25px;
          border-radius: 25px;
        }

        .main-title {
          font-size: 3rem;
        }

        .subtitle {
          font-size: 1.2rem;
        }

        .submit-button {
          padding: 18px 50px;
          font-size: 1.1rem;
          width: 100%;
        }

        .notification-wrapper {
          left: 15px;
          right: 15px;
          max-width: none;
        }
      }

      @media (max-width: 480px) {
        .main-title {
          font-size: 2.5rem;
        }

        .subtitle {
          font-size: 1rem;
        }

        .input-field,
        .textarea-field,
        .select-field {
          padding: 16px 18px;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const roles = [
    'Student',
    'Core Committee Member',
    'Volunteer',
    'Technical Team',
    'Media Team',
    'Design Team',
    'Hospitality Team',
    'Logistics Team',
    'Documentation Team',
    'Other'
  ];

  const addNotification = (type, message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, message }]);
    
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const getFieldError = (fieldName) => {
    if (!touched[fieldName]) return '';
    const value = formData[fieldName];
    if (!value || value.trim() === '') {
      return 'This field is required';
    }
    return '';
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.rollNo.trim() !== '' &&
      formData.lastYearQueries.trim() !== '' &&
      formData.thisYearSuggestions.trim() !== '' &&
      formData.workingRole !== ''
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    setIsSubmitting(true);

    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbzh2BNFCLYgw2LamJhJr33GFfoNVrZ_yVf2Cwqe5bY91gaOq2JIsTsISHUQIvU81gsr/exec';
      
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        })
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        addNotification('success', '🎉 Your suggestion has been submitted successfully!');
        setFormData({
          name: '',
          rollNo: '',
          lastYearQueries: '',
          thisYearSuggestions: '',
          workingRole: ''
        });
        setTouched({
          name: false,
          rollNo: false,
          lastYearQueries: false,
          thisYearSuggestions: false,
          workingRole: false
        });
      } else if (result.status === 'duplicate' || result.message?.includes('already registered') || result.message?.includes('duplicate')) {
        addNotification('error', '⚠️ This user is already registered! You have already submitted a suggestion.');
      } else {
        addNotification('error', '❌ Something went wrong. Please try again!');
      }
    } catch (error) {
      console.error('Error:', error);
      addNotification('success', '🎉 Your suggestion has been submitted successfully!');
      setFormData({
        name: '',
        rollNo: '',
        lastYearQueries: '',
        thisYearSuggestions: '',
        workingRole: ''
      });
      setTouched({
        name: false,
        rollNo: false,
        lastYearQueries: false,
        thisYearSuggestions: false,
        workingRole: false
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="notification-wrapper">
        {notifications.map(notif => (
          <div key={notif.id} className={`notification ${notif.type}`}>
            {notif.type === 'success' ? (
              <svg className="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            <span className="notification-message">{notif.message}</span>
            <svg 
              className="notification-close" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              strokeWidth="2"
              onClick={() => removeNotification(notif.id)}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        ))}
      </div>

      <div className="modern-container">
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        <div className="glow-effect glow-1"></div>
        <div className="glow-effect glow-2"></div>

        <div className="form-card">
          <div className="header-section">
            <div className="badge">Event 2026</div>
            <h1 className="main-title">Enthusia-2026</h1>
            <p className="subtitle">Suggestion Box</p>
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="name" className="input-label" style={{ color: '#ffffff' }}>
                Name  <span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your full name"
                className="input-field"
              />
              {getFieldError('name') && (
                <div className="error-msg">
                  <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {getFieldError('name')}
                </div>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="rollNo" className="input-label" style={{ color: '#ffffff' }}>
                Roll Number <span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="rollNo"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your roll number"
                className="input-field"
              />
              {getFieldError('rollNo') && (
                <div className="error-msg">
                  <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {getFieldError('rollNo')}
                </div>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="lastYearQueries" className="input-label" style={{ color: '#ffffff' }}>
                Last Year's Queries <span className="required-star">*</span>
              </label>
              <textarea
                id="lastYearQueries"
                name="lastYearQueries"
                value={formData.lastYearQueries}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Share your queries or feedback from last year's event..."
                className="textarea-field"
              />
              {getFieldError('lastYearQueries') && (
                <div className="error-msg">
                  <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {getFieldError('lastYearQueries')}
                </div>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="thisYearSuggestions" className="input-label" style={{ color: '#ffffff' }}>
                This Year's Suggestions <span className="required-star">*</span>
              </label>
              <textarea
                id="thisYearSuggestions"
                name="thisYearSuggestions"
                value={formData.thisYearSuggestions}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="What are your suggestions for Enthusia-2026?"
                className="textarea-field"
              />
              {getFieldError('thisYearSuggestions') && (
                <div className="error-msg">
                  <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {getFieldError('thisYearSuggestions')}
                </div>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="workingRole" className="input-label" style={{ color: '#ffffff' }}>
                Your Working Role <span className="required-star">*</span>
              </label>
              <select
                id="workingRole"
                name="workingRole"
                value={formData.workingRole}
                onChange={handleChange}
                onBlur={handleBlur}
                className="select-field"
              >
                <option value="">Select your role</option>
                {roles.map((role, index) => (
                  <option key={index} value={role}>{role}</option>
                ))}
              </select>
              {getFieldError('workingRole') && (
                <div className="error-msg">
                  <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {getFieldError('workingRole')}
                </div>
              )}
            </div>

            <div className="submit-section">
              <button 
                type="button"
                className="submit-button"
                disabled={isSubmitting || !isFormValid()}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Submitting...
                  </>
                ) : (
                  'Submit Suggestion'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuggestionForm;