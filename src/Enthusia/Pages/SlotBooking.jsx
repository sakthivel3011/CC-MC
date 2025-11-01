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

const EVENT_TIMINGS = {
  'Comic Satire': ['9:00-9:20', '9:25-9:45', '9:50-10:10'],
  'Solo Instrumental': ['10:15-10:30', '10:35-10:50', '10:55-11:10'],
  'Group Instrumental': ['11:15-11:35', '11:40-12:00', '12:05-12:25'],
  'Solo Dance': ['9:05-9:20', '10:00-10:20', '11:00-11:20'],
  'Dual Dance': ['12:30-12:50', '12:55-1:15', '1:20-1:40'],
  'Group Dance': ['1:45-2:10', '2:15-2:40', '2:45-3:10'],
  'Solo Singing': ['3:15-3:30', '3:35-3:50', '3:55-4:10'],
  'Group Singing': ['4:15-4:35', '4:40-5:00', '5:05-5:25'],
  'Mime': ['9:10-9:30', '9:35-9:55', '10:00-10:20'],
  'Imitation': ['10:25-10:40', '10:45-11:00', '11:05-11:20'],
  'Fashion Parade': ['11:25-11:50', '11:55-12:20', '12:25-12:50'],
  'Movie Depiction': ['12:55-1:20', '1:25-1:50', '1:55-2:20'],
  'Skit': ['2:25-2:50', '2:55-3:20', '3:25-3:50'],
  'Short Film': ['3:55-4:20', '4:25-4:50', '4:55-5:20'],
  'Stand Up Comedy': ['9:15-9:35', '9:40-10:00', '10:05-10:25'],
  'Anchoring': ['10:30-10:45', '10:50-11:05', '11:10-11:25']
};

