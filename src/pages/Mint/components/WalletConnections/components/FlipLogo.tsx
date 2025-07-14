import React, { useState, useEffect } from 'react';

interface FlipLogoProps {
    size?: 'small' | 'large';
    className?: string;
}

const FlipLogo: React.FC<FlipLogoProps> = ({ size = 'small', className = '' }) => {
    const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

    // Wallet logos that rotate every 5 seconds with flip animation
    const walletLogos = [
        '/beacon-wallet-transparent.png',
        '/wander-logo-transparent.png'
    ];

    // Rotate wallet logos every 5 seconds with flip animation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % walletLogos.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [walletLogos.length]);

    const containerClass = size === 'large' ? 'wallet-logo-container' : 'wallet-logo-container-small';
    const logoClass = size === 'large' ? 'wallet-logo' : 'wallet-logo-small';

    return (
        <div className={`${containerClass} ${className}`}>
            {walletLogos.map((logo, index) => (
                <img
                    key={logo}
                    src={logo}
                    alt="Wallet Logo"
                    className={`${logoClass} ${index === currentLogoIndex ? 'active' : ''}`}
                />
            ))}
        </div>
    );
};

export default FlipLogo;
