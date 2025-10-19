import React, { useState } from 'react';
import { FaCalendarDay, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/ESchedule.css';

const ESchedule = () => {
  const [activeDay, setActiveDay] = useState(1);

  const scheduleData = {
    day1: [
      {
        time: '09:00 AM',
        event: 'Registration & Opening Ceremony',
        venue: 'Main Auditorium',
        category: 'General'
      },
      {
        time: '10:30 AM',
        event: 'Solo Singing Competition',
        venue: 'Music Hall',
        category: 'Solo'
      },
      {
        time: '12:00 PM',
        event: 'Comic Satire',
        venue: 'Drama Theatre',
        category: 'Solo'
      },
      {
        time: '01:30 PM',
        event: 'Lunch Break',
        venue: 'Food Court',
        category: 'Break'
      },
      {
        time: '02:30 PM',
        event: 'Group Dance Competition',
        venue: 'Main Stage',
        category: 'Group'
      },
      {
        time: '04:00 PM',
        event: 'Solo Instrumental',
        venue: 'Music Hall',
        category: 'Solo'
      },
      {
        time: '05:30 PM',
        event: 'Mime Performance',
        venue: 'Drama Theatre',
        category: 'Solo'
      },
      {
        time: '07:00 PM',
        event: 'Cultural Evening & Dinner',
        venue: 'Main Grounds',
        category: 'General'
      }
    ],
    day2: [
      {
        time: '09:00 AM',
        event: 'Morning Assembly',
        venue: 'Main Auditorium',
        category: 'General'
      },
      {
        time: '10:00 AM',
        event: 'Group Singing Competition',
        venue: 'Music Hall',
        category: 'Group'
      },
      {
        time: '11:30 AM',
        event: 'Fashion Parade',
        venue: 'Main Stage',
        category: 'Group'
      },
      {
        time: '01:00 PM',
        event: 'Lunch Break',
        venue: 'Food Court',
        category: 'Break'
      },
      {
        time: '02:00 PM',
        event: 'Dual Dance Competition',
        venue: 'Main Stage',
        category: 'Dual'
      },
      {
        time: '03:30 PM',
        event: 'Skit Performance',
        venue: 'Drama Theatre',
        category: 'Group'
      },
      {
        time: '05:00 PM',
        event: 'Short Film Screening',
        venue: 'Auditorium',
        category: 'Group'
      },
      {
        time: '06:30 PM',
        event: 'Prize Distribution & Closing',
        venue: 'Main Auditorium',
        category: 'General'
      }
    ]
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Solo': return '#ff6b6b';
      case 'Dual': return '#4ecdc4';
      case 'Group': return '#45b7d1';
      case 'General': return '#96ceb4';
      case 'Break': return '#ffeaa7';
      default: return '#ddd';
    }
  };

  const ScheduleItem = ({ item }) => (
    <div className="schedule-item">
      <div className="schedule-time">
        <FaClock />
        {item.time}
      </div>
      <div className="schedule-content">
        <h4 className="schedule-event">{item.event}</h4>
        <div className="schedule-details">
          <span className="schedule-venue">
            <FaMapMarkerAlt />
            {item.venue}
          </span>
          <span 
            className="schedule-category"
            style={{ backgroundColor: getCategoryColor(item.category) }}
          >
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="eschedule-container section" id="schedule">
      <div className="eschedule-wrapper">
        <h2 className="section-title">Event Schedule</h2>
        
        {/* Day Selector */}
        <div className="day-selector">
          <button 
            className={`day-btn ${activeDay === 1 ? 'active' : ''}`}
            onClick={() => setActiveDay(1)}
          >
            <FaCalendarDay />
            Day 1
            <span className="day-date">March 15, 2025</span>
          </button>
          <button 
            className={`day-btn ${activeDay === 2 ? 'active' : ''}`}
            onClick={() => setActiveDay(2)}
          >
            <FaCalendarDay />
            Day 2
            <span className="day-date">March 16, 2025</span>
          </button>
        </div>
        
        {/* Schedule Content */}
        <div className="schedule-content">
          <div className="schedule-day">
            <h3 className="day-title">
              Day {activeDay} Schedule
            </h3>
            <div className="schedule-timeline">
              {scheduleData[`day${activeDay}`].map((item, index) => (
                <ScheduleItem key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ESchedule;
