import { useEffect, useState, useRef } from 'react';
import '../assets/styles/Gallery.css';

// Import all your images
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

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [loadedImages, setLoadedImages] = useState({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollContainerRef = useRef(null);

  const galleryImages = [
    { id: 101, src: A14, size: 'small', category: 'ACTORS' },
    { id: 102, src: A15, size: 'medium', category: 'ACTORS' },
    { id: 103, src: A16, size: 'small', category: 'ACTORS' },
    { id: 104, src: A17, size: 'medium', category: 'ACTORS' },
    { id: 105, src: A18, size: 'small', category: 'ACTORS' },
    { id: 1, src: A1, size: 'medium', category: 'ACTORS' },
    { id: 2, src: A2, size: 'medium', category: 'ACTORS' },
    { id: 3, src: A3, size: 'small', category: 'ACTORS' },
    { id: 4, src: A4, size: 'medium', category: 'ACTORS' },
    { id: 5, src: A5, size: 'large', category: 'ACTORS' },
    { id: 6, src: A6, size: 'medium', category: 'ACTORS' },
    { id: 7, src: A7, size: 'large', category: 'ACTORS' },
    { id: 8, src: A8, size: 'small', category: 'ACTORS' },
    { id: 9, src: A9, size: 'medium', category: 'ACTORS' },
    { id: 10, src: A10, size: 'large', category: 'ACTORS' },
    { id: 11, src: A11, size: 'small', category: 'ACTORS' },
    { id: 12, src: A12, size: 'small', category: 'ACTORS' },
    { id: 13, src: A13, size: 'small', category: 'ACTORS' },
    { id: 201, src: S10, size: 'medium', category: 'STUDENTS' },
    { id: 202, src: S11, size: 'small', category: 'STUDENTS' },
    { id: 203, src: S12, size: 'medium', category: 'STUDENTS' },
    { id: 204, src: S13, size: 'medium', category: 'STUDENTS' },
    { id: 205, src: S14, size: 'small', category: 'STUDENTS' },
    { id: 14, src: S1, size: 'medium', category: 'STUDENTS' },
    { id: 15, src: S2, size: 'medium', category: 'STUDENTS' },
    { id: 16, src: S3, size: 'small', category: 'STUDENTS' },
    { id: 17, src: S4, size: 'small', category: 'STUDENTS' },
    { id: 18, src: S5, size: 'medium', category: 'STUDENTS' },
    { id: 19, src: S6, size: 'small', category: 'STUDENTS' },
    { id: 20, src: S7, size: 'medium', category: 'STUDENTS' },
    { id: 21, src: S8, size: 'small', category: 'STUDENTS' },
    { id: 22, src: S9, size: 'small', category: 'STUDENTS' },
  ];

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  // Auto-scroll effect
  useEffect(() => {
    if (!autoScroll || !scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    let scrollAmount = 0;
    const scrollSpeed = 0.5; // Adjust speed as needed
    
    const scrollInterval = setInterval(() => {
      if (container) {
        scrollAmount += scrollSpeed;
        container.scrollLeft = scrollAmount;
        
        // Reset scroll position when reaching the end
        if (scrollAmount >= container.scrollWidth - container.clientWidth) {
          scrollAmount = 0;
        }
      }
    }, 20);
    
    return () => clearInterval(scrollInterval);
  }, [autoScroll, activeCategory]);

  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  const openLightbox = (index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction) => {
    let newIndex = currentImage + direction;
    if (newIndex < 0) newIndex = filteredImages.length - 1;
    if (newIndex >= filteredImages.length) newIndex = 0;
    setCurrentImage(newIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxOpen) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateImage(-1);
        if (e.key === 'ArrowRight') navigateImage(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentImage]);

  return (
    <div className="modern-gallery-container">
      <section className="gallery-hero">
        <div className="hero-content">
          <h1 className="gallery-title">Campus Gallery</h1>
          <p className="gallery-subtitle">Explore the vibrant life of our institution through these captured moments</p>
        </div>
      </section>

      <section className="gallery-main">
        <div className="gallery-controls">
          <div className="gallery-filter">
            <button 
              className={activeCategory === 'all' ? 'filter-btn active' : 'filter-btn'} 
              onClick={() => setActiveCategory('all')}
            >
              All Photos
            </button>
            <button 
              className={activeCategory === 'ACTORS' ? 'filter-btn active' : 'filter-btn'} 
              onClick={() => setActiveCategory('ACTORS')}
            >
              Actors
            </button>
            <button 
              className={activeCategory === 'STUDENTS' ? 'filter-btn active' : 'filter-btn'} 
              onClick={() => setActiveCategory('STUDENTS')}
            >
              Students
            </button>
          </div>
          
          <div className="auto-scroll-control">
            <label className="toggle-label">
              <input 
                type="checkbox" 
                checked={autoScroll} 
                onChange={() => setAutoScroll(!autoScroll)} 
              />
              <span className="toggle-slider"></span>
              Auto Scroll
            </label>
          </div>
        </div>

        <div className="horizontal-scroll-container" ref={scrollContainerRef}>
          <div className="horizontal-scroll-gallery">
            {filteredImages.map((image, index) => (
              <div 
                key={image.id} 
                className={`scroll-item ${image.size} ${loadedImages[image.id] ? 'loaded' : 'loading'}`}
                onClick={() => openLightbox(index)}
              >
                <div className="image-container">
                  <img 
                    src={image.src} 
                    alt={`Campus moment ${image.id}`}
                    loading="lazy"
                    onLoad={() => handleImageLoad(image.id)}
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <span className="view-btn">View</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="masonry-grid">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id} 
              className={`grid-item ${image.size} ${loadedImages[image.id] ? 'loaded' : 'loading'}`}
              onClick={() => openLightbox(index)}
            >
              <div className="image-container">
                <img 
                  src={image.src} 
                  alt={`Campus moment ${image.id}`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(image.id)}
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <span className="view-btn">View</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
            <button className="lightbox-nav left" onClick={() => navigateImage(-1)}>‹</button>
            <img src={filteredImages[currentImage].src} alt="" />
            <button className="lightbox-nav right" onClick={() => navigateImage(1)}>›</button>
            <div className="lightbox-counter">
              {currentImage + 1} / {filteredImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;