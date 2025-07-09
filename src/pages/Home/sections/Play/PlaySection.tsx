import { forwardRef } from 'react';
import { VideoCarousel } from './components';
import './PlaySection.css';

interface PlaySectionProps {
  className?: string;
}

const PlaySection = forwardRef<HTMLElement, PlaySectionProps>(
  ({ className = '' }, ref) => {

    return (
      <section 
        ref={ref}
        id="play" 
        className={`hero-section ${className}`}
      >
        {/* Animated background with multiple layers */}
        <div className="hero-bg-layer-1"></div>
        <div className="hero-bg-layer-2"></div>
        <div className="hero-bg-layer-3"></div>
        
        {/* Animated Game Characters */}
        <div className="game-character character-runner-1">🏃‍♂️</div>
        <div className="game-character character-chaser-1">👹</div>
        <div className="game-character character-runner-2">🧙‍♀️</div>
        <div className="game-character character-chaser-2">🐉</div>
        <div className="game-character character-runner-3">🦸‍♂️</div>
        <div className="game-character character-chaser-3">👾</div>
        <div className="game-character character-flying-1">🚁</div>
        <div className="game-character character-flying-2">🦅</div>

        {/* Enhanced floating particles */}
        <div className="floating-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          
          {/* Floating geometric shapes */}
          <div className="geometric-shape-1"></div>
          <div className="geometric-shape-2"></div>
          <div className="geometric-shape-3"></div>
        </div>
        
        {/* Grid overlay for tech feel */}
        <div className="grid-overlay"></div>

        <div className="hero-content">
          <div>
            <h1 className="hero-title">$GAME</h1>
            <p className="hero-subtitle">THE FUTURE OF DECENTRALIZED GAMING</p>
            <p className="hero-description">
              Experience next-generation blockchain gaming where you truly own your assets, 
              create immersive worlds, and mint legendary NFTs that hold real value.
            </p>
          </div>

          {/* Video Carousel */}
          <div className="hero-video">
            <VideoCarousel />
          </div>

          <div className="hero-buttons">
            <button className="btn-primary">
              <div className="btn-content">
                <span className="btn-icon">🎮</span>
                <span className="btn-text">START PLAYING</span>
              </div>
            </button>
            
            <button className="btn-secondary">
              <div className="btn-content">
                <span className="btn-icon">📖</span>
                <span className="btn-text">LEARN MORE</span>
              </div>
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number purple">10K+</div>
              <div className="stat-label">Active Players</div>
            </div>
            <div className="stat-item">
              <div className="stat-number cyan">500+</div>
              <div className="stat-label">NFTs Minted</div>
            </div>
            <div className="stat-item">
              <div className="stat-number pink">∞</div>
              <div className="stat-label">Possibilities</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

PlaySection.displayName = 'PlaySection';

export default PlaySection;
