import { useContext } from 'react';
import { AOSDAIStakingContext } from './AOSDAIStakingContext';

export { AOSDAIStakingProvider } from './AOSDAIStakingContextProvider';
export type {
    StakingBalance,
    AOSDAIStakingContextType,
    AOSDAIStakingProviderProps,
} from './types';

export const useAOSDAIStaking = () => {
    const context = useContext(AOSDAIStakingContext);
    if (context === undefined) {
        throw new Error('useAOSDAIStaking must be used within an AOSDAIStakingProvider');
    }
    return context;
};
