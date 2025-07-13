import { createContext } from "react";
import { DelegationContextValue } from "./types";

// Create the context with a default value
export const DelegationContext = createContext<DelegationContextValue>({
    delegations: [],
    loading: false,
    settingDelegation: false,
    fetchDelegations: async () => { },
    setGameDelegation: async () => { },
    isConnected: false,
});