import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import ScrollingBanner from "./components/ScrollingBanner";
import Hero from "./components/Hero";
import About from "./components/About";
import UpcomingEvents from "./components/UpcomingEvents";
import Pillars from "./components/Pillars";
import GroupPhoto from "./components/GroupPhoto";
import Past from "./components/Past";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import OfficeBearers from "./pages/OfficeBearers";
import Loading from "./components/Loading";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Help from "./pages/Help";
import Events from "./pages/Events";
import Feedback from "./pages/Feedback";
import AIChatbot from "./components/AIChatbot";



//event pages

import OnamEventForm from "./Event/OnamEventForm";
import RaagaRegistration from "./Event/RaagaRegistration";



//Enthusia Imports

import Enthusia from "./pages/Enthusia";
import ERegistration from "./Enthusia/Pages/ERegistration";
import GuestMeet from "./Enthusia/Pages/GuestMeet";
import ERules from "./Enthusia/Pages/ERules";
import EResult from "./Enthusia/components/EResult";
import Checking from "./Enthusia/Pages/checking";
import Staff from "./Enthusia/Pages/StaffMarking";
import SlotBooking from "./Enthusia/Pages/SlotBooking";
import Suggestion from "./Enthusia/Pages/Suggestion";
import Points from "./Enthusia/Pages/Points";
import Bank from "./Enthusia/Pages/Bank";
import Certificate from "./Enthusia/Pages/Certificate";
import RegAdmin from "./Enthusia/Pages/RegAdmin";
import EAbout from "./Enthusia/components/EAbout";
import Prelims from "./Enthusia/Pages/Prelims";
import Admin from "./Enthusia/Pages/Admin";
import EContact from "./Enthusia/components/EContact";
import BAdmin from "./Enthusia/Pages/BAdmin";


import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Check if current route is an Enthusia page
  const isEnthusiaPage = location.pathname.startsWith('/enthusia');
  
  // Check if current route is the Portal page (special handling)
  const isPortalPage = location.pathname === '/enthusia/portal';

  useEffect(() => {
    // Initialize AOS animations
    AOS.init({
      duration: 1000,
      once: true,
    });

  // Simulated loading screen (replace with real data loading if needed)
  const timer = setTimeout(() => setIsLoading(false), 1000);
  return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* Scrolling Banner - visible on all pages */}
      <ScrollingBanner />
      
      {/* Only show Navbar if not on Enthusia pages */}
      {!isEnthusiaPage && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <UpcomingEvents />
              <Pillars />
              <GroupPhoto />
              <Past />
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/office-bearers" element={<OfficeBearers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/aichatbot" element={<AIChatbot />} />
        <Route path="/events" element={<Events />} />


        {/* Event Routes */}
        <Route path="/event/onam" element={<OnamEventForm />} />
        <Route path="/event/raaga-registration" element={<RaagaRegistration />} />
        <Route path="/enthusia" element={<Enthusia />} />


        {/* Enthusia Routes */}
        <Route path="/enthusia" element={<Enthusia />} />
        <Route path="/enthusia/eabout" element={<EAbout />} />
        <Route path="/enthusia/certificate" element={<Certificate />} />
        <Route path="/enthusia/registration" element={<ERegistration />} />
        <Route path="/enthusia/z1x2c3v4b5n6m7a8s9d0f1g2h3j4k5l6q7w8e9r0t1q9w8e7r6t5y4u" element={<RegAdmin />} />
        <Route path="/enthusia/result" element={<EResult />} />
        <Route path="/enthusia/rules" element={<ERules />} />
        <Route path="/enthusia/prelims" element={<Prelims />} />
        <Route path="/enthusia/checking" element={<Checking />} />
        <Route path="/enthusia/staff" element={<Staff />} />
        <Route path="/enthusia/guestmeet" element={<GuestMeet />} />
        <Route path="/enthusia/slotbooking" element={<SlotBooking />} />
        <Route path="/enthusia/k8j9h5g6f4d3s2a1z0x9c8v7b6n5m4q3w2e1r9t8y7u6i5o4p3a2s1d0f9g8h7j6k5l4" element={<Points />} />
        <Route path="/enthusia/suggestion" element={<Suggestion />} />
        <Route path="/enthusia/bank" element={<Bank />} />
        <Route path="/enthusia/ERegistration" element={<ERegistration />} />
        <Route path="/enthusia/admin" element={<Admin />} />
        <Route path="/enthusia/Econtact" element={<EContact />} />
        <Route path="/enthusia/z9x8c7v6b5n4m3a2s1d0f1g2h3j4k5l6q7w8q1a0s9d8f7g6h5j4k3l2m1n0b9v" element={<BAdmin />} />


        
        {/* Catch-all for undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
        {/* Footer should appear on all pages except Portal */}
        {!isPortalPage && <Footer />}
        {!isPortalPage && <AIChatbot />}
    </>
  );
}

export default App;
