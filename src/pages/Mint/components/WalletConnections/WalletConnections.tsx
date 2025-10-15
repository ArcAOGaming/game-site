import React from 'react';
import { ArweaveConnection, STETHConnection, DAIConnection, USDSConnection, GameYieldConnection, HyperbeamTokenBalance } from './components';
import { useArweaveAOWallet } from '../../../../shared/contexts/ArweaveAOWallet';
import { useAppKitAccount } from '@reown/appkit/react';
import './WalletConnections.css';

const WalletConnections: React.FC = () => {
    const { isConnected: isArweaveConnected } = useArweaveAOWallet();
    const { isConnected: isEthConnected } = useAppKitAccount();

    return (
        <div className="wallet-connections-interface">
            <div className="wallet-connections-card">
                <h2 className="wallet-connections-title">Fair Launch Deposits</h2>
                <p className="wallet-connections-description">
                    Connect your wallets to view balances and manage your deposits across different networks for the fair launch.
                </p>

                <div className="wallet-connections-split">
                    {/* Arweave Side */}
                    <div className={`wallet-connections-side ${!isArweaveConnected ? 'minimized' : ''}`}>
                        <h3 className="wallet-connections-side-title">Arweave Network</h3>
                        <div className="wallet-connections-side-content">
                            <HyperbeamTokenBalance />
                            <ArweaveConnection />
                        </div>
                    </div>

                    {/* Ethereum Side */}
                    <div className={`wallet-connections-side ${!isEthConnected ? 'minimized' : ''}`}>
                        <h3 className="wallet-connections-side-title">Ethereum Network</h3>
                        <div className="wallet-connections-side-content">
                            <STETHConnection />
                            <DAIConnection />
                            <USDSConnection />
                        </div>
                    </div>
                </div>

                <div className="game-yield-section">
                    <GameYieldConnection />
                </div>
            </div>
        </div>
    );
};

export default WalletConnections;
