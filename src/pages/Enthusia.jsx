import React, { useState } from 'react';
import Ehero from '../Enthusia/components/Ehero';
import ESidebar from '../Enthusia/components/ESidebar';
import ELogoScroll from '../Enthusia/components/ELogoScroll';
import ECarousel from '../Enthusia/components/ECarousel';
import EEvents from '../Enthusia/components/EEvents';
import EAbout from '../Enthusia/components/EAbout';
import ESchedule from '../Enthusia/components/ESchedule';
import EContact from '../Enthusia/components/EContact';
import '../Enthusia/styles/Enthusia.css';

const Enthusia = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="enthusia-page">
      {/* Sidebar */}
      <ESidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Hero Section */}
        <Ehero setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        
        {/* Logo Scroll */}
        <ELogoScroll />
        
        {/* Carousel */}
        <ECarousel />
        
        {/* Events Section */}
        <EEvents />
        
        {/* About Section */}
        <EAbout />
        
        {/* Logo Scroll 2 */}
        <ELogoScroll />
        
        {/* Schedule Section */}
        <ESchedule />
        
        {/* Contact Section */}
        <EContact />
      </div>
    </div>
  );
};

export default Enthusia;
