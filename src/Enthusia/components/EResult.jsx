import React, { useState, useEffect, useRef, useCallback } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/EResult.css'; // Using the new, advanced CSS file

// --- TIME LOCK DATA STRUCTURE ---
// Each event unlocks at exactly 6:30 PM on its date
// Results unlock daily starting from December 5, 2025 at 6:30 PM
// Note: Month is 0-indexed (11 = December), Time: 18 = 6 PM, 30 = 30 minutes
const resultsData = [
  { eventName: 'Comic Satire', eventDate: new Date(2025, 11, 5, 18, 30), winnerIds: ['CS-841', 'CS-239', 'CS-505', 'CS-711', 'CS-182', 'CS-463', 'CS-904', 'CS-625', 'CS-337', 'CS-098'] },
  { eventName: 'Solo Instrumental', eventDate: new Date(2025, 11, 6, 18, 30), winnerIds: ['SI-199', 'SI-452', 'SI-821', 'SI-673', 'SI-304', 'SI-555', 'SI-789', 'SI-210', 'SI-936', 'SI-047'] },
  { eventName: 'Solo Dance', eventDate: new Date(2025, 11, 7, 18, 30), winnerIds: ['SD-702', 'SD-311', 'SD-940', 'SD-568', 'SD-227', 'SD-881', 'SD-135', 'SD-694', 'SD-403', 'SD-076'] },
  { eventName: 'Solo Singing', eventDate: new Date(2025, 11, 8, 18, 30), winnerIds: ['SS-613', 'SS-874', 'SS-295', 'SS-516', 'SS-148', 'SS-739', 'SS-480', 'SS-902', 'SS-321', 'SS-067'] },
  { eventName: 'Mime', eventDate: new Date(2025, 11, 9, 18, 30), winnerIds: ['MM-444', 'MM-167', 'MM-818', 'MM-359', 'MM-720', 'MM-991', 'MM-202', 'MM-583', 'MM-634', 'MM-015'] },
  { eventName: 'Stand Up Comedy', eventDate: new Date(2025, 11, 10, 18, 30), winnerIds: ['SU-912', 'SU-253', 'SU-704', 'SU-495', 'SU-126', 'SU-847', 'SU-338', 'SU-689', 'SU-570', 'SU-001'] },
  { eventName: 'Fashion Parade', eventDate: new Date(2025, 11, 11, 18, 30), winnerIds: ['FP-314', 'FP-159', 'FP-265', 'FP-358', 'FP-979', 'FP-323', 'FP-846', 'FP-264', 'FP-338', 'FP-327'] },
  { eventName: 'Short Film', eventDate: new Date(2025, 11, 12, 18, 30), winnerIds: ['SF-411', 'SF-753', 'SF-098', 'SF-521', 'SF-888', 'SF-246', 'SF-135', 'SF-679', 'SF-900', 'SF-333'] },
];


