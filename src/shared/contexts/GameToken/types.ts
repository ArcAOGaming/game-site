import BigNumber from 'bignumber.js';

export interface GameTokenContextType {
    totalSupply: BigNumber | null;
    circulatingSupply: BigNumber | null;
    isLoadingTokenData: boolean;
    refreshTokenData: () => Promise<void>;
}

export interface GameTokenProviderProps {
    children: React.ReactNode;
}

export interface TokenBalanceData {
    address: string;
    balance: BigNumber;
}

export interface GameTokenInfo {
    totalSupply: string;
    balances?: Record<string, string>;
    name: string;
    symbol: string;
    decimals: number;
}

export type DryRunResult = {
    Output: unknown;
    Messages: Array<{ Data: string }>;
    Spawns: unknown[];
    Error?: string;
};
