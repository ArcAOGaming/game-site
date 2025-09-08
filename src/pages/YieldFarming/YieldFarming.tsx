import { useEffect, useRef } from 'react';
import './YieldFarming.css';
import { TradingBackground, HeroContent } from './components';

function YieldFarming() {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Make the hero section visible immediately
        if (heroRef.current) {
            heroRef.current.classList.add('animate-in');
        }
    }, []);

    return (
        <div className="yield-farming-page">
            {/* Hero Section */}
            <section ref={heroRef} className="hero-section">
                {/* Trading Background Component */}
                <TradingBackground />

                {/* Hero Content Component */}
                <HeroContent />
            </section>
        </div>
    );
}

export default YieldFarming;
