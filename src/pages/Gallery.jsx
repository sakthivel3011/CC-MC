import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/styles/Gallery.css';

import F1 from "../assets/images/Gallery/A/1.JPG";
import F2 from "../assets/images/Gallery/A/2.jpg";
import F3 from "../assets/images/Gallery/A/3.jpg";
import F4 from "../assets/images/Gallery/A/4.JPG";
import F5 from "../assets/images/Gallery/A/5.jpg";
import F6 from "../assets/images/Gallery/A/6.JPG";
import F7 from "../assets/images/Gallery/A/7.JPG";
import F8 from "../assets/images/Gallery/A/8.JPG";
import F9 from "../assets/images/Gallery/A/9.png";
import F10 from "../assets/images/Gallery/A/10.JPG";
import F11 from "../assets/images/Gallery/A/11.JPG";
import F12 from "../assets/images/Gallery/A/12.JPG";
import F13 from "../assets/images/Gallery/A/13.JPG";
import F14 from "../assets/images/Gallery/A/14.JPG";
import F15 from "../assets/images/Gallery/A/15.JPG";
import F16 from "../assets/images/Gallery/A/16.JPG";
import F17 from "../assets/images/Gallery/A/17.JPG";
import F18 from "../assets/images/Gallery/A/18.JPG";

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
  const [hoveredImage, setHoveredImage] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-back'
    });

  // No custom cursor for smoother performance
  return () => {};
  }, []);

  const galleryImages = [
  { id: 101, src: F14, size: 'small' },
  { id: 102, src: F15, size: 'medium' },
  { id: 103, src: F16, size: 'small' },
  { id: 104, src: F17, size: 'medium' },
  { id: 105, src: F18, size: 'small' },
  { id: 1, src: F1, size: 'medium' },
  { id: 2, src: F2, size: 'medium' },
  { id: 3, src: F3, size: 'small' },
  { id: 4, src: F4, size: 'medium' },
  { id: 5, src: F5, size: 'large' },
  { id: 6, src: F6, size: 'medium' },
  { id: 7, src: F7, size: 'large' },
  { id: 8, src: F8, size: 'small' },
  { id: 9, src: F9, size: 'medium' },
  { id: 10, src: F10, size: 'large' },
  { id: 11, src: F11, size: 'small' },
  { id: 12, src: F12, size: 'small' },
  { id: 13, src: F13, size: 'small' },

  { id: 201, src: S10, size: 'medium' },
  { id: 202, src: S11, size: 'small' },
  { id: 203, src: S12, size: 'medium' },
  { id: 204, src: S13, size: 'medium' },
  { id: 205, src: S14, size: 'small' },

  { id: 14, src: S1, size: 'medium' },
  { id: 15, src: S2, size: 'medium' },
  { id: 16, src: S3, size: 'small' },
  { id: 17, src: S4, size: 'small' },
  { id: 18, src: S5, size: 'medium' },
  { id: 19, src: S6, size: 'small' },
  { id: 20, src: S7, size: 'medium' },
  { id: 21, src: S8, size: 'small' },
  { id: 22, src: S9, size: 'small' },
  ];

  // Check if gallery needs to scroll
  const [needsScroll, setNeedsScroll] = useState(false);
  useEffect(() => {
    const checkScroll = () => {
      const gallery = document.querySelector('.masonry-gallery');
      if (gallery) {
        setNeedsScroll(gallery.scrollHeight > gallery.clientHeight);
      }
    };
    window.addEventListener('resize', checkScroll);
    setTimeout(checkScroll, 500); // Wait for images to load
    return () => window.removeEventListener('resize', checkScroll);
  }, [galleryImages.length]);

  return (
    <>
      <section className="modern-gallery">
        {/* Background with parallax effect */}
        <div 
          className="gallery-background" 
          style={{ backgroundImage: `url(${BGImage})` }}
        />
        <div className="gallery-overlay" />
        <div className="gallery-content">
          <h1 className="gallery-main-title" data-aos="fade-down">
            Our <span className="highlight">Memories</span>
          </h1>
          <p className="gallery-subtitle" data-aos="fade-down" data-aos-delay="200">
            Capturing the spirit of our institution
          </p>
          <div className="masonry-gallery">
            {galleryImages.map((image, index) => (
              <div 
                key={image.id}
                className={`gallery-item ${image.size}`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                style={{ willChange: 'transform, opacity' }}
                onMouseEnter={() => setHoveredImage(image.id)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <div className="image-wrapper">
                  <img
                    src={image.src}
                    alt=""
                    className="gallery-image"
                    loading="lazy"
                    style={{ willChange: 'transform, opacity' }}
                  />
                </div>
              </div>
            ))}
          </div>
          {!needsScroll && (
            <div className="gallery-no-scroll">
              <span>All images fit on the screen. No scrolling needed.</span>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Gallery;