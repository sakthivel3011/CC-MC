import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
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
import OnamEventForm from "./pages/OnamEventForm";
import Event from "./pages/Event";
import Feedback from "./pages/Feedback";
import RaagaRegistration from "./pages/RaagaRegistration";
import AIChatbot from "./components/AIChatbot";
import Enthusia from "./pages/Enthusia";
import ERegistration from "./Enthusia/Pages/ERegistration";
import ECheckPage from "./Enthusia/Pages/ECheck";
import ERules from "./Enthusia/Pages/ERules";
import EResult from "./Enthusia/components/EResult";
import Admin from "./Enthusia/Pages/Admin";
import Staff from "./Enthusia/Pages/StaffMarking";
import SlotBooking from "./Enthusia/Pages/SlotBooking";
import Suggestion from "./Enthusia/Pages/Suggestion";
import Points from "./Enthusia/Pages/Points";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";




function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Check if current route is an Enthusia page
  const isEnthusiaPage = location.pathname.startsWith('/enthusia');

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

        {/* Enthusia Routes */}
        <Route path="/enthusia" element={<Enthusia />} />
        <Route path="/enthusia/registration" element={<ERegistration />} />
        <Route path="/enthusia/result" element={<EResult />} />
        <Route path="/enthusia/check" element={<ECheckPage />} />
        <Route path="/enthusia/rules" element={<ERules />} />
        <Route path="/event" element={<Event />} />
        <Route path="/enthusia/admin" element={<Admin />} />
        <Route path="/enthusia/staff" element={<Staff />} />
        <Route path="/enthusia/slotbooking" element={<SlotBooking />} />
        <Route path="/enthusia/points" element={<Points />} />
        <Route path="/enthusia/suggestion" element={<Suggestion />} />
        <Route path="/OnamEventForm" element={<NotFound />} />
        <Route path="/raaga" element={<NotFound />} />
        {/* Catch-all for undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
        {/* Footer should appear on all pages */}
        <Footer />
        <AIChatbot />
    </>
  );
}

export default App;
