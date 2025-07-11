import { useEffect, useState } from 'react';
import { EarnCoinFlowAnimation } from '../../shared/components/CoinFlowAnimations/Earn';
import './Earn.css';

const Earn = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Load the form embed script
    const script = document.createElement('script');
    script.src = 'https://link.we-grow.agency/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup script on unmount
    return () => {
      const existingScript = document.querySelector('script[src="https://link.we-grow.agency/js/form_embed.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const scrollToApplication = () => {
    const applicationSection = document.querySelector('.ambassador-application');
    if (applicationSection) {
      applicationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStreamClick = () => {
    scrollToApplication();
  };

  const handleAffiliateClick = () => {
    scrollToApplication();
  };

  const handleAmbassadorClick = () => {
    scrollToApplication();
  };

  return (
    <div className={`earn-page ${isVisible ? 'animate-in' : ''}`}>
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
        <h1 className="earn-title">$GAME*</h1>
        <EarnCoinFlowAnimation />
        <p className="earn-description">
          Multiple ways to earn rewards and build your gaming empire. Play, stream, refer, and lead 
          your way to success in the ARCAO ecosystem.
        </p>

        <div className="earn-rewards">
          
          <div className="earn-reward-card earn-reward-card-clickable" onClick={handleStreamClick}>
            <span className="earn-reward-icon">📺</span>
            <h3 className="earn-reward-title">Stream & Create</h3>
            <div className="earn-reward-amount">Get Paid</div>
            <p className="earn-reward-description">
              Get paid to stream ARCAO games and create content. Join our creator program and earn 
              revenue sharing, sponsorship opportunities, and exclusive creator rewards.
            </p>
          </div>
          
          <div className="earn-reward-card earn-reward-card-clickable" onClick={handleAffiliateClick}>
            <span className="earn-reward-icon">💼</span>
            <h3 className="earn-reward-title">Affiliate Sales</h3>
            <div className="earn-reward-amount">Commission</div>
            <p className="earn-reward-description">
              Earn commission on game sales through your unique affiliate codes. Share ARCAO games 
              with your network and earn a percentage of every sale you generate.
            </p>
          </div>
          
          <div className="earn-reward-card earn-reward-card-clickable ambassador-card" onClick={handleAmbassadorClick}>
            <span className="earn-reward-icon">👑</span>
            <h3 className="earn-reward-title">ARCAO Ambassador</h3>
            <div className="earn-reward-amount">Leadership</div>
            <p className="earn-reward-description">
              Apply to become an official ARCAO Ambassador. Lead the community, represent the brand, 
              and unlock exclusive benefits, early access, and leadership opportunities.
            </p>
            <div className="ambassador-hover-text">Apply Now</div>
          </div>
        </div>

        {/* Ambassador Application Section */}
        <div className="ambassador-application">
          <h2 className="ambassador-section-title">Apply to Become an ARCAO Ambassador</h2>
          <p className="ambassador-section-description">
            Ready to lead the ARCAO community? Fill out the application below to join our elite Ambassador program.
          </p>
          <div className="ambassador-form-container">
            <iframe
              src="https://link.we-grow.agency/widget/form/fcls5dL0IztmJ7W8qleP?transparent=true&bg=transparent"
              style={{
                all: 'initial',
                width: '100%',
                height: '1071px',
                border: 'none',
                borderRadius: '8px',
                display: 'block',
                background: 'transparent',
                color: 'inherit',
                font: 'inherit'
              }}
              id="inline-fcls5dL0IztmJ7W8qleP"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="$GAME Ambassador Application"
              data-height="1071"
              data-layout-iframe-id="inline-fcls5dL0IztmJ7W8qleP"
              data-form-id="fcls5dL0IztmJ7W8qleP"
              title="$GAME Ambassador Application"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earn;
