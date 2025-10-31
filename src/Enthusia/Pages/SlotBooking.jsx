import React, { useState, useEffect } from 'react';
import '../styles/SlotBooking.css'; // Make sure this CSS file is in the same folder

// This function defines the 16 specific events you want to show
const getMasterEventList = () => [
  // Day 1
  { id: 'd1-e1', title: 'solo Dance', day: 'Day 1', time: '9:00 AM' },
  { id: 'd1-e2', title: 'Event 2', day: 'Day 1', time: '10:00 AM' },
  { id: 'd1-e3', title: 'Event 3', day: 'Day 1', time: '11:00 AM' },
  { id: 'd1-e4', title: 'Event 4', day: 'Day 1', time: '1:00 PM' }, // 13:00
  { id: 'd1-e5', title: 'Event 5', day: 'Day 1', time: '2:00 PM' }, // 14:00
  { id: 'd1-e6', title: 'Event 6', day: 'Day 1', time: '3:00 PM' }, // 15:00
  { id: 'd1-e7', title: 'Event 7', day: 'Day 1', time: '4:00 PM' }, // 16:00
  { id: 'd1-e8', title: 'Event 8', day: 'Day 1', time: '5:00 PM' }, // 17:00

  // Day 2
  { id: 'd2-e1', title: 'Event 9', day: 'Day 2', time: '9:00 AM' },
  { id: 'd2-e2', title: 'Event 10', day: 'Day 2', time: '10:00 AM' },
  { id: 'd2-e3', title: 'Event 11', day: 'Day 2', time: '11:00 AM' },
  { id: 'd2-e4', title: 'Event 12', day: 'Day 2', time: '1:00 PM' }, // 13:00
  { id: 'd2-e5', title: 'Event 13', day: 'Day 2', time: '2:00 PM' }, // 14:00
  { id: 'd2-e6', title: 'Event 14', day: 'Day 2', time: '3:00 PM' }, // 15:00
  { id: 'd2-e7', title: 'Event 15', day: 'Day 2', time: '4:00 PM' }, // 16:00
  { id: 'd2-e8', title: 'Event 16', day: 'Day 2', time: '5:00 PM' }, // 17:00
];

