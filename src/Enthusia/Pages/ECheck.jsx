import React, { useState } from 'react';
import { FaSearch, FaUser, FaCalendarAlt, FaPhone, FaEnvelope, FaUsers, FaTrophy, FaCheckCircle, FaStar } from 'react-icons/fa';
import '../styles/ECheck.css';

const ECheck = () => {
  const [registrationId, setRegistrationId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock function to check registration - Replace with actual Google Sheets API call
  const checkRegistration = async (regId) => {
    setLoading(true);
    setError('');
    setSearchResult(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data - Replace this with actual Google Sheets fetch
      const mockResults = {
        'GRD001': {
          registrationId: 'GRD001',
          eventName: 'Group Dance',
          teamLeader: {
            name: 'Rahul Sharma',
            rollNo: 'CS21001',
            department: 'Computer Science',
            year: '3rd Year',
            contact: '+91 9876543210',
            email: 'rahul@example.com'
          },
          subLeaders: [
            {
              name: 'Priya Patel',
              rollNo: 'CS21002',
              contact: '+91 9876543211',
              email: 'priya@example.com'
            }
          ],
          teamMembers: [
            { name: 'Arjun Kumar', rollNo: 'CS21003' },
            { name: 'Sneha Reddy', rollNo: 'CS21004' },
            { name: 'Vikram Singh', rollNo: 'CS21005' }
          ],
          totalMembers: 5,
          registrationDate: '2025-03-10T10:30:00',
          status: 'Confirmed'
        },
        'SOD002': {
          registrationId: 'SOD002',
          eventName: 'Solo Dance',
          teamLeader: {
            name: 'Meera Joshi',
            rollNo: 'EC21015',
            department: 'Electronics',
            year: '2nd Year',
            contact: '+91 9876543220',
            email: 'meera@example.com'
          },
          subLeaders: [],
          teamMembers: [],
          totalMembers: 1,
          registrationDate: '2025-03-09T15:45:00',
          status: 'Confirmed'
        },
        'GRS003': {
          registrationId: 'GRS003',
          eventName: 'Group Singing',
          teamLeader: {
            name: 'Aditya Verma',
            rollNo: 'ME21010',
            department: 'Mechanical',
            year: '4th Year',
            contact: '+91 9876543230',
            email: 'aditya@example.com'
          },
          subLeaders: [
            {
              name: 'Kavya Nair',
              rollNo: 'ME21011',
              contact: '+91 9876543231',
              email: 'kavya@example.com'
            }
          ],
          teamMembers: [
            { name: 'Rohan Gupta', rollNo: 'ME21012' },
            { name: 'Ishita Sharma', rollNo: 'ME21013' },
            { name: 'Karan Malhotra', rollNo: 'ME21014' },
            { name: 'Nisha Agarwal', rollNo: 'ME21015' }
          ],
          totalMembers: 6,
          registrationDate: '2025-03-08T12:20:00',
          status: 'Confirmed'
        }
      };

      const result = mockResults[regId.toUpperCase()];
      
      if (result) {
        setSearchResult(result);
      } else {
        setError('Registration ID not found. Please check and try again.');
      }
    } catch (err) {
      setError('Error checking registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (registrationId.trim()) {
      checkRegistration(registrationId.trim());
    } else {
      setError('Please enter a registration ID');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="echeck-container">
      {/* Animated Background Elements */}
      <div className="bg-circles">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>

      <div className="echeck-wrapper">
        {/* Header Section */}
        <div className="echeck-header">
          <div className="header-icon">
           
          </div>
          <h1 className="echeck-title">Registration Portal</h1>
          <p className="echeck-subtitle">Verify your event registration status instantly</p>
        </div>

        <div className="echeck-content">
          {/* Search Section */}
          <div className="search-section">
            <div className="search-card">
              <div className="search-card-header">
                <FaSearch className="header-icon-small" />
                <h3>Quick Lookup</h3>
              </div>
              
              <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-wrapper">
                  <input
                    type="text"
                    placeholder="Enter Registration ID"
                    value={registrationId}
                    onChange={(e) => setRegistrationId(e.target.value.toUpperCase())}
                    className="search-input"
                  />
                  <button type="submit" className="search-btn" disabled={loading}>
                    {loading ? (
                      <>
                        <div className="btn-spinner"></div>
                        Searching
                      </>
                    ) : (
                      <>
                        <FaSearch />
                        Search
                      </>
                    )}
                  </button>
                </div>
              </form>

              {error && (
                <div className="error-message">
                  <div className="error-icon">⚠️</div>
                  <p>{error}</p>
                </div>
              )}

              <div className="search-info">
                <div className="info-header">
                  <span className="info-badge">Sample IDs</span>
                </div>
                <div className="sample-ids">
                  <div className="sample-id-item" onClick={() => setRegistrationId('GRD001')}>
                    <span className="sample-code">GRD001</span>
                    <span className="sample-event">Group Dance</span>
                  </div>
                  <div className="sample-id-item" onClick={() => setRegistrationId('SOD002')}>
                    <span className="sample-code">SOD002</span>
                    <span className="sample-event">Solo Dance</span>
                  </div>
                  <div className="sample-id-item" onClick={() => setRegistrationId('GRS003')}>
                    <span className="sample-code">GRS003</span>
                    <span className="sample-event">Group Singing</span>
                  </div>
                </div>
                <div className="info-footer">
                  <p>💡 Format: [Event Code][Number]</p>
                </div>
                <div className="info-footer">
                <p>Need help with registration? Contact:</p>
                  <a href="tel:+918925490989" className="contact-help">
                  <FaPhone className="contact-icon" />
                   Sakthivel S -  8925490989
                 </a>
               </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="results-section">
            {loading && (
              <div className="loading-card">
                <div className="loading-animation">
                  <div className="loading-ring"></div>
                  <div className="loading-ring"></div>
                  <div className="loading-ring"></div>
                </div>
                <h3>Fetching Details...</h3>
                <p>Please wait while we retrieve your information</p>
              </div>
            )}

            {searchResult && (
              <div className="result-card">
                {/* Result Header */}
                <div className="result-header">
                  <div className="result-id-section">
                    <FaTrophy className="trophy-icon" />
                    <div className="id-text">
                      <span className="id-label">Registration ID</span>
                      <span className="id-value">{searchResult.registrationId}</span>
                    </div>
                  </div>
                  <div className="result-status">
                    <FaCheckCircle className="status-icon" />
                    <span className="status-text">{searchResult.status}</span>
                  </div>
                </div>

                {/* Event Name Banner */}
                <div className="event-banner">
                  <h2 className="event-namesa">{searchResult.eventName}</h2>
                  <div className="event-decoration"></div>
                </div>

                <div className="result-content">
                  {/* Team Leader Section */}
                  <div className="detail-section leader-section">
                    <div className="section-header">
                      <FaUser className="section-icon" />
                      <h4>Team Leader</h4>
                    </div>
                    <div className="leader-card">
                      <div className="leader-info">
                        <div className="info-row">
                          <span className="info-label">Name</span>
                          <span className="info-value">{searchResult.teamLeader.name}</span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">Roll Number</span>
                          <span className="info-value">{searchResult.teamLeader.rollNo}</span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">Department</span>
                          <span className="info-value">{searchResult.teamLeader.department}</span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">Year</span>
                          <span className="info-value">{searchResult.teamLeader.year}</span>
                        </div>
                      </div>
                      <div className="contact-info">
                        <div className="contact-item">
                          <FaPhone className="contact-icon" />
                          <span>{searchResult.teamLeader.contact}</span>
                        </div>
                        <div className="contact-item">
                          <FaEnvelope className="contact-icon" />
                          <span>{searchResult.teamLeader.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sub Leaders Section */}
                  {searchResult.subLeaders.length > 0 && (
                    <div className="detail-section">
                      <div className="section-header">
                        <FaUsers className="section-icon" />
                        <h4>Sub Leaders</h4>
                        <span className="count-badge">{searchResult.subLeaders.length}</span>
                      </div>
                      {searchResult.subLeaders.map((leader, index) => (
                        <div key={index} className="sub-leader-card">
                          <div className="sub-leader-info">
                            <div className="info-row">
                              <span className="info-label">Name</span>
                              <span className="info-value">{leader.name}</span>
                            </div>
                            <div className="info-row">
                              <span className="info-label">Roll Number</span>
                              <span className="info-value">{leader.rollNo}</span>
                            </div>
                          </div>
                          <div className="contact-info">
                            <div className="contact-item">
                              <FaPhone className="contact-icon" />
                              <span>{leader.contact}</span>
                            </div>
                            <div className="contact-item">
                              <FaEnvelope className="contact-icon" />
                              <span>{leader.email}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Team Members Section */}
                  {searchResult.teamMembers.length > 0 && (
                    <div className="detail-section">
                      <div className="section-header">
                        <FaUsers className="section-icon" />
                        <h4>Team Members</h4>
                        <span className="count-badge">{searchResult.teamMembers.length}</span>
                      </div>
                      <div className="team-members-grid">
                        {searchResult.teamMembers.map((member, index) => (
                          <div key={index} className="team-member-card">
                            <div className="member-avatar">{member.name.charAt(0)}</div>
                            <div className="member-details">
                              <span className="member-name">{member.name}</span>
                              <span className="member-roll">{member.rollNo}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Registration Info Section */}
                  <div className="detail-section stats-section">
                    <div className="section-header">
                      <FaCalendarAlt className="section-icon" />
                      <h4>Registration Details</h4>
                    </div>
                    <div className="stats-grid">
                      <div className="stat-card">
                        <div className="stat-icon">👥</div>
                        <div className="stat-info">
                          <span className="stat-label">Total Members</span>
                          <span className="stat-value">{searchResult.totalMembers}</span>
                        </div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-icon">📅</div>
                        <div className="stat-info">
                          <span className="stat-label">Registered On</span>
                          <span className="stat-value">{formatDate(searchResult.registrationDate)}</span>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!loading && !searchResult && !error && (
              <div className="no-result-card">
                <div className="empty-state-icon">
                  <FaSearch />
                </div>
                <h3>Start Your Search</h3>
                <p>Enter your registration ID to view complete details</p>
                <div className="empty-decoration">
                  <div className="deco-line"></div>
                  <div className="deco-circle"></div>
                  <div className="deco-line"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ECheck;