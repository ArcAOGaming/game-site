import { useAppKitAccount, useAccount, useBalance } from '../../../../shared/contexts/EthereumWallet';
import { formatEther } from 'viem';
import './WalletBalance.css';

const EthereumWalletBalance = () => {
  const { isConnected, address } = useAppKitAccount();
  const { address: wagmiAddress } = useAccount();
  const { data: balance } = useBalance({ address: wagmiAddress });

  if (!isConnected) {
    return null;
  }

  const formatBalance = (balance: bigint | undefined) => {
    if (!balance) return 'N/A';
    const formatted = formatEther(balance);
    return `${parseFloat(formatted).toFixed(4)} ETH`;
  };

  return (
    <div className="wallet-balance-container">
      <div className="wallet-balance-header">
        <span className="wallet-balance-icon">⚡</span>
        <span className="wallet-balance-title">Ethereum Wallet</span>
      </div>
      <div className="wallet-balance-content">
        <div className="wallet-balance-address">
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}
        </div>
        <div className="wallet-balance-amount">
          <span className="wallet-balance-value">
            {formatBalance(balance?.value)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EthereumWalletBalance;
