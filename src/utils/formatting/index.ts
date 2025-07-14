import BigNumber from 'bignumber.js';

/**
 * Formats a number from its smallest unit (18 decimals) to a human-readable format
 * @param value - The value in smallest unit (e.g., wei for ETH, smallest unit for tokens)
 * @param decimals - Number of decimals the token uses (default: 18)
 * @returns Formatted string with K suffix if appropriate and 2 decimal places
 */
export const formatTokenAmount = (value: number | null, decimals: number = 18): string => {
    if (value === null || value === undefined) {
        return '--';
    }

    // Convert from smallest unit to actual token amount
    const tokenAmount = value / Math.pow(10, decimals);

    // If amount is >= 1000, format with K suffix
    if (tokenAmount >= 1000) {
        const kAmount = tokenAmount / 1000;
        return `${kAmount.toFixed(2)}K`;
    }

    // Otherwise, show with 2 decimal places
    return tokenAmount.toFixed(2);
};

/**
 * Formats a BigNumber token amount to a human-readable format
 * @param value - The BigNumber value in smallest unit
 * @param decimals - Number of decimals the token uses (default: 12 for GAME token)
 * @returns Formatted string with appropriate suffix (K, M, B) and decimal places
 */
export const formatBigNumberTokenAmount = (value: BigNumber | null, decimals: number = 12): string => {
    if (!value || value.isZero()) {
        return '--';
    }

    // Convert from smallest unit to actual token amount
    const tokenAmount = value.dividedBy(new BigNumber(10).pow(decimals));

    // If amount is >= 1 billion, format with B suffix
    if (tokenAmount.gte(1000000000)) {
        const bAmount = tokenAmount.dividedBy(1000000000);
        // For exactly 1 billion, show "1B", otherwise show with decimals
        if (bAmount.eq(1)) {
            return '1B';
        }
        return `${bAmount.toFixed(2)}B`;
    }

    // If amount is >= 1 million, format with M suffix
    if (tokenAmount.gte(1000000)) {
        const mAmount = tokenAmount.dividedBy(1000000);
        // For whole millions, don't show decimals
        if (mAmount.eq(mAmount.integerValue())) {
            return `${mAmount.integerValue()}M`;
        }
        return `${mAmount.toFixed(2)}M`;
    }

    // If amount is >= 1000, format with K suffix
    if (tokenAmount.gte(1000)) {
        const kAmount = tokenAmount.dividedBy(1000);
        // For whole thousands, don't show decimals
        if (kAmount.eq(kAmount.integerValue())) {
            return `${kAmount.integerValue()}K`;
        }
        return `${kAmount.toFixed(2)}K`;
    }

    // Otherwise, show with 2 decimal places
    return tokenAmount.toFixed(2);
};
