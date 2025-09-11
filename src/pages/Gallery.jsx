import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/styles/Gallery.css';

// Import all images as before
import A1 from "../assets/images/Gallery/A/1.JPG";
import A2 from "../assets/images/Gallery/A/2.jpg";
import A3 from "../assets/images/Gallery/A/3.jpg";
import A4 from "../assets/images/Gallery/A/4.JPG";
import A5 from "../assets/images/Gallery/A/5.jpg";
import A6 from "../assets/images/Gallery/A/6.JPG";
import A7 from "../assets/images/Gallery/A/7.JPG";
import A8 from "../assets/images/Gallery/A/8.JPG";
import A9 from "../assets/images/Gallery/A/9.png";
import A10 from "../assets/images/Gallery/A/10.JPG";
import A11 from "../assets/images/Gallery/A/11.JPG";
import A12 from "../assets/images/Gallery/A/12.JPG";
import A13 from "../assets/images/Gallery/A/13.JPG";
import A14 from "../assets/images/Gallery/A/14.JPG";
import A15 from "../assets/images/Gallery/A/15.JPG";
import A16 from "../assets/images/Gallery/A/16.JPG";
import A17 from "../assets/images/Gallery/A/17.JPG";
import A18 from "../assets/images/Gallery/A/18.JPG";

import S1 from "../assets/images/Gallery/S/1.JPG";
import S2 from "../assets/images/Gallery/S/2.JPG";
import S3 from "../assets/images/Gallery/S/3.JPG";
import S4 from "../assets/images/Gallery/S/4.JPG";
import S5 from "../assets/images/Gallery/S/5.JPG";
import S6 from "../assets/images/Gallery/S/6.JPG";
import S7 from "../assets/images/Gallery/S/7.JPG";
import S8 from "../assets/images/Gallery/S/8.JPG";
import S9 from "../assets/images/Gallery/S/9.JPG";
import S10 from "../assets/images/Gallery/S/10.JPG";
import S11 from "../assets/images/Gallery/S/11.JPG";
import S12 from "../assets/images/Gallery/S/12.JPG";
import S13 from "../assets/images/Gallery/S/13.JPG";
import S14 from "../assets/images/Gallery/S/14.JPG";

import BGImage from "../assets/images/Gallery/A/5.jpg";

const Gallery = () => {
  const [loadedImages, setLoadedImages] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-back'
    });
  }, []);

  // Image preloading
  useEffect(() => {
    galleryImages.forEach(image => {
      const img = new Image();
      img.src = image.src;
      img.onload = () => {
        setLoadedImages(prev => ({ ...prev, [image.id]: true }));
      };
    });
  }, []);

  // Define the gallery images array with categories
  const galleryImages = [
    { id: 101, src: A14, category: 'Actors' },
    { id: 102, src: A15, category: 'Actors' },
    { id: 103, src: A16, category: 'Actors' },
    { id: 104, src: A17, category: 'Actors' },
   
    { id: 105, src: A18, category: 'Actors' },
    { id: 203, src: S12, category: 'Students' },
    { id: 1, src: A1, category: 'Actors' },
     { id: 204, src: S13, category: 'Students' },
    { id: 2, src: A2, category: 'Actors' },
    { id: 3, src: A3, category: 'Actors' },
    { id: 201, src: S10, category: 'Students' },
    { id: 4, src: A4, category: 'Actors' },
    { id: 5, src: A5, category: 'Actors' },
    { id: 6, src: A6, category: 'Actors' },
    { id: 202, src: S11, category: 'Students' },
    { id: 7, src: A7, category: 'Actors' },
    { id: 8, src: A8, category: 'Actors' },
    { id: 9, src: A9, category: 'Actors' },
    
    
    
    
    { id: 10, src: A10, category: 'Actors' },
    { id: 11, src: A11, category: 'Actors' },
    { id: 12, src: A12, category: 'Actors' },
    { id: 13, src: A13, category: 'Actors' },
    
    { id: 14, src: S1, category: 'Students' },
    { id: 15, src: S2, category: 'Students' },
    { id: 16, src: S3, category: 'Students' },
    { id: 17, src: S4, category: 'Students' },
    
    { id: 18, src: S5, category: 'Students' },
    { id: 19, src: S6, category: 'Students' },
    { id: 20, src: S7, category: 'Students' },
    { id: 21, src: S8, category: 'Students' },
    { id: 22, src: S9, category: 'Students' },
    { id: 205, src: S14, category: 'Students' },
  ];

  // Filter images based on active category
  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  return (
    <>
      <section className="modern-gallery">
        <div className="gallery-background" />
        <div className="gallery-overlay" />
        <div className="gallery-content">
          <h1 className="gallery-main-title" data-aos="fade-down">
            Our <span className="highlight">Memories</span>
          </h1>
          <p className="gallery-subtitle" data-aos="fade-down" data-aos-delay="200">
            Capturing the spirit of our institution
          </p>
          
          {/* Filter buttons */}
          <div className="gallery-filters" data-aos="fade-up" data-aos-delay="300">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'Actors' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Actors')}
            >
              Actors
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'Students' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Students')}
            >
              Students
            </button>
          </div>
          
          <div className="masonry-gallery">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className={`gallery-item-card ${image.category} ${loadedImages[image.id] ? 'loaded' : 'loading'}`}
                data-aos="fade-up"
                data-aos-delay={index % 10 * 100}
              >
                <div className="image-container">
                  <img
                    src={image.src}
                    alt=""
                    className="gallery-image-vibrant"
                    loading="lazy"
                  />
                  <div className="image-overlay">
                    <div className="image-category">{image.category}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;