import {
    AO,
    ASTROUSD,
    AUTONOMOUS_FINANCE,
    BAZAR,
    BEACON,
    BOTEGA,
    FORWARDRESEARCH,
    PERMASWAP,
    RANDAO,
    RUNEREALM,
    VENTO,
    WANDER
} from '@arcaogaming/project-links';

export interface Partner {
    id: string;
    name: string;
    logo: string; // Path to logo in public folder
    website: string;
    description?: string;
}

export const PARTNERS: Partner[] = [
    {
        id: 'arweave',
        name: 'Arweave',
        logo: '/partners/arweave glyph (light).svg',
        website: 'https://arweave.org',
        description: 'Permanent data storage protocol'
    },
    {
        id: 'ao',
        name: 'AO',
        logo: '/partners/ao-logo-white-transparent.png',
        website: AO.website,
        description: 'Hyper parallel computer'
    },
    {
        id: 'astro',
        name: 'AstroUSD',
        logo: '/partners/astro.svg',
        website: ASTROUSD.website,
        description: 'Decentralized stablecoin protocol'
    },
    {
        id: 'autonomous',
        name: 'Autonomous Finance',
        logo: '/partners/autonomous-finance.png',
        website: AUTONOMOUS_FINANCE.website,
        description: 'Autonomous DeFi protocols'
    },
    {
        id: 'bazar',
        name: 'Bazar',
        logo: '/partners/bazar.svg',
        website: BAZAR.website,
        description: 'NFT marketplace'
    },
    {
        id: 'beacon',
        name: 'Beacon',
        logo: '/partners/beacon-wallet-transparent.png',
        website: BEACON.website,
        description: 'Arweave wallet'
    },
    {
        id: 'botega',
        name: 'Botega',
        logo: '/partners/botega-logo.png',
        website: BOTEGA.website,
        description: 'AMM protocol for AO'
    },
    {
        id: 'forward',
        name: 'Forward Research',
        logo: '/partners/forward.png',
        website: FORWARDRESEARCH.website,
        description: 'DeFi research and protocol'
    },
    {
        id: 'permaswap',
        name: 'Permaswap',
        logo: '/partners/permaswap.png',
        website: PERMASWAP.website,
        description: 'Decentralized exchange'
    },
    {
        id: 'randao',
        name: 'RandAO',
        logo: '/partners/randao-logo (3).png',
        website: RANDAO.website,
        description: 'Randomness oracle protocol'
    },
    {
        id: 'runerealm',
        name: 'Rune Realm',
        logo: '/partners/runerealm-logo.png',
        website: RUNEREALM.website,
        description: 'Fantasy gaming experience'
    },
    {
        id: 'vento',
        name: 'Vento',
        logo: '/partners/vento.svg',
        website: VENTO.website,
        description: 'Trading platform'
    },
    {
        id: 'wander',
        name: 'Wander',
        logo: '/partners/wander-logo-transparent.png',
        website: WANDER.website,
        description: 'Web3 wallet and gateway'
    }
];

// Partner categories for potential future organization
export const PARTNER_CATEGORIES = {
    INFRASTRUCTURE: 'Infrastructure',
    DEFI: 'DeFi',
    WALLETS: 'Wallets',
    GAMING: 'Gaming',
    TOOLS: 'Tools'
} as const;

export type PartnerCategory = typeof PARTNER_CATEGORIES[keyof typeof PARTNER_CATEGORIES];