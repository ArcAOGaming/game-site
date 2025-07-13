import { useContext } from 'react';
import { WalletContext } from './ArweaveAOWalletContext';

export { ArweaveAOWalletProvider } from './ArweaveAOWalletContextProvider'
export type { WalletContextType, WalletProviderProps } from './types';


export const useArweaveAOWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
