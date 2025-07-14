import React, { useState } from 'react';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';
import { useAOSTETHStaking } from '../../../../../shared/contexts';
import { ethStaking } from '../../../../../utils/AO';

const STETHConnection: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { open } = useAppKit();
    const { address, isConnected } = useAppKitAccount();
    const { address: wagmiAddress } = useAccount();
    const { data: balance } = useBalance({ address: wagmiAddress });
    const { data: stethBalance } = useBalance({
        address: wagmiAddress,
        token: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84' // STETH token address
    });
    const { stakingBalance } = useAOSTETHStaking();

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

    return (
        <div className="wallet-connection-card">
            <div className="wallet-connection-header">
                <div className="wallet-connection-icon">
                    <img src="/ethereum-logo.png" alt="Ethereum" />
                </div>
                <div>
                    <h3 className="wallet-connection-title">STETH Deposits</h3>
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
                            `${stakingBalance.stakedAmount ? ethStaking.formatAmount(stakingBalance.stakedAmount) : '0.0000'} STETH`
                        )}
                    </span>
                </div>
            </div>

            {!isConnected ? (
                <button
                    className="wallet-connect-button wallet-connect-button-ethereum"
                    onClick={handleConnect}
                >
                    <img src="/ethereum-logo.png" alt="Ethereum" style={{ width: '16px', height: '16px' }} />
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
                            <p>Deposit and withdraw functionality will be implemented here.</p>
                            <p>This modal will contain the staking interface for STETH.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default STETHConnection;
