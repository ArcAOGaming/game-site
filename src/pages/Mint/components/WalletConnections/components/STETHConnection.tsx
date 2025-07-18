import React, { useState, useEffect } from 'react';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { useAOSTETHStaking, useArweaveAOWallet, useDelegation } from '../../../../../shared/contexts';
import { AUTONOMOUS_FINANCE } from 'ao-js-sdk/src/processes/ids/autonomous-finance';
import { ethStaking, STETH_TOKEN_ADDRESS } from '../../../../../utils/AO/ETHStaking';
import { ERC20_ABI } from '../../../../../utils/AO/shared/erc20Abi';

const STETHConnection: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stakeAmount, setStakeAmount] = useState('');
    const [unstakeAmount, setUnstakeAmount] = useState('');
    const [customArweaveAddress, setCustomArweaveAddress] = useState('');
    const [isStaking, setIsStaking] = useState(false);
    const [isUnstaking, setIsUnstaking] = useState(false);
    const [pendingStakeAfterApproval, setPendingStakeAfterApproval] = useState(false);
    const { open } = useAppKit();
    const { address, isConnected } = useAppKitAccount();
    const { address: wagmiAddress } = useAccount();
    const { address: arweaveAddress } = useArweaveAOWallet();
    const { setGameDelegation, delegations } = useDelegation();
    const { data: balance, refetch: refetchEthBalance } = useBalance({ address: wagmiAddress });
    const { data: stethBalance, refetch: refetchStethBalance } = useBalance({
        address: wagmiAddress,
        token: STETH_TOKEN_ADDRESS
    });
    const { stakingBalance, refetch } = useAOSTETHStaking();

    // Read STETH allowance
    const { data: stethAllowance, refetch: refetchAllowance } = useReadContract({
        address: STETH_TOKEN_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: wagmiAddress ? [wagmiAddress, ethStaking.getStakingContractAddress()] : undefined,
        query: {
            enabled: !!wagmiAddress && isConnected,
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
            // Automatically trigger stake after approval if pending
            if (pendingStakeAfterApproval) {
                setPendingStakeAfterApproval(false);
                handleStake();
            }
        }
    }, [isApproveSuccess, refetchAllowance, pendingStakeAfterApproval]);

    useEffect(() => {
        if (isStakeSuccess) {
            setStakeAmount('');
            setIsStaking(false);
            refetch();

            // Only set GAME delegation if not already at 100%
            const gameDelegation = delegations.find(
                delegation => delegation.delegatee === AUTONOMOUS_FINANCE.FAIR_LAUNCH_PROCESSES.GAME
            );
            const gamePercentage = gameDelegation ? parseFloat(gameDelegation.percentage) : 0;

            if (gamePercentage < 100) {
                setGameDelegation();
            }
        }
    }, [isStakeSuccess, refetch, setGameDelegation, delegations]);

    useEffect(() => {
        if (isUnstakeSuccess) {
            setUnstakeAmount('');
            setIsUnstaking(false);
            refetch();
        }
    }, [isUnstakeSuccess, refetch]);

    // Auto-refresh balances when window regains focus (after swap)
    useEffect(() => {
        const handleFocus = () => {
            if (isConnected) {
                refetchEthBalance();
                refetchStethBalance();
                refetchAllowance();
            }
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [isConnected, refetchEthBalance, refetchStethBalance, refetchAllowance]);

    const handleConnect = () => {
        open();
    };

    const handleDisconnect = () => {
        open({ view: 'Account' });
    };

    const formatAddress = (addr: string) => {
        return `${addr.slice(0, 3)}...${addr.slice(-3)}`;
    };

    const formatBalance = (balance: bigint | undefined) => {
        if (!balance) return '0.0000';
        const formatted = formatEther(balance);
        return parseFloat(formatted).toFixed(4);
    };

    const handleApprove = async () => {
        if (!stakeAmount || !wagmiAddress) return;

        try {
            setPendingStakeAfterApproval(true);
            const amount = parseEther(stakeAmount);
            writeApprove({
                address: STETH_TOKEN_ADDRESS,
                abi: ERC20_ABI,
                functionName: 'approve',
                args: [ethStaking.getStakingContractAddress(), amount],
            } as any);
        } catch (error) {
            console.error('Approve error:', error);
            setPendingStakeAfterApproval(false);
        }
    };

    const handleDepositClick = async () => {
        if (needsApproval) {
            handleApprove();
        } else {
            handleStake();
        }
    };

    const handleStake = async () => {
        const targetArweaveAddress = arweaveAddress || customArweaveAddress;
        if (!stakeAmount || !wagmiAddress || !targetArweaveAddress) return;

        try {
            setIsStaking(true);
            const stakeConfig = ethStaking.createStakeConfig(0, stakeAmount, targetArweaveAddress);
            writeStake(stakeConfig);
        } catch (error) {
            console.error('Stake error:', error);
            setIsStaking(false);
        }
    };

    const handleUnstake = async () => {
        const targetArweaveAddress = arweaveAddress || customArweaveAddress;
        if (!unstakeAmount || !wagmiAddress || !targetArweaveAddress) return;

        try {
            setIsUnstaking(true);
            const unstakeConfig = ethStaking.createWithdrawConfig(0, unstakeAmount, targetArweaveAddress);
            writeUnstake(unstakeConfig);
        } catch (error) {
            console.error('Unstake error:', error);
            if (error instanceof Error) {
                alert(`Unstake failed: ${error.message}`);
            } else {
                alert('Unstake failed. Please check your wallet and try again.');
            }
            setIsUnstaking(false);
        }
    };

    const needsApproval = stakeAmount && stethAllowance !== undefined &&
        parseEther(stakeAmount) > (stethAllowance as bigint);

    const maxStakeAmount = stethBalance?.value ? formatEther(stethBalance.value) : '0';
    const maxUnstakeAmount = stakingBalance.stakedAmount ?
        ethStaking.formatAmount(stakingBalance.stakedAmount) : '0';

    return (
        <div className={`wallet-connection-card ${isModalOpen ? 'modal-open' : ''}`}>
            <div className="wallet-connection-header">
                <div className="wallet-connection-icon">
                    <img src="/lido-stETH-logo-transparent.svg" alt="Ethereum" />
                </div>
                <div>
                    <h3 className="wallet-connection-title">stETH Deposits</h3>
                    <p className="wallet-connection-network">Ethereum Network</p>
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
                {isConnected && (
                    <button
                        className="swap-button"
                        onClick={() => {
                            const ethBalance = balance?.value || 0n;
                            const reserveAmount = BigInt('10000000000000000'); // 0.01 ETH in wei
                            const swapAmount = ethBalance > reserveAmount ? ethBalance - reserveAmount : 0n;
                            const formattedAmount = formatEther(swapAmount);

                            open({
                                view: 'Swap',
                                arguments: {
                                    fromToken: '0x0000000000000000000000000000000000000000', // ETH
                                    toToken: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84', // STETH
                                    amount: formattedAmount
                                }
                            });
                        }}
                    >
                        Swap ETH → STETH
                    </button>
                )}

                <div className="balance-item">
                    <span className="balance-label">ETH Balance</span>
                    <span className="balance-value">
                        {!isConnected ? (
                            <span className="balance-placeholder">--</span>
                        ) : (
                            `${formatBalance(balance?.value)} ETH`
                        )}
                    </span>
                </div>
                <div className="balance-item">
                    <span className="balance-label">STETH Balance</span>
                    <span className="balance-value">
                        {!isConnected ? (
                            <span className="balance-placeholder">--</span>
                        ) : (
                            `${formatBalance(stethBalance?.value)} STETH`
                        )}
                    </span>
                </div>

                {isConnected && (
                    <div className="deposit-withdraw-actions">
                        <button
                            className="deposit-withdraw-button"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Deposit / Withdraw
                        </button>
                    </div>
                )}

                <div className="balance-item">
                    <span className="balance-label">Deposited STETH</span>
                    <span className="balance-value">
                        {!isConnected ? (
                            <span className="balance-placeholder">--</span>
                        ) : stakingBalance.isLoading ? (
                            <span className="balance-loading">Loading...</span>
                        ) : stakingBalance.error ? (
                            <span className="balance-placeholder">N/A</span>
                        ) : (
                            `${stakingBalance.stakedAmount ? parseFloat(ethStaking.formatAmount(stakingBalance.stakedAmount)).toFixed(4) : '0.0000'} STETH`
                        )}
                    </span>
                </div>
            </div>

            {!isConnected ? (
                <button
                    className="wallet-connect-button wallet-connect-button-ethereum"
                    onClick={handleConnect}
                >
                    <img src="/ethereum-logo.svg" alt="Ethereum" style={{ width: '16px', height: '16px' }} />
                    <span>Connect Ethereum</span>
                </button>
            ) : (
                <button
                    className="wallet-disconnect-button"
                    onClick={handleDisconnect}
                >
                    Manage Wallet
                </button>
            )}

            {/* Deposit/Withdraw Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>STETH Deposit / Withdraw</h3>
                            <button
                                className="modal-close-button"
                                onClick={() => setIsModalOpen(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="staking-actions-content">
                                {/* AO Wallet Address Section */}
                                <div className="staking-action-section">
                                    <h4 className="staking-action-title">AO Wallet Address</h4>
                                    <div className="staking-balance-info">
                                        {arweaveAddress ? 'Connected AO Wallet (auto-filled)' : 'Enter your AO wallet address'}
                                    </div>
                                    <div className="staking-input-group">
                                        <input
                                            type="text"
                                            className="staking-input"
                                            placeholder="Enter AO wallet address..."
                                            value={arweaveAddress || customArweaveAddress}
                                            onChange={(e) => {
                                                if (!arweaveAddress) {
                                                    setCustomArweaveAddress(e.target.value);
                                                }
                                            }}
                                            disabled={!!arweaveAddress || isStaking || isUnstaking || isApproveLoading}
                                            style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
                                        />
                                        {arweaveAddress && (
                                            <div style={{
                                                fontSize: '0.8rem',
                                                color: 'rgba(34, 197, 94, 1)',
                                                marginTop: '4px'
                                            }}>
                                                ✓ Auto-filled from connected AO wallet
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {(arweaveAddress || customArweaveAddress) && (
                                    <>
                                        {/* Stake Section */}
                                        <div className="staking-action-section">
                                            <h4 className="staking-action-title">Deposit STETH</h4>
                                            <div className="staking-balance-info">
                                                Available: {maxStakeAmount} STETH
                                            </div>
                                            <div className="staking-input-group">
                                                <input
                                                    type="number"
                                                    className="staking-input"
                                                    placeholder="0.0"
                                                    value={stakeAmount}
                                                    min="0"
                                                    step="any"
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (value === '' || (parseFloat(value) >= 0 && !isNaN(parseFloat(value)))) {
                                                            setStakeAmount(value);
                                                        }
                                                    }}
                                                    disabled={isStaking || isApproveLoading}
                                                />
                                                <button
                                                    className="staking-max-btn"
                                                    onClick={() => setStakeAmount(maxStakeAmount)}
                                                    disabled={isStaking || isApproveLoading}
                                                >
                                                    MAX
                                                </button>
                                            </div>
                                            <button
                                                className={`staking-action-btn ${needsApproval ? 'approve-btn' : 'stake-btn'}`}
                                                onClick={handleDepositClick}
                                                disabled={!stakeAmount || isApproveLoading || isStaking || isStakeLoading}
                                            >
                                                {isApproveLoading ? 'Approving...' :
                                                    isStaking || isStakeLoading ? 'Depositing...' :
                                                        needsApproval ? 'Approve & Deposit STETH' : 'Deposit STETH'}
                                            </button>
                                        </div>

                                        {/* Unstake Section */}
                                        <div className="staking-action-section">
                                            <h4 className="staking-action-title">Withdraw STETH</h4>
                                            <div className="staking-balance-info">
                                                Deposited: {maxUnstakeAmount} STETH
                                            </div>
                                            <div className="staking-input-group">
                                                <input
                                                    type="number"
                                                    className="staking-input"
                                                    placeholder="0.0"
                                                    value={unstakeAmount}
                                                    min="0"
                                                    step="any"
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (value === '' || (parseFloat(value) >= 0 && !isNaN(parseFloat(value)))) {
                                                            setUnstakeAmount(value);
                                                        }
                                                    }}
                                                    disabled={isUnstaking}
                                                />
                                                <button
                                                    className="staking-max-btn"
                                                    onClick={() => setUnstakeAmount(maxUnstakeAmount)}
                                                    disabled={isUnstaking}
                                                >
                                                    MAX
                                                </button>
                                            </div>
                                            <button
                                                className="staking-action-btn unstake-btn"
                                                onClick={handleUnstake}
                                                disabled={!unstakeAmount || isUnstaking || isUnstakeLoading}
                                            >
                                                {isUnstaking || isUnstakeLoading ? 'Withdrawing...' : 'Withdraw STETH'}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default STETHConnection;
