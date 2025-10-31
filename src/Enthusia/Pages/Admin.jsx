import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import { CSVLink } from 'react-csv';
import 'aos/dist/aos.css';
import '../styles/Admin.css'; // The new dark-themed CSS file

// --- FULLY POPULATED MOCK DATA FOR ALL 16 EVENTS ---

const allEvents = [
  'Comic Satire', 'Solo Instrumental', 'Solo Dance', 'Solo Singing', 'Mime',
  'Imitation', 'Stand Up Comedy', 'Anchoring', 'Dual Dance', 'Group Instrumental',
  'Group Dance', 'Group Singing', 'Fashion Parade', 'Movie Depiction', 'Skit', 'Short Film'
];

const eventMetadata = {
  'Comic Satire': { date: 'Nov 10, 2025', time: '10:00 AM' },
  'Solo Instrumental': { date: 'Nov 10, 2025', time: '11:30 AM' },
  'Solo Dance': { date: 'Nov 11, 2025', time: '09:00 AM' },
  'Solo Singing': { date: 'Nov 11, 2025', time: '10:30 AM' },
  'Mime': { date: 'Nov 12, 2025', time: '01:00 PM' },
  'Imitation': { date: 'Nov 12, 2025', time: '02:30 PM' },
  'Stand Up Comedy': { date: 'Nov 13, 2025', time: '11:00 AM' },
  'Anchoring': { date: 'Nov 13, 2025', time: '12:30 PM' },
  'Dual Dance': { date: 'Nov 14, 2025', time: '09:30 AM' },
  'Group Instrumental': { date: 'Nov 14, 2025', time: '11:00 AM' },
  'Group Dance': { date: 'Nov 15, 2025', time: '10:00 AM' },
  'Group Singing': { date: 'Nov 15, 2025', time: '11:30 AM' },
  'Fashion Parade': { date: 'Nov 16, 2025', time: '03:00 PM' },
  'Movie Depiction': { date: 'Nov 16, 2025', time: '04:30 PM' },
  'Skit': { date: 'Nov 17, 2025', time: '10:00 AM' },
  'Short Film': { date: 'Nov 17, 2025', time: '01:00 PM' },
};

const eventCredentials = {
  'superadmin': { username: 'masteradmin', password: 'enthusia-super-26' },
  'Comic Satire': { username: 'admin_cs', password: 'cs-enthusia-26' },
  'Solo Instrumental': { username: 'admin_si', password: 'si-enthusia-26' },
  'Solo Dance': { username: 'admin_sd', password: 'sd-enthusia-26' },
  'Solo Singing': { username: 'admin_ss', password: 'ss-enthusia-26' },
  'Mime': { username: 'admin_mime', password: 'mm-enthusia-26' },
  'Imitation': { username: 'admin_im', password: 'im-enthusia-26' },
  'Stand Up Comedy': { username: 'admin_su', password: 'su-enthusia-26' },
  'Anchoring': { username: 'admin_an', password: 'an-enthusia-26' },
  'Dual Dance': { username: 'admin_dd', password: 'dd-enthusia-26' },
  'Group Instrumental': { username: 'admin_gi', password: 'gi-enthusia-26' },
  'Group Dance': { username: 'admin_gd', password: 'gd-enthusia-26' },
  'Group Singing': { username: 'admin_gs', password: 'gs-enthusia-26' },
  'Fashion Parade': { username: 'admin_fp', password: 'fp-enthusia-26' },
  'Movie Depiction': { username: 'admin_md', password: 'md-enthusia-26' },
  'Skit': { username: 'admin_skit', password: 'sk-enthusia-26' },
  'Short Film': { username: 'admin_sf', password: 'sf-enthusia-26' },
};

const participantData = {
  'Comic Satire': [{id: 'CS-101', contact: '9876543210'}, {id: 'CS-102', contact: '9123456789'}],
  'Solo Instrumental': [{id: 'SI-201', contact: '9988776655'}],
  'Solo Dance': [{id: 'SD-301', contact: '9010203040'}, {id: 'SD-302', contact: '9543210987'}],
  'Solo Singing': [{id: 'SS-401', contact: '9786541230'}, {id: 'SS-402', contact: '8123456789'}, {id: 'SS-403', contact: '8987654321'}],
  'Fashion Parade': [{id: 'FP-501', contact: '8090807060'}],
  // Add more sample data for other events as desired
};


