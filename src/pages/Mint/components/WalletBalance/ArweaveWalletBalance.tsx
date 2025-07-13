import { useArweaveAOWallet } from '../../../../shared/contexts/ArweaveAOWallet';
import './WalletBalance.css';

const ArweaveWalletBalance = () => {
  const { isConnected, arBalance, isLoadingBalance, address } = useArweaveAOWallet();

  if (!isConnected) {
    return null;
  }

  return (
    <div className="wallet-balance-container">
      <div className="wallet-balance-header">
        <span className="wallet-balance-icon">🏴‍☠️</span>
        <span className="wallet-balance-title">Arweave Wallet</span>
      </div>
      <div className="wallet-balance-content">
        <div className="wallet-balance-address">
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}
        </div>
        <div className="wallet-balance-amount">
          {isLoadingBalance ? (
            <span className="wallet-balance-loading">Loading...</span>
          ) : (
            <span className="wallet-balance-value">
              {arBalance !== null ? `${arBalance.toFixed(4)} AR` : 'N/A'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArweaveWalletBalance;
