import React, { useState, useEffect, useCallback } from 'react';
import { TokenContext } from './TokenContext';
import { TokenProviderProps } from './types';
import { TokenService } from 'ao-js-sdk';

export const TokenProvider: React.FC<TokenProviderProps> = ({ children, tokenId }) => {
    const [totalHolders, setTotalHolders] = useState<number | null>(null);
    const [isLoadingTokenData, setIsLoadingTokenData] = useState(false);
    const [tokenService] = useState(() => new TokenService(tokenId));

    const refreshTokenData = useCallback(async () => {
        if (isLoadingTokenData) return;

        console.log(`TokenContext: Starting to fetch data for token ${tokenId}`);
        setIsLoadingTokenData(true);
        try {
            const holders = await tokenService.getTotalHolders();
            console.log(`TokenContext: Fetched ${holders} holders for token ${tokenId}`);
            setTotalHolders(holders);
        } catch (error) {
            console.error(`Error fetching token data for ${tokenId}:`, error);
            setTotalHolders(null);
        } finally {
            setIsLoadingTokenData(false);
        }
    }, [tokenService, tokenId, isLoadingTokenData]);

    useEffect(() => {
        refreshTokenData();
    }, [refreshTokenData]);

    const value = {
        totalHolders,
        isLoadingTokenData,
        refreshTokenData,
        tokenId,
    };

    return (
        <TokenContext.Provider value={value}>
            {children}
        </TokenContext.Provider>
    );
};