const Admin = () => {
  // Login State
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Session & UI State
  const [loggedInRole, setLoggedInRole] = useState(null); // 'coordinator' or 'super'
  const [loggedInEvent, setLoggedInEvent] = useState(null);
  const [viewingEventDetails, setViewingEventDetails] = useState(null); // For superadmin drill-down
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    AOS.init({ duration: 600, once: true, easing: 'ease-out-cubic' });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const superCreds = eventCredentials['superadmin'];
    if (superCreds.username === usernameInput && superCreds.password === passwordInput) {
      setLoggedInRole('super');
      return;
    }
    const coordinatorEntry = Object.entries(eventCredentials).find(
      ([eventName, creds]) => creds.username === usernameInput
    );
    if (coordinatorEntry) {
      const [eventName, creds] = coordinatorEntry;
      if (creds.password === passwordInput) {
        setLoggedInRole('coordinator');
        setLoggedInEvent(eventName);
        return;
      }
    }
    setLoginError('Invalid username or password.');
  };

  const handleLogout = () => {
    setLoggedInRole(null);
    setLoggedInEvent(null);
    setViewingEventDetails(null);
    setUsernameInput('');
    setPasswordInput('');
    setLoginError('');
  };

  // --- LOGIN SCREEN ---
  if (!loggedInRole) {
    return (
      <div className="ADM-universe-login">
        <div className="ADM-login-card" data-aos="fade-up">
          <div className="ADM-login-header">
            <h2 className="brand-text">ENTHUSIA 2K26</h2>
            <h1 className="title-text">Management Panel</h1>
          </div>
          <form className="ADM-form" onSubmit={handleLogin}>
            <div className="ADM-form-group">
              <label>👤 Username</label>
              <input type="text" placeholder="Enter username" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} required />
            </div>
            <div className="ADM-form-group">
              <label>🔒 Password</label>
              <div className="ADM-password-wrapper">
                <input type={showPassword ? 'text' : 'password'} placeholder="Enter password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? '🙈' : '👁️'}</button>
              </div>
            </div>
            {loginError && <p className="ADM-error-message">{loginError}</p>}
            <button type="submit" className="ADM-login-button">Login</button>
          </form>
        </div>
      </div>
    );
  }

  // --- SUPER ADMIN MASTER VIEW ---
  if (loggedInRole === 'super' && !viewingEventDetails) {
    return (
      <div className="ADM-universe-dashboard">
        <header className="ADM-dashboard-header" data-aos="fade-down">
          <h1>Superadmin Dashboard</h1>
          <button onClick={handleLogout} className="ADM-logout-button">Logout</button>
        </header>
        <main className="ADM-event-card-grid">
          {allEvents.map((event, index) => {
            const count = participantData[event]?.length || 0;
            return (
              <div key={event} className="ADM-event-card" data-aos="fade-up" data-aos-delay={index * 50}>
                <h3>{event}</h3>
                <p className="ADM-event-date">🕒 {eventMetadata[event]?.date || 'TBD'}</p>
                <div className="ADM-event-stats">
                  <span>{count}</span> Participants
                </div>
                <button onClick={() => setViewingEventDetails(event)} className="ADM-view-button">View Details</button>
              </div>
            );
          })}
        </main>
         <footer className="ADM-footer">
          <p>For technical assistance, contact Sakthivel at <a href="tel:8925490989">8925490989</a>.</p>
        </footer>
      </div>
    );
  }

  // --- PARTICIPANT DETAIL VIEW (FOR BOTH ROLES) ---
  const eventToShow = loggedInRole === 'super' ? viewingEventDetails : loggedInEvent;
  const currentEventData = participantData[eventToShow] || [];
  const filteredData = currentEventData.filter(p =>
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) || p.contact.includes(searchQuery)
  );
  const csvData = filteredData.map((p, index) => ({ serial: index + 1, id: p.id, contact: p.contact }));
  
  return (
    <div className="ADM-universe-dashboard">
       <header className="ADM-dashboard-header detail-view" data-aos="fade-down">
          <div className="ADM-header-left">
            <h1>{eventToShow}</h1>
            <div className="ADM-info-pills">
              <span>🗓️ {eventMetadata[eventToShow]?.date || 'TBD'}</span>
              <span>🕒 {eventMetadata[eventToShow]?.time || 'TBD'}</span>
              <span>👥 {currentEventData.length} Registered</span>
            </div>
          </div>
          <div className="ADM-header-right">
             <CSVLink data={csvData} headers={[{ label: "Serial No.", key: "serial" }, { label: "Participant ID", key: "id" }, { label: "Contact Number", key: "contact" }]} filename={`${eventToShow}_participants.csv`} className="ADM-export-button">
              📥 Export CSV
             </CSVLink>
             {loggedInRole === 'super' && (
              <button onClick={() => setViewingEventDetails(null)} className="ADM-back-button">← Back</button>
             )}
            <button onClick={handleLogout} className="ADM-logout-button">Logout</button>
          </div>
        </header>
        <main className="ADM-dashboard-main" data-aos="fade-up" data-aos-delay="100">
            <div className="ADM-search-bar">
              <span>🔍</span>
              <input type="text" placeholder="Search by ID or contact number..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="ADM-stats-grid">
               <div className="ADM-stat-card"><span>👥</span><div><span className="ADM-stat-value">{currentEventData.length}</span><span className="ADM-stat-label">Total Participants</span></div></div>
               
            </div>
            <div className="ADM-table-container">
               <table className="ADM-participant-table">
                  <thead><tr><th>#</th><th>Participant ID</th><th>Contact Number</th></tr></thead>
                  <tbody>{filteredData.length > 0 ? (filteredData.map((p, index) => (<tr key={p.id}><td>{index + 1}</td><td>{p.id}</td><td><a href={`tel:${p.contact}`}>{p.contact}</a></td></tr>))) : (<tr><td colSpan="3">No participants found.</td></tr>)}</tbody>
               </table>
            </div>
         </main>
         <footer className="ADM-footer">
          <p>For technical assistance, contact Sakthivel at <a href="tel:8925490989">8925490989</a>.</p>
        </footer>
    </div>
  );
};

export default Admin;