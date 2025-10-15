import React, { useState, useEffect } from 'react';
import { useArweaveAOWallet } from '../../../../../shared/contexts/ArweaveAOWallet';
import { CONTRACT_ADDRESSES } from '../../../../../shared/constants';
import FlipLogo from './FlipLogo';

const HyperbeamTokenBalance: React.FC = () => {
    const { isConnected, address, connect, disconnect } = useArweaveAOWallet();
    const [balance, setBalance] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isConnected && address) {
            fetchBalance();
        } else {
            setBalance(null);
            setError(null);
        }
    }, [isConnected, address]);

    const fetchBalance = async () => {
        if (!address) return;

        setIsLoading(true);
        setError(null);

        try {
            const url = `https://state-2.forward.computer/${CONTRACT_ADDRESSES.GAME_TOKEN}~process@1.0/compute/balances/${address}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.text();

            // Remove 12 decimals from the string
            // Assuming the response is a string number like "1000000000000000"
            // We want to remove the last 18 digits and format it properly
            if (data && data.trim()) {
                const balanceStr = data.trim();
                // Convert to number, divide by 10^18, then format
                const balanceNum = BigInt(balanceStr);
                const divisor = BigInt(10 ** 18);
                const wholePart = balanceNum / divisor;
                const fractionalPart = balanceNum % divisor;

                // Format with up to 4 decimal places
                const formattedBalance = `${wholePart}.${fractionalPart.toString().padStart(12, '0').slice(0, 4)}`;
                setBalance(formattedBalance);
            } else {
                setBalance('0.0000');
            }
        } catch (err) {
            console.error('Error fetching Hyperbeam balance:', err);
            setError('Failed to load balance');
            setBalance(null);
        } finally {
            setIsLoading(false);
        }
    };

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
                    <img src="/game-token.png" alt="GAME Token" />
                </div>
                <div>
                    <h3 className="wallet-connection-title">Hyperbeam Token Balance</h3>
                    <p className="wallet-connection-network">AO Network</p>
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
                    <span className="balance-label">GAME Balance</span>
                    <span className="balance-value">
                        {!isConnected ? (
                            <span className="balance-placeholder">--</span>
                        ) : isLoading ? (
                            <span className="balance-loading">Loading...</span>
                        ) : error ? (
                            <span className="balance-placeholder">N/A</span>
                        ) : (
                            `${balance || '0.0000'} GAME`
                        )}
                    </span>
                </div>
            </div>

            {!isConnected ? (
                <button
                    className="wallet-connect-button wallet-connect-button-arweave"
                    onClick={handleConnect}
                >
                    <FlipLogo size="medium" />
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

export default HyperbeamTokenBalance;
