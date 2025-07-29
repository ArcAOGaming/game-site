import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './TopBar.css';

const TopBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const location = useLocation();

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if we're at the top
      setIsAtTop(currentScrollY < 10);

      // Show/hide based on scroll direction
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        // Scrolling up or near top - show topbar
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and not near top - hide topbar
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const isCurrentPage = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`topbar ${isVisible ? 'topbar-visible' : 'topbar-hidden'} ${isAtTop ? 'topbar-at-top' : 'topbar-scrolled'}`}>
      <div className="topbar-content">
        {/* Left: Earn Button */}
        <Link to="/earn" className="topbar-link topbar-link-left">
          <span className="topbar-link-text">Earn</span>
          {isCurrentPage('/earn') && <div className="topbar-dot"></div>}
        </Link>

        {/* Left-Center: AI Button */}
        <Link to="/ai" className="topbar-link topbar-link-left-center">
          <span className="topbar-link-text">AI</span>
          {isCurrentPage('/ai') && <div className="topbar-dot"></div>}
        </Link>

        {/* Center: Logo */}
        <Link to="/" className="topbar-logo">
          <img src="/logo-white-transparent.png" alt="Game Logo" className="topbar-logo-img" />
          {isCurrentPage('/') && <div className="topbar-dot topbar-dot-center"></div>}
        </Link>

        {/* Right: Mint Button */}
        <Link to="/mint" className="topbar-link topbar-link-right">
          <span className="topbar-link-text">Mint</span>
          {isCurrentPage('/mint') && <div className="topbar-dot"></div>}
        </Link>
      </div>
    </nav>
  );
};

export default TopBar;
