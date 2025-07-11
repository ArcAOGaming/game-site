import React from 'react';
import './CoinFlowAnimation.css';

interface CoinFlowAnimationProps {
  className?: string;
}

const CoinFlowAnimation: React.FC<CoinFlowAnimationProps> = ({ 
  className = '' 
}) => {
  return (
    <div className={`earn-station-animation ${className}`}>
      {/* Three stations forming a triangle */}
      {/* Blue station at top */}
      <div className="earn-station earn-blue-station">
        <img 
          src="/logo-white-transparent.png" 
          alt="Blue Station" 
          className="earn-station-logo"
        />
      </div>

      {/* Green station at bottom left */}
      <div className="earn-station earn-green-station">
        <img 
          src="/logo-white-transparent.png" 
          alt="Green Station" 
          className="earn-station-logo"
        />
      </div>

      {/* Purple station at bottom right */}
      <div className="earn-station earn-purple-station">
        <img 
          src="/logo-white-transparent.png" 
          alt="Purple Station" 
          className="earn-station-logo"
        />
      </div>

      {/* Gold traveling logo that moves between stations */}
      <div className="earn-traveler">
        <img 
          src="/logo-white-transparent.png" 
          alt="Gold Traveler" 
          className="earn-traveler-logo"
        />
      </div>

      {/* Small tokens that follow the traveler */}
      {/* Blue circles from blue station */}
      <div className="earn-follower earn-blue-follower-1">
        <div className="earn-blue-circle">
          <img src="/logo-white-transparent.png" alt="Blue Token" className="earn-follower-logo" />
        </div>
      </div>
      <div className="earn-follower earn-blue-follower-2">
        <div className="earn-blue-circle">
          <img src="/logo-white-transparent.png" alt="Blue Token" className="earn-follower-logo" />
        </div>
      </div>
      <div className="earn-follower earn-blue-follower-3">
        <div className="earn-blue-circle">
          <img src="/logo-white-transparent.png" alt="Blue Token" className="earn-follower-logo" />
        </div>
      </div>
      <div className="earn-follower earn-blue-follower-4">
        <div className="earn-blue-circle">
          <img src="/logo-white-transparent.png" alt="Blue Token" className="earn-follower-logo" />
        </div>
      </div>

      {/* Green circles from green station */}
      <div className="earn-follower earn-green-follower-1">
        <div className="earn-green-circle">
          <img src="/logo-white-transparent.png" alt="Green Token" className="earn-follower-logo" />
        </div>
      </div>
      <div className="earn-follower earn-green-follower-2">
        <div className="earn-green-circle">
          <img src="/logo-white-transparent.png" alt="Green Token" className="earn-follower-logo" />
        </div>
      </div>
      <div className="earn-follower earn-green-follower-3">
        <div className="earn-green-circle">
          <img src="/logo-white-transparent.png" alt="Green Token" className="earn-follower-logo" />
        </div>
      </div>
      <div className="earn-follower earn-green-follower-4">
        <div className="earn-green-circle">
          <img src="/logo-white-transparent.png" alt="Green Token" className="earn-follower-logo" />
        </div>
      </div>

      {/* Purple squares from purple station */}
      <div className="earn-follower earn-purple-follower-1">
        <div className="earn-purple-square">
          <img src="/logo-white-transparent.png" alt="Purple Token" className="earn-follower-logo" />
        </div>
      </div>
      <div className="earn-follower earn-purple-follower-2">
        <div className="earn-purple-square">
          <img src="/logo-white-transparent.png" alt="Purple Token" className="earn-follower-logo" />
        </div>
      </div>
      <div className="earn-follower earn-purple-follower-3">
        <div className="earn-purple-square">
          <img src="/logo-white-transparent.png" alt="Purple Token" className="earn-follower-logo" />
        </div>
      </div>
      <div className="earn-follower earn-purple-follower-4">
        <div className="earn-purple-square">
          <img src="/logo-white-transparent.png" alt="Purple Token" className="earn-follower-logo" />
        </div>
      </div>
    </div>
  );
};

export default CoinFlowAnimation;
