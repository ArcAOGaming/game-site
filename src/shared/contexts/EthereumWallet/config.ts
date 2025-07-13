import { createAppKit } from '@reown/appkit/react';
import { mainnet } from '@reown/appkit/networks';
import { QueryClient } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

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

// Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
});

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true
  }
});

export { wagmiAdapter, queryClient, networks };
