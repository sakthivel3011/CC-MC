import React, { useState, useEffect } from 'react';
import { UserPlus, Calendar, Users, CheckCircle, AlertCircle } from 'lucide-react';

const GuestMeetRegistration = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    rollNo: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [animatedCount, setAnimatedCount] = useState(0);

  // Google Apps Script Web App URL - Replace with your deployed script URL
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbysTNasK0yT5WRwJOaT1UK96xV_gnvqTjhe7ugn0EM7qu-My_Ssh4-_AJLV-3jMLqg/exec';

  useEffect(() => {
    // Initialize AOS
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js';
    script.onload = () => {
      if (window.AOS) {
        window.AOS.init({
          duration: 800,
          once: false,
          offset: 100
        });
      }
    };
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css';
    document.head.appendChild(link);

    // Load registered students
    loadRegisteredStudents();
  }, []);

  // Animate count effect
  useEffect(() => {
    const targetCount = registeredStudents.length;
    let currentCount = 0;
    const increment = Math.ceil(targetCount / 20); // Animation speed
    
    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= targetCount) {
        currentCount = targetCount;
        clearInterval(timer);
      }
      setAnimatedCount(currentCount);
    }, 50); // 50ms intervals for smooth animation

    return () => clearInterval(timer);
  }, [registeredStudents.length]);

  const loadRegisteredStudents = async () => {
    try {
      const response = await fetch(`${SCRIPT_URL}?action=getStudents`);
      const data = await response.json();
      if (data.success) {
        setRegisteredStudents(data.students || []);
      }
    } catch (error) {
      console.error('Error loading students:', error);
      // Show some sample data for demonstration
      setRegisteredStudents([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.studentName || !formData.rollNo || !formData.reason) {
      setSubmitStatus({ type: 'error', message: 'Please fill all fields!' });
      return;
    }

    // Check if roll number already exists
    const rollExists = registeredStudents.some(
      student => student.rollNo.toLowerCase() === formData.rollNo.toLowerCase()
    );

    if (rollExists) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'This roll number is already registered!' 
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'addStudent',
          ...formData,
          timestamp: new Date().toISOString()
        })
      });

      // Since no-cors doesn't return response, assume success
      setTimeout(() => {
        setSubmitStatus({ 
          type: 'success', 
          message: 'Registration successful!' 
        });
        
        // Add to local state
        setRegisteredStudents(prev => [...prev, formData]);
        
        // Reset form
        setFormData({ studentName: '', rollNo: '', reason: '' });
        setIsSubmitting(false);
        
        // Clear status after 3 seconds
        setTimeout(() => setSubmitStatus(null), 3000);
      }, 1500);

    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Registration failed. Please try again.' 
      });
    }
  };

  return (
    <div className="guest-meet-container">
      <style>{`
        :root {
          --enthusia-navy: #0a2540;
          --enthusia-dark-blue: #1a365d;
          --enthusia-blue: #1a5f7a;
          --enthusia-royal-blue: #4169e1;
          --enthusia-sky-blue: #87ceeb;
          --enthusia-light-blue: #e1f5fe;
          --enthusia-gold: #ffd700;
          --enthusia-light-gold: #fff9c4;
          --enthusia-coral: #ff7f50;
          --enthusia-white: #ffffff;
          --enthusia-off-white: #f7fafc;
          --enthusia-light-gray: #e2e8f0;
          --enthusia-shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.3);
          --enthusia-glow-blue: 0 0 20px rgba(65, 105, 225, 0.3);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .guest-meet-container {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--enthusia-navy) 0%, var(--enthusia-blue) 100%);
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .header {
          text-align: center;
          color: var(--enthusia-white);
          margin-bottom: 40px;
          padding: 20px;
        }

        .header h1 {
          font-size: clamp(28px, 5vw, 48px);
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .header-icon {
          font-size: 60px;
          margin-bottom: 15px;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .content-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
        }

        @media (min-width: 1024px) {
          .content-wrapper {
            grid-template-columns: 1fr 1.5fr;
          }
        }

        .form-card {
          background: var(--enthusia-white);
          border-radius: 20px;
          padding: 30px;
          box-shadow: var(--enthusia-shadow-lg);
          position: relative;
          overflow: hidden;
        }

        .form-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, var(--enthusia-royal-blue), var(--enthusia-gold));
        }

        .form-title {
          font-size: clamp(22px, 4vw, 28px);
          color: var(--enthusia-navy);
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          color: var(--enthusia-dark-blue);
          font-weight: 600;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid var(--enthusia-light-gray);
          border-radius: 10px;
          font-size: 16px;
          color: var(--enthusia-navy);
          background-color: var(--enthusia-white);
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--enthusia-royal-blue);
          box-shadow: var(--enthusia-glow-blue);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .submit-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, var(--enthusia-royal-blue), var(--enthusia-blue));
          color: var(--enthusia-white);
          border: none;
          border-radius: 10px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(65, 105, 225, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .submit-btn.submitting {
          background: var(--enthusia-blue);
        }

        .submit-btn-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .status-message {
          margin-top: 15px;
          padding: 12px 15px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .status-message.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .status-message.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .students-section {
          background: var(--enthusia-white);
          border-radius: 20px;
          padding: 30px;
          box-shadow: var(--enthusia-shadow-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
        }

        .count-display {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .count-icon {
          color: var(--enthusia-royal-blue);
          margin-bottom: 10px;
        }

        .count-number {
          font-size: clamp(80px, 15vw, 120px);
          font-weight: bold;
          color: var(--enthusia-navy);
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
          line-height: 1;
        }

        .count-label {
          font-size: clamp(20px, 4vw, 28px);
          color: var(--enthusia-blue);
          font-weight: 600;
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .guest-meet-container {
            padding: 15px;
          }

          .form-card,
          .students-section {
            padding: 20px;
          }

          .count-number {
            font-size: clamp(60px, 12vw, 80px);
          }

          .count-label {
            font-size: clamp(16px, 3vw, 20px);
          }
        }
      `}</style>

      <div className="header" data-aos="fade-down">
        <div className="header-icon"></div>
        <h1>Enthusia 2026 – Guest Meet</h1>
        <p>Secure your spot for the special guest gathering at Enthusia 2026.</p>
      </div>

      <div className="content-wrapper">
        <div className="form-card" data-aos="fade-right">
          <h2 className="form-title">
            <UserPlus size={28} />
            Student Registration
          </h2>
          
          <div>
            <div className="form-group" data-aos="fade-up" data-aos-delay="100">
              <label htmlFor="studentName">Student Name *</label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group" data-aos="fade-up" data-aos-delay="200">
              <label htmlFor="rollNo">Roll Number *</label>
              <input
                type="text"
                id="rollNo"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleInputChange}
                placeholder="Enter your roll number"
              />
            </div>

            <div className="form-group" data-aos="fade-up" data-aos-delay="300">
              <label htmlFor="reason">Reason for Guest Meet *</label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Why do you want to attend the guest meet?"
              />
            </div>

            <button 
              onClick={handleSubmit}
              className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
              data-aos="fade-up" 
              data-aos-delay="400"
            >
              <div className="submit-btn-content">
                {isSubmitting && <div className="spinner" />}
                {isSubmitting ? 'Registering...' : 'Register Now'}
              </div>
            </button>

            {submitStatus && (
              <div className={`status-message ${submitStatus.type}`}>
                {submitStatus.type === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                {submitStatus.message}
              </div>
            )}
          </div>
        </div>

        <div className="students-section" data-aos="fade-left">
          <div className="count-display">
            <div className="count-icon">
              <Users size={60} />
            </div>
            <div className="count-number">{animatedCount}</div>
            <div className="count-label">Registered Students</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestMeetRegistration;