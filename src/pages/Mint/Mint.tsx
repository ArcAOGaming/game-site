import { useEffect, useState } from 'react';
import { MintCoinFlowAnimation } from '../../shared/components/CoinFlowAnimations/Mint';
import { WalletConnections, TokenomicsSection, PermawebMatchSection, UtilityBenefitsSection } from './components';
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
        <MintCoinFlowAnimation />
        <p className="mint-description">
          Experience the future of gaming finance with $GAME token. Built on AO the Hyper Parallel Computer,
          with a fair launch model inspired by Bitcoin's proven distribution mechanism.
        </p>

        {/* Mint Headliners */}
        <div className="mint-headliners">
          <div className="mint-headline">
            <div className="mint-headline-value">$2M+</div>
            <div className="mint-headline-label">Total Deposited</div>
          </div>
          <div className="mint-headline">
            <div className="mint-headline-value">Bitcoin Model</div>
            <div className="mint-headline-label">Release Rate</div>
          </div>
          <div className="mint-headline">
            <div className="mint-headline-value">Fair Launch</div>
            <div className="mint-headline-label">Distribution</div>
          </div>
        </div>

        {/* Tokenomics, Match, and Utility Sections */}
        <div className="tokenomics-utility-container">
          <TokenomicsSection />
          <PermawebMatchSection />
          <UtilityBenefitsSection />
        </div>

        {/* Wallet Connections */}
        <WalletConnections />

      </div>
    </div>
  );
};

export default Mint;
