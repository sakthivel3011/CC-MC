import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/styles/Contact.css'; // Assuming you have a CSS file for styling

const Contact = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }, []);

  const handlePhoneClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const staffContacts = [
    {
      name: "Dr.V.N.Kowshalaya",
      position: "Faculty Advisor",
      phone: "70108 77103",
      
    },
    {
      name: "Mr.K.V.Satheesh Kumar",
      position: "Faculty Advisor",
      phone: "95783 67576",
      
    },
    {
      name: "Ms.S.Keerthana",
      position: "Faculty Advisor",
      phone: "8870756287",
      
      
    },
    {
      name: "Ms.S.Sharvanthika",
      position: "Faculty Advisor",
      phone: "8778955508",
      
    }
  ];

  const studentContacts = [
    {
      name: "Mr.V.Mahashwin",
      position: "Secretary",
      phone: "9942621479",
    },
    {
      name: "Mr.M.Sudharsan",
      position: "Joint Secretary",
      phone: "8667352688",
    },
    {
      name: "Mr.K.Krisnakumar",
      position: "Joint Secretary",
      phone: "9025380910",
    },
    {
      name: "Mr.S.Kavin",
      position: "Treasurer",
      phone: "8610177301",
    },
    {
      name: "Mr.S.Sakthivel",
      position: "Web Developer",
      phone: "8925490989",
    },
    {
      name: "Ms.S.Maria ",
      position: "Addtional Secretary",
      phone: "8946077932",
    },
    {
      name: "Ms.L.G.HariShree",
      position: "Joint Secretary",
      phone: "6385810987",
    },
    {
      name: "Ms.R.Dhivya Bala",
      position: "Additional Secretary",
      phone: "6382557712",
    },
    {
      name: "Ms.K.Aiswarya",
      position: "Advisory Committee",
      phone: "9100579511",
    },
    {
      name: "Ms.C.Kaviya",
      position: "Advisory Committee",
      phone: "9360338092",
    },
  ];

  return (
    <div className="contact-container">
      <header className="contact-header" data-aos="fade-down">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">Get in touch with our dedicated team of staff and student coordinators for any queries about Enthusia</p>
      </header>

      <section className="contact-section staff-section" data-aos="fade-up">
        <h2 className="section-title">Staff Coordinators</h2>
        <div className="contact-grid staff-grid">
          {staffContacts.map((contact, index) => (
            <div key={index} className="contact-card staff-card" data-aos="zoom-in" data-aos-delay={(index + 1) * 100}>
              <h3 className="card-name">{contact.name}</h3>
              <p className="card-position">{contact.position}</p>
              <div className="card-contact">
                <div className="contact-info" onClick={() => handlePhoneClick(contact.phone)}>
                  <div className="icon-wrapper phone-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <span>{contact.phone}</span>
                </div>
                <div className="contact-info" onClick={() => handleEmailClick(contact.email)}>
                  
                  <span>{contact.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section student-section" data-aos="fade-up">
        <h2 className="section-title">Student Coordinators</h2>
        <div className="contact-grid student-grid">
          {studentContacts.map((contact, index) => (
            <div key={index} className="contact-card student-card" data-aos="zoom-in" data-aos-delay={(index + 1) * 100}>
              <h3 className="card-name">{contact.name}</h3>
              <p className="card-position">{contact.position}</p>
              <div className="card-contact">
                <div className="contact-info" onClick={() => handlePhoneClick(contact.phone)}>
                  <div className="icon-wrapper phone-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <span>{contact.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;