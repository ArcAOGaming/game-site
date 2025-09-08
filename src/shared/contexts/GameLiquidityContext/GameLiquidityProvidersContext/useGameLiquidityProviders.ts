import { useContext } from 'react';
import { GameLiquidityProvidersContext } from './GameLiquidityProvidersContext';

export const useGameLiquidityProviders = () => {
    const context = useContext(GameLiquidityProvidersContext);
    if (context === undefined) {
        throw new Error('useGameLiquidityProviders must be used within a GameLiquidityProvidersProvider');
    }
    return context;
};
