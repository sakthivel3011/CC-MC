import React, { useState, useEffect } from 'react';

// Event configurations
const eventCodes = {
  'Comic Satire': 'CS', 'Solo Instrumental': 'SI', 'Group Instrumental': 'GI',
  'Solo Dance': 'SD', 'Dual Dance': 'DD', 'Group Dance': 'GD',
  'Solo Singing': 'SS', 'Group Singing': 'GS', 'Mime': 'ME',
  'Imitation': 'IP', 'Fashion Parade': 'FP', 'Movie Depiction': 'MD',
  'Skit': 'SK', 'Short Film': 'SF', 'Stand Up Comedy': 'SC', 'Anchoring': 'AC',
};

const allEvents = Object.keys(eventCodes);

const eventCredentials = {
  'superadmin': { username: 'admin', password: '123' },
  'Comic Satire': { username: 'cs', password: '26' },
  'Solo Instrumental': { username: 'admin_si', password: 'si-enthusia-26' },
  'Group Instrumental': { username: 'admin_gi', password: 'gi-enthusia-26' },
  'Solo Dance': { username: 'admin_sd', password: 'sd-enthusia-26' },
  'Dual Dance': { username: 'admin_dd', password: 'dd-enthusia-26' },
  'Group Dance': { username: 'admin_gd', password: 'gd-enthusia-26' },
  'Solo Singing': { username: 'admin_ss', password: 'ss-enthusia-26' },
  'Group Singing': { username: 'admin_gs', password: 'gs-enthusia-26' },
  'Mime': { username: 'admin_mime', password: 'mm-enthusia-26' },
  'Imitation': { username: 'admin_im', password: 'im-enthusia-26' },
  'Fashion Parade': { username: 'admin_fp', password: 'fp-enthusia-26' },
  'Movie Depiction': { username: 'admin_md', password: 'md-enthusia-26' },
  'Skit': { username: 'admin_skit', password: 'sk-enthusia-26' },
  'Short Film': { username: 'admin_sf', password: 'sf-enthusia-26' },
  'Stand Up Comedy': { username: 'admin_su', password: 'su-enthusia-26' },
  'Anchoring': { username: 'admin_an', password: 'an-enthusia-26' },
};

const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxTl19szWqbw1XigG8RS-N6EGTsJbIoVDBbTNU0jYeXmSL4aKYTwCtYydzRCou4Acm_/exec';

