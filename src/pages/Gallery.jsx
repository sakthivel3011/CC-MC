import { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/styles/Gallery.css';

// Import Actor Images
import A1 from "../assets/images/Gallery/A/1.JPG";
import A2 from "../assets/images/Gallery/A/2.jpg";
import A3 from "../assets/images/Gallery/A/3.jpg";
import A6 from "../assets/images/Gallery/A/6.JPG";
import A7 from "../assets/images/Gallery/A/7.JPG";
import A8 from "../assets/images/Gallery/A/8.JPG";
import A10 from "../assets/images/Gallery/A/10.JPG";
import A11 from "../assets/images/Gallery/A/11.JPG";
import A12 from "../assets/images/Gallery/A/12.JPG";
import A13 from "../assets/images/Gallery/A/13.JPG";
import A14 from "../assets/images/Gallery/A/14.JPG";
import A15 from "../assets/images/Gallery/A/15.JPG";
import A16 from "../assets/images/Gallery/A/16.JPG";
import A17 from "../assets/images/Gallery/A/17.JPG";
import A18 from "../assets/images/Gallery/A/18.JPG";

// Import Student Images
import S1 from "../assets/images/Gallery/S/1.JPG";
import S2 from "../assets/images/Gallery/S/2.JPG";
import S3 from "../assets/images/Gallery/S/3.JPG";
import S5 from "../assets/images/Gallery/S/5.JPG";
import S6 from "../assets/images/Gallery/S/6.JPG";
import S7 from "../assets/images/Gallery/S/7.JPG";
import S10 from "../assets/images/Gallery/S/10.JPG";
import S11 from "../assets/images/Gallery/S/11.JPG";
import S13 from "../assets/images/Gallery/S/13.JPG";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [loadingImages, setLoadingImages] = useState(new Set());
  const [imageErrors, setImageErrors] = useState(new Set());
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const observerRef = useRef(null);

  const galleryImages = [
    // Actors
    { id: 1, src: A17, category: 'ACTORS'},
    { id: 2, src: A15, category: 'ACTORS'},
    { id: 3, src: A16, category: 'ACTORS'},
    { id: 4, src: A6, category: 'ACTORS'},
    { id: 5, src: A7, category: 'ACTORS'},
    { id: 6, src: A8, category: 'ACTORS'},
    { id: 7, src: A10, category: 'ACTORS'},
    { id: 8, src: A11, category: 'ACTORS'},
    { id: 9, src: A12, category: 'ACTORS'},
    { id: 10, src: A13, category: 'ACTORS'},
    { id: 11, src: A14, category: 'ACTORS'},
    { id: 12, src: A18, category: 'ACTORS'},
    { id: 13, src: A3, category: 'ACTORS'},
    { id: 14, src: A2, category: 'ACTORS'},
    { id: 15, src: A1, category: 'ACTORS'},
    // Students
    { id: 20, src: S10, category: 'STUDENTS'},
    { id: 21, src: S11, category: 'STUDENTS'},
    { id: 22, src: S13, category: 'STUDENTS'},
    { id: 23, src: S1, category: 'STUDENTS'},
    { id: 24, src: S2, category: 'STUDENTS'},
    { id: 25, src: S7, category: 'STUDENTS'},
    { id: 26, src: S3, category: 'STUDENTS'},
    { id: 27, src: S5, category: 'STUDENTS'},
    { id: 28, src: S6, category: 'STUDENTS'},
   
  ];

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 30,
      disable: 'mobile'
    });

    // Setup intersection observer for lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const imageId = parseInt(img.dataset.imageId);
            if (!loadedImages.has(imageId) && !loadingImages.has(imageId)) {
              setLoadingImages(prev => new Set([...prev, imageId]));
              img.src = img.dataset.src;
            }
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (activeCategory) {
      const timer = setTimeout(() => {
        AOS.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeCategory]);

  const handleImageLoad = (id) => {
    setLoadedImages(prev => new Set([...prev, id]));
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleImageError = (id) => {
    setImageErrors(prev => new Set([...prev, id]));
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleImageLoadStart = (id) => {
    setLoadingImages(prev => new Set([...prev, id]));
  };

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) nextImage();
    if (touchEndX.current - touchStartX.current > 50) prevImage();
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lightboxOpen, currentImage]);

  return (
    <div className="ga-container">
      <div className="ga-header" data-aos="fade-down">
        <h1 className="ga-title">Our Gallery</h1>
        <p className="ga-subtitle">Explore our collection of memorable moments</p>
      </div>

      

      <div className="ga-grid">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="ga-item"
            data-aos="fade-up"
            data-aos-delay={index < 8 ? index * 50 : 0}
            onClick={() => openLightbox(index)}
          >
            <div className="ga-image-wrapper">
              {/* Skeleton Loader */}
              {!loadedImages.has(image.id) && (
                <div className="ga-skeleton">
                  <div className="ga-skeleton-shimmer"></div>
                  <div className="ga-skeleton-content">
                    <div className="ga-skeleton-line ga-skeleton-line-1"></div>
                    <div className="ga-skeleton-line ga-skeleton-line-2"></div>
                    <div className="ga-skeleton-line ga-skeleton-line-3"></div>
                    <div className="ga-skeleton-line ga-skeleton-line-4"></div>
                  </div>
                </div>
              )}
              
              {/* Loading Spinner */}
              {loadingImages.has(image.id) && (
                <div className="ga-loading-spinner">
                  <div className="ga-spinner"></div>
                </div>
              )}

              {/* Error State */}
              {imageErrors.has(image.id) && (
                <div className="ga-error-state">
                  <div className="ga-error-icon">⚠️</div>
                  <p>Failed to load</p>
                </div>
              )}

              <img
                ref={(el) => {
                  if (el && observerRef.current && !loadedImages.has(image.id)) {
                    observerRef.current.observe(el);
                  }
                }}
                data-src={image.src}
                data-image-id={image.id}
                alt={image.title || `Gallery image ${image.id}`}
                className={`ga-image ${
                  loadedImages.has(image.id) ? 'ga-loaded' : ''
                } ${imageErrors.has(image.id) ? 'ga-error' : ''}`}
                loading="lazy"
                decoding="async"
                onLoad={() => handleImageLoad(image.id)}
                onError={() => handleImageError(image.id)}
                onLoadStart={() => handleImageLoadStart(image.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <div
          className="ga-lightbox"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button className="ga-close" onClick={closeLightbox} aria-label="Close">×</button>
          <button className="ga-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }} aria-label="Previous">‹</button>
          <button className="ga-next" onClick={(e) => { e.stopPropagation(); nextImage(); }} aria-label="Next">›</button>
          
          <div className="ga-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={filteredImages[currentImage]?.src}
              alt={filteredImages[currentImage]?.title}
              className="ga-lightbox-image"
              loading="eager"
              decoding="sync"
            />
            <div className="ga-lightbox-info">
              <h3>{filteredImages[currentImage]?.title}</h3>
              <p>{filteredImages[currentImage]?.category}</p>
              <span className="ga-counter">{currentImage + 1} / {filteredImages.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;