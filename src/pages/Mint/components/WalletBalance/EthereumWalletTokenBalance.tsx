import React from 'react';
import { useEthereumWalletTokens } from '../../../../shared/contexts';
import './WalletBalance.css';

export function EthereumWalletTokenBalance() {
    const { isConnected, eth, dai, steth, isLoading, hasError, refetch } = useEthereumWalletTokens();

    if (!isConnected) {
        return (
            <div className="wallet-balance">
                <div className="wallet-balance-header">
                    <h3>Token Balances</h3>
                </div>
                <div className="wallet-balance-content">
                    <p>Connect Ethereum wallet to view token balances</p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="wallet-balance">
                <div className="wallet-balance-header">
                    <h3>Token Balances</h3>
                </div>
                <div className="wallet-balance-content">
                    <p>Loading token balances...</p>
                </div>
            </div>
        );
    }

    if (hasError) {
        return (
            <div className="wallet-balance">
                <div className="wallet-balance-header">
                    <h3>Token Balances</h3>
                    <button onClick={refetch} className="refresh-button">
                        Refresh
                    </button>
                </div>
                <div className="wallet-balance-content">
                    <p className="error">Error loading token balances</p>
                </div>
            </div>
        );
    }

    const formatBalance = (balance: string) => {
        const num = parseFloat(balance);
        if (num === 0) return '0';
        if (num < 0.0001) return '< 0.0001';
        return num.toFixed(4);
    };

    return (
        <div className="wallet-balance">
            <div className="wallet-balance-header">
                <h3>Token Balances</h3>
                <button onClick={refetch} className="refresh-button">
                    Refresh
                </button>
            </div>
            <div className="wallet-balance-content">
                <div className="token-balance-item">
                    <div className="token-info">
                        <span className="token-symbol">{eth.symbol}</span>
                        <span className="token-name">{eth.name}</span>
                    </div>
                    <div className="token-amount">
                        {formatBalance(eth.formatted)}
                    </div>
                </div>

                <div className="token-balance-item">
                    <div className="token-info">
                        <span className="token-symbol">{dai.symbol}</span>
                        <span className="token-name">{dai.name}</span>
                    </div>
                    <div className="token-amount">
                        {formatBalance(dai.formatted)}
                    </div>
                </div>

                <div className="token-balance-item">
                    <div className="token-info">
                        <span className="token-symbol">{steth.symbol}</span>
                        <span className="token-name">{steth.name}</span>
                    </div>
                    <div className="token-amount">
                        {formatBalance(steth.formatted)}
                    </div>
                </div>
            </div>
        </div>
    );
}
