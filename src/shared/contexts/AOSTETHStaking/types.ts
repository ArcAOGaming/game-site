import { Address } from 'viem';

export interface StakingBalance {
    stakedAmount: bigint | undefined;
    earnedRewards: bigint | undefined;
    totalStaked: bigint | undefined;
    rewardRate: bigint | undefined;
    isLoading: boolean;
    error: Error | null;
}

export interface AOSTETHStakingContextType {
    // Connection state
    isConnected: boolean;
    address: Address | undefined;

    // Staking data
    stakingBalance: StakingBalance;

    // Actions
    refetch: () => Promise<void>;

    // Debug info
    debugInfo: {
        contractAddress: Address;
        lastFetchTime: Date | null;
        queryResults: {
            stakedBalance: { data: bigint | undefined; isLoading: boolean; error: Error | null };
            earnedRewards: { data: bigint | undefined; isLoading: boolean; error: Error | null };
            totalStaked: { data: bigint | undefined; isLoading: boolean; error: Error | null };
            rewardRate: { data: bigint | undefined; isLoading: boolean; error: Error | null };
        };
    };
}

export interface AOSTETHStakingProviderProps {
    children: React.ReactNode;
}
