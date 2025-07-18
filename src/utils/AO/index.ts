// Export ETH Staking - single instantiated utility and types
export {
    ethStaking,
    ETH_STAKING_CONTRACT_ADDRESS,
    ETH_STAKING_ABI
} from './ETHStaking';

export type {
    ETHStakingInfo,
    DistributionPool,
    DistributionPoolData,
    DistributionUserData,
    ETHStakingHooks
} from './ETHStaking';

// Export DAI Staking - single instantiated utility and types
export {
    daiStaking,
    DAI_STAKING_CONTRACT_ADDRESS,
    DAI_STAKING_ABI
} from './DAIStaking';

export type {
    DAIStakingInfo,
    DAIStakingHooks
} from './DAIStaking';

// Export USDS Staking - single instantiated utility and types
export {
    usdsStaking,
    USDS_STAKING_CONTRACT_ADDRESS,
    USDS_STAKING_ABI
} from './USDSStaking';

export type {
    USDSStakingInfo,
    USDSStakingHooks
} from './USDSStaking';

// Export shared ABIs
export {
    DISTRIBUTION_ABI,
    PROXY_ABI
} from './shared/abis';
