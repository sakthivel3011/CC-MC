import React, { useState, useEffect } from 'react';

// Points configuration (you can modify these)
const POSITION_POINTS = {
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

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const RefreshIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
);

const SheetsPointsCalculator = () => {
  // REPLACE WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxCbZw0gusH-MbZqTHZJ_hc4GX93ESNGjQggSpENILAmwPFBzTija0II9how45LCWbj/exec';
  
  const [students, setStudents] = useState([]);
  const [events, setEvents] = useState([]);
  const [leaderboard, setLeaderboard] = useState({ departments: {}, students: { male: {}, female: {} } });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculateLeaderboard();
  }, [events]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SCRIPT_URL}?action=getData`);
      const data = await response.json();
      
      if (data.success) {
        setStudents(data.students || []);
        setEvents(data.events || []);
        setMessage('✅ Data loaded successfully!');
      } else {
        setMessage('⚠️ Error loading data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('❌ Failed to load data. Check your Script URL.');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const calculateLeaderboard = () => {
    const depts = {};
    const studentPoints = { male: {}, female: {} };

    events.forEach(event => {
      const student = students.find(s => s.id === event.studentId);
      if (!student) return;

      const totalPoints = POSITION_POINTS[event.position] || 0;
      const pointsPerMember = totalPoints / event.teamMembers;

      // Department points
      if (!depts[student.department]) {
        depts[student.department] = 0;
      }
      depts[student.department] += totalPoints;

      // Student points
      if (!studentPoints[student.gender][student.name]) {
        studentPoints[student.gender][student.name] = {
          points: 0,
          department: student.department,
          events: 0,
          rollNo: student.rollNo
        };
      }
      studentPoints[student.gender][student.name].points += pointsPerMember;
      studentPoints[student.gender][student.name].events += 1;
    });

    setLeaderboard({ departments: depts, students: studentPoints });
  };

  const handleUpdateEvent = async (eventId, updatedData) => {
    setLoading(true);
    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateEvent',
          eventId,
          data: updatedData
        })
      });

      setMessage('✅ Event updated! Refreshing data...');
      setTimeout(() => fetchData(), 1000);
      setEditingEvent(null);
    } catch (error) {
      setMessage('❌ Error updating event');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    setLoading(true);
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'deleteEvent',
          eventId
        })
      });

      setMessage('✅ Event deleted! Refreshing data...');
      setTimeout(() => fetchData(), 1000);
    } catch (error) {
      setMessage('❌ Error deleting event');
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
    const student = students.find(s => s.id === event.studentId);
    const searchLower = searchTerm.toLowerCase();
    return (
      event.eventName?.toLowerCase().includes(searchLower) ||
      student?.name?.toLowerCase().includes(searchLower) ||
      student?.department?.toLowerCase().includes(searchLower) ||
      student?.rollNo?.toLowerCase().includes(searchLower)
    );
  });

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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a2540 0%, #1a365d 50%, #1a5f7a 100%)',
      padding: '2rem',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          background: 'rgba(255,255,255,0.1)',
          padding: '1.5rem 3rem',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          border: '2px solid #ffd700',
          boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
        }}>
          <TrophyIcon />
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #ffd700, #ffbf00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>Events Points Calculator</h1>
          <TrophyIcon />
        </div>

        {/* Message */}
        {message && (
          <div style={{
            textAlign: 'center',
            padding: '1rem',
            marginBottom: '1rem',
            background: message.includes('✅') ? '#50c878' : message.includes('❌') ? '#c41e3a' : '#4169e1',
            color: 'white',
            borderRadius: '10px',
            fontWeight: 'bold'
          }}>
            {message}
          </div>
        )}

        {/* Winners */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #b8860b, #ffd700)',
            padding: '1.5rem',
            borderRadius: '15px',
            border: '3px solid #fff9c4',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
            color: 'white'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>🏆 Best Department</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
              {bestDept ? bestDept[0] : 'N/A'}
            </p>
            <p style={{ fontSize: '1.2rem', margin: 0 }}>
              {bestDept ? `${bestDept[1]} points` : '0 points'}
            </p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #4169e1, #87ceeb)',
            padding: '1.5rem',
            borderRadius: '15px',
            border: '3px solid #e1f5fe',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
            color: 'white'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>🥇 Best Boy</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
              {bestBoy ? bestBoy[0] : 'N/A'}
            </p>
            <p style={{ fontSize: '1.2rem', margin: 0 }}>
              {bestBoy ? `${bestBoy[1].points.toFixed(2)} pts • ${bestBoy[1].events} events` : '0 points'}
            </p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #ff00ff, #ff69b4)',
            padding: '1.5rem',
            borderRadius: '15px',
            border: '3px solid #fff0f5',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
            color: 'white'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>🥇 Best Girl</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
              {bestGirl ? bestGirl[0] : 'N/A'}
            </p>
            <p style={{ fontSize: '1.2rem', margin: 0 }}>
              {bestGirl ? `${bestGirl[1].points.toFixed(2)} pts • ${bestGirl[1].events} events` : '0 points'}
            </p>
          </div>
        </div>

        {/* Search & Refresh */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '20px',
          marginBottom: '2rem',
          boxShadow: '0 16px 32px rgba(0,0,0,0.4)',
          border: '3px solid #ffd700'
        }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
              <SearchIcon />
              <input
                type="text"
                placeholder="Search events, students, departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  borderRadius: '10px',
                  border: '2px solid #e1f5fe',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
              <div style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}>
                <SearchIcon />
              </div>
            </div>
            <button
              onClick={fetchData}
              disabled={loading}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#4169e1',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 'bold',
                opacity: loading ? 0.6 : 1
              }}
            >
              <RefreshIcon />
              {loading ? 'Loading...' : 'Refresh Data'}
            </button>
          </div>
        </div>

        {/* Events Table */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '20px',
          boxShadow: '0 16px 32px rgba(0,0,0,0.4)'
        }}>
          <h2 style={{ color: '#0a2540', marginTop: 0 }}>
            Events ({filteredEvents.length})
          </h2>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '1rem'
            }}>
              <thead>
                <tr style={{ background: '#e1f5fe' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#0a2540', fontWeight: 'bold' }}>Event</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#0a2540', fontWeight: 'bold' }}>Student</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#0a2540', fontWeight: 'bold' }}>Roll No</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#0a2540', fontWeight: 'bold' }}>Department</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#0a2540', fontWeight: 'bold' }}>Position</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#0a2540', fontWeight: 'bold' }}>Team</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#0a2540', fontWeight: 'bold' }}>Points</th>
                  <th style={{ padding: '1rem', textAlign: 'center', color: '#0a2540', fontWeight: 'bold' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event, idx) => {
                  const student = students.find(s => s.id === event.studentId);
                  const totalPoints = POSITION_POINTS[event.position] || 0;
                  const pointsPerMember = (totalPoints / event.teamMembers).toFixed(2);
                  
                  return (
                    <tr key={event.id} style={{
                      borderBottom: '1px solid #e2e8f0',
                      background: idx % 2 === 0 ? '#f7fafc' : 'white'
                    }}>
                      <td style={{ padding: '1rem', color: '#2d3748', fontWeight: '500' }}>{event.eventName}</td>
                      <td style={{ padding: '1rem', color: '#2d3748', fontWeight: '500' }}>
                        {student?.name || 'Unknown'}
                        <span style={{
                          marginLeft: '0.5rem',
                          fontSize: '0.8rem',
                          color: student?.gender === 'male' ? '#4169e1' : '#ff00ff',
                          fontWeight: 'normal'
                        }}>
                          ({student?.gender})
                        </span>
                      </td>
                      <td style={{ padding: '1rem', color: '#2d3748', fontWeight: '500' }}>{student?.rollNo}</td>
                      <td style={{ padding: '1rem', color: '#2d3748', fontWeight: '500' }}>{student?.department}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontWeight: 'bold',
                          color: 'white',
                          background: event.position === '1' ? '#ffd700' : 
                                     event.position === '2' ? '#c0c0c0' : 
                                     event.position === '3' ? '#cd7f32' : '#a0aec0'
                        }}>
                          {event.position}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', color: '#2d3748', fontWeight: '500' }}>{event.teamMembers}</td>
                      <td style={{ padding: '1rem', fontWeight: 'bold', color: '#50c878' }}>
                        {pointsPerMember}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            style={{
                              padding: '0.5rem',
                              background: '#c41e3a',
                              color: 'white',
                              border: 'none',
                              borderRadius: '5px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                            title="Delete"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SheetsPointsCalculator;