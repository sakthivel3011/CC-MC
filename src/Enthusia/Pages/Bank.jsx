import React, { useState, useEffect } from 'react';
import { Building2, CheckCircle, Shield, Lock, AlertCircle, Clock, Upload, X, ArrowRight, ArrowLeft, User } from 'lucide-react';

const colors = {
  darkBlue: '#1a365d',
  enthusiaBlue: '#1a5f7a',
  accent: '#4fd1c5',
  success: '#48bb78',
  error: '#fc8181',
  warning: '#f6ad55'
};

const BankRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');

  const REGISTRATION_START = new Date('2025-11-09T00:00:00');
  const REGISTRATION_END = new Date('2025-12-19T23:59:59');
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby4_5KiSYJzm7GVQJ6K-xOocwdueovRhOJkVvgJtcuPR8tMPD6Gv_GCkuEtQ4TIoT-6/exec';
  const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/YOUR_GROUP_LINK';

  const [formData, setFormData] = useState({
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
    accountType: 'Savings',
    passbookImage: null
  });

 const eventsList = [
  'ENTHUSIA 2026 - Comic Satire',
  'ENTHUSIA 2026 - Solo Instrumental',
  'ENTHUSIA 2026 - Group Instrumental',
  'ENTHUSIA 2026 - Solo Dance',
  'ENTHUSIA 2026 - Dual Dance',
  'ENTHUSIA 2026 - Group Dance',
  'ENTHUSIA 2026 - Solo Singing',
  'ENTHUSIA 2026 - Group Singing',
  'ENTHUSIA 2026 - Imitation',
  'ENTHUSIA 2026 - Fashion Parade',
  'ENTHUSIA 2026 - Movie Depiction',
  'ENTHUSIA 2026 - Skit',
  'ENTHUSIA 2026 - Short Film',
  'ENTHUSIA 2026 - Anchoring'
];


 const banksList = [
  // Big National Banks (India-wide, very common)
  'State Bank of India (SBI)',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Punjab National Bank (PNB)',
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'Indian Bank',
  'Bank of India',

  // Popular Tamil Nadu–Based Banks
  'Indian Overseas Bank',
  'Tamilnad Mercantile Bank',
  'City Union Bank',
  'Karur Vysya Bank',
  'South Indian Bank',
  'CSB Bank',
  'Lakshmi Vilas Bank (Merged with DBS Bank India)',
  'DBS Bank India',

  // Commonly Used Private Banks in Tamil Nadu
  'Kotak Mahindra Bank',
  'IndusInd Bank',
  'Yes Bank',
  'Federal Bank',
  'RBL Bank'
];


  useEffect(() => {
    const checkRegistrationStatus = () => {
      const now = new Date();
      const isOpen = now >= REGISTRATION_START && now <= REGISTRATION_END;
      setIsRegistrationOpen(isOpen);

      if (!isOpen) {
        if (now < REGISTRATION_START) {
          const timeDiff = REGISTRATION_START - now;
          setTimeRemaining(formatTimeDifference(timeDiff, 'starts'));
        } else {
          setTimeRemaining('Registration has closed');
        }
      } else {
        const timeDiff = REGISTRATION_END - now;
        setTimeRemaining(formatTimeDifference(timeDiff, 'ends'));
      }
    };

    checkRegistrationStatus();
    const timer = setInterval(checkRegistrationStatus, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimeDifference = (timeDiff, action) => {
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    if (timeDiff <= 0) {
      return action === 'starts' ? 'Registration will start soon' : 'Registration has ended';
    }
    
    if (days > 0) return `Registration ${action} in ${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `Registration ${action} in ${hours}h ${minutes}m ${seconds}s`;
    if (minutes > 0) return `Registration ${action} in ${minutes}m ${seconds}s`;
    return `Registration ${action} in ${seconds}s`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    if (name === 'rollNo' || name === 'teamId' || name === 'ifscCode') {
      processedValue = value.toUpperCase();
    }
    if (name === 'phoneNumber' || name === 'accountNumber') {
      processedValue = value.replace(/\D/g, '');
    }
    if (name === 'leaderName' || name === 'accountHolderName' || name === 'branchName') {
      processedValue = value.replace(/[^a-zA-Z\s]/g, '');
    }
    
    setFormData(prev => ({ ...prev, [name]: processedValue }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, passbookImage: 'Please upload JPG, PNG, or GIF' }));
        return;
      }
      
      if (file.size > 15 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, passbookImage: 'Image must be less than 15MB' }));
        return;
      }
      
      setFormData(prev => ({ ...prev, passbookImage: file }));
      setErrors(prev => ({ ...prev, passbookImage: '' }));
      
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, passbookImage: null }));
    setImagePreview(null);
    setErrors(prev => ({ ...prev, passbookImage: '' }));
    const fileInput = document.getElementById('passbookImage');
    if (fileInput) fileInput.value = '';
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    let error = '';

    const validations = {
      eventName: () => !value && 'Please select an event',
      rollNo: () => {
        if (!value) return 'Roll number required';
        if (!/^\d{2}[A-Z]{3}\d{3}$/i.test(value)) return 'Format: 23ADR145';
      },
      teamId: () => {
        if (!value) return 'Team ID required';
        if (!/^[A-Z]{2}\d{2}$/i.test(value)) return 'Format: DD01';
      },
      leaderName: () => !value ? 'Leader name required' : value.length < 2 && 'Name too short',
      phoneNumber: () => {
        if (!value) return 'Phone number required';
        if (!/^\d{10}$/.test(value)) return 'Enter valid 10-digit number';
      },
      email: () => {
        if (!value) return 'Email required';
        if (!/^[^\s@]+@kongu\.edu$/i.test(value)) return 'Use kongu.edu email only';
      },
      accountHolderName: () => !value ? 'Account holder name required' : value.length < 2 && 'Name too short',
      bankName: () => !value && 'Please select bank',
      accountNumber: () => {
        if (!value) return 'Account number required';
        if (!/^\d{9,18}$/.test(value)) return 'Must be 9-18 digits';
      },
      ifscCode: () => {
        if (!value) return 'IFSC code required';
        if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value.toUpperCase())) return 'Invalid IFSC format';
      },
      branchName: () => !value ? 'Branch name required' : value.length < 2 && 'Branch name too short',
      passbookImage: () => !formData.passbookImage && 'Please upload passbook image'
    };

    error = validations[field]?.() || '';
    setErrors(prev => ({ ...prev, [field]: error }));
    return error;
  };

  const validateStep = (step) => {
    const step1Fields = ['eventName', 'rollNo', 'teamId', 'leaderName', 'phoneNumber', 'email'];
    const step2Fields = ['accountHolderName', 'bankName', 'accountNumber', 'ifscCode', 'branchName', 'passbookImage'];
    
    const fieldsToValidate = step === 1 ? step1Fields : step2Fields;
    const newErrors = {};
    let isValid = true;

    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(prev => ({ ...prev, ...newErrors }));
    setTouched(prev => {
      const newTouched = { ...prev };
      fieldsToValidate.forEach(field => newTouched[field] = true);
      return newTouched;
    });

    return isValid;
  };

  const handleNext = () => {
    if (validateStep(1)) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(2)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Convert image to base64
      let imageBase64 = '';
      if (formData.passbookImage) {
        imageBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(formData.passbookImage);
        });
      }

      // Prepare data payload
      const payload = {
        timestamp: new Date().toISOString(),
        eventName: formData.eventName,
        rollNo: formData.rollNo,
        teamId: formData.teamId,
        leaderName: formData.leaderName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        accountHolderName: formData.accountHolderName,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode,
        branchName: formData.branchName,
        accountType: formData.accountType,
        passbookImage: imageBase64,
        passbookImageName: formData.passbookImage ? formData.passbookImage.name : '',
        passbookImageType: formData.passbookImage ? formData.passbookImage.type : ''
      };

      console.log('Submitting data to:', GOOGLE_SCRIPT_URL);

      // Submit to Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(payload),
        redirect: 'follow'
      });

      const responseText = await response.text();
      console.log('Response:', responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Parse error:', parseError);
        throw new Error('Invalid response from server');
      }

      if (result.status === 'error') {
        setErrors({ submit: result.message });
        setCurrentStep(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Success - show popup and reset form
      setShowPopup(true);
      setFormData({
        eventName: '', rollNo: '', teamId: '', leaderName: '',
        phoneNumber: '', email: '', accountHolderName: '', bankName: '',
        accountNumber: '', ifscCode: '', branchName: '',
        accountType: 'Savings', passbookImage: null
      });
      setImagePreview(null);
      setErrors({});
      setTouched({});
      setCurrentStep(1);
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Submission failed. Please check your connection and try again.' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.darkBlue} 0%, #0f2940 50%, ${colors.enthusiaBlue} 100%)`,
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header with Status */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto 30px',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '15px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          padding: '15px 30px',
          borderRadius: '50px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '20px',
          marginTop: '30px'
        }}>
          <Shield size={24} color={colors.accent} />
          <div style={{ textAlign: 'left' }}>
            <h3 style={{
              margin: 0,
              color: 'white',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              {isRegistrationOpen ? '🎉 Registration Open' : '⏰ Registration Status'}
            </h3>
            <p style={{
              margin: '3px 0 0',
              color: colors.accent,
              fontSize: '13px',
              fontWeight: '500'
            }}>
              {timeRemaining}
            </p>
          </div>
        </div>

        <h1 style={{
          margin: '0 0 10px',
          color: 'white',
          fontSize: 'clamp(28px, 5vw, 42px)',
          fontWeight: '700',
          letterSpacing: '-0.5px'
        }}>
          ENTHUSIA 2026
        </h1>
        <p style={{
          margin: 0,
          color: colors.accent,
          fontSize: 'clamp(16px, 3vw, 20px)',
          fontWeight: '500'
        }}>
          Bank Registration Portal
        </p>
      </div>

      {/* Closed Registration Overlay */}
      {!isRegistrationOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '20px',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(26, 54, 93, 0.95), rgba(26, 95, 122, 0.95))',
            borderRadius: '24px',
            padding: '50px 40px',
            maxWidth: '450px',
            width: '100%',
            textAlign: 'center',
            border: '1px solid rgba(79, 209, 197, 0.3)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
          }}>
            <Clock size={72} color={colors.accent} style={{ marginBottom: '25px' }} />
            <h3 style={{
              color: 'white',
              fontSize: '28px',
              marginBottom: '15px',
              fontWeight: '700'
            }}>
              Registration Not Available
            </h3>
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '16px',
              marginBottom: '20px',
              lineHeight: 1.6
            }}>
              {new Date() < REGISTRATION_START 
                ? `Opens on ${REGISTRATION_START.toLocaleDateString()}`
                : 'Registration has been closed'
              }
            </p>
            <p style={{
              color: colors.accent,
              fontSize: '15px',
              fontWeight: '600'
            }}>
              {timeRemaining}
            </p>
          </div>
        </div>
      )}

      {/* Step Indicator */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto 30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 24px',
          background: currentStep === 1 ? `linear-gradient(135deg, ${colors.accent}, ${colors.enthusiaBlue})` : 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'all 0.3s ease'
        }}>
          <User size={20} color="white" />
          <span style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>
            Personal Details
          </span>
        </div>

        <ArrowRight size={24} color="rgba(255, 255, 255, 0.3)" />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 24px',
          background: currentStep === 2 ? `linear-gradient(135deg, ${colors.accent}, ${colors.enthusiaBlue})` : 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'all 0.3s ease'
        }}>
          <Building2 size={20} color="white" />
          <span style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>
            Bank Details
          </span>
        </div>
      </div>

      {/* Main Form */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: 'clamp(30px, 5vw, 50px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
        opacity: !isRegistrationOpen ? 0.5 : 1,
        pointerEvents: !isRegistrationOpen ? 'none' : 'auto'
      }}>
        {/* Error Alert - Positioned at top right */}
        {errors.submit && (
          <>
            <style>
              {`
                .error-alert-fixed {
                  position: fixed;
                  top: 20px;
                  right: 20px;
                  padding: 16px 20px;
                  background: rgba(252, 129, 129, 0.95);
                  border: 1px solid rgba(252, 129, 129, 0.5);
                  border-radius: 12px;
                  display: flex;
                  align-items: center;
                  gap: 12px;
                  z-index: 1000;
                  box-shadow: 0 10px 25px rgba(252, 129, 129, 0.3);
                  backdrop-filter: blur(10px);
                  min-width: 300px;
                  max-width: 400px;
                  animation: slideInFromRight 0.3s ease-out;
                }
                
                @keyframes slideInFromRight {
                  from {
                    transform: translateX(100%);
                    opacity: 0;
                  }
                  to {
                    transform: translateX(0);
                    opacity: 1;
                  }
                }
                
                @media (max-width: 768px) {
                  .error-alert-fixed {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    min-width: auto;
                    max-width: none;
                    width: calc(100% - 20px);
                  }
                }
                
                @media (max-width: 480px) {
                  .error-alert-fixed {
                    top: 5px;
                    right: 5px;
                    left: 5px;
                    width: calc(100% - 10px);
                    padding: 12px 16px;
                    font-size: 13px;
                  }
                }
              `}
            </style>
            <div className="error-alert-fixed">
              <AlertCircle size={20} color="white" />
              <p style={{ 
                margin: 0, 
                color: 'white', 
                fontSize: '14px', 
                fontWeight: '600',
                lineHeight: '1.4',
                wordBreak: 'break-word',
                flex: 1
              }}>
                {errors.submit}
              </p>
            </div>
          </>
        )}

        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '15px 20px',
                background: 'rgba(79, 209, 197, 0.1)',
                border: '1px solid rgba(79, 209, 197, 0.2)',
                borderRadius: '12px',
                marginBottom: '35px'
              }}>
                <User size={20} color={colors.accent} />
                <div>
                  <p style={{ margin: 0, color: 'white', fontSize: '14px', fontWeight: '600' }}>
                    Personal & Team Information
                  </p>
                  <p style={{ margin: '2px 0 0', color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                    Fill in your personal and team details carefully
                  </p>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px'
              }}>
                {/* Event Name */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
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
                      padding: '14px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${touched.eventName && errors.eventName ? colors.error : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <option value="" style={{ background: colors.darkBlue }}>Select event</option>
                    {eventsList.map(event => (
                      <option key={event} value={event} style={{ background: colors.darkBlue }}>{event}</option>
                    ))}
                  </select>
                  {touched.eventName && errors.eventName && (
                    <p style={{ color: colors.error, fontSize: '13px', margin: '6px 0 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <AlertCircle size={14} /> {errors.eventName}
                    </p>
                  )}
                </div>

                {/* Roll Number */}
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'white', fontSize: '14px', fontWeight: '600' }}>
                    Roll Number *
                  </label>
                  <input
                    type="text"
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('rollNo')}
                    placeholder="23ADR145"
                    maxLength="8"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${touched.rollNo && errors.rollNo ? colors.error : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  />
                  {touched.rollNo && errors.rollNo && (
                    <p style={{ color: colors.error, fontSize: '13px', margin: '6px 0 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <AlertCircle size={14} /> {errors.rollNo}
                    </p>
                  )}
                </div>

                {/* Team ID */}
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'white', fontSize: '14px', fontWeight: '600' }}>
                    Team ID *
                  </label>
                  <input
                    type="text"
                    name="teamId"
                    value={formData.teamId}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('teamId')}
                    placeholder="DD01"
                    maxLength="4"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${touched.teamId && errors.teamId ? colors.error : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  />
                  {touched.teamId && errors.teamId && (
                    <p style={{ color: colors.error, fontSize: '13px', margin: '6px 0 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <AlertCircle size={14} /> {errors.teamId}
                    </p>
                  )}
                </div>

                {/* Leader Name */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'white', fontSize: '14px', fontWeight: '600' }}>
                    Team Leader Name *
                  </label>
                  <input
                    type="text"
                    name="leaderName"
                    value={formData.leaderName}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('leaderName')}
                    placeholder="Full Name"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${touched.leaderName && errors.leaderName ? colors.error : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  />
                  {touched.leaderName && errors.leaderName && (
                    <p style={{ color: colors.error, fontSize: '13px', margin: '6px 0 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <AlertCircle size={14} /> {errors.leaderName}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'white', fontSize: '14px', fontWeight: '600' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('phoneNumber')}
                    placeholder="10-digit number"
                    maxLength="10"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${touched.phoneNumber && errors.phoneNumber ? colors.error : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <p style={{ color: colors.error, fontSize: '13px', margin: '6px 0 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <AlertCircle size={14} /> {errors.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'white', fontSize: '14px', fontWeight: '600' }}>
                    Email Address (kongu.edu) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('email')}
                    placeholder="your.email@kongu.edu"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${touched.email && errors.email ? colors.error : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  />
                  {touched.email && errors.email && (
                    <p style={{ color: colors.error, fontSize: '13px', margin: '6px 0 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <AlertCircle size={14} /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                style={{
                  width: '100%',
                  padding: '16px',
                  marginTop: '30px',
                  background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.enthusiaBlue} 100%)`,
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 24px rgba(79, 209, 197, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(79, 209, 197, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(79, 209, 197, 0.3)';
                }}
              >
                Banking Information
                <ArrowRight size={20} />
              </button>
            </>
          )}

          {/* Step 2: Banking Details */}
          {currentStep === 2 && (
            <>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '15px 20px',
                background: 'rgba(79, 209, 197, 0.1)',
                border: '1px solid rgba(79, 209, 197, 0.2)',
                borderRadius: '12px',
                marginBottom: '35px'
              }}>
                <Lock size={20} color={colors.accent} />
                <div>
                  <p style={{ margin: 0, color: 'white', fontSize: '14px', fontWeight: '600' }}>
                    Secure & Encrypted Banking Information
                  </p>
                  <p style={{ margin: '2px 0 0', color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                    Your banking information is protected with enterprise-grade security
                  </p>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px'
              }}>
                {/* Account Holder Name */}
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'white', fontSize: '14px', fontWeight: '600' }}>
                    Account Holder Name *
                  </label>
                  <input
                    type="text"
                    name="accountHolderName"
                    value={formData.accountHolderName}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('accountHolderName')}
                    placeholder="As per bank records"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${touched.accountHolderName && errors.accountHolderName ? colors.error : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  />
                  {touched.accountHolderName && errors.accountHolderName && (
                    <p style={{ color: colors.error, fontSize: '13px', margin: '6px 0 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <AlertCircle size={14} /> {errors.accountHolderName}
                    </p>
                  )}
                </div>

                {/* Bank Name */}
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'white', fontSize: '14px', fontWeight: '600' }}>
                    Bank Name *
                  </label>
                  <select
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('bankName')}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${touched.bankName && errors.bankName ? colors.error : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  >
                    <option value="" style={{ background: colors.darkBlue }}>Select bank</option>
                    {banksList.map(bank => (
                      <option key={bank} value={bank} style={{ background: colors.darkBlue }}>{bank}</option>
                    ))}
                  </select>
                  {touched.bankName && errors.bankName && (
                    <p style={{ color: colors.error, fontSize: '13px', margin: '6px 0 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <AlertCircle size={14} /> {errors.bankName}
                    </p>
                  )}
                </div>

                {/* Account Number */}
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'white', fontSize: '14px', fontWeight: '600' }}>
                    Account Number *
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('accountNumber')}
                    placeholder="9-18 digits"
                    maxLength="18"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${touched.accountNumber && errors.accountNumber ? colors.error : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  />
                  {touched.accountNumber && errors.accountNumber && (
                    <p style={{ color: colors.error, fontSize: '13px', margin: '6px 0 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <AlertCircle size={14} /> {errors.accountNumber}
                    </p>
                  )}
                </div>

                {/* IFSC Code */}
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'white', fontSize: '14px', fontWeight: '600' }}>
                    IFSC Code *
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('ifscCode')}
                    placeholder="SBIN0001234"
                    maxLength="11"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${touched.ifscCode && errors.ifscCode ? colors.error : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none',
                      textTransform: 'uppercase'
                    }}
                  />
                  {touched.ifscCode && errors.ifscCode && (
                    <p style={{ color: colors.error, fontSize: '13px', margin: '6px 0 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <AlertCircle size={14} /> {errors.ifscCode}
                    </p>
                  )}
                </div>

                {/* Branch Name */}
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'white', fontSize: '14px', fontWeight: '600' }}>
                    Branch Name *
                  </label>
                  <input
                    type="text"
                    name="branchName"
                    value={formData.branchName}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('branchName')}
                    placeholder="Branch location"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${touched.branchName && errors.branchName ? colors.error : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  />
                  {touched.branchName && errors.branchName && (
                    <p style={{ color: colors.error, fontSize: '13px', margin: '6px 0 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <AlertCircle size={14} /> {errors.branchName}
                    </p>
                  )}
                </div>

                {/* Account Type */}
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'white', fontSize: '14px', fontWeight: '600' }}>
                    Account Type *
                  </label>
                  <select
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  >
                    <option value="Savings" style={{ background: colors.darkBlue }}>Savings Account</option>
                    <option value="Current" style={{ background: colors.darkBlue }}>Current Account</option>
                  </select>
                </div>

                {/* Passbook Image Upload */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'white', fontSize: '14px', fontWeight: '600' }}>
                    Passbook/Statement Image * (Max 15MB)
                  </label>
                  
                  {!imagePreview ? (
                    <div>
                      <input
                        type="file"
                        id="passbookImage"
                        accept="image/jpeg,image/jpg,image/png,image/gif"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                      />
                      <label
                        htmlFor="passbookImage"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '40px 20px',
                          border: `2px dashed ${touched.passbookImage && errors.passbookImage ? colors.error : 'rgba(79, 209, 197, 0.3)'}`,
                          borderRadius: '16px',
                          cursor: 'pointer',
                          background: 'rgba(255, 255, 255, 0.03)',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(79, 209, 197, 0.05)';
                          e.currentTarget.style.borderColor = colors.accent;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                          e.currentTarget.style.borderColor = touched.passbookImage && errors.passbookImage ? colors.error : 'rgba(79, 209, 197, 0.3)';
                        }}
                      >
                        <Upload size={48} color={colors.accent} style={{ marginBottom: '15px' }} />
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: 'white' }}>
                          Click to upload passbook image
                        </p>
                        <p style={{ margin: '8px 0 0', fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)' }}>
                          JPG, PNG, or GIF • Maximum 15MB
                        </p>
                      </label>
                    </div>
                  ) : (
                    <div style={{
                      position: 'relative',
                      border: '1px solid rgba(79, 209, 197, 0.3)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      background: 'rgba(0, 0, 0, 0.3)'
                    }}>
                      <img
                        src={imagePreview}
                        alt="Passbook preview"
                        style={{
                          width: '100%',
                          maxHeight: '300px',
                          objectFit: 'contain',
                          background: 'rgba(0, 0, 0, 0.2)'
                        }}
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: colors.error,
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '36px',
                          height: '36px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
                      >
                        <X size={20} />
                      </button>
                      <div style={{
                        padding: '15px',
                        background: 'rgba(0, 0, 0, 0.4)',
                        borderTop: '1px solid rgba(79, 209, 197, 0.2)'
                      }}>
                        <p style={{ margin: 0, fontSize: '14px', color: 'white', fontWeight: '600' }}>
                          📄 {formData.passbookImage.name}
                        </p>
                        <p style={{ margin: '5px 0 0', fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                          {(formData.passbookImage.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {touched.passbookImage && errors.passbookImage && (
                    <p style={{ color: colors.error, fontSize: '13px', margin: '8px 0 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <AlertCircle size={14} /> {errors.passbookImage}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '15px',
                marginTop: '30px'
              }}>
                <button
                  type="button"
                  onClick={handleBack}
                  style={{
                    flex: '0 0 auto',
                    padding: '16px 24px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <ArrowLeft size={20} />
                  Back
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '16px',
                    background: loading 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : `linear-gradient(135deg, ${colors.accent} 0%, ${colors.enthusiaBlue} 100%)`,
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.3s ease',
                    boxShadow: loading ? 'none' : '0 8px 24px rgba(79, 209, 197, 0.3)'
                  }}
                  onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)', e.currentTarget.style.boxShadow = '0 12px 32px rgba(79, 209, 197, 0.4)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)', e.currentTarget.style.boxShadow = loading ? 'none' : '0 8px 24px rgba(79, 209, 197, 0.3)')}
                >
                  {loading ? (
                    <>
                      <div style={{
                        width: '18px',
                        height: '18px',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Register
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(26, 54, 93, 0.95), rgba(26, 95, 122, 0.95))',
            borderRadius: '24px',
            padding: '50px 40px',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
            border: '1px solid rgba(79, 209, 197, 0.3)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              <X size={20} color="white" />
            </button>

            <div style={{
              width: '80px',
              height: '80px',
              background: `linear-gradient(135deg, ${colors.success}, ${colors.accent})`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 25px',
              boxShadow: '0 12px 32px rgba(72, 187, 120, 0.3)'
            }}>
              <CheckCircle size={48} color="white" />
            </div>

            <h2 style={{
              color: 'white',
              fontSize: '28px',
              marginBottom: '15px',
              fontWeight: '700'
            }}>
              Registration Successful! 🎉
            </h2>

            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '16px',
              marginBottom: '30px',
              lineHeight: 1.6
            }}>
              Your banking details have been securely submitted. Thank you for registering!
            </p>

            <div style={{
              background: 'rgba(79, 209, 197, 0.1)',
              padding: '20px',
              borderRadius: '16px',
              marginBottom: '25px',
              border: '1px solid rgba(79, 209, 197, 0.2)'
            }}>
              <p style={{
                color: 'white',
                fontSize: '15px',
                marginBottom: '15px',
                fontWeight: '600'
              }}>
                Stay updated with our WhatsApp group
              </p>
              <a
                href={WHATSAPP_GROUP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  fontSize: '15px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 6px 20px rgba(37, 211, 102, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 28px rgba(37, 211, 102, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.3)';
                }}
              >
                💬 Join WhatsApp Group
              </a>
            </div>

            <button
              onClick={() => setShowPopup(false)}
              style={{
                width: '100%',
                padding: '14px',
                background: colors.accent,
                color: colors.darkBlue,
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        input::placeholder, select option[value=""] {
          color: rgba(255, 255, 255, 0.4);
        }

        input:focus, select:focus {
          border-color: ${colors.accent} !important;
          box-shadow: 0 0 0 3px rgba(79, 209, 197, 0.1) !important;
        }

        input:hover, select:hover {
          border-color: rgba(79, 209, 197, 0.4) !important;
        }

        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234fd1c5' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 40px;
        }

        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        ::-webkit-scrollbar-thumb {
          background: ${colors.accent};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${colors.enthusiaBlue};
        }
      `}</style>
    </div>
  );
};

export default BankRegistrationForm;