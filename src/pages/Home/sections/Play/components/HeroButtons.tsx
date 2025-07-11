import React from 'react';
import './HeroButtons.css';

interface HeroButtonsProps {
  className?: string;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ className = '' }) => {
  const handlePlayNow = () => {
    window.open('https://runerealm.app', '_blank');
  };

  const handleOwn = () => {
    const ownSection = document.getElementById('own');
    if (ownSection) {
      ownSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCreate = () => {
    const createSection = document.getElementById('create');
    if (createSection) {
      createSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEarn = () => {
    const earnSection = document.getElementById('earn');
    if (earnSection) {
      earnSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMint = () => {
    const mintSection = document.getElementById('mint');
    if (mintSection) {
      mintSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`hero-buttons ${className}`}>

      
      <button className="btn-secondary" onClick={handleOwn}>
        <div className="btn-content">
          <span className="btn-icon">🏆</span>
          <span className="btn-text">OWN</span>
        </div>
      </button>

      <button className="btn-secondary" onClick={handleCreate}>
        <div className="btn-content">
          <span className="btn-icon">🎨</span>
          <span className="btn-text">CREATE</span>
        </div>
      </button>
            <button className="btn-primary" onClick={handlePlayNow}>
        <div className="btn-content">
          <span className="btn-icon">🎮</span>
          <span className="btn-text">PLAY NOW</span>
        </div>
      </button>

      <button className="btn-secondary" onClick={handleEarn}>
        <div className="btn-content">
          <span className="btn-icon">💰</span>
          <span className="btn-text">EARN</span>
        </div>
      </button>

      <button className="btn-secondary" onClick={handleMint}>
        <div className="btn-content">
          <span className="btn-icon">⚡</span>
          <span className="btn-text">MINT</span>
        </div>
      </button>
    </div>
  );
};

export default HeroButtons;
