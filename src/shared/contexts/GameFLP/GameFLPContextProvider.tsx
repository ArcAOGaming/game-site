import React, { useState, useEffect } from "react";
import { GameFLPDataService } from "ao-js-sdk";
import { GameFLPContext } from "./GameFLPContext";
import { GameFLPProviderProps } from "./types";
import { useArweaveAOWallet } from "../ArweaveAOWallet";

export const GameFLPProvider: React.FC<GameFLPProviderProps> = ({ children }) => {
    const [recentDistribution, setRecentDistribution] = useState<number | null>(null);
    const [isLoadingDistribution, setIsLoadingDistribution] = useState(false);

    const { address, isConnected } = useArweaveAOWallet();

    const refreshDistribution = async () => {
        if (!address || !isConnected) {
            setRecentDistribution(null);
            return;
        }

        setIsLoadingDistribution(true);
        try {
            console.log('Fetching recent distribution for address:', address);
            const distribution = await GameFLPDataService.getUsersMostRecentDistributions(address);
            // Convert string amount to number (assuming it's in wei/smallest unit)
            const distributionAmount = distribution ? parseFloat(distribution.amount) : null;
            setRecentDistribution(distributionAmount);
            console.log('Recent distribution updated:', distributionAmount);
        } catch (error) {
            console.error('Error fetching recent distribution:', error);
            setRecentDistribution(null);
        } finally {
            setIsLoadingDistribution(false);
        }
    };

    // Fetch distribution when address changes or connection status changes
    useEffect(() => {
        if (address && isConnected) {
            refreshDistribution();
        } else {
            setRecentDistribution(null);
        }
    }, [address, isConnected]);

    return (
        <GameFLPContext.Provider
            value={{
                recentDistribution,
                isLoadingDistribution,
                refreshDistribution,
            }}
        >
            {children}
        </GameFLPContext.Provider>
    );
};
