import { forwardRef } from 'react';
import './MintSection.css';

interface MintSectionProps {
  className?: string;
}

const MintSection = forwardRef<HTMLElement, MintSectionProps>(
  ({ className = '' }, ref) => {
    return (
      <section 
        ref={ref}
        id="mint" 
        className={`mint-section ${className}`}
      >
        {/* Animated background layers */}
        <div className="mint-bg-layer-1"></div>
        <div className="mint-bg-layer-2"></div>
        <div className="mint-bg-layer-3"></div>
        
        {/* Grid overlay */}
        <div className="mint-grid-overlay"></div>
        
        {/* Treasure Elements */}
        <div className="treasure-element treasure-chest-1">🏴‍☠️</div>
        <div className="treasure-element treasure-chest-2">💰</div>
        <div className="treasure-element treasure-gem-1">💎</div>
        <div className="treasure-element treasure-gem-2">💍</div>
        <div className="treasure-element treasure-coin-1">🪙</div>

        {/* Floating particles */}
        <div className="mint-particles">
          <div className="mint-particle-1"></div>
          <div className="mint-particle-2"></div>
          <div className="mint-particle-3"></div>
          <div className="mint-particle-4"></div>
          <div className="mint-particle-5"></div>
          
          {/* Geometric shapes */}
          <div className="mint-shape-1"></div>
          <div className="mint-shape-2"></div>
          <div className="mint-shape-3"></div>
          <div className="mint-shape-4"></div>
        </div>
        
        <div className="mint-content">
          <h2 className="mint-title">MINT</h2>
          <p className="mint-description">
            Transform your creations into valuable NFTs and trade them on the decentralized marketplace.
            Own your digital assets with true blockchain ownership.
          </p>

          <div className="mint-layout">
            <div className="mint-features">
              <div className="mint-feature">
                <div className="mint-feature-icon">💎</div>
                <div className="mint-feature-content">
                  <h3>True Ownership</h3>
                  <p>Your NFTs are stored on the blockchain, giving you complete ownership and control over your digital assets forever.</p>
                </div>
              </div>
              
              <div className="mint-feature">
                <div className="mint-feature-icon">🔄</div>
                <div className="mint-feature-content">
                  <h3>Instant Trading</h3>
                  <p>Buy, sell, and trade your NFTs instantly on our integrated marketplace with zero friction and maximum security.</p>
                </div>
              </div>
              
              <div className="mint-feature">
                <div className="mint-feature-icon">🚀</div>
                <div className="mint-feature-content">
                  <h3>Cross-Game Utility</h3>
                  <p>Use your NFTs across multiple games and platforms in the $Game ecosystem, maximizing their value and utility.</p>
                </div>
              </div>
            </div>

            <div className="mint-showcase">
              <div className="mint-nft-card">
                <div className="mint-nft-image">💎</div>
                <h3 className="mint-nft-title">Legendary Sword</h3>
                <p className="mint-nft-rarity">Rare • Attack +150 • Magic +75</p>
                <div className="mint-nft-price">0.5 ETH</div>
                <button className="mint-nft-button">MINT NOW</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

MintSection.displayName = 'MintSection';

export default MintSection;
