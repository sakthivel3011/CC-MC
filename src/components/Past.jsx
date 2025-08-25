import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/styles/Past.css';

import image1 from '../assets/images/Past/1.jpeg';
import image2 from '../assets/images/Past/2.jpg';
import image3 from '../assets/images/Past/3.JPG';
import { GrGallery } from 'react-icons/gr';

const Past = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const pastImages = [
    { 
      src: image1, 
      alt: "Past Event 1", 
      caption: "Relive the unforgettable moments of Enthusia",
      fontStyle: { fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: 'clamp(2rem, 6vw, 3.5rem)' }
    },
    { 
      src: image3, 
      alt: "Past Event 3", 
      caption: "Let's revisit the past excitement of Enthusia",
      fontStyle: { fontFamily: "'Playfair Display', serif", fontWeight: 700 }
    },
    { 
      src: image2, 
      alt: "Past Event 2", 
      caption: "Step back into the magic of Enthusia",
      fontStyle: { fontFamily: "'Raleway', sans-serif", fontWeight: 600 }
    }
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true
    });
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % pastImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [pastImages.length]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % pastImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + pastImages.length) % pastImages.length);
  };

  const goToImage = (index) => {
    setCurrentImage(index);
  };

  const goToGalleryPage = () => {
    navigate('/gallery');
  };

  return (
    <>
      <section className="past-section" id="past-events">
        <div className="past-container">
          <h2 className="past-title" data-aos="fade-down">Let's Revisit The Past</h2>
          <div className="image-slider" data-aos="fade-up">
            <div className="slide-wrapper" style={{ transform: `translateX(-${currentImage * 100}%)` }}>
              {pastImages.map((image, index) => (
                <div key={index} className="slide">
                  <div className="image-caption" style={{ textAlign: 'center', position: 'absolute', width: '100%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
                    <h3 style={image.fontStyle}>{image.caption}</h3>
                  </div>
                  <img src={image.src} alt={image.alt} className="past-image" />
                </div>
              ))}
            </div>
          </div>
          <div className="slider-controls">
            <button type="button" className="gallery-button" onClick={goToGalleryPage} data-aos="zoom-in" data-aos-delay="300">
              <GrGallery style={{ marginRight: 8 }} />
              View Gallery
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Past;
