import { useEffect } from 'react';
import '../assets/styles/About.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out-quart',
      once: true,
      offset: 100
    });
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-header" data-aos="fade-down">
          <h1 className="about-title">
            <span className="title-gradient">About The Club</span>
          </h1>
          <div className="divider" data-aos="fade-right" data-aos-delay="200"></div>
        </div>
        
        <div className="about-content">
          <h2 className="college-club-name" data-aos="fade-up" data-aos-delay="300">
            Kongu Engineering College <span className="separator">|</span> Cultural & Music Club
          </h2>
          
          <div className="about-description" data-aos="fade-up" data-aos-delay="500">
            <p>
              We are the vibrant heartbeat of cultural expression at Kongu Engineering College. Our club serves as a dynamic platform where passion for the performing arts comes alive through music, dance, theater, and diverse cultural performances.
            </p>
            <p>
              Through curated workshops, thrilling competitions, and unforgettable events, we nurture creativity, build community, and celebrate our rich cultural heritage. Whether you're an experienced performer or just discovering your artistic side, you'll find a home with us.
            </p>
          </div>
        </div>

        <div className="stats-container" data-aos="fade-up" data-aos-delay="700">
          <div className="stat-item">
            <span className="stat-number">4</span>
            <span className="stat-label">Faculty Coordinator</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100+</span>
            <span className="stat-label">Members</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10+</span>
            <span className="stat-label">Events Yearly</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;