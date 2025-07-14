import React from 'react';
import { ArweaveConnection, STETHConnection, DAIConnection, GameYieldConnection } from './components';
import './WalletConnections.css';

const WalletConnections: React.FC = () => {
    return (
        <div className="wallet-connections-interface">
            <div className="wallet-connections-card">
                <h2 className="wallet-connections-title">Fair Launch Deposits</h2>
                <p className="wallet-connections-description">
                    Connect your wallets to view balances and manage your deposits across different networks for the fair launch.
                </p>

                <div className="wallet-connections-grid">
                    <ArweaveConnection />
                    <STETHConnection />
                    <DAIConnection />
                </div>

                <div className="game-yield-section">
                    <GameYieldConnection />
                </div>
            </div>
        </div>
    );
};

export default WalletConnections;
