import { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTelegram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { ARCAO } from '@arcaogaming/project-links';
import './FooterSection.css';

interface FooterSectionProps {
    className?: string;
}

const FooterSection = forwardRef<HTMLElement, FooterSectionProps>(
    ({ className = '' }, ref) => {
        const socialLinks = [
            {
                name: 'Discord',
                url: ARCAO.discord,
                icon: faDiscord,
                description: 'Join our community'
            },
            {
                name: 'Telegram',
                url: ARCAO.telegram,
                icon: faTelegram,
                description: 'Connect with leadership'
            },
            {
                name: 'Twitter/X',
                url: ARCAO.twitter,
                icon: faXTwitter,
                description: 'Follow us'
            },
            {
                name: 'Media Kit',
                url: ARCAO.docs, // Using docs as media kit for now
                icon: faFile,
                description: 'Brand assets'
            }
        ];

        return (
            <footer
                ref={ref}
                id="footer"
                className={`footer-section section ${className}`}
            >
                {/* Background layers */}
                <div className="footer-bg-layer-1"></div>
                <div className="footer-bg-layer-2"></div>

                {/* Floating particles */}
                <div className="floating-particles">
                    <div className="particle particle-1"></div>
                    <div className="particle particle-2"></div>
                    <div className="particle particle-3"></div>
                </div>

                {/* Grid overlay */}
                <div className="grid-overlay"></div>

                <div className="footer-content">
                    <div className="footer-main">
                        {/* Logo and description */}
                        <div className="footer-brand">
                            <h2 className="footer-logo">$GAME</h2>
                            <p className="footer-description">
                                The future of decentralized gaming. Own, create, earn, and play in the next generation of blockchain games.
                            </p>
                        </div>

                        {/* Social links */}
                        <div className="footer-social">
                            <h3 className="footer-social-title">Connect With Us</h3>
                            <div className="social-links">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link"
                                    >
                                        <div className="social-icon">
                                            <FontAwesomeIcon icon={link.icon} />
                                        </div>
                                        <div className="social-info">
                                            <span className="social-name">{link.name}</span>
                                            <span className="social-description">{link.description}</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer bottom */}
                    <div className="footer-bottom">
                        <div className="footer-bottom-content">
                            <p className="footer-copyright">
                                © {new Date().getFullYear()} ArcAO Gaming. All rights reserved.
                            </p>
                            <div className="footer-links">
                                <a href={ARCAO.docs} target="_blank" rel="noopener noreferrer" className="footer-link">
                                    Documentation
                                </a>
                                <a href={ARCAO.github} target="_blank" rel="noopener noreferrer" className="footer-link">
                                    GitHub
                                </a>
                                <a href={ARCAO.website} target="_blank" rel="noopener noreferrer" className="footer-link">
                                    Website
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
);

FooterSection.displayName = 'FooterSection';

export default FooterSection;
