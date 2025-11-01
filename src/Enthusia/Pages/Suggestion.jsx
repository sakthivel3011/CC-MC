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
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700;800;900&display=swap');
      @import url('https://unpkg.com/aos@2.3.1/dist/aos.css');

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .sb-suggestion-container {
        min-height: 100vh;
        background: #0a0e27;
        font-family: 'Inter', sans-serif;
        padding: 60px 20px;
        position: relative;
        overflow: hidden;
      }

      .sb-stars-bg {
        position: absolute;
        inset: 0;
        background: 
          radial-gradient(2px 2px at 20% 30%, #00ff88, transparent),
          radial-gradient(2px 2px at 60% 70%, #00d4ff, transparent),
          radial-gradient(2px 2px at 50% 50%, #ff0080, transparent),
          radial-gradient(2px 2px at 80% 10%, #ffea00, transparent),
          radial-gradient(2px 2px at 90% 60%, #ff6b00, transparent),
          radial-gradient(3px 3px at 10% 80%, #a855f7, transparent);
        background-size: 200% 200%;
        animation: sb-stars-move 20s ease infinite;
        opacity: 0.4;
      }

      @keyframes sb-stars-move {
        0%, 100% { background-position: 0% 0%; }
        50% { background-position: 100% 100%; }
      }

      .sb-glow-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        opacity: 0.6;
        animation: sb-orb-float 15s ease-in-out infinite;
      }

      .sb-glow-orb-1 {
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, #00ff88 0%, transparent 70%);
        top: -200px;
        left: -200px;
        animation-delay: 0s;
      }

      .sb-glow-orb-2 {
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, #ff0080 0%, transparent 70%);
        bottom: -300px;
        right: -300px;
        animation-delay: 5s;
      }

      .sb-glow-orb-3 {
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, #00d4ff 0%, transparent 70%);
        top: 40%;
        right: 10%;
        animation-delay: 10s;
      }

      @keyframes sb-orb-float {
        0%, 100% {
          transform: translate(0, 0) scale(1);
        }
        33% {
          transform: translate(50px, -80px) scale(1.1);
        }
        66% {
          transform: translate(-60px, 60px) scale(0.9);
        }
      }

      .sb-form-wrapper {
        max-width: 900px;
        margin: 0 auto;
        position: relative;
        z-index: 10;
        background: rgba(15, 23, 42, 0.7);
        backdrop-filter: blur(40px) saturate(180%);
        border-radius: 32px;
        padding: 60px 50px;
        border: 2px solid transparent;
        background-image: 
          linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)),
          linear-gradient(135deg, #00ff88, #00d4ff, #ff0080, #ffea00);
        background-origin: border-box;
        background-clip: padding-box, border-box;
        box-shadow: 
          0 0 80px rgba(0, 255, 136, 0.2),
          0 0 40px rgba(255, 0, 128, 0.2),
          0 30px 90px rgba(0, 0, 0, 0.5);
        animation: sb-form-entrance 1s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      @keyframes sb-form-entrance {
        from {
          opacity: 0;
          transform: translateY(100px) scale(0.9) rotateX(20deg);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1) rotateX(0);
        }
      }

      .sb-form-header {
        text-align: center;
        margin-bottom: 50px;
        position: relative;
      }

      .sb-version-badge {
        display: inline-block;
        background: linear-gradient(135deg, #00ff88, #00d4ff);
        color: #0a0e27;
        padding: 8px 24px;
        border-radius: 50px;
        font-size: 0.9rem;
        font-weight: 800;
        margin-bottom: 20px;
        letter-spacing: 1px;
        text-transform: uppercase;
        box-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
        animation: sb-badge-glow 2s ease-in-out infinite;
      }

      @keyframes sb-badge-glow {
        0%, 100% {
          box-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
          transform: scale(1);
        }
        50% {
          box-shadow: 0 0 50px rgba(0, 212, 255, 0.8);
          transform: scale(1.05);
        }
      }

      .sb-title {
        font-size: 4.5rem;
        font-weight: 900;
        font-family: 'Space Grotesk', sans-serif;
        background: linear-gradient(135deg, #00ff88 0%, #00d4ff 25%, #ff0080 50%, #ffea00 75%, #ff6b00 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        background-size: 200% auto;
        animation: sb-title-gradient 3s linear infinite;
        margin-bottom: 15px;
        letter-spacing: -2px;
        text-shadow: 0 0 80px rgba(0, 255, 136, 0.5);
        position: relative;
      }

      @keyframes sb-title-gradient {
        to {
          background-position: 200% center;
        }
      }

      .sb-title::after {
        content: 'Enthusia-2026';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        background: linear-gradient(135deg, #00ff88 0%, #00d4ff 25%, #ff0080 50%, #ffea00 75%, #ff6b00 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: blur(20px);
        opacity: 0.5;
        z-index: -1;
      }

      .sb-subtitle {
        font-size: 1.8rem;
        font-weight: 700;
        background: linear-gradient(135deg, #00d4ff, #a855f7);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: 2px;
        text-transform: uppercase;
      }

      .sb-form {
        display: grid;
        gap: 32px;
      }

      .sb-form-group {
        position: relative;
        animation: sb-field-appear 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
      }

      .sb-form-group:nth-child(1) { animation-delay: 0.1s; }
      .sb-form-group:nth-child(2) { animation-delay: 0.2s; }
      .sb-form-group:nth-child(3) { animation-delay: 0.3s; }
      .sb-form-group:nth-child(4) { animation-delay: 0.4s; }
      .sb-form-group:nth-child(5) { animation-delay: 0.5s; }

      @keyframes sb-field-appear {
        from {
          opacity: 0;
          transform: translateY(40px) rotateX(-15deg);
        }
        to {
          opacity: 1;
          transform: translateY(0) rotateX(0);
        }
      }

      .sb-label {
        display: block;
        font-weight: 800;
        font-size: 1.1rem;
        margin-bottom: 12px;
        color: #00ff88;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
      }

      .sb-required {
        color: #ff0080;
        margin-left: 6px;
        font-size: 1.3rem;
        text-shadow: 0 0 20px rgba(255, 0, 128, 0.8);
      }

      .sb-error-message {
        color: #ff0080;
        font-size: 0.9rem;
        margin-top: 8px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 6px;
        text-shadow: 0 0 10px rgba(255, 0, 128, 0.4);
      }

      .sb-error-icon {
        width: 16px;
        height: 16px;
      }

      .sb-input,
      .sb-textarea,
      .sb-select {
        width: 100%;
        padding: 20px 24px;
        background: rgba(10, 14, 39, 0.6);
        border: 2px solid rgba(0, 255, 136, 0.2);
        border-radius: 16px;
        font-size: 1.05rem;
        font-family: 'Inter', sans-serif;
        color: #ffffff;
        font-weight: 500;
        outline: none;
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .sb-input::placeholder,
      .sb-textarea::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }

      .sb-input:focus,
      .sb-textarea:focus,
      .sb-select:focus {
        background: rgba(0, 255, 136, 0.05);
        border-color: #00ff88;
        box-shadow: 
          0 0 0 4px rgba(0, 255, 136, 0.1),
          0 0 40px rgba(0, 255, 136, 0.3),
          inset 0 0 20px rgba(0, 255, 136, 0.05);
        transform: translateY(-4px) scale(1.01);
      }

      .sb-input:hover,
      .sb-textarea:hover,
      .sb-select:hover {
        border-color: #00d4ff;
        box-shadow: 0 0 30px rgba(0, 212, 255, 0.2);
        transform: translateY(-2px);
      }

      .sb-textarea {
        resize: vertical;
        min-height: 150px;
        line-height: 1.7;
      }

      .sb-select {
        cursor: pointer;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2300ff88' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 20px center;
        background-size: 24px;
        padding-right: 60px;
      }

      .sb-select option {
        background: #0a0e27;
        color: #ffffff;
        padding: 10px;
      }

      .sb-submit-wrapper {
        margin-top: 40px;
        text-align: center;
      }

      .sb-submit-btn {
        background: linear-gradient(135deg, #00ff88, #00d4ff, #ff0080);
        background-size: 200% auto;
        color: #0a0e27;
        border: none;
        padding: 22px 80px;
        font-size: 1.3rem;
        font-weight: 900;
        border-radius: 50px;
        cursor: pointer;
        font-family: 'Space Grotesk', sans-serif;
        letter-spacing: 2px;
        text-transform: uppercase;
        position: relative;
        overflow: hidden;
        box-shadow: 
          0 0 60px rgba(0, 255, 136, 0.6),
          0 20px 40px rgba(0, 0, 0, 0.4);
        transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .sb-submit-btn::before {
        content: '';
        position: absolute;
        inset: -2px;
        background: linear-gradient(135deg, #ffea00, #ff6b00, #ff0080);
        border-radius: 50px;
        opacity: 0;
        transition: opacity 0.5s;
        z-index: -1;
      }

      .sb-submit-btn:hover::before {
        opacity: 1;
      }

      .sb-submit-btn:hover {
        background-position: 200% center;
        transform: translateY(-6px) scale(1.08);
        box-shadow: 
          0 0 100px rgba(0, 255, 136, 0.8),
          0 0 60px rgba(255, 0, 128, 0.6),
          0 30px 60px rgba(0, 0, 0, 0.5);
      }

      .sb-submit-btn:active {
        transform: translateY(-3px) scale(1.05);
      }

      .sb-submit-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
      }

      .sb-spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 4px solid rgba(10, 14, 39, 0.3);
        border-top-color: #0a0e27;
        border-radius: 50%;
        animation: sb-spin 0.6s linear infinite;
        margin-right: 12px;
      }

      @keyframes sb-spin {
        to { transform: rotate(360deg); }
      }

      .sb-notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 15px;
        max-width: 400px;
      }

      .sb-notification {
        background: rgba(10, 14, 39, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 20px 24px;
        display: flex;
        align-items: center;
        gap: 16px;
        box-shadow: 
          0 20px 60px rgba(0, 0, 0, 0.5),
          0 0 0 1px rgba(255, 255, 255, 0.1);
        animation: sb-notification-slide 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        border: 2px solid;
      }

      @keyframes sb-notification-slide {
        from {
          opacity: 0;
          transform: translateX(400px) rotateZ(10deg);
        }
        to {
          opacity: 1;
          transform: translateX(0) rotateZ(0);
        }
      }

      .sb-notification.sb-success {
        border-color: #00ff88;
        box-shadow: 
          0 20px 60px rgba(0, 0, 0, 0.5),
          0 0 40px rgba(0, 255, 136, 0.3);
      }

      .sb-notification.sb-error {
        border-color: #ff0080;
        box-shadow: 
          0 20px 60px rgba(0, 0, 0, 0.5),
          0 0 40px rgba(255, 0, 128, 0.3);
      }

      .sb-notification-icon {
        width: 32px;
        height: 32px;
        flex-shrink: 0;
        stroke-width: 3;
      }

      .sb-notification.sb-success .sb-notification-icon {
        color: #00ff88;
        filter: drop-shadow(0 0 10px rgba(0, 255, 136, 0.8));
      }

      .sb-notification.sb-error .sb-notification-icon {
        color: #ff0080;
        filter: drop-shadow(0 0 10px rgba(255, 0, 128, 0.8));
      }

      .sb-notification-text {
        flex: 1;
        color: #ffffff;
        font-weight: 600;
        font-size: 1rem;
        line-height: 1.4;
      }

      .sb-notification-close {
        width: 24px;
        height: 24px;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.5);
        transition: all 0.3s;
        flex-shrink: 0;
      }

      .sb-notification-close:hover {
        color: #ffffff;
        transform: rotate(90deg) scale(1.2);
      }

      @media (max-width: 768px) {
        .sb-suggestion-container {
          padding: 40px 15px;
        }

        .sb-form-wrapper {
          padding: 40px 25px;
          border-radius: 24px;
        }

        .sb-title {
          font-size: 3rem;
        }

        .sb-subtitle {
          font-size: 1.3rem;
        }

        .sb-submit-btn {
          padding: 18px 50px;
          font-size: 1.1rem;
          width: 100%;
        }

        .sb-notification-container {
          left: 15px;
          right: 15px;
          max-width: none;
        }

        .sb-glow-orb {
          opacity: 0.3;
        }
      }

      @media (max-width: 480px) {
        .sb-title {
          font-size: 2.2rem;
        }

        .sb-subtitle {
          font-size: 1.1rem;
        }

        .sb-input,
        .sb-textarea,
        .sb-select {
          padding: 16px 20px;
          font-size: 1rem;
        }

        .sb-form-wrapper {
          padding: 35px 20px;
        }
      }
    `;
    document.head.appendChild(style);

    const aosScript = document.createElement('script');
    aosScript.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
    aosScript.onload = () => {
      if (window.AOS) {
        window.AOS.init({
          duration: 1200,
          once: true,
          offset: 100,
          easing: 'ease-out-cubic'
        });
      }
    };
    document.head.appendChild(aosScript);

    return () => {
      document.head.removeChild(style);
      if (aosScript.parentNode) {
        document.head.removeChild(aosScript);
      }
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="sb-notification-container">
        {notifications.map(notif => (
          <div key={notif.id} className={`sb-notification sb-${notif.type}`}>
            {notif.type === 'success' ? (
              <svg className="sb-notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="sb-notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            <span className="sb-notification-text">{notif.message}</span>
            <svg 
              className="sb-notification-close" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              onClick={() => removeNotification(notif.id)}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        ))}
      </div>

      <div className="sb-suggestion-container">
        <div className="sb-stars-bg"></div>
        <div className="sb-glow-orb sb-glow-orb-1"></div>
        <div className="sb-glow-orb sb-glow-orb-2"></div>
        <div className="sb-glow-orb sb-glow-orb-3"></div>

        <div className="sb-form-wrapper" data-aos="fade-up">
          <div className="sb-form-header">
            
            <h1 className="sb-title">Enthusia-2026</h1>
            <p className="sb-subtitle">Suggestion Box</p>
          </div>

          <div className="sb-form">
            <div className="sb-form-group">
              <label htmlFor="name" className="sb-label">
                Name <span className="sb-required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="Enter your full name"
                className="sb-input"
              />
              {getFieldError('name') && (
                <div className="sb-error-message">
                  <svg className="sb-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {getFieldError('name')}
                </div>
              )}
            </div>

            <div className="sb-form-group">
              <label htmlFor="rollNo" className="sb-label">
                Roll Number <span className="sb-required">*</span>
              </label>
              <input
                type="text"
                id="rollNo"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="Enter your roll number"
                className="sb-input"
              />
              {getFieldError('rollNo') && (
                <div className="sb-error-message">
                  <svg className="sb-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {getFieldError('rollNo')}
                </div>
              )}
            </div>

            <div className="sb-form-group">
              <label htmlFor="lastYearQueries" className="sb-label">
                Last Year's Queries <span className="sb-required">*</span>
              </label>
              <textarea
                id="lastYearQueries"
                name="lastYearQueries"
                value={formData.lastYearQueries}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                rows="4"
                placeholder="Share your queries or feedback from last year's event..."
                className="sb-textarea"
              />
              {getFieldError('lastYearQueries') && (
                <div className="sb-error-message">
                  <svg className="sb-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {getFieldError('lastYearQueries')}
                </div>
              )}
            </div>

            <div className="sb-form-group">
              <label htmlFor="thisYearSuggestions" className="sb-label">
                This Year's Suggestions <span className="sb-required">*</span>
              </label>
              <textarea
                id="thisYearSuggestions"
                name="thisYearSuggestions"
                value={formData.thisYearSuggestions}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                rows="4"
                placeholder="What are your suggestions for Enthusia-2026?"
                className="sb-textarea"
              />
              {getFieldError('thisYearSuggestions') && (
                <div className="sb-error-message">
                  <svg className="sb-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {getFieldError('thisYearSuggestions')}
                </div>
              )}
            </div>

            <div className="sb-form-group">
              <label htmlFor="workingRole" className="sb-label">
                Your Working Role <span className="sb-required">*</span>
              </label>
              <select
                id="workingRole"
                name="workingRole"
                value={formData.workingRole}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className="sb-select"
              >
                <option value="">Select your role</option>
                {roles.map((role, index) => (
                  <option key={index} value={role}>{role}</option>
                ))}
                </select>
                {getFieldError('workingRole') && (
                  <div className="sb-error-message">
                    <svg className="sb-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {getFieldError('workingRole')}
                  </div>
                )}
            </div>            <div className="sb-submit-wrapper">
              <button 
                type="button"
                className="sb-submit-btn"
                disabled={isSubmitting || !isFormValid()}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <>
                    <span className="sb-spinner"></span>
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