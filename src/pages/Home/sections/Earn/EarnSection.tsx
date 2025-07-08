import { forwardRef } from 'react';
import './EarnSection.css';

interface EarnSectionProps {
  className?: string;
}

const EarnSection = forwardRef<HTMLElement, EarnSectionProps>(
  ({ className = '' }, ref) => {
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
          <p className="earn-description">
            Turn your gaming skills into real rewards. Compete, win, and earn $GAME tokens 
            through various gameplay mechanics, tournaments, and achievements.
          </p>

          <div className="earn-rewards">
            <div className="earn-reward-card">
              <span className="earn-reward-icon">🏆</span>
              <h3 className="earn-reward-title">Tournaments</h3>
              <div className="earn-reward-amount">1000+</div>
              <p className="earn-reward-description">
                Compete in daily tournaments and win big prizes. Show your skills and climb the leaderboards.
              </p>
            </div>
            
            <div className="earn-reward-card">
              <span className="earn-reward-icon">🎯</span>
              <h3 className="earn-reward-title">Daily Quests</h3>
              <div className="earn-reward-amount">50-200</div>
              <p className="earn-reward-description">
                Complete daily and weekly quests for consistent rewards. Never run out of ways to earn.
              </p>
            </div>
            
            <div className="earn-reward-card">
              <span className="earn-reward-icon">💰</span>
              <h3 className="earn-reward-title">Staking Rewards</h3>
              <div className="earn-reward-amount">12% APY</div>
              <p className="earn-reward-description">
                Stake your $GAME tokens and earn passive income. Let your tokens work for you.
              </p>
            </div>
            
            <div className="earn-reward-card">
              <span className="earn-reward-icon">🎮</span>
              <h3 className="earn-reward-title">Play to Earn</h3>
              <div className="earn-reward-amount">10-50/hr</div>
              <p className="earn-reward-description">
                Earn tokens just by playing your favorite games. The more you play, the more you earn.
              </p>
            </div>
          </div>

          <div className="earn-cta">
            <button className="earn-cta-button">
              <div className="earn-cta-content">
                <span>💰</span>
                <span>START EARNING</span>
              </div>
            </button>
          </div>
        </div>
      </section>
    );
  }
);

EarnSection.displayName = 'EarnSection';

export default EarnSection;
