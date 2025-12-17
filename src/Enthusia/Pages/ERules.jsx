import React, { useState, useEffect } from 'react';
import { Users, Clock, ChevronRight } from 'lucide-react';

const ERules = () => {
  const [expandedEvent, setExpandedEvent] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const events = [
    {
      id: 1,
      name: "Comic Satire",
      code: "CS",
      icon: "🎭",
      teamSize: "1-10 participants",
      duration: "5 minutes",
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
      code: "SI",
      icon: "🎻",
      teamSize: "1 participant",
      duration: "4 minutes",
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
      code: "GI",
      icon: "🎸",
      teamSize: "2-7 participants",
      duration: "5 minutes",
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
      code: "SD",
      icon: "💃",
      teamSize: "1 participant",
      duration: "4 minutes",
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
      code: "DD",
      icon: "💫",
      teamSize: "2 participants",
      duration: "4 minutes",
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
      code: "GD",
      icon: "🎪",
      teamSize: "8-15 participants",
      duration: "5 minutes",
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
      code: "SS",
      icon: "🎤",
      teamSize: "1 participant",
      duration: "5 minutes",
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
      code: "GS",
      icon: "🎶",
      teamSize: "2-6 participants",
      duration: "5 minutes",
      rules: [
        "Maximum duration: 5 minutes",
        "Own composition shall be performed",
        "Vulgarity should be avoided at any extent in the lyrics",
        "Judgement will be based on singing nuances, song selection and general impression"
      ]
    },
  
    {
      id: 10,
      name: "Imitation",
      code: "IP",
      icon: "🎬",
      teamSize: "1 participant",
      duration: "5 minutes",
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
      code: "FP",
      icon: "👗",
      teamSize: "7-15 participants",
      duration: "6 minutes",
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
      code: "MD",
      icon: "🎞️",
      teamSize: "8-15 participants",
      duration: "5 minutes",
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
      code: "SK",
      icon: "🎪",
      teamSize: "8-15 participants",
      duration: "5 minutes",
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
      code: "SF",
      icon: "🎥",
      teamSize: "4-12 participants",
      duration: "15 minutes",
      rules: [
        "Maximum duration: 15 minutes",
        "Vulgarity should be avoided in dialogues and scenes",
        "Maximum crew size is 12 members",
        "Judgement will be based on story, direction, acting, editing, audio and video quality",
        "Full short film must be submitted during prelims"
      ]
    },
    
    {
      id: 16,
      name: "Anchoring",
      code: "AC",
      icon: "🎙️",
      teamSize: "1 participant",
      duration: "5 minutes",
      rules: [
        "It is a solo event",
        "Maximum duration: 5 minutes",
        "Participants must prepare their own content",
        "Vulgarity or offensive language should be avoided",
        "Judgement will be based on voice modulation, confidence, content, communication and audience engagement"
      ]
    }
  ];

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(135deg, #0a2540 10%, #1a365d 10%, #1a5f7a 100%);
          background-attachment: fixed;
          color: #f1f5f9;
          min-height: 100vh;
        }

        .page-wrapper {
          min-height: 100vh;
          padding: 60px 20px;
         background: linear-gradient(135deg, #0a2540 100%, #1a365d 10%, #1a5f7a 100%);
           
          position: relative;
        }

        .page-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(45deg, rgba(245, 158, 11, 0.02) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(245, 158, 11, 0.02) 1px, transparent 1px);
          background-size: 20px 20px;
          pointer-events: none;
          opacity: 0.5;
        }

        .content-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .page-title {
          text-align: center;
          margin-bottom: 50px;
        }

        .page-title h1 {
          font-size: 42px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 8px;
          letter-spacing: -1px;
        }

        .page-title p {
          font-size: 16px;
          color: #94a3b8;
          font-weight: 500;
        }

        .general-box {
          background: linear-gradient(135deg, 
            rgba(30, 41, 59, 0.9), 
            rgba(51, 65, 85, 0.7)
          );
          border: 2px solid rgba(245, 158, 11, 0.2);
          border-radius: 16px;
          padding: 28px;
          margin-bottom: 40px;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(245, 158, 11, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .general-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(245, 158, 11, 0.5), 
            rgba(245, 158, 11, 0.8), 
            rgba(245, 158, 11, 0.5), 
            transparent
          );
        }

        .general-box h2 {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 20px;
        }

        .general-items {
          display: grid;
          gap: 12px;
        }

        .general-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(71, 85, 105, 0.3);
          border-radius: 8px;
          border: 1px solid #475569;
        }

        .number-badge {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #f59e0b, #ea580c);
          color: #ffffff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
        }

        .general-item span {
          color: #e2e8f0;
          font-size: 14px;
          font-weight: 500;
        }

        .events-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .event-box {
          background: linear-gradient(135deg, 
            rgba(30, 41, 59, 0.9), 
            rgba(51, 65, 85, 0.7)
          );
          border: 2px solid rgba(71, 85, 105, 0.6);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(245, 158, 11, 0.05);
          position: relative;
        }

        .event-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(245, 158, 11, 0.3), 
            rgba(245, 158, 11, 0.6), 
            rgba(245, 158, 11, 0.3), 
            transparent
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .event-box:hover {
          border-color: rgba(245, 158, 11, 0.4);
          box-shadow: 
            0 8px 30px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(245, 158, 11, 0.2),
            0 4px 20px rgba(245, 158, 11, 0.1);
          transform: translateY(-2px);
        }

        .event-box:hover::before {
          opacity: 1;
        }

        .event-top {
          padding: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(30, 41, 59, 0.8);
          transition: background 0.2s ease;
        }

        .event-top:hover {
          background: rgba(51, 65, 85, 0.6);
        }

        .event-left {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }

        .event-emoji {
          font-size: 36px;
          line-height: 1;
        }

        .event-details h3 {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 6px;
        }

        .event-tag {
          display: inline-block;
          background: rgba(245, 158, 11, 0.2);
          color: #fbbf24;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'Courier New', monospace;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .arrow-icon {
          color: #94a3b8;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .arrow-icon.open {
          transform: rotate(90deg);
        }

        .event-content {
          border-top: 2px solid #475569;
          padding: 24px;
          background: rgba(15, 23, 42, 0.6);
        }

        .info-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }

        .info-card {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid #475569;
          border-radius: 10px;
          padding: 14px;
        }

        .info-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }

        .info-label svg {
          width: 14px;
          height: 14px;
          color: #fbbf24;
        }

        .info-text {
          font-size: 14px;
          font-weight: 600;
          color: #e2e8f0;
        }

        .rules-box {
          background: rgba(30, 41, 59, 0.9);
          border: 1px solid #475569;
          border-radius: 10px;
          padding: 20px;
        }

        .rules-heading {
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 16px;
        }

        .rules-items {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .rule-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .rule-num {
          width: 26px;
          height: 26px;
          background: linear-gradient(135deg, #f59e0b, #ea580c);
          color: #ffffff;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 13px;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
        }

        .rule-content {
          flex: 1;
          font-size: 14px;
          color: #cbd5e1;
          line-height: 1.6;
          padding-top: 2px;
        }

        .awards-area {
          margin-top: 60px;
        }

        .section-head {
          text-align: center;
          margin-bottom: 40px;
        }

        .section-head h2 {
          font-size: 36px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 8px;
          letter-spacing: -1px;
        }

        .awards-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .award-box {
          background: linear-gradient(135deg, #1e293b, #334155);
          border: 2px solid #475569;
          border-radius: 16px;
          padding: 28px;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .award-box:hover {
          border-color: #64748b;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
          transform: translateY(-4px);
        }

        .award-emoji {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .award-name {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 20px;
        }

        .points-row {
          background: rgba(71, 85, 105, 0.4);
          border-radius: 8px;
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          border: 1px solid #475569;
        }

        .points-row span {
          font-size: 14px;
          font-weight: 600;
          color: #e2e8f0;
        }

        .criteria-list {
          margin-top: 20px;
          text-align: left;
        }

        .criteria-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 12px;
        }

        .criteria-num {
          width: 24px;
          height: 24px;
          background: rgba(245, 158, 11, 0.2);
          color: #fbbf24;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
          flex-shrink: 0;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .criteria-text {
          flex: 1;
          font-size: 13px;
          color: #cbd5e1;
          line-height: 1.5;
          padding-top: 2px;
        }

        .contact-box {
          background: linear-gradient(135deg, #1e293b, #334155);
          border: 2px solid #475569;
          border-radius: 16px;
          padding: 32px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .contact-box p {
          color: #94a3b8;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .phone-number {
          font-size: 20px;
          font-weight: 700;
          color: #fbbf24;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .page-title h1 {
            font-size: 32px;
          }

          .info-row {
            grid-template-columns: 1fr;
          }

          .awards-row {
            grid-template-columns: 1fr;
          }

          .event-emoji {
            font-size: 32px;
          }

          .event-details h3 {
            font-size: 16px;
          }
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #1e293b;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #f59e0b, #ea580c);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #fbbf24, #f97316);
        }
      `}</style>

      <div className="page-wrapper">
        <div className="content-container">
          
          {/* Title */}
          <div className="page-title animate-on-scroll">
            <h1>Event Rules</h1>
            <p>Enthusia' 26 • 14 Events</p>
          </div>
          {/* General Rules */}
          <div className="general-box animate-on-scroll">
            <h2>General Rules</h2>
            <div className="general-items">
              <div className="general-item">
                <div className="number-badge">1</div>
                <span>All participants must carry their college ID</span>
              </div>
              <div className="general-item">
                <div className="number-badge">2</div>
                <span>Registration closes 1 hour before event starts</span>
              </div>
              <div className="general-item">
                <div className="number-badge">3</div>
                <span>Judge's decision is final and binding</span>
              </div>
              <div className="general-item">
                <div className="number-badge">4</div>
                <span>Organizers reserve the right to modify rules</span>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="events-list">
            {events.map((event, index) => (
              <div key={event.id} className="event-box animate-on-scroll" style={{ transitionDelay: `${index * 50}ms` }}>
                <div className="event-top" onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}>
                  <div className="event-left">
                    <div className="event-emoji">{event.icon}</div>
                    <div className="event-details">
                      <h3>{event.name}</h3>
                      <span className="event-tag">{event.code}</span>
                    </div>
                  </div>
                  <ChevronRight className={`arrow-icon ${expandedEvent === event.id ? 'open' : ''}`} size={24} />
                </div>

                {expandedEvent === event.id && (
                  <div className="event-content">
                    <div className="info-row">
                      <div className="info-card">
                        <div className="info-label">
                          <Users />
                          <span>Team Size</span>
                        </div>
                        <div className="info-text">{event.teamSize}</div>
                      </div>
                      <div className="info-card">
                        <div className="info-label">
                          <Clock />
                          <span>Duration</span>
                        </div>
                        <div className="info-text">{event.duration}</div>
                      </div>
                    </div>

                    <div className="rules-box">
                      <div className="rules-heading">Rules & Regulations</div>
                      <div className="rules-items">
                        {event.rules.map((rule, i) => (
                          <div key={i} className="rule-row">
                            <div className="rule-num">{i + 1}</div>
                            <div className="rule-content">{rule}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Awards Section */}
          <div className="awards-area animate-on-scroll">
            <div className="section-head">
              <h2>Awards & Recognition</h2>
            </div>

            <div className="awards-row">
              <div className="award-box">
                <div className="award-emoji">🏆</div>
                <div className="award-name">Best Department</div>
                <div className="points-row">
                  <span>1st Place</span>
                  <span>100 Points</span>
                </div>
                <div className="points-row">
                  <span>2nd Place</span>
                  <span>50 Points</span>
                </div>
                <div className="points-row">
                  <span>3rd Place</span>
                  <span>30 Points</span>
                </div>
              </div>

              <div className="award-box">
                <div className="award-emoji">👑</div>
                <div className="award-name">Mr. Enthusia</div>
                <div className="criteria-list">
                  <div className="criteria-row">
                    <div className="criteria-num">1</div>
                    <div className="criteria-text">Highest solo event points</div>
                  </div>
                  <div className="criteria-row">
                    <div className="criteria-num">2</div>
                    <div className="criteria-text">Multiple event participation</div>
                  </div>
                  <div className="criteria-row">
                    <div className="criteria-num">3</div>
                    <div className="criteria-text">No disqualifications</div>
                  </div>
                  <div className="criteria-row">
                    <div className="criteria-num">4</div>
                    <div className="criteria-text">Good discipline & behavior</div>
                  </div>
                </div>
              </div>

              <div className="award-box">
                <div className="award-emoji">👸</div>
                <div className="award-name">Ms. Enthusia</div>
                <div className="criteria-list">
                  <div className="criteria-row">
                    <div className="criteria-num">1</div>
                    <div className="criteria-text">Highest solo event points</div>
                  </div>
                  <div className="criteria-row">
                    <div className="criteria-num">2</div>
                    <div className="criteria-text">Multiple event participation</div>
                  </div>
                  <div className="criteria-row">
                    <div className="criteria-num">3</div>
                    <div className="criteria-text">No rule violations</div>
                  </div>
                  <div className="criteria-row">
                    <div className="criteria-num">4</div>
                    <div className="criteria-text">Good discipline & behavior</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="contact-box animate-on-scroll">
            <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>Contact Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(30, 41, 59, 0.8)', padding: '16px', borderRadius: '12px', border: '1px solid #475569' }}>
                <p style={{ color: '#94a3b8', marginBottom: '8px', fontSize: '14px' }}>Event Coordinator</p>
                <p className="phone-number">📞 Sakthivel S - 8925490989</p>
              </div>
              
            </div>
            <p style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'center' }}>
              For any queries, clarifications, or assistance regarding Enthusia 2026
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default ERules;