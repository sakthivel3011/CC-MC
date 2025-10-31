import React, { useState, useEffect, useRef, useCallback } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/EResult.css'; // Using the new, advanced CSS file

// --- NEW DATA STRUCTURE ---
// Each event now has a date and an array of selected IDs.
// Note: Month is 0-indexed (9 = October).
const resultsData = [
  { eventName: 'Comic Satire', eventDate: new Date(2025, 1, 2), winnerIds: ['CS-841', 'CS-239', 'CS-505', 'CS-711', 'CS-182', 'CS-463', 'CS-904', 'CS-625', 'CS-337', 'CS-098'] },
  { eventName: 'Solo Instrumental', eventDate: new Date(2025, 1, 3), winnerIds: ['SI-199', 'SI-452', 'SI-821', 'SI-673', 'SI-304', 'SI-555', 'SI-789', 'SI-210', 'SI-936', 'SI-047'] },
  { eventName: 'Solo Dance', eventDate: new Date(2025, 9, 31), winnerIds: ['SD-702', 'SD-311', 'SD-940', 'SD-568', 'SD-227', 'SD-881', 'SD-135', 'SD-694', 'SD-403', 'SD-076'] },
  { eventName: 'Solo Singing', eventDate: new Date(2025, 10, 1), winnerIds: ['SS-613', 'SS-874', 'SS-295', 'SS-516', 'SS-148', 'SS-739', 'SS-480', 'SS-902', 'SS-321', 'SS-067'] },
  { eventName: 'Mime', eventDate: new Date(2025, 10, 2), winnerIds: ['MM-444', 'MM-167', 'MM-818', 'MM-359', 'MM-720', 'MM-991', 'MM-202', 'MM-583', 'MM-634', 'MM-015'] },
  { eventName: 'Stand Up Comedy', eventDate: new Date(2025, 10, 3), winnerIds: ['SU-912', 'SU-253', 'SU-704', 'SU-495', 'SU-126', 'SU-847', 'SU-338', 'SU-689', 'SU-570', 'SU-001'] },
  { eventName: 'Fashion Parade', eventDate: new Date(2025, 10, 4), winnerIds: ['FP-314', 'FP-159', 'FP-265', 'FP-358', 'FP-979', 'FP-323', 'FP-846', 'FP-264', 'FP-338', 'FP-327'] },
  { eventName: 'Short Film', eventDate: new Date(2025, 10, 5), winnerIds: ['SF-411', 'SF-753', 'SF-098', 'SF-521', 'SF-888', 'SF-246', 'SF-135', 'SF-679', 'SF-900', 'SF-333'] },
];


// === Advanced Scratch Card Component ===
const ScratchCard = ({ eventName, eventDate, winnerIds, status }) => {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // Function to format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };

  const drawOverlay = useCallback((ctx, canvas) => {
    // Advanced gradient for a metallic look
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#B8860B'); // dark-gold
    gradient.addColorStop(0.3, '#FFD700'); // gold
    gradient.addColorStop(0.5, '#FFF9C4'); // light-gold
    gradient.addColorStop(0.7, '#FFD700'); // gold
    gradient.addColorStop(1, '#B8860B'); // dark-gold
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add text on top
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.font = 'bold 16px "Space Grotesk"';
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
    const scratchRadius = 25;

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
        ctx.beginPath();
        ctx.arc(x, y, scratchRadius, 0, 2 * Math.PI, false);
        ctx.fill();
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
                if ((transparentPixels / totalPixels) > 0.6) {
                    setIsRevealed(true);
                }
            }, 300); // Check every 300ms while scratching
        };
    })();

    const start = (e) => { e.preventDefault(); isDrawing = true; scratch(getPosition(e).x, getPosition(e).y); };
    const move = (e) => { if (isDrawing) { e.preventDefault(); scratch(getPosition(e).x, getPosition(e).y); checkReveal(); }};
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
            <p>Results unlock on {formatDate(eventDate)}</p>
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
  // SIMULATE TODAY'S DATE. Change this to new Date() for live deployment.
  const today = new Date('2025-10-31');
  today.setHours(0, 0, 0, 0); // Normalize to midnight for accurate date comparison

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, offset: 50, easing: 'ease-out-cubic' });
  }, []);

  const getEventStatus = (eventDate) => {
    const normalizedEventDate = new Date(eventDate);
    normalizedEventDate.setHours(0, 0, 0, 0);

    if (normalizedEventDate < today) return 'revealed';
    if (normalizedEventDate.getTime() === today.getTime()) return 'active';
    return 'locked';
  };

  const pastAndPresentEvents = resultsData.filter(event => getEventStatus(event.eventDate) !== 'locked');

  return (
    <div className="ERE-universe">
      <section className="ERE-hero-section">
        <span className="ERE-hero-badge">RESULTS UNLOCKED DAILY</span>
        <h1 className="ERE-mega-heading">ENTHUSIA 2026 Selections</h1>
        <p className="ERE-hero-subtitle">
          Results for each event are revealed daily. Scratch today's card to see who made it!
        </p>
      </section>
      
      <main className="ERE-main-container">
        <div className="ERE-results-grid">
          {resultsData.map((result, index) => (
            <ScratchCard 
              key={index} 
              {...result}
              status={getEventStatus(result.eventDate)} 
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