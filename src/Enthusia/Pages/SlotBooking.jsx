import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, CheckCircle, XCircle } from 'lucide-react';
import '../styles/SlotBooking.css';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby7qwEzb1En0PwFkzPDnKIIU3hXxqJSLcs_2NxDKRYm_R_L1upGIggoqCk2C4NEPbXp/exec';

const EVENTS = {
  'Comic Satire': 'CS',
  'Solo Instrumental': 'SI',
  'Group Instrumental': 'GI',
  'Solo Dance': 'SD',
  'Dual Dance': 'DD',
  'Group Dance': 'GD',
  'Solo Singing': 'SS',
  'Group Singing': 'GS',
  'Mime': 'ME',
  'Imitation': 'IP',
  'Fashion Parade': 'FP',
  'Movie Depiction': 'MD',
  'Skit': 'SK',
  'Short Film': 'SF',
  'Stand Up Comedy': 'SC',
  'Anchoring': 'AC'
};

// ========== CONFIGURE YOUR BOOKING DATES HERE ==========
const BOOKING_CONFIG = {
  bookingOpenDate: '2025-11-02',      // When bookings open
  bookingOpenTime: '01:00',           // Time bookings open
  bookingCloseDate: '2025-11-11',     // When bookings close
  bookingCloseTime: '01:50',          // Time bookings close
  
  // Event Dates
  day1Date: '2025-11-10',
  day2Date: '2025-11-11'
};

// Event-specific timings
const EVENT_TIMINGS = {
  'Comic Satire': {
    'Day 1': ['9:00-9:24', '9:25-9:45', '9:50-10:10', '10:15-10:30'],
    'Day 2': ['9:00-9:25', '9:25-9:45', '9:50-10:10', '10:15-10:30']
  },
  'Solo Instrumental': {
    'Day 1': ['10:15-10:30', '10:35-10:50', '10:55-11:10'],
    'Day 2': ['11:00-11:15', '11:20-11:35', '11:40-11:55']
  },
  'Group Instrumental': {
    'Day 1': ['11:15-11:35', '11:40-12:00', '12:05-12:25'],
    'Day 2': ['12:00-12:20', '12:25-12:45', '12:50-1:10']
  },
  'Solo Dance': {
    'Day 1': ['9:05-9:20', '10:00-10:20', '11:00-11:20'],
    'Day 2': ['9:30-9:50', '10:30-10:50', '11:30-11:50']
  },
  'Dual Dance': {
    'Day 1': ['12:30-12:50', '12:55-1:15', '1:20-1:40'],
    'Day 2': ['1:15-1:35', '1:40-2:00', '2:05-2:25']
  },
  'Group Dance': {
    'Day 1': ['1:45-2:10', '2:15-2:40', '2:45-3:10'],
    'Day 2': ['2:30-2:55', '3:00-3:25', '3:30-3:55']
  },
  'Solo Singing': {
    'Day 1': ['3:15-3:30', '3:35-3:50', '3:55-4:10'],
    'Day 2': ['4:00-4:15', '4:20-4:35', '4:40-4:55']
  },
  'Group Singing': {
    'Day 1': ['4:15-4:35', '4:40-5:00', '5:05-5:25'],
    'Day 2': ['5:00-5:20', '5:25-5:45', '5:50-6:10']
  },
  'Mime': {
    'Day 1': ['9:10-9:30', '9:35-9:55', '10:00-10:20'],
    'Day 2': ['9:40-10:00', '10:05-10:25', '10:30-10:50']
  },
  'Imitation': {
    'Day 1': ['10:25-10:40', '10:45-11:00', '11:05-11:20'],
    'Day 2': ['10:55-11:10', '11:15-11:30', '11:35-11:50']
  },
  'Fashion Parade': {
    'Day 1': ['11:25-11:50', '11:55-12:20', '12:25-12:50'],
    'Day 2': ['11:55-12:20', '12:25-12:50', '12:55-1:20']
  },
  'Movie Depiction': {
    'Day 1': ['12:55-1:20', '1:25-1:50', '1:55-2:20'],
    'Day 2': ['1:25-1:50', '1:55-2:20', '2:25-2:50']
  },
  'Skit': {
    'Day 1': ['2:25-2:50', '2:55-3:20', '3:25-3:50'],
    'Day 2': ['2:55-3:20', '3:25-3:50', '3:55-4:20']
  },
  'Short Film': {
    'Day 1': ['3:55-4:20', '4:25-4:50', '4:55-5:20'],
    'Day 2': ['4:25-4:50', '4:55-5:20', '5:25-5:50']
  },
  'Stand Up Comedy': {
    'Day 1': ['9:15-9:35', '9:40-10:00', '10:05-10:25'],
    'Day 2': ['9:45-10:05', '10:10-10:30', '10:35-10:55']
  },
  'Anchoring': {
    'Day 1': ['10:30-10:45', '10:50-11:05', '11:10-11:25'],
    'Day 2': ['11:00-11:15', '11:20-11:35', '11:40-11:55']
  }
};
// ========================================================

