import React, { useState, useEffect } from 'react';
import { Download, Search, Award, CheckCircle, AlertCircle, Users, Calendar } from 'lucide-react';

// IMPORTANT: Your Google Sheet MUST be published to web!
const SHEET_ID = '1TjMqDR-cbG_wAdt6MHYxGW_QkbXLXgC1tJ4TxqLFnYU';
const SHEET_NAME = 'Sheet1'; // Change this if your sheet has different name

const CertificatePortal = () => {
  const [searchName, setSearchName] = useState('');
  const [certificates, setCertificates] = useState([]);
  const [filteredCerts, setFilteredCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [stats, setStats] = useState({ total: 0, events: 0 });

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      // Using CSV export method - more reliable
      const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;
      
      const response = await fetch(csvUrl);
      const text = await response.text();
      
      // Parse CSV
      const rows = text.split('\n').map(row => {
        const matches = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        return matches ? matches.map(cell => cell.replace(/^"|"$/g, '').trim()) : [];
      });
      
      // Skip header row and create certificate objects
      const certsData = rows.slice(1)
        .filter(row => row.length >= 3 && row[0] && row[2])
        .map(row => ({
          name: row[0] || '',
          event: row[1] || 'General Event',
          driveUrl: row[2] || '',
          date: row[3] || ''
        }));
      
      setCertificates(certsData);
      setFilteredCerts(certsData);
      
      // Calculate stats
      const uniqueEvents = [...new Set(certsData.map(c => c.event))];
      setStats({
        total: certsData.length,
        events: uniqueEvents.length
      });
      
      setLoading(false);
      
      if (certsData.length === 0) {
        setMessage({ 
          type: 'error', 
          text: 'No certificates found. Please check Google Sheet setup.' 
        });
      }
    } catch (error) {
      console.error('Error fetching certificates:', error);
      setMessage({ 
        type: 'error', 
        text: 'Failed to load certificates. Check console for details.' 
      });
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchName(value);
    if (value.trim() === '') {
      setFilteredCerts(certificates);
    } else {
      const filtered = certificates.filter(cert =>
        cert.name.toLowerCase().includes(value.toLowerCase()) ||
        cert.event.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCerts(filtered);
    }
  };

  const getDirectDownloadLink = (driveUrl) => {
    // Extract file ID from various Google Drive URL formats
    let fileId = '';
    
    if (driveUrl.includes('/file/d/')) {
      fileId = driveUrl.split('/file/d/')[1].split('/')[0];
    } else if (driveUrl.includes('id=')) {
      fileId = driveUrl.split('id=')[1].split('&')[0];
    } else if (driveUrl.includes('/open?id=')) {
      fileId = driveUrl.split('/open?id=')[1].split('&')[0];
    } else {
      const match = driveUrl.match(/[-\w]{25,}/);
      if (match) fileId = match[0];
    }
    
    return fileId ? `https://drive.google.com/uc?export=download&id=${fileId}` : driveUrl;
  };

  const handleDownload = async (cert, index) => {
    setDownloading(index);
    try {
      const downloadUrl = getDirectDownloadLink(cert.driveUrl);
      
      // Open in new tab for download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.target = '_blank';
      link.download = `${cert.name}_${cert.event}_Certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setMessage({ 
        type: 'success', 
        text: `🎉 Certificate for ${cert.name} is downloading!` 
      });
      
      setTimeout(() => setMessage({ type: '', text: '' }), 4000);
    } catch (error) {
      console.error('Download error:', error);
      setMessage({ 
        type: 'error', 
        text: 'Download failed. Please check the Drive link.' 
      });
    }
    setTimeout(() => setDownloading(null), 1000);
  };

  const groupByEvent = () => {
    const grouped = {};
    filteredCerts.forEach(cert => {
      if (!grouped[cert.event]) {
        grouped[cert.event] = [];
      }
      grouped[cert.event].push(cert);
    });
    return grouped;
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loaderRing}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p style={styles.loadingText}>Loading Certificates...</p>
        <p style={styles.loadingSubtext}>Please wait while we fetch your data</p>
      </div>
    );
  }

  const groupedCerts = groupByEvent();

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.bgAnimation}>
        <div style={styles.bgCircle1}></div>
        <div style={styles.bgCircle2}></div>
        <div style={styles.bgCircle3}></div>
      </div>

      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroGlow}></div>
        <div style={styles.heroContent}>
          
          <h1 style={styles.title}>
            <span style={styles.titleGradient}></span>
            <span style={styles.titleWhite}>Certificate Portal</span>
          </h1>
          <p style={styles.subtitle}>Your Achievements, One Click Away</p>
          
          {/* Stats */}
          <div style={styles.statsContainer}>
            <div style={styles.statCard}>
              <Users size={24} />
              <div>
                <div style={styles.statNumber}>{stats.total}</div>
                <div style={styles.statLabel}>Certificates</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <Calendar size={24} />
              <div>
                <div style={styles.statNumber}>{stats.events}</div>
                <div style={styles.statLabel}>Events</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div style={styles.searchSection}>
        <div style={styles.searchWrapper}>
          <div style={styles.searchContainer}>
            <Search size={22} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by name or event..."
              value={searchName}
              onChange={(e) => handleSearch(e.target.value)}
              style={styles.searchInput}
            />
            {searchName && (
              <button 
                onClick={() => handleSearch('')}
                style={styles.clearBtn}
              >
                ✕
              </button>
            )}
          </div>
          <div style={styles.resultCount}>
            <span style={styles.resultNumber}>{filteredCerts.length}</span> results found
          </div>
        </div>
      </div>

      {/* Message Alert */}
      {message.text && (
        <div style={{
          ...styles.message,
          backgroundColor: message.type === 'success' 
            ? 'rgba(80, 200, 120, 0.15)' 
            : 'rgba(255, 100, 100, 0.15)',
          borderLeft: `4px solid ${message.type === 'success' ? 'var(--enthusia-green)' : 'var(--enthusia-red)'}`
        }}>
          {message.type === 'success' ? 
            <CheckCircle size={22} color="var(--enthusia-green)" /> : 
            <AlertCircle size={22} color="var(--enthusia-red)" />
          }
          <span>{message.text}</span>
        </div>
      )}

      {/* Certificates Grid */}
      <div style={styles.certificatesContainer}>
        {Object.keys(groupedCerts).length === 0 ? (
          <div style={styles.noResults}>
            <div style={styles.noResultsIcon}>
              <Search size={60} />
            </div>
            <h3 style={styles.noResultsTitle}>No Certificates Found</h3>
            <p style={styles.noResultsText}>
              Try searching with a different name or event
            </p>
            <button 
              onClick={() => handleSearch('')}
              style={styles.resetButton}
            >
              Show All Certificates
            </button>
          </div>
        ) : (
          Object.entries(groupedCerts).map(([event, certs], eventIndex) => (
            <div key={event} style={styles.eventSection}>
              <div style={styles.eventHeader}>
                <div style={styles.eventTitleWrapper}>
                  <div style={styles.eventIcon}>
                    <Award size={28} />
                  </div>
                  <h2 style={styles.eventTitle}>{event}</h2>
                </div>
                <div style={styles.eventCount}>{certs.length} Certificates</div>
              </div>
              
              <div style={styles.certificateGrid}>
                {certs.map((cert, index) => (
                  <div key={index} style={styles.certCard}>
                    <div style={styles.certCardInner}>
                      <div style={styles.certTop}>
                        <div style={styles.certIconBadge}>
                          <Award size={32} strokeWidth={2.5} />
                        </div>
                        <div style={styles.certCorner}></div>
                      </div>
                      
                      <div style={styles.certContent}>
                        <h3 style={styles.certName}>{cert.name}</h3>
                        {cert.date && (
                          <div style={styles.certDate}>
                            <Calendar size={14} />
                            <span>{cert.date}</span>
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleDownload(cert, `${eventIndex}-${index}`)}
                        disabled={downloading === `${eventIndex}-${index}`}
                        style={{
                          ...styles.downloadBtn,
                          opacity: downloading === `${eventIndex}-${index}` ? 0.7 : 1,
                          cursor: downloading === `${eventIndex}-${index}` ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {downloading === `${eventIndex}-${index}` ? (
                          <>
                            <div style={styles.btnLoader}></div>
                            <span>Downloading...</span>
                          </>
                        ) : (
                          <>
                            <Download size={20} strokeWidth={2.5} />
                            <span>Download Certificate</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p style={styles.footerText}>
            © 2024 Enthusia | All certificates are digitally verified
          </p>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a1929 0%, #0d2137 50%, #1a365d 100%)',
    fontFamily: "'Poppins', 'Inter', sans-serif",
    position: 'relative',
    overflow: 'hidden'
  },
  bgAnimation: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 0
  },
  bgCircle1: {
    position: 'absolute',
    top: '-10%',
    right: '-5%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 20s ease-in-out infinite'
  },
  bgCircle2: {
    position: 'absolute',
    bottom: '-15%',
    left: '-10%',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(65,105,225,0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 25s ease-in-out infinite reverse'
  },
  bgCircle3: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(255,105,180,0.05) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'pulse 15s ease-in-out infinite'
  },
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #0a1929 0%, #1a365d 100%)'
  },
  loaderRing: {
    display: 'inline-block',
    position: 'relative',
    width: '80px',
    height: '80px'
  },
  loadingText: {
    color: '#fff',
    marginTop: '30px',
    fontSize: '20px',
    fontWeight: '600'
  },
  loadingSubtext: {
    color: 'rgba(255,255,255,0.6)',
    marginTop: '8px',
    fontSize: '14px'
  },
  hero: {
    padding: '100px 20px 80px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1
  },
  heroGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)',
    pointerEvents: 'none',
    filter: 'blur(60px)'
  },
  heroContent: {
    position: 'relative',
    maxWidth: '900px',
    margin: '0 auto'
  },
  awardIconContainer: {
    display: 'inline-flex',
    padding: '25px',
    background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,165,0,0.2))',
    borderRadius: '50%',
    color: '#FFD700',
    marginBottom: '30px',
    boxShadow: '0 0 50px rgba(255,215,0,0.3), inset 0 0 20px rgba(255,215,0,0.1)',
    animation: 'glow 3s ease-in-out infinite'
  },
  title: {
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    fontWeight: '900',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    lineHeight: '1.2'
  },
  titleGradient: {
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 0 30px rgba(255,215,0,0.5)'
  },
  titleWhite: {
    color: '#fff',
    textShadow: '2px 2px 20px rgba(0,0,0,0.5)'
  },
  subtitle: {
    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '400',
    marginBottom: '50px',
    letterSpacing: '1px'
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap'
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '20px 35px',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    minWidth: '180px',
    transition: 'all 0.3s ease'
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  statLabel: {
    fontSize: '13px',
    opacity: 0.8,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: '500'
  },
  searchSection: {
    position: 'relative',
    zIndex: 1,
    padding: '0 20px 50px'
  },
  searchWrapper: {
    maxWidth: '700px',
    margin: '0 auto'
  },
  searchContainer: {
    position: 'relative',
    marginBottom: '15px'
  },
  searchIcon: {
    position: 'absolute',
    left: '25px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgba(255,215,0,0.7)',
    pointerEvents: 'none'
  },
  searchInput: {
    width: '100%',
    padding: '20px 60px 20px 65px',
    fontSize: '17px',
    border: '2px solid rgba(255,255,255,0.1)',
    borderRadius: '60px',
    backgroundColor: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(10px)',
    color: '#fff',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
  },
  clearBtn: {
    position: 'absolute',
    right: '25px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    color: '#fff',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    transition: 'all 0.3s ease'
  },
  resultCount: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '15px',
    fontWeight: '500'
  },
  resultNumber: {
    color: '#FFD700',
    fontWeight: '700',
    fontSize: '18px'
  },
  message: {
    maxWidth: '700px',
    margin: '0 auto 40px',
    padding: '18px 25px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    fontSize: '15px',
    fontWeight: '500',
    color: '#fff',
    backdropFilter: 'blur(10px)',
    marginLeft: '20px',
    marginRight: '20px',
    zIndex: 1,
    position: 'relative',
    animation: 'slideIn 0.4s ease-out'
  },
  certificatesContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px 60px',
    position: 'relative',
    zIndex: 1
  },
  eventSection: {
    marginBottom: '60px'
  },
  eventHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '15px'
  },
  eventTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  eventIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,165,0,0.2))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFD700',
    border: '2px solid rgba(255,215,0,0.3)'
  },
  eventTitle: {
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    color: '#fff',
    fontWeight: '800',
    margin: 0
  },
  eventCount: {
    padding: '10px 20px',
    background: 'rgba(255,215,0,0.15)',
    borderRadius: '30px',
    color: '#FFD700',
    fontSize: '14px',
    fontWeight: '600',
    border: '1px solid rgba(255,215,0,0.3)'
  },
  certificateGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '30px'
  },
  certCard: {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    border: '1px solid rgba(255,255,255,0.1)',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    position: 'relative'
  },
  certCardInner: {
    padding: '30px',
    position: 'relative'
  },
  certTop: {
    position: 'relative',
    marginBottom: '25px'
  },
  certIconBadge: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#0a1929',
    margin: '0 auto',
    boxShadow: '0 8px 30px rgba(255,215,0,0.4), inset 0 -2px 10px rgba(0,0,0,0.2)',
    position: 'relative',
    zIndex: 1
  },
  certCorner: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '60px',
    height: '60px',
    background: 'linear-gradient(135deg, transparent 50%, rgba(255,215,0,0.1) 50%)',
    borderRadius: '0 24px 0 0'
  },
  certContent: {
    textAlign: 'center',
    marginBottom: '25px',
    minHeight: '80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  certName: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '12px',
    lineHeight: '1.3'
  },
  certDate: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '14px',
    fontWeight: '500'
  },
  downloadBtn: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #1a5f7a 0%, #4169e1 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '14px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(26,95,122,0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  btnLoader: {
    width: '18px',
    height: '18px',
    border: '3px solid rgba(255,255,255,0.3)',
    borderTop: '3px solid #fff',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  },
  noResults: {
    textAlign: 'center',
    padding: '100px 20px',
    color: '#fff'
  },
  noResultsIcon: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 30px',
    color: 'rgba(255,255,255,0.4)'
  },
  noResultsTitle: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '15px'
  },
  noResultsText: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '30px'
  },
  resetButton: {
    padding: '14px 35px',
    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
    color: '#0a1929',
    border: 'none',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(255,215,0,0.4)'
  },
  footer: {
    padding: '40px 20px',
    textAlign: 'center',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    position: 'relative',
    zIndex: 1
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  footerText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '14px',
    margin: 0
  }
};

// Enhanced CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-30px); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); }
    50% { transform: translate(-50%, -50%) scale(1.1); }
  }
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 30px rgba(255,215,0,0.3), inset 0 0 20px rgba(255,215,0,0.1); }
    50% { box-shadow: 0 0 60px rgba(255,215,0,0.5), inset 0 0 30px rgba(255,215,0,0.2); }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .loaderRing div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 6px solid #FFD700;
    border-radius: 50%;
    animation: loaderRing 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #FFD700 transparent transparent transparent;
  }
  
  .loaderRing div:nth-child(1) {
    animation-delay: -0.45s;
  }
  
  .loaderRing div:nth-child(2) {
    animation-delay: -0.3s;
  }
  
  .loaderRing div:nth-child(3) {
    animation-delay: -0.15s;
  }
  
  @keyframes loaderRing {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  input[type="text"]:focus {
    border-color: rgba(255,215,0,0.5) !important;
    box-shadow: 0 0 0 4px rgba(255,215,0,0.1), 0 8px 30px rgba(0,0,0,0.3) !important;
  }
  
  input[type="text"]::placeholder {
    color: rgba(255,255,255,0.4);
  }
  
  .certCard:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: rgba(255,215,0,0.4) !important;
    box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(255,215,0,0.2) !important;
    background: rgba(255,255,255,0.08) !important;
  }
  
  .certCard:hover .certIconBadge {
    transform: rotate(360deg) scale(1.1);
    box-shadow: 0 12px 40px rgba(255,215,0,0.6), inset 0 -2px 10px rgba(0,0,0,0.3) !important;
  }
  
  .downloadBtn:hover:not(:disabled) {
    background: linear-gradient(135deg, #4169e1 0%, #1a5f7a 100%) !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(65,105,225,0.5) !important;
  }
  
  .downloadBtn:active:not(:disabled) {
    transform: translateY(0);
  }
  
  .clearBtn:hover {
    background: rgba(255,255,255,0.2) !important;
    transform: scale(1.1);
  }
  
  .statCard:hover {
    background: rgba(255,255,255,0.08) !important;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(255,215,0,0.2);
  }
  
  .resetButton:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 30px rgba(255,215,0,0.6) !important;
  }
  
  .certIconBadge {
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .certificateGrid {
      grid-template-columns: 1fr !important;
    }
    
    .statsContainer {
      flex-direction: column;
    }
    
    .statCard {
      width: 100%;
      max-width: 300px;
    }
    
    .eventHeader {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .searchInput {
      font-size: 16px !important;
    }
  }
  
  @media (max-width: 480px) {
    .certCard {
      margin: 0 auto;
      max-width: 100%;
    }
    
    .bgCircle1, .bgCircle2, .bgCircle3 {
      width: 300px !important;
      height: 300px !important;
    }
  }
  
  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
  
  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 12px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(10, 25, 41, 0.5);
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #FFD700, #FFA500);
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #FFA500, #FFD700);
  }
`;
document.head.appendChild(styleSheet);

export default CertificatePortal;