import { useContext } from 'react';
import { AOUSDSStakingContext } from './AOUSDSStakingContext';

export const useAOUSDSStaking = () => {
    const context = useContext(AOUSDSStakingContext);
    if (context === undefined) {
        throw new Error('useAOUSDSStaking must be used within an AOUSDSStakingProvider');
    }
    return context;
};
