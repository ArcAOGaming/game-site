import React from 'react';

export interface LPTokenHolders {
    tokenId: string;
    totalHolders: number | null;
    isLoading: boolean;
}

export interface GameLiquidityProvidersContextType {
    botegaLPTokens: LPTokenHolders[];
    permaswapLPTokens: LPTokenHolders[];
    totalLPHolders: number | null;
    isLoadingProvidersData: boolean;
    hasPartialProvidersData: boolean;
    refreshProvidersData: () => Promise<void>;
}

export interface GameLiquidityProvidersProviderProps {
    children: React.ReactNode;
}
