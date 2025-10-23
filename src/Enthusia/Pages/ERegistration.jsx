import React, { useState, useEffect } from 'react';
import { FaUser, FaUserFriends, FaUsers, FaArrowLeft, FaPhone, FaCheckCircle, FaBars } from 'react-icons/fa';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import '../styles/ERegistration.css';
import ELogoScroll from '../components/ELogoScroll';
import ERegistrationForm from '../components/ERegistrationForm';


const ERegistration = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const eventId = searchParams.get('eventId');
    if (eventId) {
      const event = events.find(e => e.id === parseInt(eventId, 10));
      if (event) {
        // Set both states in the same tick
        requestAnimationFrame(() => {
          setSelectedEvent(event);
          setShowRegistrationForm(false);
        });
      }
    }
  }, [searchParams]);



  const events = [
    {
      id: 1,
      name: 'Comic Satire',
      category: 'solo',
      minParticipants: 1,
      maxParticipants: 1,
      icon: '🎭',
      image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800',
      description: 'Showcase your wit and humor through satirical performances that entertain and enlighten.',
      rules: [
        'Team size: 1 member (Solo event)',
        'Maximum duration: 5 minutes',
        'Performance must be original',
        'Props allowed (self-arranged)',
        'Content must be appropriate'
      ],
      coordinator: 'Vikram Singh',
      phone: '+91 9876543214'
    },
    {
      id: 2,
      name: 'Solo Instrumental',
      category: 'solo',
      minParticipants: 1,
      maxParticipants: 1,
      icon: '🎸',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
      description: 'Display your musical prowess with any instrument of your choice.',
      rules: [
        'Team size: 1 member (Solo event)',
        'Maximum duration: 6 minutes',
        'Any musical instrument allowed',
        'Accompaniment track permitted',
        'Own instrument required',
        'Classical or contemporary styles welcome'
      ],
      coordinator: 'Sneha Reddy',
      phone: '+91 9876543213'
    },
    {
      id: 3,
      name: 'Group Instrumental',
      category: 'group',
      minParticipants: 3,
      maxParticipants: 8,
      icon: '🎵',
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800',
      description: 'Collaborate with your team to create mesmerizing musical harmony.',
      rules: [
        'Team size: 3-8 members (Minimum 3, Maximum 8)',
        'Maximum duration: 8 minutes',
        'Mixed instruments encouraged',
        'Fusion styles welcome',
        'No vocal accompaniment'
      ],
      coordinator: 'Sneha Reddy',
      phone: '+91 9876543213'
    },
    {
      id: 4,
      name: 'Solo Dance',
      category: 'solo',
      minParticipants: 1,
      maxParticipants: 1,
      icon: '💃',
      image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800',
      description: 'Express yourself through the art of dance with grace and rhythm.',
      rules: [
        'Team size: 1 member (Solo event)',
        'Maximum duration: 4 minutes',
        'Any dance style allowed',
        'Costume and props permitted',
        'Background music required',
        'Original choreography preferred'
      ],
      coordinator: 'Arjun Kumar',
      phone: '+91 9876543212'
    },
    {
      id: 5,
      name: 'Dual Dance',
      category: 'dual',
      minParticipants: 2,
      maxParticipants: 2,
      icon: '👯',
      image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800',
      description: 'Partner up for a synchronized dance performance that captivates the audience.',
      rules: [
        'Team size: Exactly 2 members (No more, no less)',
        'Maximum duration: 5 minutes',
        'Synchronization is key',
        'Props and costumes allowed',
        'Any dance style permitted'
      ],
      coordinator: 'Arjun Kumar',
      phone: '+91 9876543212'
    },
    {
      id: 6,
      name: 'Group Dance',
      category: 'group',
      minParticipants: 3,
      maxParticipants: 8,
      icon: '🕺',
      image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800',
      description: 'Unite your team to deliver a spectacular group dance performance.',
      rules: [
        'Team size: 3-8 members (Minimum 3, Maximum 8)',
        'Maximum duration: 7 minutes',
        'Theme-based performances encouraged',
        'Elaborate costumes welcome',
        'Creative formations appreciated'
      ],
      coordinator: 'Arjun Kumar',
      phone: '+91 9876543212'
    },
    {
      id: 7,
      name: 'Solo Singing',
      category: 'solo',
      minParticipants: 1,
      maxParticipants: 1,
      icon: '🎤',
      image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800',
      description: 'Let your voice soar and touch hearts with melodious solo performances.',
      rules: [
        'Team size: 1 member (Solo event)',
        'Maximum duration: 5 minutes',
        'Any language permitted',
        'Karaoke tracks allowed',
        'Live accompaniment welcome',
        'Original compositions encouraged'
      ],
      coordinator: 'Sneha Reddy',
      phone: '+91 9876543213'
    },
    {
      id: 8,
      name: 'Group Singing',
      category: 'group',
      minParticipants: 3,
      maxParticipants: 8,
      icon: '🎶',
      image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800',
      description: 'Harmonize with your team to create beautiful musical arrangements.',
      rules: [
        'Team size: 3-8 members (Minimum 3, Maximum 8)',
        'Maximum duration: 6 minutes',
        'Harmonies and arrangements valued',
        'A cappella or accompanied',
        'Choir arrangements welcome'
      ],
      coordinator: 'Sneha Reddy',
      phone: '+91 9876543213'
    },
    {
      id: 9,
      name: 'Mime',
      category: 'solo',
      minParticipants: 1,
      maxParticipants: 1,
      icon: '🎭',
      image: 'https://images.unsplash.com/photo-1533563671-e04f93faee6f?w=800',
      description: 'Tell compelling stories without words through the art of mime.',
      rules: [
        'Team size: 1 member (Solo event)',
        'Maximum duration: 4 minutes',
        'No spoken words allowed',
        'Minimal props only',
        'White face paint mandatory',
        'Expressive storytelling essential'
      ],
      coordinator: 'Vikram Singh',
      phone: '+91 9876543214'
    },
    {
      id: 10,
      name: 'Imitation',
      category: 'solo',
      minParticipants: 1,
      maxParticipants: 1,
      icon: '🎪',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
      description: 'Master the art of mimicry and bring famous personalities to life.',
      rules: [
        'Team size: 1 member (Solo event)',
        'Maximum duration: 4 minutes',
        'Celebrity or character imitation',
        'Costume and makeup encouraged',
        'Voice modulation important',
        'Props allowed for authenticity'
      ],
      coordinator: 'Vikram Singh',
      phone: '+91 9876543214'
    },
    {
      id: 11,
      name: 'Fashion Parade',
      category: 'group',
      minParticipants: 5,
      maxParticipants: 10,
      icon: '👗',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800',
      description: 'Strut down the ramp and showcase creativity in fashion and style.',
      rules: [
        'Team size: 5-10 members (Minimum 5, Maximum 10)',
        'Theme-based styling required',
        'Original designs preferred',
        'Ramp walk training recommended',
        'Sustainable fashion encouraged'
      ],
      coordinator: 'Meera Joshi',
      phone: '+91 9876543215'
    },
    {
      id: 12,
      name: 'Movie Depiction',
      category: 'group',
      minParticipants: 3,
      maxParticipants: 8,
      icon: '🎬',
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
      description: 'Recreate iconic movie scenes with your creative interpretation.',
      rules: [
        'Team size: 3-8 members (Minimum 3, Maximum 8)',
        'Maximum duration: 7 minutes',
        'Famous movie scenes only',
        'Costumes and props mandatory',
        'Dialogue delivery important'
      ],
      coordinator: 'Vikram Singh',
      phone: '+91 9876543214'
    },
    {
      id: 13,
      name: 'Skit',
      category: 'group',
      minParticipants: 3,
      maxParticipants: 8,
      icon: '🎪',
      image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800',
      description: 'Perform original theatrical pieces that entertain and convey meaningful messages.',
      rules: [
        'Team size: 3-8 members (Minimum 3, Maximum 8)',
        'Maximum duration: 8 minutes',
        'Original script required',
        'Social themes encouraged',
        'Props and costumes allowed'
      ],
      coordinator: 'Vikram Singh',
      phone: '+91 9876543214'
    },
    {
      id: 14,
      name: 'Short Film',
      category: 'group',
      minParticipants: 3,
      maxParticipants: 10,
      icon: '📹',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800',
      description: 'Create compelling short films that tell powerful stories.',
      rules: [
        'Team size: 3-10 members (Minimum 3, Maximum 10)',
        'Maximum duration: 10 minutes',
        'Original content only',
        'All genres welcome',
        'Technical quality matters'
      ],
      coordinator: 'Meera Joshi',
      phone: '+91 9876543215'
    },
    {
      id: 15,
      name: 'Stand-Up Comedy',
      category: 'solo',
      minParticipants: 1,
      maxParticipants: 1,
      icon: '😂',
      image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800',
      description: 'Make the audience laugh with your original comedic material.',
      rules: [
        'Team size: 1 member (Solo event)',
        'Maximum duration: 6 minutes',
        'Original content mandatory',
        'Clean comedy preferred',
        'Audience interaction allowed'
      ],
      coordinator: 'Vikram Singh',
      phone: '+91 9876543214'
    },
    {
      id: 16,
      name: 'Beat Boxing',
      category: 'solo',
      minParticipants: 1,
      maxParticipants: 1,
      icon: '🎙️',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
      description: 'Create incredible rhythms and sounds using only your voice.',
      rules: [
        'Team size: 1 member (Solo event)',
        'Maximum duration: 4 minutes',
        'No external equipment',
        'Original beats preferred',
        'Showcasing variety encouraged'
      ],
      coordinator: 'Sneha Reddy',
      phone: '+91 9876543213'
    }
  ];



  const getCategoryIcon = (category) => {
    switch (category) {
      case 'solo': return <FaUser />;
      case 'dual': return <FaUserFriends />;
      case 'group': return <FaUsers />;
      default: return <FaUser />;
    }
  };

  if (showRegistrationForm && selectedEvent) {
    return <ERegistrationForm event={selectedEvent} onBack={() => setShowRegistrationForm(false)} />;
  }

  if (selectedEvent) {
    return (
      <div style={styles.detailPage}>
        <button onClick={() => setSelectedEvent(null)} style={styles.backButton}>
          <FaArrowLeft /> Back to Events
        </button>
        
        <div style={styles.detailContainer}>
          <div style={styles.detailImageSection}>
            <img src={selectedEvent.image} alt={selectedEvent.name} style={styles.detailImage} />
            <div style={styles.detailOverlay}>
              <span style={styles.detailIcon}>{selectedEvent.icon}</span>
            </div>
          </div>
          
          <div style={styles.detailContent}>
            <h1 style={styles.detailTitle}>{selectedEvent.name}</h1>
            <p style={styles.detailDescription}>{selectedEvent.description}</p>
            
            <div style={styles.detailRules}>
              <h3 style={styles.rulesTitle}>Rules & Guidelines</h3>
              <ul style={styles.rulesList}>
                {selectedEvent.rules.map((rule, index) => (
                  <li key={index} style={styles.ruleItem}>
                    <FaCheckCircle style={styles.checkIcon} />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
            
            <div style={styles.coordinatorInfo}>
              <h3 style={styles.coordinatorTitle}>Event Coordinator</h3>
              <div style={styles.coordinatorCard}>
                <div style={styles.coordinatorDetails}>
                  <p style={styles.coordinatorName}>{selectedEvent.coordinator}</p>
                  <a 
                    href={`tel:${selectedEvent.phone.replace(/\s+/g, '')}`} 
                    style={styles.coordinatorPhone}
                  >
                    <FaPhone style={styles.phoneIcon} />
                    {selectedEvent.phone}
                  </a>
                </div>
              </div>
            </div>
            
            <button 
              style={styles.registerButton}
              onClick={() => setShowRegistrationForm(true)}
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>

      <div style={styles.headerButtons}>
        <button 
          style={styles.backButton}
          onClick={() => navigate('/enthusia')}
        >
          <FaArrowLeft />Back to Events
        </button>
        
      </div>
      <div style={styles.header}>
        <ELogoScroll />
        <h1 style={styles.mainTitle}>Event Registration</h1>
        <p style={styles.subtitle}>Choose your event and showcase your talent!</p>
      </div>

      <div style={styles.eventsWrapper}>
        {events.map((event, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div
              key={event.id}
              className="event-card"
              style={{
                ...styles.eventCard,
                flexDirection: isEven ? 'row' : 'row-reverse',
              }}
              onClick={() => setSelectedEvent(event)}
            >
              <div style={styles.imageSection}>
                <div style={styles.imageContainer}>
                  <img src={event.image} alt={event.name} style={styles.eventImage} />
                  <div style={styles.imageOverlay}>
                    <span style={styles.eventIcon}>{event.icon}</span>
                  </div>
                </div>
              </div>

              <div style={{
                ...styles.contentSection,
                alignItems: isEven ? 'flex-start' : 'flex-end',
                textAlign: isEven ? 'left' : 'right'
              }}>
                <div style={styles.categoryBadge}>
                  {getCategoryIcon(event.category)}
                  <span style={styles.categoryText}>{event.category.toUpperCase()}</span>
                </div>
                
                <h2 style={styles.eventTitle}>{event.name}</h2>
                <p style={styles.eventDescription}>{event.description}</p>
                
                <div style={styles.eventMeta}>
                  <span style={styles.participants}>
                    {event.minParticipants === event.maxParticipants
                      ? `${event.minParticipants} Participant${event.minParticipants > 1 ? 's' : ''}`
                      : `${event.minParticipants}-${event.maxParticipants} Participants`}
                  </span>
                </div>
                
                <button style={styles.viewButton}>
                  View Details & Register
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a2540 0%, #1a365d 50%, #1a5f7a 100%)',
    padding: '0',
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative',
  },
  headerButtons: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: '100',
    display: 'flex',
    gap: '15px',
  },
  menuButton: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: '100',
    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    color: '#0a2540',
    fontSize: '1.5rem',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px',
    animation: 'fadeInDown 1s ease-out',
  },

  mainTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    background: 'linear-gradient(135deg, #ffd700, #ffbf00, #ff8c00)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '15px',
    fontWeight: '800',
    letterSpacing: '-1px',
  },
  subtitle: {
    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
    color: '#87ceeb',
    fontWeight: '300',
  },
  eventsWrapper: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(30px, 5vw, 60px)',
    width: '100%',
    boxSizing: 'border-box',
    padding: '0',
  },
  eventCard: {
    display: 'flex',
    gap: 'clamp(20px, 4vw, 40px)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 'clamp(16px, 2vw, 24px)',
    padding: 'clamp(15px, 3vw, 30px)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    opacity: '0',
    transform: 'translateY(30px)',
    width: '100%',
    boxSizing: 'border-box',
  },
  imageSection: {
    flex: '1',
    minWidth: 'min(300px, 100%)',
    maxWidth: '100%',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    paddingBottom: '75%',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
  },
  eventImage: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s ease',
  },
  imageOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 140, 0, 0.3))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: '0',
    transition: 'opacity 0.4s ease',
  },
  eventIcon: {
    fontSize: '6rem',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
  },
  contentSection: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 'clamp(10px, 2vw, 20px)',
    padding: 'clamp(10px, 2vw, 20px)',
    width: '100%',
    boxSizing: 'border-box',
  },
  categoryBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    color: '#ffd700',
    padding: '8px 20px',
    borderRadius: '50px',
    fontSize: '0.85rem',
    fontWeight: '600',
    border: '2px solid rgba(255, 215, 0, 0.3)',
    width: 'fit-content',
  },
  categoryText: {
    letterSpacing: '1px',
  },
  eventTitle: {
    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
    color: '#ffffff',
    fontWeight: '700',
    margin: '10px 0',
    lineHeight: '1.2',
  },
  eventDescription: {
    fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
    color: '#e1f5fe',
    lineHeight: '1.6',
    opacity: '0.9',
  },
  eventMeta: {
    display: 'flex',
    gap: '15px',
    marginTop: '10px',
  },
  participants: {
    color: '#87ceeb',
    fontSize: '0.95rem',
    fontWeight: '500',
    padding: '6px 14px',
    backgroundColor: 'rgba(135, 206, 235, 0.15)',
    borderRadius: '20px',
    border: '1px solid rgba(135, 206, 235, 0.3)',
  },
  viewButton: {
    marginTop: '20px',
    padding: 'clamp(10px, 2vw, 14px) clamp(20px, 4vw, 32px)',
    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    color: '#0a2540',
    border: 'none',
    borderRadius: '50px',
    fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 24px rgba(255, 215, 0, 0.4)',
    width: 'fit-content',
    whiteSpace: 'nowrap',
  },
  detailPage: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a2540 0%, #1a365d 100%)',
    padding: '40px 20px',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 24px',
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '50px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '30px',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },
  detailContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'clamp(30px, 5vw, 60px)',
    padding: 'clamp(10px, 2vw, 20px)',
    width: '100%',
    boxSizing: 'border-box',
  },
  detailImageSection: {
    position: 'relative',
  },
  detailImage: {
    width: '100%',
    height: '600px',
    objectFit: 'cover',
    borderRadius: '24px',
    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)',
  },
  detailOverlay: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: 'rgba(255, 215, 0, 0.95)',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(255, 215, 0, 0.5)',
  },
  detailIcon: {
    fontSize: '3rem',
  },
  detailContent: {
    color: '#ffffff',
  },
  detailTitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    marginBottom: '20px',
    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  detailDescription: {
    fontSize: '1.2rem',
    color: '#e1f5fe',
    marginBottom: '40px',
    lineHeight: '1.8',
  },
  detailRules: {
    marginBottom: '40px',
  },
  rulesTitle: {
    fontSize: '1.5rem',
    color: '#ffd700',
    marginBottom: '20px',
  },
  rulesList: {
    listStyle: 'none',
    padding: '0',
  },
  ruleItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '12px 0',
    fontSize: '1rem',
    color: '#e1f5fe',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  checkIcon: {
    color: '#50c878',
    marginTop: '4px',
    flexShrink: '0',
  },
  coordinatorInfo: {
    marginBottom: '40px',
  },
  coordinatorTitle: {
    fontSize: '1.5rem',
    color: '#ffd700',
    marginBottom: '15px',
  },
  coordinatorCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '20px',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  coordinatorDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  coordinatorName: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#ffffff',
  },
  coordinatorPhone: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '1rem',
    color: '#87ceeb',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      color: '#ffd700'
    }
  },
  phoneIcon: {
    color: '#ffd700',
  },
  registerButton: {
    width: '100%',
    padding: 'clamp(14px, 2.5vw, 18px)',
    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    color: '#0a2540',
    border: 'none',
    borderRadius: '50px',
    fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 12px 32px rgba(255, 215, 0, 0.5)',
    margin: '0 auto',
    maxWidth: '400px',
  },
};


export default ERegistration;