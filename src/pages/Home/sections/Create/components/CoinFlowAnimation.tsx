import React from 'react';
import './CreateCoinFlowAnimation.css';

interface CoinFlowAnimationProps {
  className?: string;
}

const CoinFlowAnimation: React.FC<CoinFlowAnimationProps> = ({ 
  className = '' 
}) => {
  return (
    <div className={`create-trading-animation ${className}`}>
      {/* Left side - Blue circle */}
      <div className="create-left-trader">
        <img 
          src="/logo-white-transparent.png" 
          alt="Blue Trader" 
          className="create-trader-logo"
        />
      </div>

      {/* Right side - White circle */}
      <div className="create-right-trader">
        <img 
          src="/logo-black-transparent.png" 
          alt="White Trader" 
          className="create-trader-logo"
        />
      </div>

      {/* Blue squares flowing from left to right (top line) */}
      <div className="create-square-flow create-square-1">
        <div className="create-square-token">
          <img src="/logo-white-transparent.png" alt="Square Token" className="create-token-logo" />
        </div>
      </div>
      <div className="create-square-flow create-square-2">
        <div className="create-square-token">
          <img src="/logo-white-transparent.png" alt="Square Token" className="create-token-logo" />
        </div>
      </div>
      <div className="create-square-flow create-square-3">
        <div className="create-square-token">
          <img src="/logo-white-transparent.png" alt="Square Token" className="create-token-logo" />
        </div>
      </div>

      {/* Blue circles flowing from right to left (bottom line) */}
      <div className="create-circle-flow create-circle-1">
        <div className="create-circle-token">
          <img src="/logo-white-transparent.png" alt="Circle Token" className="create-token-logo" />
        </div>
      </div>
      <div className="create-circle-flow create-circle-2">
        <div className="create-circle-token">
          <img src="/logo-white-transparent.png" alt="Circle Token" className="create-token-logo" />
        </div>
      </div>
      <div className="create-circle-flow create-circle-3">
        <div className="create-circle-token">
          <img src="/logo-white-transparent.png" alt="Circle Token" className="create-token-logo" />
        </div>
      </div>
    </div>
  );
};

export default CoinFlowAnimation;
