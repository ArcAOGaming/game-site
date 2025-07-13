export interface TokenBalance {
    symbol: string;
    name: string;
    address?: string; // undefined for native ETH
    balance: bigint | undefined;
    decimals: number;
    formatted: string;
    isLoading: boolean;
    error: Error | null;
}

export interface EthereumWalletTokensContextType {
    // Connection state
    isConnected: boolean;
    address: string | undefined;

    // Token balances
    eth: TokenBalance;
    dai: TokenBalance;
    steth: TokenBalance;

    // Overall state
    isLoading: boolean;
    hasError: boolean;

    // Refresh function
    refetch: () => Promise<void>;
}

export interface EthereumWalletTokensProviderProps {
    children: React.ReactNode;
}

// Token contract addresses on Ethereum mainnet
export const TOKEN_ADDRESSES = {
    DAI: '0x6b175474e89094c44da98b954eedeac495271d0f' as const,
    STETH: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84' as const,
} as const;

// ERC-20 ABI for balance queries
export const ERC20_ABI = [
    {
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [{ name: '', type: 'string' }],
        type: 'function',
    },
] as const;
