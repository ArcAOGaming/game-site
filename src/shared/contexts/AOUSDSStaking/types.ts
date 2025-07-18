import { Address } from 'viem';

export interface StakingBalance {
    stakedAmount: bigint | undefined;
    earnedRewards: bigint | undefined;
    totalStaked: bigint | undefined;
    rewardRate: bigint | undefined;
    isLoading: boolean;
    error: Error | null;
}

export interface UserData {
    lastStake: bigint;
    deposited: bigint;
}

export interface StakingEvent {
    blockNumber: bigint;
    transactionHash: string;
    logIndex: number;
    timestamp?: number;
}

export interface UserStakedEvent extends StakingEvent {
    user: Address;
    amount: bigint;
    arweaveAddress: string;
}

export interface UserWithdrawnEvent extends StakingEvent {
    user: Address;
    amount: bigint;
    arweaveAddress: string;
}

export interface OverplusBridgedEvent extends StakingEvent {
    amount: bigint;
}

export interface CalculateOverplusResultEvent extends StakingEvent {
    totalAssets: bigint;
    overplus: bigint;
}

export interface EventsData {
    userStaked: UserStakedEvent[];
    userWithdrawn: UserWithdrawnEvent[];
    overplusBridged: OverplusBridgedEvent[];
    calculateOverplusResult: CalculateOverplusResultEvent[];
    isLoading: boolean;
    error: Error | null;
    lastFetchTime: Date | null;
}

export interface AOUSDSStakingContextType {
    // Connection state
    isConnected: boolean;
    address: Address | undefined;

    // Staking data
    stakingBalance: StakingBalance;

    // Events data
    events: EventsData;

    // Actions
    refetch: () => Promise<void>;
    refetchEvents: (fromBlock?: bigint, toBlock?: bigint) => Promise<void>;

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

export interface AOUSDSStakingProviderProps {
    children: React.ReactNode;
}
