import React, { useState, useEffect } from 'react';
import { Search, Edit2, Save, X, Calendar, Users, Mail, Phone, User, Hash, BookOpen, Download, LogOut } from 'lucide-react';
import './checking.css';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyzwyQ57oCytElhz6ll3yMWyHi0qrqDJTMjtgNA-wH_YKJT0VWdfpi52SXqvQwn5GGR/exec';
const PASSWORD = '2K26';

export default function AdminCheckingSystem() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);
  const [filterDate, setFilterDate] = useState('all');
  const [filterGender, setFilterGender] = useState('all');

  // Login Handler
  const handleLogin = () => {
    if (passwordInput === PASSWORD) {
      setIsAuthenticated(true);
      setPasswordInput('');
      fetchRegistrations();
    } else {
      alert('❌ Invalid Password!');
      setPasswordInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  // Fetch all registrations
  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SCRIPT_URL}?action=getDashboardData`);
      const data = await response.json();
      
      if (data.status === 'success') {
        setRegistrations(data.registrations || []);
        setFilteredData(data.registrations || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('❌ Error loading data');
    }
    setLoading(false);
  };

  // Search functionality
  useEffect(() => {
    if (!searchTerm && filterDate === 'all' && filterGender === 'all') {
      setFilteredData(registrations);
      return;
    }

    let filtered = registrations.filter(reg => {
      const matchesSearch = !searchTerm || 
        reg.registrationId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.teamLeaderName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.eventName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.rollNo?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGender = filterGender === 'all' || 
        reg.teamLeaderGender?.toLowerCase() === filterGender.toLowerCase();

      let matchesDate = true;
      if (filterDate === 'today') {
        const today = new Date().toDateString();
        const regDate = new Date(reg.timestamp).toDateString();
        matchesDate = today === regDate;
      }

      return matchesSearch && matchesGender && matchesDate;
    });

    setFilteredData(filtered);
  }, [searchTerm, registrations, filterDate, filterGender]);

  // Edit handlers
  const startEdit = (registration) => {
    setEditingId(registration.registrationId);
    setEditData({...registration});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = async () => {
    setLoading(true);
    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          action: 'updateRegistration',
          data: editData
        })
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        alert('✅ Registration updated successfully!');
        setEditingId(null);
        setEditData({});
        fetchRegistrations();
      } else {
        alert('❌ Update failed: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating:', error);
      alert('❌ Error updating registration');
    }
    setLoading(false);
  };

  // Statistics
  const stats = {
    total: filteredData.length,
    male: filteredData.filter(r => r.teamLeaderGender === 'Male').length,
    female: filteredData.filter(r => r.teamLeaderGender === 'Female').length,
    today: filteredData.filter(r => {
      const today = new Date().toDateString();
      return new Date(r.timestamp).toDateString() === today;
    }).length
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Reg ID', 'Date', 'Event', 'Team Leader', 'Gender', 'Roll No', 'Dept', 'Year', 'Contact', 'Email', 'Team Size'];
    const csvData = filteredData.map(reg => [
      reg.registrationId,
      new Date(reg.timestamp).toLocaleString(),
      reg.eventName,
      reg.teamLeaderName,
      reg.teamLeaderGender,
      reg.rollNo,
      reg.department,
      reg.year,
      reg.contact,
      reg.email,
      reg.totalMembers
    ]);

    const csv = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enthusia-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="login-wrapper">
        <div className="login-card">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="login-icon-container">
              <User className="w-10 h-10" style={{ color: 'white' }} />
            </div>
            <h1 className="login-title">
              Enthusia 2026
            </h1>
            <p className="login-subtitle">Admin Checking System</p>
            <div className="login-badge">
              <p>🔐 Secure Access Portal</p>
            </div>
          </div>

          <div className="login-form">
            <div>
              <label className="login-label">
                Admin Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="login-input"
                placeholder="Enter password"
              />
            </div>

            <button
              onClick={handleLogin}
              className="login-button"
            >
              🔓 Login to Admin Panel
            </button>
          </div>

          <div className="login-footer">
            <p>🏛️ Kongu Engineering College</p>
            <p>Authorized Personnel Only</p>
          </div>
        </div>
      </div>
    );
  }

  // Main Admin Dashboard
  return (
    <div className="admin-checking-container">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div>
            <h1 className="header-title">🎭 Enthusia 2026</h1>
            <p className="header-subtitle">Admin Checking & Management System</p>
          </div>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setRegistrations([]);
              setFilteredData([]);
            }}
            className="logout-button"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="main-content">
        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card stat-card-blue">
            <div className="stat-card-content">
              <div className="stat-card-text">
                <p className="stat-label" style={{ color: 'rgba(191, 219, 254, 1)' }}>Total Registrations</p>
                <p className="stat-value">{stats.total}</p>
                <p className="stat-info" style={{ color: 'rgba(191, 219, 254, 1)' }}>All Events</p>
              </div>
              <Users className="stat-icon" style={{ opacity: 0.3 }} />
            </div>
          </div>

          <div className="stat-card stat-card-green">
            <div className="stat-card-content">
              <div className="stat-card-text">
                <p className="stat-label" style={{ color: 'rgba(187, 247, 208, 1)' }}>Today's Entries</p>
                <p className="stat-value">{stats.today}</p>
                <p className="stat-info" style={{ color: 'rgba(187, 247, 208, 1)' }}>Recent Activity</p>
              </div>
              <Calendar className="stat-icon" style={{ opacity: 0.3 }} />
            </div>
          </div>

          <div className="stat-card stat-card-purple">
            <div className="stat-card-content">
              <div className="stat-card-text">
                <p className="stat-label" style={{ color: 'rgba(232, 212, 254, 1)' }}>Male Participants</p>
                <p className="stat-value">{stats.male}</p>
                <p className="stat-info" style={{ color: 'rgba(232, 212, 254, 1)' }}>{stats.total > 0 ? Math.round((stats.male / stats.total) * 100) : 0}% of Total</p>
              </div>
              <User className="stat-icon" style={{ opacity: 0.3 }} />
            </div>
          </div>

          <div className="stat-card stat-card-pink">
            <div className="stat-card-content">
              <div className="stat-card-text">
                <p className="stat-label" style={{ color: 'rgba(252, 231, 243, 1)' }}>Female Participants</p>
                <p className="stat-value">{stats.female}</p>
                <p className="stat-info" style={{ color: 'rgba(252, 231, 243, 1)' }}>{stats.total > 0 ? Math.round((stats.female / stats.total) * 100) : 0}% of Total</p>
              </div>
              <User className="stat-icon" style={{ opacity: 0.3 }} />
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="search-bar">
          <div className="search-bar-header">
            <div className="search-bar-accent"></div>
            <h2 className="search-bar-title">Search & Filter</h2>
          </div>

          <div className="search-grid">
            <div className="search-input-wrapper">
              <Search />
              <input
                type="text"
                placeholder="Search by ID, Name, Event, or Roll No..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div>
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="filter-select"
              >
                <option value="all">📅 All Dates</option>
                <option value="today">📅 Today Only</option>
              </select>
            </div>

            <div>
              <select
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
                className="filter-select"
              >
                <option value="all">⚧️ All Genders</option>
                <option value="male">👨 Male</option>
                <option value="female">👩 Female</option>
              </select>
            </div>
          </div>

          <div className="search-buttons">
            <button
              onClick={exportToCSV}
              className="btn btn-green"
            >
              <Download className="w-5 h-5" />
              Export CSV
            </button>

            <button
              onClick={fetchRegistrations}
              className="btn btn-blue"
            >
              🔄 Refresh Data
            </button>

            <div className="result-info">
              Showing {filteredData.length} of {registrations.length} registrations
            </div>
          </div>
        </div>

        {/* Registration Cards */}
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Loading registrations...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="empty-state">
            <Search className="empty-state-icon" />
            <p className="empty-state-title">No registrations found</p>
            <p className="empty-state-text">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="cards-container">
            {filteredData.map((reg, index) => (
              <div
                key={reg.registrationId}
                className="registration-card"
              >
                {editingId === reg.registrationId ? (
                  // Edit Mode
                  <div className="registration-card-content edit-mode-bg">
                    <div className="edit-header">
                      <h3 className="edit-title">✏️ Editing Registration</h3>
                      <div className="edit-buttons">
                        <button
                          onClick={saveEdit}
                          className="btn-save"
                        >
                          <Save className="w-5 h-5" />
                          Save Changes
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="btn-cancel"
                        >
                          <X className="w-5 h-5" />
                          Cancel
                        </button>
                      </div>
                    </div>

                    <div className="edit-grid">
                      <div className="form-group">
                        <label className="form-label">👤 Team Leader Name</label>
                        <input
                          type="text"
                          value={editData.teamLeaderName || ''}
                          onChange={(e) => setEditData({...editData, teamLeaderName: e.target.value})}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">⚧️ Gender</label>
                        <select
                          value={editData.teamLeaderGender || ''}
                          onChange={(e) => setEditData({...editData, teamLeaderGender: e.target.value})}
                          className="form-select"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label"># Roll No</label>
                        <input
                          type="text"
                          value={editData.rollNo || ''}
                          onChange={(e) => setEditData({...editData, rollNo: e.target.value})}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">📚 Department</label>
                        <input
                          type="text"
                          value={editData.department || ''}
                          onChange={(e) => setEditData({...editData, department: e.target.value})}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">🎓 Year</label>
                        <input
                          type="text"
                          value={editData.year || ''}
                          onChange={(e) => setEditData({...editData, year: e.target.value})}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">📞 Contact</label>
                        <input
                          type="text"
                          value={editData.contact || ''}
                          onChange={(e) => setEditData({...editData, contact: e.target.value})}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group" style={{ gridColumn: 'span 3' }}>
                        <label className="form-label">📧 Email</label>
                        <input
                          type="email"
                          value={editData.email || ''}
                          onChange={(e) => setEditData({...editData, email: e.target.value})}
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="registration-card-content">
                    <div className="view-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div className="registration-id-badge">
                          {reg.registrationId}
                        </div>
                        <div className="registration-info">
                          <h3 className="registration-event">{reg.eventName}</h3>
                          <p className="registration-date">
                            <Calendar className="w-4 h-4" />
                            {new Date(reg.timestamp).toLocaleString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => startEdit(reg)}
                        className="btn-edit"
                      >
                        <Edit2 className="w-5 h-5" />
                        Edit
                      </button>
                    </div>

                    <div className="details-grid">
                      <div className="detail-card detail-card-blue">
                        <div className="detail-icon">
                          <User className="w-6 h-6" />
                        </div>
                        <div className="detail-text">
                          <p className="detail-label">Team Leader</p>
                          <p className="detail-value">{reg.teamLeaderName}</p>
                        </div>
                      </div>

                      <div className="detail-card detail-card-purple">
                        <div className="detail-icon">
                          <User className="w-6 h-6" />
                        </div>
                        <div className="detail-text">
                          <p className="detail-label">Gender</p>
                          <p className="detail-value">{reg.teamLeaderGender}</p>
                        </div>
                      </div>

                      <div className="detail-card detail-card-green">
                        <div className="detail-icon">
                          <Hash className="w-6 h-6" />
                        </div>
                        <div className="detail-text">
                          <p className="detail-label">Roll No</p>
                          <p className="detail-value">{reg.rollNo}</p>
                        </div>
                      </div>

                      <div className="detail-card detail-card-orange">
                        <div className="detail-icon">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div className="detail-text">
                          <p className="detail-label">Department</p>
                          <p className="detail-value">{reg.department} - {reg.year}</p>
                        </div>
                      </div>

                      <div className="detail-card detail-card-red">
                        <div className="detail-icon">
                          <Phone className="w-6 h-6" />
                        </div>
                        <div className="detail-text">
                          <p className="detail-label">Contact</p>
                          <p className="detail-value">{reg.contact}</p>
                        </div>
                      </div>

                      <div className="detail-card detail-card-pink">
                        <div className="detail-icon">
                          <Mail className="w-6 h-6" />
                        </div>
                        <div className="detail-text">
                          <p className="detail-label">Email</p>
                          <p className="detail-value detail-value-truncate">{reg.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="badges-container" style={{ marginTop: '1.5rem' }}>
                      <span className="badge">
                        👥 Team Size: {reg.totalMembers}
                      </span>
                      <span className="badge badge-purple">
                        🎓 {reg.year}
                      </span>
                      <span className="badge badge-green">
                        #{index + 1}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}