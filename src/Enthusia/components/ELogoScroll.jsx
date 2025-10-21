import React, { useState, useEffect } from 'react';
import '../styles/ELogoScroll.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo1 from '../images/Logo/19.png';
import logo2 from '../images/Logo/20.png';
import logo3 from '../images/Logo/21.png';
import logo4 from '../images/Logo/22.jpg';
import logo5 from '../images/Logo/23.jpg';
import logo6 from '../images/Logo/24.png';
import logo7 from '../images/Logo/25.png';
import logo8 from '../images/Logo/25N.png';

const ELogoScroll = () => {
  const [isScrolling, setIsScrolling] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  // Enhanced logos with descriptions
  const logos = [
    { id: 1, name: 'CC 19', logo: logo1, year: '2019', description: 'Cultural Committee 2019' },
    { id: 2, name: 'CC 20', logo: logo2, year: '2020', description: 'Cultural Committee 2020' },
    { id: 3, name: 'CC 21', logo: logo3, year: '2021', description: 'Cultural Committee 2021' },
    { id: 4, name: 'CC 22', logo: logo4, year: '2022', description: 'Cultural Committee 2022' },
    { id: 5, name: 'CC 23', logo: logo5, year: '2023', description: 'Cultural Committee 2023' },
    { id: 6, name: 'CC 24', logo: logo6, year: '2024', description: 'Cultural Committee 2024' },
    { id: 7, name: 'CC 25', logo: logo7, year: '2025', description: 'Cultural Committee 2025' },
    { id: 8, name: 'CC 25N', logo: logo8, year: '2025', description: 'Cultural Committee 2025 New' },
  ];

  // Duplicate logos for seamless scrolling
  const duplicatedLogos = [...logos, ...logos];

  const handleLogoClick = (logo) => {
    console.log(`Clicked on ${logo.name} - ${logo.description}`);
    // Add your click logic here
    alert(`You clicked on ${logo.name} (${logo.year})`);
  };



  return (
    <div className="elogo-scroll-wrapper" data-aos="fade-up">
      
      
      <div className="elogo-scroll-container">
        <div className="elogo-scroll-track">
          {duplicatedLogos.map((logo, index) => (
            <div 
              key={`${logo.id}-${index}`} 
              className="elogo-item"
              onClick={() => handleLogoClick(logo)}
              data-aos="fade-up"
              data-aos-delay={index * 20}
            >
              <img 
                src={logo.logo} 
                alt={logo.name}
                className="elogo-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ELogoScroll;