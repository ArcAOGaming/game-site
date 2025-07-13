import React, { useMemo, useEffect, useState } from 'react';
import { useAccount, useReadContract, usePublicClient } from 'wagmi';
import { ethStaking, ETH_STAKING_CONTRACT_ADDRESS } from '../../../utils/AO/ETHStaking';
import { AOSTETHStakingContextType, AOSTETHStakingProviderProps, StakingBalance } from './types';
import { AOSTETHStakingContext } from './AOSTETHStakingContext';

export const AOSTETHStakingProvider: React.FC<AOSTETHStakingProviderProps> = ({ children }) => {
    const { address, isConnected } = useAccount();
    const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);
    const [contractExists, setContractExists] = useState<boolean | null>(null);
    const publicClient = usePublicClient();

    // Check if contract exists
    useEffect(() => {
        const checkContract = async () => {
            if (!publicClient) return;

            try {
                const bytecode = await publicClient.getCode({
                    address: ETH_STAKING_CONTRACT_ADDRESS,
                });
                const exists = bytecode && bytecode !== '0x';

                if (exists) {
                    // Test a simple function call to see if contract is working
                    try {
                        await publicClient.readContract({
                            address: ETH_STAKING_CONTRACT_ADDRESS,
                            abi: ethStaking.getDistributionABI(),
                            functionName: 'totalDepositedInPublicPools',
                        });
                        setContractExists(true);
                    } catch {
                        setContractExists(false);
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

    // Read user staking data with debugging
    const userDataQuery = useReadContract({
        ...ethStaking.createUserDataConfig(address!, 0), // Default to pool 0
        query: {
            enabled: !!address && isConnected && contractExists === true,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            retry: false, // Don't retry on contract reverts
        },
    });

    // Read current user rewards with debugging
    const currentRewardQuery = useReadContract({
        ...ethStaking.createCurrentUserRewardConfig(address!, 0), // Default to pool 0
        query: {
            enabled: !!address && isConnected && contractExists === true,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            retry: false, // Don't retry on contract reverts
        },
    });

    // Read total deposited with debugging
    const totalDepositedQuery = useReadContract({
        ...ethStaking.createTotalDepositedConfig(),
        query: {
            enabled: contractExists === true,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            retry: false, // Don't retry on contract reverts
        },
    });

    // Read pool data with debugging
    const poolDataQuery = useReadContract({
        ...ethStaking.createPoolDataConfig(0), // Default to pool 0
        query: {
            enabled: contractExists === true,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            retry: false, // Don't retry on contract reverts
        },
    });


    // Extract data from queries for reuse
    const userData = userDataQuery.data as readonly [bigint, bigint, bigint, bigint] | undefined;
    const poolData = poolDataQuery.data as readonly [bigint, bigint, bigint] | undefined;

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
                error: new Error('Staking contract not available on this network'),
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
            totalDepositedQuery.isLoading || poolDataQuery.isLoading;

        const error = userDataQuery.error || currentRewardQuery.error ||
            totalDepositedQuery.error || poolDataQuery.error;

        // Extract staked amount from user data (deposited field)
        // userData returns [lastStake, deposited, rate, pendingRewards]
        const stakedAmount = userData ? userData[1] : undefined; // deposited is the second field

        // poolData returns [lastUpdate, rate, totalDeposited]
        const rewardRate = poolData ? poolData[1] : undefined; // rate is the second field

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
        poolData,
        userDataQuery.isLoading,
        userDataQuery.error,
        poolDataQuery.isLoading,
        poolDataQuery.error,
    ]);

    // Update fetch time when data changes
    useEffect(() => {
        if (!stakingBalance.isLoading) {
            setLastFetchTime(new Date());
        }
    }, [stakingBalance.isLoading]);

    // Refetch all queries
    const refetch = async () => {
        // Only refetch if contract exists
        if (contractExists === true) {
            await Promise.all([
                userDataQuery.refetch(),
                currentRewardQuery.refetch(),
                totalDepositedQuery.refetch(),
                poolDataQuery.refetch(),
            ]);
        }
    };

    const contextValue: AOSTETHStakingContextType = {
        isConnected,
        address,
        stakingBalance,
        refetch,
        debugInfo: {
            contractAddress: ETH_STAKING_CONTRACT_ADDRESS,
            lastFetchTime,
            queryResults: {
                stakedBalance: {
                    data: userData ? userData[1] : undefined,
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
                    data: poolData ? poolData[1] : undefined,
                    isLoading: poolDataQuery.isLoading,
                    error: poolDataQuery.error,
                },
            },
        },
    };

    return (
        <AOSTETHStakingContext.Provider value={contextValue}>
            {children}
        </AOSTETHStakingContext.Provider>
    );
};
