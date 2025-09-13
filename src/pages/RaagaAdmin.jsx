import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaUsers, FaEnvelope } from 'react-icons/fa';
import '../assets/styles/RaagaRegistration.css';

// Admin Panel Component
const RaagaAdmin = () => {
  const [registrations, setRegistrations] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  // Mock data - in real app, this would come from Google Sheets
  useEffect(() => {
    // Simulate fetching data from Google Sheets
    const mockData = [
      { id: 1, registrationId: 'SOLO-RAS-101', name: 'John Doe', department: 'CSE', selected: false },
      { id: 2, registrationId: 'GROUP-RAG-102', name: 'Team Melody', department: 'ECE', selected: true },
      { id: 3, registrationId: 'SOLO-RAS-103', name: 'Jane Smith', department: 'MECH', selected: false },
      { id: 4, registrationId: 'GROUP-RAG-104', name: 'Harmony Group', department: 'IT', selected: false },
    ];
    setRegistrations(mockData);
    setSelectedTeams(mockData.filter(team => team.selected).map(team => team.id));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple password check - in real app, use proper authentication
    if (password === 'admin123') {
      setAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const toggleSelection = (id) => {
    if (selectedTeams.includes(id)) {
      setSelectedTeams(selectedTeams.filter(teamId => teamId !== id));
    } else {
      setSelectedTeams([...selectedTeams, id]);
    }
  };

  const sendNotifications = () => {
    const selected = registrations.filter(reg => selectedTeams.includes(reg.id));
    alert(`Notifications sent to ${selected.length} selected teams!`);
    // In real app, this would trigger email and WhatsApp messages
  };

  if (!authenticated) {
    return (
      <div className="raaga-container">
        <div className="admin-login">
          <h2><FaUsers /> Admin Panel</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Login</button>
          </form>
          <Link to="/raaga-registration" className="back-btn">
            Back to Registration
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="raaga-container">
      <div className="admin-panel">
        <div className="admin-header">
          <h2><FaUsers /> Admin Panel - Team Selection</h2>
          <Link to="/raaga-registration" className="back-btn">
            Back to Registration
          </Link>
        </div>

        <div className="registrations-list">
          <h3>All Registrations</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Registration ID</th>
                  <th>Name/Team</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map(reg => (
                  <tr key={reg.id} className={selectedTeams.includes(reg.id) ? 'selected' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedTeams.includes(reg.id)}
                        onChange={() => toggleSelection(reg.id)}
                      />
                    </td>
                    <td>{reg.registrationId}</td>
                    <td>{reg.name}</td>
                    <td>{reg.department}</td>
                    <td>
                      <span className={`status ${selectedTeams.includes(reg.id) ? 'selected' : 'pending'}`}>
                        {selectedTeams.includes(reg.id) ? 'Selected' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-actions">
          <button className="action-btn" onClick={sendNotifications}>
            <FaEnvelope /> Notify Selected Teams
          </button>
          <p className="note">
            This will send emails and WhatsApp messages to all selected teams with confirmation details.
          </p>
        </div>

        <div className="whatsapp-guide">
          <h3><FaWhatsapp /> WhatsApp Integration Guide</h3>
          <ol>
            <li>Create a WhatsApp Business API account or use a service like Twilio</li>
            <li>Set up a WhatsApp template message for team selection notifications</li>
            <li>Integrate with Google Apps Script using URL fetch services</li>
            <li>Use the following format for messages:
              <pre>
  {`Congratulations! Your team has been selected for Raaga.
  Registration ID: [ID]
  Event Date: [Date]
  Time: [Time]
  Venue: [Location]`}
              </pre>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RaagaAdmin;
