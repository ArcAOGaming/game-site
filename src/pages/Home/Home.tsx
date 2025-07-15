import { useEffect, useRef } from 'react';
import './Home.css';
import { PlaySection, OwnSection, CreateSection, MintSection, EarnSection, FooterSection } from './sections';

function Home() {
  const playRef = useRef<HTMLElement>(null);
  const ownRef = useRef<HTMLElement>(null);
  const earnRef = useRef<HTMLElement>(null);
  const createRef = useRef<HTMLElement>(null);
  const mintRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Make the hero section visible immediately
    if (playRef.current) {
      playRef.current.classList.add('animate-in');
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const sections = [ownRef.current, earnRef.current, createRef.current, mintRef.current, footerRef.current];
    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <div className="gaming-home">
      {/* Hero Section / Play Section */}
      <PlaySection ref={playRef} />

      {/* Own Section */}
      <OwnSection ref={ownRef} />

      {/* Earn Section */}
      <EarnSection ref={earnRef} />

      {/* Create Section */}
      <CreateSection ref={createRef} />

      {/* Mint Section */}
      <MintSection ref={mintRef} />

      {/* Footer Section */}
      <FooterSection ref={footerRef} />
    </div>
  )
}

export default Home
