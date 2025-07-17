import { createAppKit } from '@reown/appkit/react';
import { mainnet } from '@reown/appkit/networks';
import { QueryClient } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { walletConnect, injected } from 'wagmi/connectors';

// Setup queryClient
const queryClient = new QueryClient();

// Get projectId from https://cloud.reown.com
const projectId = 'f4874fa76a4a7015777bf9f7e3347d64';

// Create a metadata object
const metadata = {
  name: '$GAME',
  description: 'Experience the future of gaming finance with $GAME token',
  url: 'https://game.ar.io',
  icons: ['/logo-white-transparent.png']
};

// Set the networks (Ethereum mainnet only as requested)
const networks = [mainnet];

// Create Wagmi Adapter with explicit connectors for better wallet support
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
  connectors: [
    // Injected connector for browser wallets (MetaMask, Rabby, etc.)
    injected(),
    // WalletConnect for mobile wallets
    walletConnect({
      projectId,
      metadata,
      showQrModal: false,
    }),
  ],
});

// Singleton pattern to ensure AppKit is only created once
let appKitInitialized = false;
let appKitInstance: ReturnType<typeof createAppKit> | null = null;

const initializeAppKit = () => {
  if (!appKitInitialized) {
    // Create modal with enhanced wallet support
    appKitInstance = createAppKit({
      adapters: [wagmiAdapter],
      networks: [mainnet],
      projectId,
      metadata,
      features: {
        analytics: true,
        email: false, // Disable email login for cleaner wallet selection
        socials: [], // Disable social logins for cleaner wallet selection
      },
      themeMode: 'dark',
      themeVariables: {
        '--w3m-z-index': 1000
      },
      enableWalletConnect: true,
      enableInjected: true,
      enableEIP6963: true,
      enableCoinbase: true
    });
    appKitInitialized = true;
  }
  return appKitInstance;
};

export { wagmiAdapter, queryClient, networks, initializeAppKit };
