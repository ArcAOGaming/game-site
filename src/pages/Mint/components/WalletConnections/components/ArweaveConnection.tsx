import React from 'react';
import { useArweaveAOWallet } from '../../../../../shared/contexts/ArweaveAOWallet';

const ArweaveConnection: React.FC = () => {
    const { isConnected, arBalance, isLoadingBalance, address, connect, disconnect } = useArweaveAOWallet();

    const handleConnect = async () => {
        try {
            await connect();
        } catch (error) {
            console.error('Failed to connect Arweave wallet:', error);
        }
    };

    const handleDisconnect = () => {
        disconnect();
    };

    const formatAddress = (addr: string) => {
        return `${addr.slice(0, 3)}...${addr.slice(-3)}`;
    };

    return (
        <div className="wallet-connection-card">
            <div className="wallet-connection-header">
                <div className="wallet-connection-icon">
                    <img src="/arweave glyph (light).svg" alt="Arweave" />
                </div>
                <div>
                    <h3 className="wallet-connection-title">Arweave Holdings</h3>
                    <p className="wallet-connection-network">Arweave Network</p>
                </div>
            </div>

            <div className="wallet-connection-status">
                {isConnected ? (
                    <div className="connection-status-connected">
                        <span>🟢</span>
                        <span>Connected</span>
                        {address && (
                            <span className="connection-address">
                                {formatAddress(address)}
                            </span>
                        )}
                    </div>
                ) : (
                    <div className="connection-status-disconnected">
                        <span>🔴</span>
                        <span>Not Connected</span>
                    </div>
                )}
            </div>

            <div className="wallet-connection-balances">
                <div className="balance-item">
                    <span className="balance-label">AR Balance</span>
                    <span className="balance-value">
                        {!isConnected ? (
                            <span className="balance-placeholder">--</span>
                        ) : isLoadingBalance ? (
                            <span className="balance-loading">Loading...</span>
                        ) : (
                            `${arBalance !== null ? arBalance.toFixed(4) : '0.0000'} AR`
                        )}
                    </span>
                </div>
            </div>

            {!isConnected ? (
                <button
                    className="wallet-connect-button wallet-connect-button-arweave"
                    onClick={handleConnect}
                >
                    <img src="/ao-logo-white-transparent.png" alt="AO" style={{ width: '16px', height: '16px' }} />
                    <span>Connect AO</span>
                </button>
            ) : (
                <button
                    className="wallet-disconnect-button"
                    onClick={handleDisconnect}
                >
                    Disconnect Wallet
                </button>
            )}
        </div>
    );
};

export default ArweaveConnection;
