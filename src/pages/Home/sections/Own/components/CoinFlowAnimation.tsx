import React from 'react';
import './OwnCoinFlowAnimation.css';

interface CoinFlowAnimationProps {
  className?: string;
}

const CoinFlowAnimation: React.FC<CoinFlowAnimationProps> = ({ 
  className = '' 
}) => {
  return (
    <div className={`own-magnetic-animation ${className}`}>
      {/* Central purple-blue square that attracts value */}
      <div className="own-central-magnet">
        <img 
          src="/logo-white-transparent.png" 
          alt="Value Magnet" 
          className="own-magnet-logo"
        />
      </div>

      {/* Green circles spawning from all sides and being attracted to center */}
      {/* Top side spawns */}
      <div className="own-attracted-token own-token-top-1">
        <div className="own-green-circle">
          <img src="/logo-white-transparent.png" alt="Value Token" className="own-circle-logo" />
        </div>
      </div>
      <div className="own-attracted-token own-token-top-2">
        <div className="own-green-circle">
          <img src="/logo-white-transparent.png" alt="Value Token" className="own-circle-logo" />
        </div>
      </div>

      {/* Right side spawns */}
      <div className="own-attracted-token own-token-right-1">
        <div className="own-green-circle">
          <img src="/logo-white-transparent.png" alt="Value Token" className="own-circle-logo" />
        </div>
      </div>
      <div className="own-attracted-token own-token-right-2">
        <div className="own-green-circle">
          <img src="/logo-white-transparent.png" alt="Value Token" className="own-circle-logo" />
        </div>
      </div>

      {/* Bottom side spawns */}
      <div className="own-attracted-token own-token-bottom-1">
        <div className="own-green-circle">
          <img src="/logo-white-transparent.png" alt="Value Token" className="own-circle-logo" />
        </div>
      </div>
      <div className="own-attracted-token own-token-bottom-2">
        <div className="own-green-circle">
          <img src="/logo-white-transparent.png" alt="Value Token" className="own-circle-logo" />
        </div>
      </div>

      {/* Left side spawns */}
      <div className="own-attracted-token own-token-left-1">
        <div className="own-green-circle">
          <img src="/logo-white-transparent.png" alt="Value Token" className="own-circle-logo" />
        </div>
      </div>
      <div className="own-attracted-token own-token-left-2">
        <div className="own-green-circle">
          <img src="/logo-white-transparent.png" alt="Value Token" className="own-circle-logo" />
        </div>
      </div>
    </div>
  );
};

export default CoinFlowAnimation;
