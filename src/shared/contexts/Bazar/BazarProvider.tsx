import React, { useState, useEffect, ReactNode } from 'react';
import { BazarProfile } from '../types';
import { BazarContext } from './context';
import { useArweaveAOWallet } from '../ArweaveAOWallet';

interface BazarProviderProps {
  children: ReactNode;
}

// Mock function - replace with actual implementation
const checkBazarProfile = async (address: string): Promise<BazarProfile> => {
  // This should be replaced with the actual checkBazarProfile function
  // For now, returning a mock profile
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate API call
      if (Math.random() > 0.1) { // 90% success rate for demo
        resolve({
          id: address,
          name: `User ${address.slice(0, 8)}`,
          avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${address}`,
          bio: 'Bazar user profile'
        });
      } else {
        reject(new Error('Failed to fetch profile'));
      }
    }, 1000);
  });
};

export const BazarProvider: React.FC<BazarProviderProps> = ({ children }) => {
  const { address, isConnected } = useArweaveAOWallet();
  const [bazarProfile, setBazarProfile] = useState<BazarProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (walletAddress: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const profile = await checkBazarProfile(walletAddress);
      setBazarProfile(profile);
    } catch (profileError) {
      const errorMessage = profileError instanceof Error ? profileError.message : 'Failed to fetch Bazar profile';
      console.error('Error fetching Bazar profile:', profileError);
      setError(errorMessage);
      setBazarProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (address) {
      await fetchProfile(address);
    }
  };

  // Fetch profile when wallet connects or address changes
  useEffect(() => {
    if (isConnected && address) {
      fetchProfile(address);
    } else {
      // Clear profile when wallet disconnects
      setBazarProfile(null);
      setError(null);
      setIsLoading(false);
    }
  }, [isConnected, address]);

  return (
    <BazarContext.Provider
      value={{
        bazarProfile,
        isLoading,
        error,
        refreshProfile,
      }}
    >
      {children}
    </BazarContext.Provider>
  );
};
