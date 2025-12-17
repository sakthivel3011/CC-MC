import { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Core components (loaded immediately)
import Navbar from "./components/Navbar";
import ScrollingBanner from "./components/ScrollingBanner";
import Hero from "./components/Hero";
import About from "./components/About";
import UpcomingEvents from "./components/UpcomingEvents";
import Pillars from "./components/Pillars";
import GroupPhoto from "./components/GroupPhoto";
import Past from "./components/Past";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

// Lazy load pages (loads only when route accessed)
const Gallery = lazy(() => import("./pages/Gallery"));
const OfficeBearers = lazy(() => import("./pages/OfficeBearers"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Help = lazy(() => import("./pages/Help"));
const Events = lazy(() => import("./pages/Events"));
const Feedback = lazy(() => import("./pages/Feedback"));
const AIChatbot = lazy(() => import("./components/AIChatbot"));

// Event pages (lazy load)
const OnamEventForm = lazy(() => import("./Event/OnamEventForm"));
const RaagaRegistration = lazy(() => import("./Event/RaagaRegistration"));

// Enthusia pages (lazy load)
const Enthusia = lazy(() => import("./pages/Enthusia"));
const ERegistration = lazy(() => import("./Enthusia/Pages/ERegistration"));
const GuestMeet = lazy(() => import("./Enthusia/Pages/GuestMeet"));
const ERules = lazy(() => import("./Enthusia/Pages/ERules"));
const Checking = lazy(() => import("./Enthusia/Pages/checking"));
const Staff = lazy(() => import("./Enthusia/Pages/StaffMarking"));
const Suggestion = lazy(() => import("./Enthusia/Pages/Suggestion"));
const Points = lazy(() => import("./Enthusia/Pages/Points"));
const Bank = lazy(() => import("./Enthusia/Pages/Bank"));
const Certificate = lazy(() => import("./Enthusia/Pages/Certificate"));
const RegAdmin = lazy(() => import("./Enthusia/Pages/RegAdmin"));
const EAbout = lazy(() => import("./Enthusia/components/EAbout"));
const Prelims = lazy(() => import("./Enthusia/Pages/Prelims"));
const Admin = lazy(() => import("./Enthusia/Pages/Admin"));
const EContact = lazy(() => import("./Enthusia/components/EContact"));
const BAdmin = lazy(() => import("./Enthusia/Pages/BAdmin"));

import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";


// Loading Fallback Component for lazy-loaded routes
const LoadingFallback = () => <Loading />;

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
      <Suspense fallback={<LoadingFallback />}>
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
          <Route path="/enthusia/result" element={<NotFound />} />
          <Route path="/enthusia/rules" element={<ERules />} />
          <Route path="/enthusia/prelims" element={<Prelims />} />
          <Route path="/enthusia/checking" element={<Checking />} />
          <Route path="/enthusia/staff" element={<Staff />} />
          <Route path="/enthusia/guestmeet" element={<GuestMeet />} />

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
      </Suspense>
        {/* Footer should appear on all pages except Portal */}
        {!isPortalPage && <Footer />}
        {!isPortalPage && <AIChatbot />}
    </>
  );
}

export default App;
