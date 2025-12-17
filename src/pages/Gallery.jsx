import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import '../assets/styles/Gallery.css';

// Import Actor Images



// Import Student Images
import S1 from "../assets/images/Gallery/S/1.JPG";
import S2 from "../assets/images/Gallery/S/2.JPG";
import S3 from "../assets/images/Gallery/S/3.JPG";



const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [imageErrors, setImageErrors] = useState(new Set());
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const galleryImages = useMemo(() => [
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
    { id: 16, src: A4, category: 'ACTORS'},
    { id: 17, src: A5, category: 'ACTORS'},
    { id: 18, src: A9, category: 'ACTORS'},
    { id: 19, src: A19, category: 'ACTORS'},
    // Students

    { id: 23, src: S1, category: 'STUDENTS'},
    { id: 24, src: S2, category: 'STUDENTS'},

    { id: 26, src: S3, category: 'STUDENTS'},

   
  ], []);

  useEffect(() => {
    // Don't preload - let browser handle it naturally with lazy loading
    return () => {
      // cleanup if needed
    };
  }, []);

  const handleImageLoad = useCallback((id) => {
    setLoadedImages(prev => new Set([...prev, id]));
  }, []);

  const handleImageError = useCallback((id) => {
    setImageErrors(prev => new Set([...prev, id]));
  }, []);

  const filteredImages = useMemo(() => 
    activeCategory === 'all'
      ? galleryImages
      : galleryImages.filter(img => img.category === activeCategory),
    [activeCategory, galleryImages]
  );

  const openLightbox = useCallback((index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  }, [filteredImages.length]);

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
  }, [lightboxOpen, nextImage, prevImage, closeLightbox]);

  return (
    <div className="ga-container">
      <div className="ga-header">
        <h1 className="ga-title">Our Gallery</h1>
        <p className="ga-subtitle">Explore our collection of memorable moments</p>
      </div>

      

      <div className="ga-grid">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="ga-item"
            onClick={() => openLightbox(index)}
          >
            <div className="ga-image-wrapper">
              {/* Skeleton Loader */}
              {!loadedImages.has(image.id) && !imageErrors.has(image.id) && (
                <div className="ga-skeleton">
                  <div className="ga-skeleton-shimmer"></div>
                </div>
              )}

              {/* Error State */}
              {imageErrors.has(image.id) && (
                <div className="ga-error-state">
                  <div className="ga-error-icon">⚠️</div>
                </div>
              )}

              <img
                src={image.src}
                alt={image.title || `Gallery image ${image.id}`}
                className={`ga-image ${loadedImages.has(image.id) ? 'ga-loaded' : ''} ${imageErrors.has(image.id) ? 'ga-error' : ''}`}
                loading="lazy"
                decoding="async"
                onLoad={() => handleImageLoad(image.id)}
                onError={() => handleImageError(image.id)}
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