import { Chain } from 'viem';

export interface EthereumWalletContextType {
  // Connection state
  isConnected: boolean;
  isConnecting: boolean;
  isReconnecting: boolean;
  
  // Account info
  address: string | undefined;
  chainId: number | undefined;
  chain: Chain | undefined;
  
  // Balance and network info
  balance: bigint | undefined;
  ensName: string | null | undefined;
  ensAvatar: string | null | undefined;
  
  // Connection methods
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  switchChain: (chainId: number) => Promise<void>;
  
  // Transaction methods
  sendTransaction: (to: string, value: bigint, data?: string) => Promise<string>;
  signMessage: (message: string) => Promise<string>;
  
  // Error handling
  error: Error | null;
  
  // Supported chains
  supportedChains: Chain[];
}

export interface EthereumWalletProviderProps {
  children: React.ReactNode;
  projectId?: string;
  appName?: string;
  appDescription?: string;
  appUrl?: string;
  appIcon?: string;
}

export interface WalletConfig {
  projectId: string;
  appName: string;
  appDescription: string;
  appUrl: string;
  appIcon: string;
}