const EventBookingSystem = () => {
  const [step, setStep] = useState('events');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookings, setBookings] = useState({});
  const [formData, setFormData] = useState({
    teamNumber: '',
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [bookingStatus, setBookingStatus] = useState('waiting');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const openDateTime = new Date(`${BOOKING_CONFIG.bookingOpenDate}T${BOOKING_CONFIG.bookingOpenTime}:00`);
      const closeDateTime = new Date(`${BOOKING_CONFIG.bookingCloseDate}T${BOOKING_CONFIG.bookingCloseTime}:00`);
      
      if (now >= closeDateTime) {
        setBookingStatus('closed');
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else if (now >= openDateTime) {
        setBookingStatus('open');
        const diff = closeDateTime - now;
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      } else {
        setBookingStatus('waiting');
        const diff = openDateTime - now;
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (bookingStatus === 'open') {
      fetchBookings();
      const interval = setInterval(fetchBookings, 2000);
      return () => clearInterval(interval);
    }
  }, [bookingStatus]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${SCRIPT_URL}?action=read&t=${Date.now()}`);
      const data = await response.json();
      
      if (data.success && data.bookings) {
        const bookingMap = {};
        data.bookings.forEach(booking => {
          const key = `${booking.event}_${booking.day}_${booking.timeSlot}`;
          bookingMap[key] = booking;
        });
        setBookings(bookingMap);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleEventSelect = (event) => {
    if (bookingStatus !== 'open') {
      setMessage({ type: 'error', text: 'Bookings are not open yet!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      return;
    }
    setSelectedEvent(event);
    setSelectedSlot(null);
    setFormData({ teamNumber: '', name: '', email: '' });
    setStep('slots');
  };

  const handleSlotSelect = (day, timeSlot) => {
    const key = `${selectedEvent}_${day}_${timeSlot}`;
    if (bookings[key]) {
      setMessage({ type: 'error', text: `This slot is already booked by ${bookings[key].name}` });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      return;
    }
    setSelectedSlot({ day, timeSlot });
    setStep('booking');
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (!/^\d{2}$/.test(formData.teamNumber)) {
      setMessage({ type: 'error', text: 'Team number must be 2 digits (e.g., 01)' });
      setLoading(false);
      return;
    }

    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Please enter team name' });
      setLoading(false);
      return;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setMessage({ type: 'error', text: 'Please enter valid email' });
      setLoading(false);
      return;
    }

    const fullTeamId = `${EVENTS[selectedEvent]}${formData.teamNumber}`;

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          action: 'book',
          event: selectedEvent,
          day: selectedSlot.day,
          timeSlot: selectedSlot.timeSlot,
          teamId: fullTeamId,
          name: formData.name,
          email: formData.email
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Booking confirmed! Check your email.' });
        setTimeout(() => {
          setStep('events');
          setSelectedEvent(null);
          setSelectedSlot(null);
          setFormData({ teamNumber: '', name: '', email: '' });
          setMessage({ type: '', text: '' });
          fetchBookings();
        }, 3000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Booking failed. Please try another slot.' });
        setTimeout(() => fetchBookings(), 1000);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const isSlotBooked = (day, timeSlot) => {
    const key = `${selectedEvent}_${day}_${timeSlot}`;
    return !!bookings[key];
  };

  const getBookedCount = (eventName) => {
    return Object.keys(bookings).filter(key => key.startsWith(`${eventName}_`)).length;
  };

  const getTotalSlots = (eventName) => {
    const timings = EVENT_TIMINGS[eventName];
    if (!timings) return 0;
    return (timings['Day 1']?.length || 0) + (timings['Day 2']?.length || 0);
  };

  const getEventTimings = (eventName, day) => {
    return EVENT_TIMINGS[eventName]?.[day] || [];
  };

  // Events Step with Countdown
  if (step === 'events') {
    return (
      <div className="SB-container">
        <div className="SB-max-w-7xl SB-mx-auto">
          {bookingStatus === 'waiting' && (
            <div className="SB-countdown-section">
              <h2 className="SB-countdown-title">Bookings Open In</h2>
              <div className="SB-countdown-grid">
                <div className="SB-countdown-box">
                  <div className="SB-countdown-number">{String(countdown.days).padStart(2, '0')}</div>
                  <div className="SB-countdown-label">DAYS</div>
                </div>
                <div className="SB-countdown-divider">:</div>
                <div className="SB-countdown-box">
                  <div className="SB-countdown-number">{String(countdown.hours).padStart(2, '0')}</div>
                  <div className="SB-countdown-label">HOURS</div>
                </div>
                <div className="SB-countdown-divider">:</div>
                <div className="SB-countdown-box">
                  <div className="SB-countdown-number">{String(countdown.minutes).padStart(2, '0')}</div>
                  <div className="SB-countdown-label">MINUTES</div>
                </div>
                <div className="SB-countdown-divider">:</div>
                <div className="SB-countdown-box">
                  <div className="SB-countdown-number">{String(countdown.seconds).padStart(2, '0')}</div>
                  <div className="SB-countdown-label">SECONDS</div>
                </div>
              </div>
              <p className="SB-countdown-info">
                Opens on {BOOKING_CONFIG.bookingOpenDate} at {BOOKING_CONFIG.bookingOpenTime}
              </p>
            </div>
          )}

          {bookingStatus === 'open' && (
            <>
              <div className="SB-countdown-section SB-booking-open">
                <h2 className="SB-countdown-title">🎉 Bookings are OPEN! 🎉</h2>
                <div className="SB-countdown-grid">
                  <div className="SB-countdown-box">
                    <div className="SB-countdown-number">{String(countdown.days).padStart(2, '0')}</div>
                    <div className="SB-countdown-label">DAYS</div>
                  </div>
                  <div className="SB-countdown-divider">:</div>
                  <div className="SB-countdown-box">
                    <div className="SB-countdown-number">{String(countdown.hours).padStart(2, '0')}</div>
                    <div className="SB-countdown-label">HOURS</div>
                  </div>
                  <div className="SB-countdown-divider">:</div>
                  <div className="SB-countdown-box">
                    <div className="SB-countdown-number">{String(countdown.minutes).padStart(2, '0')}</div>
                    <div className="SB-countdown-label">MINUTES</div>
                  </div>
                  <div className="SB-countdown-divider">:</div>
                  <div className="SB-countdown-box">
                    <div className="SB-countdown-number">{String(countdown.seconds).padStart(2, '0')}</div>
                    <div className="SB-countdown-label">SECONDS</div>
                  </div>
                </div>
                <p className="SB-countdown-info">
                  Booking closes on {BOOKING_CONFIG.bookingCloseDate} at {BOOKING_CONFIG.bookingCloseTime}
                </p>
              </div>

              <div className="SB-text-center SB-mb-12">
                <h1 className="SB-text-5xl SB-font-bold SB-text-white SB-mb-4">Select Your Event</h1>
                <p className="SB-text-purple-200 SB-text-lg">Choose from 16 amazing events</p>
                <div className="SB-flex SB-items-center SB-justify-center SB-gap-2 SB-mt-4 SB-text-purple-200">
                  <Calendar className="SB-icon-md" />
                  <span>{BOOKING_CONFIG.day1Date} & {BOOKING_CONFIG.day2Date}</span>
                </div>
              </div>

              <div className="SB-grid SB-grid-cols-2 SB-md-grid-cols-4 SB-lg-grid-cols-4 SB-gap-4 SB-mb-8">
                {Object.entries(EVENTS).map(([name, code]) => {
                  const bookedCount = getBookedCount(name);
                  const totalSlots = getTotalSlots(name);
                  
                  return (
                    <button
                      key={code}
                      onClick={() => handleEventSelect(name)}
                      className="SB-event-card"
                    >
                      <div className="SB-text-center">
                        <div className="SB-event-code">{code}</div>
                        <h3 className="SB-event-name">{name}</h3>
                        <div className="SB-event-stats">
                          <Users className="SB-icon-sm" />
                          <span>{bookedCount}/{totalSlots} booked</span>
                        </div>
                      </div>
                      <div className="SB-event-badge">
                        {bookedCount === totalSlots ? (
                          <XCircle className="SB-icon-md SB-text-red-500" />
                        ) : (
                          <CheckCircle className="SB-icon-md SB-text-green-500" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {bookingStatus === 'closed' && (
            <div className="SB-countdown-section SB-booking-closed">
              <h2 className="SB-countdown-title">❌ Bookings are Closed ❌</h2>
              <p className="SB-countdown-info">
                The booking window ended on {BOOKING_CONFIG.bookingCloseDate} at {BOOKING_CONFIG.bookingCloseTime}
              </p>
            </div>
          )}

          {message.text && (
            <div className={`SB-message ${message.type === 'error' ? 'SB-message-error' : 'SB-message-success'}`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Slots Step
  if (step === 'slots') {
    return (
      <div className="SB-container">
        <div className="SB-max-w-6xl SB-mx-auto">
          <button onClick={() => setStep('events')} className="SB-btn-back SB-mb-6">
            ← Back to Events
          </button>

          <div className="SB-card SB-mb-8">
            <div className="SB-flex SB-items-center SB-justify-between SB-mb-6">
              <div>
                <h2 className="SB-text-3xl SB-font-bold SB-text-gray-900">{selectedEvent}</h2>
                <span className="SB-badge SB-bg-purple-100 SB-text-purple-700 SB-rounded-full SB-mt-2">
                  {EVENTS[selectedEvent]}
                </span>
              </div>
              <Clock className="SB-icon-lg SB-text-purple-600" />
            </div>

            <div className="SB-space-y-6">
              <div className="SB-day-section">
                <h3 className="SB-day-header">
                  <Calendar className="SB-icon-md SB-text-purple-600" />
                  Day 1 - {BOOKING_CONFIG.day1Date}
                </h3>
                <div className="SB-grid SB-grid-cols-1 SB-md-grid-cols-3 SB-gap-3">
                  {getEventTimings(selectedEvent, 'Day 1').map((timeSlot, index) => {
                    const booked = isSlotBooked('Day 1', timeSlot);
                    const bookingInfo = bookings[`${selectedEvent}_Day 1_${timeSlot}`];
                    
                    return (
                      <button
                        key={index}
                        onClick={() => !booked && handleSlotSelect('Day 1', timeSlot)}
                        disabled={booked}
                        className={`SB-slot-card ${booked ? 'SB-slot-booked' : 'SB-slot-available'}`}
                      >
                        <div className="SB-slot-header">
                          <Clock className="SB-icon-md" />
                          <span>{timeSlot}</span>
                        </div>
                        {booked && (
                          <div className="SB-slot-info">Booked by {bookingInfo?.name}</div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="SB-day-section">
                <h3 className="SB-day-header">
                  <Calendar className="SB-icon-md SB-text-purple-600" />
                  Day 2 - {BOOKING_CONFIG.day2Date}
                </h3>
                <div className="SB-grid SB-grid-cols-1 SB-md-grid-cols-3 SB-gap-3">
                  {getEventTimings(selectedEvent, 'Day 2').map((timeSlot, index) => {
                    const booked = isSlotBooked('Day 2', timeSlot);
                    const bookingInfo = bookings[`${selectedEvent}_Day 2_${timeSlot}`];
                    
                    return (
                      <button
                        key={index}
                        onClick={() => !booked && handleSlotSelect('Day 2', timeSlot)}
                        disabled={booked}
                        className={`SB-slot-card ${booked ? 'SB-slot-booked' : 'SB-slot-available'}`}
                      >
                        <div className="SB-slot-header">
                          <Clock className="SB-icon-md" />
                          <span>{timeSlot}</span>
                        </div>
                        {booked && (
                          <div className="SB-slot-info">Booked by {bookingInfo?.name}</div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Booking Step
  if (step === 'booking') {
    return (
      <div className="SB-container SB-flex SB-items-center SB-justify-center">
        <div className="SB-card SB-max-w-md SB-w-full">
          <button onClick={() => setStep('slots')} className="SB-btn-back SB-mb-6" style={{ color: '#4b5563' }}>
            ← Back to Slots
          </button>

          <div className="SB-text-center SB-mb-8">
            <div className="SB-event-code" style={{ margin: '0 auto 1rem' }}>
              {EVENTS[selectedEvent]}
            </div>
            <h2 className="SB-text-2xl SB-font-bold SB-text-gray-900 SB-mb-2">{selectedEvent}</h2>
            <div className="SB-badge SB-bg-purple-100 SB-text-purple-700 SB-rounded-full SB-px-4 SB-py-2">
              {selectedSlot.day} | {selectedSlot.timeSlot}
            </div>
          </div>

          {message.text && (
            <div className={`SB-message SB-mb-6 ${message.type === 'error' ? 'SB-message-error' : 'SB-message-success'}`}>
              {message.type === 'error' ? <XCircle className="SB-icon-md" /> : <CheckCircle className="SB-icon-md" />}
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handleBooking} className="SB-space-y-6">
            <div>
              <label className="SB-label">Team Number (2 digits only)</label>
              <div className="SB-team-id-input">
                <span className="SB-team-id-prefix">{EVENTS[selectedEvent]}</span>
                <input
                  type="text"
                  value={formData.teamNumber}
                  onChange={(e) => setFormData({ ...formData, teamNumber: e.target.value.replace(/\D/g, '').slice(0, 2) })}
                  maxLength={2}
                  placeholder="XX"
                  className="SB-team-number-input"
                  required
                />
              </div>
              <p className="SB-helper-text">Example: {EVENTS[selectedEvent]}01, {EVENTS[selectedEvent]}02, etc.</p>
            </div>

            <div>
              <label className="SB-label">Team Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter name"
                className="SB-input"
                required
              />
            </div>

            <div>
              <label className="SB-label">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder=" Yourname@kongu.edu"
                className="SB-input"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="SB-btn SB-btn-primary">
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default EventBookingSystem;