import React, { useState, useEffect } from 'react';
import '../styles/StaffMarking.css';

// Staff credentials for marking
const staffCredentials = {
  'staff1': { username: 'sakthi', password: 'vel', name: 'Sakthivel' },
  'staff2': { username: 'judge2', password: 'judge2-enth-26', name: 'Judge 2' },
  'staff3': { username: 'judge3', password: 'judge3-enth-26', name: 'Judge 3' },
};

// Your deployed Google Apps Script URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzd_05mLc2CkvW4FryOU2e7YS60IRXU4NTFF008aSF8wEZVIOXS2SSJ7uXbbEOtsX6v/exec';

const allEvents = [
  'Comic Satire', 'Solo Instrumental', 'Solo Dance', 'Solo Singing', 'Mime',
  'Imitation', 'Stand Up Comedy', 'Anchoring', 'Dual Dance', 'Group Instrumental',
  'Group Dance', 'Group Singing', 'Fashion Parade', 'Movie Depiction', 'Skit', 'Short Film'
];

// Sample participants for each event
const participantsByEvent = {
  'Comic Satire': [
    { id: 'CS-001', name: 'Comedian 1' },
    { id: 'CS-002', name: 'Comedian 2' },
  ],
  'Solo Instrumental': [
    { id: 'SI-001', name: 'Instrumentalist 1' },
    { id: 'SI-002', name: 'Instrumentalist 2' },
  ],
  'Solo Dance': [
    { id: 'SD-001', name: 'Dancer 1' },
    { id: 'SD-002', name: 'Dancer 2' },
    { id: 'SD-003', name: 'Dancer 3' },
  ],
  'Solo Singing': [
    { id: 'SS-001', name: 'Singer 1' },
    { id: 'SS-002', name: 'Singer 2' },
  ],
  'Mime': [
    { id: 'MM-001', name: 'Mime Artist 1' },
  ],
  'Imitation': [
    { id: 'IM-001', name: 'Imitator 1' },
    { id: 'IM-002', name: 'Imitator 2' },
  ],
  'Stand Up Comedy': [
    { id: 'SU-001', name: 'Comedian 1' },
  ],
  'Anchoring': [
    { id: 'AN-001', name: 'Anchor 1' },
    { id: 'AN-002', name: 'Anchor 2' },
  ],
  'Dual Dance': [
    { id: 'DD-001', name: 'Duo 1' },
    { id: 'DD-002', name: 'Duo 2' },
  ],
  'Group Instrumental': [
    { id: 'GI-001', name: 'Band 1' },
    { id: 'GI-002', name: 'Band 2' },
  ],
  'Group Dance': [
    { id: 'GD-001', name: 'Team A' },
    { id: 'GD-002', name: 'Team B' },
    { id: 'GD-003', name: 'Team C' },
  ],
  'Group Singing': [
    { id: 'GS-001', name: 'Choir 1' },
    { id: 'GS-002', name: 'Choir 2' },
  ],
  'Fashion Parade': [
    { id: 'FP-001', name: 'Model 1' },
    { id: 'FP-002', name: 'Model 2' },
  ],
  'Movie Depiction': [
    { id: 'MD-001', name: 'Team 1' },
    { id: 'MD-002', name: 'Team 2' },
  ],
  'Skit': [
    { id: 'SK-001', name: 'Skit Team 1' },
    { id: 'SK-002', name: 'Skit Team 2' },
  ],
  'Short Film': [
    { id: 'SF-001', name: 'Film Team 1' },
  ],
};

