import { useEffect, useState } from 'react';
import AiFlowAnimation from './components/AiFlowAnimation';
import './Ai.css';

const Ai = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`ai-page ${isVisible ? 'animate-in' : ''}`}>
            {/* Animated background layers */}
            <div className="ai-bg-layer-1"></div>
            <div className="ai-bg-layer-2"></div>
            <div className="ai-bg-layer-3"></div>

            {/* Grid overlay */}
            <div className="ai-grid-overlay"></div>

            {/* AI Elements */}
            <div className="ai-element ai-brain-1">🧠</div>
            <div className="ai-element ai-chart-1">📈</div>
            <div className="ai-element ai-robot-1">🤖</div>
            <div className="ai-element ai-data-1">📊</div>

            {/* Floating particles */}
            <div className="ai-particles">
                <div className="ai-particle-1"></div>
                <div className="ai-particle-2"></div>
                <div className="ai-particle-3"></div>
                <div className="ai-particle-4"></div>
                <div className="ai-particle-5"></div>
                <div className="ai-particle-6"></div>

                {/* Geometric shapes */}
                <div className="ai-shape-1"></div>
                <div className="ai-shape-2"></div>
                <div className="ai-shape-3"></div>
                <div className="ai-shape-4"></div>
            </div>

            <div className="ai-content">
                <h1 className="ai-title">$GAME AI</h1>

                {/* AI Flow Animation */}
                <AiFlowAnimation />

                <p className="ai-subtitle">The Intelligent Engine Behind a Stronger $GAME Token</p>
                <p className="ai-description">
                    In the $GAME ecosystem, every in-game action fuels a bigger economic movement. At the core lies $GAME AI—a comprehensive AI agent suite built on AO Agents, designed to algorithmically create upward price pressure for the $GAME token.
                </p>

                {/* Core Mission */}
                <div className="ai-mission">
                    <h2 className="ai-mission-title">Their Mission? Simple but Powerful:</h2>
                    <div className="ai-mission-grid">
                        <div className="mission-item">
                            <div className="mission-icon">📈</div>
                            <h3 className="mission-title">Push Prices Higher</h3>
                            <p className="mission-description">
                                Intelligent automated buyback strategies that create consistent upward pressure on $GAME token price.
                            </p>
                        </div>
                        <div className="mission-item">
                            <div className="mission-icon">💧</div>
                            <h3 className="mission-title">Deepen Liquidity Pools</h3>
                            <p className="mission-description">
                                Advanced liquidity management algorithms that ensure tight spreads and optimal trading conditions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Revenue Integration */}
                <div className="revenue-integration">
                    <h2 className="section-title">Powered by the Gaming Ecosystem</h2>
                    <p className="section-description">
                        Each game—from immersive adventures like RuneRealm to dynamic battlers like Arc—channels its revenue directly into the hands of $GAME Agents.
                    </p>

                    <div className="revenue-sources">
                        <div className="revenue-source">
                            <div className="source-icon">🎮</div>
                            <h4>Microtransactions</h4>
                            <p>In-game purchases across all ecosystem games</p>
                        </div>
                        <div className="revenue-source">
                            <div className="source-icon">🔄</div>
                            <h4>Trading Fees</h4>
                            <p>Open-market trading fees from asset exchanges</p>
                        </div>
                        <div className="revenue-source">
                            <div className="source-icon">🔑</div>
                            <h4>Key Sales</h4>
                            <p>Game access keys and premium content</p>
                        </div>
                        <div className="revenue-source">
                            <div className="source-icon">🌾</div>
                            <h4>Yield Farming</h4>
                            <p>DeFi yield generation from staked assets</p>
                        </div>
                    </div>
                </div>

                {/* AI Magic Section */}
                <div className="ai-magic">
                    <h2 className="section-title">The AI Magic</h2>
                    <div className="magic-content">
                        <div className="magic-text">
                            <p>
                                $GAME AI intelligently executes automated buybacks and liquidity management strategies, ensuring that all revenue from the ecosystem is reinvested into the token's health. This means consistent demand, tighter spreads, and an ecosystem where play and value rise together.
                            </p>
                            <div className="magic-highlight">
                                <strong>The more you play, the more intelligent $GAME becomes—and the stronger the token economy gets.</strong>
                            </div>
                        </div>
                        <div className="magic-visual">
                            <div className="price-chart">
                                <div className="chart-line"></div>
                                <div className="chart-points">
                                    <div className="chart-point point-1"></div>
                                    <div className="chart-point point-2"></div>
                                    <div className="chart-point point-3"></div>
                                    <div className="chart-point point-4"></div>
                                    <div className="chart-point point-5"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="ai-features">
                    <h2 className="section-title">AI-Powered Features</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <h3 className="feature-title">Smart Buybacks</h3>
                            <p className="feature-description">
                                AI analyzes market conditions and executes strategic buybacks at optimal times to maximize price impact.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3 className="feature-title">Real-time Analysis</h3>
                            <p className="feature-description">
                                Continuous monitoring of market data, trading volumes, and ecosystem metrics for instant decision making.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔄</div>
                            <h3 className="feature-title">Revenue Optimization</h3>
                            <p className="feature-description">
                                Automatically reinvests ecosystem revenue into token health through sophisticated allocation algorithms.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3 className="feature-title">Liquidity Management</h3>
                            <p className="feature-description">
                                Maintains optimal liquidity across all trading pairs to ensure smooth transactions and minimal slippage.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="ai-cta">
                    <h2 className="cta-title">Join the AI-Powered Economy</h2>
                    <p className="cta-description">
                        Every game you play, every transaction you make, feeds into the intelligent system that strengthens the entire $GAME ecosystem.
                    </p>
                    <div className="cta-buttons">
                        <button className="cta-button primary" onClick={() => window.open('https://runerealm.com', '_blank')}>
                            Start Playing
                        </button>
                        <button className="cta-button secondary" onClick={() => {
                            const mintSection = document.getElementById('mint');
                            if (mintSection) {
                                mintSection.scrollIntoView({ behavior: 'smooth' });
                            } else {
                                window.location.href = '/mint';
                            }
                        }}>
                            Get $GAME Tokens
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ai;
