import React, { useState, useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

// Import images from assets
import A1 from '../assets/images/Gallery/A/1.JPG';
import A2 from '../assets/images/Gallery/A/2.JPG';
import A3 from '../assets/images/Gallery/A/3.JPG';
import A4 from '../assets/images/Gallery/A/4.JPG';
import A5 from '../assets/images/Gallery/A/5.JPG';
import A6 from '../assets/images/Gallery/A/6.JPG';
import A7 from '../assets/images/Gallery/A/7.JPG';
import A8 from '../assets/images/Gallery/A/8.JPG';
import A9 from '../assets/images/Gallery/A/9.JPG';
import A10 from '../assets/images/Gallery/A/10.JPG';
import A11 from '../assets/images/Gallery/A/11.JPG';
import A12 from '../assets/images/Gallery/A/12.png';
import A13 from '../assets/images/Gallery/A/13.png';
import A14 from '../assets/images/Gallery/A/14.png';
import A15 from '../assets/images/Gallery/A/15.png';
import A16 from '../assets/images/Gallery/A/16.png';
import A17 from '../assets/images/Gallery/A/17.png';
import A18 from '../assets/images/Gallery/A/18.png';
import A19 from '../assets/images/Gallery/A/19.png';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [activeYear, setActiveYear] = useState('2k24');

  // Gallery data organized by year
  const galleryData = {
    '2k24': [
      A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, A19,
    ],
    '2k23': [
      A1, A3, A5, A7, A9, A11, A13, A15, A17, A19,
    ],
    '2k20': [
      A2, A4, A6, A8, A10, A12, A14, A16, A18,
    ],
    '2k19': [
      A5, A7, A9, A11, A13, A15, A17, A19, A3,
    ],
    '2k18': [
      A1, A6, A11, A16, A18, A12, A15, A8, A3,
    ],
  };

  const handleImageLoad = (src) => {
    setLoadedImages(prev => new Set([...prev, src]));
  };

  const years = ['2k18', '2k19', '2k20', '2k23', '2k24'];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a2540 0%, #1a365d 50%, #1a5f7a 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        paddingTop: '20px',
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #ffd700, #ff8c00, #ffd700)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1px',
          marginTop: '30px',
          textShadow: '0 0 40px rgba(255, 215, 0, 0.3)',
        }}>
          Enthusia Gallery
        </h1>
        <p style={{
          color: '#87ceeb',
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          fontWeight: '300',
        }}>
          Memories Through The Years
        </p>
      </div>

      {/* Year Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '50px',
        flexWrap: 'wrap',
        padding: '0 20px',
      }}>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setActiveYear(year)}
            style={{
              padding: '12px 30px',
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              fontWeight: '700',
              border: 'none',
              borderRadius: '50px',
              background: activeYear === year 
                ? 'linear-gradient(135deg, #c41e3a, #ff4500)'
                : 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              boxShadow: activeYear === year 
                ? '0 8px 25px rgba(220, 20, 60, 0.4)' 
                : '0 4px 15px rgba(0, 0, 0, 0.2)',
              transform: activeYear === year ? 'translateY(-2px)' : 'translateY(0)',
            }}
            onMouseEnter={(e) => {
              if (activeYear !== year) {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeYear !== year) {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {year.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '25px',
        padding: '0 20px',
      }}>
        {galleryData[activeYear].map((src, index) => (
          <div
            key={`${activeYear}-${index}`}
            onClick={() => setSelectedImage(src)}
            style={{
              position: 'relative',
              aspectRatio: '4/3',
              borderRadius: '20px',
              overflow: 'hidden',
              cursor: 'pointer',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 215, 0, 0.2)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              animation: `slideIn 0.6s ease-out ${index * 0.1}s both`,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(255, 215, 0, 0.4)';
              e.currentTarget.style.borderColor = '#ffd700';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
              e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.2)';
            }}
          >
            {/* Loading Skeleton */}
            {!loadedImages.has(src) && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
              }} />
            )}

            {/* Image */}
            <img
              src={src}
              alt={`Gallery ${activeYear} ${index + 1}`}
              loading="lazy"
              onLoad={() => handleImageLoad(src)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: loadedImages.has(src) ? 1 : 0,
                transition: 'opacity 0.5s ease',
              }}
            />

            {/* Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '20px',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
            onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#ffffff',
              }}>
                <ZoomIn size={20} />
                <span style={{ fontSize: '14px', fontWeight: '600' }}>View Image</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              zIndex: 1001,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'rotate(90deg) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'rotate(0deg) scale(1)';
            }}
          >
            <X size={24} color="#ffffff" />
          </button>
          
          <img
            src={selectedImage}
            alt="Full size"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: '15px',
              boxShadow: '0 25px 100px rgba(255, 215, 0, 0.3)',
              animation: 'zoomIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          overflow-x: hidden;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)) !important;
            gap: 15px !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          
          div[style*="marginBottom: '40px'"] {
            padding-top: 60px !important;
            margin-top: 60px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Gallery;