// === Advanced Scratch Card Component ===
const ScratchCard = ({ eventName, eventDate, winnerIds, status, currentTime }) => {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');

  // Function to format date and time for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatDateTime = (date) => {
    return date.toLocaleString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Calculate time remaining until unlock
  const calculateTimeRemaining = useCallback(() => {
    if (status !== 'locked') return '';
    
    const unlockTime = new Date(eventDate); // Use exact unlock time with hours and minutes
    const now = new Date(currentTime);
    const diff = unlockTime.getTime() - now.getTime();
    
    if (diff <= 0) return 'Unlocked!';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    return `${minutes}m ${seconds}s`;
  }, [eventDate, status, currentTime]);

  useEffect(() => {
    if (status === 'locked') {
      const timer = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining());
      }, 1000); // Update every second for better accuracy
      
      setTimeRemaining(calculateTimeRemaining()); // Initial calculation
      
      return () => clearInterval(timer);
    }
  }, [calculateTimeRemaining, status]);

  const drawOverlay = useCallback((ctx, canvas) => {
    // Create a smooth gold gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#B8860B'); // Dark gold
    gradient.addColorStop(0.2, '#DAA520'); // Goldenrod
    gradient.addColorStop(0.4, '#FFD700'); // Gold
    gradient.addColorStop(0.6, '#FFF9C4'); // Light gold
    gradient.addColorStop(0.8, '#FFD700'); // Gold
    gradient.addColorStop(1, '#B8860B'); // Dark gold
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add subtle gold texture pattern
    ctx.globalCompositeOperation = 'multiply';
    for (let i = 0; i < canvas.width; i += 3) {
      ctx.fillStyle = `rgba(255, 215, 0, ${0.1 + Math.random() * 0.1})`;
      ctx.fillRect(i, 0, 1, canvas.height);
    }
    
    // Reset composite operation and add text
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.font = 'bold 14px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH TO REVEAL', canvas.width / 2, canvas.height / 2);
  }, []);

  useEffect(() => {
    if (status !== 'active') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Set canvas size dynamically
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    drawOverlay(ctx, canvas);

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    const brushSize = 30;

    const getPosition = (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY,
        };
    };
    
    const scratch = (x, y) => {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        if (isDrawing) {
            // Draw smooth line from last position to current
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();
        } else {
            // Initial touch/click - create a dot
            ctx.beginPath();
            ctx.arc(x, y, brushSize / 2, 0, 2 * Math.PI);
            ctx.fill();
        }
        
        lastX = x;
        lastY = y;
    };
    
    // Throttled check for performance
    const checkReveal = (() => {
        let timeout;
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                let transparentPixels = 0;
                for (let i = 3; i < data.length; i += 4) {
                    if (data[i] === 0) transparentPixels++;
                }
                const totalPixels = canvas.width * canvas.height;
                if ((transparentPixels / totalPixels) > 0.4) {
                    setIsRevealed(true);
                }
            }, 300); // Check every 300ms while scratching
        };
    })();

    const start = (e) => { 
      e.preventDefault(); 
      isDrawing = true; 
      const pos = getPosition(e);
      lastX = pos.x;
      lastY = pos.y;
      scratch(pos.x, pos.y); 
    };
    const move = (e) => { 
      if (isDrawing) { 
        e.preventDefault(); 
        const pos = getPosition(e);
        scratch(pos.x, pos.y); 
        checkReveal(); 
      }
    };
    const end = (e) => { e.preventDefault(); isDrawing = false; };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('mouseleave', end);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', end, { passive: false });

    return () => { /* Cleanup listeners */ };
  }, [status, drawOverlay]);

  return (
    <div className={`ERE-card ERE-card-${status}`} data-aos="fade-up" data-aos-duration="600">
      <div className="ERE-card-header">
        <h3 className="ERE-event-name">{eventName}</h3>
        <p className="ERE-event-date">{formatDate(eventDate)}</p>
      </div>
      <div className="ERE-card-body">
        {status === 'locked' && (
          <div className="ERE-locked-content">
            <span className="ERE-locked-icon">🔒</span>
            <p>Results unlock at {formatDateTime(eventDate)}</p>
            {timeRemaining && (
              <div className="ERE-countdown">
                <span className="ERE-countdown-label">Time remaining:</span>
                <span className="ERE-countdown-time">{timeRemaining}</span>
              </div>
            )}
          </div>
        )}

        {(status === 'revealed' || status === 'active') && (
          <div className={`ERE-scratch-wrapper ${isRevealed ? 'revealed' : ''}`}>
            <div className="ERE-result-content">
              <h4>Selected IDs</h4>
              <ul className="ERE-winner-list">
                {winnerIds.map(id => <li key={id}>{id}</li>)}
              </ul>
            </div>
            {status === 'active' && <canvas ref={canvasRef} className="ERE-scratch-canvas"></canvas>}
          </div>
        )}
      </div>
    </div>
  );
};

