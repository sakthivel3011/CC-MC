import React, { useMemo, useCallback } from 'react';
import '../styles/ELogoScroll.css';
import logo1 from '../images/Logo/s1.png';
import logo2 from '../images/Logo/s2.png';
import logo3 from '../images/Logo/s3.png';
import logo4 from '../images/Logo/s4.png';
import logo5 from '../images/Logo/s5.png';



const ELogoScroll = () => {
  const logos = useMemo(() => [
    { id: 1, name: 'CC', logo: logo1, year: '2025', description: 'Cultural Committee 2019' },
    { id: 2, name: 'CC', logo: logo2, year: '2025', description: 'Cultural Committee 2020' },
    { id: 3, name: 'CC', logo: logo3, year: '2025', description: 'Cultural Committee 2021' },
    { id: 4, name: 'CC', logo: logo4, year: '2025', description: 'Cultural Committee 2022' },
    { id: 5, name: 'CC', logo: logo5, year: '2025', description: 'Cultural Committee 2023' },

  ], []);

  const duplicatedLogos = useMemo(() => [...logos, ...logos], [logos]);

  const handleLogoClick = useCallback((logo) => {
    console.log(`Clicked on ${logo.name} - ${logo.description}`);
    alert(`You clicked on ${logo.name} (${logo.year})`);
  }, []);



  return (
    <div className="elogo-scroll-wrapper">
      <div className="elogo-scroll-container">
        <div className="elogo-scroll-track">
          {duplicatedLogos.map((logo, index) => (
            <div 
              key={`${logo.id}-${index}`} 
              className="elogo-item"
              onClick={() => handleLogoClick(logo)}
            >
              <img 
                src={logo.logo} 
                alt={logo.name}
                className="elogo-image"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ELogoScroll;