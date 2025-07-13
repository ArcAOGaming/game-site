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

    // Check if contract exists and investigate proxy
    useEffect(() => {
        const checkContract = async () => {
            if (!publicClient) return;

            try {
                const bytecode = await publicClient.getCode({
                    address: ETH_STAKING_CONTRACT_ADDRESS,
                });
                const exists = bytecode && bytecode !== '0x';

                console.log('🔍 Contract investigation:', {
                    address: ETH_STAKING_CONTRACT_ADDRESS,
                    exists,
                    bytecode: bytecode?.slice(0, 50) + '...',
                    fullBytecodeLength: bytecode?.length
                });

                if (exists) {
                    // Check if it's a proxy by looking for common proxy patterns
                    const isProxy = bytecode?.includes('360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc') || // EIP-1967 implementation slot
                        bytecode?.includes('a3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50') || // EIP-1967 beacon slot
                        bytecode?.includes('b53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103'); // EIP-1967 admin slot

                    console.log('🔍 Proxy detection:', {
                        isProxy,
                        bytecodeSnippet: bytecode?.slice(0, 100)
                    });

                    // Try to read implementation address if it's a proxy
                    if (isProxy) {
                        try {
                            // EIP-1967 implementation slot
                            const implementationSlot = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';
                            const implementationAddress = await publicClient.getStorageAt({
                                address: ETH_STAKING_CONTRACT_ADDRESS,
                                slot: implementationSlot,
                            });

                            console.log('🔍 Proxy implementation:', {
                                implementationAddress,
                                implementationSlot
                            });
                        } catch (proxyError) {
                            console.log('⚠️ Could not read proxy implementation:', proxyError);
                        }
                    }

                    // Test a simple function call to see what happens
                    try {
                        const totalDepositedResult = await publicClient.readContract({
                            address: ETH_STAKING_CONTRACT_ADDRESS,
                            abi: ethStaking.getDistributionABI(),
                            functionName: 'totalDepositedInPublicPools',
                        });
                        console.log('✅ Direct contract call successful:', { totalDepositedResult });
                        setContractExists(true);
                    } catch (contractError) {
                        console.log('❌ Direct contract call failed:', {
                            error: contractError,
                            message: contractError.message,
                            cause: contractError.cause
                        });

                        // If it's a proxy, try with proxy ABI
                        if (isProxy) {
                            console.log('🔄 Trying proxy fallback...');
                            setContractExists(false); // For now, mark as not working
                        } else {
                            setContractExists(false);
                        }
                    }
                } else {
                    setContractExists(false);
                }
            } catch (error) {
                console.error('❌ Error checking contract existence:', error);
                setContractExists(false);
            }
        };

        checkContract();
    }, [publicClient]);

    // Debug logging
    useEffect(() => {
        console.log('🔍 AOSTETHStaking Debug - Connection State:', {
            isConnected,
            address,
            contractAddress: ETH_STAKING_CONTRACT_ADDRESS,
            contractExists,
            timestamp: new Date().toISOString()
        });
    }, [isConnected, address, contractExists]);

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

    // Debug contract queries
    useEffect(() => {
        console.log('🔍 AOSTETHStaking Debug - Contract Queries:', {
            userData: {
                data: userDataQuery.data,
                isLoading: userDataQuery.isLoading,
                error: userDataQuery.error,
                config: ethStaking.createUserDataConfig(address!, 0)
            },
            currentReward: {
                data: currentRewardQuery.data,
                isLoading: currentRewardQuery.isLoading,
                error: currentRewardQuery.error,
                config: ethStaking.createCurrentUserRewardConfig(address!, 0)
            },
            totalDeposited: {
                data: totalDepositedQuery.data,
                isLoading: totalDepositedQuery.isLoading,
                error: totalDepositedQuery.error,
                config: ethStaking.createTotalDepositedConfig()
            },
            poolData: {
                data: poolDataQuery.data,
                isLoading: poolDataQuery.isLoading,
                error: poolDataQuery.error,
                config: ethStaking.createPoolDataConfig(0)
            },
            timestamp: new Date().toISOString()
        });
    }, [
        userDataQuery.data,
        userDataQuery.isLoading,
        userDataQuery.error,
        currentRewardQuery.data,
        currentRewardQuery.isLoading,
        currentRewardQuery.error,
        totalDepositedQuery.data,
        totalDepositedQuery.isLoading,
        totalDepositedQuery.error,
        poolDataQuery.data,
        poolDataQuery.isLoading,
        poolDataQuery.error,
        address
    ]);

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
        console.log('🔄 AOSTETHStaking Debug - Manual Refetch Triggered');

        // Only refetch if contract exists
        if (contractExists === true) {
            await Promise.all([
                userDataQuery.refetch(),
                currentRewardQuery.refetch(),
                totalDepositedQuery.refetch(),
                poolDataQuery.refetch(),
            ]);
        } else {
            console.log('⚠️ Skipping refetch - contract not available');
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
