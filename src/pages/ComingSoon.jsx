import React, { useEffect, useState } from 'react';
import '../assets/styles/ComingSoon.css';

// Import AOS library for animations
import AOS from 'aos';
import 'aos/dist/aos.css';

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Initialize AOS library
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });

    // Set the date we're counting down to (example: 3 months from now)
    const countDownDate = new Date();
    countDownDate.setMonth(countDownDate.getMonth() + 4);

    // Update the countdown every 1 second
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="coming-soon-container">
      <div className="background-animation">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-4"></div>
        <div className="circle circle-5"></div>
      </div>
      
      <div className="content" data-aos="zoom-in">
        <h1 className="title">ENTHUSIA 2K26</h1>
        <h2 className="subtitle">Kongu Engineering College's Grand Cultural Event</h2>
        
        <div className="countdown-container" data-aos="fade-up" data-aos-delay="200">
          <div className="countdown">
            <div className="countdown-item">
              <span className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="countdown-label">DAYS</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="countdown-label">HOURS</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="countdown-label">MINUTES</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="countdown-label">SECONDS</span>
            </div>
          </div>
        </div>
        
        <p className="message" data-aos="fade-up" data-aos-delay="300">
          Prepare yourself for the most spectacular cultural festival of the year! 
          Get ready to experience a whirlwind of music, dance, art, and innovation.
        </p>


      </div>
    </div>
  );
};

export default ComingSoon;