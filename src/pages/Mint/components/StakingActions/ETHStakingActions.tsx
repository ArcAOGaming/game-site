import React, { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { useAOSTETHStaking, useArweaveAOWallet } from '../../../../shared/contexts';
import { ethStaking, STETH_TOKEN_ADDRESS } from '../../../../utils/AO/ETHStaking';
import { ERC20_ABI } from '../../../../utils/AO/shared/erc20Abi';
import './StakingActions.css';

export const ETHStakingActions: React.FC = () => {
    const { address, isConnected } = useAccount();
    const { address: arweaveAddress } = useArweaveAOWallet();
    const { stakingBalance, refetch } = useAOSTETHStaking();

    const [stakeAmount, setStakeAmount] = useState('');
    const [unstakeAmount, setUnstakeAmount] = useState('');
    const [isStaking, setIsStaking] = useState(false);
    const [isUnstaking, setIsUnstaking] = useState(false);

    // Read stETH balance
    const { data: stethBalance } = useReadContract({
        address: STETH_TOKEN_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address && isConnected,
        },
    });

    // Read stETH allowance
    const { data: stethAllowance, refetch: refetchAllowance } = useReadContract({
        address: STETH_TOKEN_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: address ? [address, ethStaking.getStakingContractAddress()] : undefined,
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
                address: STETH_TOKEN_ADDRESS,
                abi: ERC20_ABI,
                functionName: 'approve',
                args: [ethStaking.getStakingContractAddress(), amount],
            } as any);
        } catch (error) {
            console.error('Approve error:', error);
        }
    };

    const handleStake = async () => {
        if (!stakeAmount || !address || !arweaveAddress) return;

        try {
            setIsStaking(true);
            const stakeConfig = ethStaking.createStakeConfig(0, stakeAmount, arweaveAddress);
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
            const unstakeConfig = ethStaking.createWithdrawConfig(0, unstakeAmount, arweaveAddress);
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
                    <img src="/ethereum-logo.png" alt="Ethereum" className="staking-actions-icon" />
                    <div className="staking-actions-title">ETH Staking Actions</div>
                </div>
                <div className="staking-actions-content">
                    <div className="staking-actions-status">Connect wallet to stake ETH</div>
                </div>
            </div>
        );
    }

    if (!arweaveAddress) {
        return (
            <div className="staking-actions-card">
                <div className="staking-actions-header">
                    <img src="/ethereum-logo.png" alt="Ethereum" className="staking-actions-icon" />
                    <div className="staking-actions-title">ETH Staking Actions</div>
                </div>
                <div className="staking-actions-content">
                    <div className="staking-actions-status">Connect Arweave wallet to stake ETH</div>
                </div>
            </div>
        );
    }

    const needsApproval = stakeAmount && stethAllowance !== undefined &&
        parseEther(stakeAmount) > (stethAllowance as bigint);

    const maxStakeAmount = stethBalance ? formatEther(stethBalance as bigint) : '0';
    const maxUnstakeAmount = stakingBalance.stakedAmount ?
        ethStaking.formatAmount(stakingBalance.stakedAmount) : '0';

    return (
        <div className="staking-actions-card">
            <div className="staking-actions-header">
                <img src="/ethereum-logo.png" alt="Ethereum" className="staking-actions-icon" />
                <div className="staking-actions-title">ETH Staking Actions</div>
            </div>
            <div className="staking-actions-content">
                {/* Stake Section */}
                <div className="staking-action-section">
                    <h4 className="staking-action-title">Stake stETH</h4>
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
                        Available: {maxStakeAmount} stETH
                    </div>

                    {needsApproval ? (
                        <button
                            onClick={handleApprove}
                            disabled={!stakeAmount || isApproveLoading || isStaking}
                            className="staking-action-btn approve-btn"
                        >
                            {isApproveLoading ? 'Approving...' : 'Approve stETH'}
                        </button>
                    ) : (
                        <button
                            onClick={handleStake}
                            disabled={!stakeAmount || isStaking || isStakeLoading || needsApproval}
                            className="staking-action-btn stake-btn"
                        >
                            {isStaking || isStakeLoading ? 'Staking...' : 'Stake stETH'}
                        </button>
                    )}
                </div>

                {/* Unstake Section */}
                <div className="staking-action-section">
                    <h4 className="staking-action-title">Unstake stETH</h4>
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
                        Staked: {maxUnstakeAmount} stETH
                    </div>

                    <button
                        onClick={handleUnstake}
                        disabled={!unstakeAmount || isUnstaking || isUnstakeLoading}
                        className="staking-action-btn unstake-btn"
                    >
                        {isUnstaking || isUnstakeLoading ? 'Unstaking...' : 'Unstake stETH'}
                    </button>
                </div>
            </div>
        </div>
    );
};
