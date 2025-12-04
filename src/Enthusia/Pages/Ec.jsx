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
  'superadmin': { username: 'admin', password: 'admin123', email: 'sakthivel.23aid@kongu.edu' },
  'Comic Satire': { username: 'cs', password: '26', email: 'sakthix11@gmail.com' },
  'Solo Instrumental': { username: 'admin_si', password: 'si-enthusia-26', email: 'si@enthusia.com' },
  'Group Instrumental': { username: 'admin_gi', password: 'gi-enthusia-26', email: 'gi@enthusia.com' },
  'Solo Dance': { username: 'admin_sd', password: 'sd-enthusia-26', email: 'sd@enthusia.com' },
  'Dual Dance': { username: 'admin_dd', password: 'dd-enthusia-26', email: 'dd@enthusia.com' },
  'Group Dance': { username: 'admin_gd', password: 'gd-enthusia-26', email: 'gd@enthusia.com' },
  'Solo Singing': { username: 'admin_ss', password: 'ss-enthusia-26', email: 'ss@enthusia.com' },
  'Group Singing': { username: 'admin_gs', password: 'gs-enthusia-26', email: 'gs@enthusia.com' },
  'Mime': { username: 'admin_mime', password: 'mm-enthusia-26', email: 'mime@enthusia.com' },
  'Imitation': { username: 'admin_im', password: 'im-enthusia-26', email: 'im@enthusia.com' },
  'Fashion Parade': { username: 'admin_fp', password: 'fp-enthusia-26', email: 'fp@enthusia.com' },
  'Movie Depiction': { username: 'admin_md', password: 'md-enthusia-26', email: 'md@enthusia.com' },
  'Skit': { username: 'admin_skit', password: 'sk-enthusia-26', email: 'skit@enthusia.com' },
  'Short Film': { username: 'admin_sf', password: 'sf-enthusia-26', email: 'sf@enthusia.com' },
  'Stand Up Comedy': { username: 'admin_su', password: 'su-enthusia-26', email: 'su@enthusia.com' },
  'Anchoring': { username: 'admin_an', password: 'an-enthusia-26', email: 'an@enthusia.com' },
};

const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwbpXA8_aVhKk_uRVYb8SZUSv4CR1GlFdCgBZaRMNyGvNlYT8WmJJP6HDa6Q693p6TT/exec';

