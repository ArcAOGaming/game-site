import { parseEther, formatEther, Address } from 'viem';
import { DAI_STAKING_ABI } from './abis';
import { DAIStakingConfig } from './types';

export class DAIStakingUtils {
    private config: DAIStakingConfig;

    constructor(stakingContractAddress: Address) {
        this.config = {
            stakingContractAddress,
        };
    }

    /**
     * Get the staking contract address (proxy address)
     * Note: This is the proxy contract address that forwards calls to the implementation
     */
    getStakingContractAddress(): Address {
        return this.config.stakingContractAddress;
    }

    /**
     * Get the Distribution contract ABI (used with proxy address)
     * Note: We use the implementation ABI with the proxy address
     */
    getDistributionABI() {
        return DAI_STAKING_ABI;
    }

    /**
     * Format DAI amount from wei to human readable
     */
    formatAmount(amount: bigint): string {
        return formatEther(amount);
    }

    /**
     * Parse human readable amount to wei
     */
    parseAmount(amount: string): bigint {
        return parseEther(amount);
    }

    /**
     * Create contract configuration for reading user staking data
     * @param userAddress - User's wallet address
     * @param poolId - Pool ID to check (default: 0)
     */
    createUserDataConfig(userAddress: Address, poolId: number = 0) {
        return {
            address: this.config.stakingContractAddress,
            abi: DAI_STAKING_ABI,
            functionName: 'usersData',
            args: [userAddress, BigInt(poolId)],
        } as const;
    }

    /**
     * Note: DAI contract doesn't have getCurrentUserReward function
     * This method is kept for compatibility but will not work
     */
    createCurrentUserRewardConfig(userAddress: Address, poolId: number = 0) {
        // Return a dummy config that won't be used
        return {
            address: this.config.stakingContractAddress,
            abi: DAI_STAKING_ABI,
            functionName: 'usersData', // Use usersData instead
            args: [userAddress, BigInt(poolId)],
        } as const;
    }

    /**
     * Create contract configuration for reading pool data
     * @param poolId - Pool ID to check (default: 0)
     */
    createPoolDataConfig(poolId: number = 0) {
        return {
            address: this.config.stakingContractAddress,
            abi: DAI_STAKING_ABI,
            functionName: 'poolsData',
            args: [BigInt(poolId)],
        } as const;
    }

    /**
     * Create contract configuration for reading pool info
     * @param poolId - Pool ID to check (default: 0)
     */
    createPoolInfoConfig(poolId: number = 0) {
        return {
            address: this.config.stakingContractAddress,
            abi: DAI_STAKING_ABI,
            functionName: 'pools',
            args: [BigInt(poolId)],
        } as const;
    }

    /**
     * Create contract configuration for reading total deposited in public pools
     */
    createTotalDepositedConfig() {
        return {
            address: this.config.stakingContractAddress,
            abi: DAI_STAKING_ABI,
            functionName: 'totalDepositedInPublicPools',
        } as const;
    }

    /**
     * Create contract configuration for staking tokens
     * @param poolId - Pool ID to stake in (default: 0)
     * @param amount - Amount to stake in DAI
     * @param arweaveAddress - Arweave address as bytes32
     */
    createStakeConfig(poolId: number = 0, amount: string, arweaveAddress: string) {
        const amountWei = parseEther(amount);
        // Convert arweave address string to bytes32
        // Arweave addresses are base64url encoded, we need to convert them properly
        const arweaveBytes32 = this.convertArweaveAddressToBytes32(arweaveAddress);

        return {
            address: this.config.stakingContractAddress,
            abi: DAI_STAKING_ABI,
            functionName: 'stake',
            args: [BigInt(poolId), amountWei, arweaveBytes32],
        } as const;
    }

    /**
     * Create contract configuration for withdrawing tokens
     * @param poolId - Pool ID to withdraw from (default: 0)
     * @param amount - Amount to withdraw in DAI
     * @param arweaveAddress - Arweave address as bytes32
     */
    createWithdrawConfig(poolId: number = 0, amount: string, arweaveAddress: string) {
        const amountWei = parseEther(amount);
        // Convert arweave address string to bytes32
        // Arweave addresses are base64url encoded, we need to convert them properly
        const arweaveBytes32 = this.convertArweaveAddressToBytes32(arweaveAddress);

        return {
            address: this.config.stakingContractAddress,
            abi: DAI_STAKING_ABI,
            functionName: 'withdraw',
            args: [BigInt(poolId), amountWei, arweaveBytes32],
        } as const;
    }

    /**
     * Convert Arweave address to bytes32 format
     * @param arweaveAddress - Arweave address string
     * @returns bytes32 formatted address
     */
    private convertArweaveAddressToBytes32(arweaveAddress: string): `0x${string}` {
        // Arweave addresses are 43 characters long and base64url encoded
        // We need to convert them to exactly 32 bytes (64 hex characters)

        // Remove any padding and ensure it's exactly 43 characters
        const cleanAddress = arweaveAddress.replace(/[^A-Za-z0-9_-]/g, '').substring(0, 43);

        // Convert to hex by encoding each character
        let hex = '';
        for (let i = 0; i < cleanAddress.length; i++) {
            hex += cleanAddress.charCodeAt(i).toString(16).padStart(2, '0');
        }

        // Truncate or pad to exactly 64 characters (32 bytes)
        if (hex.length > 64) {
            hex = hex.substring(0, 64);
        } else {
            hex = hex.padEnd(64, '0');
        }

        return `0x${hex}` as `0x${string}`;
    }

    /**
     * Create contract configuration for reading deposit token address
     */
    createDepositTokenConfig() {
        return {
            address: this.config.stakingContractAddress,
            abi: DAI_STAKING_ABI,
            functionName: 'depositToken',
        } as const;
    }

    /**
     * Create configuration for reading DAI balance
     */
    createDAIBalanceConfig(userAddress: Address, daiTokenAddress: Address) {
        return {
            address: daiTokenAddress,
            abi: [
                {
                    constant: true,
                    inputs: [{ name: '_owner', type: 'address' }],
                    name: 'balanceOf',
                    outputs: [{ name: 'balance', type: 'uint256' }],
                    type: 'function',
                },
            ],
            functionName: 'balanceOf',
            args: [userAddress],
        } as const;
    }
}
