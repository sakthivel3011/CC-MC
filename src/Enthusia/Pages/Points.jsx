import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { CSVLink } from 'react-csv';

// Department codes mapping
const DEPARTMENT_CODES = {
 'AD': 'AIDS', 'AL': 'AIML', 'CS': 'CSE', 'AU': 'AUTO', 'CH': 'CHEM',
    'FT': 'FOOD', 'CE': 'CIVIL', 'CD': 'CSD', 'IT': 'IT', 'EE': 'EEE',
    'EI': 'EIE', 'EC': 'ECE', 'ME': 'MECH', 'MT': 'MTS', 'IS': 'MSC',
    'MC': 'MCA', 'MB': 'MBA', 'BI': 'BSC', 'AR': 'ARCH'
};

// Year mapping
const YEAR_CODES = {
  '25': '1st Year', '24': '2nd Year', '23': '3rd Year',
  '22': '4th Year', '21': '5th Year'
};

// Points configuration
const POSITION_POINTS = {
  '1': 100,
  '2': 50,
  '3': 30
};

// Chart colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B9D'];

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

const EnthusiaCalculator = () => {
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxUTzfc_1hmD8qCiq1fGbxQvrJzEgaHIgZRL8RTM2ve_KN1fG7g11TGkBYGdkxxlv8D/exec';
  
  const [participants, setParticipants] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [departmentPoints, setDepartmentPoints] = useState({});
  const [studentPoints, setStudentPoints] = useState({ male: {}, female: {} });
  const [yearWiseData, setYearWiseData] = useState({});
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculatePoints();
  }, [events, participants]);



  const parseRollNumber = (rollNo) => {
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
        setMessage(' Data loaded successfully!');
      } else {
        setMessage(' Error loading data');
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
    const yearData = {};

    events.forEach(event => {
      const basePoints = POSITION_POINTS[event.position] || 0;
      const teamSize = event.teamMembers;
      
      const deptParticipation = {};
      const teamMembers = [];
      
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
          
          if (!yearData[parsed.year]) {
            yearData[parsed.year] = { points: 0, events: 0, students: new Set() };
          }
          yearData[parsed.year].students.add(rollNo);
          
          teamMembers.push({
            name: member.split('(')[0].trim(),
            rollNo: rollNo,
            dept: parsed.dept,
            year: parsed.year
          });
        }
      });

      Object.keys(deptParticipation).forEach(dept => {
        const participationPercentage = (deptParticipation[dept] / teamSize) * 100;
        const deptPointsForEvent = basePoints * (participationPercentage / 100);
        
        if (!deptPoints[dept]) {
          deptPoints[dept] = 0;
        }
        deptPoints[dept] += deptPointsForEvent;
      });

      teamMembers.forEach(member => {
        const pointsPerMember = basePoints / teamSize;
        yearData[member.year].points += pointsPerMember;
        yearData[member.year].events += 1;
      });

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

    Object.keys(yearData).forEach(year => {
      yearData[year].students = yearData[year].students.size;
    });

    setDepartmentPoints(deptPoints);
    setStudentPoints(studPoints);
    setYearWiseData(yearData);
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



  // CSV Data preparation
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

  // Prepare chart data
  const departmentChartData = Object.entries(departmentPoints)
    .sort((a, b) => b[1] - a[1])
    .map(([dept, points]) => ({
      department: dept,
      points: parseFloat(points.toFixed(2))
    }));

  const yearChartData = Object.entries(yearWiseData)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([year, data]) => ({
      year: year,
      points: parseFloat(data.points.toFixed(2)),
      events: data.events,
      students: data.students
    }));

  const genderDistribution = [
    { name: 'Male Students', value: Object.keys(studentPoints.male).length },
    { name: 'Female Students', value: Object.keys(studentPoints.female).length }
  ];

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
      padding: 'clamp(0.5rem, 2vw, 2rem)',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          background: 'rgba(255,255,255,0.1)',
          padding: 'clamp(1rem, 3vw, 1.5rem)',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          border: '2px solid #ffd700'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <TrophyIcon />
            <div style={{ textAlign: window.innerWidth < 768 ? 'center' : 'left' }}>
              <h1 style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #ffd700, #ffbf00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0
              }}>Enthusia 2026</h1>
              <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: 'clamp(0.8rem, 2vw, 1rem)' }}>
                Points Calculator & Analytics
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
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
                textAlign: 'center'
              }}
            >
              📊 Events
            </CSVLink>
            

          </div>
        </div>

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

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          overflowX: 'auto',
          padding: '0.5rem',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '15px',
          flexWrap: 'wrap'
        }}>
          {['overview', 'charts', 'events'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.75rem 1.5rem',
                background: activeTab === tab ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'transparent',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                transition: 'all 0.3s ease',
                textTransform: 'capitalize',
                whiteSpace: 'nowrap'
              }}
            >
              {tab === 'overview' ? '📊' : tab === 'charts' ? '📈' : '📋'} {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Winners */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                padding: 'clamp(1rem, 3vw, 2rem)',
                borderRadius: '15px',
                border: '3px solid #fff',
                boxShadow: '0 10px 30px rgba(255,215,0,0.4)',
                color: '#0a2540'
              }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}>👑 Mr. Enthusia</h3>
                <p style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 'bold', margin: '0.5rem 0', wordBreak: 'break-word' }}>
                  {bestBoy ? bestBoy[0] : 'N/A'}
                </p>
                <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', margin: '0.25rem 0' }}>
                  {bestBoy ? `${bestBoy[1].rollNo} • ${bestBoy[1].department}` : ''}
                </p>
                <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', margin: 0 }}>
                  {bestBoy ? `${bestBoy[1].points.toFixed(2)} pts • ${bestBoy[1].events} events` : '0 points'}
                </p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #ec4899, #f472b6)',
                padding: 'clamp(1rem, 3vw, 2rem)',
                borderRadius: '15px',
                border: '3px solid #fce7f3',
                boxShadow: '0 10px 30px rgba(236,72,153,0.4)',
                color: 'white'
              }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}>👑 Ms. Enthusia</h3>
                <p style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 'bold', margin: '0.5rem 0', wordBreak: 'break-word' }}>
                  {bestGirl ? bestGirl[0] : 'N/A'}
                </p>
                <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', margin: '0.25rem 0' }}>
                  {bestGirl ? `${bestGirl[1].rollNo} • ${bestGirl[1].department}` : ''}
                </p>
                <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', margin: 0 }}>
                  {bestGirl ? `${bestGirl[1].points.toFixed(2)} pts • ${bestGirl[1].events} events` : '0 points'}
                </p>
              </div>
            </div>

            {/* Department Leaderboard */}
            <div style={{
              background: 'white',
              padding: 'clamp(1rem, 3vw, 2rem)',
              borderRadius: '20px',
              marginBottom: '2rem',
              boxShadow: '0 16px 32px rgba(0,0,0,0.4)'
            }}>
              <h2 style={{ color: '#0a2540', marginTop: 0, fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}>📊 Department Leaderboard</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '1rem'
              }}>
                {Object.entries(departmentPoints)
                  .sort((a, b) => b[1] - a[1])
                  .map(([dept, points], idx) => (
                    <div key={dept} style={{
                      padding: 'clamp(0.75rem, 2vw, 1rem)',
                      background: idx === 0 ? 'linear-gradient(135deg, #ffd700, #ffb300)' : 
                                 idx === 1 ? 'linear-gradient(135deg, #c0c0c0, #8c8c8c)' : 
                                 idx === 2 ? 'linear-gradient(135deg, #cd7f32, #b8860b)' : 
                                 'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
                      borderRadius: '10px',
                      textAlign: 'center',
                      border: idx < 3 ? '2px solid rgba(255,255,255,0.3)' : '1px solid #d1d5db',
                      boxShadow: idx < 3 ? '0 8px 20px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.1)',
                      color: idx < 3 ? (idx === 0 ? '#000' : '#fff') : '#374151',
                      transform: idx === 0 ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.3s ease',
                      animation: `fadeIn 0.5s ease ${idx * 0.05}s both`
                    }}>
                      <div style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 'bold' }}>#{idx + 1}</div>
                      <div style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', fontWeight: 'bold', margin: '0.5rem 0' }}>{dept}</div>
                      <div style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 'bold', color: idx < 3 ? (idx === 0 ? '#000' : '#fff') : '#10b981' }}>
                        {points.toFixed(2)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}

        {/* Charts Tab */}
        {activeTab === 'charts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Department Points Bar Chart */}
            <div style={{
              background: 'white',
              padding: 'clamp(1rem, 3vw, 2rem)',
              borderRadius: '20px',
              boxShadow: '0 16px 32px rgba(0,0,0,0.4)'
            }}>
              <h2 style={{ color: '#0a2540', marginTop: 0, fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}>
                📊 Department Performance
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={departmentChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="points" fill="#3b82f6" name="Total Points" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Year-wise Performance */}
            <div style={{
              background: 'white',
              padding: 'clamp(1rem, 3vw, 2rem)',
              borderRadius: '20px',
              boxShadow: '0 16px 32px rgba(0,0,0,0.4)'
            }}>
              <h2 style={{ color: '#0a2540', marginTop: 0, fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}>
                📈 Year-wise Analysis
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={yearChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="points" fill="#8884d8" name="Total Points" />
                  <Bar yAxisId="right" dataKey="students" fill="#82ca9d" name="Students" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Gender Distribution Pie Chart */}
            <div style={{
              background: 'white',
              padding: 'clamp(1rem, 3vw, 2rem)',
              borderRadius: '20px',
              boxShadow: '0 16px 32px rgba(0,0,0,0.4)'
            }}>
              <h2 style={{ color: '#0a2540', marginTop: 0, fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}>
                👥 Gender Distribution
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={genderDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : '#ec4899'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Year-wise Events Line Chart */}
            <div style={{
              background: 'white',
              padding: 'clamp(1rem, 3vw, 2rem)',
              borderRadius: '20px',
              boxShadow: '0 16px 32px rgba(0,0,0,0.4)'
            }}>
              <h2 style={{ color: '#0a2540', marginTop: 0, fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}>
                📉 Year-wise Event Participation
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={yearChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="events" stroke="#8b5cf6" strokeWidth={3} name="Events Participated" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Comprehensive Leaderboards Section */}
            <div style={{
              background: 'white',
              padding: 'clamp(1rem, 3vw, 2rem)',
              borderRadius: '20px',
              marginTop: '2rem',
              boxShadow: '0 16px 32px rgba(0,0,0,0.4)'
            }}>
              <h2 style={{ color: '#0a2540', marginTop: 0, marginBottom: '2rem', fontSize: 'clamp(1.3rem, 3vw, 2rem)', textAlign: 'center' }}>
                🏆 Complete Leaderboards
              </h2>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '2rem' 
              }}>
                {/* Mr. Enthusia Top 10 */}
                <div style={{
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  padding: '1.5rem',
                  borderRadius: '15px',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)'
                }}>
                  <h3 style={{ margin: '0 0 1rem 0', textAlign: 'center', fontSize: '1.4rem' }}>
                    👑 Mr. Enthusia Top 10
                  </h3>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {Object.entries(studentPoints.male)
                      .sort((a, b) => b[1].points - a[1].points)
                      .slice(0, 10)
                      .map(([name, data], idx) => (
                        <div key={name} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.75rem',
                          margin: '0.5rem 0',
                          background: idx === 0 ? 'rgba(255,215,0,0.3)' : 
                                     idx === 1 ? 'rgba(192,192,192,0.3)' : 
                                     idx === 2 ? 'rgba(205,127,50,0.3)' : 
                                     'rgba(255,255,255,0.1)',
                          borderRadius: '10px',
                          border: idx < 3 ? '2px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.2)'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ 
                              fontSize: '1.2rem', 
                              fontWeight: 'bold',
                              minWidth: '30px' 
                            }}>
                              {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                            </span>
                            <div>
                              <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{name}</div>
                              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                                {data.rollNo} • {data.department} • {data.year}
                              </div>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{data.points.toFixed(1)} pts</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>{data.events} events</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Ms. Enthusia Top 10 */}
                <div style={{
                  background: 'linear-gradient(135deg, #ec4899, #be185d)',
                  padding: '1.5rem',
                  borderRadius: '15px',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(236, 72, 153, 0.4)'
                }}>
                  <h3 style={{ margin: '0 0 1rem 0', textAlign: 'center', fontSize: '1.4rem' }}>
                    👑 Ms. Enthusia Top 10
                  </h3>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {Object.entries(studentPoints.female)
                      .sort((a, b) => b[1].points - a[1].points)
                      .slice(0, 10)
                      .map(([name, data], idx) => (
                        <div key={name} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.75rem',
                          margin: '0.5rem 0',
                          background: idx === 0 ? 'rgba(255,215,0,0.3)' : 
                                     idx === 1 ? 'rgba(192,192,192,0.3)' : 
                                     idx === 2 ? 'rgba(205,127,50,0.3)' : 
                                     'rgba(255,255,255,0.1)',
                          borderRadius: '10px',
                          border: idx < 3 ? '2px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.2)'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ 
                              fontSize: '1.2rem', 
                              fontWeight: 'bold',
                              minWidth: '30px' 
                            }}>
                              {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                            </span>
                            <div>
                              <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{name}</div>
                              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                                {data.rollNo} • {data.department} • {data.year}
                              </div>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{data.points.toFixed(1)} pts</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>{data.events} events</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Department Rankings */}
                <div style={{
                  background: 'linear-gradient(135deg, #10b981, #047857)',
                  padding: '1.5rem',
                  borderRadius: '15px',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)'
                }}>
                  <h3 style={{ margin: '0 0 1rem 0', textAlign: 'center', fontSize: '1.4rem' }}>
                    🏢 Department Rankings
                  </h3>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {Object.entries(departmentPoints)
                      .sort((a, b) => b[1] - a[1])
                      .map(([dept, points], idx) => (
                        <div key={dept} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.75rem',
                          margin: '0.5rem 0',
                          background: idx === 0 ? 'rgba(255,215,0,0.3)' : 
                                     idx === 1 ? 'rgba(192,192,192,0.3)' : 
                                     idx === 2 ? 'rgba(205,127,50,0.3)' : 
                                     'rgba(255,255,255,0.1)',
                          borderRadius: '10px',
                          border: idx < 3 ? '2px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.2)'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ 
                              fontSize: '1.2rem', 
                              fontWeight: 'bold',
                              minWidth: '30px' 
                            }}>
                              {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                            </span>
                            <div>
                              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{dept}</div>
                              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                                {Object.values(studentPoints.male).filter(s => s.department === dept).length + 
                                 Object.values(studentPoints.female).filter(s => s.department === dept).length} participants
                              </div>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>{points.toFixed(1)} pts</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Overall Statistics */}
              <div style={{
                marginTop: '2rem',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                borderRadius: '15px',
                color: 'white',
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.4rem' }}>📊 Competition Statistics</h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1rem',
                  marginTop: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                      {Object.keys(studentPoints.male).length + Object.keys(studentPoints.female).length}
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Total Participants</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                      {Object.keys(departmentPoints).length}
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Participating Departments</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                      {events.length}
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Total Events</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                      {Object.values(departmentPoints).reduce((sum, points) => sum + points, 0).toFixed(0)}
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Total Points Awarded</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <>
            {/* Search & Refresh */}
            <div style={{
              background: 'white',
              padding: 'clamp(0.75rem, 2vw, 1.5rem)',
              borderRadius: '20px',
              marginBottom: '2rem',
              display: 'flex',
              flexDirection: window.innerWidth < 768 ? 'column' : 'row',
              gap: '1rem',
              alignItems: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
            }}>
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
                  background: '#f8fafc',
                  width: window.innerWidth < 768 ? '100%' : 'auto',
                  boxSizing: 'border-box'
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
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                  width: window.innerWidth < 768 ? '100%' : 'auto',
                  whiteSpace: 'nowrap'
                }}
              >
                {loading ? '🔄 Loading...' : '🔄 Refresh'}
              </button>
            </div>

            {/* Events Table */}
            <div style={{
              background: 'white',
              padding: 'clamp(0.75rem, 2vw, 2rem)',
              borderRadius: '20px',
              boxShadow: '0 16px 32px rgba(0,0,0,0.4)'
            }}>
              <div style={{ 
                display: 'flex', 
                flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                justifyContent: 'space-between', 
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <h2 style={{ color: '#0a2540', margin: 0, fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}>
                  📋 Events ({filteredEvents.length})
                </h2>
                
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
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  📥 Download Events
                </CSVLink>
              </div>
              
              <div style={{ overflowX: 'auto', borderRadius: '12px', border: '2px solid #e2e8f0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ 
                      background: 'linear-gradient(135deg, #1e293b, #334155)', 
                      color: 'white'
                    }}>
                      <th style={{ 
                        padding: 'clamp(0.75rem, 2vw, 1rem)', 
                        textAlign: 'left',
                        fontWeight: 'bold',
                        fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                        borderBottom: '3px solid #0ea5e9'
                      }}>Event</th>
                      <th style={{ 
                        padding: 'clamp(0.75rem, 2vw, 1rem)', 
                        textAlign: 'left',
                        fontWeight: 'bold',
                        fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                        borderBottom: '3px solid #0ea5e9'
                      }}>Team Members</th>
                      <th style={{ 
                        padding: 'clamp(0.75rem, 2vw, 1rem)', 
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                        borderBottom: '3px solid #0ea5e9'
                      }}>Position</th>
                      <th style={{ 
                        padding: 'clamp(0.75rem, 2vw, 1rem)', 
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                        borderBottom: '3px solid #0ea5e9'
                      }}>Points</th>

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
                        }}>
                          <td style={{ 
                            padding: 'clamp(0.75rem, 2vw, 1.25rem)', 
                            fontWeight: '700',
                            color: '#1e293b',
                            fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                            borderLeft: '4px solid #0ea5e9'
                          }}>
                            {event.eventName}
                          </td>
                          
                          <td style={{ 
                            padding: 'clamp(0.75rem, 2vw, 1.25rem)', 
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', 
                            maxWidth: '300px',
                            color: '#475569',
                            lineHeight: '1.5'
                          }}>
                            {event.studentId}
                          </td>
                          
                          <td style={{ padding: 'clamp(0.75rem, 2vw, 1.25rem)', textAlign: 'center' }}>
                            <span style={{
                              padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1.25rem)',
                              borderRadius: '25px',
                              fontWeight: 'bold',
                              fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              color: event.position === '1' ? '#000000' : 
                                     event.position === '2' ? '#1f2937' : 
                                     '#ffffff',
                              background: event.position === '1' ? 'linear-gradient(135deg, #ffd700, #ffb300)' : 
                                         event.position === '2' ? 'linear-gradient(135deg, #e5e5e5, #b8b8b8)' : 
                                         'linear-gradient(135deg, #cd7f32, #b8860b)',
                              border: `2px solid ${event.position === '1' ? '#cc9900' : event.position === '2' ? '#999999' : '#996633'}`,
                              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                            }}>
                              {event.position === '1' ? '🥇' : event.position === '2' ? '🥈' : '🥉'}
                              <span style={{ display: window.innerWidth < 480 ? 'none' : 'inline' }}>
                                {event.position === '1' ? '1st' : event.position === '2' ? '2nd' : '3rd'}
                              </span>
                            </span>
                          </td>
                          
                          <td style={{ 
                            padding: 'clamp(0.75rem, 2vw, 1.25rem)', 
                            textAlign: 'center', 
                            fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', 
                            fontWeight: 'bold'
                          }}>
                            <div style={{ color: '#059669' }}>
                              {totalPoints} pts
                            </div>
                            <div style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)', color: '#2563eb' }}>
                              ({pointsPerMember} each)
                            </div>
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
                    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
                    <p style={{ margin: 0 }}>No events found. Try adjusting your search.</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Points Configuration */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: 'clamp(1rem, 3vw, 2rem)',
          borderRadius: '20px',
          marginTop: '2rem',
          color: 'white',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255,255,255,0.2)',
          boxShadow: '0 16px 32px rgba(0,0,0,0.2)'
        }}>
          <h3 style={{ margin: '0 0 2rem 0', textAlign: 'center', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>
            📌 Points Configuration
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div style={{ 
              textAlign: 'center', 
              background: 'linear-gradient(135deg, #ffd700, #ffb300)',
              padding: '1.5rem',
              borderRadius: '15px',
              border: '3px solid rgba(255,255,255,0.3)',
              color: '#000',
              boxShadow: '0 8px 24px rgba(255,215,0,0.4)'
            }}>
              <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>🥇</div>
              <div style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 'bold', marginBottom: '0.5rem' }}>1st Place</div>
              <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 'bold' }}>100 Points</div>
            </div>
            
            <div style={{ 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #c0c0c0, #8c8c8c)',
              padding: '1.5rem',
              borderRadius: '15px',
              border: '3px solid rgba(255,255,255,0.3)',
              color: '#fff',
              boxShadow: '0 8px 24px rgba(192,192,192,0.4)'
            }}>
              <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>🥈</div>
              <div style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 'bold', marginBottom: '0.5rem' }}>2nd Place</div>
              <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 'bold' }}>50 Points</div>
            </div>
            
            <div style={{ 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #cd7f32, #b8860b)',
              padding: '1.5rem',
              borderRadius: '15px',
              border: '3px solid rgba(255,255,255,0.3)',
              color: '#fff',
              boxShadow: '0 8px 24px rgba(205,127,50,0.4)'
            }}>
              <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>🥉</div>
              <div style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 'bold', marginBottom: '0.5rem' }}>3rd Place</div>
              <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 'bold' }}>30 Points</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          table {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EnthusiaCalculator;