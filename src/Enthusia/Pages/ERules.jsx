import React, { useState } from 'react';
import { BookOpen, Users, Trophy, Clock, AlertCircle, Sparkles, Star, Zap } from 'lucide-react';

const ERules = () => {
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const events = [
    {
      id: 1,
      name: "Comic Satire",
      code: "CST",
      icon: "🎭",
      category: "theater",
      teamSize: `1-10 participants`,
      duration: "5 minutes",
      color: "blue-purple",
      rules: [
        "May be solo or team with a maximum of 10 members",
        "Maximum duration: 5 minutes",
        "Vulgarity should be avoided at any extent",
        "Judgement will be based on concept, timing and performance"
      ]
    },
    {
      id: 2,
      name: "Solo Instrumental",
      code: "SOI",
      icon: "🎻",
      category: "music",
      teamSize: "1 participant",
      duration: "4 minutes",
      color: "green-teal",
      rules: [
        "It is a solo event",
        "Maximum duration: 4 minutes",
        "Pre-recorded music and karaoke are strictly not allowed",
        "Own composition shall be performed",
        "Cine songs instrumental shall be performed",
        "Participants must bring their own instruments"
      ]
    },
    {
      id: 3,
      name: "Group Instrumental",
      code: "GRI",
      icon: "�",
      category: "music",
      teamSize: "2-7 participants",
      duration: "5 minutes",
      color: "orange-red",
      rules: [
        "Maximum 7 members can participate",
        "Maximum duration: 5 minutes",
        "Pre-recorded music and karaoke are strictly not allowed",
        "Own composition shall be performed",
        "Cine songs instrumental shall be performed",
        "Participants must bring their own instruments"
      ]
    },
    {
      id: 4,
      name: "Solo Dance",
      code: "SOD",
      icon: "💃",
      category: "dance",
      teamSize: "1 participant",
      duration: "4 minutes",
      color: "pink-purple",
      rules: [
        "Maximum duration: 4 minutes",
        "Audio quality must be good",
        "Vulgarity should be avoided in lyrics, dress and dance movements",
        "Judgement will be based on theme, attire, expressions, choreography, song selection and general impression"
      ]
    },
    {
      id: 5,
      name: "Dual Dance",
      code: "DUD",
      icon: "�",
      category: "dance",
      teamSize: "2 participants",
      duration: "4 minutes",
      color: "cyan-blue",
      rules: [
        "Teams must consist of 2 participants",
        "Maximum duration: 4 minutes",
        "Audio quality must be good",
        "Vulgarity should be avoided in lyrics, attire and dance movements",
        "Judgement will be based on theme, attire, expression, steps, song selection and general impression"
      ]
    },
    {
      id: 6,
      name: "Group Dance",
      code: "GRD",
      icon: "�",
      category: "dance",
      teamSize: "8-15 participants",
      duration: "5 minutes",
      color: "purple-pink",
      rules: [
        "Teams should contain a minimum of 8 and a maximum of 15 members",
        "Maximum duration: 5 minutes",
        "Audio quality must be good",
        "Vulgarity should be avoided at any extent",
        "Judgement will be based on theme, costumes, expression, steps, song selection, coordination and general impression",
        "Usage of dangerous properties is strictly prohibited"
      ]
    },
    {
      id: 7,
      name: "Solo Singing",
      code: "SOS",
      icon: "�",
      category: "music",
      teamSize: "1 participant",
      duration: "5 minutes",
      color: "yellow-orange",
      rules: [
        "Maximum duration: 5 minutes",
        "Karaoke shall be used",
        "Vulgarity should be avoided at any extent in the lyrics",
        "Judgement will be based on singing nuances and general impression"
      ]
    },
    {
      id: 8,
      name: "Group Singing",
      code: "GRS",
      icon: "�",
      category: "music",
      teamSize: "2-6 participants",
      duration: "5 minutes",
      color: "teal-green",
      rules: [
        "Maximum duration: 5 minutes",
        "Own composition shall be performed",
        "Vulgarity should be avoided at any extent in the lyrics",
        "Judgement will be based on singing nuances, song selection and general impression"
      ]
    },
    {
      id: 9,
      name: "Mime",
      code: "MIM",
      icon: "🎭",
      category: "theater",
      teamSize: "8-15 participants",
      duration: "5 minutes",
      color: "indigo-purple",
      rules: [
        "Teams should contain a minimum of 8 and a maximum of 15 members",
        "Maximum duration: 5 minutes",
        "Audio quality must be good",
        "Vulgarity should be avoided at any extent",
        "Judgement will be based on theme, expression, music selection, coordination and general impression"
      ]
    },
    {
      id: 10,
      name: "Imitate Personate",
      code: "IMP",
      icon: "�",
      category: "theater",
      teamSize: "1 participant",
      duration: "5 minutes",
      color: "red-orange",
      rules: [
        "It is a solo event",
        "Maximum duration: 5 minutes",
        "Only background scores are allowed",
        "Recorded voices or dialogues will not be tolerated",
        "Vulgarity should be avoided at any extent",
        "Judgement will be based on acting, expression, theme delivery and general impression"
      ]
    },
    {
      id: 11,
      name: "Fashion Parade",
      code: "FAP",
      icon: "👗",
      category: "variety",
      teamSize: "7-15 participants",
      duration: "6 minutes",
      color: "pink-red",
      rules: [
        "Teams should contain a minimum of 7 and a maximum of 15 members",
        "Maximum duration: 6 minutes",
        "Vulgarity should be avoided in attire",
        "Judgement will be based on creativity in costumes, themes and formations",
        "Everyone should be present with their costumes for the prelims itself"
      ]
    },
    {
      id: 12,
      name: "Movie Depiction",
      code: "MOD",
      icon: "�",
      category: "theater",
      teamSize: "8-15 participants",
      duration: "5 minutes",
      color: "blue-cyan",
      rules: [
        "Teams should contain a minimum of 8 and a maximum of 15 members",
        "Maximum duration: 5 minutes",
        "Audio quality must be good",
        "Spoofing the movies will not be entertained",
        "Vulgarity should be avoided at any extent",
        "Judgement will be based on acting, coordination and general impression"
      ]
    },
    {
      id: 13,
      name: "Skit",
      code: "SKT",
      icon: "�",
      category: "theater",
      teamSize: "8-15 participants",
      duration: "5 minutes",
      color: "green-blue",
      rules: [
        "Teams should consist of a minimum of 8 and a maximum of 15 members",
        "Maximum duration: 5 minutes",
        "Audio quality must be good",
        "Vulgarity should be avoided in lyrics, dress and movements",
        "Judgement will be based on theme, expression, music selection, coordination and general impression"
      ]
    },
    {
      id: 14,
      name: "Short Film",
      code: "SHF",
      icon: "🎥",
      category: "visual",
      teamSize: "4-12 participants",
      duration: "15 minutes",
      color: "purple-blue",
      rules: [
        "Maximum duration: 15 minutes",
        "Vulgarity should be avoided in dialogues and scenes",
        "Maximum crew size is 12 members",
        "Judgement will be based on story, direction, acting, editing, audio and video quality",
        "Full short film must be submitted during prelims"
      ]
    },
    {
      id: 15,
      name: "Stand-Up Comedy",
      code: "SUC",
      icon: "😂",
      category: "variety",
      teamSize: "1 participant",
      duration: "5 minutes",
      color: "orange-yellow",
      rules: [
        "It is a solo event",
        "Maximum duration: 5 minutes",
        "Vulgarity should be avoided at any extent",
        "Usage of offensive language is strictly prohibited",
        "Judgement will be based on humor sense, timing, originality and stage presence"
      ]
    },
    {
      id: 16,
      name: "Anchoring",
      code: "ANC",
      icon: "�",
      category: "variety",
      teamSize: "1 participant",
      duration: "5 minutes",
      color: "teal-purple",
      rules: [
        "It is a solo event",
        "Maximum duration: 5 minutes",
        "Participants must prepare their own content",
        "Vulgarity or offensive language should be avoided",
        "Judgement will be based on voice modulation, confidence, content, communication and audience engagement"
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
          <p className="er-subtitle">Enthusia 2025 - 16 Exciting Events</p>
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

        {/* Additional Rules Section */}
        <div className="er-additional-rules">
          <div className="er-section-header">
            <div className="er-section-icon">
              <Trophy size={28} />
            </div>
            <h2 className="er-section-title">Additional Rules & Awards</h2>
          </div>

          <div className="er-rules-grid">
            {/* Best Department */}
            <div className="er-rule-card">
              <div className="er-rule-header">
                <div className="er-rule-icon">🏆</div>
                <h3 className="er-rule-title">Best Department Award</h3>
              </div>
              <div className="er-rule-content">
                <div className="er-points-section">
                  <h4 className="er-points-title">Point Distribution</h4>
                  <div className="er-points-list">
                    <div className="er-point-item">
                      <span className="er-position first">1st Place</span>
                      <span className="er-points">100 Points</span>
                    </div>
                    <div className="er-point-item">
                      <span className="er-position second">2nd Place</span>
                      <span className="er-points">50 Points</span>
                    </div>
                    <div className="er-point-item">
                      <span className="er-position third">3rd Place</span>
                      <span className="er-points">30 Points</span>
                    </div>
                  </div>
                </div>
                <div className="er-formula-section">
                  <h4 className="er-formula-title">Group Event Points</h4>
                  <div className="er-formula">
                    Department Points % = (Members from Dept / Total Members) × 100
                  </div>
                  <p className="er-formula-desc">
                    In case of group events with multiple departments participating, 
                    the points will be shared based on the percentage of participants from each department.
                  </p>
                </div>
              </div>
            </div>

            {/* Mr. Enthusia */}
            <div className="er-rule-card">
              <div className="er-rule-header">
                <div className="er-rule-icon">👑</div>
                <h3 className="er-rule-title">Mr. Enthusia</h3>
              </div>
              <div className="er-rule-content">
                <div className="er-criteria-list">
                  <div className="er-criteria-item">
                    <div className="er-criteria-dot"></div>
                    <span>Highest total points from solo events</span>
                  </div>
                  <div className="er-criteria-item">
                    <div className="er-criteria-dot"></div>
                    <span>Extra value for participating in multiple events</span>
                  </div>
                  <div className="er-criteria-item">
                    <div className="er-criteria-dot"></div>
                    <span>No disqualification in any event</span>
                  </div>
                  <div className="er-criteria-item">
                    <div className="er-criteria-dot"></div>
                    <span>Good discipline, punctuality and behavior</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ms. Enthusia */}
            <div className="er-rule-card">
              <div className="er-rule-header">
                <div className="er-rule-icon">👸</div>
                <h3 className="er-rule-title">Ms. Enthusia</h3>
              </div>
              <div className="er-rule-content">
                <div className="er-criteria-list">
                  <div className="er-criteria-item">
                    <div className="er-criteria-dot"></div>
                    <span>Highest total points from solo events</span>
                  </div>
                  <div className="er-criteria-item">
                    <div className="er-criteria-dot"></div>
                    <span>Extra value for participating in multiple events</span>
                  </div>
                  <div className="er-criteria-item">
                    <div className="er-criteria-dot"></div>
                    <span>No rule violations</span>
                  </div>
                  <div className="er-criteria-item">
                    <div className="er-criteria-dot"></div>
                    <span>Good discipline and behavior</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

        .er-color-blue-purple { background: linear-gradient(135deg, var(--enthusia-royal-blue), var(--enthusia-purple)); }
        .er-color-green-teal { background: linear-gradient(135deg, var(--enthusia-green), var(--enthusia-teal)); }
        .er-color-orange-red { background: linear-gradient(135deg, var(--enthusia-orange), var(--enthusia-red)); }
        .er-color-pink-purple { background: linear-gradient(135deg, var(--enthusia-pink), var(--enthusia-purple)); }
        .er-color-cyan-blue { background: linear-gradient(135deg, var(--enthusia-cyan), var(--enthusia-royal-blue)); }
        .er-color-purple-pink { background: linear-gradient(135deg, var(--enthusia-purple), var(--enthusia-pink)); }
        .er-color-yellow-orange { background: linear-gradient(135deg, var(--enthusia-gold), var(--enthusia-orange)); }
        .er-color-teal-green { background: linear-gradient(135deg, var(--enthusia-teal), var(--enthusia-green)); }
        .er-color-indigo-purple { background: linear-gradient(135deg, var(--enthusia-sapphire), var(--enthusia-purple)); }
        .er-color-red-orange { background: linear-gradient(135deg, var(--enthusia-red), var(--enthusia-orange)); }
        .er-color-pink-red { background: linear-gradient(135deg, var(--enthusia-pink), var(--enthusia-red)); }
        .er-color-blue-cyan { background: linear-gradient(135deg, var(--enthusia-royal-blue), var(--enthusia-cyan)); }
        .er-color-green-blue { background: linear-gradient(135deg, var(--enthusia-green), var(--enthusia-royal-blue)); }
        .er-color-purple-blue { background: linear-gradient(135deg, var(--enthusia-purple), var(--enthusia-royal-blue)); }
        .er-color-orange-yellow { background: linear-gradient(135deg, var(--enthusia-orange), var(--enthusia-gold)); }
        .er-color-teal-purple { background: linear-gradient(135deg, var(--enthusia-teal), var(--enthusia-purple)); }

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

        /* Additional Rules Section */
        .er-additional-rules {
          margin-bottom: 50px;
        }

        .er-section-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 40px;
        }

        .er-section-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--enthusia-gold), var(--enthusia-amber));
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
        }

        .er-section-icon svg {
          color: var(--enthusia-navy);
        }

        .er-section-title {
          font-size: clamp(2rem, 5vw, 2.5rem);
          font-weight: 800;
          background: linear-gradient(90deg, var(--enthusia-gold), var(--enthusia-amber));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }

        .er-rules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 25px;
        }

        .er-rule-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .er-rule-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .er-rule-header {
          background: linear-gradient(135deg, var(--enthusia-royal-blue), var(--enthusia-purple));
          padding: 25px;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .er-rule-icon {
          font-size: 2.5rem;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .er-rule-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--enthusia-white);
          margin: 0;
        }

        .er-rule-content {
          padding: 25px;
        }

        .er-points-section {
          margin-bottom: 25px;
        }

        .er-points-title, .er-formula-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--enthusia-gold);
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .er-points-title::before {
          content: '🎯';
        }

        .er-formula-title::before {
          content: '📊';
        }

        .er-points-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .er-point-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border-left: 4px solid transparent;
        }

        .er-position {
          font-weight: 700;
          font-size: 0.95rem;
        }

        .er-position.first {
          color: var(--enthusia-gold);
        }

        .er-point-item:has(.first) {
          border-left-color: var(--enthusia-gold);
          background: rgba(255, 215, 0, 0.1);
        }

        .er-position.second {
          color: var(--enthusia-silver);
        }

        .er-point-item:has(.second) {
          border-left-color: var(--enthusia-silver);
          background: rgba(192, 192, 192, 0.1);
        }

        .er-position.third {
          color: var(--enthusia-bronze);
        }

        .er-point-item:has(.third) {
          border-left-color: var(--enthusia-bronze);
          background: rgba(205, 127, 50, 0.1);
        }

        .er-points {
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--enthusia-white);
        }

        .er-formula-section {
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .er-formula {
          background: linear-gradient(135deg, var(--enthusia-royal-blue), var(--enthusia-teal));
          color: var(--enthusia-white);
          padding: 15px 20px;
          border-radius: 12px;
          font-family: monospace;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .er-formula-desc {
          font-size: 0.9rem;
          color: var(--enthusia-light-gray);
          line-height: 1.5;
          margin: 0;
        }

        .er-criteria-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .er-criteria-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 8px 0;
        }

        .er-criteria-dot {
          width: 20px;
          height: 20px;
          min-width: 20px;
          background: rgba(255, 105, 180, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
          position: relative;
        }

        .er-criteria-dot::after {
          content: '';
          width: 6px;
          height: 6px;
          background: var(--enthusia-pink);
          border-radius: 50%;
        }

        .er-criteria-item span {
          flex: 1;
          color: var(--enthusia-lighter-gray);
          font-weight: 500;
          line-height: 1.5;
          font-size: 0.95rem;
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
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          }
          
          .er-rules-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .er-container {
            padding: 30px 15px;
          }

          .er-title {
            font-size: 2.2rem;
          }

          .er-subtitle {
            font-size: 1rem;
          }

          .er-banner {
            flex-direction: column;
            padding: 20px;
            gap: 15px;
          }

          .er-banner-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .er-section-header {
            flex-direction: column;
            gap: 10px;
          }

          .er-section-icon {
            width: 50px;
            height: 50px;
          }

          .er-section-title {
            font-size: 1.8rem;
            text-align: center;
          }

          .er-category-filter {
            gap: 8px;
          }

          .er-category-btn {
            padding: 10px 16px;
            font-size: 0.85rem;
          }

          .er-events-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .er-rules-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .er-event-icon {
            font-size: 2.2rem;
          }

          .er-event-name {
            font-size: 1.15rem;
          }

          .er-card-header {
            padding: 18px;
          }

          .er-card-body {
            padding: 18px;
          }

          .er-rule-header {
            padding: 20px;
          }

          .er-rule-content {
            padding: 20px;
          }

          .er-info-grid {
            grid-template-columns: 1fr;
          }

          .er-points-list {
            gap: 10px;
          }

          .er-point-item {
            padding: 10px 14px;
          }
        }

        @media (max-width: 480px) {
          .er-container {
            padding: 20px 10px;
          }

          .er-header-icon {
            width: 50px;
            height: 50px;
          }

          .er-header-icon svg {
            width: 28px;
            height: 28px;
          }

          .er-title {
            font-size: 1.8rem;
          }

          .er-subtitle {
            font-size: 0.9rem;
          }

          .er-section-title {
            font-size: 1.5rem;
          }

          .er-banner-title {
            font-size: 1.2rem;
          }

          .er-event-name {
            font-size: 1rem;
          }

          .er-rule-title {
            font-size: 1.2rem;
          }

          .er-rule-icon {
            font-size: 2rem;
          }

          .er-points-title, .er-formula-title {
            font-size: 1rem;
          }

          .er-formula {
            font-size: 0.8rem;
            padding: 12px 16px;
          }

          .er-footer-contact {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ERules;