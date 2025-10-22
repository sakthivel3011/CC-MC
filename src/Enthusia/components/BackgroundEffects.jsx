import React from 'react';

const BackgroundEffects = () => {
  return (
    <div className="background-effects">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="cosmic-clouds"></div>
      <div className="shooting-stars">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="shooting-star" style={{
            '--delay': `${index * 2}s`,
            '--top': `${Math.random() * 100}%`,
            '--left': `${Math.random() * 100}%`,
          }}></div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundEffects;