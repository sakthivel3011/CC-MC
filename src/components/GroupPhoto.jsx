import React, { useEffect } from 'react';
import '../assets/styles/GroupPhoto.css'; // Assuming you have a CSS file for styling
import AOS from 'aos';
import 'aos/dist/aos.css';
import groupPhoto from '../assets/images/group25.jpg'; // Make sure to add your image

const GroupPhoto = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }, []);

return (
    <section className="group-photo-section" id="gallery">
        <div className="container" data-aos="fade-up">
            <h2 className="section-title">Our Cultural Family</h2>
            <p className="section-subtitle">Together we create, perform, and celebrate!</p>
            
            <div className="photo-container" data-aos="zoom-in" data-aos-delay="200">
                <img 
                    src={groupPhoto} 
                    alt="Cultural and Music Club Group Photo" 
                    className="responsive-photo"
                />
                <div className="photo-overlay"></div>
            </div>
            
        </div>
    </section>
);
};
    
export default GroupPhoto;