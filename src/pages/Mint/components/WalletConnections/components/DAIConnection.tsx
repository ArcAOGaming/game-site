import React, { useState, useEffect } from 'react';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { useAOSDAIStaking, useArweaveAOWallet } from '../../../../../shared/contexts';
import { daiStaking, DAI_TOKEN_ADDRESS } from '../../../../../utils/AO/DAIStaking';
import { ERC20_ABI } from '../../../../../utils/AO/shared/erc20Abi';

const DAIConnection: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stakeAmount, setStakeAmount] = useState('');
    const [unstakeAmount, setUnstakeAmount] = useState('');
    const [isStaking, setIsStaking] = useState(false);
    const [isUnstaking, setIsUnstaking] = useState(false);
    const [pendingStakeAfterApproval, setPendingStakeAfterApproval] = useState(false);

    const { open } = useAppKit();
    const { address, isConnected } = useAppKitAccount();
    const { address: wagmiAddress } = useAccount();
    const { address: arweaveAddress } = useArweaveAOWallet();
    const { data: balance, refetch: refetchEthBalance } = useBalance({ address: wagmiAddress });
    const { data: daiBalance, refetch: refetchDaiBalance } = useBalance({
        address: wagmiAddress,
        token: DAI_TOKEN_ADDRESS
    });
    const { stakingBalance, refetch } = useAOSDAIStaking();

    // Read DAI allowance
    const { data: daiAllowance, refetch: refetchAllowance } = useReadContract({
        address: DAI_TOKEN_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: wagmiAddress ? [wagmiAddress, daiStaking.getStakingContractAddress()] : undefined,
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
        }
    }, [isStakeSuccess, refetch]);

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
                refetchDaiBalance();
                refetchAllowance();
            }
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [isConnected, refetchEthBalance, refetchDaiBalance, refetchAllowance]);

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
                address: DAI_TOKEN_ADDRESS,
                abi: ERC20_ABI,
                functionName: 'approve',
                args: [daiStaking.getStakingContractAddress(), amount],
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
        if (!stakeAmount || !wagmiAddress || !arweaveAddress) return;

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
        if (!unstakeAmount || !wagmiAddress || !arweaveAddress) return;

        try {
            setIsUnstaking(true);
            const unstakeConfig = daiStaking.createWithdrawConfig(0, unstakeAmount, arweaveAddress);
            writeUnstake(unstakeConfig as any);
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

    const needsApproval = stakeAmount && daiAllowance !== undefined &&
        parseEther(stakeAmount) > (daiAllowance as bigint);

    const maxStakeAmount = daiBalance?.value ? formatEther(daiBalance.value) : '0';
    const maxUnstakeAmount = stakingBalance.stakedAmount ?
        daiStaking.formatAmount(stakingBalance.stakedAmount) : '0';

    return (
        <div className="wallet-connection-card">
            <div className="wallet-connection-header">
                <div className="wallet-connection-icon">
                    <img src="/dai-logo.png" alt="DAI" />
                </div>
                <div>
                    <h3 className="wallet-connection-title">DAI Deposits</h3>
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
                                    toToken: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
                                    amount: formattedAmount
                                }
                            });
                        }}
                    >
                        Swap ETH → DAI
                    </button>
                )}

                <div className="balance-item">
                    <span className="balance-label">DAI Balance</span>
                    <span className="balance-value">
                        {!isConnected ? (
                            <span className="balance-placeholder">--</span>
                        ) : (
                            `${formatBalance(daiBalance?.value)} DAI`
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
                    <span className="balance-label">Deposited DAI</span>
                    <span className="balance-value">
                        {!isConnected ? (
                            <span className="balance-placeholder">--</span>
                        ) : stakingBalance.isLoading ? (
                            <span className="balance-loading">Loading...</span>
                        ) : stakingBalance.error ? (
                            <span className="balance-placeholder">N/A</span>
                        ) : (
                            `${stakingBalance.stakedAmount ? parseFloat(daiStaking.formatAmount(stakingBalance.stakedAmount)).toFixed(4) : '0.0000'} DAI`
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
                            <h3>DAI Deposit / Withdraw</h3>
                            <button
                                className="modal-close-button"
                                onClick={() => setIsModalOpen(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            {!arweaveAddress ? (
                                <div className="staking-actions-status">
                                    <p>Please connect your Arweave wallet to enable staking functionality.</p>
                                </div>
                            ) : (
                                <div className="staking-actions-content">
                                    {/* Stake Section */}
                                    <div className="staking-action-section">
                                        <h4 className="staking-action-title">Deposit DAI</h4>
                                        <div className="staking-balance-info">
                                            Available: {maxStakeAmount} DAI
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
                                                    needsApproval ? 'Approve & Deposit DAI' : 'Deposit DAI'}
                                        </button>
                                    </div>

                                    {/* Unstake Section */}
                                    <div className="staking-action-section">
                                        <h4 className="staking-action-title">Withdraw DAI</h4>
                                        <div className="staking-balance-info">
                                            Deposited: {maxUnstakeAmount} DAI
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
                                            {isUnstaking || isUnstakeLoading ? 'Withdrawing...' : 'Withdraw DAI'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DAIConnection;
