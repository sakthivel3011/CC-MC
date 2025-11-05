import React, { useState } from 'react';
import { Building2, Calendar, CheckCircle, ArrowRight, ArrowLeft, MessageCircle, X, Phone } from 'lucide-react';

const colors = {
  primary: '#1a5f7a',
  secondary: '#ffd700',
  accent: '#ff7f50',
  dark: '#0a2540',
  light: '#f0f8ff',
  success: '#228b22',
  error: '#dc143c',
  navy: '#1a365d',
  gold: '#ffd700',
  coral: '#ff7f50',
  emerald: '#50c878'
};

const BankRegistrationForm = () => {
  const [step, setStep] = useState(1); // 1: Event Details, 2: Bank Details
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [formData, setFormData] = useState({
    // Event Details
    eventName: '',
    rollNo: '',
    teamId: '',
    leaderName: '',
    phoneNumber: '',
    email: '',
    
    // Bank Details
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    branchName: '',
    accountType: 'Savings'
  });

  // REPLACE THIS WITH YOUR ACTUAL GOOGLE APPS SCRIPT WEB APP URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwLhDuMP68pmnivzmQXNSns_8-7ISYnZbSRrKhHMCDgHcdKQN3l8cXRtXrAcwoLDomW/exec';
  
  // REPLACE THIS WITH YOUR WHATSAPP GROUP LINK
  const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/YOUR_GROUP_LINK';

  const eventsList = [
    'Technical Symposium 2025',
    'Cultural Fest 2025',
    'Sports Meet 2025',
    'Hackathon 2025',
    'Business Summit 2025',
    'Art Exhibition 2025'
  ];

  const banksList = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
    'Union Bank of India',
    'Bank of India',
    'Indian Bank',
    'IDBI Bank',
    'Yes Bank',
    'Kotak Mahindra Bank',
    'IndusInd Bank',
    'Federal Bank'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Convert to uppercase for specific fields
    let processedValue = value;
    if (name === 'rollNo' || name === 'teamId' || name === 'ifscCode') {
      processedValue = value.toUpperCase();
    }
    
    setFormData(prev => ({ ...prev, [name]: processedValue }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'eventName':
        if (!value) error = 'Please select an event';
        break;
      case 'rollNo':
        if (!value) {
          error = 'Please enter roll number';
        } else if (!/^\d{2}[A-Z]{3}\d{3}$/i.test(value)) {
          error = 'Invalid format. Use: 23ADR145 (2 digits + 3 letters + 3 digits)';
        }
        break;
      case 'teamId':
        if (!value) {
          error = 'Please enter team ID';
        } else if (!/^[A-Z]{2}\d{2}$/i.test(value)) {
          error = 'Invalid format. Use: DD01 (2 letters + 2 digits)';
        }
        break;
      case 'leaderName':
        if (!value) error = 'Please enter leader name';
        break;
      case 'phoneNumber':
        if (!value) {
          error = 'Please enter phone number';
        } else if (!/^\d{10}$/.test(value)) {
          error = 'Please enter valid 10-digit phone number';
        }
        break;
      case 'email':
        if (!value) {
          error = 'Please enter email address';
        } else if (!/^[^\s@]+@kongu\.edu$/i.test(value)) {
          error = 'Please use kongu.edu email address only';
        }
        break;
      case 'accountHolderName':
        if (!value) error = 'Please enter account holder name';
        break;
      case 'bankName':
        if (!value) error = 'Please select bank name';
        break;
      case 'accountNumber':
        if (!value) {
          error = 'Please enter account number';
        } else if (!/^\d{9,18}$/.test(value)) {
          error = 'Account number must be 9-18 digits';
        }
        break;
      case 'ifscCode':
        if (!value) {
          error = 'Please enter IFSC code';
        } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value.toUpperCase())) {
          error = 'Invalid IFSC code. Must be exactly 11 characters (e.g., SBIN0001234)';
        }
        break;
      case 'branchName':
        if (!value) error = 'Please enter branch name';
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [field]: error }));
    return error;
  };

  const validateStep1 = () => {
    const step1Fields = ['eventName', 'rollNo', 'teamId', 'leaderName', 'phoneNumber', 'email'];
    const newErrors = {};
    let isValid = true;

    step1Fields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(prev => ({ ...prev, ...newErrors }));
    setTouched(prev => {
      const newTouched = { ...prev };
      step1Fields.forEach(field => newTouched[field] = true);
      return newTouched;
    });

    return isValid;
  };

  const validateStep2 = () => {
    const step2Fields = ['accountHolderName', 'bankName', 'accountNumber', 'ifscCode', 'branchName'];
    const newErrors = {};
    let isValid = true;

    step2Fields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(prev => ({ ...prev, ...newErrors }));
    setTouched(prev => {
      const newTouched = { ...prev };
      step2Fields.forEach(field => newTouched[field] = true);
      return newTouched;
    });

    return isValid;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          ...formData
        })
      });

      // Since we're using no-cors, we can't read the response
      // We'll assume success if no error was thrown
      setShowPopup(true);
      
      // Reset form
      setFormData({
        eventName: '',
        rollNo: '',
        teamId: '',
        leaderName: '',
        phoneNumber: '',
        email: '',
        accountHolderName: '',
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        branchName: '',
        accountType: 'Savings'
      });
      setErrors({});
      setTouched({});
      setStep(1);
      
    } catch (error) {
      setErrors({ submit: 'Failed to submit. Please try again or contact support.' });
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const SuccessPopup = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
      animation: 'fadeIn 0.3s ease'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        animation: 'slideUp 0.4s ease'
      }}>
        <button
          onClick={() => setShowPopup(false)}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '5px'
          }}
        >
          <X size={24} color={colors.dark} />
        </button>

        <div style={{
          width: '80px',
          height: '80px',
          background: `linear-gradient(135deg, ${colors.success}, ${colors.emerald})`,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 25px',
          animation: 'scaleIn 0.5s ease'
        }}>
          <CheckCircle size={48} color="white" />
        </div>

        <h2 style={{
          color: colors.dark,
          fontSize: '28px',
          marginBottom: '15px',
          fontWeight: 'bold'
        }}>
          Registration Successful! 🎉
        </h2>

        <p style={{
          color: colors.dark,
          fontSize: '16px',
          marginBottom: '30px',
          opacity: 0.8
        }}>
          Your bank details have been submitted successfully. Thank you for registering!
        </p>

        <div style={{
          background: colors.light,
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '25px',
          border: `2px solid ${colors.primary}`
        }}>
          <p style={{
            color: colors.dark,
            fontSize: '16px',
            marginBottom: '15px',
            fontWeight: 'bold'
          }}>
            Join our WhatsApp Group for updates!
          </p>
          <a
            href={WHATSAPP_GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 28px',
              background: '#25D366',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '16px',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <MessageCircle size={20} />
            Join WhatsApp Group
          </a>
        </div>

        <button
          onClick={() => setShowPopup(false)}
          style={{
            width: '100%',
            padding: '14px',
            background: colors.primary,
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.primary} 50%, ${colors.dark} 100%)`,
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto 30px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '30px',
        border: '2px solid rgba(255, 215, 0, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
          <Building2 size={48} color={colors.gold} />
          <div>
            <h1 style={{ margin: 0, color: colors.gold, fontSize: '32px', fontWeight: 'bold' }}>
              Bank Registration Portal
            </h1>
            <p style={{ margin: '5px 0 0', color: colors.light, fontSize: '14px' }}>
              Step {step} of 2
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          marginBottom: '10px'
        }}>
          {/* Step 1 */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: step >= 1 ? `linear-gradient(135deg, ${colors.gold}, ${colors.coral})` : 'rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '20px',
              color: 'white',
              border: '3px solid white',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              zIndex: 2,
              transition: 'all 0.3s ease'
            }}>
              {step > 1 ? '✓' : '1'}
            </div>
            <p style={{
              margin: '8px 0 0',
              color: colors.gold,
              fontSize: '13px',
              fontWeight: step === 1 ? 'bold' : 'normal',
              opacity: step === 1 ? 1 : 0.7
            }}>
              Event Details
            </p>
          </div>

          {/* Connecting Line */}
          <div style={{
            position: 'absolute',
            top: '25px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '200px',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '2px',
            zIndex: 1
          }}>
            <div style={{
              height: '100%',
              width: step === 2 ? '100%' : '0%',
              background: `linear-gradient(90deg, ${colors.gold}, ${colors.coral})`,
              borderRadius: '2px',
              transition: 'width 0.5s ease'
            }} />
          </div>

          {/* Step 2 */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: step >= 2 ? `linear-gradient(135deg, ${colors.gold}, ${colors.coral})` : 'rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '20px',
              color: 'white',
              border: '3px solid white',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              zIndex: 2,
              transition: 'all 0.3s ease'
            }}>
              2
            </div>
            <p style={{
              margin: '8px 0 0',
              color: colors.gold,
              fontSize: '13px',
              fontWeight: step === 2 ? 'bold' : 'normal',
              opacity: step === 2 ? 1 : 0.7
            }}>
              Bank Details
            </p>
          </div>
        </div>
      </div>

      {/* Submit Error Message (only for submission errors) */}
      {errors.submit && (
        <div style={{
          maxWidth: '800px',
          margin: '0 auto 20px',
          padding: '15px 20px',
          background: colors.error,
          color: 'white',
          borderRadius: '10px',
          fontWeight: 'bold',
          animation: 'slideIn 0.3s ease'
        }}>
          {errors.submit}
        </div>
      )}

      {/* Main Form */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        border: '2px solid rgba(255, 215, 0, 0.2)'
      }}>
        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            // Step 1: Event Details
            <div>
              <div style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.emerald})`,
                padding: '20px',
                borderRadius: '15px',
                marginBottom: '30px',
                color: 'white'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <Calendar size={24} />
                  <h2 style={{ margin: 0, fontSize: '24px' }}>Event Details</h2>
                </div>
                <p style={{ margin: 0, opacity: 0.9 }}>Please provide your event and team information</p>
              </div>

              <div style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: colors.dark, fontWeight: 'bold' }}>
                    Event Name *
                  </label>
                  <select
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('eventName')}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: `2px solid ${touched.eventName && errors.eventName ? colors.error : colors.primary}`,
                      borderRadius: '10px',
                      fontSize: '16px',
                      background: 'white'
                    }}
                  >
                    <option value="">Select Event</option>
                    {eventsList.map(event => (
                      <option key={event} value={event}>{event}</option>
                    ))}
                  </select>
                  {touched.eventName && errors.eventName && (
                    <p style={{ color: colors.error, fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
                      {errors.eventName}
                    </p>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: colors.dark, fontWeight: 'bold' }}>
                      Roll Number *
                    </label>
                    <input
                      type="text"
                      name="rollNo"
                      value={formData.rollNo}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('rollNo')}
                      required
                      placeholder="e.g., 23ADR145"
                      maxLength="8"
                      style={{
                        width: '100%',
                        padding: '14px',
                        border: `2px solid ${touched.rollNo && errors.rollNo ? colors.error : colors.primary}`,
                        borderRadius: '10px',
                        fontSize: '16px',
                        textTransform: 'uppercase'
                      }}
                    />
                    {touched.rollNo && errors.rollNo && (
                      <p style={{ color: colors.error, fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
                        {errors.rollNo}
                      </p>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: colors.dark, fontWeight: 'bold' }}>
                      Team ID *
                    </label>
                    <input
                      type="text"
                      name="teamId"
                      value={formData.teamId}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('teamId')}
                      required
                      placeholder="e.g., DD01"
                      maxLength="4"
                      style={{
                        width: '100%',
                        padding: '14px',
                        border: `2px solid ${touched.teamId && errors.teamId ? colors.error : colors.primary}`,
                        borderRadius: '10px',
                        fontSize: '16px',
                        textTransform: 'uppercase'
                      }}
                    />
                    {touched.teamId && errors.teamId && (
                      <p style={{ color: colors.error, fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
                        {errors.teamId}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: colors.dark, fontWeight: 'bold' }}>
                    Leader Name *
                  </label>
                  <input
                    type="text"
                    name="leaderName"
                    value={formData.leaderName}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('leaderName')}
                    required
                    placeholder="Full Name"
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: `2px solid ${touched.leaderName && errors.leaderName ? colors.error : colors.primary}`,
                      borderRadius: '10px',
                      fontSize: '16px'
                    }}
                  />
                  {touched.leaderName && errors.leaderName && (
                    <p style={{ color: colors.error, fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
                      {errors.leaderName}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: colors.dark, fontWeight: 'bold' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('phoneNumber')}
                    required
                    placeholder="10-digit mobile number"
                    maxLength="10"
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: `2px solid ${touched.phoneNumber && errors.phoneNumber ? colors.error : colors.primary}`,
                      borderRadius: '10px',
                      fontSize: '16px'
                    }}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <p style={{ color: colors.error, fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: colors.dark, fontWeight: 'bold' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('email')}
                    required
                    placeholder="yourname@kongu.edu"
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: `2px solid ${touched.email && errors.email ? colors.error : colors.primary}`,
                      borderRadius: '10px',
                      fontSize: '16px'
                    }}
                  />
                  {touched.email && errors.email && (
                    <p style={{ color: colors.error, fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                style={{
                  width: '100%',
                  marginTop: '30px',
                  padding: '16px',
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.emerald})`,
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                Next: Bank Details
                <ArrowRight size={20} />
              </button>
            </div>
          ) : (
            // Step 2: Bank Details
            <div>
              <div style={{
                background: `linear-gradient(135deg, ${colors.coral}, ${colors.gold})`,
                padding: '20px',
                borderRadius: '15px',
                marginBottom: '30px',
                color: 'white'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <Building2 size={24} />
                  <h2 style={{ margin: 0, fontSize: '24px' }}>Bank Account Details</h2>
                </div>
                <p style={{ margin: 0, opacity: 0.9 }}>Provide accurate banking information for prize distribution</p>
              </div>

              <div style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: colors.dark, fontWeight: 'bold' }}>
                    Account Holder Name *
                  </label>
                  <input
                    type="text"
                    name="accountHolderName"
                    value={formData.accountHolderName}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('accountHolderName')}
                    required
                    placeholder="As per bank records"
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: `2px solid ${touched.accountHolderName && errors.accountHolderName ? colors.error : colors.coral}`,
                      borderRadius: '10px',
                      fontSize: '16px'
                    }}
                  />
                  {touched.accountHolderName && errors.accountHolderName && (
                    <p style={{ color: colors.error, fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
                      {errors.accountHolderName}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: colors.dark, fontWeight: 'bold' }}>
                    Bank Name *
                  </label>
                  <select
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('bankName')}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: `2px solid ${touched.bankName && errors.bankName ? colors.error : colors.coral}`,
                      borderRadius: '10px',
                      fontSize: '16px',
                      background: 'white'
                    }}
                  >
                    <option value="">Select Bank</option>
                    {banksList.map(bank => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                  </select>
                  {touched.bankName && errors.bankName && (
                    <p style={{ color: colors.error, fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
                      {errors.bankName}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: colors.dark, fontWeight: 'bold' }}>
                    Account Number *
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('accountNumber')}
                    required
                    placeholder="Enter 9-18 digit account number"
                    maxLength="18"
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: `2px solid ${touched.accountNumber && errors.accountNumber ? colors.error : colors.coral}`,
                      borderRadius: '10px',
                      fontSize: '16px'
                    }}
                  />
                  {touched.accountNumber && errors.accountNumber && (
                    <p style={{ color: colors.error, fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
                      {errors.accountNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: colors.dark, fontWeight: 'bold' }}>
                    IFSC Code *
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('ifscCode')}
                    required
                    placeholder="e.g., SBIN0001234"
                    maxLength="11"
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: `2px solid ${touched.ifscCode && errors.ifscCode ? colors.error : colors.coral}`,
                      borderRadius: '10px',
                      fontSize: '16px',
                      textTransform: 'uppercase'
                    }}
                  />
                  {touched.ifscCode && errors.ifscCode && (
                    <p style={{ color: colors.error, fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
                      {errors.ifscCode}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: colors.dark, fontWeight: 'bold' }}>
                    Branch Name *
                  </label>
                  <input
                    type="text"
                    name="branchName"
                    value={formData.branchName}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('branchName')}
                    required
                    placeholder="Branch location"
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: `2px solid ${touched.branchName && errors.branchName ? colors.error : colors.coral}`,
                      borderRadius: '10px',
                      fontSize: '16px'
                    }}
                  />
                  {touched.branchName && errors.branchName && (
                    <p style={{ color: colors.error, fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
                      {errors.branchName}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: colors.dark, fontWeight: 'bold' }}>
                    Account Type *
                  </label>
                  <select
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: `2px solid ${colors.coral}`,
                      borderRadius: '10px',
                      fontSize: '16px',
                      background: 'white'
                    }}
                  >
                    <option value="Savings">Savings Account</option>
                    <option value="Current">Current Account</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '30px' }}>
                <button
                  type="button"
                  onClick={handleBack}
                  style={{
                    padding: '16px',
                    background: 'rgba(0, 0, 0, 0.1)',
                    color: colors.dark,
                    border: `2px solid ${colors.dark}`,
                    borderRadius: '10px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = colors.dark;
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(0, 0, 0, 0.1)';
                    e.target.style.color = colors.dark;
                  }}
                >
                  <ArrowLeft size={20} />
                  Back
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '16px',
                    background: loading ? '#ccc' : `linear-gradient(135deg, ${colors.success}, ${colors.emerald})`,
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'transform 0.2s',
                    boxShadow: '0 4px 15px rgba(34, 139, 34, 0.3)'
                  }}
                  onMouseEnter={(e) => !loading && (e.target.style.transform = 'scale(1.02)')}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  {loading ? 'Submitting...' : 'Submit Registration'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Success Popup */}
      {showPopup && <SuccessPopup />}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        input:focus, select:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(26, 95, 122, 0.2);
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 24px !important;
          }
          
          div[style*="gridTemplateColumns: '1fr 1fr'"] {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 480px) {
          /* Make progress bar more compact on mobile */
          div[style*="width: '50px'"][style*="height: '50px'"] {
            width: 40px !important;
            height: 40px !important;
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BankRegistrationForm;