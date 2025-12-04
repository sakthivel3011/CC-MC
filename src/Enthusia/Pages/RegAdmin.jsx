import React, { useState, useEffect } from 'react';
import { FaUsers, FaCalendarAlt, FaTrophy, FaChartBar, FaSync } from 'react-icons/fa';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RegAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    totalRegistrations: 0,
    totalParticipants: 0,
    activeEvents: 0,
    avgTeamSize: '0.00',
    lastUpdated: new Date().toLocaleString(),
    events: [],
    years: [],
    departments: [],
    categories: [],
    recentRegistrations: []
  });

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyXBVLNKz-i4R0nQJTISt7tCclzqv9NmLuSkn4aFDnQ3Z4eTbA86ApAkAHTDVNYzim7/exec';



  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SCRIPT_URL}?action=getDashboardData`);
      const result = await response.json();
      
      if (result.status === 'success' && result.data) {
        // Ensure all data properties exist with defaults
        setData({
          totalRegistrations: result.data.totalRegistrations || 0,
          totalParticipants: result.data.totalParticipants || 0,
          activeEvents: result.data.activeEvents || 0,
          avgTeamSize: result.data.avgTeamSize || '0.00',
          lastUpdated: result.data.lastUpdated || new Date().toLocaleString(),
          events: Array.isArray(result.data.events) ? result.data.events : [],
          years: Array.isArray(result.data.years) ? result.data.years : [],
          departments: Array.isArray(result.data.departments) ? result.data.departments : [],
          categories: Array.isArray(result.data.categories) ? result.data.categories : [],
          recentRegistrations: Array.isArray(result.data.recentRegistrations) ? result.data.recentRegistrations : []
        });
      } else {
        console.error('Invalid data structure:', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data on component mount
    fetchData();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const COLORS = ['#4169e1', '#50c878', '#ffd700', '#ff6b6b', '#87ceeb', '#ff8c00', '#9370db', '#20b2aa'];



  // Loading State
  if (loading && data.totalRegistrations === 0) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Admin Dashboard - Enthusia Registration</h1>
          <p style={styles.subtitle}>Real-time registration analytics and insights</p>
        </div>
        <div style={styles.headerActions}>
          <button onClick={fetchData} style={styles.refreshBtn} disabled={loading}>
            <FaSync style={loading ? {animation: 'spin 1s linear infinite'} : {}} /> Refresh
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div style={styles.overviewGrid}>
        <div style={{...styles.overviewCard, background: 'linear-gradient(135deg, #4169e1, #1a5f7a)'}}>
          <div style={styles.cardIcon}><FaUsers /></div>
          <div>
            <p style={styles.cardLabel}>Total Registrations</p>
            <h2 style={styles.cardValue}>{data.totalRegistrations}</h2>
          </div>
        </div>
        
        <div style={{...styles.overviewCard, background: 'linear-gradient(135deg, #50c878, #228b22)'}}>
          <div style={styles.cardIcon}><FaUsers /></div>
          <div>
            <p style={styles.cardLabel}>Total Participants</p>
            <h2 style={styles.cardValue}>{data.totalParticipants}</h2>
          </div>
        </div>
        
        <div style={{...styles.overviewCard, background: 'linear-gradient(135deg, #ffd700, #ff8c00)'}}>
          <div style={styles.cardIcon}><FaTrophy /></div>
          <div>
            <p style={styles.cardLabel}>Active Events</p>
            <h2 style={styles.cardValue}>{data.activeEvents}</h2>
          </div>
        </div>
        
        <div style={{...styles.overviewCard, background: 'linear-gradient(135deg, #ff6b6b, #dc143c)'}}>
          <div style={styles.cardIcon}><FaChartBar /></div>
          <div>
            <p style={styles.cardLabel}>Avg Team Size</p>
            <h2 style={styles.cardValue}>{data.avgTeamSize}</h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainGrid}>
        {/* Event-wise Breakdown */}
        {data.events.length > 0 && (
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>🎭 Event-wise Breakdown</h3>
            </div>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={styles.th}>Event Name</th>
                    <th style={styles.th}>Registrations</th>
                    <th style={styles.th}>Participants</th>
                    <th style={styles.th}>Category</th>
                    <th style={styles.th}>Avg Size</th>
                  </tr>
                </thead>
                <tbody>
                  {data.events.map((event, index) => (
                    <tr key={index} style={styles.tableRow}>
                      <td style={styles.td}>{event.name}</td>
                      <td style={styles.td}><span style={styles.badge}>{event.registrations}</span></td>
                      <td style={styles.td}><span style={styles.badge}>{event.participants}</span></td>
                      <td style={styles.td}>{event.category}</td>
                      <td style={styles.td}>{event.avgSize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Charts Section */}
        {(data.categories.length > 0 || data.years.length > 0) && (
          <div style={styles.chartsGrid}>
            {/* Category-wise Statistics */}
            {data.categories.length > 0 && (
              <div style={styles.chartCard}>
                <h3 style={styles.chartTitle}>📊 Category-wise Statistics</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.categories}
                      dataKey="count"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={(entry) => `${entry.category}: ${entry.count}`}
                    >
                      {data.categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Year-wise Analysis */}
            {data.years.length > 0 && (
              <div style={styles.chartCard}>
                <h3 style={styles.chartTitle}>📅 Year-wise Analysis</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.years}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="year" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip contentStyle={{background: '#1a365d', border: 'none', borderRadius: '8px'}} />
                    <Bar dataKey="count" fill="#4169e1" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}

        {/* Department-wise Analysis */}
        {data.departments.length > 0 && (
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>🏛️ Department-wise Analysis</h3>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data.departments} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="#fff" />
                <YAxis dataKey="department" type="category" stroke="#fff" width={100} />
                <Tooltip contentStyle={{background: '#1a365d', border: 'none', borderRadius: '8px'}} />
                <Bar dataKey="count" fill="#50c878" radius={[0, 8, 8, 0]}>
                  {data.departments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index < 3 ? COLORS[index] : '#50c878'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Top Performing Events */}
        {data.events.length > 0 && (
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>🏆 Top Performing Events</h3>
            </div>
            <div style={styles.topEventsGrid}>
              {data.events.slice(0, 5).map((event, index) => (
                <div key={index} style={styles.topEventCard}>
                  <div style={styles.rankBadge}>{index + 1}</div>
                  <div style={styles.topEventContent}>
                    <h4 style={styles.topEventName}>{event.name}</h4>
                    <div style={styles.topEventStats}>
                      <span><FaUsers /> {event.registrations} teams</span>
                      <span><FaTrophy /> {event.participants} participants</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Registrations */}
        {data.recentRegistrations.length > 0 && (
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>📝 Recent Registrations (Last 15)</h3>
            </div>
            <div style={styles.recentList}>
              {data.recentRegistrations.map((reg, index) => (
                <div key={index} style={styles.recentCard}>
                  <div style={styles.recentLeft}>
                    <span style={styles.recentId}>{reg.id}</span>
                    <div>
                      <h4 style={styles.recentName}>{reg.name}</h4>
                      <p style={styles.recentEvent}>{reg.event}</p>
                    </div>
                  </div>
                  <div style={styles.recentRight}>
                    <span style={styles.recentDept}>{reg.department}</span>
                    <span style={styles.recentTime}>{reg.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Participation Trends */}
        {data.events.length > 0 && (
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>📈 Participation Trends</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.events}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#fff" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{background: '#1a365d', border: 'none', borderRadius: '8px'}} />
                <Legend />
                <Line type="monotone" dataKey="registrations" stroke="#4169e1" strokeWidth={2} />
                <Line type="monotone" dataKey="participants" stroke="#50c878" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p>Last Updated: {data.lastUpdated}</p>
        <p>Auto-refresh every 30 seconds</p>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a2540 0%, #1a365d 50%, #1a5f7a 100%)',
    padding: '2rem',
    fontFamily: "'Inter', sans-serif"
  },
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0a2540 0%, #1a365d 50%, #1a5f7a 100%)'
  },
  spinner: {
    width: '60px',
    height: '60px',
    border: '6px solid rgba(255,255,255,0.1)',
    borderTop: '6px solid #4169e1',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  loadingText: {
    color: 'white',
    fontSize: '1.2rem',
    marginTop: '1rem'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '2rem',
    border: '1px solid rgba(255,255,255,0.1)',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  title: {
    color: 'white',
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: '0 0 0.5rem 0'
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    margin: 0,
    fontSize: '1.1rem'
  },
  headerActions: {
    display: 'flex',
    gap: '1rem'
  },
  refreshBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'linear-gradient(135deg, #4169e1, #1a5f7a)',
    color: 'white',
    border: 'none',
    padding: '0.875rem 1.5rem',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    fontFamily: 'inherit'
  },
  overviewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  overviewCard: {
    padding: '1.5rem',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
  },
  cardIcon: {
    fontSize: '3rem',
    color: 'white',
    opacity: 0.9
  },
  cardLabel: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: '0.9rem',
    margin: '0 0 0.5rem 0',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  cardValue: {
    color: 'white',
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: 0
  },
  mainGrid: {
    display: 'grid',
    gap: '2rem'
  },
  section: {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '2rem',
    border: '1px solid rgba(255,255,255,0.1)'
  },
  sectionHeader: {
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid rgba(255,255,255,0.1)'
  },
  sectionTitle: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: '600',
    margin: 0
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    background: 'rgba(65,105,225,0.2)',
    borderRadius: '8px'
  },
  th: {
    padding: '1rem',
    textAlign: 'left',
    color: 'white',
    fontWeight: '600',
    fontSize: '0.95rem'
  },
  tableRow: {
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    transition: 'background 0.3s ease'
  },
  td: {
    padding: '1rem',
    color: 'rgba(255,255,255,0.9)',
    fontSize: '0.95rem'
  },
  badge: {
    background: 'rgba(65,105,225,0.3)',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontWeight: '600'
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '2rem'
  },
  chartCard: {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '2rem',
    border: '1px solid rgba(255,255,255,0.1)'
  },
  chartTitle: {
    color: 'white',
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '1.5rem'
  },
  topEventsGrid: {
    display: 'grid',
    gap: '1rem'
  },
  topEventCard: {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '12px',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'all 0.3s ease'
  },
  rankBadge: {
    width: '50px',
    height: '50px',
    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1a365d'
  },
  topEventContent: {
    flex: 1
  },
  topEventName: {
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: '600',
    margin: '0 0 0.5rem 0'
  },
  topEventStats: {
    display: 'flex',
    gap: '1.5rem',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '0.9rem'
  },
  recentList: {
    display: 'grid',
    gap: '1rem'
  },
  recentCard: {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '12px',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid rgba(255,255,255,0.1)',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  recentLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  recentId: {
    background: 'linear-gradient(135deg, #4169e1, #1a5f7a)',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontWeight: '700',
    color: 'white',
    fontFamily: "'Courier New', monospace"
  },
  recentName: {
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    margin: '0 0 0.25rem 0'
  },
  recentEvent: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '0.85rem',
    margin: 0
  },
  recentRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.25rem'
  },
  recentDept: {
    background: 'rgba(80,200,120,0.2)',
    padding: '0.25rem 0.75rem',
    borderRadius: '6px',
    color: '#50c878',
    fontSize: '0.85rem',
    fontWeight: '600'
  },
  recentTime: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.8rem'
  },
  footer: {
    textAlign: 'center',
    marginTop: '2rem',
    padding: '1.5rem',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '12px',
    color: 'rgba(255,255,255,0.7)'
  }
};

export default RegAdmin
   