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
  const [showRandomModal, setShowRandomModal] = useState(false);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [currentDisplayStudent, setCurrentDisplayStudent] = useState(null);
  const [finalWinner, setFinalWinner] = useState(null);

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
      setRegisteredStudents([
        { studentName: "John Doe", rollNo: "21CS001", reason: "Interest in tech" },
        { studentName: "Jane Smith", rollNo: "21CS002", reason: "Career guidance" },
        { studentName: "Mike Johnson", rollNo: "21CS003", reason: "Networking" },
        { studentName: "Sarah Wilson", rollNo: "21CS004", reason: "Learning opportunity" },
        { studentName: "Alex Brown", rollNo: "21CS005", reason: "Future planning" }
      ]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'rollNo') {
      // Format roll number: 2 numbers + 3 letters + 3 numbers (e.g., 23ADR145)
      let formattedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
      
      // Apply the format: 2 digits + 3 letters + 3 digits
      if (formattedValue.length <= 2) {
        // First 2 characters must be digits
        formattedValue = formattedValue.replace(/[^0-9]/g, '');
      } else if (formattedValue.length <= 5) {
        // Next 3 characters must be letters
        const digits = formattedValue.slice(0, 2);
        const letters = formattedValue.slice(2).replace(/[^A-Z]/g, '');
        formattedValue = digits + letters;
      } else {
        // Last 3 characters must be digits
        const digits = formattedValue.slice(0, 2);
        const letters = formattedValue.slice(2, 5).replace(/[^A-Z]/g, '');
        const finalDigits = formattedValue.slice(5, 8).replace(/[^0-9]/g, '');
        formattedValue = digits + letters + finalDigits;
      }
      
      // Limit to 8 characters total
      formattedValue = formattedValue.slice(0, 8);
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.studentName || !formData.rollNo || !formData.reason) {
      setSubmitStatus({ type: 'error', message: 'Please fill all fields!' });
      return;
    }

    // Validate roll number format
    const rollNoPattern = /^[0-9]{2}[A-Z]{3}[0-9]{3}$/;
    if (!rollNoPattern.test(formData.rollNo)) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Roll number must be in format: 23ADR145 (2 numbers + 3 letters + 3 numbers)' 
      });
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

  const startRandomSelection = () => {
    if (registeredStudents.length === 0) {
      alert('No students registered yet!');
      return;
    }

    setShowRandomModal(true);
    setIsRandomizing(true);
    setFinalWinner(null);
    
    let shuffleCount = 0;
    const maxShuffles = 20; // Number of times to shuffle before final selection
    
    const shuffleInterval = setInterval(() => {
      const randomStudent = registeredStudents[Math.floor(Math.random() * registeredStudents.length)];
      setCurrentDisplayStudent(randomStudent);
      shuffleCount++;
      
      if (shuffleCount >= maxShuffles) {
        clearInterval(shuffleInterval);
        
        // Final winner selection with boom effect
        setTimeout(() => {
          const winner = registeredStudents[Math.floor(Math.random() * registeredStudents.length)];
          setFinalWinner(winner);
          setIsRandomizing(false);
        }, 500);
      }
    }, 100); // Shuffle every 100ms for fast effect
  };

  const closeRandomModal = () => {
    setShowRandomModal(false);
    setCurrentDisplayStudent(null);
    setFinalWinner(null);
    setIsRandomizing(false);
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
          align-items: start;
        }

        @media (min-width: 1024px) {
          .content-wrapper {
            grid-template-columns: 1fr 1.5fr;
          }x
        }

        .form-card {
          background: var(--enthusia-white);
          border-radius: 20px;
          padding: 30px 30px 60px 30px;
          box-shadow: var(--enthusia-shadow-lg);
          position: relative;
          overflow: visible;
          min-height: 600px;
          display: flex;
          flex-direction: column;
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

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #a0aec0;
          opacity: 1;
          font-style: italic;
        }

        .form-group input::-webkit-input-placeholder,
        .form-group textarea::-webkit-input-placeholder {
          color: #a0aec0;
          opacity: 1;
          font-style: italic;
        }

        .form-group input::-moz-placeholder,
        .form-group textarea::-moz-placeholder {
          color: #a0aec0;
          opacity: 1;
          font-style: italic;
        }

        .form-group input:-ms-input-placeholder,
        .form-group textarea:-ms-input-placeholder {
          color: #a0aec0;
          opacity: 1;
          font-style: italic;
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
          position: static;
          overflow: hidden;
          margin: 20px 0 10px 0;
          z-index: 10;
          transform: none;
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
          margin-bottom: 10px;
          padding: 12px 15px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: slideIn 0.3s ease;
          position: relative;
          z-index: 5;
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
          position: relative;
        }

        .random-play-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, var(--enthusia-gold), var(--enthusia-coral));
          color: var(--enthusia-navy);
          border: none;
          border-radius: 50px;
          padding: 12px 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
          z-index: 10;
        }

        .random-play-btn:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
        }

        .students-content {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .random-modal {
          background: var(--enthusia-white);
          border-radius: 20px;
          padding: 40px;
          max-width: 500px;
          width: 90%;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          position: relative;
          animation: modalSlideIn 0.5s ease;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .modal-close-btn {
          position: absolute;
          top: 15px;
          right: 20px;
          background: none;
          border: none;
          font-size: 24px;
          color: var(--enthusia-blue);
          cursor: pointer;
          padding: 5px;
        }

        .modal-title {
          font-size: 28px;
          color: var(--enthusia-navy);
          margin-bottom: 30px;
          font-weight: bold;
        }

        .student-display {
          min-height: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          border: 3px dashed var(--enthusia-light-gray);
          border-radius: 15px;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .student-display.randomizing {
          border-color: var(--enthusia-royal-blue);
          background: var(--enthusia-light-blue);
          animation: pulse 0.5s ease-in-out infinite alternate;
        }

        .student-display.winner {
          border-color: var(--enthusia-gold);
          background: var(--enthusia-light-gold);
          animation: winnerBoom 0.8s ease-out;
          border-style: solid;
          border-width: 4px;
        }

        @keyframes pulse {
          from {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(65, 105, 225, 0.3);
          }
          to {
            transform: scale(1.02);
            box-shadow: 0 0 30px rgba(65, 105, 225, 0.5);
          }
        }

        @keyframes winnerBoom {
          0% { 
            transform: scale(1);
            box-shadow: 0 0 0 rgba(255, 215, 0, 0.7);
          }
          50% { 
            transform: scale(1.1);
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.7);
          }
          100% { 
            transform: scale(1);
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
          }
        }

        .student-name {
          font-size: 24px;
          font-weight: bold;
          color: var(--enthusia-navy);
          margin-bottom: 10px;
        }

        .student-roll {
          font-size: 18px;
          color: var(--enthusia-blue);
          font-weight: 600;
        }

        .winner-badge {
          background: var(--enthusia-gold);
          color: var(--enthusia-navy);
          padding: 8px 20px;
          border-radius: 25px;
          font-size: 16px;
          font-weight: bold;
          margin-top: 15px;
          display: inline-block;
          animation: sparkle 1.5s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .loading-text {
          font-size: 18px;
          color: var(--enthusia-blue);
          margin-top: 20px;
          animation: loadingDots 1.5s linear infinite;
        }

        @keyframes loadingDots {
          0% { content: 'Selecting Winner'; }
          33% { content: 'Selecting Winner.'; }
          66% { content: 'Selecting Winner..'; }
          100% { content: 'Selecting Winner...'; }
        }

        /* Colorful Side Popups */
        .confetti-left, .confetti-right {
          position: absolute;
          top: 0;
          width: 150px;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 1000;
        }

        .confetti-left {
          left: -170px;
        }

        .confetti-right {
          right: -170px;
        }

        .confetti-particle {
          position: absolute;
          animation: confettiFall 3s linear infinite;
        }

        /* Different confetti shapes */
        .confetti-circle {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .confetti-square {
          width: 6px;
          height: 6px;
        }

        .confetti-triangle {
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 8px solid;
        }

        .confetti-rectangle {
          width: 12px;
          height: 4px;
          border-radius: 2px;
        }

        .confetti-star {
          width: 8px;
          height: 8px;
          background: currentColor;
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        }

        /* More vibrant colors */
        .confetti-particle:nth-child(1) { color: #ff1744; animation-delay: 0s; left: 5%; }
        .confetti-particle:nth-child(2) { color: #e91e63; animation-delay: 0.15s; left: 15%; }
        .confetti-particle:nth-child(3) { color: #9c27b0; animation-delay: 0.3s; left: 25%; }
        .confetti-particle:nth-child(4) { color: #673ab7; animation-delay: 0.45s; left: 35%; }
        .confetti-particle:nth-child(5) { color: #3f51b5; animation-delay: 0.6s; left: 45%; }
        .confetti-particle:nth-child(6) { color: #2196f3; animation-delay: 0.75s; left: 55%; }
        .confetti-particle:nth-child(7) { color: #00bcd4; animation-delay: 0.9s; left: 65%; }
        .confetti-particle:nth-child(8) { color: #4caf50; animation-delay: 1.05s; left: 75%; }
        .confetti-particle:nth-child(9) { color: #8bc34a; animation-delay: 1.2s; left: 85%; }
        .confetti-particle:nth-child(10) { color: #cddc39; animation-delay: 1.35s; left: 95%; }
        .confetti-particle:nth-child(11) { color: #ffeb3b; animation-delay: 1.5s; left: 10%; }
        .confetti-particle:nth-child(12) { color: #ffc107; animation-delay: 1.65s; left: 20%; }
        .confetti-particle:nth-child(13) { color: #ff9800; animation-delay: 1.8s; left: 30%; }
        .confetti-particle:nth-child(14) { color: #ff5722; animation-delay: 1.95s; left: 40%; }
        .confetti-particle:nth-child(15) { color: #795548; animation-delay: 2.1s; left: 50%; }
        .confetti-particle:nth-child(16) { color: #607d8b; animation-delay: 2.25s; left: 60%; }
        .confetti-particle:nth-child(17) { color: #f06292; animation-delay: 2.4s; left: 70%; }
        .confetti-particle:nth-child(18) { color: #ba68c8; animation-delay: 2.55s; left: 80%; }
        .confetti-particle:nth-child(19) { color: #9575cd; animation-delay: 2.7s; left: 90%; }
        .confetti-particle:nth-child(20) { color: #7986cb; animation-delay: 2.85s; left: 15%; }

        /* Set colors for different shapes */
        .confetti-circle { background: currentColor; }
        .confetti-square { background: currentColor; }
        .confetti-rectangle { background: currentColor; }
        .confetti-triangle { border-bottom-color: currentColor; }

        @keyframes confettiFall {
          0% {
            transform: translateY(-30px) rotate(0deg) scale(1);
            opacity: 1;
          }
          10% {
            transform: translateY(50px) rotate(36deg) scale(1.1);
          }
          20% {
            transform: translateY(120px) rotate(72deg) scale(0.9);
          }
          30% {
            transform: translateY(200px) rotate(108deg) scale(1.2);
          }
          40% {
            transform: translateY(280px) rotate(144deg) scale(0.8);
          }
          50% {
            transform: translateY(360px) rotate(180deg) scale(1.1);
          }
          60% {
            transform: translateY(440px) rotate(216deg) scale(0.9);
          }
          70% {
            transform: translateY(520px) rotate(252deg) scale(1.3);
          }
          80% {
            transform: translateY(600px) rotate(288deg) scale(0.7);
          }
          90% {
            transform: translateY(680px) rotate(324deg) scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: translateY(750px) rotate(360deg) scale(0.5);
            opacity: 0;
          }
        }

        .winner-fireworks {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .firework {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          animation: firework 2s ease-out infinite;
        }

        .firework:nth-child(1) { 
          background: #ff1744; 
          animation-delay: 0s; 
          --angle: 0deg;
          --distance: 80px;
        }
        .firework:nth-child(2) { 
          background: #e91e63; 
          animation-delay: 0.2s; 
          --angle: 60deg;
          --distance: 90px;
        }
        .firework:nth-child(3) { 
          background: #9c27b0; 
          animation-delay: 0.4s; 
          --angle: 120deg;
          --distance: 85px;
        }
        .firework:nth-child(4) { 
          background: #3f51b5; 
          animation-delay: 0.6s; 
          --angle: 180deg;
          --distance: 95px;
        }
        .firework:nth-child(5) { 
          background: #2196f3; 
          animation-delay: 0.8s; 
          --angle: 240deg;
          --distance: 75px;
        }
        .firework:nth-child(6) { 
          background: #4caf50; 
          animation-delay: 1s; 
          --angle: 300deg;
          --distance: 88px;
        }
        .firework:nth-child(7) { 
          background: #ffeb3b; 
          animation-delay: 1.2s; 
          --angle: 30deg;
          --distance: 92px;
        }
        .firework:nth-child(8) { 
          background: #ff9800; 
          animation-delay: 1.4s; 
          --angle: 90deg;
          --distance: 82px;
        }
        .firework:nth-child(9) { 
          background: #f06292; 
          animation-delay: 1.6s; 
          --angle: 150deg;
          --distance: 87px;
        }
        .firework:nth-child(10) { 
          background: #00bcd4; 
          animation-delay: 1.8s; 
          --angle: 270deg;
          --distance: 93px;
        }

        @keyframes firework {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
            box-shadow: 0 0 10px currentColor;
          }
          25% {
            transform: translate(
              calc(-50% + cos(var(--angle)) * var(--distance) * 0.3),
              calc(-50% + sin(var(--angle)) * var(--distance) * 0.3)
            ) scale(1.2);
            opacity: 0.9;
            box-shadow: 0 0 20px currentColor;
          }
          50% {
            transform: translate(
              calc(-50% + cos(var(--angle)) * var(--distance) * 0.7),
              calc(-50% + sin(var(--angle)) * var(--distance) * 0.7)
            ) scale(0.8);
            opacity: 0.7;
            box-shadow: 0 0 15px currentColor;
          }
          75% {
            transform: translate(
              calc(-50% + cos(var(--angle)) * var(--distance)),
              calc(-50% + sin(var(--angle)) * var(--distance))
            ) scale(1.5);
            opacity: 0.4;
            box-shadow: 0 0 25px currentColor;
          }
          100% {
            transform: translate(
              calc(-50% + cos(var(--angle)) * var(--distance) * 1.2),
              calc(-50% + sin(var(--angle)) * var(--distance) * 1.2)
            ) scale(0.3);
            opacity: 0;
            box-shadow: 0 0 5px currentColor;
          }
        }

        /* Add celebration burst effect */
        .celebration-burst {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 100px;
          pointer-events: none;
        }

        .burst-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ffd700;
          border-radius: 50%;
          animation: burstOut 1.5s ease-out infinite;
        }

        .burst-particle:nth-child(odd) { 
          background: #ff6b6b; 
          animation-delay: 0.3s; 
        }
        .burst-particle:nth-child(even) { 
          background: #4ecdc4; 
          animation-delay: 0.6s; 
        }

        @keyframes burstOut {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(0.5) rotate(360deg);
            opacity: 0;
          }
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

          .form-card {
            padding: 20px 20px 50px 20px;
            min-height: 500px;
          }

          .students-section {
            padding: 20px 20px 30px 20px;
          }

          .submit-btn {
            font-size: 16px;
            padding: 12px;
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
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="form-group" data-aos="fade-up" data-aos-delay="100">
              <label htmlFor="studentName">Student Name *</label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                placeholder=" ENTER YOUR FULL NAME : SAKTHIVEL S"
                
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
                placeholder="Format:23ADR145"
                maxLength={8}
                style={{ 
                  fontFamily: 'monospace', 
                  fontSize: '16px', 
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}
              />
              <small style={{ 
                color: 'var(--enthusia-blue)', 
                fontSize: '12px', 
                marginTop: '5px', 
                display: 'block' 
              }}>
                Format: 2 numbers + 3 letters + 3 numbers
              </small>
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

            <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
              <button 
                onClick={handleSubmit}
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
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
        </div>

        <div className="students-section" data-aos="fade-left">
          <button className="random-play-btn" onClick={startRandomSelection}>
            🎲 Random Play
          </button>
          <div className="students-content">
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

      {/* Random Winner Modal */}
      {showRandomModal && (
        <div className="modal-overlay" onClick={closeRandomModal}>
          <div className="random-modal" onClick={(e) => e.stopPropagation()}>
            {/* Colorful Side Confetti - Left */}
            {finalWinner && (
              <div className="confetti-left">
                {Array.from({ length: 20 }, (_, i) => {
                  const shapes = ['circle', 'square', 'triangle', 'rectangle', 'star'];
                  const shape = shapes[i % shapes.length];
                  return (
                    <div 
                      key={`left-${i}`} 
                      className={`confetti-particle confetti-${shape}`}
                    ></div>
                  );
                })}
              </div>
            )}
            
            {/* Colorful Side Confetti - Right */}
            {finalWinner && (
              <div className="confetti-right">
                {Array.from({ length: 20 }, (_, i) => {
                  const shapes = ['circle', 'square', 'triangle', 'rectangle', 'star'];
                  const shape = shapes[i % shapes.length];
                  return (
                    <div 
                      key={`right-${i}`} 
                      className={`confetti-particle confetti-${shape}`}
                    ></div>
                  );
                })}
              </div>
            )}

            {/* Celebration Burst at Top */}
            {finalWinner && (
              <div className="celebration-burst">
                {Array.from({ length: 8 }, (_, i) => (
                  <div 
                    key={`burst-${i}`} 
                    className="burst-particle"
                    style={{
                      left: `${(i * 12.5)}%`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  ></div>
                ))}
              </div>
            )}

            <button className="modal-close-btn" onClick={closeRandomModal}>
              ×
            </button>
            <h2 className="modal-title">🎉 Random Winner Selection</h2>
            
            <div className={`student-display ${isRandomizing ? 'randomizing' : finalWinner ? 'winner' : ''}`}>
              {/* Winner Fireworks Effect */}
              {finalWinner && (
                <div className="winner-fireworks">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div 
                      key={`firework-${i}`} 
                      className="firework"
                    ></div>
                  ))}
                </div>
              )}

              {isRandomizing && currentDisplayStudent && (
                <>
                  <div className="student-name">{currentDisplayStudent.studentName}</div>
                  <div className="student-roll">{currentDisplayStudent.rollNo}</div>
                  <div className="loading-text">Selecting Winner...</div>
                </>
              )}
              
              {!isRandomizing && finalWinner && (
                <>
                  <div className="student-name">{finalWinner.studentName}</div>
                  <div className="student-roll">{finalWinner.rollNo}</div>
                  <div className="winner-badge">🏆 WINNER!</div>
                </>
              )}
              
              {!isRandomizing && !finalWinner && !currentDisplayStudent && (
                <div style={{color: 'var(--enthusia-blue)', fontSize: '18px'}}>
                  Click Random Play to select a winner!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestMeetRegistration;