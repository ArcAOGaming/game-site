import { forwardRef } from 'react';
import { PARTNERS } from '../../../../shared/constants';
import './PartnersSection.css';

interface PartnersSectionProps {
    className?: string;
}

const PartnersSection = forwardRef<HTMLElement, PartnersSectionProps>(
    ({ className = '' }, ref) => {
        return (
            <section
                ref={ref}
                id="partners"
                className={`partners-section ${className}`}
            >
                {/* Animated background layers */}
                <div className="partners-bg-layer-1"></div>
                <div className="partners-bg-layer-2"></div>
                <div className="partners-bg-layer-3"></div>

                {/* Grid overlay */}
                <div className="partners-grid-overlay"></div>

                {/* Partnership Elements */}
                <div className="partnership-element network-1">🌐</div>
                <div className="partnership-element network-2">🔗</div>
                <div className="partnership-element handshake-1">🤝</div>
                <div className="partnership-element handshake-2">🌟</div>

                {/* Floating particles */}
                <div className="partners-particles">
                    <div className="partners-particle-1"></div>
                    <div className="partners-particle-2"></div>
                    <div className="partners-particle-3"></div>
                    <div className="partners-particle-4"></div>
                    <div className="partners-particle-5"></div>

                    {/* Geometric shapes */}
                    <div className="partners-shape-1"></div>
                    <div className="partners-shape-2"></div>
                    <div className="partners-shape-3"></div>
                    <div className="partners-shape-4"></div>
                </div>

                <div className="partners-container">
                    <div className="partners-content">
                        <h2 className="partners-title">Our Partners</h2>

                        <div className="partners-grid">
                            {PARTNERS.map((partner) => (
                                <div
                                    key={partner.id}
                                    className="partner-item"
                                    onClick={() => window.open(partner.website, '_blank', 'noopener,noreferrer')}
                                    title={`Visit ${partner.name}`}
                                >
                                    <img
                                        src={partner.logo}
                                        alt={`${partner.name} logo`}
                                        className="partner-logo"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="partners-stats">
                            <div className="stat-item">
                                <div className="stat-number teal">{PARTNERS.length}+</div>
                                <div className="stat-label">Strategic Partners</div>
                            </div>

                            <div className="stat-item">
                                <div className="stat-number cyan">100%</div>
                                <div className="stat-label">Web3 Native</div>
                            </div>

                            <div className="stat-item">
                                <div className="stat-number emerald">∞</div>
                                <div className="stat-label">Growth Potential</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
);

PartnersSection.displayName = 'PartnersSection';

export default PartnersSection;