import { useContext } from 'react';
import { AOSTETHStakingContext } from './AOSTETHStakingContext';

export { AOSTETHStakingProvider } from './AOSTETHStakingContextProvider';
export type {
    StakingBalance,
    AOSTETHStakingContextType,
    AOSTETHStakingProviderProps,
} from './types';

export const useAOSTETHStaking = () => {
    const context = useContext(AOSTETHStakingContext);
    if (context === undefined) {
        throw new Error('useAOSTETHStaking must be used within an AOSTETHStakingProvider');
    }
    return context;
};
