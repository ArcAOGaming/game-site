import React from 'react';
import { useDelegation } from '../../../../../shared/contexts/AODelegationContext';
import { useArweaveAOWallet } from '../../../../../shared/contexts/ArweaveAOWallet';
import { useGameFLP } from '../../../../../shared/contexts/GameFLP';
import { AUTONOMOUS_FINANCE } from 'ao-js-sdk/src/processes/ids/autonomous-finance';
import { formatTokenAmount } from '../../../../../utils/formatting';
import FlipLogo from './FlipLogo';

const GameYieldConnection: React.FC = () => {
    const { delegations, loading, settingDelegation, setGameDelegation } = useDelegation();
    const { isConnected, connect, disconnect, address } = useArweaveAOWallet();
    const { recentDistribution, isLoadingDistribution } = useGameFLP();

    // Find the GAME delegation
    const gameDelegation = delegations.find(
        delegation => delegation.delegatee === AUTONOMOUS_FINANCE.FAIR_LAUNCH_PROCESSES.GAME
    );

    const gamePercentage = gameDelegation ? parseFloat(gameDelegation.percentage) : 0;
    const isMaxEfficiency = gamePercentage >= 100;

    const handleConnect = () => {
        connect();
    };

    const handleDisconnect = () => {
        disconnect();
    };

    const handleIncreaseEfficiency = async () => {
        await setGameDelegation();
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
                    <h3 className="wallet-connection-title">$GAME Yield</h3>
                    <p className="wallet-connection-network">AO Network</p>
                </div>
            </div>

            {!isConnected ? (
                <div className="game-yield-disconnected">
                    <div className="connection-status-disconnected">
                        <span>🔴</span>
                        <span>Arweave Wallet Not Connected</span>
                    </div>
                    <button
                        className="wallet-connect-button wallet-connect-button-arweave"
                        onClick={handleConnect}
                    >
                        <FlipLogo size="small" />
                        <span>Connect AO</span>
                    </button>
                </div>
            ) : (
                <div className="game-yield-connected">
                    <div className="connection-status-connected">
                        <span>🟢</span>
                        <span>Connected</span>
                        {address && (
                            <span className="connection-address">
                                {formatAddress(address)}
                            </span>
                        )}
                    </div>

                    <div className="game-yield-efficiency">
                        <div className="efficiency-displays-container">
                            <div className="efficiency-display">
                                <div className="efficiency-percentage">
                                    {isLoadingDistribution ? (
                                        <span className="efficiency-loading">--</span>
                                    ) : (
                                        <span className="efficiency-value">{formatTokenAmount(recentDistribution)}</span>
                                    )}
                                </div>
                                <div className="efficiency-label">Last Distribution</div>
                            </div>

                            <div className="efficiency-display">
                                <div className="efficiency-percentage">
                                    {loading ? (
                                        <span className="efficiency-loading">--</span>
                                    ) : (
                                        <span className="efficiency-value">{gamePercentage.toFixed(0)}%</span>
                                    )}
                                </div>
                                <div className="efficiency-label">$GAME Minting Efficiency</div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="efficiency-loading-message">
                                Loading delegation data...
                            </div>
                        ) : isMaxEfficiency ? (
                            <div className="efficiency-congratulations">
                                <span className="congratulations-icon">🎉</span>
                                <div className="congratulations-text">
                                    <h4>Maximum Efficiency Achieved!</h4>
                                    <p>You're earning the maximum $GAME yield possible.</p>
                                </div>
                            </div>
                        ) : (
                            <button
                                className="efficiency-button"
                                onClick={handleIncreaseEfficiency}
                                disabled={settingDelegation}
                            >
                                {settingDelegation ? (
                                    <span>Setting Delegation...</span>
                                ) : (
                                    <span>Increase to 100%</span>
                                )}
                            </button>
                        )}
                    </div>

                    <button
                        className="wallet-disconnect-button"
                        onClick={handleDisconnect}
                    >
                        Disconnect Wallet
                    </button>
                </div>
            )}
        </div>
    );
};

export default GameYieldConnection;
