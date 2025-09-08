import React from 'react';
import { LPTokenHolders } from './GameLiquidityProvidersContext/types';

export interface GameLiquidityContextType {
    // Providers data
    botegaLPProviders: LPTokenHolders[];
    permaswapLPProviders: LPTokenHolders[];
    totalLPHolders: number | null;
    isLoadingProvidersData: boolean;
    hasPartialProvidersData: boolean;

    // Refresh functions
    refreshLiquidityData: () => Promise<void>;
}

export interface GameLiquidityProviderProps {
    children: React.ReactNode;
}
