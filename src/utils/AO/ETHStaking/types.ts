import { Address } from 'viem';

export interface ETHStakingConfig {
    stakingContractAddress: Address;
}

// Distribution contract pool structure
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

// Distribution contract pool data structure
export interface DistributionPoolData {
    lastUpdate: bigint;
    rate: bigint;
    totalDeposited: bigint;
}

// Distribution contract user data structure
export interface DistributionUserData {
    lastStake: bigint;
    deposited: bigint;
    rate: bigint;
    pendingRewards: bigint;
}

export interface ETHStakingInfo {
    userStakingData: DistributionUserData;
    currentReward: bigint;
    poolData: DistributionPoolData;
    poolInfo: DistributionPool;
    totalDeposited: bigint;
    depositToken: Address;
    ethBalance: bigint;
}

export interface ETHStakingHooks {
    useUserData: (userAddress?: Address, poolId?: number) => {
        data: DistributionUserData | undefined;
        isLoading: boolean;
        error: Error | null;
        refetch: () => void;
    };
    useCurrentUserReward: (userAddress?: Address, poolId?: number) => {
        data: bigint | undefined;
        isLoading: boolean;
        error: Error | null;
        refetch: () => void;
    };
    usePoolData: (poolId?: number) => {
        data: DistributionPoolData | undefined;
        isLoading: boolean;
        error: Error | null;
        refetch: () => void;
    };
    usePoolInfo: (poolId?: number) => {
        data: DistributionPool | undefined;
        isLoading: boolean;
        error: Error | null;
        refetch: () => void;
    };
    useTotalDeposited: () => {
        data: bigint | undefined;
        isLoading: boolean;
        error: Error | null;
        refetch: () => void;
    };
    useDepositToken: () => {
        data: Address | undefined;
        isLoading: boolean;
        error: Error | null;
        refetch: () => void;
    };
    useETHBalance: (userAddress?: Address) => {
        data: bigint | undefined;
        isLoading: boolean;
        error: Error | null;
        refetch: () => void;
    };
    useStake: () => {
        writeContract: (poolId: number, amount: string, arweaveAddress: string) => Promise<string>;
        isPending: boolean;
        error: Error | null;
    };
    useWithdraw: () => {
        writeContract: (poolId: number, amount: string, arweaveAddress: string) => Promise<string>;
        isPending: boolean;
        error: Error | null;
    };
}
