import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GameLiquidityProvidersContext } from './GameLiquidityProvidersContext';
import { GameLiquidityProvidersProviderProps, LPTokenHolders } from './types';
import { TokenProvider, useToken } from '../../TokenContext';
import { PROCESS_IDS } from 'ao-js-sdk';

// Component to fetch holders for a single LP token
const LPTokenHoldersProvider: React.FC<{
    tokenId: string;
    onHoldersUpdate: (tokenId: string, holders: number | null, isLoading: boolean) => void;
}> = ({ tokenId, onHoldersUpdate }) => {
    const { totalHolders, isLoadingTokenData } = useToken();

    useEffect(() => {
        onHoldersUpdate(tokenId, totalHolders, isLoadingTokenData);
    }, [tokenId, totalHolders, isLoadingTokenData, onHoldersUpdate]);

    return null;
};

export const GameLiquidityProvidersProvider: React.FC<GameLiquidityProvidersProviderProps> = ({ children }) => {
    const [botegaLPTokens, setBotegaLPTokens] = useState<LPTokenHolders[]>([]);
    const [permaswapLPTokens, setPermaswapLPTokens] = useState<LPTokenHolders[]>([]);
    const [isLoadingProvidersData, setIsLoadingProvidersData] = useState(true);

    // Get all LP token IDs
    const botegaTokenIds = useMemo(() => {
        const ids = Object.values(PROCESS_IDS.BOTEGA.LP_TOKENS);
        console.log('GameLiquidityProviders: Botega token IDs:', ids);
        return ids;
    }, []);
    const permaswapTokenIds = useMemo(() => {
        const ids = Object.values(PROCESS_IDS.PERMASWAP.LP_TOKENS);
        console.log('GameLiquidityProviders: Permaswap token IDs:', ids);
        return ids;
    }, []);
    const allTokenIds = useMemo(() => [...botegaTokenIds, ...permaswapTokenIds], [botegaTokenIds, permaswapTokenIds]);

    // Initialize token holders state
    useEffect(() => {
        setBotegaLPTokens(botegaTokenIds.map(tokenId => ({
            tokenId,
            totalHolders: null,
            isLoading: true
        })));

        setPermaswapLPTokens(permaswapTokenIds.map(tokenId => ({
            tokenId,
            totalHolders: null,
            isLoading: true
        })));
    }, [botegaTokenIds, permaswapTokenIds]);

    // Handle holders update for individual tokens
    const handleHoldersUpdate = useCallback((tokenId: string, holders: number | null, isLoading: boolean) => {
        console.log('GameLiquidityProviders: Updating holders for token', tokenId, 'holders:', holders, 'isLoading:', isLoading);

        if (botegaTokenIds.includes(tokenId)) {
            setBotegaLPTokens(prevTokens =>
                prevTokens.map(token =>
                    token.tokenId === tokenId
                        ? { ...token, totalHolders: holders, isLoading }
                        : token
                )
            );
        } else if (permaswapTokenIds.includes(tokenId)) {
            setPermaswapLPTokens(prevTokens =>
                prevTokens.map(token =>
                    token.tokenId === tokenId
                        ? { ...token, totalHolders: holders, isLoading }
                        : token
                )
            );
        }
    }, [botegaTokenIds, permaswapTokenIds]);

    // Calculate total LP holders with progressive loading
    const totalLPHolders = useMemo(() => {
        const allTokens = [...botegaLPTokens, ...permaswapLPTokens];
        const loadedTokens = allTokens.filter(token => !token.isLoading && token.totalHolders !== null);

        // Return partial sum if we have some data, null only if no data at all
        if (loadedTokens.length === 0) return null;

        return loadedTokens.reduce((total, token) => total + (token.totalHolders || 0), 0);
    }, [botegaLPTokens, permaswapLPTokens]);

    // Check if we have partial data (some loaded, some still loading)
    const hasPartialProvidersData = useMemo(() => {
        const allTokens = [...botegaLPTokens, ...permaswapLPTokens];
        const loadedTokens = allTokens.filter(token => !token.isLoading && token.totalHolders !== null);
        const loadingTokens = allTokens.filter(token => token.isLoading);

        return loadedTokens.length > 0 && loadingTokens.length > 0;
    }, [botegaLPTokens, permaswapLPTokens]);

    // Update loading state
    useEffect(() => {
        const allTokens = [...botegaLPTokens, ...permaswapLPTokens];
        const isLoading = allTokens.some(token => token.isLoading);
        setIsLoadingProvidersData(isLoading);
    }, [botegaLPTokens, permaswapLPTokens]);

    const refreshProvidersData = useCallback(async () => {
        // This will trigger a refresh of all TokenProviders
        // The individual TokenProviders will handle their own refresh
        setIsLoadingProvidersData(true);
    }, []);

    const value = {
        botegaLPTokens,
        permaswapLPTokens,
        totalLPHolders,
        isLoadingProvidersData,
        hasPartialProvidersData,
        refreshProvidersData,
    };

    return (
        <GameLiquidityProvidersContext.Provider value={value}>
            {/* Render TokenProviders for all LP tokens */}
            {allTokenIds.map(tokenId => (
                <TokenProvider key={tokenId} tokenId={tokenId}>
                    <LPTokenHoldersProvider
                        tokenId={tokenId}
                        onHoldersUpdate={handleHoldersUpdate}
                    />
                </TokenProvider>
            ))}
            {children}
        </GameLiquidityProvidersContext.Provider>
    );
};
