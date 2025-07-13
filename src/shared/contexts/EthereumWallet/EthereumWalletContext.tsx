import React, { useEffect } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { wagmiAdapter, queryClient, initializeAppKit } from './config';

export function EthereumWalletProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize AppKit only once when the provider mounts
    initializeAppKit();
  }, []);

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
