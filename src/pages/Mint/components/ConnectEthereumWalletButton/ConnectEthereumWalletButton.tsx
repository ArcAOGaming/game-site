import React, { useEffect } from 'react';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';
import './ConnectEthereumWalletButton.css';

interface ConnectEthereumWalletButtonProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
}

const ConnectEthereumWalletButton: React.FC<ConnectEthereumWalletButtonProps> = ({
  onConnect,
  onDisconnect,
}) => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { address: wagmiAddress } = useAccount();
  const { data: balance } = useBalance({ address: wagmiAddress });

  // Handle connection state changes
  useEffect(() => {
    if (isConnected && address && onConnect) {
      onConnect(address);
    } else if (!isConnected && onDisconnect) {
      onDisconnect();
    }
  }, [isConnected, address, onConnect, onDisconnect]);

  const handleConnect = () => {
    open();
  };

  const handleDisconnect = () => {
    open({ view: 'Account' });
  };

  const handleCopyAddress = (addr: string) => {
    navigator.clipboard.writeText(addr);
  };

  const formatBalance = (balance: bigint | undefined) => {
    if (!balance) return '0.0000';
    const formatted = formatEther(balance);
    return parseFloat(formatted).toFixed(4);
  };

  return (
    <div className="ethereum-wallet-container">
      {!isConnected ? (
        <button
          className="ethereum-wallet-button ethereum-wallet-button-primary"
          onClick={handleConnect}
        >
          <div className="ethereum-logo-container">
            <img
              src="/ethereum-logo.svg"
              alt="Ethereum Logo"
              className="ethereum-logo"
            />
          </div>
          <span className="ethereum-wallet-button-text">
            Connect Ethereum Wallet
          </span>
        </button>
      ) : (
        <div className="ethereum-wallet-connected">
          {address && (
            <div className="ethereum-profile-container">
              <div className="ethereum-user-profile">
                <div className="ethereum-profile-avatar-placeholder">
                  <img
                    src="/ethereum-logo.svg"
                    alt="Ethereum"
                    className="ethereum-avatar-icon"
                  />
                </div>
                <div className="ethereum-profile-info">
                  <div className="ethereum-profile-name">
                    {`${address.slice(0, 6)}...${address.slice(-4)}`}
                  </div>
                  <div
                    className="ethereum-profile-address"
                    onClick={() => handleCopyAddress(address)}
                    title="Click to copy address"
                  >
                    {address.slice(0, 8)}...{address.slice(-6)}
                  </div>
                  <div className="ethereum-balance">
                    {formatBalance(balance?.value)} ETH
                  </div>
                </div>
              </div>
            </div>
          )}
          <button
            className="ethereum-wallet-button ethereum-wallet-button-secondary"
            onClick={handleDisconnect}
          >
            <span className="ethereum-wallet-button-icon">⚙️</span>
            <span>Manage</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectEthereumWalletButton;
