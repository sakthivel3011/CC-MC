import React, { useEffect, useState } from 'react';
import { Search, User, Home, Compass, Activity, Bell, Grid, List, X, CheckCircle, AlertCircle, Info, Star, ExternalLink } from 'lucide-react';

const ModernPortal = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [userName] = useState('Student');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Welcome to ENTHUSIA 2025! 🎉',
      message: 'Hi! Explore all our amazing features and register for exciting events. Click here to get started with registration.',
      link: '/enthusia/registration',
      linkText: 'Start Registration →',
      dismissible: true,
      autoHide: false,
      showTime: true,
      timestamp: new Date()
    },
    {
      id: 2,
      type: 'info',
      title: 'New Features Available! ✨',
      message: 'Check out our new AI Assistant for instant help and our improved slot booking system.',
      link: '/aichatbot',
      linkText: 'Try AI Assistant →',
      dismissible: true,
      autoHide: false,
      showTime: false
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  const portalPages = [
    {
      id: 1,
      title: 'Dashboard',
      description: 'Your main hub',
      path: '/enthusia',
      icon: '🏠',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      category: 'main',
      badge: 'New',
      color: '#667eea'
    },
    {
      id: 2,
      title: 'Rules',
      description: 'Event guidelines',
      path: '/enthusia/rules',
      icon: '📋',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      category: 'info',
      badge: null,
      color: '#f093fb'
    },
    {
      id: 3,
      title: 'Register',
      description: 'Join events now',
      path: '/enthusia/registration',
      icon: '✍️',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      category: 'action',
      badge: 'Hot',
      color: '#4facfe'
    },
    {
      id: 4,
      title: 'Guest Meet',
      description: 'Special sessions',
      path: '/enthusia/guestmeet',
      icon: '🤝',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      category: 'events',
      badge: null,
      color: '#43e97b'
    },
    {
      id: 5,
      title: 'Slot Booking',
      description: 'Reserve your spot',
      path: '/enthusia/slotbooking',
      icon: '📅',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      category: 'action',
      badge: null,
      color: '#fa709a'
    },
    {
      id: 6,
      title: 'Payment',
      description: 'Bank details',
      path: '/enthusia/bank',
      icon: '💳',
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      category: 'info',
      badge: null,
      color: '#30cfd0'
    },
    {
      id: 7,
      title: 'Certificate',
      description: 'Your achievements',
      path: '/enthusia/certificate',
      icon: '🏆',
      gradient: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
      category: 'action',
      badge: null,
      color: '#ffd89b'
    },
    {
      id: 8,
      title: 'AI Assistant',
      description: 'Smart chat support',
      path: '/aichatbot',
      icon: '🤖',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      category: 'support',
      badge: 'AI',
      color: '#a8edea'
    },
    {
      id: 9,
      title: 'Help Center',
      description: 'Get assistance',
      path: '/help',
      icon: '💡',
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      category: 'support',
      badge: null,
      color: '#ff9a9e'
    },
    {
      id: 10,
      title: 'Contact',
      description: 'Reach us',
      path: '/contact',
      icon: '📱',
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      category: 'support',
      badge: null,
      color: '#ffecd2'
    },
    {
      id: 11,
      title: 'Leadership',
      description: 'Office bearers',
      path: '/office-bearers',
      icon: '👔',
      gradient: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
      category: 'info',
      badge: null,
      color: '#ff6e7f'
    },
    {
      id: 12,
      title: 'Feedback',
      description: 'Share thoughts',
      path: '/feedback',
      icon: '💬',
      gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
      category: 'events',
      badge: null,
      color: '#e0c3fc'
    },
    {
      id: 13,
      title: 'Gallery',
      description: 'Photo memories',
      path: '/gallery',
      icon: '📸',
      gradient: 'linear-gradient(135deg, #f77062 0%, #fe5196 100%)',
      category: 'events',
      badge: null,
      color: '#f77062'
    },
    {
      id: 14,
      title: 'About Club',
      description: 'Our story',
      path: '/about',
      icon: '🏛️',
      gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
      category: 'info',
      badge: null,
      color: '#fbc2eb'
    },
    {
      id: 15,
      title: 'About Enthusia',
      description: 'Our journey',
      path: '/eabout',
      icon: '⭐',
      gradient: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
      category: 'info',
      badge: null,
      color: '#fdcbf1'
    },
    {
      id: 16,
      title: 'All Events',
      description: 'Browse activities',
      path: '/events',
      icon: '🎉',
      gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
      category: 'main',
      badge: 'Live',
      color: '#a1c4fd'
    },
    {
      id: 17,
      title: 'Results',
      description: 'View your results',
      path: '/enthusia/result',
      icon: '📊',
      gradient: 'linear-gradient(135deg, #96fbc4 0%, #f9f047 100%)',
      category: 'info',
      badge: 'New',
      color: '#96fbc4'
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: '🌟', color: '#667eea' },
    { id: 'main', name: 'Main', icon: '⚡', color: '#4facfe' },
    { id: 'action', name: 'Actions', icon: '🎯', color: '#43e97b' },
    { id: 'info', name: 'Info', icon: 'ℹ️', color: '#f093fb' },
    { id: 'events', name: 'Events', icon: '🎉', color: '#fa709a' },
    { id: 'support', name: 'Support', icon: '🆘', color: '#ff9a9e' }
  ];

  const filteredPages = portalPages.filter(page => {
    const matchesCategory = activeCategory === 'all' || page.category === activeCategory;
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         page.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCardClick = (path) => {
    // Add a success notification when clicking on a card
    addNotification({
      type: 'success',
      title: 'Navigating...',
      message: `Taking you to ${path}`,
      autoHide: true,
      dismissible: true,
      showTime: false
    });
    
    // Simulate navigation delay
    setTimeout(() => {
      console.log('Navigating to:', path);
      // Here you would actually navigate
      // window.location.href = path;
    }, 500);
  };

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]); // Keep max 5 notifications

    if (notification.autoHide) {
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, 3000);
    }
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleLinkClick = (link, notificationId) => {
    if (link) {
      addNotification({
        type: 'info',
        title: 'Redirecting...',
        message: `Opening ${link}`,
        autoHide: true,
        dismissible: true,
        showTime: false
      });
      
      setTimeout(() => {
        console.log('Navigating to:', link);
        removeNotification(notificationId);
      }, 1000);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle size={20} color="white" />;
      case 'error': return <AlertCircle size={20} color="white" />;
      case 'warning': return <AlertCircle size={20} color="white" />;
      case 'info': return <Info size={20} color="white" />;
      default: return <Star size={20} color="white" />;
    }
  };

  const getNotificationColors = (type) => {
    switch (type) {
      case 'success': return {
        gradient: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
        shadow: 'rgba(72, 187, 120, 0.3)'
      };
      case 'error': return {
        gradient: 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)',
        shadow: 'rgba(245, 101, 101, 0.3)'
      };
      case 'warning': return {
        gradient: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
        shadow: 'rgba(237, 137, 54, 0.3)'
      };
      case 'info': return {
        gradient: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
        shadow: 'rgba(66, 153, 225, 0.3)'
      };
      default: return {
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        shadow: 'rgba(102, 126, 234, 0.3)'
      };
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      paddingBottom: '80px'
    }}>
      {/* Welcome Toast */}
      {showWelcome && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '16px 32px',
          borderRadius: '50px',
          boxShadow: '0 10px 40px rgba(102, 126, 234, 0.6)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontWeight: '600',
          fontSize: 'clamp(14px, 3vw, 16px)',
          animation: 'slideDown 0.5s ease, slideUp 0.5s ease 3s forwards',
          maxWidth: '90%'
        }}>
          <span style={{ fontSize: '24px' }}>👋</span>
          <span>Welcome back, {userName}!</span>
        </div>
      )}

      {/* Advanced Notifications */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
        width: '100%'
      }}>
        {notifications.map((notification, index) => {
          const colors = getNotificationColors(notification.type);
          return (
            <div
              key={notification.id}
              style={{
                background: colors.gradient,
                borderRadius: '16px',
                padding: '20px',
                boxShadow: `0 8px 25px ${colors.shadow}`,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                animation: `slideInFromRight 0.4s ease ${index * 0.1}s backwards`,
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Animated background pattern */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
                pointerEvents: 'none'
              }} />
              
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px'
                  }}>
                    <h4 style={{
                      margin: 0,
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '700',
                      wordBreak: 'break-word'
                    }}>
                      {notification.title}
                    </h4>
                    
                    {notification.dismissible && (
                      <button
                        onClick={() => removeNotification(notification.id)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          border: 'none',
                          borderRadius: '8px',
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          flexShrink: 0,
                          transition: 'all 0.3s ease',
                          marginLeft: '8px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                      >
                        <X size={16} color="white" />
                      </button>
                    )}
                  </div>
                  
                  <p style={{
                    margin: '0 0 12px 0',
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    wordBreak: 'break-word'
                  }}>
                    {notification.message}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    {notification.link && (
                      <button
                        onClick={() => handleLinkClick(notification.link, notification.id)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '8px 14px',
                          color: 'white',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <span>{notification.linkText || 'Learn More'}</span>
                        <ExternalLink size={12} />
                      </button>
                    )}
                    
                    {notification.showTime && (
                      <span style={{
                        fontSize: '11px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontWeight: '500'
                      }}>
                        {formatTime(notification.timestamp)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Header */}
      <div style={{
        background: 'rgba(15, 12, 41, 0.8)',
        backdropFilter: 'blur(20px)',
        padding: '20px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        {/* Top Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          maxWidth: '1400px',
          margin: '0 auto 20px'
        }}>
          <div>
            <div style={{
              fontSize: 'clamp(12px, 2.5vw, 14px)',
              color: 'rgba(255, 255, 255, 0.6)',
              fontWeight: '500',
              marginBottom: '4px'
            }}>
              Welcome back,
            </div>
            <div style={{
              fontSize: 'clamp(20px, 4vw, 28px)',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px'
            }}>
              {userName}
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button 
              onClick={() => {
                addNotification({
                  type: 'info',
                  title: 'Quick Tip! 💡',
                  message: 'You can access all services quickly from the categories below. Try filtering by "Actions" to see registration and booking options.',
                  dismissible: true,
                  autoHide: true,
                  showTime: false
                });
              }}
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Bell size={20} color="white" />
              {notifications.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '18px',
                  height: '18px',
                  background: 'linear-gradient(135deg, #ff4757 0%, #ff3742 100%)',
                  borderRadius: '50%',
                  border: '2px solid #0f0c29',
                  fontSize: '10px',
                  fontWeight: '700',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'pulse 2s infinite'
                }}>
                  {notifications.length}
                </span>
              )}
            </button>
            
            <div style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}>
              <User size={22} color="white" />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{
          position: 'relative',
          maxWidth: '1400px',
          margin: '0 auto 20px'
        }}>
          <Search 
            size={20} 
            color="rgba(255, 255, 255, 0.5)" 
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          />
          <input
            type="text"
            placeholder="Search services, events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px 14px 48px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              color: 'white',
              fontSize: '15px',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.08)';
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Categories & View Toggle */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
          gap: '12px'
        }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            flex: 1,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  flexShrink: 0,
                  padding: '10px 18px',
                  borderRadius: '12px',
                  background: activeCategory === cat.id 
                    ? `linear-gradient(135deg, ${cat.color}, ${cat.color}dd)` 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: activeCategory === cat.id 
                    ? 'none' 
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: activeCategory === cat.id 
                    ? `0 4px 15px ${cat.color}40` 
                    : 'none'
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== cat.id) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== cat.id) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div style={{
            display: 'flex',
            gap: '4px',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '4px',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            flexShrink: 0
          }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: viewMode === 'grid' ? 'rgba(102, 126, 234, 0.3)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              <Grid size={18} color="white" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: viewMode === 'list' ? 'rgba(102, 126, 234, 0.3)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              <List size={18} color="white" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        padding: '24px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          fontSize: 'clamp(16px, 3vw, 18px)',
          fontWeight: '700',
          color: 'white',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span>Available Services</span>
          <span style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.5)',
            fontWeight: '500'
          }}>
            ({filteredPages.length})
          </span>
        </div>

        {filteredPages.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: viewMode === 'grid' 
              ? 'repeat(auto-fill, minmax(180px, 1fr))' 
              : '1fr',
            gap: viewMode === 'grid' ? '16px' : '12px'
          }}>
            {filteredPages.map((page, index) => (
              <div
                key={page.id}
                onClick={() => handleCardClick(page.path)}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: viewMode === 'grid' ? '20px' : '16px',
                  padding: viewMode === 'grid' ? '20px' : '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: viewMode === 'list' ? 'flex' : 'block',
                  alignItems: viewMode === 'list' ? 'center' : 'normal',
                  gap: viewMode === 'list' ? '16px' : '0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = viewMode === 'grid' 
                    ? 'translateY(-8px) scale(1.02)' 
                    : 'translateX(4px)';
                  e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Top gradient line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: page.gradient
                }} />

                {/* Icon Box */}
                <div style={{
                  width: viewMode === 'grid' ? '60px' : '50px',
                  height: viewMode === 'grid' ? '60px' : '50px',
                  borderRadius: '16px',
                  background: page.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: viewMode === 'grid' ? '16px' : '0',
                  transition: 'transform 0.3s ease',
                  flexShrink: 0,
                  boxShadow: `0 8px 20px ${page.color}40`
                }}>
                  <span style={{ fontSize: viewMode === 'grid' ? '32px' : '28px' }}>
                    {page.icon}
                  </span>
                </div>

                {/* Content */}
                <div style={{ flex: viewMode === 'list' ? 1 : 'none' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px'
                  }}>
                    <h3 style={{
                      fontSize: viewMode === 'grid' ? '16px' : '17px',
                      fontWeight: '700',
                      color: 'white',
                      margin: 0
                    }}>
                      {page.title}
                    </h3>
                    {page.badge && (
                      <span style={{
                        background: page.gradient,
                        color: 'white',
                        fontSize: '10px',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {page.badge}
                      </span>
                    )}
                  </div>
                  <p style={{
                    fontSize: '13px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    margin: 0,
                    lineHeight: 1.4
                  }}>
                    {page.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'rgba(255, 255, 255, 0.5)'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px', opacity: 0.5 }}>
              🔍
            </div>
            <div style={{ fontSize: '18px', fontWeight: '600' }}>
              No services found
            </div>
            <div style={{ fontSize: '14px', marginTop: '8px' }}>
              Try adjusting your search or filters
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(15, 12, 41, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '12px 20px',
        zIndex: 1000
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {[
            { icon: Home, label: 'Home', active: true },
            { icon: Compass, label: 'Explore', active: false },
            { icon: Activity, label: 'Activity', active: false },
            { icon: User, label: 'Profile', active: false }
          ].map((item, index) => (
            <button
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 16px',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                background: item.active 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                  : 'rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s ease'
              }}>
                <item.icon size={22} color="white" />
              </div>
              <span style={{
                fontSize: '11px',
                color: item.active ? 'white' : 'rgba(255, 255, 255, 0.6)',
                fontWeight: '600'
              }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            transform: translateX(-50%) translateY(-100px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideUp {
          to {
            transform: translateX(-50%) translateY(-100px);
            opacity: 0;
          }
        }

        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        *::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        *::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        *::-webkit-scrollbar-thumb {
          background: rgba(102, 126, 234, 0.5);
          borderRadius: 4px;
        }

        *::-webkit-scrollbar-thumb:hover {
          background: rgba(102, 126, 234, 0.7);
        }

        @media (min-width: 769px) {
          div[style*="position: fixed"][style*="bottom: 0"] {
            display: none;
          }
        }

        @media (max-width: 768px) {
          div[style*="position: fixed"][style*="right: 20px"][style*="top: 20px"] {
            left: 10px !important;
            right: 10px !important;
            max-width: calc(100vw - 20px) !important;
            width: calc(100vw - 20px) !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="gridTemplateColumns"][style*="repeat(auto-fill"] {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ModernPortal;