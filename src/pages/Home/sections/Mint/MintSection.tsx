import { forwardRef, useState } from 'react';
import { AO } from '@arcaogaming/project-links';
import { CONTRACT_ADDRESSES, EXTERNAL_LINKS } from '../../../../shared/constants';
import { CoinFlowAnimation } from './components';
import './MintSection.css';

interface MintSectionProps {
  className?: string;
}

const MintSection = forwardRef<HTMLElement, MintSectionProps>(
  ({ className = '' }, ref) => {
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopyAddress = async () => {
      try {
        await navigator.clipboard.writeText(CONTRACT_ADDRESSES.GAME_TOKEN);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error('Failed to copy address:', err);
      }
    };

    const formatAddress = (address: string) => {
      return `${address.slice(0, 3)}...${address.slice(-3)}`;
    };
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
          <h2 className="mint-title">MINT $GAME</h2>
          
          {/* Coin Flow Animation */}
          <CoinFlowAnimation />
          <p className="mint-description">
            Join the fair launch of $GAME token with the same release rate as <a href="https://bitcoin.org" target="_blank" rel="noopener noreferrer" className="bitcoin-link">Bitcoin</a>. 
            Secure your position in the future of gaming finance.
          </p>

          <div className="mint-headliners">
            <div className="mint-headline">
              <div className="mint-headline-value">$2M+</div>
              <div className="mint-headline-label">Fair Launch Deposits</div>
            </div>
            <div className="mint-headline">
              <div className="mint-headline-value">Bitcoin Model</div>
              <div className="mint-headline-label">Release Rate</div>
            </div>
          </div>

          <div className="mint-layout">
            <div className="mint-features">
              <div className="mint-feature">
                <div className="mint-feature-icon">⚖️</div>
                <div className="mint-feature-content">
                  <h3>Fair Launch</h3>
                  <p>No pre-mine, no insider allocations. Everyone gets the same opportunity to participate in the $GAME token launch.</p>
                </div>
              </div>
              
              <div className="mint-feature">
                <div className="mint-feature-icon">🔒</div>
                <div className="mint-feature-content">
                  <h3>Secure Minting</h3>
                  <p>Built on <a href={AO.website} target="_blank" rel="noopener noreferrer" className="ao-link">Arweave AO fairlaunch</a> with proven security and decentralization for maximum trust and reliability.</p>
                </div>
              </div>
              
              <div className="mint-feature">
                <div className="mint-feature-icon">💰</div>
                <div className="mint-feature-content">
                  <h3>Gaming Utility</h3>
                  <p>Use $GAME tokens across the entire gaming ecosystem for staking, rewards, governance, and in-game purchases.</p>
                </div>
              </div>
            </div>

            <div className="mint-showcase">
              <div className="mint-token-card">
                <div className="mint-token-logo">
                  <img src="/logo-white-transparent.png" alt="$GAME Token" className="token-logo" />
                </div>
                <h3 className="mint-token-title">$GAME Token</h3>
                <p className="mint-token-supply">Fair Launch • Deflationary</p>
                
                {/* Contract Verification Section */}
                <div className="contract-verification-section">
                  <div className="contract-info">
                    <span className="contract-label">Contract Address</span>
                    <div className="contract-actions">
                      <button 
                        className="contract-address-btn"
                        onClick={handleCopyAddress}
                        title="Click to copy full address"
                      >
                        <span className="contract-address-text">
                          {formatAddress(CONTRACT_ADDRESSES.GAME_TOKEN)}
                        </span>
                        <span className="copy-icon">📋</span>
                      </button>
                      <a 
                        href={EXTERNAL_LINKS.BRANTA_VERIFY}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="branta-verify-btn"
                        title="Verify contract on Branta"
                      >
                        <span>Verify</span>
                        <img src="/branta-logo-white.svg" alt="Branta" className="branta-logo" />
                      </a>
                    </div>
                    {copySuccess && <span className="copy-success">Address copied to clipboard!</span>}
                  </div>
                </div>

                {/* Botega Buy Section */}
                <div className="botega-buy-section">
                  <a 
                    href={EXTERNAL_LINKS.BOTEGA_BUY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="botega-buy-btn"
                    title="Buy $GAME on Botega"
                  >
                    <span>Buy $GAME on</span>
                    <img src="/botega-logo.png" alt="Botega" className="botega-logo" />
                  </a>
                </div>

                <div className="mint-token-button-section">
                  <div className="mint-token-button">
                    <span>⚡</span>
                    <span>MINT $GAME</span>
                  </div>
                </div>
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
