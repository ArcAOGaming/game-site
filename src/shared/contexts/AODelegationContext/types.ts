import { ReactNode } from "react";

// Define the shape of a delegation
export interface Delegation {
    delegatee: string;
    percentage: string;
}

// Define the context value shape
export interface DelegationContextValue {
    delegations: Delegation[];
    loading: boolean;
    settingDelegation: boolean;
    fetchDelegations: () => Promise<void>;
    setGameDelegation: () => Promise<void>;
    isConnected: boolean;
}
// Provider props
export interface DelegationProviderProps {
    children: ReactNode;
}