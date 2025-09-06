import './HeroContent.css';

function HeroContent() {
    return (
        <div className="hero-content">
            <h1 className="hero-title">$GAME Catalyst</h1>
            <h2 className="hero-subtitle">Amplify Your Yield Through Smart Farming</h2>
            <p className="hero-description">
                Maximize your returns with our advanced yield farming protocols.
                Watch your assets work harder while you earn passive income through automated trading strategies.
            </p>

            <div className="hero-buttons">
                <button className="btn-primary">
                    <div className="btn-content">
                        <span className="btn-icon">🚀</span>
                        <span className="btn-text">Start Farming</span>
                    </div>
                </button>
                <button className="btn-secondary">
                    <div className="btn-content">
                        <span className="btn-icon">📈</span>
                        <span className="btn-text">View Yields</span>
                    </div>
                </button>
            </div>

            <div className="hero-stats">
                <div className="stat-item">
                    <div className="stat-number ownership">$2.4M</div>
                    <div className="stat-label">Total Locked</div>
                </div>
                <div className="stat-item">
                    <div className="stat-number earning">15.2%</div>
                    <div className="stat-label">Avg APY</div>
                </div>
                <div className="stat-item">
                    <div className="stat-number ownership">1,247</div>
                    <div className="stat-label">Active Farmers</div>
                </div>
            </div>
        </div>
    );
}

export default HeroContent;
