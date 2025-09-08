import React from 'react';
import { GameLiquidityContext } from './GameLiquidityContext';
import { GameLiquidityProviderProps } from './types';
import { GameLiquidityProvidersProvider, useGameLiquidityProviders } from './GameLiquidityProvidersContext';

// Component to combine both subcontexts
const GameLiquidityCombiner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {
        botegaLPTokens: botegaLPProviders,
        permaswapLPTokens: permaswapLPProviders,
        totalLPHolders,
        isLoadingProvidersData,
        hasPartialProvidersData,
        refreshProvidersData
    } = useGameLiquidityProviders();




    const refreshLiquidityData = async () => {
        await Promise.all([
            refreshProvidersData(),
        ]);
    };

    const value = {
        // Providers data
        botegaLPProviders,
        permaswapLPProviders,
        totalLPHolders,
        isLoadingProvidersData,
        hasPartialProvidersData,

        // Refresh functions
        refreshLiquidityData,
    };

    return (
        <GameLiquidityContext.Provider value={value}>
            {children}
        </GameLiquidityContext.Provider>
    );
};

export const GameLiquidityProvider: React.FC<GameLiquidityProviderProps> = ({ children }) => {
    return (
        <GameLiquidityProvidersProvider>
            {/* <GameTVLProvider> */}
            <GameLiquidityCombiner>
                {children}
            </GameLiquidityCombiner>
            {/* </GameTVLProvider> */}
        </GameLiquidityProvidersProvider>
    );
};
