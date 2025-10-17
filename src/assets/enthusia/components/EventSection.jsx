import React, { useState, useEffect, useMemo } from 'react';
import { eventData, eventCategories, getEventsByCategory } from '../utils/Enthusia.js';
import EventCard from './EventCard';

const EventSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState(eventData);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Memoize categories to prevent recalculation
  const categories = useMemo(() => [
    { id: 'all', label: 'All Events', icon: '🎭', count: eventData.length },
    { id: eventCategories.SOLO, label: 'Solo Events', icon: '🎤', count: getEventsByCategory(eventCategories.SOLO).length },
    { id: eventCategories.DUAL, label: 'Dual Events', icon: '👥', count: getEventsByCategory(eventCategories.DUAL).length },
    { id: eventCategories.GROUP, label: 'Group Events', icon: '🎪', count: getEventsByCategory(eventCategories.GROUP).length }
  ], []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredEvents(eventData);
    } else {
      setFilteredEvents(getEventsByCategory(activeCategory));
    }
  }, [activeCategory]);

  const handleEventRegister = (event) => {
    setSelectedEvent(event);
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    
    // Smooth scroll to events grid
    const eventsGrid = document.querySelector('.events-grid');
    if (eventsGrid) {
      eventsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="events-section" className="event-categories">
      <div className="container">
        <h2 className="section-title">
          Choose Your Stage
        </h2>
        <p className="section-subtitle">
          Discover 15 exciting events across solo, dual, and group categories
        </p>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              <span className="tab-icon">{category.icon}</span>
              <span className="tab-label">{category.label}</span>
              <span className="tab-count">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Events Stats */}
        <div className="events-stats">
          <div className="stat-item">
            <span className="stat-number">{filteredEvents.length}</span>
            <span className="stat-label">Events</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              ₹{filteredEvents.reduce((total, event) => total + parseInt(event.prizes[0].replace('₹', '').replace(',', '')), 0).toLocaleString()}
            </span>
            <span className="stat-label">Total Prize Money</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2</span>
            <span className="stat-label">Days</span>
          </div>
        </div>

        {/* Events Grid */}
        <div className="events-grid">
          {filteredEvents.map((event, index) => (
            <div key={event.id}>
              <EventCard 
                event={event} 
                onRegister={handleEventRegister}
              />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="events-cta">
          <h3>Ready to Showcase Your Talent?</h3>
          <p>Join hundreds of participants in KEC's biggest cultural extravaganza</p>
          <div className="cta-buttons">
            <button className="btn-primary large">
              <i className="fas fa-users"></i>
              Register for Multiple Events
            </button>
            <button className="btn-secondary large">
              <i className="fas fa-download"></i>
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventSection;