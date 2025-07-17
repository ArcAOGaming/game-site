import { useContext } from 'react';
import { AOUSDSStakingContext } from './AOUSDSStakingContext';

export { AOUSDSStakingProvider } from './AOUSDSStakingContextProvider';
export type {
    StakingBalance,
    AOUSDSStakingContextType,
    AOUSDSStakingProviderProps,
} from './types';

export const useAOUSDSStaking = () => {
    const context = useContext(AOUSDSStakingContext);
    if (context === undefined) {
        throw new Error('useAOUSDSStaking must be used within an AOUSDSStakingProvider');
    }
    return context;
};
