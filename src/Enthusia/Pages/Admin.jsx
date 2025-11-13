import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, Shield, Users, Award, BarChart3, Settings, LogOut, Database, UserCog, Trophy, TrendingUp } from 'lucide-react';

const AdminHub = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState('');

  // Check for existing login on component mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('enthusiaAuth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsLoggedIn(true);
      setUserRole(authData.role);
    }
  }, []);

  // Credentials for different roles (only admin and students)
  const credentials = {
    admin: { username: 'admin', password: 'admin123', role: 'Admin' },
    students: { username: 'students', password: 'students123', role: 'Students' }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const validUser = Object.values(credentials).find(
      cred => cred.username === username && cred.password === password
    );

    if (validUser) {
      setIsLoggedIn(true);
      setUserRole(validUser.role);
      
      // Save login state to localStorage
      localStorage.setItem('enthusiaAuth', JSON.stringify({
        role: validUser.role,
        username: validUser.username,
        loginTime: new Date().getTime()
      }));
    } else {
      setError('Invalid username or password');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setUserRole('');
    setShowPassword(false);
    
    // Clear login state from localStorage
    localStorage.removeItem('enthusiaAuth');
  };

  const adminPages = [
    {
      id: 1,
      title: 'Registration Admin',
      description: 'View all events, registrations and reports',
      icon: Database,
      color: 'var(--enthusia-royal-blue)',
      glowColor: 'var(--enthusia-glow-blue)',
      access: ['Admin', 'Students'],
      route: '/enthusia/z1x2c3v4b5n6m7a8s9d0f1g2h3j4k5l6q7w8e9r0t1q9w8e7r6t5y4u'
    },
    {
      id: 2,
      title: 'Bank Admin',
      description: 'Manage bank details and Registration',
      icon: Database,
      color: 'var(--enthusia-emerald)',
      glowColor: 'var(--enthusia-glow-green)',
      access: ['Admin'],
      route: '/enthusia/z9x8c7v6b5n4m3a2s1d0f1g2h3j4k5l6q7w8q1a0s9d8f7g6h5j4k3l2m1n0b9v'
    },
    {
      id: 3,
      title: 'Results',
      description: 'View event results and rankings',
      icon: TrendingUp,
      color: 'var(--enthusia-gold)',
      glowColor: 'var(--enthusia-glow-gold)',
      access: ['Admin', 'Students'],
      route: '/enthusia/result'
    },
    {
      id: 4,
      title: 'Points Management',
      description: 'Track and update event scores and leaderboard',
      icon: Trophy,
      color: 'var(--enthusia-gold)',
      glowColor: 'var(--enthusia-glow-gold)',
      access: ['Admin', 'Students'],
      route: '/enthusia/k8j9h5g6f4d3s2a1z0x9c8v7b6n5m4q3w2e1r9t8y7u6i5o4p3a2s1d0f9g8h7j6k5l4'
    },
    {
      id: 5,
      title: 'Slot Booking',
      description: 'Book time slots for events',
      icon: Settings,
      color: 'var(--enthusia-royal-blue)',
      glowColor: 'var(--enthusia-glow-blue)',
      access: ['Admin', 'Students'],
      route: '/enthusia/slotbooking'
    },
    {
      id: 6,
      title: 'Preliminaries',
      description: 'Preliminary round information and results',
      icon: BarChart3,
      color: 'var(--enthusia-sky-blue)',
      glowColor: 'var(--enthusia-glow-blue)',
      access: ['Admin', 'Students'],
      route: '/enthusia/prelims'
    },
    {
      id: 7,
      title: 'Certificate',
      description: 'View and download certificates',
      icon: Award,
      color: 'var(--enthusia-coral)',
      glowColor: 'var(--enthusia-glow-red)',
      access: ['Admin', 'Students'],
      route: '/enthusia/certificate'
    },
    {
      id: 8,
      title: 'Event Rules',
      description: 'View competition rules and regulations',
      icon: Shield,
      color: 'var(--enthusia-coral)',
      glowColor: 'var(--enthusia-glow-red)',
      access: ['Admin', 'Students'],
      route: '/enthusia/rules'
    },
    {
      id: 9,
      title: 'Staff Portal',
      description: 'Manage daily operations and event coordination',
      icon: Users,
      color: 'var(--enthusia-emerald)',
      glowColor: 'var(--enthusia-glow-green)',
      access: ['Admin'],
      route: '/enthusia/staff'
    },
    {
      id: 10,
      title: 'Event Coordinator',
      description: 'Event coordination and team management',
      icon: UserCog,
      color: 'var(--enthusia-sky-blue)',
      glowColor: 'var(--enthusia-glow-blue)',
      access: ['Admin', 'Students'],
      route: '/enthusia/ec'
    },
    {
      id: 11,
      title: 'Contact Support',
      description: 'Get help and support for events',
      icon: Shield,
      color: 'var(--enthusia-coral)',
      glowColor: 'var(--enthusia-glow-red)',
      access: ['Admin', 'Students'],
      route: '/enthusia/contact'
    }
  ];

  const hasAccess = (page) => {
    return page.access.includes(userRole);
  };

  if (!isLoggedIn) {
    return (
      <>
        <style>{`
          :root {
            --enthusia-navy: #0a2540;
            --enthusia-dark-blue: #1a365d;
            --enthusia-blue: #1a5f7a;
            --enthusia-royal-blue: #4169e1;
            --enthusia-sky-blue: #87ceeb;
            --enthusia-light-blue: #e1f5fe;
            --enthusia-gold: #ffd700;
            --enthusia-dark-gold: #b8860b;
            --enthusia-light-gold: #fff9c4;
            --enthusia-coral: #ff7f50;
            --enthusia-emerald: #50c878;
            --enthusia-white: #ffffff;
            --enthusia-red: #c41e3a;
            --enthusia-dark-gray: #2d3748;
            --enthusia-glow-gold: 0 0 20px rgba(255, 215, 0, 0.3);
            --enthusia-glow-blue: 0 0 20px rgba(65, 105, 225, 0.3);
            --enthusia-glow-green: 0 0 20px rgba(34, 139, 34, 0.3);
            --enthusia-glow-red: 0 0 20px rgba(220, 20, 60, 0.3);
            --enthusia-shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.3);
            --enthusia-shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.4);
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .ADMIN-login-container {
            min-height: 100vh;
            background: linear-gradient(135deg, var(--enthusia-navy) 0%, var(--enthusia-dark-blue) 50%, var(--enthusia-blue) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            position: relative;
            overflow: hidden;
          }

          .ADMIN-login-container::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
            animation: ADMIN-pulse 15s ease-in-out infinite;
          }

          @keyframes ADMIN-pulse {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
            50% { transform: scale(1.2) rotate(180deg); opacity: 0.6; }
          }

          .ADMIN-login-box {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            border: 2px solid rgba(255, 215, 0, 0.3);
            border-radius: 25px;
            padding: 3rem 2.5rem;
            width: 100%;
            max-width: 450px;
            box-shadow: var(--enthusia-shadow-xl);
            animation: ADMIN-slideUp 0.8s ease-out;
            position: relative;
            z-index: 1;
          }

          @keyframes ADMIN-slideUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .ADMIN-login-header {
            text-align: center;
            margin-bottom: 2.5rem;
          }

          .ADMIN-logo {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, var(--enthusia-gold), var(--enthusia-dark-gold));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            box-shadow: var(--enthusia-glow-gold), var(--enthusia-shadow-lg);
            animation: ADMIN-rotate 3s ease-in-out infinite;
          }

          @keyframes ADMIN-rotate {
            0%, 100% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
          }

          .ADMIN-title {
            font-size: 2rem;
            font-weight: 800;
            background: linear-gradient(135deg, var(--enthusia-gold), var(--enthusia-light-gold));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 0.5rem;
            letter-spacing: 1px;
          }

          .ADMIN-subtitle {
            color: var(--enthusia-sky-blue);
            font-size: 0.95rem;
            font-weight: 300;
            letter-spacing: 0.5px;
          }

          .ADMIN-form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .ADMIN-input-group {
            position: relative;
          }

          .ADMIN-label {
            display: block;
            color: var(--enthusia-light-gold);
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .ADMIN-input-wrapper {
            position: relative;
          }

          .ADMIN-input {
            width: 100%;
            padding: 1rem 1rem 1rem 3rem;
            border: 2px solid rgba(255, 215, 0, 0.3);
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.05);
            color: var(--enthusia-white);
            font-size: 1rem;
            transition: all 0.3s ease;
            outline: none;
          }

          .ADMIN-input:focus {
            border-color: var(--enthusia-gold);
            box-shadow: var(--enthusia-glow-gold);
            background: rgba(255, 255, 255, 0.1);
          }

          .ADMIN-input::placeholder {
            color: rgba(255, 255, 255, 0.4);
          }

          .ADMIN-input-icon {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--enthusia-gold);
            pointer-events: none;
          }

          .ADMIN-eye-icon {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--enthusia-gold);
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .ADMIN-eye-icon:hover {
            color: var(--enthusia-light-gold);
            transform: translateY(-50%) scale(1.1);
          }

          .ADMIN-error {
            background: rgba(196, 30, 58, 0.2);
            border: 1px solid var(--enthusia-red);
            color: var(--enthusia-coral);
            padding: 0.8rem;
            border-radius: 10px;
            font-size: 0.9rem;
            text-align: center;
            animation: ADMIN-shake 0.5s ease;
          }

          @keyframes ADMIN-shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }

          .ADMIN-submit-btn {
            background: linear-gradient(135deg, var(--enthusia-gold), var(--enthusia-dark-gold));
            color: var(--enthusia-navy);
            border: none;
            padding: 1.1rem;
            border-radius: 12px;
            font-size: 1.05rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: var(--enthusia-glow-gold);
            margin-top: 0.5rem;
          }

          .ADMIN-submit-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.5), var(--enthusia-shadow-lg);
          }

          .ADMIN-submit-btn:active {
            transform: translateY(-1px);
          }

          .ADMIN-info {
            margin-top: 2rem;
            padding: 1rem;
            background: rgba(255, 215, 0, 0.1);
            border: 1px solid rgba(255, 215, 0, 0.3);
            border-radius: 10px;
          }

          .ADMIN-info-title {
            color: var(--enthusia-gold);
            font-size: 0.85rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
          }

          .ADMIN-info-item {
            color: var(--enthusia-sky-blue);
            font-size: 0.8rem;
            margin: 0.3rem 0;
          }

          @media (max-width: 768px) {
            .ADMIN-login-box {
              padding: 2rem 1.5rem;
            }

            .ADMIN-title {
              font-size: 1.6rem;
            }

            .ADMIN-logo {
              width: 70px;
              height: 70px;
            }
          }
        `}</style>

        <div className="ADMIN-login-container">
          <div className="ADMIN-login-box">
            <div className="ADMIN-login-header">
              <div className="ADMIN-logo">
                <Shield size={40} color="var(--enthusia-navy)" />
              </div>
              <h1 className="ADMIN-title">ENTHUSIA ADMIN</h1>
              <p className="ADMIN-subtitle">Secure Access Portal</p>
            </div>

            <form className="ADMIN-form" onSubmit={handleLogin}>
              <div className="ADMIN-input-group">
                <label className="ADMIN-label">Username</label>
                <div className="ADMIN-input-wrapper">
                  <User size={20} className="ADMIN-input-icon" />
                  <input
                    type="text"
                    className="ADMIN-input"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="ADMIN-input-group">
                <label className="ADMIN-label">Password</label>
                <div className="ADMIN-input-wrapper">
                  <Lock size={20} className="ADMIN-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="ADMIN-input"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div
                    className="ADMIN-eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
              </div>

              {error && <div className="ADMIN-error">{error}</div>}

              <button type="submit" className="ADMIN-submit-btn">
                Login to Hub
              </button>
            </form>

            <div className="ADMIN-info">
              <div className="ADMIN-info-title">Demo Credentials:</div>
              <div className="ADMIN-info-item">Admin: admin / admin123 (Full Access)</div>
              <div className="ADMIN-info-item">Students: students / students123 (Limited Access)</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        .ADMIN-hub-container {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--enthusia-navy) 0%, var(--enthusia-dark-blue) 50%, var(--enthusia-blue) 100%);
          padding: 2rem 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .ADMIN-hub-header {
          max-width: 1400px;
          margin: 0 auto 2.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          animation: ADMIN-fadeInDown 0.8s ease-out;
        }

        @keyframes ADMIN-fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ADMIN-hub-title-section {
          flex: 1;
        }

        .ADMIN-hub-title {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 800;
          background: linear-gradient(135deg, var(--enthusia-gold), var(--enthusia-light-gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.3rem;
        }

        .ADMIN-hub-subtitle {
          color: var(--enthusia-sky-blue);
          font-size: 1rem;
        }

        .ADMIN-user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          padding: 1rem 1.5rem;
          border-radius: 15px;
          border: 2px solid rgba(255, 215, 0, 0.3);
        }

        .ADMIN-role-badge {
          background: linear-gradient(135deg, var(--enthusia-gold), var(--enthusia-dark-gold));
          color: var(--enthusia-navy);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .ADMIN-logout-btn {
          background: rgba(196, 30, 58, 0.2);
          border: 2px solid var(--enthusia-red);
          color: var(--enthusia-coral);
          padding: 0.6rem 1rem;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
        }

        .ADMIN-logout-btn:hover {
          background: var(--enthusia-red);
          color: var(--enthusia-white);
          transform: translateY(-2px);
        }

        .ADMIN-pages-grid {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          padding: 0 1rem;
        }

        .ADMIN-page-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(15px);
          border: 2px solid rgba(255, 215, 0, 0.3);
          border-radius: 20px;
          padding: 2rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          animation: ADMIN-fadeInUp 0.8s ease-out;
        }

        .ADMIN-page-card:nth-child(1) { animation-delay: 0.1s; }
        .ADMIN-page-card:nth-child(2) { animation-delay: 0.2s; }
        .ADMIN-page-card:nth-child(3) { animation-delay: 0.3s; }
        .ADMIN-page-card:nth-child(4) { animation-delay: 0.4s; }
        .ADMIN-page-card:nth-child(5) { animation-delay: 0.5s; }
        .ADMIN-page-card:nth-child(6) { animation-delay: 0.6s; }
        .ADMIN-page-card:nth-child(7) { animation-delay: 0.7s; }
        .ADMIN-page-card:nth-child(8) { animation-delay: 0.8s; }
        .ADMIN-page-card:nth-child(9) { animation-delay: 0.9s; }

        @keyframes ADMIN-fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ADMIN-page-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .ADMIN-page-card:hover::before {
          left: 100%;
        }

        .ADMIN-page-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: var(--enthusia-gold);
        }

        .ADMIN-page-card.locked {
          opacity: 0.5;
          cursor: not-allowed;
          filter: grayscale(0.5);
        }

        .ADMIN-page-card.locked:hover {
          transform: none;
          border-color: rgba(255, 215, 0, 0.3);
        }

        .ADMIN-page-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }

        .ADMIN-page-card:hover .ADMIN-page-icon {
          transform: scale(1.1) rotate(10deg);
        }

        .ADMIN-page-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--enthusia-gold);
          margin-bottom: 0.8rem;
        }

        .ADMIN-page-description {
          color: var(--enthusia-sky-blue);
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .ADMIN-page-access {
          display: inline-block;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .ADMIN-page-access.granted {
          background: rgba(80, 200, 120, 0.2);
          color: var(--enthusia-emerald);
          border: 1px solid var(--enthusia-emerald);
        }

        .ADMIN-page-access.denied {
          background: rgba(196, 30, 58, 0.2);
          color: var(--enthusia-coral);
          border: 1px solid var(--enthusia-red);
        }

        .ADMIN-lock-overlay {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(196, 30, 58, 0.3);
          border: 2px solid var(--enthusia-red);
          border-radius: 50%;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 1024px) {
          .ADMIN-pages-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .ADMIN-hub-container {
            padding: 1.5rem 0.5rem;
          }

          .ADMIN-hub-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .ADMIN-user-info {
            width: 100%;
            justify-content: space-between;
          }

          .ADMIN-pages-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .ADMIN-page-card {
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="ADMIN-hub-container">
        <div className="ADMIN-hub-header">
          <div className="ADMIN-hub-title-section">
            <h1 className="ADMIN-hub-title">ADMIN HUB</h1>
            <p className="ADMIN-hub-subtitle">Management Dashboard</p>
          </div>

          <div className="ADMIN-user-info">
            <div className="ADMIN-role-badge">
              <UserCog size={18} />
              {userRole}
            </div>
            <button className="ADMIN-logout-btn" onClick={handleLogout}>
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        <div className="ADMIN-pages-grid">
          {adminPages.map((page) => {
            const Icon = page.icon;
            const access = hasAccess(page);
            
            return (
              <div
                key={page.id}
                className={`ADMIN-page-card ${!access ? 'locked' : ''}`}
                onClick={() => access && navigate(page.route)}
                style={{
                  boxShadow: access ? page.glowColor : 'none'
                }}
              >
                {!access && (
                  <div className="ADMIN-lock-overlay">
                    <Lock size={20} color="var(--enthusia-red)" />
                  </div>
                )}

                <div
                  className="ADMIN-page-icon"
                  style={{
                    background: `linear-gradient(135deg, ${page.color}, ${page.color}dd)`,
                    boxShadow: access ? page.glowColor : 'none'
                  }}
                >
                  <Icon size={36} color="var(--enthusia-white)" />
                </div>

                <h3 className="ADMIN-page-title">{page.title}</h3>
                <p className="ADMIN-page-description">{page.description}</p>

                <span className={`ADMIN-page-access ${access ? 'granted' : 'denied'}`}>
                  {access ? '✓ Access Granted' : '✗ No Access'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AdminHub;