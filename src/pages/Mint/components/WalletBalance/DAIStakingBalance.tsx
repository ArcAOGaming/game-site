import React from 'react';
import { useAOSDAIStaking } from '../../../../shared/contexts';
import { daiStaking } from '../../../../utils/AO';
import './WalletBalance.css';

export const DAIStakingBalance: React.FC = () => {
    const {
        isConnected,
        stakingBalance,
        refetch
    } = useAOSDAIStaking();

    if (!isConnected) {
        return (
            <div className="wallet-balance-card">
                <div className="wallet-balance-header">
                    <img src="/dai-logo.png" alt="DAI" className="wallet-balance-icon" />
                    <div className="wallet-balance-title">DAI Staking</div>
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
                <img src="/dai-logo.png" alt="DAI" className="wallet-balance-icon" />
                <div className="wallet-balance-title">DAI Staking</div>
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
                        {stakingBalance.error.message === 'DAI staking contract not available on this network' ? (
                            <>
                                <div>⚠️ DAI Staking Not Available</div>
                                <small>The DAI staking contract is not deployed on this network</small>
                            </>
                        ) : stakingBalance.error.message?.includes('out of bounds') || stakingBalance.error.message?.includes('Position') ? (
                            <>
                                <div>⚠️ DAI Contract Incompatible</div>
                                <small>The DAI staking contract has a different structure than expected</small>
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
                            <div className="wallet-balance-label">Your Staked DAI</div>
                            <div className="wallet-balance-value">
                                {stakingBalance.stakedAmount ? daiStaking.formatAmount(stakingBalance.stakedAmount) : '0.00'} DAI
                            </div>
                        </div>
                        <div className="wallet-balance-item">
                            <div className="wallet-balance-label">Earned Rewards</div>
                            <div className="wallet-balance-value">
                                {stakingBalance.earnedRewards ? daiStaking.formatAmount(stakingBalance.earnedRewards) : '0.00'} DAI
                            </div>
                        </div>
                        <div className="wallet-balance-item">
                            <div className="wallet-balance-label">Total Staked</div>
                            <div className="wallet-balance-value">
                                {stakingBalance.totalStaked ? daiStaking.formatAmount(stakingBalance.totalStaked) : '0.00'} DAI
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