const StaffMarkingSystem = () => {
  const [loggedInStaff, setLoggedInStaff] = useState(null);
  const [staffId, setStaffId] = useState(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Load marks from Google Sheets when event is selected
  useEffect(() => {
    if (selectedEvent && staffId) {
      loadMarks();
    }
  }, [selectedEvent, staffId]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    
    const staffEntry = Object.entries(staffCredentials).find(
      ([id, creds]) => creds.username === usernameInput && creds.password === passwordInput
    );
    
    if (staffEntry) {
      const [id, data] = staffEntry;
      setLoggedInStaff(data.name);
      setStaffId(id);
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setLoggedInStaff(null);
    setStaffId(null);
    setSelectedEvent(null);
    setMarks({});
    setUsernameInput('');
    setPasswordInput('');
  };

  const loadMarks = async () => {
    setLoading(true);
    try {
      const url = `${GOOGLE_SCRIPT_URL}?action=getMarks&event=${encodeURIComponent(selectedEvent)}&staff=${staffId}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.marks) {
        setMarks(data.marks);
      }
    } catch (error) {
      console.error('Error loading marks:', error);
      setSaveMessage('✗ Error loading marks');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const saveMarks = async () => {
    setSaving(true);
    setSaveMessage('');
    
    try {
      const payload = {
        action: 'saveMarks',
        event: selectedEvent,
        staff: staffId,
        marks: marks
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      // Since we're using no-cors, we can't read the response
      // But if no error is thrown, we assume success
      setSaveMessage('✓ Marks saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
      
    } catch (error) {
      console.error('Error saving marks:', error);
      setSaveMessage('✗ Error saving marks. Please try again.');
      setTimeout(() => setSaveMessage(''), 5000);
    } finally {
      setSaving(false);
    }
  };

  const updateMark = (participantId, criterion, value) => {
    setMarks(prev => ({
      ...prev,
      [participantId]: {
        ...prev[participantId],
        [criterion]: Math.max(0, Math.min(10, Number(value) || 0))
      }
    }));
  };

  const getTotal = (participantId) => {
    const participantMarks = marks[participantId] || {};
    return Object.values(participantMarks).reduce((sum, val) => sum + (Number(val) || 0), 0);
  };

  // Login Screen
  if (!loggedInStaff) {
    return (
      <div className="SM-login-container">
        <div className="SM-login-card">
          <div className="SM-login-header">
            <h2 className="SM-brand">ENTHUSIA 2K26</h2>
            <h1 className="SM-title">Staff Marking Panel</h1>
          </div>
          <div className="SM-form">
            <div className="SM-form-group">
              <label>👤 Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
              />
            </div>
            <div className="SM-form-group">
              <label>🔒 Password</label>
              <div className="SM-password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            {loginError && <p className="SM-error">{loginError}</p>}
            <button onClick={handleLogin} className="SM-login-btn">Login</button>
          </div>
        </div>
      </div>
    );
  }

  // Event Selection
  if (!selectedEvent) {
    return (
      <div className="SM-dashboard">
        <header className="SM-header">
          <div>
            <h1>Welcome, {loggedInStaff}</h1>
            <p className="SM-subtitle">Select an event to start marking</p>
          </div>
          <button onClick={handleLogout} className="SM-logout-btn">Logout</button>
        </header>
        <main className="SM-event-grid">
          {allEvents.map((event, index) => (
            <div key={event} className="SM-event-card" onClick={() => setSelectedEvent(event)}>
              <h3>{event}</h3>
              <p>👥 {participantsByEvent[event]?.length || 0} Participants</p>
              <button className="SM-select-btn">Select Event</button>
            </div>
          ))}
        </main>
      </div>
    );
  }

  // Marking Interface
  const participants = participantsByEvent[selectedEvent] || [];

  return (
    <div className="SM-dashboard">
      <header className="SM-header SM-marking-header">
        <div>
          <h1>{selectedEvent}</h1>
          <p className="SM-subtitle">Judge: {loggedInStaff}</p>
        </div>
        <div className="SM-header-actions">
          <button onClick={() => setSelectedEvent(null)} className="SM-back-btn">← Back</button>
          <button onClick={handleLogout} className="SM-logout-btn">Logout</button>
        </div>
      </header>

      <main className="SM-marking-container">
        {saveMessage && (
          <div className={`SM-save-message ${saveMessage.includes('✓') ? 'success' : 'error'}`}>
            {saveMessage}
          </div>
        )}

        {loading ? (
          <div className="SM-loading">Loading marks...</div>
        ) : (
          <>
            <div className="SM-table-container">
              <table className="SM-marking-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>PARTICIPANT</th>
                    <th>PERFORMANCE</th>
                    <th>PRESENTATION</th>
                    <th>CREATIVITY</th>
                    <th>OVERALL</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map(participant => {
                    const participantMarks = marks[participant.id] || {};
                    return (
                      <tr key={participant.id}>
                        <td>{participant.id}</td>
                        <td className="SM-participant-name">{participant.name}</td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={participantMarks.performance || ''}
                            onChange={(e) => updateMark(participant.id, 'performance', e.target.value)}
                            placeholder="0-10"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={participantMarks.presentation || ''}
                            onChange={(e) => updateMark(participant.id, 'presentation', e.target.value)}
                            placeholder="0-10"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={participantMarks.creativity || ''}
                            onChange={(e) => updateMark(participant.id, 'creativity', e.target.value)}
                            placeholder="0-10"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={participantMarks.overall || ''}
                            onChange={(e) => updateMark(participant.id, 'overall', e.target.value)}
                            placeholder="0-10"
                          />
                        </td>
                        <td className="SM-total">{getTotal(participant.id)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="SM-save-section">
              <button onClick={saveMarks} disabled={saving} className="SM-save-btn">
                {saving ? '💾 Saving...' : '💾 Save Marks'}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default StaffMarkingSystem;