import { useEffect, useState, useRef, useCallback } from 'react';

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const galleryImages = [
    { id: 101, src: A14, size: 'small', category: 'ACTORS', lowRes: A14, title: 'Actor 14' },
    { id: 102, src: A15, size: 'small', category: 'ACTORS', lowRes: A15, title: 'Actor 15' },
    { id: 103, src: A16, size: 'small', category: 'ACTORS', lowRes: A16, title: 'Actor 16' },
    { id: 104, src: A17, size: 'small', category: 'ACTORS', lowRes: A17, title: 'Actor 17' },
    { id: 105, src: A18, size: 'small', category: 'ACTORS', lowRes: A18, title: 'Actor 18' },
    { id: 1, src: A1, size: 'small', category: 'ACTORS', lowRes: A1, title: 'Actor 1' },
    { id: 2, src: A2, size: 'small', category: 'ACTORS', lowRes: A2, title: 'Actor 2' },
    { id: 3, src: A3, size: 'small', category: 'ACTORS', lowRes: A3, title: 'Actor 3' },
    { id: 4, src: A4, size: 'small', category: 'ACTORS', lowRes: A4, title: 'Actor 4' },
    { id: 5, src: A5, size: 'small', category: 'ACTORS', lowRes: A5, title: 'Actor 5' },
    { id: 6, src: A6, size: 'small', category: 'ACTORS', lowRes: A6, title: 'Actor 6' },
    { id: 7, src: A7, size: 'small', category: 'ACTORS', lowRes: A7, title: 'Actor 7' },
    { id: 8, src: A8, size: 'small', category: 'ACTORS', lowRes: A8, title: 'Actor 8' },
    { id: 9, src: A9, size: 'small', category: 'ACTORS', lowRes: A9, title: 'Actor 9' },
    { id: 10, src: A10, size: 'small', category: 'ACTORS', lowRes: A10, title: 'Actor 10' },
    { id: 11, src: A11, size: 'small', category: 'ACTORS', lowRes: A11, title: 'Actor 11' },
    { id: 12, src: A12, size: 'small', category: 'ACTORS', lowRes: A12, title: 'Actor 12' },
    { id: 13, src: A13, size: 'small', category: 'ACTORS', lowRes: A13, title: 'Actor 13' },
    { id: 201, src: S10, size: 'small', category: 'STUDENTS', lowRes: S10, title: 'Student 10' },
    { id: 202, src: S11, size: 'small', category: 'STUDENTS', lowRes: S11, title: 'Student 11' },
    { id: 203, src: S12, size: 'small', category: 'STUDENTS', lowRes: S12, title: 'Student 12' },
    { id: 204, src: S13, size: 'small', category: 'STUDENTS', lowRes: S13, title: 'Student 13' },
    { id: 205, src: S14, size: 'small', category: 'STUDENTS', lowRes: S14, title: 'Student 14' },
    { id: 14, src: S1, size: 'small', category: 'STUDENTS', lowRes: S1, title: 'Student 1' },
    { id: 15, src: S2, size: 'small', category: 'STUDENTS', lowRes: S2, title: 'Student 2' },
    { id: 16, src: S3, size: 'small', category: 'STUDENTS', lowRes: S3, title: 'Student 3' },
    { id: 17, src: S4, size: 'small', category: 'STUDENTS', lowRes: S4, title: 'Student 4' },
    { id: 18, src: S5, size: 'small', category: 'STUDENTS', lowRes: S5, title: 'Student 5' },
    { id: 19, src: S6, size: 'small', category: 'STUDENTS', lowRes: S6, title: 'Student 6' },
    { id: 20, src: S7, size: 'small', category: 'STUDENTS', lowRes: S7, title: 'Student 7' },
    { id: 21, src: S8, size: 'small', category: 'STUDENTS', lowRes: S8, title: 'Student 8' },
    { id: 22, src: S9, size: 'small', category: 'STUDENTS', lowRes: S9, title: 'Student 9' },
  ];

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  useEffect(() => {
    const timer = setTimeout(() => setImagesLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const openLightbox = useCallback((index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  const navigateLightbox = useCallback((direction) => {
    setCurrentImage((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? filteredImages.length - 1 : prev - 1;
      } else {
        return prev === filteredImages.length - 1 ? 0 : prev + 1;
      }
    });
  }, [filteredImages.length]);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartX.current - touchEndX.current > 50) {
      navigateLightbox('next');
    } else if (touchEndX.current - touchStartX.current > 50) {
      navigateLightbox('prev');
    }
  }, [navigateLightbox]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, navigateLightbox]);

  return (
    <div style={styles.galleryContainer}>
      {/* Animated Header */}
      <div style={styles.galleryHeader}>
        <h1 style={styles.galleryTitle}>
          <span style={styles.titleGradient}>Photo Gallery</span>
        </h1>
        <div style={styles.titleUnderline}></div>
      </div>

      {/* Modern Category Filters */}
      <div style={styles.categoryFilters}>
        <button
          style={{
            ...styles.filterButton,
            ...(activeCategory === 'all' ? styles.filterButtonActive : {}),
          }}
          onClick={() => setActiveCategory('all')}
        >
          <span style={styles.filterIcon}>🎨</span>
          All Photos
        </button>
        <button
          style={{
            ...styles.filterButton,
            ...(activeCategory === 'ACTORS' ? styles.filterButtonActive : {}),
          }}
          onClick={() => setActiveCategory('ACTORS')}
        >
          <span style={styles.filterIcon}>🎭</span>
          Actors
        </button>
        <button
          style={{
            ...styles.filterButton,
            ...(activeCategory === 'STUDENTS' ? styles.filterButtonActive : {}),
          }}
          onClick={() => setActiveCategory('STUDENTS')}
        >
          <span style={styles.filterIcon}>🎓</span>
          Students
        </button>
      </div>

      {/* Gallery Grid */}
      <div style={styles.galleryGrid}>
        {!imagesLoaded ? (
          <div style={styles.galleryLoading}>
            <div style={styles.loadingSpinner}></div>
            <p style={styles.loadingText}>Loading Gallery...</p>
          </div>
        ) : (
          filteredImages.map((image, index) => (
            <div
              key={image.id}
              style={{
                ...styles.galleryItem,
                animationDelay: `${index * 0.05}s`,
              }}
              onClick={() => openLightbox(index)}
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <img
                src={image.src}
                alt={image.title}
                style={styles.galleryImage}
              />
              <div style={{
                ...styles.imageOverlay,
                opacity: hoveredImage === image.id ? 1 : 0,
              }}>
                <div style={styles.overlayContent}>
                  <h3 style={styles.imageTitle}>{image.title}</h3>
                  <p style={styles.imageCategory}>{image.category}</p>
                  <div style={styles.viewButton}>View Full Size</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modern Lightbox */}
      {lightboxOpen && (
        <div
          style={styles.lightbox}
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button style={{...styles.lightboxClose}} onClick={closeLightbox}>
            ✕
          </button>
          
          <button
            style={{...styles.lightboxNav, left: '20px'}}
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('prev');
            }}
          >
            ‹
          </button>

          <div style={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={filteredImages[currentImage].src}
              alt={filteredImages[currentImage].title}
              style={styles.lightboxImage}
            />
            <div style={styles.lightboxInfo}>
              <h3 style={styles.lightboxTitle}>{filteredImages[currentImage].title}</h3>
              <p style={styles.lightboxCounter}>
                {currentImage + 1} / {filteredImages.length}
              </p>
            </div>
          </div>

          <button
            style={{...styles.lightboxNav, right: '20px'}}
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('next');
            }}
          >
            ›
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  galleryContainer: {
    padding: '3rem 2rem',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fffbea 0%, #f8f8ff 100%)',
  },
  galleryHeader: {
    textAlign: 'center',
    marginBottom: '3rem',
    animation: 'fadeInUp 0.8s ease-out',
  },
  galleryTitle: {
    fontSize: '3.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
    letterSpacing: '-1px',
  },
  titleGradient: {
    background: 'linear-gradient(135deg, #2e3192 0%, #f72585 50%, #ff5400 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  titleUnderline: {
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, #f72585, #ff5400)',
    margin: '0 auto',
    borderRadius: '2px',
    animation: 'slideIn 0.6s ease-out 0.3s backwards',
  },
  categoryFilters: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '3rem',
    flexWrap: 'wrap',
    animation: 'fadeInUp 0.8s ease-out 0.2s backwards',
  },
  filterButton: {
    padding: '0.9rem 1.8rem',
    border: '2px solid #3d7a8c',
    background: 'white',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#242324',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 15px rgba(61, 122, 140, 0.1)',
  },
  filterButtonActive: {
    background: 'linear-gradient(135deg, #f72585 0%, #ff5400 100%)',
    color: 'white',
    border: '2px solid transparent',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(247, 37, 133, 0.3)',
  },
  filterIcon: {
    fontSize: '1.2rem',
  },
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  galleryItem: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '16px',
    aspectRatio: '1',
    cursor: 'pointer',
    animation: 'fadeInUp 0.6s ease-out backwards',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(46, 49, 146, 0.8) 0%, rgba(247, 37, 133, 0.9) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.4s ease',
  },
  overlayContent: {
    textAlign: 'center',
    color: 'white',
    transform: 'translateY(10px)',
    transition: 'transform 0.4s ease',
  },
  imageTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
  },
  imageCategory: {
    fontSize: '0.9rem',
    fontWeight: '500',
    letterSpacing: '1px',
    marginBottom: '1rem',
    opacity: 0.9,
  },
  viewButton: {
    display: 'inline-block',
    padding: '0.6rem 1.5rem',
    background: 'white',
    color: '#2e3192',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '0.9rem',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  },
  galleryLoading: {
    gridColumn: '1 / -1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem',
  },
  loadingSpinner: {
    width: '50px',
    height: '50px',
    border: '4px solid rgba(247, 37, 133, 0.2)',
    borderTop: '4px solid #f72585',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '1.5rem',
    fontSize: '1.2rem',
    color: '#2e3192',
    fontWeight: '600',
  },
  lightbox: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease-out',
  },
  lightboxContent: {
    position: 'relative',
    maxWidth: '90%',
    maxHeight: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  lightboxImage: {
    maxWidth: '100%',
    maxHeight: '80vh',
    objectFit: 'contain',
    borderRadius: '12px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
  },
  lightboxInfo: {
    marginTop: '1.5rem',
    textAlign: 'center',
  },
  lightboxTitle: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  lightboxCounter: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1rem',
  },
  lightboxClose: {
    position: 'absolute',
    top: '30px',
    right: '30px',
    background: 'linear-gradient(135deg, #f72585, #ff5400)',
    border: 'none',
    color: 'white',
    fontSize: '2rem',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 1001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(247, 37, 133, 0.4)',
  },
  lightboxNav: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    fontSize: '3rem',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    zIndex: 1001,
    fontWeight: '300',
  },
};

export default Gallery;