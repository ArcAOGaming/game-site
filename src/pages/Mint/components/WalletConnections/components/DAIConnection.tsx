import React, { useState } from 'react';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';
import { useAOSDAIStaking } from '../../../../../shared/contexts';
import { daiStaking } from '../../../../../utils/AO';

const DAIConnection: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { open } = useAppKit();
    const { address, isConnected } = useAppKitAccount();
    const { address: wagmiAddress } = useAccount();
    const { data: balance } = useBalance({ address: wagmiAddress });
    const { data: daiBalance } = useBalance({
        address: wagmiAddress,
        token: '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI token address
    });
    const { stakingBalance } = useAOSDAIStaking();

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
                            `${stakingBalance.stakedAmount ? daiStaking.formatAmount(stakingBalance.stakedAmount) : '0.0000'} DAI`
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
                            <h3>DAI Deposit / Withdraw</h3>
                            <button
                                className="modal-close-button"
                                onClick={() => setIsModalOpen(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Deposit and withdraw functionality will be implemented here.</p>
                            <p>This modal will contain the staking interface for DAI.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DAIConnection;
