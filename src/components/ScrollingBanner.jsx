import React, { useEffect } from 'react';
import '../assets/styles/ScrollingBanner.css';

const ScrollingBanner = () => {
  useEffect(() => {
    // Optional: Add any initialization code here
  }, []);
  
  // Scrolling messages with their respective paths
  const scrollingText = [
    { text: "Join Enthusia 2026 - Registration Open", path: "/enthusia" },
    { text: "Show Your Talent", path: "/enthusia" },
    { text: "Cultural Events Throughout the Year", path: "/event" },
    { text: "Music Competitions & Workshops", path: "/enthusia" },
    { text: "Drama & Theatre Activities", path: "/enthusia" },
    { text: "Art & Creative Expressions", path: "/gallery" },
    { text: "Be Part of Something Amazing", path: "/contact" },
    { text: "Event Updates & News", path: "/event" }
  ];

  // Static navigation items
  const staticItems = [
    { text: "Enthusia", path: "/enthusia" },
    { text: "Result", path: "/enthusia/result" },
    { text: "Contact", path: "/contact" }
  ];

  const handleStaticClick = (path) => {
    console.log('Navigate to:', path);
    // Navigate to the specified path
    window.location.href = path;
  };

  const handleScrollingTextClick = (path) => {
    console.log('Navigate to scrolling text:', path);
    // Navigate to the specified path
    window.location.href = path;
  };

  return (
    <div className="SB-scrolling-banner">
      <div className="SB-banner-container">
        {/* Left side - Static buttons */}
        <div className="SB-static-section">
          {staticItems.map((item, index) => (
            <span 
              key={index}
              className="SB-static-text"
              onClick={() => handleStaticClick(item.path)}
            >
              {item.text}
            </span>
          ))}
        </div>
        
        {/* Right side - Auto-scrolling text */}
        <div className="SB-moving-section">
          <div className="SB-scrolling-content">
            {/* Duplicate the content for seamless infinite scroll */}
            {[...Array(2)].map((_, setIndex) => (
              <div key={`set-${setIndex}`} className="SB-scroll-text">
                {scrollingText.map((item, index) => (
                  <span 
                    key={`${setIndex}-${index}`} 
                    className="SB-scroll-item"
                    onClick={() => handleScrollingTextClick(item.path)}
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollingBanner;