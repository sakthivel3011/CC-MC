import React, { useState } from 'react';
import { BookOpen, Users, Trophy, Clock, AlertCircle, Sparkles, Star, Zap } from 'lucide-react';

const ERules = () => {
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const events = [
    {
      id: 1,
      name: "Solo Dance",
      code: "SOD",
      icon: "💃",
      category: "dance",
      teamSize: "1 participant",
      duration: "3-5 minutes",
      color: "teal-emerald",
      rules: [
        "Solo performance only",
        "Any dance style allowed (Classical, Western, Contemporary, Folk)",
        "Use of props is allowed but must be arranged by participant",
        "Music track must be submitted 2 days before the event",
        "Vulgarity and offensive content will lead to disqualification"
      ]
    },
    {
      id: 2,
      name: "Group Dance",
      code: "GRD",
      icon: "🕺",
      category: "dance",
      teamSize: "6-12 participants",
      duration: "5-8 minutes",
      color: "teal-emerald",
      rules: [
        "Team must have 6-12 members",
        "Any dance style or fusion allowed",
        "Props are allowed but must be arranged by team",
        "Music track must be submitted 2 days before the event",
        "All members must be from the same college",
        "Stage space: 20ft x 20ft"
      ]
    },
    {
      id: 3,
      name: "Solo Singing",
      code: "SOS",
      icon: "🎤",
      category: "music",
      teamSize: "1 participant",
      duration: "3-5 minutes",
      color: "teal-emerald",
      rules: [
        "Solo performance only",
        "Any language allowed (Tamil, English, Hindi, etc.)",
        "Karaoke tracks allowed or live accompaniment",
        "One song per participant",
        "Original compositions are welcome"
      ]
    },
    {
      id: 4,
      name: "Group Singing",
      code: "GRS",
      icon: "🎵",
      category: "music",
      teamSize: "4-8 participants",
      duration: "5-8 minutes",
      color: "teal-emerald",
      rules: [
        "Team must have 4-8 members",
        "Any language and genre allowed",
        "Harmonies and arrangements encouraged",
        "Musical instruments allowed (must be arranged by team)",
        "One or multiple songs allowed within time limit"
      ]
    },
    {
      id: 5,
      name: "Mr & Ms Enthusia",
      code: "MME",
      icon: "👑",
      category: "variety",
      teamSize: "1 participant per category",
      duration: "Multiple rounds",
      color: "teal-emerald",
      rules: [
        "Separate categories: Mr. Enthusia and Ms. Enthusia",
        "Three rounds: Introduction, Talent, Q&A",
        "Formal attire required for final round",
        "Talent can be any skill (singing, dancing, mimicry, etc.)",
        "Judging based on confidence, talent, and personality"
      ]
    },
    {
      id: 6,
      name: "Fashion Show",
      code: "FAS",
      icon: "👗",
      category: "variety",
      teamSize: "8-15 participants",
      duration: "8-12 minutes",
      color: "teal-emerald",
      rules: [
        "Team must have 8-15 members",
        "Theme-based presentation required",
        "Three rounds: Casual, Ethnic, Designer wear",
        "Props and accessories allowed",
        "Background music must be submitted in advance",
        "Choreography and creativity will be judged"
      ]
    },
    {
      id: 7,
      name: "Mime",
      code: "MIM",
      icon: "🎭",
      category: "theater",
      teamSize: "3-8 participants",
      duration: "5-8 minutes",
     color: "teal-emerald",
      rules: [
        "Team must have 3-8 members",
        "No dialogues or sound from performers",
        "Background music allowed",
        "Theme must convey a social message",
        "Props and costumes allowed",
        "Clarity of message is important"
      ]
    },
    {
      id: 8,
      name: "Skit/Drama",
      code: "SKD",
      icon: "🎬",
      category: "theater",
      teamSize: "5-10 participants",
      duration: "8-12 minutes",
      color: "teal-emerald",
      rules: [
        "Team must have 5-10 members",
        "Any language allowed",
        "Theme should be meaningful and creative",
        "Props and costumes allowed",
        "Vulgarity and offensive content prohibited",
        "Script originality will be appreciated"
      ]
    },
    {
      id: 9,
      name: "Stand-up Comedy",
      code: "SUC",
      icon: "😂",
      category: "variety",
      teamSize: "1 participant",
      duration: "4-6 minutes",
      color: "teal-emerald",
      rules: [
        "Solo performance only",
        "Any language allowed",
        "Original content preferred",
        "No offensive or vulgar jokes",
        "Props minimal or not required",
        "Timing and delivery are key factors"
      ]
    },
    {
      id: 10,
      name: "Beat Boxing",
      code: "BEB",
      icon: "🎵",
      category: "music",
      teamSize: "1 participant",
      duration: "3-5 minutes",
      color: "teal-emerald",
      rules: [
        "Solo performance only",
        "No additional instruments allowed",
        "Any style and technique allowed",
        "Looping devices not permitted",
        "Creativity and rhythm will be judged"
      ]
    },
    {
      id: 11,
      name: "Rap Battle",
      code: "RAB",
      icon: "🎤",
      category: "music",
      teamSize: "1 participant",
      duration: "3-4 minutes per round",
      color: "teal-emerald",
      rules: [
        "Solo performance in battle format",
        "Any language allowed",
        "Freestyling or pre-written raps both allowed",
        "No offensive or personal attacks",
        "Judges decision is final",
        "Multiple rounds: Elimination format"
      ]
    },
    {
      id: 12,
      name: "DJ Night",
      code: "DJN",
      icon: "🎧",
      category: "music",
      teamSize: "1-2 participants",
      duration: "15-20 minutes",
      color: "teal-emerald",
      rules: [
        "Solo or duo performance",
        "Own equipment must be brought",
        "Playlist must include crowd interaction",
        "Transitions and mixing skills judged",
        "No pre-recorded sets (live mixing required)",
        "Setup time: 10 minutes before performance"
      ]
    },
    {
      id: 13,
      name: "Band Performance",
      code: "BAN",
      icon: "🎸",
      category: "music",
      teamSize: "3-8 participants",
      duration: "10-15 minutes",
      color: "teal-emerald",
      rules: [
        "Team must have 3-8 members",
        "All instruments must be arranged by team",
        "Original or cover songs allowed",
        "Sound check time will be provided",
        "Genre: Any (Rock, Pop, Classical fusion, etc.)",
        "Vocals are mandatory"
      ]
    },
    {
      id: 14,
      name: "Photography",
      code: "PHO",
      icon: "📷",
      category: "visual",
      teamSize: "1 participant",
      duration: "Submission based",
      color: "teal-emerald",
      rules: [
        "Solo participation only",
        "Theme will be announced on event day",
        "Maximum 5 photos can be submitted",
        "Original photographs only (no stock images)",
        "Basic editing allowed (no heavy manipulation)",
        "Digital submission in high resolution"
      ]
    },
    {
      id: 15,
      name: "Short Film",
      code: "SHF",
      icon: "🎥",
      category: "visual",
      teamSize: "3-10 participants",
      duration: "5-15 minutes film length",
      color: "teal-emerald",
      rules: [
        "Team must have 3-10 members",
        "Film duration: 5-15 minutes",
        "Any genre allowed (Drama, Comedy, Thriller, etc.)",
        "Original content only",
        "Submission deadline: 3 days before event",
        "College name must be credited"
      ]
    },
    {
      id: 16,
      name: "Treasure Hunt",
      code: "TRH",
      icon: "🗺️",
      category: "variety",
      teamSize: "3-5 participants",
      duration: "2-3 hours",
      color: "teal-emerald",
      rules: [
        "Team must have 3-5 members",
        "Physical and mental challenges involved",
        "All team members must stay together",
        "Use of mobile internet not allowed during hunt",
        "First team to complete wins",
        "Clues provided at each checkpoint"
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Events', icon: '🎯' },
    { id: 'dance', name: 'Dance', icon: '💃' },
    { id: 'music', name: 'Music', icon: '🎵' },
    { id: 'theater', name: 'Theater', icon: '🎭' },
    { id: 'visual', name: 'Visual Arts', icon: '📸' },
    { id: 'variety', name: 'Variety', icon: '✨' }
  ];

  const toggleEvent = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(e => e.category === selectedCategory);

  return (
    <div className="er-container">
      <div className="er-bg-elements">
        <div className="er-orb er-orb-1"></div>
        <div className="er-orb er-orb-2"></div>
        <div className="er-orb er-orb-3"></div>
      </div>

      <div className="er-wrapper">
        <div className="er-header">
          
          <h1 className="er-title">Event Rules</h1>
          <p className="er-subtitle">Enthusia 2025 - 16 Amazing Events</p>
          <div className="er-stars">
            <Star size={20} />
            <Star size={20} />
            <Star size={20} />
          </div>
        </div>

        <div className="er-banner">
          <div className="er-banner-icon">
            <AlertCircle size={28} />
          </div>
          <div className="er-banner-content">
            <h3 className="er-banner-title">
              <Zap size={24} />
              General Rules
            </h3>
            <div className="er-banner-grid">
              <div className="er-banner-item">
                <div className="er-bullet"></div>
                <span>All participants must carry their college ID</span>
              </div>
              <div className="er-banner-item">
                <div className="er-bullet"></div>
                <span>Registration closes 1 hour before event starts</span>
              </div>
              <div className="er-banner-item">
                <div className="er-bullet"></div>
                <span>Judge's decision is final and binding</span>
              </div>
              <div className="er-banner-item">
                <div className="er-bullet"></div>
                <span>Organizers reserve the right to modify rules if necessary</span>
              </div>
            </div>
          </div>
        </div>

        <div className="er-category-filter">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`er-category-btn ${selectedCategory === cat.id ? 'er-category-active' : ''}`}
            >
              <span className="er-cat-icon">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        <div className="er-events-grid">
          {filteredEvents.map((event, index) => (
            <div key={event.id} className="er-event-card" style={{ animationDelay: `${index * 100}ms` }}>
              <div 
                className={`er-card-header er-color-${event.color}`}
                onClick={() => toggleEvent(event.id)}
              >
                <div className="er-card-header-content">
                  <div className="er-event-icon">{event.icon}</div>
                  <div className="er-event-text">
                    <h3 className="er-event-name">{event.name}</h3>
                    <span className="er-event-code">{event.code}</span>
                  </div>
                </div>
                <div className={`er-expand-icon ${expandedEvent === event.id ? 'er-expanded' : ''}`}>
                  <Sparkles size={24} />
                </div>
              </div>

              {expandedEvent === event.id && (
                <div className="er-card-body">
                  <div className="er-info-grid">
                    <div className="er-info-box er-info-blue">
                      <div className="er-info-header">
                        <Users size={18} />
                        <span className="er-info-label">Team Size</span>
                      </div>
                      <p className="er-info-value">{event.teamSize}</p>
                    </div>
                    <div className="er-info-box er-info-purple">
                      <div className="er-info-header">
                        <Clock size={18} />
                        <span className="er-info-label">Duration</span>
                      </div>
                      <p className="er-info-value">{event.duration}</p>
                    </div>
                  </div>

                  <div className="er-rules-container">
                    <div className="er-rules-header">
                      <Trophy size={20} />
                      <h4 className="er-rules-title">Rules & Regulations</h4>
                    </div>
                    <div className="er-rules-list">
                      {event.rules.map((rule, i) => (
                        <div key={i} className="er-rule-item">
                          <div className="er-rule-dot"></div>
                          <span className="er-rule-text">{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="er-footer">
          <p className="er-footer-text">For more information or clarifications</p>
          <p className="er-footer-contact">📞 Sakthivel S - 8925490989</p>
        </div>
      </div>

      <style>{`
        :root {
          --enthusia-navy: #0a2540;
          --enthusia-dark-blue: #1a365d;
          --enthusia-blue: #1a5f7a;
          --enthusia-royal-blue: #4169e1;
          --enthusia-sky-blue: #87ceeb;
          --enthusia-light-blue: #e1f5fe;
          --enthusia-pastel-blue: #f0f8ff;
          --enthusia-dark-red: #8b0000;
          --enthusia-red: #c41e3a;
          --enthusia-crimson: #dc143c;
          --enthusia-coral: #ff7f50;
          --enthusia-light-coral: #ffefed;
          --enthusia-orange: #ff8c00;
          --enthusia-dark-orange: #ff4500;
          --enthusia-light-orange: #ffe4cc;
          --enthusia-amber: #ffbf00;
          --enthusia-dark-brown: #5d4037;
          --enthusia-coffee: #6f4e37;
          --enthusia-bronze: #cd7f32;
          --enthusia-chocolate: #d2691e;
          --enthusia-tan: #d2b48c;
          --enthusia-beige: #f5f5dc;
          --enthusia-sand: #f4a460;
          --enthusia-dark-green: #006400;
          --enthusia-green: #228b22;
          --enthusia-emerald: #50c878;
          --enthusia-forest: #228b22;
          --enthusia-sage: #bcb88a;
          --enthusia-mint: #98ff98;
          --enthusia-light-green: #f1f8e9;
          --enthusia-olive: #808000;
          --enthusia-dark-gold: #b8860b;
          --enthusia-gold: #ffd700;
          --enthusia-light-gold: #fff9c4;
          --enthusia-silver: #c0c0c0;
          --enthusia-light-silver: #f8f8ff;
          --enthusia-platinum: #e5e4e2;
          --enthusia-rose-gold: #b76e79;
          --enthusia-dark-purple: #4b0082;
          --enthusia-purple: #800080;
          --enthusia-violet: #8a2be2;
          --enthusia-lavender: #e6e6fa;
          --enthusia-magenta: #ff00ff;
          --enthusia-pink: #ff69b4;
          --enthusia-light-pink: #fff0f5;
          --enthusia-teal: #008080;
          --enthusia-cyan: #00ffff;
          --enthusia-aqua: #7fffd4;
          --enthusia-black: #000000;
          --enthusia-dark-gray: #2d3748;
          --enthusia-gray: #4a5568;
          --enthusia-medium-gray: #718096;
          --enthusia-light-gray: #a0aec0;
          --enthusia-lighter-gray: #e2e8f0;
          --enthusia-white: #ffffff;
          --enthusia-off-white: #f7fafc;
          --enthusia-ruby: #e0115f;
          --enthusia-sapphire: #0f52ba;
          --enthusia-topaz: #ffc87c;
          --enthusia-amethyst: #9966cc;
          --enthusia-jade: #00a86b;
          --enthusia-neon-blue: #1f51ff;
          --enthusia-neon-green: #39ff14;
          --enthusia-neon-pink: #ff10f0;
          --enthusia-electric-purple: #bf00ff;
          --enthusia-cyber-yellow: #ffd300;
          --enthusia-pastel-pink: #ffd1dc;
          --enthusia-pastel-purple: #e1c6ff;
          --enthusia-pastel-green: #c8e6c9;
          --enthusia-pastel-yellow: #fff9c4;
          --enthusia-pastel-orange: #ffccbc;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .er-container {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--enthusia-navy) 0%, var(--enthusia-dark-blue) 50%, var(--enthusia-blue) 100%);
          padding: 60px 20px;
          position: relative;
          overflow: hidden;
        }

        .er-bg-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }

        .er-orb {
          position: absolute;
          border-radius: 50%;
          animation: er-float 20s infinite ease-in-out;
        }

        .er-orb-1 {
          width: 400px;
          height: 400px;
          top: 10%;
          left: -10%;
          background: radial-gradient(circle, rgba(65, 105, 225, 0.15), transparent);
        }

        .er-orb-2 {
          width: 350px;
          height: 350px;
          bottom: 20%;
          right: -5%;
          background: radial-gradient(circle, rgba(128, 0, 128, 0.15), transparent);
          animation-delay: 7s;
        }

        .er-orb-3 {
          width: 300px;
          height: 300px;
          top: 50%;
          left: 50%;
          background: radial-gradient(circle, rgba(255, 105, 180, 0.15), transparent);
          animation-delay: 14s;
        }

        @keyframes er-float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translate(30px, -30px) scale(1.1);
            opacity: 0.2;
          }
        }

        .er-wrapper {
          max-width: 1300px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .er-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .er-header-icon {
          display: inline-flex;
          align-items: center;
          justify-center: center;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--enthusia-gold), var(--enthusia-amber));
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(255, 215, 0, 0.3);
          margin-bottom: 20px;
          animation: er-bounce 2s infinite;
        }

        .er-header-icon svg {
          color: var(--enthusia-white);
        }

        @keyframes er-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .er-title {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 900;
          background: linear-gradient(90deg, var(--enthusia-sky-blue), var(--enthusia-violet), var(--enthusia-pink));
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: er-gradient 3s ease infinite;
          margin-bottom: 15px;
        }

        @keyframes er-gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .er-subtitle {
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          color: var(--enthusia-light-blue);
          font-weight: 500;
          margin-bottom: 15px;
        }

        .er-stars {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: var(--enthusia-gold);
        }

        .er-stars svg {
          fill: currentColor;
        }

        .er-banner {
          background: linear-gradient(135deg, var(--enthusia-gold), var(--enthusia-amber));
          border-radius: 24px;
          padding: 30px;
          margin-bottom: 40px;
          display: flex;
          gap: 25px;
          align-items: flex-start;
          box-shadow: 0 10px 40px rgba(255, 215, 0, 0.25);
        }

        .er-banner-icon {
          flex-shrink: 0;
          width: 50px;
          height: 50px;
          background: var(--enthusia-gold);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .er-banner-icon svg {
          color: var(--enthusia-navy);
        }

        .er-banner-content {
          flex: 1;
        }

        .er-banner-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--enthusia-navy);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .er-banner-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 12px;
        }

        .er-banner-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--enthusia-dark-blue);
          font-weight: 600;
        }

        .er-bullet {
          width: 8px;
          height: 8px;
          background: var(--enthusia-navy);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .er-category-filter {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin-bottom: 40px;
        }

        .er-category-btn {
          padding: 12px 24px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.95rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          color: var(--enthusia-white);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .er-category-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        .er-category-active {
          background: linear-gradient(135deg, var(--enthusia-royal-blue), var(--enthusia-purple)) !important;
          box-shadow: 0 8px 25px rgba(65, 105, 225, 0.4);
        }

        .er-cat-icon {
          font-size: 1.2rem;
        }

        .er-events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(800px, 1fr));
          gap: 15px;
          margin-bottom: 50px;
        }

        .er-event-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s ease;
          animation: er-fadeInUp 0.6s ease forwards;
          opacity: 0;
        }

        @keyframes er-fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .er-event-card {
          transform: translateY(20px);
        }

        .er-event-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .er-card-header {
          padding: 25px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }

        .er-card-header:hover {
          filter: brightness(1.1);
        }

        .er-color-pink-rose { background: linear-gradient(135deg, var(--enthusia-pink), var(--enthusia-crimson)); }
        .er-color-purple-indigo { background: linear-gradient(135deg, var(--enthusia-purple), var(--enthusia-sapphire)); }
        .er-color-blue-cyan { background: linear-gradient(135deg, var(--enthusia-royal-blue), var(--enthusia-cyan)); }
        .er-color-teal-emerald { background: linear-gradient(135deg, var(--enthusia-teal), var(--enthusia-emerald)); }
        .er-color-yellow-orange { background: linear-gradient(135deg, var(--enthusia-gold), var(--enthusia-orange)); }
        .er-color-fuchsia-pink { background: linear-gradient(135deg, var(--enthusia-magenta), var(--enthusia-pink)); }
        .er-color-violet-purple { background: linear-gradient(135deg, var(--enthusia-violet), var(--enthusia-purple)); }
        .er-color-red-rose { background: linear-gradient(135deg, var(--enthusia-red), var(--enthusia-ruby)); }
        .er-color-amber-yellow { background: linear-gradient(135deg, var(--enthusia-amber), var(--enthusia-cyber-yellow)); }
        .er-color-lime-green { background: linear-gradient(135deg, var(--enthusia-neon-green), var(--enthusia-green)); }
        .er-color-orange-red { background: linear-gradient(135deg, var(--enthusia-orange), var(--enthusia-red)); }
        .er-color-indigo-blue { background: linear-gradient(135deg, var(--enthusia-sapphire), var(--enthusia-royal-blue)); }
        .er-color-rose-red { background: linear-gradient(135deg, var(--enthusia-ruby), var(--enthusia-crimson)); }
        .er-color-sky-blue { background: linear-gradient(135deg, var(--enthusia-sky-blue), var(--enthusia-royal-blue)); }
        .er-color-cyan-teal { background: linear-gradient(135deg, var(--enthusia-cyan), var(--enthusia-teal)); }
        .er-color-emerald-green { background: linear-gradient(135deg, var(--enthusia-emerald), var(--enthusia-green)); }

        .er-card-header-content {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .er-event-icon {
          font-size: 3rem;
          transition: transform 0.3s ease;
        }

        .er-event-card:hover .er-event-icon {
          transform: scale(1.15);
        }

        .er-event-text {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .er-event-name {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--enthusia-white);
          margin: 0;
        }

        .er-event-code {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 700;
          font-family: monospace;
          color: var(--enthusia-white);
          width: fit-content;
        }

        .er-expand-icon {
          color: var(--enthusia-white);
          transition: transform 0.3s ease;
        }

        .er-expanded {
          transform: rotate(180deg);
        }

        .er-card-body {
          padding: 30px;
          animation: er-slideDown 0.4s ease;
        }

        @keyframes er-slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .er-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 15px;
          margin-bottom: 25px;
        }

        .er-info-box {
          padding: 18px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .er-info-blue {
          background: rgba(65, 105, 225, 0.1);
          border-color: rgba(65, 105, 225, 0.2);
        }

        .er-info-purple {
          background: rgba(128, 0, 128, 0.1);
          border-color: rgba(128, 0, 128, 0.2);
        }

        .er-info-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .er-info-blue .er-info-header svg {
          color: var(--enthusia-royal-blue);
        }

        .er-info-purple .er-info-header svg {
          color: var(--enthusia-violet);
        }

        .er-info-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--enthusia-light-gray);
        }

        .er-info-value {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--enthusia-white);
          margin: 0;
        }

        .er-rules-container {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.08));
          backdrop-filter: blur(10px);
          border-radius: 18px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .er-rules-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .er-rules-header svg {
          color: var(--enthusia-gold);
        }

        .er-rules-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--enthusia-white);
          margin: 0;
        }

        .er-rules-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .er-rule-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .er-rule-dot {
          width: 24px;
          height: 24px;
          min-width: 24px;
          background: rgba(152, 255, 152, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
          position: relative;
        }

        .er-rule-dot::after {
          content: '';
          width: 8px;
          height: 8px;
          background: var(--enthusia-mint);
          border-radius: 50%;
        }

        .er-rule-text {
          flex: 1;
          color: var(--enthusia-lighter-gray);
          font-weight: 500;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .er-footer {
          text-align: center;
          padding: 40px 30px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .er-footer-text {
          font-size: 1.15rem;
          color: var(--enthusia-light-blue);
          margin-bottom: 12px;
          font-weight: 500;
        }

        .er-footer-contact {
          font-size: 1.5rem;
          font-weight: 800;
          background: linear-gradient(90deg, var(--enthusia-gold), var(--enthusia-amber));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }

        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 12px;
        }

        ::-webkit-scrollbar-track {
          background: var(--enthusia-navy);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, var(--enthusia-royal-blue), var(--enthusia-purple));
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, var(--enthusia-sapphire), var(--enthusia-violet));
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .er-events-grid {
            grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .er-container {
            padding: 40px 15px;
          }

          .er-title {
            font-size: 2.5rem;
          }

          .er-subtitle {
            font-size: 1rem;
          }

          .er-banner {
            flex-direction: column;
            padding: 25px;
          }

          .er-banner-grid {
            grid-template-columns: 1fr;
          }

          .er-category-filter {
            gap: 8px;
          }

          .er-category-btn {
            padding: 10px 18px;
            font-size: 0.85rem;
          }

          .er-events-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .er-event-icon {
            font-size: 2.5rem;
          }

          .er-event-name {
            font-size: 1.2rem;
          }

          .er-card-header {
            padding: 20px;
          }

          .er-card-body {
            padding: 20px;
          }

          .er-info-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .er-header-icon {
            width: 60px;
            height: 60px;
          }

          .er-header-icon svg {
            width: 32px;
            height: 32px;
          }

          .er-title {
            font-size: 2rem;
          }

          .er-banner-title {
            font-size: 1.3rem;
          }

          .er-event-name {
            font-size: 1.1rem;
          }

          .er-footer-contact {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ERules;