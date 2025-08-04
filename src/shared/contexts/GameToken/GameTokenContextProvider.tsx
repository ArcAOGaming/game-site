import React, { useState, useEffect, useCallback } from 'react';
import { GameTokenContext } from './GameTokenContext';
import { GameTokenProviderProps, TokenBalanceData, DryRunResult } from './types';
import { GameToken } from 'ao-js-sdk';
import BigNumber from 'bignumber.js';

// Fixed total supply of 1 billion GAME tokens (with 18 decimals)
const FIXED_TOTAL_SUPPLY = new BigNumber('1000000000000000000000000000'); // 1B * 10^18

// Wallet addresses to exclude from circulation calculation
const EXCLUDED_WALLETS = [
    'nYHhoSEtelyL3nQ6_CFoOVnZfnz2VHK-nEez962YMm8',
    '4beBWZx0B1_v15p0RO0zPpxM042IzgEeJQ0FP5j5gng'
];

export const GameTokenProvider: React.FC<GameTokenProviderProps> = ({ children }) => {
    const [totalSupply, setTotalSupply] = useState<BigNumber | null>(null);
    const [circulatingSupply, setCirculatingSupply] = useState<BigNumber | null>(null);
    const [isLoadingTokenData, setIsLoadingTokenData] = useState(false);

    /**
     * Fetches all token holder balances for GAME
     */
    const fetchBalances = async (): Promise<DryRunResult> => {
        return await GameToken.balances();
    };

    /**
     * Fetches all token holder balances and transforms them
     */
    const fetchGameBalances = async (): Promise<TokenBalanceData[]> => {
        try {
            const balances = await fetchBalances();

            // Parse the JSON string in balances.Messages[0].Data
            const balancesData = JSON.parse(balances.Messages[0].Data);

            const tokenBalanceSheet: TokenBalanceData[] = Object.entries(balancesData).map(([address, balance]) => ({
                address,
                balance: new BigNumber(balance as string)
            }));

            return tokenBalanceSheet;
        } catch (error) {
            console.error('Error fetching GAME balances:', error);
            throw error;
        }
    };


    const refreshTokenData = useCallback(async () => {
        if (isLoadingTokenData) return;

        setIsLoadingTokenData(true);
        try {
            // Get the actual total supply from blockchain to understand the correct value
            const tokenInfo = await GameToken.getInfo();
            const actualTotalSupply = new BigNumber(tokenInfo.totalSupply);

            console.log('Actual total supply from blockchain:', actualTotalSupply.toString());
            console.log('Fixed total supply we set:', FIXED_TOTAL_SUPPLY.toString());

            // Set fixed total supply of 1 billion GAME tokens
            setTotalSupply(FIXED_TOTAL_SUPPLY);

            // Calculate circulating supply using fixed total supply
            const balances = await fetchGameBalances();

            // Calculate the sum of balances in excluded wallets
            const excludedAmount = balances
                .filter(item => EXCLUDED_WALLETS.includes(item.address))
                .reduce((sum, item) => sum.plus(item.balance), new BigNumber(0));

            console.log('Excluded amount:', excludedAmount.toString());

            // Calculate circulating supply from fixed total supply
            const circulatingSupplyValue = FIXED_TOTAL_SUPPLY.minus(excludedAmount);
            setCirculatingSupply(circulatingSupplyValue);

        } catch (error) {
            console.error('Error refreshing token data:', error);
            // Set fallback values on error
            setTotalSupply(FIXED_TOTAL_SUPPLY);
            setCirculatingSupply(FIXED_TOTAL_SUPPLY);
        } finally {
            setIsLoadingTokenData(false);
        }
    }, []);

    useEffect(() => {
        refreshTokenData();
    }, [refreshTokenData]);

    const value = {
        totalSupply,
        circulatingSupply,
        isLoadingTokenData,
        refreshTokenData,
    };

    return (
        <GameTokenContext.Provider value={value}>
            {children}
        </GameTokenContext.Provider>
    );
};
