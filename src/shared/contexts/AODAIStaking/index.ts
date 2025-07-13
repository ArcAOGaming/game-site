import { useContext } from 'react';
import { AODAIStakingContext } from './AODAIStakingContext';

export { AODAIStakingProvider } from './AODAIStakingContextProvider';
export type {
    StakingBalance,
    AODAIStakingContextType as AOSDAIStakingContextType,
    AODAIStakingProviderProps as AOSDAIStakingProviderProps,
} from './types';

export const useAOSDAIStaking = () => {
    const context = useContext(AODAIStakingContext);
    if (context === undefined) {
        throw new Error('useAOSDAIStaking must be used within an AOSDAIStakingProvider');
    }
    return context;
};
