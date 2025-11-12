import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, MapPin, User, Phone, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const PrelimsPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10, 1)); // November 2025

  // Event codes mapping
  const codes = {
    'Comic Satire': 'CS', 'Solo Instrumental': 'SI', 'Group Instrumental': 'GI',
    'Solo Dance': 'SD', 'Dual Dance': 'DD', 'Group Dance': 'GD',
    'Solo Singing': 'SS', 'Group Singing': 'GS', 'Mime': 'ME',
    'Imitation': 'IP', 'Fashion Parade': 'FP', 'Movie Depiction': 'MD',
    'Skit': 'SK', 'Short Film': 'SF', 'Stand Up Comedy': 'SC', 'Anchoring': 'AC',
  };

  // All 16 events with prelims data
  const prelimsData = [
    { id: 1, eventName: 'Comic Satire', code: 'CS', prelimsDate: '2025-11-14', prelimsTime: '10:00 AM', venue: 'Main Auditorium', coordinator: 'Rajesh Kumar', phone: '+91 98765 43210' },
    { id: 2, eventName: 'Solo Instrumental', code: 'SI', prelimsDate: '2025-11-14', prelimsTime: '02:00 PM', venue: 'Music Hall', coordinator: 'Priya Sharma', phone: '+91 98765 43211' },
    { id: 3, eventName: 'Group Instrumental', code: 'GI', prelimsDate: '2025-11-15', prelimsTime: '09:30 AM', venue: 'Orchestra Hall', coordinator: 'Meena Iyer', phone: '+91 98765 43212' },
    { id: 4, eventName: 'Solo Dance', code: 'SD', prelimsDate: '2025-11-15', prelimsTime: '11:00 AM', venue: 'Dance Studio A', coordinator: 'Arun Patel', phone: '+91 98765 43213' },
    { id: 5, eventName: 'Dual Dance', code: 'DD', prelimsDate: '2025-11-15', prelimsTime: '03:00 PM', venue: 'Dance Studio B', coordinator: 'Karthik Reddy', phone: '+91 98765 43214' },
    { id: 6, eventName: 'Group Dance', code: 'GD', prelimsDate: '2025-11-16', prelimsTime: '10:00 AM', venue: 'Main Auditorium', coordinator: 'Lakshmi Menon', phone: '+91 98765 43215' },
    { id: 7, eventName: 'Solo Singing', code: 'SS', prelimsDate: '2025-11-16', prelimsTime: '02:00 PM', venue: 'Music Hall', coordinator: 'Suresh Nair', phone: '+91 98765 43216' },
    { id: 8, eventName: 'Group Singing', code: 'GS', prelimsDate: '2025-11-17', prelimsTime: '11:00 AM', venue: 'Concert Hall', coordinator: 'Divya Prasad', phone: '+91 98765 43217' },
    { id: 9, eventName: 'Mime', code: 'ME', prelimsDate: '2025-11-17', prelimsTime: '04:00 PM', venue: 'Theater Room', coordinator: 'Vinay Kumar', phone: '+91 98765 43218' },
    { id: 10, eventName: 'Imitation', code: 'IP', prelimsDate: '2025-11-18', prelimsTime: '10:30 AM', venue: 'Seminar Hall', coordinator: 'Anjali Singh', phone: '+91 98765 43219' },
    { id: 11, eventName: 'Fashion Parade', code: 'FP', prelimsDate: '2025-11-18', prelimsTime: '03:00 PM', venue: 'Main Stage', coordinator: 'Rohan Mehta', phone: '+91 98765 43220' },
    { id: 12, eventName: 'Movie Depiction', code: 'MD', prelimsDate: '2025-11-19', prelimsTime: '09:00 AM', venue: 'Mini Theater', coordinator: 'Sneha Rao', phone: '+91 98765 43221' },
    { id: 13, eventName: 'Skit', code: 'SK', prelimsDate: '2025-11-19', prelimsTime: '02:30 PM', venue: 'Drama Hall', coordinator: 'Prakash Reddy', phone: '+91 98765 43222' },
    { id: 14, eventName: 'Short Film', code: 'SF', prelimsDate: '2025-11-20', prelimsTime: '10:00 AM', venue: 'Auditorium B', coordinator: 'Neha Gupta', phone: '+91 98765 43223' },
    { id: 15, eventName: 'Stand Up Comedy', code: 'SC', prelimsDate: '2025-11-20', prelimsTime: '04:00 PM', venue: 'Comedy Club', coordinator: 'Arjun Desai', phone: '+91 98765 43224' },
    { id: 16, eventName: 'Anchoring', code: 'AC', prelimsDate: '2025-11-21', prelimsTime: '11:00 AM', venue: 'Main Stage', coordinator: 'Pooja Iyer', phone: '+91 98765 43225' },
  ];

  const [events] = useState(prelimsData);

  useEffect(() => {
    let filtered = [];

    // Only show events if there's a search query or date selected
    if (searchQuery || selectedDate) {
      filtered = events;

      if (selectedDate) {
        filtered = filtered.filter(event => event.prelimsDate === selectedDate);
      }

      if (searchQuery) {
        filtered = filtered.filter(event =>
          event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    }

    setFilteredEvents(filtered);
  }, [selectedDate, searchQuery, events]);

  const eventNames = Object.keys(codes);
  const matchedEvents = searchQuery
    ? eventNames.filter(name => name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  // Get all dates that have events
  const eventDates = events.reduce((acc, event) => {
    const date = event.prelimsDate;
    if (!acc[date]) acc[date] = [];
    acc[date].push(event);
    return acc;
  }, {});

  // Calendar generation
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const handleDateClick = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
  };

  const hasEvent = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return eventDates[dateStr] || null;
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const eventColors = [
    'var(--enthusia-coral)', 'var(--enthusia-royal-blue)', 'var(--enthusia-emerald)',
    'var(--enthusia-amber)', 'var(--enthusia-violet)', 'var(--enthusia-cyan)',
    'var(--enthusia-rose-gold)', 'var(--enthusia-neon-pink)', 'var(--enthusia-topaz)',
    'var(--enthusia-ruby)', 'var(--enthusia-sapphire)', 'var(--enthusia-jade)',
    'var(--enthusia-magenta)', 'var(--enthusia-orange)', 'var(--enthusia-teal)',
    'var(--enthusia-light-coral)'
  ];

  return (
    <>
      <style>{`
        :root {
          --enthusia-navy: #0a2540;
          --enthusia-dark-blue: #1a365d;
          --enthusia-blue: #1a5f7a;
          --enthusia-royal-blue: #4169e1;
          --enthusia-sky-blue: #87ceeb;
          --enthusia-light-blue: #e1f5fe;
          --enthusia-gold: #ffd700;
          --enthusia-dark-gold: #b8860b;
          --enthusia-light-gold: #fff9c4;
          --enthusia-red: #c41e3a;
          --enthusia-coral: #ff7f50;
          --enthusia-emerald: #50c878;
          --enthusia-amber: #ffbf00;
          --enthusia-violet: #8a2be2;
          --enthusia-cyan: #00ffff;
          --enthusia-rose-gold: #b76e79;
          --enthusia-neon-pink: #ff10f0;
          --enthusia-topaz: #ffc87c;
          --enthusia-ruby: #e0115f;
          --enthusia-sapphire: #0f52ba;
          --enthusia-jade: #00a86b;
          --enthusia-magenta: #ff00ff;
          --enthusia-orange: #ff8c00;
          --enthusia-teal: #008080;
          --enthusia-light-coral: #ffefed;
          --enthusia-white: #ffffff;
          --enthusia-off-white: #f7fafc;
          --enthusia-dark-gray: #2d3748;
          --enthusia-light-gray: #e2e8f0;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .PRE-container {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--enthusia-navy) 0%, var(--enthusia-dark-blue) 50%, var(--enthusia-blue) 100%);
          padding: 1.5rem 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .PRE-header {
          text-align: center;
          margin-bottom: 2rem;
          animation: PRE-fadeInDown 0.8s ease-out;
        }

        .PRE-title {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 800;
          background: linear-gradient(135deg, var(--enthusia-gold) 0%, var(--enthusia-light-gold) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.3rem;
          letter-spacing: 2px;
        }

        .PRE-subtitle {
          color: var(--enthusia-sky-blue);
          font-size: clamp(0.9rem, 2vw, 1rem);
          font-weight: 300;
        }

        .PRE-main-grid {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 1.5rem;
          padding: 0 1rem;
        }

        .PRE-calendar-section {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 215, 0, 0.3);
          border-radius: 20px;
          padding: 1.5rem;
          animation: PRE-fadeInLeft 0.8s ease-out;
        }

        .PRE-calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .PRE-calendar-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--enthusia-gold);
        }

        .PRE-calendar-nav {
          display: flex;
          gap: 0.5rem;
        }

        .PRE-nav-btn {
          background: rgba(255, 215, 0, 0.2);
          border: 1px solid var(--enthusia-gold);
          color: var(--enthusia-gold);
          padding: 0.4rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .PRE-nav-btn:hover {
          background: var(--enthusia-gold);
          color: var(--enthusia-navy);
          transform: scale(1.1);
        }

        .PRE-calendar {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.5rem;
        }

        .PRE-day-name {
          text-align: center;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--enthusia-sky-blue);
          padding: 0.5rem 0;
        }

        .PRE-day {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          color: var(--enthusia-white);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .PRE-day.empty {
          cursor: default;
        }

        .PRE-day.has-event {
          background: rgba(255, 215, 0, 0.2);
          border: 2px solid var(--enthusia-gold);
          font-weight: 700;
        }

        .PRE-day.has-event:hover {
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
        }

        .PRE-day.selected {
          background: var(--enthusia-gold);
          color: var(--enthusia-navy);
          font-weight: 800;
        }

        .PRE-event-dots {
          position: absolute;
          bottom: 2px;
          display: flex;
          gap: 2px;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 100%;
        }

        .PRE-event-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
        }

        .PRE-search-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .PRE-search-box {
          position: relative;
        }

        .PRE-input {
          width: 100%;
          padding: 0.8rem 2.5rem 0.8rem 2.5rem;
          border: 2px solid rgba(255, 215, 0, 0.3);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          color: var(--enthusia-white);
          font-size: 0.9rem;
          transition: all 0.3s ease;
          outline: none;
        }

        .PRE-input:focus {
          border-color: var(--enthusia-gold);
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
        }

        .PRE-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .PRE-input-icon {
          position: absolute;
          left: 0.8rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--enthusia-gold);
          pointer-events: none;
        }

        .PRE-clear-btn {
          position: absolute;
          right: 0.8rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--enthusia-gold);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .PRE-clear-btn:hover {
          background: rgba(255, 215, 0, 0.2);
          transform: translateY(-50%) scale(1.1);
        }

        .PRE-suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: 0.5rem;
          background: rgba(26, 54, 93, 0.98);
          backdrop-filter: blur(10px);
          border: 2px solid var(--enthusia-gold);
          border-radius: 12px;
          max-height: 250px;
          overflow-y: auto;
          z-index: 100;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }

        .PRE-suggestion-item {
          padding: 0.8rem;
          color: var(--enthusia-white);
          cursor: pointer;
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(255, 215, 0, 0.1);
          font-size: 0.9rem;
        }

        .PRE-suggestion-item:last-child {
          border-bottom: none;
        }

        .PRE-suggestion-item:hover {
          background: rgba(255, 215, 0, 0.2);
          padding-left: 1.2rem;
        }

        .PRE-events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
          animation: PRE-fadeInRight 0.8s ease-out;
        }

        .PRE-event-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 215, 0, 0.3);
          border-radius: 15px;
          padding: 1.2rem;
          transition: all 0.3s ease;
          animation: PRE-fadeInUp 0.5s ease-out;
        }

        .PRE-event-card:hover {
          transform: translateY(-5px);
          border-color: var(--enthusia-gold);
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
        }

        .PRE-event-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 0.8rem;
          border-bottom: 2px solid rgba(255, 215, 0, 0.2);
        }

        .PRE-event-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--enthusia-gold);
        }

        .PRE-event-code {
          background: linear-gradient(135deg, var(--enthusia-royal-blue), var(--enthusia-sky-blue));
          color: var(--enthusia-white);
          padding: 0.3rem 0.7rem;
          border-radius: 15px;
          font-weight: 700;
          font-size: 0.75rem;
        }

        .PRE-event-body {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }

        .PRE-info-row {
          display: flex;
          align-items: flex-start;
          gap: 0.7rem;
          font-size: 0.85rem;
        }

        .PRE-info-icon {
          color: var(--enthusia-gold);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .PRE-info-content {
          flex: 1;
        }

        .PRE-info-label {
          font-size: 0.7rem;
          color: var(--enthusia-sky-blue);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.2rem;
        }

        .PRE-info-value {
          color: var(--enthusia-white);
          font-weight: 600;
        }

        .PRE-phone-link {
          color: var(--enthusia-white);
          text-decoration: none;
          transition: all 0.3s ease;
          padding: 0.2rem 0.4rem;
          border-radius: 6px;
          display: inline-block;
          margin: -0.2rem -0.4rem;
        }

        .PRE-phone-link:hover {
          color: var(--enthusia-gold);
          background: rgba(255, 215, 0, 0.1);
          
          transform: scale(1.02);
        }

        .PRE-no-events {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem 1rem;
          color: var(--enthusia-light-gold);
          font-size: 1.1rem;
        }

        .PRE-add-btn {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          background: linear-gradient(135deg, var(--enthusia-gold), var(--enthusia-dark-gold));
          color: var(--enthusia-navy);
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .PRE-add-btn:hover {
          transform: scale(1.1) rotate(90deg);
        }

        @keyframes PRE-fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes PRE-fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes PRE-fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes PRE-fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .PRE-main-grid {
            grid-template-columns: 1fr;
          }

          .PRE-calendar-section {
            order: 1;
          }

          .PRE-events-grid {
            order: 2;
          }
        }

        @media (max-width: 768px) {
          .PRE-container {
            padding: 1rem 0.5rem;
          }

          .PRE-events-grid {
            grid-template-columns: 1fr;
          }

          .PRE-day {
            font-size: 0.75rem;
          }

          .PRE-event-card {
            padding: 1rem;
          }
        }
      `}</style>

      <div className="PRE-container">
        <div className="PRE-header">
          <h1 className="PRE-title">ENTHUSIA PRELIMS</h1>
          <p className="PRE-subtitle">Event Preliminary Schedule</p>
        </div>

        <div className="PRE-main-grid">
          <div className="PRE-calendar-section">
            <div className="PRE-calendar-header">
              <h2 className="PRE-calendar-title">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="PRE-calendar-nav">
                <button className="PRE-nav-btn" onClick={prevMonth}>
                  <ChevronLeft size={18} />
                </button>
                <button className="PRE-nav-btn" onClick={nextMonth}>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="PRE-calendar">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="PRE-day-name">{day}</div>
              ))}
              
              {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="PRE-day empty"></div>
              ))}
              
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const eventsOnDay = hasEvent(day);
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const isSelected = selectedDate === dateStr;
                
                return (
                  <div
                    key={day}
                    className={`PRE-day ${eventsOnDay ? 'has-event' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => eventsOnDay && handleDateClick(day)}
                  >
                    {day}
                    {eventsOnDay && (
                      <div className="PRE-event-dots">
                        {eventsOnDay.slice(0, 3).map((event, idx) => (
                          <div
                            key={idx}
                            className="PRE-event-dot"
                            style={{ backgroundColor: eventColors[event.id - 1] }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="PRE-search-section">
              <div className="PRE-search-box">
                <Search size={18} className="PRE-input-icon" />
                <input
                  type="text"
                  className="PRE-input"
                  placeholder="Search event name..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(e.target.value.length > 0);
                  }}
                  onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                {searchQuery && (
                  <button
                    className="PRE-clear-btn"
                    onClick={() => {
                      setSearchQuery('');
                      setShowSuggestions(false);
                    }}
                    title="Clear search"
                  >
                    ×
                  </button>
                )}
                {showSuggestions && matchedEvents.length > 0 && (
                  <div className="PRE-suggestions">
                    {matchedEvents.map((eventName, index) => (
                      <div
                        key={index}
                        className="PRE-suggestion-item"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setSearchQuery(eventName);
                          setShowSuggestions(false);
                        }}
                        onClick={() => {
                          setSearchQuery(eventName);
                          setShowSuggestions(false);
                        }}
                      >
                        {eventName} ({codes[eventName]})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="PRE-events-grid">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className="PRE-event-card"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      borderLeftColor: eventColors[event.id - 1],
                      borderLeftWidth: '4px'
                    }}
                  >
                    <div className="PRE-event-header">
                      <h3 className="PRE-event-name">{event.eventName}</h3>
                      <span className="PRE-event-code">{event.code}</span>
                    </div>

                    <div className="PRE-event-body">
                      <div className="PRE-info-row">
                        <Calendar size={16} className="PRE-info-icon" />
                        <div className="PRE-info-content">
                          <div className="PRE-info-label">Date</div>
                          <div className="PRE-info-value">
                            {new Date(event.prelimsDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="PRE-info-row">
                        <Clock size={16} className="PRE-info-icon" />
                        <div className="PRE-info-content">
                          <div className="PRE-info-label">Time</div>
                          <div className="PRE-info-value">{event.prelimsTime}</div>
                        </div>
                      </div>

                      <div className="PRE-info-row">
                        <MapPin size={16} className="PRE-info-icon" />
                        <div className="PRE-info-content">
                          <div className="PRE-info-label">Venue</div>
                          <div className="PRE-info-value">{event.venue}</div>
                        </div>
                      </div>

                      <div className="PRE-info-row">
                        <User size={16} className="PRE-info-icon" />
                        <div className="PRE-info-content">
                          <div className="PRE-info-label">Coordinator</div>
                          <div className="PRE-info-value">{event.coordinator}</div>
                        </div>
                      </div>

                      <div className="PRE-info-row">
                        <Phone size={16} className="PRE-info-icon" />
                        <div className="PRE-info-content">
                          <div className="PRE-info-label">Contact</div>
                          <div className="PRE-info-value">
                            <a href={`tel:${event.phone}`} className="PRE-phone-link">
                              {event.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="PRE-no-events">
                  {selectedDate || searchQuery ? (
                    <>
                      <p>No prelims found for selected criteria</p>
                      <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
                        Try selecting another date or searching for a different event
                      </p>
                    </>
                  ) : (
                    <>
                      <p>Search for an event or select a date to view prelims</p>
                      <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
                        Use the search box above or click on a highlighted date in the calendar
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          className="PRE-add-btn"
          onClick={() => alert('Add new event functionality')}
          title="Add Event"
        >
          <Plus size={24} />
        </button>
      </div>
    </>
  );
};

export default PrelimsPage;