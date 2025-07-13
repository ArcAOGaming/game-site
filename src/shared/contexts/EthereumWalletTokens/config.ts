import { TOKEN_ADDRESSES } from './types';

// Token configurations
export const TOKEN_CONFIGS = {
    ETH: {
        symbol: 'ETH',
        name: 'Ethereum',
        decimals: 18,
        address: undefined, // Native token
    },
    DAI: {
        symbol: 'DAI',
        name: 'Dai Stablecoin',
        decimals: 18,
        address: TOKEN_ADDRESSES.DAI,
    },
    STETH: {
        symbol: 'stETH',
        name: 'Liquid staked Ether 2.0',
        decimals: 18,
        address: TOKEN_ADDRESSES.STETH,
    },
} as const;
