import React, { useState, useEffect } from 'react';
import '../assets/styles/Feedback.css';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    year: '',
    event: '',
    rating: 0,
    feedback: '',
    subscribe: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const departments = [
    'AIDS', 'AIML', 'CSE', 'AUTO', 'CHEM', 'FT', 'CIVIL', 'CSD', 'IT',
    'EEE', 'EIE', 'ECE', 'MECH', 'MTS', 'MSC', 'MCA', 'MBA', 'BSC', 'ME', 'ARCH'
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', 'Faculty'];
  const events = ['Onam-2k25', 'Raaga-3.O', 'Office Bearers Meet', 'Other'];

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Email is invalid';
    if (!email.endsWith('@kongu.edu')) return 'Only kongu.edu emails are allowed';
    return '';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({ ...formData, [name]: newValue });

    if (name === 'email') {
      const emailError = validateEmail(newValue);
      setErrors(prevErrors => ({ ...prevErrors, email: emailError }));
    }
  };

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    if (!formData.department) newErrors.department = 'Please select your department';
    if (!formData.year) newErrors.year = 'Please select your year';
    if (!formData.event) newErrors.event = 'Please select an event';
    if (formData.rating === 0) newErrors.rating = 'Please provide a rating';
    if (!formData.feedback.trim()) newErrors.feedback = 'Feedback is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbzRVHkrPz2oEKh7UpjHP45qx53bhBwakIZQP7gk1giLhVDz71CM9UZ7gr2qPo5X2mWNYg/exec';
      
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      setSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ratingEmojis = ['😞', '😐', '🙂', '😊', '😍'];
  const ratingLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  if (submitted) {
    return (
      <div className="fb-wrapper">
        <div className={`fb-success-card ${mounted ? 'fb-fade-in' : ''}`}>
          <div className="fb-success-icon-wrap">
            <div className="fb-success-icon">
              <span className="fb-checkmark-new">✓</span>
            </div>
          </div>
          <h2 className="fb-success-title">Thank You!</h2>
          <p className="fb-success-text">Your feedback has been submitted successfully. We truly appreciate your time and insights.</p>
          <button className="fb-btn-success" onClick={() => setSubmitted(false)}>
            <span>Submit Another Response</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fb-wrapper">
      <div className={`fb-container ${mounted ? 'fb-fade-in' : ''}`}>
        <div className="fb-header">
          <div className="fb-glow-effect"></div>
          <h1 className="fb-title">Event Feedback</h1>
          <p className="fb-subtitle">Share your experience and help us improve</p>
        </div>

        <form className="fb-form" onSubmit={handleSubmit}>
          {/* Name & Email Row */}
          <div className="fb-row">
            <div className={`fb-input-group ${mounted ? 'fb-slide-up' : ''}`} style={{animationDelay: '0.1s'}}>
              <label className="fb-label">Full Name <span className="fb-required">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`fb-input ${errors.name ? 'fb-error' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.name && <span className="fb-error-msg">{errors.name}</span>}
            </div>

            <div className={`fb-input-group ${mounted ? 'fb-slide-up' : ''}`} style={{animationDelay: '0.2s'}}>
              <label className="fb-label">Email Address <span className="fb-required">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`fb-input ${errors.email ? 'fb-error' : ''}`}
                placeholder="your.name@kongu.edu"
              />
              {errors.email && <span className="fb-error-msg">{errors.email}</span>}
            </div>
          </div>

          {/* Department & Year Row */}
          <div className="fb-row">
            <div className={`fb-input-group ${mounted ? 'fb-slide-up' : ''}`} style={{animationDelay: '0.3s'}}>
              <label className="fb-label">Department <span className="fb-required">*</span></label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`fb-select ${errors.department ? 'fb-error' : ''}`}
              >
                <option value="">Select department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && <span className="fb-error-msg">{errors.department}</span>}
            </div>

            <div className={`fb-input-group ${mounted ? 'fb-slide-up' : ''}`} style={{animationDelay: '0.4s'}}>
              <label className="fb-label">Year <span className="fb-required">*</span></label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className={`fb-select ${errors.year ? 'fb-error' : ''}`}
              >
                <option value="">Select year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              {errors.year && <span className="fb-error-msg">{errors.year}</span>}
            </div>
          </div>

          {/* Event Selection */}
          <div className={`fb-input-group ${mounted ? 'fb-slide-up' : ''}`} style={{animationDelay: '0.5s'}}>
            <label className="fb-label">Select Event <span className="fb-required">*</span></label>
            <select
              name="event"
              value={formData.event}
              onChange={handleChange}
              className={`fb-select ${errors.event ? 'fb-error' : ''}`}
            >
              <option value="">Choose an event</option>
              {events.map(event => (
                <option key={event} value={event}>{event}</option>
              ))}
            </select>
            {errors.event && <span className="fb-error-msg">{errors.event}</span>}
          </div>

          {/* Rating */}
          <div className={`fb-input-group ${mounted ? 'fb-slide-up' : ''}`} style={{animationDelay: '0.6s'}}>
            <label className="fb-label">Rate Your Experience <span className="fb-required">*</span></label>
            <div className="fb-rating-grid">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`fb-rating-card ${star <= formData.rating ? 'fb-rating-active' : ''}`}
                  onClick={() => handleRatingClick(star)}
                >
                  <span className="fb-rating-emoji">{ratingEmojis[star - 1]}</span>
                  <span className="fb-rating-label">{ratingLabels[star - 1]}</span>
                </button>
              ))}
            </div>
            {errors.rating && <span className="fb-error-msg">{errors.rating}</span>}
          </div>

          {/* Feedback Textarea */}
          <div className={`fb-input-group ${mounted ? 'fb-slide-up' : ''}`} style={{animationDelay: '0.7s'}}>
            <label className="fb-label">Your Feedback <span className="fb-required">*</span></label>
            <textarea
              name="feedback"
              rows="5"
              value={formData.feedback}
              onChange={handleChange}
              className={`fb-textarea ${errors.feedback ? 'fb-error' : ''}`}
              placeholder="Share your thoughts, suggestions, or any issues you encountered..."
            ></textarea>
            {errors.feedback && <span className="fb-error-msg">{errors.feedback}</span>}
          </div>

          {/* Subscribe Checkbox */}
          <div className={`fb-checkbox-wrap ${mounted ? 'fb-slide-up' : ''}`} style={{animationDelay: '0.8s'}}>
            <label className="fb-checkbox-label">
              <input
                type="checkbox"
                name="subscribe"
                checked={formData.subscribe}
                onChange={handleChange}
                className="fb-checkbox"
              />
              <span className="fb-checkbox-text">Notify me about future events and updates</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`fb-btn-submit ${isSubmitting ? 'fb-btn-loading' : ''} ${mounted ? 'fb-slide-up' : ''}`}
            style={{animationDelay: '0.9s'}}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="fb-spinner"></span>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit Feedback</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;