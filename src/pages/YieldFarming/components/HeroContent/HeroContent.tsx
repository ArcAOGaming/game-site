/* eslint-disable @typescript-eslint/no-unused-vars */
import './HeroContent.css';
import React from 'react';
import { GameLiquidityProvider } from '../../../../shared/contexts/GameLiquidityContext';
import { TotalLockedStat, AvgAPYStat, ActiveFarmersStat } from './components';

function HeroContent() {
    return (
        <GameLiquidityProvider>
            <div className="hero-content">
                <h1 className="hero-title">$GAME Catalyst</h1>
                <h2 className="hero-subtitle">Amplify your yield through AI Smart Farming</h2>
                <p className="hero-description">
                    The $GAME Catalyst allows you to earn passive income by deploying AI-powered strategies and game theory—automatically.
                    Your capital works around the clock in decentralized yield protocols, built on AO and permanently logged on Arweave.
                    <br /><br />
                    The earlier you join, the stronger your position.
                    Activate the Catalyst. Let your assets compound with purpose.
                </p>

                <div className="hero-buttons">
                    <button className="btn-primary">
                        <div className="btn-content">
                            <span className="btn-icon">🚀</span>
                            <span className="btn-text">Start</span>
                        </div>
                    </button>
                </div>

                <div className="hero-stats">
                    <TotalLockedStat />
                    <ActiveFarmersStat />
                </div>
            </div>
        </GameLiquidityProvider>
    );
}

export default HeroContent;
