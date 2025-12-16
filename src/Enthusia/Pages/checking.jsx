import React, { useState, useEffect } from 'react';
import { Search, Edit2, Save, X, Calendar, Users, Mail, Phone, User, Hash, BookOpen, Download, LogOut, Filter, RefreshCw, TrendingUp } from 'lucide-react';
import '../styles/checking.css';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyoAFe6rMeJWIBVrBJEZ6WnLwLsXR2sUBaXnE5Vuz6-mPpJPpZfB-LjoXPlqZvQ-xk/exec';
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
  const [filterEvent, setFilterEvent] = useState('all');
  const [events, setEvents] = useState([]);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [stats, setStats] = useState({
    total: 0,
    male: 0,
    female: 0,
    today: 0,
    totalParticipants: 0,
    uniqueEvents: 0,
    departments: 0
  });

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
        // Transform data from Google Sheets format
        const transformedData = transformSheetData(data.registrations || []);
        setRegistrations(transformedData);
        setFilteredData(transformedData);
        
        // Extract unique events
        const uniqueEvents = [...new Set(transformedData.map(reg => reg.eventName))].filter(Boolean);
        setEvents(['all', ...uniqueEvents]);
        
        // Calculate stats
        calculateStats(transformedData);
      } else {
        alert('❌ Error loading data: ' + data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('❌ Error loading data. Please check console for details.');
    }
    setLoading(false);
  };

  // Transform Google Sheets data to match expected format
  const transformSheetData = (sheetData) => {
    return sheetData.map((row, index) => {
      // Parse participants from the All Participants column
      let participants = [];
      if (row['All Participants']) {
        const participantStrings = row['All Participants'].split('|').map(s => s.trim());
        participants = participantStrings.map(p => {
          const match = p.match(/(.+?) \((.+?)\) - (.+)/);
          if (match) {
            return {
              name: match[1].trim(),
              rollNo: match[2].trim(),
              role: match[3].trim(),
              gender: row['Team Leader Gender'] || 'Male' // Default if not in participants
            };
          }
          return null;
        }).filter(Boolean);
      }
      
      return {
        registrationId: row['Registration ID'] || `REG${String(index + 1).padStart(4, '0')}`,
        timestamp: row['Timestamp'] || new Date().toISOString(),
        eventName: row['Event Name'] || '',
        teamLeaderName: row['Team Leader Name'] || '',
        teamLeaderGender: row['Team Leader Gender'] || 'Male',
        rollNo: row['Team Leader Roll No'] || '',
        department: row['Department'] || '',
        year: row['Year'] || '',
        contact: row['Team Leader Contact'] || '',
        email: row['Team Leader Email'] || '',
        totalMembers: parseInt(row['Total Members']) || 1,
        college: row['College'] || 'Kongu Engineering College',
        eventCategory: row['Event Category'] || '',
        allParticipants: row['All Participants'] || '',
        participants: participants,
        audioFile: row['Audio File'] || '',
        genderSummary: row['Gender Summary'] || ''
      };
    });
  };

  // Calculate statistics
  const calculateStats = (data) => {
    const total = data.length;
    const male = data.filter(r => r.teamLeaderGender === 'Male').length;
    const female = data.filter(r => r.teamLeaderGender === 'Female').length;
    const today = data.filter(r => {
      const todayDate = new Date().toDateString();
      const regDate = new Date(r.timestamp).toDateString();
      return todayDate === regDate;
    }).length;
    
    // Calculate total participants across all teams
    const totalParticipants = data.reduce((sum, reg) => sum + (reg.totalMembers || 1), 0);
    
    // Get unique events
    const uniqueEvents = new Set(data.map(reg => reg.eventName)).size;
    
    // Get unique departments
    const departments = new Set(data.map(reg => reg.department).filter(Boolean)).size;
    
    setStats({
      total,
      male,
      female,
      today,
      totalParticipants,
      uniqueEvents,
      departments
    });
  };

  // Search functionality
  useEffect(() => {
    if (!searchTerm && filterDate === 'all' && filterGender === 'all' && filterEvent === 'all') {
      setFilteredData(registrations);
      setActiveFilterCount(0);
      return;
    }

    let filtered = registrations.filter(reg => {
      const matchesSearch = !searchTerm || 
        reg.registrationId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.teamLeaderName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.eventName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.rollNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.allParticipants?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.department?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGender = filterGender === 'all' || 
        reg.teamLeaderGender?.toLowerCase() === filterGender.toLowerCase();

      const matchesEvent = filterEvent === 'all' || 
        reg.eventName === filterEvent;

      let matchesDate = true;
      if (filterDate === 'today') {
        const today = new Date().toDateString();
        const regDate = new Date(reg.timestamp).toDateString();
        matchesDate = today === regDate;
      } else if (filterDate === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const regDate = new Date(reg.timestamp);
        matchesDate = regDate >= weekAgo;
      }

      return matchesSearch && matchesGender && matchesEvent && matchesDate;
    });

    setFilteredData(filtered);
    
    // Count active filters
    let count = 0;
    if (searchTerm) count++;
    if (filterDate !== 'all') count++;
    if (filterGender !== 'all') count++;
    if (filterEvent !== 'all') count++;
    setActiveFilterCount(count);
  }, [searchTerm, registrations, filterDate, filterGender, filterEvent]);

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
        headers: {
          'Content-Type': 'application/json',
        },
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

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      'Reg ID', 'Date', 'Event', 'Category', 'Team Leader', 
      'Gender', 'Roll No', 'Dept', 'Year', 'College', 
      'Contact', 'Email', 'Team Size', 'All Participants', 'Audio'
    ];
    
    const csvData = filteredData.map(reg => [
      reg.registrationId,
      new Date(reg.timestamp).toLocaleString(),
      reg.eventName,
      reg.eventCategory,
      reg.teamLeaderName,
      reg.teamLeaderGender,
      reg.rollNo,
      reg.department,
      reg.year,
      reg.college,
      reg.contact,
      reg.email,
      reg.totalMembers,
      reg.allParticipants,
      reg.audioFile ? 'Yes' : 'No'
    ]);

    const csv = [headers, ...csvData].map(row => 
      row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enthusia-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setFilterDate('all');
    setFilterGender('all');
    setFilterEvent('all');
  };

  // Calculate gender percentage
  const malePercentage = stats.total > 0 ? Math.round((stats.male / stats.total) * 100) : 0;
  const femalePercentage = stats.total > 0 ? Math.round((stats.female / stats.total) * 100) : 0;

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="EE-login-wrapper">
        <div className="EE-login-card">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="EE-login-icon-container">
              <User className="EE-w-10 EE-h-10" style={{ color: 'white' }} />
            </div>
            <h1 className="EE-login-title">
              Enthusia 2026
            </h1>
            <p className="EE-login-subtitle">Admin Checking System</p>
            <div className="EE-login-badge">
              <p>🔐 Secure Access Portal</p>
            </div>
          </div>

          <div className="EE-login-form">
            <div>
              <label className="EE-login-label">
                Admin Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="EE-login-input"
                placeholder="Enter password"
                autoFocus
              />
            </div>

            <button
              onClick={handleLogin}
              className="EE-login-button"
            >
              🔓 Login to Admin Panel
            </button>
          </div>

          <div className="EE-login-footer">
            <p>🏛️ Kongu Engineering College</p>
            <p>Authorized Personnel Only</p>
            <p className="EE-text-xs EE-mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Powered by Google Apps Script
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main Admin Dashboard
  return (
    <div className="EE-admin-checking-container">
      {/* Header */}
      <div className="EE-header">
        <div className="EE-header-content">
          <div>
            <h1 className="EE-header-title">🎭 Enthusia 2026</h1>
            <p className="EE-header-subtitle">Admin Checking & Management System</p>
            <p className="EE-header-subtitle EE-text-xs EE-mt-1">
              Connected to Google Sheets Database
            </p>
          </div>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setRegistrations([]);
              setFilteredData([]);
            }}
            className="EE-logout-button"
          >
            <LogOut className="EE-w-5 EE-h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="EE-main-content">
        {/* Statistics Cards */}
        <div className="EE-stats-grid">
          <div className="EE-stat-card EE-stat-card-blue">
            <div className="EE-stat-card-content">
              <div className="EE-stat-card-text">
                <p className="EE-stat-label">Total Registrations</p>
                <p className="EE-stat-value">{stats.total}</p>
                <p className="EE-stat-info">Across {stats.uniqueEvents} events</p>
              </div>
              <Users className="EE-stat-icon" />
            </div>
          </div>

          <div className="EE-stat-card EE-stat-card-green">
            <div className="EE-stat-card-content">
              <div className="EE-stat-card-text">
                <p className="EE-stat-label">Total Participants</p>
                <p className="EE-stat-value">{stats.totalParticipants}</p>
                <p className="EE-stat-info">
                  {stats.total > 0 ? Math.round(stats.totalParticipants / stats.total) : 0} avg/team
                </p>
              </div>
              <Users className="EE-stat-icon" />
            </div>
          </div>

          <div className="EE-stat-card EE-stat-card-purple">
            <div className="EE-stat-card-content">
              <div className="EE-stat-card-text">
                <p className="EE-stat-label">Male Participants</p>
                <p className="EE-stat-value">{stats.male}</p>
                <p className="EE-stat-info">{malePercentage}% of Total</p>
              </div>
              <TrendingUp className="EE-stat-icon" />
            </div>
          </div>

          <div className="EE-stat-card EE-stat-card-pink">
            <div className="EE-stat-card-content">
              <div className="EE-stat-card-text">
                <p className="EE-stat-label">Female Participants</p>
                <p className="EE-stat-value">{stats.female}</p>
                <p className="EE-stat-info">{femalePercentage}% of Total</p>
              </div>
              <TrendingUp className="EE-stat-icon" />
            </div>
          </div>

          <div className="EE-stat-card EE-stat-card-orange">
            <div className="EE-stat-card-content">
              <div className="EE-stat-card-text">
                <p className="EE-stat-label">Today's Entries</p>
                <p className="EE-stat-value">{stats.today}</p>
                <p className="EE-stat-info">{stats.total > 0 ? Math.round((stats.today / stats.total) * 100) : 0}% of Total</p>
              </div>
              <Calendar className="EE-stat-icon" />
            </div>
          </div>

          <div className="EE-stat-card EE-stat-card-red">
            <div className="EE-stat-card-content">
              <div className="EE-stat-card-text">
                <p className="EE-stat-label">Departments</p>
                <p className="EE-stat-value">{stats.departments}</p>
                <p className="EE-stat-info">Unique departments registered</p>
              </div>
              <BookOpen className="EE-stat-icon" />
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="EE-search-bar">
          <div className="EE-search-bar-header">
            <div className="EE-search-bar-accent"></div>
            <h2 className="EE-search-bar-title">
              Search & Filter 
              {activeFilterCount > 0 && (
                <span className="EE-badge EE-badge-green EE-ml-2">
                  {activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}
                </span>
              )}
            </h2>
          </div>

          <div className="EE-search-grid">
            <div className="EE-search-input-wrapper">
              <Search className="EE-w-5 EE-h-5" />
              <input
                type="text"
                placeholder="Search by ID, Name, Event, Roll No, Department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="EE-search-input"
              />
            </div>

            <div>
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="EE-filter-select"
              >
                <option value="all">📅 All Dates</option>
                <option value="today">📅 Today Only</option>
                <option value="week">📅 Last 7 Days</option>
              </select>
            </div>

            <div>
              <select
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
                className="EE-filter-select"
              >
                <option value="all">⚧️ All Genders</option>
                <option value="male">👨 Male</option>
                <option value="female">👩 Female</option>
              </select>
            </div>

            <div>
              <select
                value={filterEvent}
                onChange={(e) => setFilterEvent(e.target.value)}
                className="EE-filter-select"
              >
                <option value="all">🎭 All Events</option>
                {events.slice(1).map((event, index) => (
                  <option key={index} value={event}>
                    {event}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="EE-search-buttons">
            <div className="EE-flex EE-items-center EE-gap-3">
              <button
                onClick={exportToCSV}
                className="EE-btn EE-btn-green"
              >
                <Download className="EE-w-5 EE-h-5" />
                Export CSV
              </button>

              <button
                onClick={fetchRegistrations}
                className="EE-btn EE-btn-blue"
                disabled={loading}
              >
                <RefreshCw className={`EE-w-5 EE-h-5 ${loading ? 'EE-animate-spin' : ''}`} />
                Refresh Data
              </button>

              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="EE-btn EE-btn-cancel"
                >
                  <X className="EE-w-5 EE-h-5" />
                  Clear Filters
                </button>
              )}
            </div>

            <div className="EE-result-info">
              Showing {filteredData.length} of {registrations.length} registrations
              {searchTerm && ` for "${searchTerm}"`}
            </div>
          </div>
        </div>

        {/* Registration Cards */}
        {loading ? (
          <div className="EE-loading-container">
            <div className="EE-spinner"></div>
            <p className="EE-loading-text">Loading registrations from Google Sheets...</p>
            <p className="EE-loading-text EE-text-xs EE-mt-2">
              Please wait while we fetch the latest data
            </p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="EE-empty-state">
            <Search className="EE-empty-state-icon EE-w-16 EE-h-16" />
            <p className="EE-empty-state-title">No registrations found</p>
            <p className="EE-empty-state-text">
              {searchTerm || filterDate !== 'all' || filterGender !== 'all' || filterEvent !== 'all'
                ? 'Try adjusting your search filters or clear all filters'
                : 'No registrations available. Data will appear here once registrations are submitted.'}
            </p>
            {!searchTerm && registrations.length === 0 && (
              <button
                onClick={fetchRegistrations}
                className="EE-btn EE-btn-blue EE-mt-4"
              >
                <RefreshCw className="EE-w-5 EE-h-5" />
                Load Data
              </button>
            )}
          </div>
        ) : (
          <div className="EE-cards-container">
            {filteredData.map((reg, index) => (
              <div
                key={reg.registrationId}
                className="EE-registration-card"
              >
                {editingId === reg.registrationId ? (
                  // Edit Mode
                  <div className="EE-registration-card-content EE-edit-mode-bg">
                    <div className="EE-edit-header">
                      <h3 className="EE-edit-title">✏️ Editing Registration</h3>
                      <div className="EE-edit-buttons">
                        <button
                          onClick={saveEdit}
                          className="EE-btn-save"
                          disabled={loading}
                        >
                          <Save className="EE-w-5 EE-h-5" />
                          Save Changes
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="EE-btn-cancel"
                          disabled={loading}
                        >
                          <X className="EE-w-5 EE-h-5" />
                          Cancel
                        </button>
                      </div>
                    </div>

                    <div className="EE-edit-grid">
                      <div className="EE-form-group">
                        <label className="EE-form-label">👤 Team Leader Name</label>
                        <input
                          type="text"
                          value={editData.teamLeaderName || ''}
                          onChange={(e) => setEditData({...editData, teamLeaderName: e.target.value})}
                          className="EE-form-input"
                        />
                      </div>

                      <div className="EE-form-group">
                        <label className="EE-form-label">⚧️ Gender</label>
                        <select
                          value={editData.teamLeaderGender || ''}
                          onChange={(e) => setEditData({...editData, teamLeaderGender: e.target.value})}
                          className="EE-form-select"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>

                      <div className="EE-form-group">
                        <label className="EE-form-label"># Roll No</label>
                        <input
                          type="text"
                          value={editData.rollNo || ''}
                          onChange={(e) => setEditData({...editData, rollNo: e.target.value})}
                          className="EE-form-input"
                        />
                      </div>

                      <div className="EE-form-group">
                        <label className="EE-form-label">📚 Department</label>
                        <input
                          type="text"
                          value={editData.department || ''}
                          onChange={(e) => setEditData({...editData, department: e.target.value})}
                          className="EE-form-input"
                        />
                      </div>

                      <div className="EE-form-group">
                        <label className="EE-form-label">🎓 Year</label>
                        <input
                          type="text"
                          value={editData.year || ''}
                          onChange={(e) => setEditData({...editData, year: e.target.value})}
                          className="EE-form-input"
                        />
                      </div>

                      <div className="EE-form-group">
                        <label className="EE-form-label">📞 Contact</label>
                        <input
                          type="text"
                          value={editData.contact || ''}
                          onChange={(e) => setEditData({...editData, contact: e.target.value})}
                          className="EE-form-input"
                        />
                      </div>

                      <div className="EE-form-group" style={{ gridColumn: 'span 3' }}>
                        <label className="EE-form-label">📧 Email</label>
                        <input
                          type="email"
                          value={editData.email || ''}
                          onChange={(e) => setEditData({...editData, email: e.target.value})}
                          className="EE-form-input"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="EE-registration-card-content">
                    <div className="EE-view-header">
                      <div className="EE-flex EE-items-center EE-gap-4">
                        <div className="EE-registration-id-badge">
                          {reg.registrationId}
                        </div>
                        <div className="EE-registration-info">
                          <h3 className="EE-registration-event">{reg.eventName}</h3>
                          <p className="EE-registration-date">
                            <Calendar className="EE-w-4 EE-h-4" />
                            {new Date(reg.timestamp).toLocaleString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                          {reg.eventCategory && (
                            <p className="EE-text-xs EE-mt-1" style={{ color: '#64748b' }}>
                              Category: {reg.eventCategory}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="EE-flex EE-items-center EE-gap-2">
                        <button
                          onClick={() => startEdit(reg)}
                          className="EE-btn-edit"
                        >
                          <Edit2 className="EE-w-5 EE-h-5" />
                          Edit
                        </button>
                      </div>
                    </div>

                    <div className="EE-details-grid">
                      <div className="EE-detail-card EE-detail-card-blue">
                        <div className="EE-detail-icon">
                          <User className="EE-w-6 EE-h-6" />
                        </div>
                        <div className="EE-detail-text">
                          <p className="EE-detail-label">Team Leader</p>
                          <p className="EE-detail-value">{reg.teamLeaderName}</p>
                        </div>
                      </div>

                      <div className="EE-detail-card EE-detail-card-purple">
                        <div className="EE-detail-icon">
                          <User className="EE-w-6 EE-h-6" />
                        </div>
                        <div className="EE-detail-text">
                          <p className="EE-detail-label">Gender</p>
                          <p className="EE-detail-value">{reg.teamLeaderGender}</p>
                        </div>
                      </div>

                      <div className="EE-detail-card EE-detail-card-green">
                        <div className="EE-detail-icon">
                          <Hash className="EE-w-6 EE-h-6" />
                        </div>
                        <div className="EE-detail-text">
                          <p className="EE-detail-label">Roll No</p>
                          <p className="EE-detail-value">{reg.rollNo}</p>
                        </div>
                      </div>

                      <div className="EE-detail-card EE-detail-card-orange">
                        <div className="EE-detail-icon">
                          <BookOpen className="EE-w-6 EE-h-6" />
                        </div>
                        <div className="EE-detail-text">
                          <p className="EE-detail-label">Department</p>
                          <p className="EE-detail-value">{reg.department} - {reg.year}</p>
                        </div>
                      </div>

                      <div className="EE-detail-card EE-detail-card-red">
                        <div className="EE-detail-icon">
                          <Phone className="EE-w-6 EE-h-6" />
                        </div>
                        <div className="EE-detail-text">
                          <p className="EE-detail-label">Contact</p>
                          <p className="EE-detail-value">{reg.contact}</p>
                        </div>
                      </div>

                      <div className="EE-detail-card EE-detail-card-pink">
                        <div className="EE-detail-icon">
                          <Mail className="EE-w-6 EE-h-6" />
                        </div>
                        <div className="EE-detail-text">
                          <p className="EE-detail-label">Email</p>
                          <p className="EE-detail-value EE-detail-value-truncate">{reg.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="EE-mt-4">
                      <div className="EE-flex EE-items-center EE-justify-between EE-mb-2">
                        <span className="EE-text-sm EE-font-semibold" style={{ color: '#475569' }}>
                          Team Details:
                        </span>
                        <span className="EE-badge">
                          👥 {reg.totalMembers} member{reg.totalMembers !== 1 ? 's' : ''}
                        </span>
                      </div>
                      
                      {reg.college && reg.college !== 'Kongu Engineering College' && (
                        <p className="EE-text-xs EE-mt-2" style={{ color: '#64748b' }}>
                          🏛️ {reg.college}
                        </p>
                      )}
                      
                      {reg.genderSummary && (
                        <p className="EE-text-xs EE-mt-1" style={{ color: '#64748b' }}>
                          ⚧️ {reg.genderSummary}
                        </p>
                      )}
                      
                      {reg.audioFile && (
                        <p className="EE-text-xs EE-mt-1" style={{ color: '#059669' }}>
                          🎵 Audio file attached
                        </p>
                      )}
                      
                      {reg.allParticipants && reg.allParticipants.includes('|') && (
                        <div className="EE-mt-3">
                          <details>
                            <summary className="EE-text-xs EE-font-semibold" style={{ color: '#475569', cursor: 'pointer' }}>
                              👁️ View All Participants
                            </summary>
                            <div className="EE-mt-2 EE-p-2 EE-bg-gray-50 EE-rounded-lg EE-text-xs" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                              {reg.allParticipants.split('|').map((p, idx) => (
                                <div key={idx} className="EE-mb-1 EE-p-1 EE-bg-white EE-rounded">
                                  {p.trim()}
                                </div>
                              ))}
                            </div>
                          </details>
                        </div>
                      )}
                    </div>

                    <div className="EE-badges-container EE-mt-4">
                      <span className="EE-badge">
                        👥 Team: {reg.totalMembers}
                      </span>
                      {reg.year && (
                        <span className="EE-badge EE-badge-purple">
                          🎓 {reg.year}
                        </span>
                      )}
                      {reg.eventCategory && (
                        <span className="EE-badge EE-badge-green">
                          {reg.eventCategory}
                        </span>
                      )}
                      <span className="EE-badge">
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