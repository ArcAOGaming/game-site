/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { useAccount, useReadContract, usePublicClient } from 'wagmi';
import { usdsStaking, USDS_STAKING_CONTRACT_ADDRESS } from '../../../utils/AO/USDSStaking';
import { convertBytes32ToArweaveAddress } from '../../../utils/AO/shared/arweaveUtils';
import { AOUSDSStakingContextType, AOUSDSStakingProviderProps, StakingBalance, EventsData } from './types';
import { AOUSDSStakingContext } from './AOUSDSStakingContext';

export const AOUSDSStakingProvider: React.FC<AOUSDSStakingProviderProps> = ({ children }) => {
    const { address, isConnected } = useAccount();
    const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);
    const [contractExists, setContractExists] = useState<boolean | null>(null);
    const [eventsData, setEventsData] = useState<EventsData>({
        userStaked: [],
        userWithdrawn: [],
        overplusBridged: [],
        calculateOverplusResult: [],
        isLoading: false,
        error: null,
        lastFetchTime: null,
    });
    const publicClient = usePublicClient();

    // Check if contract exists
    useEffect(() => {
        const checkContract = async () => {
            if (!publicClient) return;

            try {
                const bytecode = await publicClient.getCode({
                    address: USDS_STAKING_CONTRACT_ADDRESS,
                });
                const exists = bytecode && bytecode !== '0x';

                if (exists) {
                    // Test a simple function call to see if contract is working
                    try {
                        await publicClient.readContract({
                            address: USDS_STAKING_CONTRACT_ADDRESS,
                            abi: usdsStaking.getUSDSStakingABI(),
                            functionName: 'totalDepositedInVault',
                        });
                        setContractExists(true);
                    } catch (contractError) {
                        // Check if this is a position out of bounds error
                        if (contractError.message?.includes('out of bounds') || contractError.message?.includes('Position')) {
                            setContractExists(false);
                        } else {
                            setContractExists(false);
                        }
                    }
                } else {
                    setContractExists(false);
                }
            } catch {
                setContractExists(false);
            }
        };

        checkContract();
    }, [publicClient]);

    // Read user staking data
    const userDataQuery = useReadContract({
        ...usdsStaking.createUserDataConfig(address!),
        query: {
            enabled: !!address && isConnected && contractExists === true,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            retry: false, // Don't retry on contract reverts
        },
    });

    // Note: USDS contract doesn't have getCurrentUserReward function
    // We'll calculate rewards from user data if needed
    const currentRewardQuery = {
        data: undefined,
        isLoading: false,
        error: null,
        refetch: async () => { },
    };

    // Read total deposited
    const totalDepositedQuery = useReadContract({
        ...usdsStaking.createTotalDepositedConfig(),
        query: {
            enabled: contractExists === true,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            retry: false, // Don't retry on contract reverts
        },
    });

    // Read minimal stake
    const minimalStakeQuery = useReadContract({
        ...usdsStaking.createMinimalStakeConfig(),
        query: {
            enabled: contractExists === true,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            retry: false, // Don't retry on contract reverts
        },
    });

    // Extract data from queries for reuse
    // USDS contract usersData returns a struct with [lastStake, deposited]
    const userData = userDataQuery.data as { lastStake: bigint; deposited: bigint } | undefined;

    // Create staking balance object
    const stakingBalance: StakingBalance = useMemo(() => {
        // If contract doesn't exist, return default values
        if (contractExists === false) {
            return {
                stakedAmount: BigInt(0),
                earnedRewards: BigInt(0),
                totalStaked: BigInt(0),
                rewardRate: BigInt(0),
                isLoading: false,
                error: new Error('USDS staking contract not available on this network'),
            };
        }

        // If we're still checking contract existence
        if (contractExists === null) {
            return {
                stakedAmount: undefined,
                earnedRewards: undefined,
                totalStaked: undefined,
                rewardRate: undefined,
                isLoading: true,
                error: null,
            };
        }

        const isLoading = userDataQuery.isLoading || currentRewardQuery.isLoading ||
            totalDepositedQuery.isLoading || minimalStakeQuery.isLoading;

        const error = userDataQuery.error || currentRewardQuery.error ||
            totalDepositedQuery.error || minimalStakeQuery.error;

        // Extract staked amount from user data (deposited field)
        const stakedAmount = userData ? userData.deposited : undefined;

        // USDS contract doesn't have a reward rate, so we'll use 0
        const rewardRate = BigInt(0);

        return {
            stakedAmount,
            earnedRewards: currentRewardQuery.data,
            totalStaked: totalDepositedQuery.data,
            rewardRate,
            isLoading,
            error,
        };
    }, [
        contractExists,
        userData,
        currentRewardQuery.data,
        currentRewardQuery.isLoading,
        currentRewardQuery.error,
        totalDepositedQuery.data,
        totalDepositedQuery.isLoading,
        totalDepositedQuery.error,
        userDataQuery.isLoading,
        userDataQuery.error,
        minimalStakeQuery.isLoading,
        minimalStakeQuery.error,
    ]);

    // Update fetch time when data changes
    useEffect(() => {
        if (!stakingBalance.isLoading) {
            setLastFetchTime(new Date());
        }
    }, [stakingBalance.isLoading]);

    // Refetch events function
    const refetchEvents = useCallback(async (fromBlock?: bigint, toBlock?: bigint) => {
        if (!publicClient || contractExists !== true) {
            return;
        }

        setEventsData(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            // For now, we'll create a simple placeholder implementation
            // In a real implementation, you would use publicClient.getLogs() with event filters
            // created by usdsStaking.createUserStakedEventFilter(), etc.

            // Placeholder - you can implement actual event fetching here
            const mockEvents = {
                userStaked: [],
                userWithdrawn: [],
                overplusBridged: [],
                calculateOverplusResult: [],
                isLoading: false,
                error: null,
                lastFetchTime: new Date(),
            };

            setEventsData(mockEvents);
        } catch (error) {
            setEventsData(prev => ({
                ...prev,
                isLoading: false,
                error: error as Error,
            }));
        }
    }, [publicClient, contractExists]);

    // Refetch all queries
    const refetch = async () => {
        // Only refetch if contract exists
        if (contractExists === true) {
            await Promise.all([
                userDataQuery.refetch(),
                currentRewardQuery.refetch(),
                totalDepositedQuery.refetch(),
                minimalStakeQuery.refetch(),
            ]);
        }
    };

    const contextValue: AOUSDSStakingContextType = {
        isConnected,
        address,
        stakingBalance,
        events: eventsData,
        refetch,
        refetchEvents,
        debugInfo: {
            contractAddress: USDS_STAKING_CONTRACT_ADDRESS,
            lastFetchTime,
            queryResults: {
                stakedBalance: {
                    data: userData ? userData.deposited : undefined,
                    isLoading: userDataQuery.isLoading,
                    error: userDataQuery.error,
                },
                earnedRewards: {
                    data: currentRewardQuery.data,
                    isLoading: currentRewardQuery.isLoading,
                    error: currentRewardQuery.error,
                },
                totalStaked: {
                    data: totalDepositedQuery.data,
                    isLoading: totalDepositedQuery.isLoading,
                    error: totalDepositedQuery.error,
                },
                rewardRate: {
                    data: BigInt(0), // USDS contract doesn't have reward rate
                    isLoading: minimalStakeQuery.isLoading,
                    error: minimalStakeQuery.error,
                },
            },
        },
    };

    return (
        <AOUSDSStakingContext.Provider value={contextValue}>
            {children}
        </AOUSDSStakingContext.Provider>
    );
};
