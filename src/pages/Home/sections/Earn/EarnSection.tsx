import { forwardRef } from 'react';
import { ARCAO } from '@arcaogaming/project-links';
import './EarnSection.css';
import CoinFlowAnimation from '../../../../shared/components/CoinFlowAnimations/Earn/CoinFlowAnimation';

interface EarnSectionProps {
  className?: string;
}

const EarnSection = forwardRef<HTMLElement, EarnSectionProps>(
  ({ className = '' }, ref) => {
    const scrollToMint = () => {
      const mintSection = document.getElementById('mint');
      if (mintSection) {
        mintSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const handlePlayClick = () => {
      window.open(ARCAO.discord, '_blank');
    };

    const handleAmbassadorClick = () => {
      window.open(ARCAO.ambassadorProgramSignup, '_blank');
    };

    return (
      <section 
        ref={ref}
        id="earn" 
        className={`earn-section ${className}`}
      >
        {/* Animated background layers */}
        <div className="earn-bg-layer-1"></div>
        <div className="earn-bg-layer-2"></div>
        <div className="earn-bg-layer-3"></div>
        
        {/* Grid overlay */}
        <div className="earn-grid-overlay"></div>
        
        {/* Coin Elements */}
        <div className="coin-element coin-stack-1">🪙</div>
        <div className="coin-element coin-stack-2">💰</div>
        <div className="coin-element coin-rain-1">🪙</div>
        <div className="coin-element coin-rain-2">💰</div>
        
        {/* Floating particles */}
        <div className="earn-particles">
          <div className="earn-particle-1"></div>
          <div className="earn-particle-2"></div>
          <div className="earn-particle-3"></div>
          <div className="earn-particle-4"></div>
          <div className="earn-particle-5"></div>
          <div className="earn-particle-6"></div>
          
          {/* Geometric shapes */}
          <div className="earn-shape-1"></div>
          <div className="earn-shape-2"></div>
          <div className="earn-shape-3"></div>
          <div className="earn-shape-4"></div>
        </div>

        <div className="earn-content">
          <h2 className="earn-title">EARN</h2>
          
          {/* Coin Flow Animation */}
          <CoinFlowAnimation />
          
          <p className="earn-description">
            Multiple ways to earn $GAME tokens and valuable rewards. Stake, play, and stream 
            your way to financial freedom in the gaming ecosystem.
          </p>

          <div className="earn-rewards">
            {/* Stake Card - Green Theme */}
            <div className="earn-card earn-card-stake" onClick={scrollToMint}>
              <div className="earn-card-header">
                <div className="earn-card-icon">💰</div>
                <h3 className="earn-card-title">Stake</h3>
              </div>
              <div className="earn-card-amount">$2M+ Deposited</div>
              <p className="earn-card-description">
                Stake to earn. $2M in fair launch deposits. Stake your $GAME tokens and earn passive income while securing the network.
              </p>
              <div className="earn-card-glow"></div>
            </div>
            
            {/* Play Card - Blue Theme */}
            <div className="earn-card earn-card-play" onClick={handlePlayClick}>
              <div className="earn-card-header">
                <div className="earn-card-icon">🎮</div>
                <h3 className="earn-card-title">Play</h3>
              </div>
              <div className="earn-card-amount">Unlimited</div>
              <p className="earn-card-description">
                Play to earn. Gain valuable in-game assets through gameplay. The more you play, the more you earn. Become eligible for exclusive airdrops and rare rewards.
              </p>
              <div className="earn-card-glow"></div>
            </div>
            
            {/* Stream Card - Purple Theme */}
            <div className="earn-card earn-card-stream" onClick={handleAmbassadorClick}>
              <div className="earn-card-header">
                <div className="earn-card-icon">📺</div>
                <h3 className="earn-card-title">Stream</h3>
              </div>
              <div className="earn-card-amount">Ambassador</div>
              <p className="earn-card-description">
                Stream & record to earn. Join the $GAME Ambassador Program. Stream gameplay, create content, and earn rewards while building the gaming community.
              </p>
              <div className="earn-card-hover-overlay">
                <span className="earn-card-cta">Apply Now</span>
              </div>
              <div className="earn-card-glow"></div>
            </div>
          </div>

        </div>
      </section>
    );
  }
);

EarnSection.displayName = 'EarnSection';

export default EarnSection;
