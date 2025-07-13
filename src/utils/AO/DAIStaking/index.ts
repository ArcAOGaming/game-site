import { DAIStakingUtils } from './DAIStakingUtils';
import { DAI_STAKING_CONTRACT_ADDRESS } from './constants';

// Create and export a single instantiated DAI staking utility
export const daiStaking = new DAIStakingUtils(DAI_STAKING_CONTRACT_ADDRESS);

// Export essential types for consumers
export type {
    DAIStakingInfo,
    DistributionPool,
    DistributionPoolData,
    DistributionUserData,
    DAIStakingHooks
} from './types';

// Export the contract address constant
export { DAI_STAKING_CONTRACT_ADDRESS } from './constants';

// Export the ABI for direct use if needed
export { DISTRIBUTION_ABI as DAI_STAKING_ABI } from '../shared/abis';
