import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CSVLink } from 'react-csv';

// Department codes mapping
const DEPARTMENT_CODES = {
  'AD': 'AIDS', 'AL': 'AIML', 'CS': 'CSE', 'AU': 'AUTO',
  'CH': 'CHEM', 'FT': 'FOOD', 'CV': 'CIVIL', 'CD': 'CSD',
  'IT': 'IT', 'EE': 'EEE', 'EI': 'EIE', 'EC': 'ECE',
  'ME': 'MECH', 'MT': 'MTS', 'MS': 'MSC', 'MC': 'MCA',
  'MB': 'MBA', 'BS': 'BSC', 'AR': 'ARCH'
};

// Year mapping
const YEAR_CODES = {
  '25': '1st Year', '24': '2nd Year', '23': '3rd Year',
  '22': '4th Year', '21': '5th Year'
};

// Points configuration (Enthusia Format)
const POSITION_POINTS = {
  '1': 100,
  '2': 50,
  '3': 30
};

// Events with max participants
const EVENTS = [
  { name: 'Comic Satire', maxParticipants: 10 },
  { name: 'Solo Instrumental', maxParticipants: 1 },
  { name: 'Group Instrumental', maxParticipants: 7 },
  { name: 'Solo Dance', maxParticipants: 1 },
  { name: 'Dual Dance', maxParticipants: 2 },
  { name: 'Group Dance', maxParticipants: 15 },
  { name: 'Solo Singing', maxParticipants: 1 },
  { name: 'Group Singing', maxParticipants: 6 },
  { name: 'Mime', maxParticipants: 15 },
  { name: 'Imitate Personate', maxParticipants: 1 },
  { name: 'Fashion Parade', maxParticipants: 15 },
  { name: 'Movie Depiction', maxParticipants: 15 },
  { name: 'Skit', maxParticipants: 15 },
  { name: 'Short Film', maxParticipants: 12 },
  { name: 'Stand-Up Comedy', maxParticipants: 1 },
  { name: 'Anchoring', maxParticipants: 1 }
];

// Login credentials (change these as needed)
const LOGIN_CREDENTIALS = {
  username: 'admin',
  password: '@enthusiacc-mc'
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

const EyeIcon = ({ show }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {show ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      </>
    )}
  </svg>
);

