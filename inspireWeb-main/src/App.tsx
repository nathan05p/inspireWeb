import { lazy, Suspense, useState } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Layout from './components/Layout';
import Camp from './pages/camp/Camp';

// Lazy loaded pages to optimize initial bundle size
const Home = lazy(() => import('./pages/Home'));
const Work = lazy(() => import('./pages/Work'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Insights = lazy(() => import('./pages/Insights'));
const Contact = lazy(() => import('./pages/Contact'));

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Camp is now the official landing page */}
        <Route path="/" element={<Camp />} />
        
        {/* The original website is moved to /home temporarily */}
        <Route path="/home" element={<Layout />}>
          <Route index element={
            <Suspense fallback={null}>
              <Home />
            </Suspense>
          } />
          <Route path="work" element={
            <Suspense fallback={null}>
              <Work />
            </Suspense>
          } />
          <Route path="services" element={
            <Suspense fallback={null}>
              <Services />
            </Suspense>
          } />
          <Route path="about" element={
            <Suspense fallback={null}>
              <About />
            </Suspense>
          } />
          <Route path="insights" element={
            <Suspense fallback={null}>
              <Insights />
            </Suspense>
          } />
          <Route path="contact" element={
            <Suspense fallback={null}>
              <Contact />
            </Suspense>
          } />
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
      <Router>
        <AnimatedRoutes />
      </Router>
      <SpeedInsights />
    </>
  );
}

export default App;
