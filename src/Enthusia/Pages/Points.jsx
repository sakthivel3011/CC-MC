import React, { useState, useEffect } from 'react';
import '../styles/Points.css';

// Icon components (you can replace with lucide-react or any icon library)
const TrophyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
  </svg>
);

const MedalIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"></path>
    <path d="M11 12 5.12 2.2"></path>
    <path d="m13 12 5.88-9.8"></path>
    <path d="M8 7h8"></path>
    <circle cx="12" cy="17" r="5"></circle>
    <path d="M12 18v-2h-.5"></path>
  </svg>
);

const StarIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const AwardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="6"></circle>
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
  </svg>
);

const SaveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const EventsPointsCalculator = () => {
  // IMPORTANT: Replace this with your actual Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbywbl_x1NBTyRtUCAmNoJFsi6ef6E45oohbbgmFjhvRC5KFcmXhFJPWfpV7E3M632ff/exec';
  
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    eventName: '',
    position: '',
    teamMembers: 1,
    department: '',
    studentName: '',
    gender: 'male'
  });
  
  const [leaderboard, setLeaderboard] = useState({
    departments: {},
    students: { male: {}, female: {} }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const positionPoints = {
    '1': 30,
    '2': 20,
    '3': 10,
    '4': 5,
    '5': 3,
    '6': 2,
    '7': 1,
    '8': 1,
    '9': 1,
    '10': 1
  };

  useEffect(() => {
    calculateLeaderboard();
  }, [events]);

  const calculateLeaderboard = () => {
    const depts = {};
    const students = { male: {}, female: {} };

    events.forEach(event => {
      const pointsPerMember = event.pointsPerMember;
      
      // Department points
      if (!depts[event.department]) {
        depts[event.department] = 0;
      }
      depts[event.department] += event.totalPoints;

      // Student points
      if (!students[event.gender][event.studentName]) {
        students[event.gender][event.studentName] = {
          points: 0,
          department: event.department,
          events: 0
        };
      }
      students[event.gender][event.studentName].points += pointsPerMember;
      students[event.gender][event.studentName].events += 1;
    });

    setLeaderboard({ departments: depts, students });
  };

  const handleAddEvent = () => {
    if (!currentEvent.eventName || !currentEvent.position || !currentEvent.department || !currentEvent.studentName) {
      alert('Please fill all fields');
      return;
    }

    const totalPoints = positionPoints[currentEvent.position] || 0;
    const pointsPerMember = totalPoints / currentEvent.teamMembers;

    const newEvent = {
      ...currentEvent,
      totalPoints,
      pointsPerMember: parseFloat(pointsPerMember.toFixed(2)),
      id: Date.now()
    };

    setEvents([...events, newEvent]);
    
    // Reset form
    setCurrentEvent({
      eventName: '',
      position: '',
      teamMembers: 1,
      department: '',
      studentName: '',
      gender: 'male'
    });

    // Auto-save to Google Sheets
    setSaveMessage('Event added! Click "Save to Google Sheets" to sync.');
  };

  const saveToGoogleSheets = async () => {
    if (events.length === 0) {
      alert('No events to save!');
      return;
    }

    setIsSaving(true);
    setSaveMessage('Saving to Google Sheets...');

    try {
      const payload = {
        events: events,
        leaderboard: leaderboard
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      // Note: Due to 'no-cors', we can't read the response
      // But if no error is thrown, the request was sent successfully
      setSaveMessage('✅ Data saved to Google Sheets successfully!');
      
      // Clear message after 5 seconds
      setTimeout(() => setSaveMessage(''), 5000);

    } catch (error) {
      console.error('Error saving to Google Sheets:', error);
      setSaveMessage('❌ Error saving to Google Sheets. Check console for details.');
    } finally {
      setIsSaving(false);
    }
  };

  const getBestDepartment = () => {
    const depts = Object.entries(leaderboard.departments);
    if (depts.length === 0) return null;
    return depts.reduce((best, current) => current[1] > best[1] ? current : best);
  };

  const getBestStudent = (gender) => {
    const students = Object.entries(leaderboard.students[gender]);
    if (students.length === 0) return null;
    return students.reduce((best, current) => 
      current[1].points > best[1].points ? current : best
    );
  };

  const bestDept = getBestDepartment();
  const bestBoy = getBestStudent('male');
  const bestGirl = getBestStudent('female');

  return (
    <div className="points-calculator-container">
      <div className="points-calculator-wrapper">
        {/* Header */}
        <div className="points-calculator-header">
          <div className="header-badge">
            <div className="header-icon">
              <TrophyIcon />
            </div>
            <h1 className="header-title">Events Points Calculator</h1>
            <div className="header-icon">
              <TrophyIcon />
            </div>
          </div>
        </div>

        {/* Save Status Message */}
        {saveMessage && (
          <div style={{
            textAlign: 'center',
            padding: '1rem',
            marginBottom: '1rem',
            background: saveMessage.includes('✅') ? '#50c878' : saveMessage.includes('❌') ? '#c41e3a' : '#4169e1',
            color: 'white',
            borderRadius: '10px',
            fontWeight: 'bold',
            animation: 'slideInUp 0.3s ease-out'
          }}>
            {saveMessage}
          </div>
        )}

        {/* Top Winners */}
        <div className="winners-grid">
          {/* Best Department */}
          <div className="winner-card winner-card-department">
            <div className="winner-bg-icon">
              <StarIcon />
            </div>
            <div className="winner-header">
              <AwardIcon />
              <h3 className="winner-title">Best Department</h3>
            </div>
            <p className="winner-name">
              {bestDept ? bestDept[0] : 'N/A'}
            </p>
            <p className="winner-points">
              {bestDept ? `${bestDept[1]} points` : '0 points'}
            </p>
          </div>

          {/* Best Boy */}
          <div className="winner-card winner-card-boy">
            <div className="winner-bg-icon">
              <MedalIcon />
            </div>
            <div className="winner-header">
              <AwardIcon />
              <h3 className="winner-title">Best Boy</h3>
            </div>
            <p className="winner-name">
              {bestBoy ? bestBoy[0] : 'N/A'}
            </p>
            <p className="winner-points">
              {bestBoy ? `${bestBoy[1].points.toFixed(2)} pts • ${bestBoy[1].events} events` : '0 points'}
            </p>
          </div>

          {/* Best Girl */}
          <div className="winner-card winner-card-girl">
            <div className="winner-bg-icon">
              <StarIcon />
            </div>
            <div className="winner-header">
              <AwardIcon />
              <h3 className="winner-title">Best Girl</h3>
            </div>
            <p className="winner-name">
              {bestGirl ? bestGirl[0] : 'N/A'}
            </p>
            <p className="winner-points">
              {bestGirl ? `${bestGirl[1].points.toFixed(2)} pts • ${bestGirl[1].events} events` : '0 points'}
            </p>
          </div>
        </div>

        {/* Input Form */}
        <div className="form-container">
          <h2 className="form-title">Add Event Result</h2>
          
          <div className="form-grid">
            <input
              type="text"
              placeholder="Event Name"
              className="form-input"
              value={currentEvent.eventName}
              onChange={(e) => setCurrentEvent({...currentEvent, eventName: e.target.value})}
            />
            
            <select
              className="form-select"
              value={currentEvent.position}
              onChange={(e) => setCurrentEvent({...currentEvent, position: e.target.value})}
            >
              <option value="">Select Position</option>
              <option value="1">1st Place (30 points)</option>
              <option value="2">2nd Place (20 points)</option>
              <option value="3">3rd Place (10 points)</option>
              <option value="4">4th Place (5 points)</option>
              <option value="5">5th Place (3 points)</option>
              <option value="6">6th Place (2 points)</option>
              <option value="7">7th Place (1 point)</option>
              <option value="8">8th Place (1 point)</option>
              <option value="9">9th Place (1 point)</option>
              <option value="10">10th Place (1 point)</option>
            </select>

            <input
              type="number"
              placeholder="Team Members"
              className="form-input"
              min="1"
              value={currentEvent.teamMembers}
              onChange={(e) => setCurrentEvent({...currentEvent, teamMembers: parseInt(e.target.value) || 1})}
            />

            <input
              type="text"
              placeholder="Department"
              className="form-input"
              value={currentEvent.department}
              onChange={(e) => setCurrentEvent({...currentEvent, department: e.target.value})}
            />

            <input
              type="text"
              placeholder="Student Name"
              className="form-input"
              value={currentEvent.studentName}
              onChange={(e) => setCurrentEvent({...currentEvent, studentName: e.target.value})}
            />

            <select
              className="form-select"
              value={currentEvent.gender}
              onChange={(e) => setCurrentEvent({...currentEvent, gender: e.target.value})}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button onClick={handleAddEvent} className="btn-add-event">
            <SaveIcon />
            Add Event
          </button>
        </div>

        {/* Events List */}
        <div className="events-container">
          <div className="events-header">
            <h2 className="events-title">Events ({events.length})</h2>
            <button 
              onClick={saveToGoogleSheets} 
              className="btn-export"
              disabled={isSaving}
              style={{ opacity: isSaving ? 0.6 : 1 }}
            >
              <DownloadIcon />
              {isSaving ? 'Saving...' : 'Save to Google Sheets'}
            </button>
          </div>

          <div className="table-wrapper">
            <table className="events-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Position</th>
                  <th>Total Points</th>
                  <th>Members</th>
                  <th>Points/Member</th>
                  <th>Department</th>
                  <th>Student</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, idx) => (
                  <tr key={event.id}>
                    <td>{event.eventName}</td>
                    <td>
                      <span className={`position-badge position-${event.position === '1' ? '1' : event.position === '2' ? '2' : event.position === '3' ? '3' : 'other'}`}>
                        {event.position}
                      </span>
                    </td>
                    <td className="points-total">{event.totalPoints}</td>
                    <td>{event.teamMembers}</td>
                    <td className="points-per-member">{event.pointsPerMember}</td>
                    <td>{event.department}</td>
                    <td>
                      {event.studentName}
                      <span className={`gender-tag gender-${event.gender}`}>
                        ({event.gender})
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPointsCalculator;