import React, { useMemo, useEffect, useState } from 'react';
import { useAccount, useReadContract, usePublicClient } from 'wagmi';
import { daiStaking, DAI_STAKING_CONTRACT_ADDRESS } from '../../../utils/AO/DAIStaking';
import { AOSDAIStakingContextType, AOSDAIStakingProviderProps, StakingBalance } from './types';
import { AOSDAIStakingContext } from './AOSDAIStakingContext';

export const AOSDAIStakingProvider: React.FC<AOSDAIStakingProviderProps> = ({ children }) => {
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
                    address: DAI_STAKING_CONTRACT_ADDRESS,
                });
                const exists = bytecode && bytecode !== '0x';

                if (exists) {
                    // Test a simple function call to see if contract is working
                    try {
                        await publicClient.readContract({
                            address: DAI_STAKING_CONTRACT_ADDRESS,
                            abi: daiStaking.getDistributionABI(),
                            functionName: 'totalDepositedInPublicPools',
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

    // Read user staking data with debugging
    const userDataQuery = useReadContract({
        ...daiStaking.createUserDataConfig(address!, 0), // Default to pool 0
        query: {
            enabled: !!address && isConnected && contractExists === true,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            retry: false, // Don't retry on contract reverts
        },
    });

    // Note: DAI contract doesn't have getCurrentUserReward function
    // We'll calculate rewards from user data if needed
    const currentRewardQuery = {
        data: undefined,
        isLoading: false,
        error: null,
        refetch: async () => { },
    };

    // Read total deposited with debugging
    const totalDepositedQuery = useReadContract({
        ...daiStaking.createTotalDepositedConfig(),
        query: {
            enabled: contractExists === true,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            retry: false, // Don't retry on contract reverts
        },
    });

    // Read pool data with debugging
    const poolDataQuery = useReadContract({
        ...daiStaking.createPoolDataConfig(0), // Default to pool 0
        query: {
            enabled: contractExists === true,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            retry: false, // Don't retry on contract reverts
        },
    });


    // Extract data from queries for reuse
    // DAI contract usersData returns [lastStake, deposited] (2 values)
    const userData = userDataQuery.data as readonly [bigint, bigint] | undefined;
    // DAI contract poolsData returns [lastUpdate, totalDeposited] (2 values)
    const poolData = poolDataQuery.data as readonly [bigint, bigint] | undefined;

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
                error: new Error('DAI staking contract not available on this network'),
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
        // userData returns [lastStake, deposited] (2 values)
        const stakedAmount = userData ? userData[1] : undefined; // deposited is the second field

        // poolData returns [lastUpdate, totalDeposited] (2 values)
        // Note: DAI contract doesn't have a reward rate in poolData, so we'll use 0
        const rewardRate = BigInt(0); // DAI contract structure is different

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

    const contextValue: AOSDAIStakingContextType = {
        isConnected,
        address,
        stakingBalance,
        refetch,
        debugInfo: {
            contractAddress: DAI_STAKING_CONTRACT_ADDRESS,
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
                    data: BigInt(0), // DAI contract doesn't have reward rate in poolData
                    isLoading: poolDataQuery.isLoading,
                    error: poolDataQuery.error,
                },
            },
        },
    };

    return (
        <AOSDAIStakingContext.Provider value={contextValue}>
            {children}
        </AOSDAIStakingContext.Provider>
    );
};
