import { useState, useEffect, useRef } from 'react';

/**
 * LazyImage Component - Loads images only when they come into view
 * Usage: <LazyImage src="/path/to/image.jpg" alt="description" className="..." />
 */
export default function LazyImage({ src, alt, className = '', ...props }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const imgRef = useRef(null);

  useEffect(() => {
    // Create an Intersection Observer to detect when image enters viewport
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Load the image
            setImageSrc(src);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px' // Start loading 50px before image comes into view
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${loading ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}
      onLoad={handleImageLoad}
      {...props}
    />
  );
}
