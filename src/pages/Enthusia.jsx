import React from 'react';
import Ehero from '../Enthusia/components/Ehero';
import Navbar from '../components/Navbar';

import ELogoScroll from '../Enthusia/components/ELogoScroll';
import ECarousel from '../Enthusia/components/ECarousel';
import EEvents from '../Enthusia/components/EEvents';
import EAbout from '../Enthusia/components/EAbout';
import ESchedule from '../Enthusia/components/Result';
import EContact from '../Enthusia/components/EContact';
import EResult from '../Enthusia/components/EResult';
import Admin from '../Enthusia/Pages/Ec';
import '../Enthusia/styles/Enthusia.css';

const Enthusia = () => {
  return (
    <div className="enthusia-page">
      <Navbar />
      <div className="main-content">
        {/* Hero Section */}
        <Ehero />
        
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

        <EResult />
        
        {/* Contact Section */}
        <EContact />
        
      </div>
      
    </div>
  );
};

export default Enthusia;
