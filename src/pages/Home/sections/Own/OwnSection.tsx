import { forwardRef } from 'react';
import { AO, BAZAR, WANDER } from '@arcaogaming/project-links';
import { CoinFlowAnimation } from './components';
import './OwnSection.css';

interface OwnSectionProps {
  className?: string;
}

const OwnSection = forwardRef<HTMLElement, OwnSectionProps>(
  ({ className = '' }, ref) => {
    return (
      <section 
        ref={ref}
        id="own" 
        className={`own-section ${className}`}
      >
        {/* Animated background layers */}
        <div className="own-bg-layer-1"></div>
        <div className="own-bg-layer-2"></div>
        <div className="own-bg-layer-3"></div>
        
        {/* Grid overlay */}
        <div className="own-grid-overlay"></div>
        
        {/* Blockchain Elements */}
        <div className="blockchain-element chain-link-1">🔗</div>
        <div className="blockchain-element chain-link-2">⛓️</div>
        <div className="blockchain-element shield-1">🛡️</div>
        <div className="blockchain-element shield-2">🔒</div>
        
        {/* Floating particles */}
        <div className="own-particles">
          <div className="own-particle-1"></div>
          <div className="own-particle-2"></div>
          <div className="own-particle-3"></div>
          <div className="own-particle-4"></div>
          <div className="own-particle-5"></div>
          
          {/* Geometric shapes */}
          <div className="own-shape-1"></div>
          <div className="own-shape-2"></div>
          <div className="own-shape-3"></div>
          <div className="own-shape-4"></div>
        </div>

        <div className="own-container">
          <div className="own-content">
            <h2 className="own-title">Own Your Digital Assets</h2>
            
            {/* Coin Flow Animation */}
            <CoinFlowAnimation />
            
            <p className="own-subtitle">True ownership in the blockchain gaming ecosystem</p>
            <p className="own-description">
              Your in-game assets are truly yours. Trade, sell, or use them across multiple games. 
              Build wealth through gameplay and watch your digital portfolio grow as more games integrate with our ecosystem.
            </p>
            
            <div className="own-features">
              <div className="feature-item">
                <div className="feature-icon">🏆</div>
                <h3 className="feature-title">True Ownership</h3>
                <p className="feature-description">
                  Your assets are stored on the <a href={AO.mint} target="_blank" rel="noopener noreferrer" className="ao-link">Arweave/AO blockchain</a>, giving you complete control and ownership.
                </p>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">🔄</div>
                <h3 className="feature-title">Cross-Game Utility</h3>
                <p className="feature-description">
                  Use your assets across multiple games in our growing ecosystem and anywhere <a href={WANDER.website} target="_blank" rel="noopener noreferrer" className="ao-link">Wander wallet</a> connects.
                </p>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">📈</div>
                <h3 className="feature-title">Value Growth</h3>
                <p className="feature-description">
                  Watch your assets appreciate on <a href={BAZAR.website} target="_blank" rel="noopener noreferrer" className="ao-link">Bazar</a> as more games and players join the network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

OwnSection.displayName = 'OwnSection';

export default OwnSection;
