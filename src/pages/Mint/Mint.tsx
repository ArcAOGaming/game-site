import { useEffect, useState } from 'react';
import './Mint.css';

const Mint = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`mint-page ${isVisible ? 'animate-in' : ''}`}>
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
        <h1 className="mint-title">$GAME TOKEN MINTING</h1>
        <p className="mint-description">
          Experience the future of gaming finance with $GAME token. Built on cutting-edge blockchain technology 
          with a fair launch model inspired by Bitcoin's proven distribution mechanism.
        </p>

        {/* Minting Interface */}
        <div className="mint-interface">
          <div className="mint-interface-card">
            <h2 className="mint-interface-title">Mint $GAME Tokens</h2>
            <p className="mint-interface-description">
              Connect your wallet and participate in the fair launch. No pre-mine, no insider allocations.
            </p>
            
            <div className="mint-stats">
              <div className="mint-stat">
                <div className="mint-stat-value">$2M+</div>
                <div className="mint-stat-label">Total Deposited</div>
              </div>
              <div className="mint-stat">
                <div className="mint-stat-value">Bitcoin Model</div>
                <div className="mint-stat-label">Release Rate</div>
              </div>
              <div className="mint-stat">
                <div className="mint-stat-value">Fair Launch</div>
                <div className="mint-stat-label">Distribution</div>
              </div>
            </div>

            <div className="mint-actions">
              <button className="connect-wallet-btn">
                <span>🔗</span>
                <span>Connect Wallet</span>
              </button>
              <button className="mint-tokens-btn">
                <span>⚡</span>
                <span>MINT $GAME</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="mint-details">
          <div className="mint-detail-section">
            <h3 className="mint-detail-title">Tokenomics</h3>
            <div className="mint-detail-grid">
              <div className="mint-detail-item">
                <div className="mint-detail-label">Total Supply</div>
                <div className="mint-detail-value">21,000,000 $GAME</div>
              </div>
              <div className="mint-detail-item">
                <div className="mint-detail-label">Fair Launch</div>
                <div className="mint-detail-value">100%</div>
              </div>
              <div className="mint-detail-item">
                <div className="mint-detail-label">Pre-mine</div>
                <div className="mint-detail-value">0%</div>
              </div>
              <div className="mint-detail-item">
                <div className="mint-detail-label">Release Model</div>
                <div className="mint-detail-value">Bitcoin-inspired</div>
              </div>
            </div>
          </div>

          <div className="mint-detail-section">
            <h3 className="mint-detail-title">Utility & Benefits</h3>
            <div className="mint-utility-list">
              <div className="mint-utility-item">
                <span className="mint-utility-icon">🎮</span>
                <div className="mint-utility-content">
                  <h4>Gaming Ecosystem</h4>
                  <p>Use $GAME across all ARCAO games and platforms</p>
                </div>
              </div>
              <div className="mint-utility-item">
                <span className="mint-utility-icon">🏆</span>
                <div className="mint-utility-content">
                  <h4>Staking Rewards</h4>
                  <p>Stake tokens to earn passive income and governance rights</p>
                </div>
              </div>
              <div className="mint-utility-item">
                <span className="mint-utility-icon">🛒</span>
                <div className="mint-utility-content">
                  <h4>In-Game Purchases</h4>
                  <p>Buy items, upgrades, and exclusive content</p>
                </div>
              </div>
              <div className="mint-utility-item">
                <span className="mint-utility-icon">🗳️</span>
                <div className="mint-utility-content">
                  <h4>Governance</h4>
                  <p>Vote on game development and ecosystem decisions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mint;
