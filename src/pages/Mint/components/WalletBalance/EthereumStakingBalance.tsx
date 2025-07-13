import React, { useEffect } from 'react';
import { useAOSTETHStaking } from '../../../../shared/contexts';
import { ethStaking } from '../../../../utils/AO';
import './WalletBalance.css';

export const EthereumStakingBalance: React.FC = () => {
    const {
        isConnected,
        address,
        stakingBalance,
        debugInfo,
        refetch
    } = useAOSTETHStaking();

    // Debug logging for component
    useEffect(() => {
        console.log('🎯 EthereumStakingBalance Component Debug:', {
            isConnected,
            address,
            stakingBalance,
            debugInfo,
            timestamp: new Date().toISOString()
        });
    }, [isConnected, address, stakingBalance, debugInfo]);

    if (!isConnected) {
        return (
            <div className="wallet-balance-card">
                <div className="wallet-balance-header">
                    <img src="/ethereum-logo.png" alt="Ethereum" className="wallet-balance-icon" />
                    <div className="wallet-balance-title">ETH Staking</div>
                </div>
                <div className="wallet-balance-content">
                    <div className="wallet-balance-status">Connect wallet to view staking</div>
                </div>
            </div>
        );
    }

    const handleRefresh = () => {
        console.log('🔄 Manual refresh triggered from component');
        refetch();
    };

    return (
        <div className="wallet-balance-card">
            <div className="wallet-balance-header">
                <img src="/ethereum-logo.png" alt="Ethereum" className="wallet-balance-icon" />
                <div className="wallet-balance-title">ETH Staking</div>
                <button
                    onClick={handleRefresh}
                    style={{
                        marginLeft: 'auto',
                        padding: '4px 8px',
                        fontSize: '12px',
                        background: 'transparent',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    🔄
                </button>
            </div>
            <div className="wallet-balance-content">
                {stakingBalance.isLoading ? (
                    <div className="wallet-balance-loading">Loading staking data...</div>
                ) : stakingBalance.error ? (
                    <div className="wallet-balance-error">
                        {stakingBalance.error.message === 'Staking contract not available on this network' ? (
                            <>
                                <div>⚠️ Staking Not Available</div>
                                <small>The staking contract is not deployed on this network</small>
                            </>
                        ) : (
                            <>
                                Error: {stakingBalance.error.message}
                                <br />
                                <small>Contract: {debugInfo.contractAddress}</small>
                            </>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="wallet-balance-item">
                            <div className="wallet-balance-label">Your Staked ETH</div>
                            <div className="wallet-balance-value">
                                {stakingBalance.stakedAmount ? ethStaking.formatAmount(stakingBalance.stakedAmount) : '0.00'} ETH
                            </div>
                        </div>
                        <div className="wallet-balance-item">
                            <div className="wallet-balance-label">Earned Rewards</div>
                            <div className="wallet-balance-value">
                                {stakingBalance.earnedRewards ? ethStaking.formatAmount(stakingBalance.earnedRewards) : '0.00'} ETH
                            </div>
                        </div>
                        <div className="wallet-balance-item">
                            <div className="wallet-balance-label">Total Staked</div>
                            <div className="wallet-balance-value">
                                {stakingBalance.totalStaked ? ethStaking.formatAmount(stakingBalance.totalStaked) : '0.00'} ETH
                            </div>
                        </div>
                        <div className="wallet-balance-item">
                            <div className="wallet-balance-label">Debug Info</div>
                            <div className="wallet-balance-value" style={{ fontSize: '10px', opacity: 0.7 }}>
                                Last fetch: {debugInfo.lastFetchTime?.toLocaleTimeString() || 'Never'}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