export default function AttendanceAdmin() {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loggedInRole, setLoggedInRole] = useState(null);
  const [loggedInEvent, setLoggedInEvent] = useState(null);
  const [loggedInEmail, setLoggedInEmail] = useState('');
  const [viewingEvent, setViewingEvent] = useState(null);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [formData, setFormData] = useState({ teamId: '', participants: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    const currentEvent = loggedInRole === 'super' ? viewingEvent : loggedInEvent;
    if (currentEvent) loadEventData(currentEvent);
  }, [viewingEvent, loggedInEvent, loggedInRole]);

  const loadEventData = async (eventName) => {
    setLoading(true);
    try {
      const response = await fetch(`${GOOGLE_SHEETS_URL}?action=getTeams&event=${encodeURIComponent(eventName)}`);
      const data = await response.json();
      if (data.success) {
        setTeams(data.teams || []);
      } else {
        showMessage('Failed to load data', 'error');
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
      setLoggedInEmail(superCreds.email);
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
        setLoggedInEmail(creds.email);
        return;
      }
    }
    setLoginError('Invalid credentials');
  };

  const handleLogout = () => {
    setLoggedInRole(null);
    setLoggedInEvent(null);
    setLoggedInEmail('');
    setViewingEvent(null);
    setTeams([]);
    setUsernameInput('');
    setPasswordInput('');
  };

  const handleAddTeam = async () => {
    const currentEvent = loggedInRole === 'super' ? viewingEvent : loggedInEvent;
    const eventCode = eventCodes[currentEvent];
    
    if (!formData.teamId || !formData.participants) {
      showMessage('Fill all fields', 'error');
      return;
    }
    
    const duplicate = teams.find(t => t.teamId === formData.teamId && (!editingTeam || t.teamId !== editingTeam.teamId));
    if (duplicate) {
      showMessage('Team ID already exists!', 'error');
      return;
    }
    
    const teamData = {
      teamId: formData.teamId,
      participants: formData.participants,
      event: currentEvent,
      attendance: editingTeam ? editingTeam.attendance : 'No'
    };
    
    const action = editingTeam ? 'updateTeam' : 'addTeam';
    const success = await saveToGoogleSheets(action, teamData);
    
    if (success) {
      setShowAddForm(false);
      setEditingTeam(null);
      setFormData({ teamId: '', participants: '' });
    }
  };

  const handleEditTeam = (team) => {
    setEditingTeam(team);
    setFormData({ teamId: team.teamId, participants: team.participants });
    setShowAddForm(true);
  };

  const markAttendance = async (team, status) => {
    const currentEvent = loggedInRole === 'super' ? viewingEvent : loggedInEvent;
    await saveToGoogleSheets('markAttendance', {
      teamId: team.teamId,
      event: currentEvent,
      attendance: status
    });
  };

  const downloadCSV = () => {
    const currentEvent = loggedInRole === 'super' ? viewingEvent : loggedInEvent;
    const csvContent = [
      ['Team ID', 'All Participants', 'Attendance'],
      ...teams.map(t => [t.teamId, t.participants, t.attendance])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentEvent}_Attendance_${new Date().toLocaleDateString()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    showMessage('CSV downloaded!', 'success');
  };

  const sendEmailNotification = async () => {
    setSendingEmail(true);
    const currentEvent = loggedInRole === 'super' ? viewingEvent : loggedInEvent;
    
    try {
      const response = await saveToGoogleSheets('sendEmail', {
        event: currentEvent,
        teams: teams,
        senderEmail: loggedInEmail
      });
      
      if (response) {
        showMessage('Email sent to all coordinators!', 'success');
      }
    } catch (error) {
      showMessage('Failed to send email', 'error');
    }
    setSendingEmail(false);
  };

  const filteredTeams = teams.filter(t =>
    t.teamId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.participants.toLowerCase().includes(searchQuery.toLowerCase())
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
    .AD-form-group input, .AD-form-group textarea { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1px solid #3e3e4a; 
      background: #0f1419; color: #f8fafc; font-size: 1rem; transition: all 0.2s; font-family: 'Poppins', sans-serif; }
    .AD-form-group textarea { min-height: 120px; resize: vertical; }
    .AD-form-group input:focus, .AD-form-group textarea:focus { outline: none; border-color: #bf00ff; box-shadow: 0 0 0 3px rgba(191,0,255,0.2); }
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
    .AD-dashboard-header h1 { font-size: 1.8rem; margin-top: 50px; }
    .AD-detail-header { background: linear-gradient(120deg, #1f51ff 0%, #2c3e50 100%); border-radius: 20px; 
      margin: 2rem; padding: 2rem; margin-top: 1px;}
    .AD-header-left { flex: 1; }
    .AD-header-right { display: flex; gap: 1rem; flex-wrap: wrap; }
    .AD-info-pills { display: flex; gap: 0.75rem; margin-top: 0.75rem; flex-wrap: wrap; }
    .AD-info-pills span { background: rgba(255,255,255,0.1); backdrop-filter: blur(5px); padding: 6px 12px; 
      border-radius: 20px; font-size: 0.85rem; font-weight: 500; }
    .AD-logout-button, .AD-back-button, .AD-csv-button, .AD-email-button { padding: 10px 20px; border-radius: 10px; background: #1e1e2e; 
      color: #f8fafc; border: 1px solid #3e3e4a; font-weight: 600; cursor: pointer; transition: all 0.2s; }
    .AD-csv-button { background: #10b981; border-color: #10b981; }
    .AD-email-button { background: #3b82f6; border-color: #3b82f6; }
    .AD-logout-button:hover, .AD-back-button:hover, .AD-csv-button:hover, .AD-email-button:hover { 
      transform: translateY(-2px); opacity: 0.9; }
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
    .AD-participants-cell { max-width: 400px; white-space: normal; line-height: 1.6; }
    .AD-action-buttons { display: flex; gap: 0.5rem; }
    .AD-mark-button, .AD-edit-button { padding: 6px 12px; border: none; 
      border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.2s; }
    .AD-mark-button { background: #10b981; color: white; }
    .AD-mark-button.absent { background: #ef4444; }
    .AD-edit-button { background: #3b82f6; color: white; }
    .AD-empty-state { text-align: center; padding: 3rem; color: #a0aec0; }
    .AD-loading { text-align: center; padding: 3rem; color: #a0aec0; }
    .AD-spinner { display: inline-block; width: 40px; height: 40px; border: 4px solid #3e3e4a; 
      border-top-color: #bf00ff; border-radius: 50%; animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .AD-footer { text-align: center; padding: 2rem; color: #a0aec0; font-size: 0.9rem; }
    .AD-footer a { color: #f8fafc; font-weight: 600; text-decoration: none; }
    @media (max-width: 768px) {
      .AD-dashboard-header { flex-direction: column; align-items: flex-start; }
      .AD-controls-bar { flex-direction: column; }
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
              <h1 className="AD-title-text">Team Attendance</h1>
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
            <h1>Select Event</h1>
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
  const presentCount = teams.filter(t => t.attendance === 'Yes').length;

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
              <span>👥 {teams.length} Teams</span>
              <span>✅ {presentCount} Present</span>
            </div>
          </div>
          <div className="AD-header-right">
            {loggedInRole === 'super' && (
              <>
                <button onClick={downloadCSV} className="AD-csv-button" disabled={teams.length === 0}>
                  📥 Download CSV
                </button>
                <button onClick={sendEmailNotification} className="AD-email-button" disabled={sendingEmail || teams.length === 0}>
                  {sendingEmail ? '📤 Sending...' : '📧 Send Email'}
                </button>
                <button onClick={() => setViewingEvent(null)} className="AD-back-button">← Back</button>
              </>
            )}
            <button onClick={handleLogout} className="AD-logout-button">Logout</button>
          </div>
        </header>

        <main className="AD-dashboard-main">
          <div className="AD-controls-bar">
            <div className="AD-search-bar">
              <span>🔍</span>
              <input type="text" placeholder="Search by Team ID or participants..." 
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            {loggedInRole === 'super' && (
              <button className="AD-add-button" onClick={() => {
                setShowAddForm(true);
                setEditingTeam(null);
                setFormData({ teamId: '', participants: '' });
              }}>
                ➕ Add Team
              </button>
            )}
          </div>

          {showAddForm && (
            <div className="AD-modal-overlay" onClick={() => setShowAddForm(false)}>
              <div className="AD-modal" onClick={(e) => e.stopPropagation()}>
                <h2>{editingTeam ? 'Edit Team' : 'Add New Team'}</h2>
                <div className="AD-form-group">
                  <label>Team ID</label>
                  <input type="text" value={formData.teamId} placeholder="Enter Team ID"
                    onChange={(e) => setFormData({...formData, teamId: e.target.value})} />
                </div>
                <div className="AD-form-group">
                  <label>All Participants</label>
                  <textarea value={formData.participants} 
                    placeholder="Example: sakthivel (23ADR145) - Team Leader | vishal (23ADR198) - Sub Leader | ruban (23ADR144) - Member"
                    onChange={(e) => setFormData({...formData, participants: e.target.value})} />
                </div>
                <div className="AD-modal-actions">
                  <button className="AD-cancel-button" onClick={() => setShowAddForm(false)}>Cancel</button>
                  <button className="AD-save-button" onClick={handleAddTeam} disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div className="AD-loading">
              <div className="AD-spinner"></div>
              <p style={{marginTop: '1rem'}}>Loading data...</p>
            </div>
          )}

          {!loading && (
            <div className="AD-table-container">
              <table className="AD-participant-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Team ID</th>
                    <th>All Participants</th>
                    <th>Attendance</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeams.length > 0 ? (
                    filteredTeams.map((team, i) => (
                      <tr key={team.teamId} className={team.attendance === 'Yes' ? 'AD-present-row' : ''}>
                        <td>{i + 1}</td>
                        <td>{team.teamId}</td>
                        <td className="AD-participants-cell">{team.participants}</td>
                        <td>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            background: team.attendance === 'Yes' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
                            color: team.attendance === 'Yes' ? '#10b981' : '#ef4444'
                          }}>
                            {team.attendance === 'Yes' ? '🟢 Present' : '🔴 Absent'}
                          </span>
                        </td>
                        <td>
                          <div className="AD-action-buttons">
                            <button 
                              className={`AD-mark-button ${team.attendance === 'Yes' ? 'absent' : ''}`}
                              onClick={() => markAttendance(team, team.attendance === 'Yes' ? 'No' : 'Yes')} 
                              disabled={loading}>
                              {team.attendance === 'Yes' ? '❌ Mark Absent' : '✅ Mark Present'}
                            </button>
                            {loggedInRole === 'super' && (
                              <button className="AD-edit-button" onClick={() => handleEditTeam(team)}>📝 Edit</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5" className="AD-empty-state">No teams found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>

        <footer className="AD-footer">
          <p>For technical assistance, contact Sakthivel at <a href="tel:8925490989">8925490989</a>.</p>
        </footer>
      </div>
    </>
  );
}