const EventBookingSystem = () => {
  const [step, setStep] = useState('config');
  const [config, setConfig] = useState({
    startDate: '',
    endDate: '',
    startTime: '09:00',
    endTime: '17:00'
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookings, setBookings] = useState({});
  const [formData, setFormData] = useState({
    teamId: '',
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [teamIdCounter, setTeamIdCounter] = useState({});

  useEffect(() => {
    if (step !== 'config') {
      fetchBookings();
      const interval = setInterval(fetchBookings, 2000);
      return () => clearInterval(interval);
    }
  }, [step]);

  useEffect(() => {
    if (selectedEvent && !formData.teamId) {
      const code = EVENTS[selectedEvent];
      const count = (teamIdCounter[code] || 0) + 1;
      const newId = `${code}${String(count).padStart(2, '0')}`;
      setFormData(prev => ({ ...prev, teamId: newId }));
      setTeamIdCounter(prev => ({ ...prev, [code]: count }));
    }
  }, [selectedEvent]);

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

  const handleConfigSubmit = (e) => {
    e.preventDefault();
    if (!config.startDate || !config.endDate) {
      setMessage({ type: 'error', text: 'Please set both start and end dates' });
      return;
    }
    setStep('events');
    setMessage({ type: '', text: '' });
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setSelectedSlot(null);
    setFormData({ teamId: '', name: '', email: '' });
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

  const validateTeamId = (id) => {
    if (id.length !== 4) return false;
    const letters = id.substring(0, 2).toUpperCase();
    const numbers = id.substring(2, 4);
    return /^[A-Z]{2}$/.test(letters) && /^[0-9]{2}$/.test(numbers);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (!validateTeamId(formData.teamId)) {
      setMessage({ type: 'error', text: 'Team ID must be 2 letters + 2 numbers (e.g., SD01)' });
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

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          action: 'book',
          event: selectedEvent,
          day: selectedSlot.day,
          timeSlot: selectedSlot.timeSlot,
          teamId: formData.teamId.toUpperCase(),
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
          setFormData({ teamId: '', name: '', email: '' });
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

  const getDaysBetween = () => {
    if (!config.startDate || !config.endDate) return [];
    const start = new Date(config.startDate);
    const end = new Date(config.endDate);
    const days = [];
    let current = new Date(start);
    
    while (current <= end) {
      days.push({
        label: `Day ${days.length + 1}`,
        date: new Date(current)
      });
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const isSlotBooked = (day, timeSlot) => {
    const key = `${selectedEvent}_${day}_${timeSlot}`;
    return !!bookings[key];
  };

  const getBookedCount = (eventName) => {
    return Object.keys(bookings).filter(key => key.startsWith(`${eventName}_`)).length;
  };

  // Config Step
  if (step === 'config') {
    return (
      <div className="SB-container SB-flex SB-items-center SB-justify-center">
        <div className="SB-card SB-max-w-md SB-w-full">
          <div className="SB-text-center SB-mb-8">
            <Calendar className="SB-icon-xl SB-mx-auto SB-mb-4 SB-text-purple-600" />
            <h1 className="SB-text-3xl SB-font-bold SB-text-gray-900 SB-mb-2">Event Booking System</h1>
            <p className="SB-text-gray-600">Configure your event dates and timings</p>
          </div>

          <form onSubmit={handleConfigSubmit} className="SB-space-y-6">
            <div>
              <label className="SB-label">Start Date</label>
              <input
                type="date"
                value={config.startDate}
                onChange={(e) => setConfig({ ...config, startDate: e.target.value })}
                className="SB-input"
                required
              />
            </div>

            <div>
              <label className="SB-label">End Date</label>
              <input
                type="date"
                value={config.endDate}
                onChange={(e) => setConfig({ ...config, endDate: e.target.value })}
                className="SB-input"
                required
              />
            </div>

            <div className="SB-grid SB-grid-cols-2 SB-gap-4">
              <div>
                <label className="SB-label">Start Time</label>
                <input
                  type="time"
                  value={config.startTime}
                  onChange={(e) => setConfig({ ...config, startTime: e.target.value })}
                  className="SB-input"
                />
              </div>
              <div>
                <label className="SB-label">End Time</label>
                <input
                  type="time"
                  value={config.endTime}
                  onChange={(e) => setConfig({ ...config, endTime: e.target.value })}
                  className="SB-input"
                />
              </div>
            </div>

            {message.text && (
              <div className={`SB-message ${message.type === 'error' ? 'SB-message-error' : 'SB-message-success'}`}>
                {message.text}
              </div>
            )}

            <button type="submit" className="SB-btn SB-btn-primary">
              Continue to Events
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Events Step
  if (step === 'events') {
    return (
      <div className="SB-container">
        <div className="SB-max-w-7xl SB-mx-auto">
          <div className="SB-text-center SB-mb-12">
            <h1 className="SB-text-5xl SB-font-bold SB-text-white SB-mb-4">Select Your Event</h1>
            <p className="SB-text-purple-200 SB-text-lg">Choose from 16 amazing events</p>
            <div className="SB-flex SB-items-center SB-justify-center SB-gap-2 SB-mt-4 SB-text-purple-200">
              <Calendar className="SB-icon-md" />
              <span>{config.startDate} to {config.endDate}</span>
            </div>
          </div>

          <div className="SB-grid SB-grid-cols-2 SB-md-grid-cols-4 SB-lg-grid-cols-4 SB-gap-4 SB-mb-8">
            {Object.entries(EVENTS).map(([name, code]) => {
              const bookedCount = getBookedCount(name);
              const totalSlots = EVENT_TIMINGS[name]?.length * getDaysBetween().length || 0;
              
              return (
                <button
                  key={code}
                  onClick={() => handleEventSelect(name)}
                  className="SB-event-card"
                >
                  <div className="SB-text-center">
                    <div className="SB-event-code">
                      {code}
                    </div>
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
        </div>
      </div>
    );
  }

  // Slots Step
  if (step === 'slots') {
    const days = getDaysBetween();
    const timeSlots = EVENT_TIMINGS[selectedEvent] || [];

    return (
      <div className="SB-container">
        <div className="SB-max-w-6xl SB-mx-auto">
          <button
            onClick={() => setStep('events')}
            className="SB-btn-back SB-mb-6"
          >
            ← Back to Events
          </button>

          <div className="SB-card SB-mb-8">
            <div className="SB-flex SB-items-center SB-justify-between SB-mb-6">
              <div>
                <h2 className="SB-text-3xl SB-font-bold SB-text-gray-900">{selectedEvent}</h2>
                <p className="SB-text-gray-600 SB-flex SB-items-center SB-gap-2 SB-mt-2">
                  <span className="SB-badge SB-bg-purple-100 SB-text-purple-700 SB-rounded-full">
                    {EVENTS[selectedEvent]}
                  </span>
                </p>
              </div>
              <Clock className="SB-icon-lg SB-text-purple-600" />
            </div>

            <div className="SB-space-y-6">
              {days.map((day) => (
                <div key={day.label} className="SB-day-section">
                  <h3 className="SB-day-header">
                    <Calendar className="SB-icon-md SB-text-purple-600" />
                    {day.label} - {day.date.toLocaleDateString()}
                  </h3>
                  <div className="SB-grid SB-grid-cols-1 SB-md-grid-cols-3 SB-gap-3">
                    {timeSlots.map((slot) => {
                      const booked = isSlotBooked(day.label, slot);
                      const bookingInfo = bookings[`${selectedEvent}_${day.label}_${slot}`];
                      
                      return (
                        <button
                          key={slot}
                          onClick={() => !booked && handleSlotSelect(day.label, slot)}
                          disabled={booked}
                          className={`SB-slot-card ${booked ? 'SB-slot-booked' : 'SB-slot-available'}`}
                        >
                          <div className="SB-slot-header">
                            <Clock className="SB-icon-md" />
                            <span>{slot}</span>
                          </div>
                          {booked && (
                            <div className="SB-slot-info">
                              Booked by {bookingInfo?.name}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
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
          <button
            onClick={() => setStep('slots')}
            className="SB-btn-back SB-mb-6 SB-text-gray-600"
            style={{ color: '#4b5563' }}
          >
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
              <label className="SB-label">Team ID (2 letters + 2 numbers)</label>
              <input
                type="text"
                value={formData.teamId}
                onChange={(e) => setFormData({ ...formData, teamId: e.target.value.toUpperCase() })}
                maxLength={4}
                placeholder="SD01"
                className="SB-input SB-font-mono SB-text-lg"
                required
              />
            </div>

            <div>
              <label className="SB-label">Team Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter team name"
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
                placeholder="team@example.com"
                className="SB-input"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="SB-btn SB-btn-primary"
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default EventBookingSystem;