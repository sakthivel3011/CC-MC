import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Search, RefreshCw, Filter, TrendingUp, Users, Building2, FileText, Lock, Eye } from 'lucide-react';

const colors = {
  darkBlue: '#1a365d',
  enthusiaBlue: '#1a5f7a',
  accent: '#4fd1c5',
  success: '#48bb78',
  error: '#fc8181',
  warning: '#f6ad55',
  chartColors: ['#4fd1c5', '#1a5f7a', '#48bb78', '#f6ad55', '#fc8181', '#805ad5', '#38b2ac', '#ed64a6']
};

const BAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('All Events');
  const [showAccountNumbers, setShowAccountNumbers] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    totalEvents: 0,
    totalBanks: 0,
    eventWiseCount: [],
    bankWiseCount: [],

  });

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbydaRa_ixkyPScAVR1g9kurkwPihppnkv30mZY76DmQxcH0sp_Y0z1rkphGkYKGWSKa/exec';

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    filterData();
  }, [searchTerm, selectedEvent, registrations]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getAll`);
      const data = await response.json();
      
      if (data.status === 'success') {
        setRegistrations(data.registrations);
        calculateStats(data.registrations);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const eventCounts = {};
    const bankCounts = {};
    
    data.forEach(reg => {
      eventCounts[reg.eventName] = (eventCounts[reg.eventName] || 0) + 1;
      bankCounts[reg.bankName] = (bankCounts[reg.bankName] || 0) + 1;
    });

    const eventWiseCount = Object.keys(eventCounts).map(event => ({
      name: event.replace('ENTHUSIA 2026 - ', ''),
      count: eventCounts[event]
    }));

    const bankWiseCount = Object.keys(bankCounts).map(bank => ({
      name: bank.split(' ')[0],
      value: bankCounts[bank]
    }));

    setStats({
      totalRegistrations: data.length,
      totalEvents: Object.keys(eventCounts).length,
      totalBanks: Object.keys(bankCounts).length,
      eventWiseCount,
      bankWiseCount
    });
  };

  const filterData = () => {
    let filtered = registrations;

    if (selectedEvent !== 'All Events') {
      filtered = filtered.filter(reg => reg.eventName === selectedEvent);
    }

    if (searchTerm) {
      filtered = filtered.filter(reg =>
        (reg.teamId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (reg.leaderName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (reg.rollNo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (reg.email || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber || typeof accountNumber !== 'string') return '';
    const visible = accountNumber.slice(-4);
    return '●●●●●●' + visible;
  };

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
    // Remove any non-numeric characters
    const cleaned = phoneNumber.toString().replace(/\D/g, '');
    
    // Format as XXX-XXX-XXXX if 10 digits, or return as is if different length
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phoneNumber;
  };

  const exportToCSV = () => {
    const headers = [
      'Timestamp', 'Event Name', 'Roll Number', 'Team ID', 'Leader Name',
      'Phone Number', 'Email', 'Account Holder Name', 'Bank Name',
      'Account Number', 'IFSC Code', 'Branch Name', 'Account Type'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredData.map(reg => [
        new Date(reg.timestamp).toLocaleString(),
        reg.eventName,
        reg.rollNo,
        reg.teamId,
        reg.leaderName,
        reg.phoneNumber,
        reg.email,
        reg.accountHolderName,
        reg.bankName,
        reg.accountNumber,
        reg.ifscCode,
        reg.branchName,
        reg.accountType
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bank-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const uniqueEvents = ['All Events', ...new Set(registrations.map(r => r.eventName))];

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.darkBlue} 0%, #0f2940 50%, ${colors.enthusiaBlue} 100%)`,
      padding: windowWidth < 768 ? '15px' : '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 30px',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '15px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          padding: '15px 30px',
          borderRadius: '50px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '20px'
        }}>
          <Lock size={24} color={colors.accent} />
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ margin: 0, color: 'white', fontSize: '16px', fontWeight: '600' }}>
              🔒 Admin Dashboard
            </h3>
            <p style={{ margin: '3px 0 0', color: colors.accent, fontSize: '13px', fontWeight: '500' }}>
              Secure Access Only
            </p>
          </div>
        </div>

        <h1 style={{
          margin: '0 0 10px',
          color: 'white',
          fontSize: windowWidth < 768 ? 'clamp(20px, 5vw, 28px)' : 'clamp(28px, 5vw, 42px)',
          fontWeight: '700',
          letterSpacing: '-0.5px'
        }}>
        Bank Registrations
        </h1>
      </div>

      {/* Stats Cards */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 30px',
        display: 'grid',
        gridTemplateColumns: windowWidth < 768 ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '25px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.enthusiaBlue})`,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Users size={24} color="white" />
            </div>
            <div>
              <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Total Registrations</p>
              <h2 style={{ margin: '5px 0 0', color: 'white', fontSize: '32px', fontWeight: '700' }}>
                {stats.totalRegistrations}
              </h2>
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '25px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: `linear-gradient(135deg, ${colors.success}, #2f855a)`,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText size={24} color="white" />
            </div>
            <div>
              <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Active Events</p>
              <h2 style={{ margin: '5px 0 0', color: 'white', fontSize: '32px', fontWeight: '700' }}>
                {stats.totalEvents}
              </h2>
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '25px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: `linear-gradient(135deg, ${colors.warning}, #dd6b20)`,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Building2 size={24} color="white" />
            </div>
            <div>
              <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Unique Banks</p>
              <h2 style={{ margin: '5px 0 0', color: 'white', fontSize: '32px', fontWeight: '700' }}>
                {stats.totalBanks}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 30px',
        display: 'grid',
        gridTemplateColumns: windowWidth < 768 ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px'
      }}>
        {/* Bar Chart */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '25px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px', color: 'white', fontSize: '18px', fontWeight: '600' }}>
            Event-wise Registrations
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.eventWiseCount}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip 
                contentStyle={{ 
                  background: colors.darkBlue, 
                  border: '1px solid rgba(79, 209, 197, 0.3)',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Bar dataKey="count" fill={colors.accent} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '25px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px', color: 'white', fontSize: '18px', fontWeight: '600' }}>
            Bank Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.bankWiseCount || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {(stats.bankWiseCount || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors.chartColors[index % colors.chartColors.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  background: colors.darkBlue, 
                  border: '1px solid rgba(79, 209, 197, 0.3)',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 20px',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        padding: '25px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: windowWidth < 768 ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '15px',
          marginBottom: '15px'
        }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search 
              size={20} 
              color="rgba(255, 255, 255, 0.5)" 
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search by Team ID, Name, Roll No..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px 14px 48px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '15px',
                outline: 'none'
              }}
            />
          </div>

          {/* Event Filter */}
          <div style={{ position: 'relative' }}>
            <Filter 
              size={20} 
              color="rgba(255, 255, 255, 0.5)" 
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
            />
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px 14px 48px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '15px',
                outline: 'none',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234fd1c5' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 16px center'
              }}
            >
              {uniqueEvents.map(event => (
                <option key={event} value={event} style={{ background: colors.darkBlue }}>
                  {event}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: windowWidth < 768 ? 'center' : 'flex-start' }}>
          <button
            onClick={fetchData}
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: loading ? 'rgba(255, 255, 255, 0.1)' : colors.accent,
              color: loading ? 'rgba(255, 255, 255, 0.5)' : colors.darkBlue,
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <RefreshCw size={18} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
            Refresh
          </button>


        </div>
      </div>

      {/* Data Table */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        fontSize: windowWidth < 768 ? '12px' : '14px'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1200px' }}>
            <thead>
              <tr style={{ background: colors.enthusiaBlue }}>
                {['Team ID', 'Event', 'Leader', 'Roll No', 'Phone', 'Email', 'Bank', 'Account Number', 'IFSC', 'Branch', 'Type', 'Image'].map(header => (
                  <th key={header} style={{
                    padding: windowWidth < 768 ? '10px 6px' : '16px 12px',
                    textAlign: 'left',
                    color: 'white',
                    fontSize: windowWidth < 768 ? '11px' : '14px',
                    fontWeight: '600',
                    whiteSpace: 'nowrap'
                  }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="12" style={{ padding: '40px', textAlign: 'center', color: 'white' }}>
                    <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite', marginBottom: '10px' }} />
                    <p>Loading data...</p>
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="12" style={{ padding: '40px', textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }}>
                    No registrations found
                  </td>
                </tr>
              ) : (
                filteredData.slice(-5).map((reg, index) => (
                  <tr key={index} style={{
                    background: index % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    <td style={{ padding: windowWidth < 768 ? '8px 6px' : '12px', color: colors.accent, fontWeight: '600', whiteSpace: 'nowrap' }}>
                      {reg.teamId}
                    </td>
                    <td style={{ padding: windowWidth < 768 ? '8px 6px' : '12px', color: 'white', fontSize: windowWidth < 768 ? '11px' : '13px', maxWidth: '200px' }}>
                      {reg.eventName.replace('ENTHUSIA 2026 - ', '')}
                    </td>
                    <td style={{ padding: windowWidth < 768 ? '8px 6px' : '12px', color: 'white', whiteSpace: 'nowrap' }}>{reg.leaderName}</td>
                    <td style={{ padding: windowWidth < 768 ? '8px 6px' : '12px', color: 'white', whiteSpace: 'nowrap' }}>{reg.rollNo}</td>
                    <td style={{ padding: windowWidth < 768 ? '8px 6px' : '12px', color: 'white', fontFamily: 'monospace', fontSize: windowWidth < 768 ? '10px' : '13px', minWidth: '130px', whiteSpace: 'nowrap' }}>{formatPhoneNumber(reg.phoneNumber)}</td>
                    <td style={{ padding: windowWidth < 768 ? '8px 6px' : '12px', color: 'white', fontSize: windowWidth < 768 ? '11px' : '13px', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {reg.email}
                    </td>
                    <td style={{ padding: windowWidth < 768 ? '8px 6px' : '12px', color: 'white', whiteSpace: 'nowrap' }}>
                      {reg.bankName.split(' ')[0]}
                    </td>
                    <td style={{ padding: windowWidth < 768 ? '8px 6px' : '12px', color: colors.warning, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                      {maskAccountNumber(reg.accountNumber)}
                    </td>
                    <td style={{ padding: windowWidth < 768 ? '8px 6px' : '12px', color: 'white', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                      {reg.ifscCode}
                    </td>
                    <td style={{ padding: windowWidth < 768 ? '8px 6px' : '12px', color: 'white', whiteSpace: 'nowrap' }}>{reg.branchName}</td>
                    <td style={{ padding: windowWidth < 768 ? '8px 6px' : '12px', color: 'white', whiteSpace: 'nowrap' }}>{reg.accountType}</td>
                    <td style={{ padding: windowWidth < 768 ? '8px 6px' : '12px' }}>
                      {reg.passbookImageUrl ? (
                        <a
                          href={reg.passbookImageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: windowWidth < 768 ? '4px 8px' : '6px 12px',
                            background: colors.accent,
                            color: colors.darkBlue,
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontSize: windowWidth < 768 ? '10px' : '12px',
                            fontWeight: '600',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <Eye size={14} /> View
                        </a>
                      ) : (
                        <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '12px' }}>N/A</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        input:focus, select:focus {
          border-color: ${colors.accent} !important;
          box-shadow: 0 0 0 3px rgba(79, 209, 197, 0.1) !important;
        }

        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        ::-webkit-scrollbar-thumb {
          background: ${colors.accent};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${colors.enthusiaBlue};
        }
      `}</style>
    </div>
  );
};

export default BAdmin;