import { Address } from 'viem';

export interface USDSStakingConfig {
    stakingContractAddress: Address;
}

export interface USDSStakingInfo {
    userStaked: bigint;
    userRewards: bigint;
    totalStaked: bigint;
    userData: USDSUserData;
    minimalStake: bigint;
    withdrawLockPeriod: bigint;
}

// USDS staking specific types based on the contract ABI
export interface USDSUserData {
    lastStake: bigint;
    deposited: bigint;
}

export interface USDSStakingHooks {
    useUSDSStakingInfo: (userAddress?: Address) => {
        data: USDSStakingInfo | undefined;
        isLoading: boolean;
        error: Error | null;
        refetch: () => void;
    };
}
