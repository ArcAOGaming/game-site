import { forwardRef } from 'react';
import './CreateSection.css';

interface CreateSectionProps {
  className?: string;
}

const CreateSection = forwardRef<HTMLElement, CreateSectionProps>(
  ({ className = '' }, ref) => {
    return (
      <section 
        ref={ref}
        id="create" 
        className={`create-section ${className}`}
      >
        {/* Animated background layers */}
        <div className="create-bg-layer-1"></div>
        <div className="create-bg-layer-2"></div>
        <div className="create-bg-layer-3"></div>
        
        {/* Grid overlay */}
        <div className="create-grid-overlay"></div>
        
        {/* Building Elements */}
        <div className="building-element building-block-1">🧱</div>
        <div className="building-element building-block-2">🏗️</div>
        <div className="building-element building-block-3">⚙️</div>
        <div className="building-element building-tool-1">🔧</div>
        <div className="building-element building-tool-2">🔨</div>

        {/* Floating particles */}
        <div className="create-particles">
          <div className="create-particle-1"></div>
          <div className="create-particle-2"></div>
          <div className="create-particle-3"></div>
          <div className="create-particle-4"></div>
          <div className="create-particle-5"></div>
          
          {/* Geometric shapes */}
          <div className="create-shape-1"></div>
          <div className="create-shape-2"></div>
          <div className="create-shape-3"></div>
          <div className="create-shape-4"></div>
        </div>
        
        <div className="create-content">
          <h2 className="create-title">CREATE</h2>
          <p className="create-description">
            Build immersive worlds, design unique characters, and craft legendary items 
            with our powerful creation tools powered by cutting-edge technology.
          </p>

          <div className="create-features">
            <div className="create-feature-card">
              <span className="create-feature-icon">🏗️</span>
              <h3 className="create-feature-title">World Builder</h3>
              <p className="create-feature-description">
                Create stunning environments with our intuitive drag-and-drop world builder. 
                Design landscapes, cities, and dungeons with unlimited creativity.
              </p>
            </div>
            
            <div className="create-feature-card">
              <span className="create-feature-icon">👾</span>
              <h3 className="create-feature-title">Character Designer</h3>
              <p className="create-feature-description">
                Design unique avatars and NPCs with advanced customization options. 
                Bring your characters to life with detailed appearance and personality traits.
              </p>
            </div>
            
            <div className="create-feature-card">
              <span className="create-feature-icon">⚔️</span>
              <h3 className="create-feature-title">Item Forge</h3>
              <p className="create-feature-description">
                Craft powerful weapons, armor, and magical items with unique properties. 
                Balance stats and create legendary equipment for epic adventures.
              </p>
            </div>
          </div>

          <div className="create-action">
            <button className="create-btn">
              <div className="create-btn-content">
                <span>⚡</span>
                <span>START CREATING</span>
              </div>
            </button>
          </div>
        </div>
      </section>
    );
  }
);

CreateSection.displayName = 'CreateSection';

export default CreateSection;
