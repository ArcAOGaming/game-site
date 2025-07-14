import React from 'react';
import './CoinFlowAnimation.css';

interface CoinFlowAnimationProps {
  className?: string;
}

const CoinFlowAnimation: React.FC<CoinFlowAnimationProps> = ({
  className = ''
}) => {
  return (
    <div className={`mint-coin-flow-animation ${className}`}>
      {/* Mint Forge - Central minting mechanism */}
      <div className="mint-forge-container">
        <div className="mint-forge-core">
          <div className="mint-forge-inner">
            <img
              src="/logo-white-transparent.png"
              alt="$GAME Token Forge"
              className="mint-forge-logo"
            />
          </div>
          <div className="mint-forge-ring mint-forge-ring-1"></div>
          <div className="mint-forge-ring mint-forge-ring-2"></div>
          <div className="mint-forge-ring mint-forge-ring-3"></div>
        </div>
        <div className="mint-forge-energy-field"></div>
      </div>

      {/* Ethereum and DAI tokens on left side */}
      <div className="mint-ethereum-token">
        <img src="/ethereum-logo.svg" alt="Ethereum" className="mint-source-token-logo" />
      </div>
      <div className="mint-dai-token">
        <img src="/dai-logo.png" alt="DAI" className="mint-source-token-logo" />
      </div>

      {/* Stream lines from left tokens to center */}
      <div className="mint-stream-line mint-eth-to-center-line"></div>
      <div className="mint-stream-line mint-dai-to-center-line"></div>

      {/* AO tokens flowing from Ethereum and DAI to center */}
      <div className="mint-ao-token mint-ao-from-eth-1">
        <img src="/ao-logo-white-transparent.png" alt="AO" className="mint-ao-token-logo" />
      </div>
      <div className="mint-ao-token mint-ao-from-eth-2">
        <img src="/ao-logo-white-transparent.png" alt="AO" className="mint-ao-token-logo" />
      </div>
      <div className="mint-ao-token mint-ao-from-dai-1">
        <img src="/ao-logo-white-transparent.png" alt="AO" className="mint-ao-token-logo" />
      </div>
      <div className="mint-ao-token mint-ao-from-dai-2">
        <img src="/ao-logo-white-transparent.png" alt="AO" className="mint-ao-token-logo" />
      </div>

      {/* Green game tokens flowing out to the right side in varying directions */}
      <div className="mint-output-token mint-output-token-1">
        <img src="/logo-white-transparent.png" alt="$GAME" className="mint-output-token-logo" />
      </div>
      <div className="mint-output-token mint-output-token-2">
        <img src="/logo-white-transparent.png" alt="$GAME" className="mint-output-token-logo" />
      </div>
      <div className="mint-output-token mint-output-token-3">
        <img src="/logo-white-transparent.png" alt="$GAME" className="mint-output-token-logo" />
      </div>
      <div className="mint-output-token mint-output-token-4">
        <img src="/logo-white-transparent.png" alt="$GAME" className="mint-output-token-logo" />
      </div>
      <div className="mint-output-token mint-output-token-5">
        <img src="/logo-white-transparent.png" alt="$GAME" className="mint-output-token-logo" />
      </div>
      <div className="mint-output-token mint-output-token-6">
        <img src="/logo-white-transparent.png" alt="$GAME" className="mint-output-token-logo" />
      </div>
    </div>
  );
};

export default CoinFlowAnimation;
