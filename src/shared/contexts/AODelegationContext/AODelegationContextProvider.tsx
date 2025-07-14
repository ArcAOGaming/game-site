import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PIDelegateClient } from 'ao-js-sdk';
import { AUTONOMOUS_FINANCE } from 'ao-js-sdk/src/processes/ids/autonomous-finance';
import { useArweaveAOWallet } from '../ArweaveAOWallet';
import { Delegation, DelegationProviderProps } from './types';
import { DelegationContext } from './AODelegationContext';







/**
 * Provider component that manages delegation state and operations
 */
export const DelegationProvider: React.FC<DelegationProviderProps> = ({ children }) => {
    // Use wallet connection state from WalletContext
    const { isConnected, address } = useArweaveAOWallet();
    const [delegations, setDelegations] = useState<Delegation[]>([]);
    const [loading, setLoading] = useState(false);
    const [settingDelegation, setSettingDelegation] = useState(false);
    const isFetchingRef = useRef(false);


    // Fetch delegations from the AO network
    const fetchDelegations = useCallback(async () => {
        // Check connection and address
        if (!isConnected || !address) return;

        // Prevent multiple simultaneous fetches
        if (loading || isFetchingRef.current) return;

        // Set ref to true to prevent concurrent calls
        isFetchingRef.current = true;

        try {
            setLoading(true);
            const client = await PIDelegateClient.autoConfiguration();
            const delegationData = await client.getDelegation(address);

            if (delegationData) {
                const parsedDelegations = client.parseDelegationInfo(delegationData);
                setDelegations(Array.isArray(parsedDelegations?.delegationPrefs)
                    ? parsedDelegations.delegationPrefs.map(pref => ({
                        delegatee: pref.walletTo,
                        percentage: (pref.factor / 100).toFixed(2)
                    }))
                    : []);
            } else {
                setDelegations([]);
            }
        } catch (error) {
            console.error('Error fetching delegations:', error);
            setDelegations([]);
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    }, [isConnected, address]); // Remove loading from dependencies

    // Set $GAME as the sole delegate (100%) and all others to 0%
    const setGameDelegation = useCallback(async () => {
        if (!isConnected || !address) return;

        try {
            setSettingDelegation(true);
            const client = await PIDelegateClient.autoConfiguration();

            // Create an array of promises to set all current delegations to 0%
            const clearDelegationPromises = [];

            // First, set all existing delegations to 0% (except GAME)
            for (const delegation of delegations) {
                // Skip if it's already the GAME delegation
                if (delegation.delegatee === AUTONOMOUS_FINANCE.FAIR_LAUNCH_PROCESSES.GAME) continue;

                clearDelegationPromises.push(
                    client.setDelegation({
                        walletFrom: address,
                        walletTo: delegation.delegatee,
                        factor: 0 // 0% in basis points
                    })
                );
            }

            // Wait for all other delegations to be cleared first
            await Promise.all(clearDelegationPromises);

            // Only after all other delegations are cleared, set GAME to 100%
            await client.setDelegation({
                walletFrom: address,
                walletTo: AUTONOMOUS_FINANCE.FAIR_LAUNCH_PROCESSES.GAME,
                factor: 10000 // 100% in basis points
            });

            // Refresh delegations after setting
            await fetchDelegations();
        } catch (error) {
            console.error('Error setting delegation:', error);
        } finally {
            setSettingDelegation(false);
        }
    }, [isConnected, address, fetchDelegations, delegations]);

    // Fetch delegations when wallet connection or address changes
    useEffect(() => {
        let isMounted = true;

        if (isConnected && address && isMounted) {
            // Add a small delay to prevent immediate fetching on mount
            const timer = setTimeout(() => {
                if (isMounted) {
                    fetchDelegations();
                }
            }, 500);

            return () => {
                isMounted = false;
                clearTimeout(timer);
            };
        }
    }, [isConnected, address, fetchDelegations]);

    // Context value
    const value = {
        delegations,
        loading,
        settingDelegation,
        fetchDelegations,
        setGameDelegation,
        isConnected,
    };

    return (
        <DelegationContext.Provider value={value}>
            {children}
        </DelegationContext.Provider>
    );
};
