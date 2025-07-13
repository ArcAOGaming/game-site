import React, { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { useAOSDAIStaking, useArweaveAOWallet } from '../../../../shared/contexts';
import { daiStaking, DAI_TOKEN_ADDRESS } from '../../../../utils/AO/DAIStaking';
import { ERC20_ABI } from '../../../../utils/AO/shared/erc20Abi';
import './StakingActions.css';

export const DAIStakingActions: React.FC = () => {
    const { address, isConnected } = useAccount();
    const { address: arweaveAddress } = useArweaveAOWallet();
    const { stakingBalance, refetch } = useAOSDAIStaking();

    const [stakeAmount, setStakeAmount] = useState('');
    const [unstakeAmount, setUnstakeAmount] = useState('');
    const [isStaking, setIsStaking] = useState(false);
    const [isUnstaking, setIsUnstaking] = useState(false);

    // Read DAI balance
    const { data: daiBalance } = useReadContract({
        address: DAI_TOKEN_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address && isConnected,
        },
    });

    // Read DAI allowance
    const { data: daiAllowance, refetch: refetchAllowance } = useReadContract({
        address: DAI_TOKEN_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: address ? [address, daiStaking.getStakingContractAddress()] : undefined,
        query: {
            enabled: !!address && isConnected,
        },
    });

    // Contract write hooks
    const { writeContract: writeApprove, data: approveHash } = useWriteContract();
    const { writeContract: writeStake, data: stakeHash } = useWriteContract();
    const { writeContract: writeUnstake, data: unstakeHash } = useWriteContract();

    // Transaction receipt hooks
    const { isLoading: isApproveLoading, isSuccess: isApproveSuccess } = useWaitForTransactionReceipt({
        hash: approveHash,
    });

    const { isLoading: isStakeLoading, isSuccess: isStakeSuccess } = useWaitForTransactionReceipt({
        hash: stakeHash,
    });

    const { isLoading: isUnstakeLoading, isSuccess: isUnstakeSuccess } = useWaitForTransactionReceipt({
        hash: unstakeHash,
    });

    // Handle successful transactions
    useEffect(() => {
        if (isApproveSuccess) {
            refetchAllowance();
        }
    }, [isApproveSuccess, refetchAllowance]);

    useEffect(() => {
        if (isStakeSuccess) {
            setStakeAmount('');
            setIsStaking(false);
            refetch();
        }
    }, [isStakeSuccess, refetch]);

    useEffect(() => {
        if (isUnstakeSuccess) {
            setUnstakeAmount('');
            setIsUnstaking(false);
            refetch();
        }
    }, [isUnstakeSuccess, refetch]);

    const handleApprove = async () => {
        if (!stakeAmount || !address) return;

        try {
            const amount = parseEther(stakeAmount);
            writeApprove({
                address: DAI_TOKEN_ADDRESS,
                abi: ERC20_ABI,
                functionName: 'approve',
                args: [daiStaking.getStakingContractAddress(), amount],
            } as any);
        } catch (error) {
            console.error('Approve error:', error);
        }
    };

    const handleStake = async () => {
        if (!stakeAmount || !address || !arweaveAddress) return;

        try {
            setIsStaking(true);
            const stakeConfig = daiStaking.createStakeConfig(0, stakeAmount, arweaveAddress);
            writeStake(stakeConfig as any);
        } catch (error) {
            console.error('Stake error:', error);
            setIsStaking(false);
        }
    };

    const handleUnstake = async () => {
        if (!unstakeAmount || !address || !arweaveAddress) return;

        try {
            setIsUnstaking(true);
            const unstakeConfig = daiStaking.createWithdrawConfig(0, unstakeAmount, arweaveAddress);
            writeUnstake(unstakeConfig as any);
        } catch (error) {
            console.error('Unstake error:', error);
            // Show user-friendly error message
            if (error instanceof Error) {
                alert(`Unstake failed: ${error.message}`);
            } else {
                alert('Unstake failed. Please check your wallet and try again.');
            }
            setIsUnstaking(false);
        }
    };

    if (!isConnected) {
        return (
            <div className="staking-actions-card">
                <div className="staking-actions-header">
                    <img src="/dai-logo.png" alt="DAI" className="staking-actions-icon" />
                    <div className="staking-actions-title">DAI Staking Actions</div>
                </div>
                <div className="staking-actions-content">
                    <div className="staking-actions-status">Connect wallet to stake DAI</div>
                </div>
            </div>
        );
    }

    if (!arweaveAddress) {
        return (
            <div className="staking-actions-card">
                <div className="staking-actions-header">
                    <img src="/dai-logo.png" alt="DAI" className="staking-actions-icon" />
                    <div className="staking-actions-title">DAI Staking Actions</div>
                </div>
                <div className="staking-actions-content">
                    <div className="staking-actions-status">Connect Arweave wallet to stake DAI</div>
                </div>
            </div>
        );
    }

    const needsApproval = stakeAmount && daiAllowance !== undefined &&
        parseEther(stakeAmount) > (daiAllowance as bigint);

    const maxStakeAmount = daiBalance ? formatEther(daiBalance as bigint) : '0';
    const maxUnstakeAmount = stakingBalance.stakedAmount ?
        daiStaking.formatAmount(stakingBalance.stakedAmount) : '0';

    return (
        <div className="staking-actions-card">
            <div className="staking-actions-header">
                <img src="/dai-logo.png" alt="DAI" className="staking-actions-icon" />
                <div className="staking-actions-title">DAI Staking Actions</div>
            </div>
            <div className="staking-actions-content">
                {/* Stake Section */}
                <div className="staking-action-section">
                    <h4 className="staking-action-title">Stake DAI</h4>
                    <div className="staking-input-group">
                        <input
                            type="number"
                            placeholder="Amount to stake"
                            value={stakeAmount}
                            onChange={(e) => setStakeAmount(e.target.value)}
                            className="staking-input"
                            disabled={isStaking || isStakeLoading || isApproveLoading}
                        />
                        <button
                            onClick={() => setStakeAmount(maxStakeAmount)}
                            className="staking-max-btn"
                            disabled={isStaking || isStakeLoading || isApproveLoading}
                        >
                            MAX
                        </button>
                    </div>
                    <div className="staking-balance-info">
                        Available: {maxStakeAmount} DAI
                    </div>

                    {needsApproval ? (
                        <button
                            onClick={handleApprove}
                            disabled={!stakeAmount || isApproveLoading || isStaking}
                            className="staking-action-btn approve-btn"
                        >
                            {isApproveLoading ? 'Approving...' : 'Approve DAI'}
                        </button>
                    ) : (
                        <button
                            onClick={handleStake}
                            disabled={!stakeAmount || isStaking || isStakeLoading || needsApproval}
                            className="staking-action-btn stake-btn"
                        >
                            {isStaking || isStakeLoading ? 'Staking...' : 'Stake DAI'}
                        </button>
                    )}
                </div>

                {/* Unstake Section */}
                <div className="staking-action-section">
                    <h4 className="staking-action-title">Unstake DAI</h4>
                    <div className="staking-input-group">
                        <input
                            type="number"
                            placeholder="Amount to unstake"
                            value={unstakeAmount}
                            onChange={(e) => setUnstakeAmount(e.target.value)}
                            className="staking-input"
                            disabled={isUnstaking || isUnstakeLoading}
                        />
                        <button
                            onClick={() => setUnstakeAmount(maxUnstakeAmount)}
                            className="staking-max-btn"
                            disabled={isUnstaking || isUnstakeLoading}
                        >
                            MAX
                        </button>
                    </div>
                    <div className="staking-balance-info">
                        Staked: {maxUnstakeAmount} DAI
                    </div>

                    <button
                        onClick={handleUnstake}
                        disabled={!unstakeAmount || isUnstaking || isUnstakeLoading}
                        className="staking-action-btn unstake-btn"
                    >
                        {isUnstaking || isUnstakeLoading ? 'Unstaking...' : 'Unstake DAI'}
                    </button>
                </div>
            </div>
        </div>
    );
};
