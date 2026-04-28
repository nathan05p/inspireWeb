import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Layout from './components/Layout';
import Home from './pages/Home';
import Work from './pages/Work';
import Services from './pages/Services';
import About from './pages/About';
import Insights from './pages/Insights';
import Contact from './pages/Contact';
import Camp from './pages/camp/Camp';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Camp is now the official landing page */}
        <Route path="/" element={<Camp />} />
        
        {/* The original website is moved to /home temporarily */}
        <Route path="/home" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="insights" element={<Insights />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Loading screen sits on top; removed from DOM after exit animation */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Page content — rendered beneath loading screen from the start */}
      {!loading && (
        <Router>
          <AnimatedRoutes />
        </Router>
      )}
    </>
  );
}

export default App;
