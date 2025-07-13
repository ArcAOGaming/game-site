import { useContext } from 'react';
import { EthereumWalletTokensContext } from './EthereumWalletTokensContext';

export { EthereumWalletTokensProvider } from './EthereumWalletTokensContextProvider';
export { TOKEN_CONFIGS } from './config';
export { TOKEN_ADDRESSES } from './types';
export type {
    TokenBalance,
    EthereumWalletTokensContextType,
    EthereumWalletTokensProviderProps,
} from './types';

export const useEthereumWalletTokens = () => {
    const context = useContext(EthereumWalletTokensContext);
    if (context === undefined) {
        throw new Error('useEthereumWalletTokens must be used within an EthereumWalletTokensProvider');
    }
    return context;
};
