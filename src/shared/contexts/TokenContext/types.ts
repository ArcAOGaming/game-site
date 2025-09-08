import React from 'react';

export interface TokenContextType {
    totalHolders: number | null;
    isLoadingTokenData: boolean;
    refreshTokenData: () => Promise<void>;
    tokenId: string;
}

export interface TokenProviderProps {
    children: React.ReactNode;
    tokenId: string;
}