// === Main EResult Component ===
const EResult = () => {
  // Real-time date for live time lock system
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Update current time every minute to check for unlocks
  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = new Date();
      
      // Check if any event status would change with the new time
      const currentStatuses = resultsData.map(event => getEventStatus(event.eventDate));
      setCurrentTime(newTime);
      
      // After a small delay, check if any status changed and potentially refresh
      setTimeout(() => {
        const newStatuses = resultsData.map(event => {
          const today = new Date(newTime);
          today.setHours(0, 0, 0, 0);
          const normalizedEventDate = new Date(event.eventDate);
          normalizedEventDate.setHours(0, 0, 0, 0);
          
          if (normalizedEventDate < today) return 'revealed';
          if (normalizedEventDate.getTime() === today.getTime()) return 'active';
          return 'locked';
        });
        
        // If any status changed from locked to active/revealed, show notification
        const statusChanged = currentStatuses.some((status, index) => 
          status === 'locked' && newStatuses[index] !== 'locked'
        );
        
        if (statusChanged) {
          // Show a notification that new results are available
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Enthusia Results', {
              body: 'New results are now available!',
              icon: '/favicon.ico'
            });
          }
        }
      }, 100);
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    AOS.init({ once: true, offset: 50, easing: 'ease-out-cubic' });
    
    // Request notification permission for unlock alerts
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  const getEventStatus = (eventDate) => {
    const now = new Date(currentTime);
    const unlockTime = new Date(eventDate); // Keep the exact unlock time with hours and minutes
    
    if (unlockTime <= now) return 'revealed'; // Past the unlock time = revealed
    
    // Check if it's the same day and within 1 hour of unlock time
    const sameDay = unlockTime.toDateString() === now.toDateString();
    const timeDiff = unlockTime.getTime() - now.getTime();
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
    
    if (sameDay && timeDiff <= oneHour && timeDiff > 0) return 'active'; // Within 1 hour = active/scratchable
    
    return 'locked'; // Future time = locked
  };

  const pastAndPresentEvents = resultsData.filter(event => getEventStatus(event.eventDate) !== 'locked');
  
  // Find next event to unlock
  const nextEventToUnlock = resultsData
    .filter(event => getEventStatus(event.eventDate) === 'locked')
    .sort((a, b) => a.eventDate - b.eventDate)[0];
  
  const formatNextUnlockTime = () => {
    if (!nextEventToUnlock) return '';
    const unlockDate = new Date(nextEventToUnlock.eventDate);
    return unlockDate.toLocaleString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="ERE-universe">
      <section className="ERE-hero-section">
        <span className="ERE-hero-badge">RESULTS UNLOCKED DAILY</span>
        <h1 className="ERE-mega-heading">ENTHUSIA 2026 Selections</h1>
        <p className="ERE-hero-subtitle">
          Results for each event are revealed daily. Scratch today's card to see who made it!
        </p>
        {nextEventToUnlock && (
          <div className="ERE-next-unlock-info">
            <span className="ERE-next-unlock-label">Next unlock:</span>
            <span className="ERE-next-unlock-event">{nextEventToUnlock.eventName}</span>
            <span className="ERE-next-unlock-date">on {formatNextUnlockTime()}</span>
          </div>
        )}
      </section>
      
      <main className="ERE-main-container">
        <div className="ERE-results-grid">
          {resultsData.map((result, index) => (
            <ScratchCard 
              key={index} 
              {...result}
              status={getEventStatus(result.eventDate)}
              currentTime={currentTime}
            />
          ))}
        </div>
      </main>

      <section className="ERE-show-all-section">
        <button onClick={() => setIsModalOpen(true)} className="ERE-show-all-btn">
          View All Unlocked Results
        </button>
      </section>

      {isModalOpen && (
        <div className="ERE-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="ERE-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="ERE-modal-close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            <h2 className="ERE-modal-title">Unlocked Selections</h2>
            <div className="ERE-modal-list-container">
              {pastAndPresentEvents.map((result, index) => (
                <div key={index} className="ERE-modal-event-group">
                  <h3>{result.eventName}</h3>
                  <ul className="ERE-modal-winner-list">
                    {result.winnerIds.map(id => <li key={id}>{id}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EResult;