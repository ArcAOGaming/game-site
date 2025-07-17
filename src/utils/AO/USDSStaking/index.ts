import { USDS_STAKING_CONTRACT_ADDRESS } from './constants';
import { USDSStakingUtils } from './USDSStakingUtils';

// Create a singleton instance of USDSStakingUtils
export const usdsStaking = new USDSStakingUtils(USDS_STAKING_CONTRACT_ADDRESS);

// Export everything
export * from './constants';
export * from './abis';
export * from './types';
export { USDSStakingUtils };