const SlotBooking = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingId, setBookingId] = useState('');
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Replace with your deployed Google Apps Script URL
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwh3d-NOWaqjn6iJZVvrD15ZFxVSTT-JH5s5wB7ikGx1BUV75l1obXpEoLXZcBZ3Jlp/exec';

  /**
   * Helper to parse time string (e.g., "9:00 AM" or "5:00 PM") to a 24-hour number
   */
  const parseHour = (timeString) => {
    const [time, period] = timeString.split(' ');
    let [hour] = time.split(':').map(Number);
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    }
    if (period === 'AM' && hour === 12) { // 12:00 AM is 0
      hour = 0;
    }
    return hour;
  };

  /**
   * Fetches bookings from Google Sheets and merges with the master event list.
   * Also checks for and blocks past time slots.
   */
  const fetchBookings = async () => {
    try {
      // 1. Get the master list of 16 events
      let masterEvents = getMasterEventList().map(event => ({
        ...event,
        status: 'available', // default status
        booked: false,
        bookedBy: '',
        userId: '',
        email: ''
      }));

      // 2. Fetch booking data from Google Sheet
      const response = await fetch(`${SCRIPT_URL}?action=read`);
      const data = await response.json();
      
      // 3. Merge booking data
      if (data.success && data.bookings) {
        data.bookings.forEach(booking => {
          const event = masterEvents.find(e => e.day === booking.day && e.time === booking.time);
          if (event && booking.status === 'Booked') {
            event.booked = true;
            event.bookedBy = booking.name;
            event.userId = booking.userId;
            event.email = booking.email;
          }
        });
      }

      // 4. Check for past slots
      const now = new Date();
      // Adjust for Indian Standard Time (IST) - UTC+5:30
      const istOffset = 5.5 * 60 * 60 * 1000;
      const istNow = new Date(now.getTime() + istOffset);

      const today = new Date(istNow.getFullYear(), istNow.getMonth(), istNow.getDate());
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const dayDates = { 'Day 1': today, 'Day 2': tomorrow };

      const updatedEvents = masterEvents.map(event => {
        const eventDate = new Date(dayDates[event.day]);
        const eventHour = parseHour(event.time);
        eventDate.setHours(eventHour, 0, 0, 0); // Set to the start of the hour (in IST)

        // If slot time is in the past (compared to IST now) and it's not booked
        if (eventDate < istNow && !event.booked) {
          return { ...event, status: 'past' };
        }
        return event;
      });
      
      setEvents(updatedEvents);

    } catch (error) {
      console.error('Error fetching bookings:', error);
      setEvents(getMasterEventList().map(e => ({ ...e, status: 'available' }))); // Fallback
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and set interval to re-fetch
  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const handleEventClick = (event) => {
    if (event.status === 'available' && !event.booked) {
      setSelectedEvent(event);
      setBookingStep(1);
      setError('');
      setBookingId('');
      setBookingName('');
      setBookingEmail('');
    } else if (event.booked) {
      setError(`This slot is already booked by ${event.bookedBy}`);
      setTimeout(() => setError(''), 3000);
    }
    // Clicks on 'past' do nothing
  };

  const checkUserBooking = (userId) => {
    return events.find(e => e.userId === userId && e.booked);
  };

  const handleNextStep = () => {
    setError('');

    if (bookingStep === 1) {
      if (!bookingId.trim()) {
        setError('Please enter your ID');
        return;
      }
      const existing = checkUserBooking(bookingId);
      if (existing) {
        setError(`You already have a booking for ${existing.title} on ${existing.day}`);
        return;
      }
      setBookingStep(2);
    } else if (bookingStep === 2) {
      if (!bookingName.trim()) {
        setError('Please enter your name');
        return;
      }
      setBookingStep(3);
    } else if (bookingStep === 3) {
      if (!bookingEmail.trim() || !bookingEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setError('Please enter a valid email');
        return;
      }
      handleBooking();
    }
  };

  const handleBooking = async () => {
    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          action: 'book',
          day: selectedEvent.day,
          time: selectedEvent.time,
          userId: bookingId,
          name: bookingName,
          email: bookingEmail
        })
      });

      const data = await response.json();

      if (data.success) {
        setEvents(events.map(e => 
          e.id === selectedEvent.id 
            ? { ...e, booked: true, bookedBy: bookingName, userId: bookingId }
            : e
        ));
        setSuccessMessage(`Booking confirmed! Check ${bookingEmail} for details.`);
        setTimeout(() => {
          closeModal();
          setSuccessMessage('');
        }, 3000);
      } else {
        setError(data.message || 'Slot already booked. Choose another.');
        setTimeout(fetchBookings, 1000); // Re-sync
      }
    } catch (error) {
      setError('Error occurred. Please try again.');
    }
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setBookingStep(1);
    setBookingId('');
    setBookingName('');
    setBookingEmail('');
    setError('');
  };

  if (loading) {
    return (
      <div className="SB-loading-container">
        <div className="SB-loader"></div>
        <p className="SB-loading-text">Loading Event Slots...</p>
      </div>
    );
  }

  const availableCount = events.filter(e => e.status === 'available' && !e.booked).length;
  const bookedCount = events.filter(e => e.booked).length;

  // Helper to get the right CSS class for an event
  const getEventClass = (event) => {
    if (event.booked) return 'SB-event-booked';
    if (event.status === 'past') return 'SB-event-past';
    return 'SB-event-available';
  };

  return (
    <div className="SB-container">
      <header className="SB-header">
        <h1 className="SB-title">Event Booking System</h1>
        <p className="SB-subtitle">Select one of the 16 available event slots</p>
        <div className="SB-stats-bar">
          <div className="SB-stat">
            <span className="SB-stat-number">{availableCount}</span>
            <span className="SB-stat-label">Available</span>
          </div>
          <div className="SB-stat">
            <span className="SB-stat-number">{bookedCount}</span>
            <span className="SB-stat-label">Booked</span>
          </div>
        </div>
      </header>

      {/* New Single Event Grid */}
      <div className="SB-event-grid">
        {events.map((event) => (
          <div
            key={event.id}
            className={`SB-event-card ${getEventClass(event)}`}
            onClick={() => handleEventClick(event)}
          >
            <div className="SB-event-header">
              <h3 className="SB-event-title">{event.title}</h3>
              {event.booked ? (
                <span className="SB-badge SB-badge-booked">Booked</span>
              ) : event.status === 'past' ? (
                <span className="SB-badge SB-badge-past">Past</span>
              ) : (
                <span className="SB-badge SB-badge-available">Available</span>
              )}
            </div>
            <div className="SB-event-details">
              <span className="SB-event-day">{event.day}</span>
              <span className="SB-event-time">{event.time}</span>
            </div>
            {event.booked && (
              <div className="SB-booked-info">
                <svg className="SB-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="SB-booked-name">{event.bookedBy}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="SB-legend">
        <div className="SB-legend-item">
          <div className="SB-legend-color" style={{background: 'var(--enthusia-emerald)'}}></div>
          <span>Available</span>
        </div>
        <div className="SB-legend-item">
          <div className="SB-legend-color" style={{background: 'var(--enthusia-red)'}}></div>
          <span>Booked</span>
        </div>
        <div className="SB-legend-item">
          <div className="SB-legend-color" style={{background: 'var(--enthusia-medium-gray)'}}></div>
          <span>Past</span>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedEvent && (
        <div className="SB-modal-overlay" onClick={closeModal}>
          <div className="SB-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="SB-modal-close" onClick={closeModal}>×</button>
            
            {successMessage ? (
              <div className="SB-success-container">
                <div className="SB-success-icon">✓</div>
                <h3 className="SB-success-title">Booking Confirmed!</h3>
                <p className="SB-success-message">{successMessage}</p>
              </div>
            ) : (
              <>
                <h3 className="SB-modal-title">Book Your Slot</h3>
                
                <div className="SB-progress-bar">
                  <div className={`SB-progress-step ${bookingStep >= 1 ? 'SB-active' : ''}`}>
                    <div className="SB-progress-circle">1</div>
                    <span>ID</span>
                  </div>
                  <div className={`SB-progress-line ${bookingStep >= 2 ? 'SB-active' : ''}`}></div>
                  <div className={`SB-progress-step ${bookingStep >= 2 ? 'SB-active' : ''}`}>
                    <div className="SB-progress-circle">2</div>
                    <span>Name</span>
                  </div>
                  <div className={`SB-progress-line ${bookingStep >= 3 ? 'SB-active' : ''}`}></div>
                  <div className={`SB-progress-step ${bookingStep >= 3 ? 'SB-active' : ''}`}>
                    <div className="SB-progress-circle">3</div>
                    <span>Email</span>
                  </div>
                </div>

                <div className="SB-slot-info">
                  <p className="SB-slot-info-title">{selectedEvent.title}</p>
                  <p className="SB-slot-info-day">{selectedEvent.day} at {selectedEvent.time}</p>
                </div>

                {error && <div className="SB-error-box">{error}</div>}

                {bookingStep === 1 && (
                  <div className="SB-form-group">
                    <label className="SB-label">Your ID</label>
                    <input
                      type="text"
                      className="SB-input"
                      value={bookingId}
                      onChange={(e) => setBookingId(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleNextStep()}
                      placeholder="Enter your unique ID"
                      autoFocus
                    />
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="SB-form-group">
                    <label className="SB-label">Your Name</label>
                    <input
                      type="text"
                      className="SB-input"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleNextStep()}
                      placeholder="Enter your full name"
                      autoFocus
                    />
                  </div>
                )}

                {bookingStep === 3 && (
                  <div className="SB-form-group">
                    <label className="SB-label">Your Email</label>
                    <input
                      type="email"
                      className="SB-input"
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleNextStep()}
                      placeholder="Enter your email"
                      autoFocus
                    />
                  </div>
                )}

                <button className="SB-book-button" onClick={handleNextStep}>
                  {bookingStep === 3 ? 'Confirm Booking' : 'Next'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotBooking;


