import React from 'react';
import '../styles/ELogoScroll.css';

const ELogoScroll = () => {
  // Sponsor/Partner logos - you can replace these with actual logo paths
  const logos = [
    { name: 'Cultural Club', logo: '/src/assets/images/logo1.png' },
    { name: 'Dance Society', logo: '/src/assets/images/logo2.png' },
    { name: 'Music Club', logo: '/src/assets/images/logo3.png' },
    { name: 'Drama Society', logo: '/src/assets/images/logo4.png' },
    { name: 'Art Club', logo: '/src/assets/images/logo5.png' },
    { name: 'Literature Club', logo: '/src/assets/images/logo6.png' },
    { name: 'Film Society', logo: '/src/assets/images/logo7.png' },
    { name: 'Photography Club', logo: '/src/assets/images/logo8.png' },
  ];

  // Duplicate logos for seamless scrolling
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="elogo-scroll-container">
      <div className="elogo-scroll-track">
        {duplicatedLogos.map((logo, index) => (
          <div key={index} className="elogo-item">
            <div className="elogo-placeholder">
              <span>{logo.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ELogoScroll;