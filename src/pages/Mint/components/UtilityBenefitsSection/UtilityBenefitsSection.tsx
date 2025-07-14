import React from 'react';
import './UtilityBenefitsSection.css';

const UtilityBenefitsSection: React.FC = () => {
    const benefits = [
        'Microtransactions Across Gaming Ecosystem',
        'Game Subscriptions',
        'Governance',
        'Game Sales',
        'Staking',
        'GameFi Accelerator',
        'Game Ambassadors'
    ];

    return (
        <div className="utility-benefits-section">
            <div className="utility-benefits-card">
                <div className="utility-benefits-header">
                    <div className="utility-benefits-icon">
                        <img src="/game-token.png" alt="GAME Token" />
                    </div>
                    <h3 className="utility-benefits-title">Utility & Benefits</h3>
                </div>

                <div className="utility-benefits-content">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="utility-benefit-item">
                            <span className="benefit-icon">✓</span>
                            <span className="benefit-text">{benefit}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UtilityBenefitsSection;
