import React, { useEffect } from "react";
import F1 from "../assets/images/faculty/F1.jpeg";
import F2 from "../assets/images/faculty/F2.jpg";
import F3 from "../assets/images/faculty/F3.jpg";
import F4 from "../assets/images/faculty/F4.JPG";
import "../assets/styles/Pillars.css"; // Assuming you have a CSS file for styling
import AOS from 'aos';
import 'aos/dist/aos.css';

const Pillars = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
    // Preload all faculty images for instant display
    [F1, F2, F3, F4].forEach(src => {
      if (!document.head.querySelector(`link[rel='preload'][href='${src}']`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      }
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  const pillars = [
    {
      id: 1,
      name: "Mr. K.V. Satheesh Kumar",
      role: "Faculty Coordinator",
      department: "Dept Of Mechanical Engineering",
      image: F1,
    },
    {
      id: 2,
      name: "Dr. V.N.Kowshalaya",
      role: "Faculty Coordinator",
      department: "Dept Of Chemistry",
      image: F2,
    },
    {
      id: 3,
      name: "Ms. S.Keerthana",
      role: "Faculty Coordinator",
      department: "Dept Of CT-UG",
      image: F3,
    },
    {
      id: 4,
      name: "Ms. K.S.Sharvanthika",
      role: "Faculty Coordinator",
      department: "Dept Of CT-UG",
      image: F4,
    },
  ];

  return (
    <section className="pillars-section">
      <div className="pillars-header" data-aos="fade-down">
        <h2>PILLARS OF CULTURAL AND MUSIC CLUB</h2>
        <p>They are the Pillars of the Club, Showing Exceptional Dedication.</p>
      </div>
      
      <div className="pillars-container">
        {pillars.map((pillar, index) => (
          <div 
            className="pillar-card" 
            key={pillar.id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="pillar-image-container">
              <img 
                src={pillar.image} 
                alt={pillar.name} 
                className="pillar-image"
              />
              <div className="pillar-info">
                <h3>{pillar.name}</h3>
                <p className="pillar-role">{pillar.role}</p>
                <p className="pillar-dept">{pillar.department}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pillars;