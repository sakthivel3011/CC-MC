import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/styles/Gallery.css';

// Import all images as before
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
  // Initialize AOS as before
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-back'
    });
  }, []);

  // Define the gallery images array
  const galleryImages = [
    { id: 101, src: F14 },
    { id: 102, src: F15 },
    { id: 103, src: F16 },
    { id: 104, src: F17 },
    { id: 105, src: F18 },
    { id: 1, src: F1 },
    { id: 2, src: F2 },
    { id: 3, src: F3 },
    { id: 4, src: F4 },
    { id: 5, src: F5 },
    { id: 6, src: F6 },
    { id: 7, src: F7 },
    { id: 8, src: F8 },
    { id: 9, src: F9 },
    { id: 10, src: F10 },
    { id: 11, src: F11 },
    { id: 12, src: F12 },
    { id: 13, src: F13 },
    { id: 201, src: S10 },
    { id: 202, src: S11 },
    { id: 203, src: S12 },
    { id: 204, src: S13 },
    { id: 205, src: S14 },
    { id: 14, src: S1 },
    { id: 15, src: S2 },
    { id: 16, src: S3 },
    { id: 17, src: S4 },
    { id: 18, src: S5 },
    { id: 19, src: S6 },
    { id: 20, src: S7 },
    { id: 21, src: S8 },
    { id: 22, src: S9 },
  ];

  return (
    <>
      <section className="modern-gallery">
        <div className="gallery-background" style={{ backgroundImage: `url(${BGImage})` }} />
        <div className="gallery-overlay" />
        <div className="gallery-content">
          <h1 className="gallery-main-title" data-aos="fade-down">
            Our <span className="highlight">Memories</span>
          </h1>
          <p className="gallery-subtitle" data-aos="fade-down" data-aos-delay="200">
            Capturing the spirit of our institution
          </p>
          <div className="waterfall-gallery">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="gallery-item-card"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <img
                  src={image.src}
                  alt=""
                  className="gallery-image-vibrant"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;