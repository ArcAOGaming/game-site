import { useContext } from 'react';
import { GameTokenContext } from './GameTokenContext';

export const useGameToken = () => {
    const context = useContext(GameTokenContext);
    if (context === undefined) {
        throw new Error('useGameToken must be used within a GameTokenProvider');
    }
    return context;
};
