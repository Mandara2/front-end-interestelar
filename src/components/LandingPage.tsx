import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import InfoSections from './InfoSections';

const LandingPage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page">
      <div className="stars-background">
        {/* Multiple layers of stars */}
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        
        {/* Distant planets */}
        <div className="distant-planet planet-1"></div>
        <div className="distant-planet planet-2"></div>
        <div className="distant-planet planet-3"></div>
        <div className="distant-planet planet-4"></div>
        <div className="distant-planet planet-5"></div>
        
        {/* Nebula effects */}
        <div className="nebula nebula-1"></div>
        <div className="nebula nebula-2"></div>
        <div className="nebula nebula-3"></div>
        
        {/* Shooting stars */}
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>
      
      <Navigation />
      <Hero />
      <InfoSections />
    </div>
  );
};

export default LandingPage;