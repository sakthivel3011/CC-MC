import React, { useState, useEffect } from 'react';
import { FaUser, FaUserFriends, FaUsers, FaArrowLeft, FaPhone, FaCheckCircle, FaBars } from 'react-icons/fa';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import '../styles/ERegistration.css';
import ELogoScroll from '../components/ELogoScroll';
import ERegistrationForm from '../components/ERegistrationForm';
import comic from '../images/Event/comic.png';
import dualdance from '../images/Event/dualdance.png';
import fashion from '../images/Event/fashion.png';
import groupdance from '../images/Event/groupdance.png';
import groupinstrumental from '../images/Event/groupins.png';
import groupsinging from '../images/Event/groupsinging.png';
import imitateact from '../images/Event/imitate.png';
import mime from '../images/Event/mime.png';
import movie from '../images/Event/movie.png';
import skit from '../images/Event/skit.png';
import solodance from '../images/Event/solodance.png';
import soloinstrumental from '../images/Event/soloins.png';
import solosinging from '../images/Event/solosinging.png';






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
    } else {
      // If there's no eventId, make sure we show all events
      setSelectedEvent(null);
      setShowRegistrationForm(false);
    }
  }, [searchParams]);



  const events = [
    {
      id: 1,
      name: 'Comic Satire',
      category: 'group',
      minParticipants: 1,
      maxParticipants: 10,
      icon: '🎭',
      image: comic,
      description: 'Kalakka Povadhu Yaaru - Showcase your wit and humor through satirical performances.',
      rules: [
        'May be solo or teams with a maximum of 10 members shall participate',
        'Maximum duration: 5 minutes',
        'Vulgarity should be avoided at any extent',
        'Judgement will be based on their concept, timing and performance'
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
      image: soloinstrumental,
      description: 'Display your musical prowess with any instrument of your choice.',
      rules: [
        'Its a solo event',
        'Maximum duration: 4 Minutes',
        'Pre-recorded music & Karaoke is strictly intolerable',
        'Own composition shall be performed',
        'Cine songs instrumental shall be performed',
        'Participants must bring their own instruments'
      ],
      coordinator: 'Sneha Reddy',
      phone: '+91 9876543213'
    },
    {
      id: 3,
      name: 'Group Instrumental',
      category: 'group',
      minParticipants: 2,
      maxParticipants: 7,
      icon: '🎵',
      image: groupinstrumental,
      description: 'Collaborate with your team to create mesmerizing musical harmony.',
      rules: [
        'Maximum of 7 members shall participate',
        'Maximum duration: 5 Minutes',
        'Pre-recorded music & Karaoke is strictly intolerable',
        'Own composition shall be performed',
        'Cine songs instrumental shall be performed',
        'Participants must bring their own instruments'
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
      image: solodance,
      description: 'Express yourself through the art of dance with grace and rhythm.',
      rules: [
        'Maximum duration: 4 minutes',
        'Audio quality must be good',
        'Vulgarity should be avoided in lyrics, dress and dance movements',
        'Judgement will be based on theme, attire, expressions, steps, song selection and general impression'
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
      image: dualdance,
      description: 'Partner up for a synchronized dance performance that captivates the audience.',
      rules: [
        'Teams must consist of 2 participants',
        'Maximum duration: 4 minutes',
        'Audio quality must be good',
        'Vulgarity should be avoided at any extent in the lyrics, attire and dance movements',
        'Judgement will be based on theme, attire, expression, steps, song selection and general impression'
      ],
      coordinator: 'Arjun Kumar',
      phone: '+91 9876543212'
    },
    {
      id: 6,
      name: 'Group Dance',
      category: 'group',
      minParticipants: 8,
      maxParticipants: 15,
      icon: '🕺',
      image: groupdance,
      description: 'Unite your team to deliver a spectacular group dance performance.',
      rules: [
        'Teams should contain a minimum of 8 members and a maximum of 15 members',
        'Maximum duration: 5 minutes',
        'Audio quality must be good',
        'Vulgarity should be avoided in lyrics, dress and dance movements at any extent',
        'Judgement will be based on the theme, costumes, expression, steps, song selection, coordination and general impression',
        'Usage of dangerous properties is strictly prohibited'
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
      image: solosinging,
      description: 'Let your voice soar and touch hearts with melodious solo performances.',
      rules: [
        'Maximum duration: 5 minutes',
        'Karaoke shall be used',
        'Vulgarity should be avoided at any extent in the lyrics',
        'Judgement will be based on the singing nuances and general impression'
      ],
      coordinator: 'Sneha Reddy',
      phone: '+91 9876543213'
    },
    {
      id: 8,
      name: 'Group Singing',
      category: 'group',
      minParticipants: 2,
      maxParticipants: 6,
      icon: '🎶',
      image: groupsinging,
      description: 'Harmonize with your team to create beautiful musical arrangements.',
      rules: [
        'Maximum duration: 5 minutes',
        'Own composition shall be performed',
        'Vulgarity should be avoided at any extent in the lyrics',
        'Judgement will be based on the singing nuances, song selection and general impression'
      ],
      coordinator: 'Sneha Reddy',
      phone: '+91 9876543213'
    },
    {
      id: 9,
      name: 'Mime',
      category: 'group',
      minParticipants: 8,
      maxParticipants: 15,
      icon: '🎭',
      image: mime,
      description: 'A form of drama where gestures and bodily movements only used.',
      rules: [
        'Teams should contain a minimum of 8 and a maximum of 15 members',
        'Maximum duration: 5 minutes',
        'Audio quality must be good',
        'Vulgarity should be avoided in lyrics, dress and movements at any extent',
        'Judgement will be based on the qualities like theme, expression, music selection, coordination and general impression'
      ],
      coordinator: 'Vikram Singh',
      phone: '+91 9876543214'
    },
    {
      id: 10,
      name: 'Imitate Personate',
      category: 'solo',
      minParticipants: 1,
      maxParticipants: 1,
      icon: '🎪',
      image: imitateact,
      description: 'To act like a famous person.',
      rules: [
        'Its a solo event',
        'Maximum duration: 5 minutes',
        'Only background scores shall be used. Recorded voices or dialogues will not be tolerated',
        'Vulgarity should be avoided at any extent',
        'Judgement will be based on acting, expression, delivering the theme and general impression'
      ],
      coordinator: 'Vikram Singh',
      phone: '+91 9876543214'
    },
    {
      id: 11,
      name: 'Fashion Parade',
      category: 'group',
      minParticipants: 7,
      maxParticipants: 15,
      icon: '👗',
      image: fashion,
      description: 'Strut down the ramp and showcase creativity in fashion and style.',
      rules: [
        'Teams should contain a minimum of 7 and a maximum of 15 members',
        'Maximum duration: 6 minutes',
        'Vulgarity should be avoided in the attire',
        'Judgement will be based on creativity in costumes, themes and formations',
        'Everyone should be present with their costumes for the prelims itself'
      ],
      coordinator: 'Meera Joshi',
      phone: '+91 9876543215'
    },
    {
      id: 12,
      name: 'Movie Depiction',
      category: 'group',
      minParticipants: 8,
      maxParticipants: 15,
      icon: '🎬',
      image: movie,
      description: 'Recreating a scenario from a movie.',
      rules: [
        'Teams should contain a minimum of 8 and a maximum of 15 members',
        'Maximum duration: 5 minutes',
        'Audio quality must be good',
        'Spoofing the movies will not be entertained',
        'Vulgarity should be avoided at any extent',
        'Judgement will be based on acting, coordination, and general impression'
      ],
      coordinator: 'Vikram Singh',
      phone: '+91 9876543214'
    },
    {
      id: 13,
      name: 'Skit',
      category: 'group',
      minParticipants: 8,
      maxParticipants: 15,
      icon: '🎪',
      image: skit,
      description: 'Perform original theatrical pieces that entertain and convey meaningful messages.',
      rules: [
        'Teams should consist a minimum of 8 and a maximum of 15 members',
        'Maximum duration: 5 minutes',
        'Audio quality must be good',
        'Vulgarity should be avoided in lyrics, dress and movements at any extent',
        'Judgement will be based on the theme, expression, music selection, coordination and general impression'
      ],
      coordinator: 'Vikram Singh',
      phone: '+91 9876543214'
    },
    {
      id: 14,
      name: 'Short Film',
      category: 'group',
      minParticipants: 4,
      maxParticipants: 12,
      icon: '📹',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800',
      description: 'Create compelling short films that tell powerful stories.',
      rules: [
        'Maximum duration: 15 minutes',
        'Vulgarity should be avoided in dialogues and scenes at any extent',
        'Maximum crew size must be 12 members',
        'Judgement will be based on the story, direction, acting, editing, audio and video quality'
      ],
      note: 'The whole 15 minutes film should be submitted during prelims',
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
      description: 'A solo comic performance involving humor and real-life expressions.',
      rules: [
        'Its a solo event',
        'Maximum duration: 5 minutes',
        'Vulgarity should be avoided at any extent',
        'Usage of offensive language is strictly prohibited',
        'Judgement will be based on humor sense, timing, originality, and stage presence'
      ],
      coordinator: 'Vikram Singh',
      phone: '+91 9876543214'
    },
    {
      id: 16,
      name: 'Anchoring',
      category: 'solo',
      minParticipants: 1,
      maxParticipants: 1,
      icon: '🎙️',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
      description: 'A solo performance showcasing anchoring, presentation, and communication skills.',
      rules: [
        'Its a solo event',
        'Maximum duration: 5 minutes',
        'Participants must prepare their own content',
        'Vulgarity or offensive language should be avoided at any extent',
        'Judgement will be based on voice modulation, confidence, content, communication, and audience engagement'
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

  // Always show all events if no event is selected
  if (!selectedEvent) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <ELogoScroll />
          <div style={styles.leftButtons}>
            <button 
              style={styles.backButtonEnthusia}
              onClick={() => window.location.href = '/enthusia'}
            >
              <FaArrowLeft />Back to Enthusia
            </button>
          </div>
          <h1 style={styles.mainTitle}>Event Registration</h1>
          <p style={styles.subtitle}>Choose your event and showcase your talent!</p>
        </div>

        <div style={styles.eventsWrapper} className="eventsWrapper">
          {events.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={event.id}
                className="event-card"
                style={{
                  ...styles.eventCard,
                  flexDirection: isEven ? 'row' : 'row-reverse',
                  opacity: 1,
                  transform: 'none'
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
  }

  if (selectedEvent) {
    return (
      <div style={styles.detailPage}>
        <div style={styles.leftButtons}>
          <button 
            style={styles.backButtonEnthusia}
            onClick={() => window.location.href = '/enthusia'}
          >
            <FaArrowLeft /> Back to Enthusia
          </button>
          <button 
            onClick={() => {
              setSelectedEvent(null);
              setShowRegistrationForm(false);
              window.scrollTo(0, document.querySelector('.eventsWrapper')?.offsetTop || 0);
              navigate('/enthusia/registration', { replace: true });
            }}
            style={styles.backButton}
          >
            <FaArrowLeft /> Show All Events
          </button>
        </div>
        
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

      <div style={styles.header}>
        <ELogoScroll />
        <div style={styles.leftButtons}>
          <button 
            style={styles.backButtonEnthusia}
            onClick={() => window.location.href = '/enthusia'}
          >
            <FaArrowLeft />Back to Enthusia
          </button>
          <button 
            style={styles.backButton}
            onClick={() => {
              setSelectedEvent(null);
              setShowRegistrationForm(false);
              window.scrollTo(0, document.querySelector('.eventsWrapper')?.offsetTop || 0);
              navigate('/enthusia/registration', { replace: true });
            }}
          >
            <FaArrowLeft />Show All Events
          </button>
        </div>
        <h1 style={styles.mainTitle}>Event Registration</h1>
        <p style={styles.subtitle}>Choose your event and showcase your talent!</p>
      </div>

      <div style={styles.eventsWrapper} className="eventsWrapper">
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
    padding: '20px',
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative',
  },
  headerButtons: {
    position: 'fixed',
    top: '20px',
    left: '20px',
    zIndex: '100',
    display: 'flex',
    gap: '15px',
  },
  leftButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  backButtonEnthusia: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 12px',
    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    color: '#0a2540',
    border: 'none',
    borderRadius: '25px',
    fontSize: '0.85rem',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
    whiteSpace: 'nowrap',
    maxWidth: '150px',
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
    margin: '40px auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(30px, 5vw, 60px)',
    width: '100%',
    boxSizing: 'border-box',
    padding: '20px',
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
    gap: '8px',
    padding: '6px 12px',
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '25px',
    fontSize: '0.85rem',
    cursor: 'pointer',
    marginBottom: '15px',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    whiteSpace: 'nowrap',
    maxWidth: '150px',
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