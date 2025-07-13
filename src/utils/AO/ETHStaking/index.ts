import { ETHStakingUtils } from './ETHStakingUtils';
import { ETH_STAKING_CONTRACT_ADDRESS } from './constants';

// Create and export a single instantiated ETH staking utility
export const ethStaking = new ETHStakingUtils(ETH_STAKING_CONTRACT_ADDRESS);

// Export essential types for consumers
export type {
    ETHStakingInfo,
    DistributionPool,
    DistributionPoolData,
    DistributionUserData,
    ETHStakingHooks
} from './types';

// Export the contract address constant
export { ETH_STAKING_CONTRACT_ADDRESS } from './constants';

// Export the ABI for direct use if needed
export { DISTRIBUTION_ABI as ETH_STAKING_ABI } from '../shared/abis';
