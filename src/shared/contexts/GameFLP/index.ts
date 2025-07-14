import { useContext } from 'react';
import { GameFLPContext } from './GameFLPContext';

export { GameFLPProvider } from './GameFLPContextProvider';
export type { GameFLPContextType, GameFLPProviderProps } from './types';

export const useGameFLP = () => {
    const context = useContext(GameFLPContext);
    if (context === undefined) {
        throw new Error('useGameFLP must be used within a GameFLPProvider');
    }
    return context;
};
