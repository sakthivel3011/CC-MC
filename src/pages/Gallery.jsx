import { useEffect, useState, useRef, useCallback } from 'react';
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [preloadedImages, setPreloadedImages] = useState(new Set());
  const observerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const galleryImages = [
    { id: 101, src: A14, size: 'small', category: 'ACTORS', lowRes: A14 },
    { id: 102, src: A15, size: 'medium', category: 'ACTORS', lowRes: A15 },
    { id: 103, src: A16, size: 'small', category: 'ACTORS', lowRes: A16 },
    { id: 104, src: A17, size: 'medium', category: 'ACTORS', lowRes: A17 },
    { id: 105, src: A18, size: 'small', category: 'ACTORS', lowRes: A18 },
    { id: 1, src: A1, size: 'medium', category: 'ACTORS', lowRes: A1 },
    { id: 2, src: A2, size: 'medium', category: 'ACTORS', lowRes: A2 },
    { id: 3, src: A3, size: 'small', category: 'ACTORS', lowRes: A3 },
    { id: 4, src: A4, size: 'medium', category: 'ACTORS', lowRes: A4 },
    { id: 5, src: A5, size: 'large', category: 'ACTORS', lowRes: A5 },
    { id: 6, src: A6, size: 'medium', category: 'ACTORS', lowRes: A6 },
    { id: 7, src: A7, size: 'large', category: 'ACTORS', lowRes: A7 },
    { id: 8, src: A8, size: 'small', category: 'ACTORS', lowRes: A8 },
    { id: 9, src: A9, size: 'medium', category: 'ACTORS', lowRes: A9 },
    { id: 10, src: A10, size: 'large', category: 'ACTORS', lowRes: A10 },
    { id: 11, src: A11, size: 'small', category: 'ACTORS', lowRes: A11 },
    { id: 12, src: A12, size: 'small', category: 'ACTORS', lowRes: A12 },
    { id: 13, src: A13, size: 'small', category: 'ACTORS', lowRes: A13 },
    { id: 201, src: S10, size: 'medium', category: 'STUDENTS', lowRes: S10 },
    { id: 202, src: S11, size: 'small', category: 'STUDENTS', lowRes: S11 },
    { id: 203, src: S12, size: 'medium', category: 'STUDENTS', lowRes: S12 },
    { id: 204, src: S13, size: 'medium', category: 'STUDENTS', lowRes: S13 },
    { id: 205, src: S14, size: 'small', category: 'STUDENTS', lowRes: S14 },
    { id: 14, src: S1, size: 'medium', category: 'STUDENTS', lowRes: S1 },
    { id: 15, src: S2, size: 'medium', category: 'STUDENTS', lowRes: S2 },
    { id: 16, src: S3, size: 'small', category: 'STUDENTS', lowRes: S3 },
    { id: 17, src: S4, size: 'small', category: 'STUDENTS', lowRes: S4 },
    { id: 18, src: S5, size: 'medium', category: 'STUDENTS', lowRes: S5 },
    { id: 19, src: S6, size: 'small', category: 'STUDENTS', lowRes: S6 },
    { id: 20, src: S7, size: 'medium', category: 'STUDENTS', lowRes: S7 },
    { id: 21, src: S8, size: 'small', category: 'STUDENTS', lowRes: S8 },
    { id: 22, src: S9, size: 'small', category: 'STUDENTS', lowRes: S9 },
  ];

  // Filter images based on active category
  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  // Preload images for the current category
  useEffect(() => {
    const preloadImages = () => {
      filteredImages.forEach(image => {
        if (!preloadedImages.has(image.id)) {
          const img = new Image();
          img.src = image.src;
          img.onload = () => {
            setPreloadedImages(prev => new Set(prev).add(image.id));
          };
        }
      });
    };

    preloadImages();
  }, [filteredImages, preloadedImages]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageId = entry.target.dataset.id;
            setLoadedImages((prev) => new Set(prev).add(imageId));
          }
        });
      },
      { rootMargin: '200px 0px', threshold: 0.01 }
    );

    const imageElements = document.querySelectorAll('.gallery-item');
    imageElements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [filteredImages]);

  // Preload next and previous images for lightbox
  useEffect(() => {
    if (lightboxOpen) {
      // Preload next image
      const nextIndex = (currentImage + 1) % filteredImages.length;
      const nextImg = new Image();
      nextImg.src = filteredImages[nextIndex].src;

      // Preload previous image
      const prevIndex = currentImage === 0 ? filteredImages.length - 1 : currentImage - 1;
      const prevImg = new Image();
      prevImg.src = filteredImages[prevIndex].src;
    }
  }, [lightboxOpen, currentImage, filteredImages]);

  // Open lightbox
  const openLightbox = useCallback((index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  // Navigate lightbox
  const navigateLightbox = useCallback((direction) => {
    setCurrentImage((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? filteredImages.length - 1 : prev - 1;
      } else {
        return prev === filteredImages.length - 1 ? 0 : prev + 1;
      }
    });
  }, [filteredImages.length]);

  // Handle touch events for swipe navigation
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left - next image
      navigateLightbox('next');
    } else if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right - previous image
      navigateLightbox('prev');
    }
  }, [navigateLightbox]);

  // Keyboard navigation
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
    <div className="gallery-container">
      <h1 className="gallery-title">Photo Gallery</h1>
      
      {/* Category Filters */}
      <div className="category-filters">
        <button
          className={activeCategory === 'all' ? 'active' : ''}
          onClick={() => setActiveCategory('all')}
        >
          All Photos
        </button>
        <button
          className={activeCategory === 'ACTORS' ? 'active' : ''}
          onClick={() => setActiveCategory('ACTORS')}
        >
          Actors
        </button>
        <button
          className={activeCategory === 'STUDENTS' ? 'active' : ''}
          onClick={() => setActiveCategory('STUDENTS')}
        >
          Students
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid" ref={scrollContainerRef}>
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className={`gallery-item ${image.size}`}
            data-id={image.id}
            onClick={() => openLightbox(index)}
          >
            {loadedImages.has(image.id.toString()) || preloadedImages.has(image.id) ? (
              <img
                src={preloadedImages.has(image.id) ? image.src : image.lowRes}
                alt={`Gallery image ${image.id}`}
                loading="lazy"
                className={preloadedImages.has(image.id) ? 'loaded' : 'loading'}
              />
            ) : (
              <div className="image-placeholder">
                <div className="loading-spinner"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="lightbox" 
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              &times;
            </button>
            <button className="lightbox-nav prev" onClick={() => navigateLightbox('prev')}>
              &#10094;
            </button>
            <div className="lightbox-image-container">
              <img
                src={filteredImages[currentImage].src}
                alt={`Lightbox view`}
                className="lightbox-image"
              />
            </div>
            <button className="lightbox-nav next" onClick={() => navigateLightbox('next')}>
              &#10095;
            </button>
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