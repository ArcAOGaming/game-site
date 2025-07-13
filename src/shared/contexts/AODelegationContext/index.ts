import { useContext } from "react";
import { DelegationContext } from "./AODelegationContext";

export * from "./types";
export { DelegationProvider } from "./AODelegationContextProvider";




/**
 * Custom hook to access delegation context
 */
export const useDelegation = () => {
    const context = useContext(DelegationContext);
    if (context === undefined) {
        throw new Error('useDelegation must be used within a DelegationProvider');
    }
    return context;
};

