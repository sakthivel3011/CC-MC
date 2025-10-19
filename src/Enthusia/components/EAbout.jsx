import React, { useState, useEffect } from 'react';
import '../styles/EAbout.css';
import about1 from '../images/CC/cul.png';
const EAbout = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  const aboutImages = [
    { src: about1, alt: 'Cultural Activities' },
    { src: '../images/CC/stu.png', alt: 'Student Performances' },
    { src: '../images/CC/art.png', alt: 'Artistic Excellence' },
    { src: '../images/CC/com.png', alt: 'Community Spirit' },
    { src: '../images/CC/cre.png', alt: 'Creative Expression' }
  ];
  
  // Auto-rotate images
  useEffect(() => {
    const imageRotation = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % aboutImages.length);
    }, 3000);

    return () => clearInterval(imageRotation);
  }, [aboutImages.length]);

  return (
    <div className="eabout-container section" id="about">
      <div className="eabout-wrapper">
        <h2 className="section-title">About Enthusia</h2>
        
        <div className="eabout-content">
          {/* Left Side - Text Content */}
          <div className="eabout-text">
            <div className="text-content">
              <h3>Celebrating Cultural Excellence</h3>
              <p>
                Enthusia is the premier cultural festival that brings together the most talented 
                students from across the institution. Our festival celebrates the rich diversity 
                of arts, culture, and creativity that defines our vibrant community.
              </p>
              
              <p>
                With over 14 exciting events spanning dance, music, drama, literature, and visual arts, 
                Enthusia provides a platform for students to showcase their talents, compete with peers, 
                and create unforgettable memories.
              </p>
              
              <p>
                Join us in this spectacular celebration of creativity, passion, and artistic excellence. 
                Whether you're a performer or a spectator, Enthusia promises an experience that will 
                inspire and entertain.
              </p>
              
              <div className="stats-container">
                <div className="stat-item">
                  <span className="stat-number">14</span>
                  <span className="stat-label">Events</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Participants</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">2</span>
                  <span className="stat-label">Days</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Image Carousel */}
          <div className="eabout-images">
            <div className="image-carousel">
              {aboutImages.map((image, index) => (
                <div 
                  key={index} 
                  className={`carousel-image ${index === currentImage ? 'active' : ''}`}
                >
                  <div className="image-placeholder">
                    <span>{image.alt}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Image Indicators */}
            <div className="image-indicators">
              {aboutImages.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentImage ? 'active' : ''}`}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EAbout;
