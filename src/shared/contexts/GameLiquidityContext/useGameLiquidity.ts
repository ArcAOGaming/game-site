import { useContext } from 'react';
import { GameLiquidityContext } from './GameLiquidityContext';

export const useGameLiquidity = () => {
    const context = useContext(GameLiquidityContext);
    if (context === undefined) {
        throw new Error('useGameLiquidity must be used within a GameLiquidityProvider');
    }
    return context;
};
