import React, { useState, useEffect, useMemo } from 'react';
import { getCountdownTimer, EVENT_DATE } from '../utils/Enthusia.js';

const EnthuisiaHero = () => {
  const [countdown, setCountdown] = useState({ days: 100, hours: 0, minutes: 0, seconds: 0 });

  // Reduce particles and memoize them
  const particles = useMemo(() => {
    const newParticles = [];
    for (let i = 0; i < 10; i++) { // Reduced from 30 to 10
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 2,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 3
      });
    }
    return newParticles;
  }, []);

  useEffect(() => {
    // Update countdown every second
    const timer = setInterval(() => {
      setCountdown(getCountdownTimer(EVENT_DATE));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events-section');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="enthusia-hero">
      {/* Floating Particles */}
      <div className="hero-particles">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          ENTHUSIA
        </h1>
        <p className="hero-subtitle">
          Kongu Engineering College's Premier Cultural Extravaganza
        </p>
        
        {/* Countdown Timer */}
        <div className="countdown-timer">
          <div className="countdown-item">
            <span className="countdown-number">{countdown.days}</span>
            <span className="countdown-label">Days</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">{countdown.hours}</span>
            <span className="countdown-label">Hours</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">{countdown.minutes}</span>
            <span className="countdown-label">Minutes</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">{countdown.seconds}</span>
            <span className="countdown-label">Seconds</span>
          </div>
        </div>

        <div className="hero-cta">
          <button className="cta-button" onClick={scrollToEvents}>
            Explore Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default EnthuisiaHero;