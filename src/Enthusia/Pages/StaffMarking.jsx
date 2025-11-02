import React, { useState, useEffect } from 'react';

// Staff credentials
const staffCredentials = {
  'staff1': { username: 'sakthi', password: 'vel', name: 'Sakthivel' },
  'staff2': { username: 'judge2', password: 'judge2-enth-26', name: 'Judge 2' },
  'staff3': { username: 'judge3', password: 'judge3-enth-26', name: 'Judge 3' },
};

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyJZJufMu9LiYaIOQmWbUs7NPUHQhm9nJk9B0SzdRd4HyD9DPO1nZSeDtBGlKv7jHLa/exec';

const allEvents = [
  'Comic Satire', 'Solo Instrumental', 'Solo Dance', 'Solo Singing', 'Mime',
  'Imitation', 'Stand Up Comedy', 'Anchoring', 'Dual Dance', 'Group Instrumental',
  'Group Dance', 'Group Singing', 'Fashion Parade', 'Movie Depiction', 'Skit', 'Short Film'
];

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
  const [selectedParticipants, setSelectedParticipants] = useState({});
  const [activeParticipant, setActiveParticipant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

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
    setSelectedParticipants({});
    setActiveParticipant(null);
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
      if (data.selected) {
        setSelectedParticipants(data.selected);
      }
      if (data.active) {
        setActiveParticipant(data.active);
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
        marks: marks,
        selected: selectedParticipants,
        active: activeParticipant
      };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

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

  const toggleSelection = (participantId) => {
    setSelectedParticipants(prev => ({
      ...prev,
      [participantId]: !prev[participantId]
    }));
  };

  const setAsActive = (participantId) => {
    setActiveParticipant(participantId === activeParticipant ? null : participantId);
  };

  const getTotal = (participantId) => {
    const participantMarks = marks[participantId] || {};
    return Object.values(participantMarks).reduce((sum, val) => sum + (Number(val) || 0), 0);
  };

  const getRank = () => {
    const participants = participantsByEvent[selectedEvent] || [];
    const totals = participants.map(p => ({
      id: p.id,
      name: p.name,
      total: getTotal(p.id)
    })).sort((a, b) => b.total - a.total);
    
    return totals;
  };

  if (!loggedInStaff) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
          <div style={styles.loginHeader}>
            <h2 style={styles.brand}>ENTHUSIA 2K26</h2>
            <h1 style={styles.title}>Staff Marking Panel</h1>
          </div>
          <form style={styles.form} onSubmit={handleLogin}>
            <div style={styles.formGroup}>
              <label style={styles.label}>👤 Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>🔒 Password</label>
              <div style={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  style={{...styles.input, paddingRight: '45px'}}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            {loginError && <p style={styles.error}>{loginError}</p>}
            <button type="submit" style={styles.loginBtn}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  if (!selectedEvent) {
    return (
      <div style={styles.dashboard}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.headerTitle}>Welcome, {loggedInStaff}</h1>
            <p style={styles.subtitle}>Select an event to start marking</p>
          </div>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </header>
        <main style={styles.eventGrid}>
          {allEvents.map((event) => (
            <div key={event} style={styles.eventCard} onClick={() => setSelectedEvent(event)}>
              <h3 style={styles.eventTitle}>{event}</h3>
              <p style={styles.eventInfo}>👥 {participantsByEvent[event]?.length || 0} Participants</p>
              <button style={styles.selectBtn}>Select Event</button>
            </div>
          ))}
        </main>
      </div>
    );
  }

  const participants = participantsByEvent[selectedEvent] || [];
  const rankings = getRank();

  return (
    <div style={styles.dashboard}>
      <header style={styles.markingHeader}>
        <div>
          <h1 style={styles.headerTitle}>{selectedEvent}</h1>
          <p style={styles.subtitle}>Judge: {loggedInStaff}</p>
        </div>
        <div style={styles.headerActions}>
          <button onClick={() => setSelectedEvent(null)} style={styles.backBtn}>← Back</button>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </header>

      <main style={styles.markingContainer}>
        {saveMessage && (
          <div style={{...styles.saveMessage, ...(saveMessage.includes('✓') ? styles.success : styles.errorMsg)}}>
            {saveMessage}
          </div>
        )}

        {loading ? (
          <div style={styles.loading}>Loading marks...</div>
        ) : (
          <>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>SELECTED</th>
                    <th style={styles.th}>ACTIVE</th>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>PARTICIPANT</th>
                    <th style={styles.th}>PERF</th>
                    <th style={styles.th}>PRES</th>
                    <th style={styles.th}>CREA</th>
                    <th style={styles.th}>OVER</th>
                    <th style={styles.th}>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map(participant => {
                    const participantMarks = marks[participant.id] || {};
                    const isSelected = selectedParticipants[participant.id];
                    const isActive = activeParticipant === participant.id;
                    
                    return (
                      <tr key={participant.id} style={{
                        ...styles.tr,
                        backgroundColor: isActive ? 'rgba(0, 255, 136, 0.1)' : 'transparent'
                      }}>
                        <td style={styles.td}>
                          <button
                            onClick={() => toggleSelection(participant.id)}
                            style={{
                              ...styles.checkBtn,
                              backgroundColor: isSelected ? '#00ff88' : '#3e3e4a',
                              color: isSelected ? '#0f1419' : '#a0aec0'
                            }}
                          >
                            {isSelected ? '✓' : '○'}
                          </button>
                        </td>
                        <td style={styles.td}>
                          <button
                            onClick={() => setAsActive(participant.id)}
                            style={{
                              ...styles.activeBtn,
                              backgroundColor: isActive ? '#ffd300' : '#3e3e4a',
                              color: isActive ? '#0f1419' : '#a0aec0'
                            }}
                          >
                            {isActive ? '🎤 LIVE' : 'SET'}
                          </button>
                        </td>
                        <td style={styles.td}>{participant.id}</td>
                        <td style={{...styles.td, fontWeight: 600}}>{participant.name}</td>
                        <td style={styles.td}>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={participantMarks.performance || ''}
                            onChange={(e) => updateMark(participant.id, 'performance', e.target.value)}
                            placeholder="0-10"
                            style={styles.numberInput}
                          />
                        </td>
                        <td style={styles.td}>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={participantMarks.presentation || ''}
                            onChange={(e) => updateMark(participant.id, 'presentation', e.target.value)}
                            placeholder="0-10"
                            style={styles.numberInput}
                          />
                        </td>
                        <td style={styles.td}>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={participantMarks.creativity || ''}
                            onChange={(e) => updateMark(participant.id, 'creativity', e.target.value)}
                            placeholder="0-10"
                            style={styles.numberInput}
                          />
                        </td>
                        <td style={styles.td}>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={participantMarks.overall || ''}
                            onChange={(e) => updateMark(participant.id, 'overall', e.target.value)}
                            placeholder="0-10"
                            style={styles.numberInput}
                          />
                        </td>
                        <td style={{...styles.td, ...styles.total}}>{getTotal(participant.id)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div style={styles.rankSection}>
              <h3 style={styles.rankTitle}>📊 Current Rankings</h3>
              <div style={styles.rankList}>
                {rankings.map((item, index) => (
                  <div key={item.id} style={styles.rankItem}>
                    <span style={styles.rankPos}>#{index + 1}</span>
                    <span style={styles.rankName}>{item.name}</span>
                    <span style={styles.rankScore}>{item.total} pts</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.saveSection}>
              <button onClick={saveMarks} disabled={saving} style={styles.saveBtn}>
                {saving ? '💾 Saving...' : '💾 Save All Data'}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

const styles = {
  loginContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    backgroundColor: '#0f1419'
  },
  loginCard: {
    width: '100%',
    maxWidth: '420px',
    background: '#1e1e2e',
    borderRadius: '20px',
    padding: '2.5rem',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    border: '1px solid #3e3e4a'
  },
  loginHeader: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  brand: {
    color: '#bf00ff',
    margin: 0,
    fontSize: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  title: {
    color: '#ffd300',
    margin: '0.25rem 0 0',
    fontSize: '2rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontWeight: 600,
    color: '#a0aec0',
    fontSize: '0.9rem'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid #3e3e4a',
    backgroundColor: '#0f1419',
    color: '#f8fafc',
    fontSize: '1rem'
  },
  passwordWrapper: {
    position: 'relative'
  },
  eyeBtn: {
    position: 'absolute',
    right: '5px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    opacity: 0.5
  },
  loginBtn: {
    width: '100%',
    padding: '14px',
    background: '#bf00ff',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '0.5rem'
  },
  error: {
    color: '#ff4444',
    textAlign: 'center',
    fontWeight: 500,
    fontSize: '0.9rem'
  },
  dashboard: {
    minHeight: '100vh',
    backgroundColor: '#0f1419'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 2rem',
    borderBottom: '1px solid #3e3e4a',
    background: '#1e1e2e'
  },
  markingHeader: {
    background: 'linear-gradient(120deg, #1f51ff 0%, #2c3e50 100%)',
    borderRadius: '20px',
    margin: '2rem',
    padding: '2rem',
    border: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    margin: 0,
    fontSize: '1.8rem',
    color: '#f8fafc'
  },
  subtitle: {
    color: '#a0aec0',
    fontSize: '0.9rem',
    marginTop: '0.25rem'
  },
  headerActions: {
    display: 'flex',
    gap: '1rem'
  },
  logoutBtn: {
    padding: '10px 20px',
    borderRadius: '10px',
    border: '1px solid #3e3e4a',
    background: '#1e1e2e',
    color: '#f8fafc',
    fontWeight: 600,
    cursor: 'pointer'
  },
  backBtn: {
    padding: '10px 20px',
    borderRadius: '10px',
    border: '1px solid #3e3e4a',
    background: '#1e1e2e',
    color: '#f8fafc',
    fontWeight: 600,
    cursor: 'pointer'
  },
  eventGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
    padding: '2rem'
  },
  eventCard: {
    background: '#1e1e2e',
    border: '1px solid #3e3e4a',
    borderRadius: '16px',
    padding: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  eventTitle: {
    margin: '0 0 0.5rem',
    fontSize: '1.3rem',
    color: '#f8fafc'
  },
  eventInfo: {
    color: '#a0aec0',
    marginBottom: '1rem',
    fontSize: '0.9rem'
  },
  selectBtn: {
    width: '100%',
    padding: '10px',
    background: '#1f51ff',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  markingContainer: {
    padding: '2rem'
  },
  saveMessage: {
    padding: '1rem',
    borderRadius: '12px',
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontWeight: 600
  },
  success: {
    background: 'rgba(0, 255, 136, 0.1)',
    border: '1px solid #00ff88',
    color: '#00ff88'
  },
  errorMsg: {
    background: 'rgba(255, 68, 68, 0.1)',
    border: '1px solid #ff4444',
    color: '#ff4444'
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '1.2rem',
    color: '#a0aec0'
  },
  tableContainer: {
    overflowX: 'auto',
    background: '#1e1e2e',
    borderRadius: '16px',
    border: '1px solid #3e3e4a',
    marginBottom: '2rem'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    padding: '1rem',
    textAlign: 'left',
    color: '#1f51ff',
    fontWeight: 600,
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    background: 'rgba(31, 81, 255, 0.1)'
  },
  tr: {
    transition: 'background 0.2s'
  },
  td: {
    padding: '1rem',
    borderBottom: '1px solid #3e3e4a',
    color: '#f8fafc'
  },
  checkBtn: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  activeBtn: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  numberInput: {
    width: '80px',
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #3e3e4a',
    backgroundColor: '#0f1419',
    color: '#f8fafc',
    fontSize: '1rem',
    textAlign: 'center'
  },
  total: {
    fontWeight: 700,
    fontSize: '1.2rem',
    color: '#ffd300',
    textAlign: 'center'
  },
  rankSection: {
    background: '#1e1e2e',
    border: '1px solid #3e3e4a',
    borderRadius: '16px',
    padding: '1.5rem',
    marginBottom: '2rem'
  },
  rankTitle: {
    margin: '0 0 1rem',
    color: '#ffd300',
    fontSize: '1.3rem'
  },
  rankList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  rankItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    background: '#0f1419',
    borderRadius: '10px',
    border: '1px solid #3e3e4a'
  },
  rankPos: {
    fontWeight: 'bold',
    color: '#1f51ff',
    fontSize: '1.1rem',
    minWidth: '40px'
  },
  rankName: {
    flex: 1,
    color: '#f8fafc',
    marginLeft: '1rem'
  },
  rankScore: {
    fontWeight: 'bold',
    color: '#00ff88',
    fontSize: '1.1rem'
  },
  saveSection: {
    display: 'flex',
    justifyContent: 'center'
  },
  saveBtn: {
    padding: '14px 40px',
    background: '#00ff88',
    color: '#0f1419',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 700,
    fontSize: '1.1rem',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0, 255, 136, 0.3)'
  }
};

export default StaffMarkingSystem;