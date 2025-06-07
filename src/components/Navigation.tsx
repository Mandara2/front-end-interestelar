import React, { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-text">Interestelar</span>
          <div className="logo-glow"></div>
        </div>
        
        <ul className="nav-links">
          <li>
            <button onClick={() => scrollToSection('hero')} className="nav-link">
              Inicio
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('features')} className="nav-link">
              Funcionalidades
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('about')} className="nav-link">
              Acerca de Interestelar
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('team')} className="nav-link">
              Nuestro equipo
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;