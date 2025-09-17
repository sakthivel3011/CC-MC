import React, { useState } from 'react';
import '../assets/styles/Feedback.css'; // Assuming you have a CSS file for styling

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

  const departments = [
    'AIDS', 'AIML', 'CSE', 'AUTO', 'CHEM', 'FT', 'CIVIL', 'CSD', 'IT',
    'EEE', 'EIE', 'ECE', 'MECH', 'MTS', 'MSC', 'MCA', 'MBA', 'BSC', 'ME', 'ARCH'
  ];

  const years = [
    '1st Year',
    '2nd Year',
    '3rd Year',
    '4th Year',
    '5th Year',
    'Faculty'
    
  ];

  const events = [
    'Onam-2k25',
    'Raaga-3.O',
    'Office Bearers Meet',
    'Other'
  ];

  const validateEmail = (email) => {
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Email is invalid';
    }
    if (!email.endsWith('@kongu.edu')) {
      return 'Only kongu.edu emails are allowed';
    }
    return ''; // No error
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue
    });

    if (name === 'email') {
      const emailError = validateEmail(newValue);
      setErrors(prevErrors => ({
        ...prevErrors,
        email: emailError
      }));
    }
  };

  const handleRatingClick = (rating) => {
    setFormData({
      ...formData,
      rating
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    const emailError = validateEmail(formData.email);
    if (emailError) {
      newErrors.email = emailError;
    }
    
    if (!formData.department) {
      newErrors.department = 'Please select your department';
    }
    
    if (!formData.year) {
      newErrors.year = 'Please select your year';
    }
    
    if (!formData.event) {
      newErrors.event = 'Please select an event';
    }
    
    if (formData.rating === 0) {
      newErrors.rating = 'Please provide a rating';
    }
    
    if (!formData.feedback.trim()) {
      newErrors.feedback = 'Feedback is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Replace with your Google Apps Script Web App URL
      const scriptURL = 'https://script.google.com/macros/s/AKfycbzRVHkrPz2oEKh7UpjHP45qx53bhBwakIZQP7gk1giLhVDz71CM9UZ7gr2qPo5X2mWNYg/exec';
      
      const response = await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      // Since we're using no-cors mode, we can't check the response status
      // But we'll assume it was successful
      setSubmitted(true);
      
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="feedback-container" data-aos="fade-up">
        <div className="thank-you-message">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h2>Thank You for Your Feedback!</h2>
          <p>We appreciate you taking the time to share your experience with us.</p>
          <button 
            className="submit-btn"
            onClick={() => setSubmitted(false)}
          >
            Submit Another Feedback
          </button>
        </div>
      </div>
    );
  }

return (
    <div className="feedback-container" data-aos="fade-up">
        <div className="feedback-header">
            <h2 className="feedback-title">CC-MC Feedback</h2>
            <p className="feedback-subtitle">We value your opinion. Please share your experience with our events.</p>
        </div>
        
        <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="name">Full Name <span className="required">*</span></label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'error' : ''}
                        placeholder="Enter your full name"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Email Address <span className="required">*</span></label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                        placeholder="Enter your kongu.edu email address"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
            </div>
            
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="department">Department <span className="required">*</span></label>
                    <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className={errors.department ? 'error' : ''}
                    >
                        <option value="">Select your department</option>
                        {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                    {errors.department && <span className="error-message">{errors.department}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="year">Year <span className="required">*</span></label>
                    <select
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className={errors.year ? 'error' : ''}
                    >
                        <option value="">Select your year</option>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    {errors.year && <span className="error-message">{errors.year}</span>}
                </div>
            </div>
            
            <div className="form-group">
                <label htmlFor="event">Select Event <span className="required">*</span></label>
                <select
                    id="event"
                    name="event"
                    value={formData.event}
                    onChange={handleChange}
                    className={errors.event ? 'error' : ''}
                >
                    <option value="">Choose an event...</option>
                    {events.map(event => (
                        <option key={event} value={event}>{event}</option>
                    ))}
                </select>
                {errors.event && <span className="error-message">{errors.event}</span>}
            </div>
            
            <div className="form-group">
                <label>Your Rating <span className="required">*</span></label>
                <div className="rating-container">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <div
                            key={star}
                            className={`rating-item ${star <= formData.rating ? 'selected' : ''}`}
                            onClick={() => handleRatingClick(star)}
                        >
                            <div className="rating-emoji">
                                {star === 1 ? '😞' : 
                                 star === 2 ? '😐' : 
                                 star === 3 ? '🙂' : 
                                 star === 4 ? '😊' : '😍'}
                            </div>
                            <div className="rating-text">
                                {star === 1 ? 'Poor' : 
                                 star === 2 ? 'Fair' : 
                                 star === 3 ? 'Good' : 
                                 star === 4 ? 'Very Good' : 'Excellent'}
                            </div>
                        </div>
                    ))}
                </div>
                {errors.rating && <span className="error-message">{errors.rating}</span>}
            </div>
            
            <div className="form-group">
                <label htmlFor="feedback">Your Feedback <span className="required">*</span></label>
                <textarea
                    id="feedback"
                    name="feedback"
                    rows="5"
                    value={formData.feedback}
                    onChange={handleChange}
                    className={errors.feedback ? 'error' : ''}
                    placeholder="Please share your experience, suggestions, or any issues you encountered..."
                ></textarea>
                {errors.feedback && <span className="error-message">{errors.feedback}</span>}
            </div>
            
            <div className="form-checkbox">
                <input
                    type="checkbox"
                    id="subscribe"
                    name="subscribe"
                    checked={formData.subscribe}
                    onChange={handleChange}
                />
                <label htmlFor="subscribe">Notify me about future events and updates</label>
            </div>
            
            <button
                type="submit"
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
        </form>
    </div>
);
};

export default Feedback;