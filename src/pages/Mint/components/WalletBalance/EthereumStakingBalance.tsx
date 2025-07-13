import React from 'react';
import { useAOSTETHStaking } from '../../../../shared/contexts';
import { ethStaking } from '../../../../utils/AO';
import './WalletBalance.css';

export const EthereumStakingBalance: React.FC = () => {
    const {
        isConnected,
        stakingBalance,
        refetch
    } = useAOSTETHStaking();

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
                    </>
                )}
            </div>
        </div>
    );
};
