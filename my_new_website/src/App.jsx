import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './index.css';

// Initialize Google Analytics
ReactGA.initialize("G-ZRTP8LCG10");

function App() {
  useEffect(() => {
    // Send pageview with a custom path
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
