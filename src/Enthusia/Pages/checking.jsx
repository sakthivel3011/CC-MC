import React, { useState } from 'react';
import { FaSearch, FaEdit, FaSave, FaTimes, FaCheckCircle, FaUserCheck, FaClipboardList } from 'react-icons/fa';

const EventChecking = () => {
  const [searchId, setSearchId] = useState('');
  const [registration, setRegistration] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Editable fields
  const [editedData, setEditedData] = useState({});
  const [checkingData, setCheckingData] = useState({
    checkedBy: '',
    status: 'Present',
    notes: '',
    performanceScore: ''
  });

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzU8whdVltpW2YQwon-2FFGewipClsVY6yJl9Am6LI0iizt2-9bvfqW8O0CVU4IFBuV/exec';

  const handleSearch = async () => {
    if (!searchId.trim()) {
      setErrorMessage('Please enter a Registration ID');
      return;
    }

    setIsSearching(true);
    setErrorMessage('');
    setRegistration(null);

    try {
      const response = await fetch(
        `${SCRIPT_URL}?action=getRegistration&regId=${encodeURIComponent(searchId.trim())}`
      );
      const data = await response.json();

      if (data.status === 'success' && data.registration) {
        setRegistration(data.registration);
        setEditedData(data.registration);
      } else {
        setErrorMessage(data.message || 'Registration not found');
      }
    } catch (error) {
      setErrorMessage('Error fetching registration. Please try again.');
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleUpdate = async () => {
    setIsSaving(true);
    
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateRegistration',
          registrationId: editedData['Registration ID'],
          ...editedData
        })
      });

      setShowSuccess(true);
      setIsEditing(false);
      setRegistration(editedData);
      
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setErrorMessage('Error updating registration');
      console.error('Update error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInsertChecking = async () => {
    if (!registration) return;
    
    if (!checkingData.checkedBy.trim()) {
      setErrorMessage('Please enter who checked the registration');
      return;
    }

    setIsSaving(true);
    setErrorMessage('');

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'saveChecking',
          registrationId: registration['Registration ID'],
          eventName: registration['Event Name'],
          teamLeader: registration['Team Leader Name'],
          rollNo: registration['Roll No'],
          ...checkingData
        })
      });

      setShowSuccess(true);
      setCheckingData({
        checkedBy: '',
        status: 'Present',
        notes: '',
        performanceScore: ''
      });
      
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setErrorMessage('Error saving checking data');
      console.error('Checking save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const parseParticipants = (allParticipants) => {
    if (!allParticipants) return [];
    
    const participants = allParticipants.split(' | ');
    return participants.map(p => {
      const match = p.match(/(.+?)\s*\(([A-Z0-9]+)\)\s*-\s*(.+)/);
      if (match) {
        return {
          name: match[1].trim(),
          rollNo: match[2].trim(),
          role: match[3].trim()
        };
      }
      return null;
    }).filter(Boolean);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f1b2e 0%, #1a2f4a 100%)',
      padding: '2rem'
    }}>
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#10b981',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          animation: 'slideIn 0.3s ease'
        }}>
          <FaCheckCircle size={24} />
          <span style={{ fontWeight: '600' }}>Success! Data saved successfully</span>
        </div>
      )}

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1a3a52 0%, #2d5a7b 100%)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          marginTop: '3rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', marginTop: '1rem' }}>
            <FaUserCheck size={32} style={{ color: '#4fc3f7' }} />
            <div>
              <h1 style={{ margin: 0, color: 'white', fontSize: '2rem' }}>Event Checking System</h1>
              <p style={{ margin: '0.5rem 0 0', color: 'rgba(255,255,255,0.8)' }}>Search and verify registrations</p>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter Registration ID (e.g., SS01, CS02, REG0001)"
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  fontSize: '1rem',
                  border: '2px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  outline: 'none',
                  background: 'rgba(255,255,255,0.95)',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4fc3f7'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
              />
              <FaSearch style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#666',
                fontSize: '1.2rem'
              }} />
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              style={{
                padding: '1rem 2rem',
                background: isSearching ? 'rgba(79, 195, 247, 0.6)' : '#4fc3f7',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: isSearching ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {isSearching ? 'Searching...' : (
                <>
                  <FaSearch />
                  Search
                </>
              )}
            </button>
          </div>

          {errorMessage && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              background: '#fee2e2',
              color: '#991b1b',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FaTimes />
              {errorMessage}
            </div>
          )}
        </div>

        {/* Registration Details */}
        {registration && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,245,250,0.95) 100%)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            animation: 'fadeIn 0.5s ease',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              paddingBottom: '1rem',
              borderBottom: '2px solid #e2e8f0'
            }}>
              <h2 style={{ margin: 0, color: '#1a3a52', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem' }}>
                <FaClipboardList style={{ color: '#4fc3f7' }} />
                Registration Details
              </h2>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#4fc3f7',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontWeight: '600'
                    }}
                  >
                    <FaEdit />
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleUpdate}
                      disabled={isSaving}
                      style={{
                        padding: '0.75rem 1.5rem',
                        background: isSaving ? '#94a3b8' : '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: isSaving ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: '600'
                      }}
                    >
                      <FaSave />
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedData(registration);
                      }}
                      style={{
                        padding: '0.75rem 1.5rem',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: '600'
                      }}
                    >
                      <FaTimes />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Two Column Layout */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              {/* Left Column - Basic Info */}
              <div>
                <h3 style={{ color: '#1a3a52', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '700', borderBottom: '2px solid #4fc3f7', paddingBottom: '0.5rem' }}>Basic Information</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#555', display: 'block', marginBottom: '0.3rem' }}>Registration ID</label>
                    <div style={{ padding: '0.75rem', background: '#f0f5fa', borderRadius: '6px', color: '#333', fontWeight: '500' }}>{registration['Registration ID']}</div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#555', display: 'block', marginBottom: '0.3rem' }}>Event Name</label>
                    <div style={{ padding: '0.75rem', background: '#f0f5fa', borderRadius: '6px', color: '#333', fontWeight: '500' }}>{registration['Event Name']}</div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#555', display: 'block', marginBottom: '0.3rem' }}>Team Leader</label>
                    <div style={{ padding: '0.75rem', background: '#f0f5fa', borderRadius: '6px', color: '#333', fontWeight: '500' }}>{registration['Team Leader Name']}</div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#555', display: 'block', marginBottom: '0.3rem' }}>Contact</label>
                    <div style={{ padding: '0.75rem', background: '#f0f5fa', borderRadius: '6px', color: '#333', fontWeight: '500' }}>{registration['Contact']}</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div>
                <h3 style={{ color: '#1a3a52', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '700', borderBottom: '2px solid #4fc3f7', paddingBottom: '0.5rem' }}>Additional Details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#555', display: 'block', marginBottom: '0.3rem' }}>Email</label>
                    <div style={{ padding: '0.75rem', background: '#f0f5fa', borderRadius: '6px', color: '#333', fontWeight: '500', wordBreak: 'break-all' }}>{registration['Email']}</div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#555', display: 'block', marginBottom: '0.3rem' }}>Roll Number</label>
                    <div style={{ padding: '0.75rem', background: '#f0f5fa', borderRadius: '6px', color: '#333', fontWeight: '500' }}>{registration['Roll No']}</div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#555', display: 'block', marginBottom: '0.3rem' }}>Department</label>
                    <div style={{ padding: '0.75rem', background: '#f0f5fa', borderRadius: '6px', color: '#333', fontWeight: '500' }}>{registration['Department']}</div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#555', display: 'block', marginBottom: '0.3rem' }}>Year</label>
                    <div style={{ padding: '0.75rem', background: '#f0f5fa', borderRadius: '6px', color: '#333', fontWeight: '500' }}>{registration['Year']}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* All Participants */}
            {registration['All Participants'] && (
              <div style={{
                background: '#f8fafc',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '2rem'
              }}>
                <h3 style={{ margin: '0 0 1rem', color: '#1e293b' }}>All Team Members</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {parseParticipants(registration['All Participants']).map((participant, index) => (
                    <div
                      key={index}
                      style={{
                        background: 'white',
                        padding: '1rem',
                        borderRadius: '8px',
                        borderLeft: '4px solid #667eea',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: '600', color: '#1e293b' }}>{participant.name}</div>
                        <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                          {participant.rollNo} • {participant.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Checking Section */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '2rem',
              borderRadius: '12px',
              color: 'white'
            }}>
              <h3 style={{ margin: '0 0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FaCheckCircle />
                Event Check-in
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', opacity: 0.9 }}>
                    Checked By *
                  </label>
                  <input
                    type="text"
                    value={checkingData.checkedBy}
                    onChange={(e) => setCheckingData({...checkingData, checkedBy: e.target.value})}
                    placeholder="Enter your name"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      outline: 'none'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', opacity: 0.9 }}>
                    Status
                  </label>
                  <select
                    value={checkingData.status}
                    onChange={(e) => setCheckingData({...checkingData, status: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      outline: 'none'
                    }}
                  >
                    <option value="Present" style={{ color: '#1e293b' }}>Present</option>
                    <option value="Absent" style={{ color: '#1e293b' }}>Absent</option>
                    <option value="Late" style={{ color: '#1e293b' }}>Late</option>
                  </select>
                </div>
              </div>
              
              <button
                onClick={handleInsertChecking}
                disabled={isSaving || !checkingData.checkedBy.trim()}
                style={{
                  marginTop: '1.5rem',
                  width: '100%',
                  padding: '1rem',
                  background: isSaving || !checkingData.checkedBy.trim() ? 'rgba(255,255,255,0.2)' : 'white',
                  color: isSaving || !checkingData.checkedBy.trim() ? 'rgba(255,255,255,0.5)' : '#667eea',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: isSaving || !checkingData.checkedBy.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.3s'
                }}
              >
                <FaCheckCircle />
                {isSaving ? 'Saving Check-in...' : 'Save Check-in Data'}
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default EventChecking;