export default function AttendanceAdmin() {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loggedInRole, setLoggedInRole] = useState(null);
  const [loggedInEvent, setLoggedInEvent] = useState(null);
  const [viewingEvent, setViewingEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState(null);
  const [formData, setFormData] = useState({ id: '', name: '', rollNo: '' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const currentEvent = loggedInRole === 'super' ? viewingEvent : loggedInEvent;
    if (currentEvent) loadEventData(currentEvent);
  }, [viewingEvent, loggedInEvent, loggedInRole]);

  const loadEventData = async (eventName) => {
    setLoading(true);
    try {
      const response = await fetch(`${GOOGLE_SHEETS_URL}?action=getEventData&event=${encodeURIComponent(eventName)}`);
      const data = await response.json();
      if (data.success) {
        setParticipants(data.participants || []);
        setAttendanceRecords(data.attendance || []);
      }
    } catch (error) {
      showMessage('Failed to load data', 'error');
    }
    setLoading(false);
  };

  const saveToGoogleSheets = async (action, data) => {
    setLoading(true);
    try {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action, ...data })
      });
      
      const result = await response.json();
      
      if (result.success) {
        showMessage(result.message || 'Saved successfully!', 'success');
        const currentEvent = loggedInRole === 'super' ? viewingEvent : loggedInEvent;
        await loadEventData(currentEvent);
        return true;
      } else {
        showMessage(result.message || 'Failed to save', 'error');
        return false;
      }
    } catch (error) {
      console.error('Save error:', error);
      showMessage('Failed to save: ' + error.message, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const superCreds = eventCredentials['superadmin'];
    if (superCreds.username === usernameInput && superCreds.password === passwordInput) {
      setLoggedInRole('super');
      return;
    }
    const coordinatorEntry = Object.entries(eventCredentials).find(
      ([, creds]) => creds.username === usernameInput
    );
    if (coordinatorEntry) {
      const [eventName, creds] = coordinatorEntry;
      if (creds.password === passwordInput) {
        setLoggedInRole('coordinator');
        setLoggedInEvent(eventName);
        return;
      }
    }
    setLoginError('Invalid credentials');
  };

  const handleLogout = () => {
    setLoggedInRole(null);
    setLoggedInEvent(null);
    setViewingEvent(null);
    setParticipants([]);
    setAttendanceRecords([]);
    setUsernameInput('');
    setPasswordInput('');
  };

  const handleAddParticipant = async () => {
    const currentEvent = loggedInRole === 'super' ? viewingEvent : loggedInEvent;
    const eventCode = eventCodes[currentEvent];
    if (!formData.name || !formData.rollNo) {
      showMessage('Fill all fields', 'error');
      return;
    }
    const duplicate = participants.find(p => p.rollNo === formData.rollNo && p.id !== formData.id);
    if (duplicate) {
      showMessage('Roll number exists!', 'error');
      return;
    }
    const participantData = {
      id: editingParticipant ? editingParticipant.id : `${eventCode}-${Date.now()}`,
      name: formData.name,
      rollNo: formData.rollNo,
      event: currentEvent
    };
    const action = editingParticipant ? 'updateParticipant' : 'addParticipant';
    const success = await saveToGoogleSheets(action, participantData);
    if (success) {
      setShowAddForm(false);
      setEditingParticipant(null);
      setFormData({ id: '', name: '', rollNo: '' });
    }
  };

  const handleEditParticipant = (participant) => {
    setEditingParticipant(participant);
    setFormData({ id: participant.id, name: participant.name, rollNo: participant.rollNo });
    setShowAddForm(true);
  };

  const handleDeleteParticipant = async (participantId) => {
    if (!window.confirm('Delete this participant?')) return;
    const currentEvent = loggedInRole === 'super' ? viewingEvent : loggedInEvent;
    await saveToGoogleSheets('deleteParticipant', { id: participantId, event: currentEvent });
  };

  const markAttendance = async (participant) => {
    const currentEvent = loggedInRole === 'super' ? viewingEvent : loggedInEvent;
    const now = new Date();
    const attendanceData = {
      participantId: participant.id,
      name: participant.name,
      rollNo: participant.rollNo,
      event: currentEvent,
      timestamp: now.toISOString(),
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString()
    };
    await saveToGoogleSheets('markAttendance', attendanceData);
  };

  const isPresent = (participantId) => {
    const today = new Date().toLocaleDateString();
    return attendanceRecords.some(r => r.participantId === participantId && r.date === today);
  };

  const filteredParticipants = participants.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Poppins', sans-serif; }
    .AD-universe-login { min-height: 100vh; display: flex; align-items: center; justify-content: center; 
      background: linear-gradient(135deg, #0f1419 0%, #1e1e2e 100%); padding: 1rem; }
    .AD-login-card { width: 100%; max-width: 420px; background: #1e1e2e; border-radius: 20px; 
      padding: 2.5rem; box-shadow: 0 10px 40px rgba(0,0,0,0.3); border: 1px solid #3e3e4a; }
    .AD-login-header { text-align: center; margin-bottom: 2rem; }
    .AD-brand-text { color: #bf00ff; font-size: 1rem; text-transform: uppercase; letter-spacing: 2px; }
    .AD-title-text { color: #ffd300; font-size: 2.2rem; font-family: 'Playfair Display', serif; margin-top: 0.5rem; }
    .AD-form-group { margin-bottom: 1.25rem; }
    .AD-form-group label { display: block; color: #a0aec0; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; }
    .AD-form-group input { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1px solid #3e3e4a; 
      background: #0f1419; color: #f8fafc; font-size: 1rem; transition: all 0.2s; }
    .AD-form-group input:focus { outline: none; border-color: #bf00ff; box-shadow: 0 0 0 3px rgba(191,0,255,0.2); }
    .AD-password-wrapper { position: relative; }
    .AD-password-wrapper button { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); 
      background: none; border: none; cursor: pointer; font-size: 1.2rem; opacity: 0.5; }
    .AD-login-button { width: 100%; padding: 14px; background: #bf00ff; color: white; border: none; 
      border-radius: 12px; font-weight: 600; font-size: 1rem; cursor: pointer; margin-top: 1rem; transition: all 0.2s; }
    .AD-login-button:hover { background: #a300db; transform: translateY(-2px); }
    .AD-error-message { color: #f87171; text-align: center; font-weight: 500; margin-top: 1rem; }
    .AD-universe-dashboard { background: #0f1419; min-height: 100vh; color: #f8fafc; }
    .AD-message { position: fixed; top: 20px; right: 20px; padding: 1rem 1.5rem; border-radius: 12px; 
      z-index: 9999; font-weight: 600; animation: slideIn 0.3s; }
    .AD-message-success { background: #10b981; color: white; }
    .AD-message-error { background: #ef4444; color: white; }
    @keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    .AD-dashboard-header { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 2rem; 
      border-bottom: 1px solid #3e3e4a; flex-wrap: wrap; gap: 1rem; }
    .AD-dashboard-header h1 { font-size: 1.8rem; }
    .AD-detail-header { background: linear-gradient(120deg, #1f51ff 0%, #2c3e50 100%); border-radius: 20px; 
      margin: 2rem; padding: 2rem; }
    .AD-header-left { flex: 1; }
    .AD-header-right { display: flex; gap: 1rem; flex-wrap: wrap; }
    .AD-info-pills { display: flex; gap: 0.75rem; margin-top: 0.75rem; flex-wrap: wrap; }
    .AD-info-pills span { background: rgba(255,255,255,0.1); backdrop-filter: blur(5px); padding: 6px 12px; 
      border-radius: 20px; font-size: 0.85rem; font-weight: 500; }
    .AD-logout-button, .AD-back-button { padding: 10px 20px; border-radius: 10px; background: #1e1e2e; 
      color: #f8fafc; border: 1px solid #3e3e4a; font-weight: 600; cursor: pointer; transition: all 0.2s; }
    .AD-logout-button:hover, .AD-back-button:hover { transform: translateY(-2px); background: #2a2a3a; }
    .AD-event-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; padding: 2rem; }
    .AD-event-card { background: #1e1e2e; border: 1px solid #3e3e4a; border-radius: 16px; padding: 2rem; 
      cursor: pointer; transition: all 0.3s; text-align: center; }
    .AD-event-card:hover { transform: translateY(-5px); border-color: #1f51ff; box-shadow: 0 10px 30px rgba(31,81,255,0.3); }
    .AD-event-icon { font-size: 2.5rem; font-weight: 700; color: #ffd300; margin-bottom: 1rem; }
    .AD-event-card h3 { font-size: 1.2rem; margin-bottom: 0.5rem; }
    .AD-event-code { color: #a0aec0; font-size: 0.9rem; }
    .AD-dashboard-main { padding: 2rem; }
    .AD-controls-bar { display: flex; justify-content: space-between; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
    .AD-search-bar { display: flex; align-items: center; gap: 0.75rem; padding: 12px 16px; 
      border: 1px solid #3e3e4a; border-radius: 12px; background: #1e1e2e; flex: 1; min-width: 250px; }
    .AD-search-bar input { flex: 1; border: none; background: none; outline: none; color: #f8fafc; font-size: 1rem; }
    .AD-add-button { padding: 12px 24px; background: #bf00ff; color: white; border: none; border-radius: 12px; 
      font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
    .AD-add-button:hover { background: #a300db; transform: translateY(-2px); }
    .AD-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: flex; 
      align-items: center; justify-content: center; z-index: 1000; padding: 1rem; }
    .AD-modal { background: #1e1e2e; border-radius: 20px; padding: 2rem; max-width: 500px; width: 100%; 
      border: 1px solid #3e3e4a; }
    .AD-modal h2 { margin-bottom: 1.5rem; color: #ffd300; }
    .AD-modal-actions { display: flex; gap: 1rem; margin-top: 1.5rem; }
    .AD-cancel-button { flex: 1; padding: 12px; background: #3e3e4a; color: #f8fafc; border: none; 
      border-radius: 12px; font-weight: 600; cursor: pointer; }
    .AD-save-button { flex: 1; padding: 12px; background: #10b981; color: white; border: none; 
      border-radius: 12px; font-weight: 600; cursor: pointer; }
    .AD-save-button:disabled { opacity: 0.5; cursor: not-allowed; }
    .AD-table-container { overflow-x: auto; margin-bottom: 2rem; }
    .AD-participant-table { width: 100%; border-collapse: collapse; background: #1e1e2e; border-radius: 12px; 
      overflow: hidden; }
    .AD-participant-table th, .AD-participant-table td { padding: 1rem; text-align: left; 
      border-bottom: 1px solid #3e3e4a; }
    .AD-participant-table th { background: #0f1419; color: #a0aec0; font-size: 0.8rem; 
      text-transform: uppercase; font-weight: 600; }
    .AD-participant-table tr:last-child td { border-bottom: none; }
    .AD-present-row { background: rgba(16,185,129,0.1); }
    .AD-status-badge { padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; }
    .AD-present { background: rgba(16,185,129,0.2); color: #10b981; }
    .AD-absent { background: rgba(239,68,68,0.2); color: #ef4444; }
    .AD-action-buttons { display: flex; gap: 0.5rem; }
    .AD-mark-button, .AD-edit-button, .AD-delete-button { padding: 6px 12px; border: none; 
      border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.2s; }
    .AD-mark-button { background: #10b981; color: white; }
    .AD-edit-button { background: #3b82f6; color: white; }
    .AD-delete-button { background: #ef4444; color: white; }
    .AD-empty-state { text-align: center; padding: 3rem; color: #a0aec0; }
    .AD-attendance-summary { background: #1e1e2e; border-radius: 16px; padding: 2rem; border: 1px solid #3e3e4a; }
    .AD-attendance-summary h3 { margin-bottom: 1.5rem; }
    .AD-summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; }
    .AD-summary-card { background: #0f1419; padding: 1.5rem; border-radius: 12px; text-align: center; }
    .AD-present-card { border-left: 4px solid #10b981; }
    .AD-absent-card { border-left: 4px solid #ef4444; }
    .AD-summary-value { display: block; font-size: 2.5rem; font-weight: 700; color: #ffd300; }
    .AD-summary-label { display: block; color: #a0aec0; font-size: 0.9rem; margin-top: 0.5rem; }
    .AD-footer { text-align: center; padding: 2rem; color: #a0aec0; font-size: 0.9rem; }
    .AD-footer a { color: #f8fafc; font-weight: 600; text-decoration: none; }
    @media (max-width: 768px) {
      .AD-dashboard-header { flex-direction: column; align-items: flex-start; }
      .AD-controls-bar { flex-direction: column; }
      .AD-summary-grid { grid-template-columns: 1fr; }
    }
  `;

  if (!loggedInRole) {
    return (
      <>
        <style>{styles}</style>
        <div className="AD-universe-login">
          <div className="AD-login-card">
            <div className="AD-login-header">
              <h2 className="AD-brand-text">ENTHUSIA 2K26</h2>
              <h1 className="AD-title-text">Attendance Panel</h1>
            </div>
            <div className="AD-form-group">
              <label>👤 Username</label>
              <input type="text" placeholder="Enter username" value={usernameInput} 
                onChange={(e) => setUsernameInput(e.target.value)} />
            </div>
            <div className="AD-form-group">
              <label>🔒 Password</label>
              <div className="AD-password-wrapper">
                <input type={showPassword ? 'text' : 'password'} placeholder="Enter password" 
                  value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
                <button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            {loginError && <p className="AD-error-message">{loginError}</p>}
            <button className="AD-login-button" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </>
    );
  }

  if (loggedInRole === 'super' && !viewingEvent) {
    return (
      <>
        <style>{styles}</style>
        <div className="AD-universe-dashboard">
          <header className="AD-dashboard-header">
            <h1>🎯 Select Event</h1>
            <button onClick={handleLogout} className="AD-logout-button">Logout</button>
          </header>
          <main className="AD-event-grid">
            {allEvents.map(event => (
              <div key={event} className="AD-event-card" onClick={() => setViewingEvent(event)}>
                <div className="AD-event-icon">{eventCodes[event]}</div>
                <h3>{event}</h3>
                <p className="AD-event-code">Code: {eventCodes[event]}</p>
              </div>
            ))}
          </main>
        </div>
      </>
    );
  }

  const currentEvent = loggedInRole === 'super' ? viewingEvent : loggedInEvent;
  const todayPresent = attendanceRecords.filter(r => r.date === new Date().toLocaleDateString()).length;

  return (
    <>
      <style>{styles}</style>
      <div className="AD-universe-dashboard">
        {message && <div className={`AD-message AD-message-${message.type}`}>{message.text}</div>}
        
        <header className="AD-dashboard-header AD-detail-header">
          <div className="AD-header-left">
            <h1>📋 {currentEvent}</h1>
            <div className="AD-info-pills">
              <span>🎫 {eventCodes[currentEvent]}</span>
              <span>👥 {participants.length} Registered</span>
              <span>✅ {todayPresent} Present Today</span>
            </div>
          </div>
          <div className="AD-header-right">
            {loggedInRole === 'super' && (
              <button onClick={() => setViewingEvent(null)} className="AD-back-button">← Back</button>
            )}
            <button onClick={handleLogout} className="AD-logout-button">Logout</button>
          </div>
        </header>

        <main className="AD-dashboard-main">
          <div className="AD-controls-bar">
            <div className="AD-search-bar">
              <span>🔍</span>
              <input type="text" placeholder="Search by name, roll no, or ID..." 
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <button className="AD-add-button" onClick={() => {
              setShowAddForm(true);
              setEditingParticipant(null);
              setFormData({ id: '', name: '', rollNo: '' });
            }}>
              ➕ Add Participant
            </button>
          </div>

          {showAddForm && (
            <div className="AD-modal-overlay" onClick={() => setShowAddForm(false)}>
              <div className="AD-modal" onClick={(e) => e.stopPropagation()}>
                <h2>{editingParticipant ? 'Edit Participant' : 'Add New Participant'}</h2>
                <div className="AD-form-group">
                  <label>Name</label>
                  <input type="text" value={formData.name} placeholder="Enter full name"
                    onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="AD-form-group">
                  <label>Roll Number</label>
                  <input type="text" value={formData.rollNo} placeholder="Enter roll number"
                    onChange={(e) => setFormData({...formData, rollNo: e.target.value})} />
                </div>
                <div className="AD-modal-actions">
                  <button className="AD-cancel-button" onClick={() => setShowAddForm(false)}>Cancel</button>
                  <button className="AD-save-button" onClick={handleAddParticipant} disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="AD-table-container">
            <table className="AD-participant-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Participant ID</th>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.length > 0 ? (
                  filteredParticipants.map((p, i) => {
                    const present = isPresent(p.id);
                    return (
                      <tr key={p.id} className={present ? 'AD-present-row' : ''}>
                        <td>{i + 1}</td>
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td>{p.rollNo}</td>
                        <td>
                          {present ? (
                            <span className="AD-status-badge AD-present">✅ Present</span>
                          ) : (
                            <span className="AD-status-badge AD-absent">⭕ Absent</span>
                          )}
                        </td>
                        <td>
                          <div className="AD-action-buttons">
                            {!present && (
                              <button className="AD-mark-button" onClick={() => markAttendance(p)} 
                                disabled={loading}>✓ Mark</button>
                            )}
                            <button className="AD-edit-button" onClick={() => handleEditParticipant(p)}>✏️</button>
                            <button className="AD-delete-button" onClick={() => handleDeleteParticipant(p.id)}>🗑️</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr><td colSpan="6" className="AD-empty-state">No participants found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="AD-attendance-summary">
            <h3>📊 Today's Attendance Summary</h3>
            <div className="AD-summary-grid">
              <div className="AD-summary-card">
                <span className="AD-summary-value">{participants.length}</span>
                <span className="AD-summary-label">Total</span>
              </div>
              <div className="AD-summary-card AD-present-card">
                <span className="AD-summary-value">{todayPresent}</span>
                <span className="AD-summary-label">Present</span>
              </div>
              <div className="AD-summary-card AD-absent-card">
                <span className="AD-summary-value">{participants.length - todayPresent}</span>
                <span className="AD-summary-label">Absent</span>
              </div>
            </div>
          </div>
        </main>

        <footer className="AD-footer">
          <p>For technical assistance, contact Sakthivel at <a href="tel:8925490989">8925490989</a>.</p>
        </footer>
      </div>
    </>
  );
}
