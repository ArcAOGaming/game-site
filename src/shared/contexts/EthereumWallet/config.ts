import { createAppKit } from '@reown/appkit/react';
import { mainnet } from '@reown/appkit/networks';
import { QueryClient } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { walletConnect } from 'wagmi/connectors';

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
    // WalletConnect for mobile wallets
    walletConnect({
      projectId,
      metadata,
      showQrModal: false,
    }),
  ],
});

// Singleton pattern to ensure AppKit is only created once
let appKitInstance: any = null;

const initializeAppKit = () => {
  if (!appKitInstance) {
    // Create modal with enhanced wallet support
    appKitInstance = createAppKit({
      adapters: [wagmiAdapter],
      networks,
      projectId,
      metadata,
      features: {
        analytics: true,
        email: false, // Disable email login for cleaner wallet selection
        socials: [], // Disable social logins for cleaner wallet selection
      }
    });
  }
  return appKitInstance;
};

export { wagmiAdapter, queryClient, networks, initializeAppKit };
