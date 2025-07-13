import React, { useMemo, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { formatUnits } from 'viem';
import { TOKEN_CONFIGS } from './config';
import { EthereumWalletTokensContextType, EthereumWalletTokensProviderProps, TokenBalance } from './types';
import { EthereumWalletTokensContext } from './EthereumWalletTokensContext';

export const EthereumWalletTokensProvider: React.FC<EthereumWalletTokensProviderProps> = ({ children }) => {
    const { address, isConnected } = useAccount();

    // ETH Balance (native token)
    const {
        data: ethBalance,
        isLoading: ethLoading,
        error: ethError,
        refetch: refetchEth,
    } = useBalance({
        address,
        query: {
            enabled: !!address && isConnected,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
        },
    });

    // DAI Balance (ERC-20)
    const {
        data: daiBalance,
        isLoading: daiLoading,
        error: daiError,
        refetch: refetchDai,
    } = useBalance({
        address,
        token: TOKEN_CONFIGS.DAI.address,
        query: {
            enabled: !!address && isConnected,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
        },
    });

    // STETH Balance (ERC-20)
    const {
        data: stethBalance,
        isLoading: stethLoading,
        error: stethError,
        refetch: refetchSteth,
    } = useBalance({
        address,
        token: TOKEN_CONFIGS.STETH.address,
        query: {
            enabled: !!address && isConnected,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
        },
    });

    // Create token balance objects
    const eth: TokenBalance = useMemo(() => ({
        symbol: TOKEN_CONFIGS.ETH.symbol,
        name: TOKEN_CONFIGS.ETH.name,
        address: TOKEN_CONFIGS.ETH.address,
        balance: ethBalance?.value,
        decimals: TOKEN_CONFIGS.ETH.decimals,
        formatted: ethBalance?.value
            ? formatUnits(ethBalance.value, TOKEN_CONFIGS.ETH.decimals)
            : '0',
        isLoading: ethLoading,
        error: ethError,
    }), [ethBalance, ethLoading, ethError]);

    const dai: TokenBalance = useMemo(() => ({
        symbol: TOKEN_CONFIGS.DAI.symbol,
        name: TOKEN_CONFIGS.DAI.name,
        address: TOKEN_CONFIGS.DAI.address,
        balance: daiBalance?.value,
        decimals: TOKEN_CONFIGS.DAI.decimals,
        formatted: daiBalance?.value
            ? formatUnits(daiBalance.value, TOKEN_CONFIGS.DAI.decimals)
            : '0',
        isLoading: daiLoading,
        error: daiError,
    }), [daiBalance, daiLoading, daiError]);

    const steth: TokenBalance = useMemo(() => ({
        symbol: TOKEN_CONFIGS.STETH.symbol,
        name: TOKEN_CONFIGS.STETH.name,
        address: TOKEN_CONFIGS.STETH.address,
        balance: stethBalance?.value,
        decimals: TOKEN_CONFIGS.STETH.decimals,
        formatted: stethBalance?.value
            ? formatUnits(stethBalance.value, TOKEN_CONFIGS.STETH.decimals)
            : '0',
        isLoading: stethLoading,
        error: stethError,
    }), [stethBalance, stethLoading, stethError]);

    // Overall state
    const isLoading = ethLoading || daiLoading || stethLoading;
    const hasError = !!(ethError || daiError || stethError);

    // Refetch balances when address changes
    useEffect(() => {
        if (address && isConnected) {
            refetchEth();
            refetchDai();
            refetchSteth();
        }
    }, [address, isConnected, refetchEth, refetchDai, refetchSteth]);

    // Refetch all balances
    const refetch = async () => {
        await Promise.all([
            refetchEth(),
            refetchDai(),
            refetchSteth(),
        ]);
    };

    const contextValue: EthereumWalletTokensContextType = {
        isConnected,
        address,
        eth,
        dai,
        steth,
        isLoading,
        hasError,
        refetch,
    };

    return (
        <EthereumWalletTokensContext.Provider value={contextValue}>
            {children}
        </EthereumWalletTokensContext.Provider>
    );
};
