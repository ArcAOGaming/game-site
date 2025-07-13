import { Address } from 'viem';

export interface DAIStakingConfig {
    stakingContractAddress: Address;
}

export interface DAIStakingInfo {
    userStaked: bigint;
    userRewards: bigint;
    totalStaked: bigint;
    poolInfo: DistributionPool;
    poolData: DistributionPoolData;
    userData: DistributionUserData;
}

// Re-export distribution types for DAI staking
export interface DistributionPool {
    payoutStart: bigint;
    decreaseInterval: bigint;
    withdrawLockPeriod: bigint;
    claimLockPeriod: bigint;
    withdrawLockPeriodAfterStake: bigint;
    initialReward: bigint;
    rewardDecrease: bigint;
    minimalStake: bigint;
    isPublic: boolean;
}

export interface DistributionPoolData {
    lastUpdate: bigint;
    rate: bigint;
    totalDeposited: bigint;
}

export interface DistributionUserData {
    lastStake: bigint;
    deposited: bigint;
    rate: bigint;
    pendingRewards: bigint;
}

export interface DAIStakingHooks {
    useDAIStakingInfo: (userAddress?: Address) => {
        data: DAIStakingInfo | undefined;
        isLoading: boolean;
        error: Error | null;
        refetch: () => void;
    };
}
