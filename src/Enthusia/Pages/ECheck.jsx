import React, { useState } from 'react';
import { FaSearch, FaUser, FaCalendarAlt, FaPhone, FaEnvelope, FaUsers, FaTrophy } from 'react-icons/fa';
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
      <div className="echeck-wrapper">
        <h1 className="echeck-title">Check Registration Status</h1>
        <p className="echeck-subtitle">Enter your registration ID to view details</p>

        <div className="echeck-content">
          {/* Left Side - Search Form */}
          <div className="search-section">
            <div className="search-card">
              <h3>Registration Lookup</h3>
              <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-group">
                  <input
                    type="text"
                    placeholder="Enter Registration ID (e.g., GRD001)"
                    value={registrationId}
                    onChange={(e) => setRegistrationId(e.target.value.toUpperCase())}
                    className="search-input"
                  />
                  <button type="submit" className="search-btn" disabled={loading}>
                    <FaSearch />
                    {loading ? 'Searching...' : 'Search'}
                  </button>
                </div>
              </form>

              {error && (
                <div className="error-message">
                  <p>{error}</p>
                </div>
              )}

              <div className="search-info">
                <h4>Sample Registration IDs:</h4>
                <ul>
                  <li><strong>GRD001</strong> - Group Dance</li>
                  <li><strong>SOD002</strong> - Solo Dance</li>
                  <li><strong>GRS003</strong> - Group Singing</li>
                </ul>
                <p>Registration ID format: [Event Code][Number]</p>
              </div>
            </div>
          </div>

          {/* Right Side - Results */}
          <div className="results-section">
            {loading && (
              <div className="loading-card">
                <div className="loading-spinner"></div>
                <p>Searching for registration...</p>
              </div>
            )}

            {searchResult && (
              <div className="result-card">
                <div className="result-header">
                  <div className="result-id">
                    <FaTrophy className="trophy-icon" />
                    <span>{searchResult.registrationId}</span>
                  </div>
                  <div className="result-status">
                    <span className={`status-badge ${searchResult.status.toLowerCase()}`}>
                      {searchResult.status}
                    </span>
                  </div>
                </div>

                <div className="result-content">
                  <h3 className="event-name">{searchResult.eventName}</h3>
                  
                  {/* Team Leader Details */}
                  <div className="detail-section">
                    <h4>
                      <FaUser className="section-icon" />
                      Team Leader
                    </h4>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="label">Name:</span>
                        <span className="value">{searchResult.teamLeader.name}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Roll No:</span>
                        <span className="value">{searchResult.teamLeader.rollNo}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Department:</span>
                        <span className="value">{searchResult.teamLeader.department}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Year:</span>
                        <span className="value">{searchResult.teamLeader.year}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Contact:</span>
                        <span className="value">
                          <FaPhone className="contact-icon" />
                          {searchResult.teamLeader.contact}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Email:</span>
                        <span className="value">
                          <FaEnvelope className="contact-icon" />
                          {searchResult.teamLeader.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sub Leaders */}
                  {searchResult.subLeaders.length > 0 && (
                    <div className="detail-section">
                      <h4>
                        <FaUsers className="section-icon" />
                        Sub Leaders ({searchResult.subLeaders.length})
                      </h4>
                      {searchResult.subLeaders.map((leader, index) => (
                        <div key={index} className="sub-leader-card">
                          <div className="detail-grid">
                            <div className="detail-item">
                              <span className="label">Name:</span>
                              <span className="value">{leader.name}</span>
                            </div>
                            <div className="detail-item">
                              <span className="label">Roll No:</span>
                              <span className="value">{leader.rollNo}</span>
                            </div>
                            <div className="detail-item">
                              <span className="label">Contact:</span>
                              <span className="value">{leader.contact}</span>
                            </div>
                            <div className="detail-item">
                              <span className="label">Email:</span>
                              <span className="value">{leader.email}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Team Members */}
                  {searchResult.teamMembers.length > 0 && (
                    <div className="detail-section">
                      <h4>
                        <FaUsers className="section-icon" />
                        Team Members ({searchResult.teamMembers.length})
                      </h4>
                      <div className="team-members-grid">
                        {searchResult.teamMembers.map((member, index) => (
                          <div key={index} className="team-member-item">
                            <span className="member-name">{member.name}</span>
                            <span className="member-roll">({member.rollNo})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Registration Info */}
                  <div className="detail-section">
                    <h4>
                      <FaCalendarAlt className="section-icon" />
                      Registration Information
                    </h4>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="label">Total Members:</span>
                        <span className="value">{searchResult.totalMembers}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Registration Date:</span>
                        <span className="value">{formatDate(searchResult.registrationDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!loading && !searchResult && !error && (
              <div className="no-result-card">
                <FaSearch className="no-result-icon" />
                <h3>Ready to Search</h3>
                <p>Enter a registration ID on the left to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ECheck;