const EnthusiaCalculator = () => {
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxCmpMZEbdqQMDSs741AfjmCrRcYJmbAzysh3bXz_7UQYkJ4QeRQRE5xIDeEsP0E3M0/exec';
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [participants, setParticipants] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [departmentPoints, setDepartmentPoints] = useState({});
  const [studentPoints, setStudentPoints] = useState({ male: {}, female: {} });

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      calculatePoints();
    }
  }, [events, participants]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    });
  }, []);

  const handleLogin = () => {
    if (username === LOGIN_CREDENTIALS.username && password === LOGIN_CREDENTIALS.password) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const parseRollNumber = (rollNo) => {
    // Format: 23ADR145 -> Year: 23, Dept: AD, Number: R145
    if (!rollNo || rollNo.length < 6) return { year: 'Unknown', dept: 'Unknown', num: '' };
    
    const yearCode = rollNo.substring(0, 2);
    const deptCode = rollNo.substring(2, 4);
    
    return {
      year: YEAR_CODES[yearCode] || 'Unknown',
      dept: DEPARTMENT_CODES[deptCode] || 'Unknown',
      deptCode: deptCode,
      num: rollNo.substring(4)
    };
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SCRIPT_URL}?action=getData`);
      const data = await response.json();
      
      if (data.success) {
        setParticipants(data.students || []);
        setEvents(data.events || []);
        setMessage('✅ Data loaded successfully!');
      } else {
        setMessage('⚠️ Error loading data');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Failed to load data');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const calculatePoints = () => {
    const deptPoints = {};
    const studPoints = { male: {}, female: {} };

    events.forEach(event => {
      const basePoints = POSITION_POINTS[event.position] || 0;
      const teamSize = event.teamMembers;
      
      // Get department participation count
      const deptParticipation = {};
      const teamMembers = [];
      
      // Parse team members from studentId (format: "sakthivel (23ADR145) | vishal (23ADR198)")
      const membersList = event.studentId.split('|').map(m => m.trim());
      
      membersList.forEach(member => {
        const match = member.match(/\(([^)]+)\)/);
        if (match) {
          const rollNo = match[1];
          const parsed = parseRollNumber(rollNo);
          
          if (!deptParticipation[parsed.dept]) {
            deptParticipation[parsed.dept] = 0;
          }
          deptParticipation[parsed.dept]++;
          
          teamMembers.push({
            name: member.split('(')[0].trim(),
            rollNo: rollNo,
            dept: parsed.dept,
            year: parsed.year
          });
        }
      });

      // Calculate points for each department based on participation percentage
      Object.keys(deptParticipation).forEach(dept => {
        const participationPercentage = (deptParticipation[dept] / teamSize) * 100;
        const deptPointsForEvent = basePoints * (participationPercentage / 100);
        
        if (!deptPoints[dept]) {
          deptPoints[dept] = 0;
        }
        deptPoints[dept] += deptPointsForEvent;
      });

      // Calculate individual student points
      teamMembers.forEach(member => {
        const participant = participants.find(p => p.rollNo === member.rollNo);
        if (participant) {
          const gender = participant.gender;
          const pointsPerMember = basePoints / teamSize;
          
          if (!studPoints[gender][participant.name]) {
            studPoints[gender][participant.name] = {
              points: 0,
              events: 0,
              rollNo: participant.rollNo,
              department: member.dept,
              year: member.year
            };
          }
          
          studPoints[gender][participant.name].points += pointsPerMember;
          studPoints[gender][participant.name].events += 1;
        }
      });
    });

    setDepartmentPoints(deptPoints);
    setStudentPoints(studPoints);
  };

  const getBestDepartment = () => {
    const depts = Object.entries(departmentPoints);
    if (depts.length === 0) return null;
    return depts.reduce((best, curr) => curr[1] > best[1] ? curr : best);
  };

  const getBestStudent = (gender) => {
    const students = Object.entries(studentPoints[gender]);
    if (students.length === 0) return null;
    return students.reduce((best, curr) => 
      curr[1].points > best[1].points ? curr : best
    );
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

      setMessage('✅ Event deleted! Refreshing...');
      setTimeout(() => fetchData(), 1000);
    } catch (error) {
      setMessage('❌ Error deleting event');
    } finally {
      setLoading(false);
    }
  };

  // CSV Data preparation functions
  const getEventsCSVData = () => {
    const headers = ['Event Name', 'Team Members', 'Position', 'Team Size', 'Total Points', 'Points Per Member'];
    const data = filteredEvents.map(event => {
      const totalPoints = POSITION_POINTS[event.position] || 0;
      const pointsPerMember = (totalPoints / event.teamMembers).toFixed(2);
      
      return [
        event.eventName,
        event.studentId.replace(/\|/g, ', '),
        `${event.position}${event.position === '1' ? 'st' : event.position === '2' ? 'nd' : 'rd'} Place`,
        event.teamMembers,
        totalPoints,
        pointsPerMember
      ];
    });
    
    return [headers, ...data];
  };

  const getDepartmentCSVData = () => {
    const headers = ['Rank', 'Department', 'Total Points'];
    const data = Object.entries(departmentPoints)
      .sort((a, b) => b[1] - a[1])
      .map(([dept, points], idx) => [
        idx + 1,
        dept,
        points.toFixed(2)
      ]);
    
    return [headers, ...data];
  };

  const getStudentCSVData = () => {
    const headers = ['Name', 'Roll Number', 'Department', 'Year', 'Gender', 'Total Points', 'Events Participated'];
    const maleStudents = Object.entries(studentPoints.male).map(([name, data]) => [
      name,
      data.rollNo,
      data.department,
      data.year,
      'Male',
      data.points.toFixed(2),
      data.events
    ]);
    const femaleStudents = Object.entries(studentPoints.female).map(([name, data]) => [
      name,
      data.rollNo,
      data.department,
      data.year,
      'Female',
      data.points.toFixed(2),
      data.events
    ]);
    
    const allStudents = [...maleStudents, ...femaleStudents].sort((a, b) => parseFloat(b[5]) - parseFloat(a[5]));
    return [headers, ...allStudents];
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decorative elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '70%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(30px)'
        }}></div>

        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          padding: '3rem',
          borderRadius: '25px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)',
          width: '100%',
          maxWidth: '420px',
          border: '1px solid rgba(255,255,255,0.2)',
          position: 'relative',
          zIndex: 10
        }}
        data-aos="fade-up"
        data-aos-duration="800">
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              borderRadius: '20px',
              padding: '1rem',
              display: 'inline-block',
              marginBottom: '1.5rem',
              boxShadow: '0 10px 25px rgba(59,130,246,0.3)'
            }}>
              <TrophyIcon />
            </div>
            <h1 style={{ 
              color: 'transparent',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              margin: '0 0 0.5rem 0',
              fontSize: '2.5rem',
              fontWeight: '800',
              letterSpacing: '-0.025em'
            }}>
              Enthusia 2025
            </h1>
            <p style={{ 
              color: '#64748b', 
              margin: 0,
              fontSize: '1.1rem',
              fontWeight: '500'
            }}>
              Points Calculator & Analytics
            </p>
          </div>
          
          {/* Login Form */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.75rem', 
                color: '#374151', 
                fontWeight: '600',
                fontSize: '0.95rem'
              }}>
                👤 Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Enter your username"
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  background: '#f8fafc',
                  fontWeight: '500'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.background = '#ffffff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.background = '#f8fafc';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.75rem', 
                color: '#374151', 
                fontWeight: '600',
                fontSize: '0.95rem'
              }}>
                🔒 Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '1rem 3.5rem 1rem 1.25rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '15px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc',
                    fontWeight: '500'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.background = '#ffffff';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.background = '#f8fafc';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#64748b',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f1f5f9';
                    e.target.style.color = '#3b82f6';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'none';
                    e.target.style.color = '#64748b';
                  }}
                >
                  <EyeIcon show={showPassword} />
                </button>
              </div>
            </div>
            
            {loginError && (
              <div style={{
                padding: '1rem',
                background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
                color: '#dc2626',
                borderRadius: '15px',
                marginBottom: '1.5rem',
                textAlign: 'center',
                border: '1px solid #fecaca',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}
              data-aos="shake">
                ⚠️ {loginError}
              </div>
            )}
            
            <button
              onClick={handleLogin}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(59,130,246,0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 35px rgba(59,130,246,0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(59,130,246,0.3)';
              }}
            >
              🚀 Access Dashboard
            </button>
          </div>
          
          {/* Credentials Info */}
          
        </div>
      </div>
    );
  }

  const bestDept = getBestDepartment();
  const bestBoy = getBestStudent('male');
  const bestGirl = getBestStudent('female');

  const filteredEvents = events.filter(event => {
    const searchLower = searchTerm.toLowerCase();
    return event.eventName?.toLowerCase().includes(searchLower);
  });

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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          background: 'rgba(255,255,255,0.1)',
          padding: '1.5rem 2rem',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          border: '2px solid #ffd700'
        }}
        data-aos="fade-down">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <TrophyIcon />
            <div>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #ffd700, #ffbf00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0
              }}>Enthusia 2025</h1>
              <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>Points Calculator & Analytics</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {/* CSV Download Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
              <CSVLink
                data={getEventsCSVData()}
                filename={`enthusia-events-${new Date().toISOString().split('T')[0]}.csv`}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                }}
              >
                📊 Events CSV
              </CSVLink>
              
              <CSVLink
                data={getDepartmentCSVData()}
                filename={`enthusia-departments-${new Date().toISOString().split('T')[0]}.csv`}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}
              >
                🏢 Dept CSV
              </CSVLink>
              
              <CSVLink
                data={getStudentCSVData()}
                filename={`enthusia-students-${new Date().toISOString().split('T')[0]}.csv`}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                }}
              >
                👨‍🎓 Students CSV
              </CSVLink>
            </div>
            
            <button
              onClick={() => setIsLoggedIn(false)}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div style={{
            padding: '1rem',
            marginBottom: '1rem',
            background: message.includes('✅') ? '#10b981' : '#ef4444',
            color: 'white',
            borderRadius: '10px',
            fontWeight: 'bold',
            textAlign: 'center'
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
            background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
            padding: '2rem',
            borderRadius: '15px',
            border: '3px solid #fff',
            boxShadow: '0 10px 30px rgba(255,215,0,0.4)',
            color: '#0a2540'
          }}
          data-aos="fade-up"
          data-aos-delay="100">
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem' }}>🏆 Best Department</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
              {bestDept ? bestDept[0] : 'N/A'}
            </p>
            <p style={{ fontSize: '1.5rem', margin: 0, fontWeight: '600' }}>
              {bestDept ? `${bestDept[1].toFixed(2)} Points` : '0 Points'}
            </p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
            padding: '2rem',
            borderRadius: '15px',
            border: '3px solid #dbeafe',
            boxShadow: '0 10px 30px rgba(59,130,246,0.4)',
            color: 'white'
          }}
          data-aos="fade-up"
          data-aos-delay="200">
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem' }}>👑 Mr. Enthusia</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
              {bestBoy ? bestBoy[0] : 'N/A'}
            </p>
            <p style={{ fontSize: '1.2rem', margin: '0.25rem 0' }}>
              {bestBoy ? `${bestBoy[1].rollNo} • ${bestBoy[1].department}` : ''}
            </p>
            <p style={{ fontSize: '1.2rem', margin: 0 }}>
              {bestBoy ? `${bestBoy[1].points.toFixed(2)} pts • ${bestBoy[1].events} events` : '0 points'}
            </p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #ec4899, #f472b6)',
            padding: '2rem',
            borderRadius: '15px',
            border: '3px solid #fce7f3',
            boxShadow: '0 10px 30px rgba(236,72,153,0.4)',
            color: 'white'
          }}
          data-aos="fade-up"
          data-aos-delay="300">
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem' }}>👑 Ms. Enthusia</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
              {bestGirl ? bestGirl[0] : 'N/A'}
            </p>
            <p style={{ fontSize: '1.2rem', margin: '0.25rem 0' }}>
              {bestGirl ? `${bestGirl[1].rollNo} • ${bestGirl[1].department}` : ''}
            </p>
            <p style={{ fontSize: '1.2rem', margin: 0 }}>
              {bestGirl ? `${bestGirl[1].points.toFixed(2)} pts • ${bestGirl[1].events} events` : '0 points'}
            </p>
          </div>
        </div>

        {/* Department Leaderboard */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '20px',
          marginBottom: '2rem',
          boxShadow: '0 16px 32px rgba(0,0,0,0.4)'
        }}
        data-aos="fade-up"
        data-aos-delay="400">
          <h2 style={{ color: '#0a2540', marginTop: 0 }}>📊 Department Leaderboard</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {Object.entries(departmentPoints)
              .sort((a, b) => b[1] - a[1])
              .map(([dept, points], idx) => (
                <div key={dept} style={{
                  padding: '1rem',
                  background: idx === 0 ? 'linear-gradient(135deg, #ffd700, #ffb300)' : 
                             idx === 1 ? 'linear-gradient(135deg, #c0c0c0, #8c8c8c)' : 
                             idx === 2 ? 'linear-gradient(135deg, #cd7f32, #b8860b)' : 
                             'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
                  borderRadius: '10px',
                  textAlign: 'center',
                  border: idx < 3 ? '2px solid rgba(255,255,255,0.3)' : '1px solid #d1d5db',
                  boxShadow: idx < 3 ? '0 8px 20px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.1)',
                  color: idx < 3 ? (idx === 0 ? '#000' : '#fff') : '#374151',
                  transform: idx === 0 ? 'scale(1.05)' : 'scale(1)'
                }}
                data-aos="zoom-in"
                data-aos-delay={100 + idx * 50}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>#{idx + 1}</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>{dept}</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: idx < 3 ? (idx === 0 ? '#000' : '#fff') : '#10b981' }}>
                    {points.toFixed(2)}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Search & Refresh */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '20px',
          marginBottom: '2rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
        }}
        data-aos="fade-up"
        data-aos-delay="500">
          <input
            type="text"
            placeholder="🔍 Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s ease',
              background: '#f8fafc'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
          <button
            onClick={fetchData}
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              background: loading ? '#94a3b8' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}
          >
            {loading ? '🔄 Loading...' : '🔄 Refresh'}
          </button>
        </div>

        {/* Events Table */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '20px',
          boxShadow: '0 16px 32px rgba(0,0,0,0.4)'
        }}
        data-aos="fade-up"
        data-aos-delay="600">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{ color: '#0a2540', margin: 0 }}>
              📋 Events ({filteredEvents.length})
            </h2>
            
            {/* Quick CSV Download for Events */}
            <CSVLink
              data={getEventsCSVData()}
              filename={`enthusia-events-detailed-${new Date().toISOString().split('T')[0]}.csv`}
              style={{
                padding: '0.5rem 1rem',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.875rem',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
              }}
            >
              📥 Download Events
            </CSVLink>
          </div>
          
          <div style={{ overflowX: 'auto', borderRadius: '12px', border: '2px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ 
                  background: 'linear-gradient(135deg, #1e293b, #334155)', 
                  color: 'white'
                }}>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'left',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    borderBottom: '3px solid #0ea5e9'
                  }}>Event</th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'left',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    borderBottom: '3px solid #0ea5e9'
                  }}>Team Members</th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    borderBottom: '3px solid #0ea5e9'
                  }}>Position</th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    borderBottom: '3px solid #0ea5e9'
                  }}>Team Size</th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    borderBottom: '3px solid #0ea5e9'
                  }}>Total Points</th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    borderBottom: '3px solid #0ea5e9'
                  }}>Per Member</th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    borderBottom: '3px solid #0ea5e9'
                  }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event, idx) => {
                  const totalPoints = POSITION_POINTS[event.position] || 0;
                  const pointsPerMember = (totalPoints / event.teamMembers).toFixed(2);
                  
                  return (
                    <tr key={event.id} style={{
                      borderBottom: '2px solid #f1f5f9',
                      background: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#e0f2fe';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                      {/* Event Name */}
                      <td style={{ 
                        padding: '1.25rem 1rem', 
                        fontWeight: '700',
                        color: '#1e293b',
                        fontSize: '1rem',
                        borderLeft: '4px solid #0ea5e9'
                      }}>
                        {event.eventName}
                      </td>
                      
                      {/* Team Members */}
                      <td style={{ 
                        padding: '1.25rem 1rem', 
                        fontSize: '0.875rem', 
                        maxWidth: '300px',
                        color: '#475569',
                        lineHeight: '1.5'
                      }}>
                        {event.studentId}
                      </td>
                      
                      {/* Position */}
                      <td style={{ padding: '1.25rem 1rem', textAlign: 'center' }}>
                        <span style={{
                          padding: '0.75rem 1.25rem',
                          borderRadius: '25px',
                          fontWeight: 'bold',
                          fontSize: '1rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: event.position === '1' ? '#000000' : 
                                 event.position === '2' ? '#1f2937' : 
                                 '#ffffff',
                          textShadow: event.position === '1' ? '0 1px 2px rgba(0,0,0,0.3)' : 
                                     event.position === '2' ? '0 1px 2px rgba(0,0,0,0.3)' : 
                                     '0 1px 2px rgba(0,0,0,0.8)',
                          background: event.position === '1' ? 'linear-gradient(135deg, #ffd700, #ffb300)' : 
                                     event.position === '2' ? 'linear-gradient(135deg, #e5e5e5, #b8b8b8)' : 
                                     'linear-gradient(135deg, #cd7f32, #b8860b)',
                          border: event.position === '1' ? '3px solid #cc9900' : 
                                 event.position === '2' ? '3px solid #999999' : 
                                 '3px solid #996633',
                          boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                          transform: 'scale(1)',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                        }}>
                          <span style={{ fontSize: '1.25rem' }}>
                            {event.position === '1' ? '🥇' : event.position === '2' ? '🥈' : '🥉'}
                          </span>
                          {event.position === '1' ? '1st' : event.position === '2' ? '2nd' : '3rd'} Place
                        </span>
                      </td>
                      
                      {/* Team Size */}
                      <td style={{ 
                        padding: '1.25rem 1rem', 
                        textAlign: 'center', 
                        fontWeight: '700',
                        color: '#374151',
                        fontSize: '1.1rem'
                      }}>
                        <span style={{
                          background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          border: '2px solid #0ea5e9'
                        }}>
                          {event.teamMembers} {event.teamMembers === 1 ? 'Member' : 'Members'}
                        </span>
                      </td>
                      
                      {/* Total Points */}
                      <td style={{ 
                        padding: '1.25rem 1rem', 
                        textAlign: 'center', 
                        fontSize: '1.3rem', 
                        fontWeight: 'bold'
                      }}>
                        <span style={{
                          color: '#059669',
                          background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          border: '2px solid #059669',
                          boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)'
                        }}>
                          {totalPoints} pts
                        </span>
                      </td>
                      
                      {/* Points Per Member */}
                      <td style={{ 
                        padding: '1.25rem 1rem', 
                        textAlign: 'center', 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold'
                      }}>
                        <span style={{
                          color: '#2563eb',
                          background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          border: '2px solid #2563eb',
                          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
                        }}>
                          {pointsPerMember} pts
                        </span>
                      </td>
                      
                      {/* Actions */}
                      <td style={{ padding: '1.25rem 1rem', textAlign: 'center' }}>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          style={{
                            padding: '0.5rem 1rem',
                            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '0.875rem',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
                          }}
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {filteredEvents.length === 0 && (
              <div style={{
                padding: '3rem',
                textAlign: 'center',
                color: '#64748b',
                fontSize: '1.1rem'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
                <p style={{ margin: 0 }}>No events found. Try adjusting your search.</p>
              </div>
            )}
          </div>
        </div>

        {/* Points Configuration Reference */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '2rem',
          borderRadius: '20px',
          marginTop: '2rem',
          color: 'white',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255,255,255,0.2)',
          boxShadow: '0 16px 32px rgba(0,0,0,0.2)'
        }}
        data-aos="fade-up"
        data-aos-delay="700">
          <h3 style={{ margin: '0 0 2rem 0', textAlign: 'center', fontSize: '1.8rem' }}>
            📌 Points Configuration & Rules
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div style={{ 
              textAlign: 'center', 
              background: 'linear-gradient(135deg, #ffd700, #ffb300)',
              padding: '1.5rem',
              borderRadius: '15px',
              border: '3px solid rgba(255,255,255,0.3)',
              color: '#000',
              boxShadow: '0 8px 24px rgba(255,215,0,0.4)',
              transform: 'scale(1)',
              transition: 'all 0.3s ease'
            }}
            data-aos="zoom-in"
            data-aos-delay="100"
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🥇</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>1st Place</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>100 Points</div>
              <div style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>Gold Medal Winner</div>
            </div>
            
            <div style={{ 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #c0c0c0, #8c8c8c)',
              padding: '1.5rem',
              borderRadius: '15px',
              border: '3px solid rgba(255,255,255,0.3)',
              color: '#fff',
              boxShadow: '0 8px 24px rgba(192,192,192,0.4)',
              transform: 'scale(1)',
              transition: 'all 0.3s ease'
            }}
            data-aos="zoom-in"
            data-aos-delay="200"
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🥈</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>2nd Place</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>50 Points</div>
              <div style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>Silver Medal Winner</div>
            </div>
            
            <div style={{ 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #cd7f32, #b8860b)',
              padding: '1.5rem',
              borderRadius: '15px',
              border: '3px solid rgba(255,255,255,0.3)',
              color: '#fff',
              boxShadow: '0 8px 24px rgba(205,127,50,0.4)',
              transform: 'scale(1)',
              transition: 'all 0.3s ease'
            }}
            data-aos="zoom-in"
            data-aos-delay="300"
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🥉</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>3rd Place</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>30 Points</div>
              <div style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>Bronze Medal Winner</div>
            </div>
          </div>
          
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '15px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
          data-aos="fade-up"
          data-aos-delay="400">
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem', color: '#ffd700' }}>
              📋 Calculation Rules:
            </h4>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
              <li><strong>Individual Points:</strong> Total points divided by team size</li>
              <li><strong>Department Points:</strong> Sum of all individual student points from that department</li>
              <li><strong>Team Events:</strong> Points are distributed equally among all team members</li>
              <li><strong>Multi-Department Teams:</strong> Points allocated based on participation percentage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnthusiaCalculator;