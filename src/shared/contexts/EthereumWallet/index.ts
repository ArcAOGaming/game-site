export { EthereumWalletProvider } from './EthereumWalletContext';
export { wagmiAdapter, queryClient, networks } from './config';
// Re-export wagmi hooks for convenience
export {
  useAccount,
  useBalance,
  useEnsName,
  useEnsAvatar,
  useConnect,
  useDisconnect,
  useSwitchChain,
  useSendTransaction,
  useSignMessage,
  useChainId
} from 'wagmi';

// Re-export AppKit hooks
export { useAppKit, useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';
