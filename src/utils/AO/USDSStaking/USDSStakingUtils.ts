import { parseEther, formatEther, Address } from 'viem';
import { USDS_STAKING_ABI } from './abis';
import { USDSStakingConfig } from './types';
import { convertArweaveAddressToBytes32 } from '../shared/arweaveUtils';

export class USDSStakingUtils {
    private config: USDSStakingConfig;

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
     * Get the USDS Staking contract ABI (used with proxy address)
     * Note: We use the implementation ABI with the proxy address
     */
    getUSDSStakingABI() {
        return USDS_STAKING_ABI;
    }

    /**
     * Format USDS amount from wei to human readable
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
     */
    createUserDataConfig(userAddress: Address) {
        return {
            address: this.config.stakingContractAddress,
            abi: USDS_STAKING_ABI,
            functionName: 'usersData',
            args: [userAddress],
        } as const;
    }

    /**
     * Create contract configuration for reading total deposited in vault
     */
    createTotalDepositedConfig() {
        return {
            address: this.config.stakingContractAddress,
            abi: USDS_STAKING_ABI,
            functionName: 'totalDepositedInVault',
        } as const;
    }

    /**
     * Create contract configuration for reading minimal stake amount
     */
    createMinimalStakeConfig() {
        return {
            address: this.config.stakingContractAddress,
            abi: USDS_STAKING_ABI,
            functionName: 'minimalStake',
        } as const;
    }

    /**
     * Create contract configuration for reading withdraw lock period
     */
    createWithdrawLockPeriodConfig() {
        return {
            address: this.config.stakingContractAddress,
            abi: USDS_STAKING_ABI,
            functionName: 'withdrawLockPeriodAfterStake',
        } as const;
    }

    /**
     * Create contract configuration for staking tokens
     * @param amount - Amount to stake in USDS
     * @param arweaveAddress - Arweave address as bytes32
     */
    createStakeConfig(amount: string, arweaveAddress: string) {
        const amountWei = parseEther(amount);
        // Convert arweave address string to bytes32
        const arweaveBytes32 = convertArweaveAddressToBytes32(arweaveAddress);

        return {
            address: this.config.stakingContractAddress,
            abi: USDS_STAKING_ABI,
            functionName: 'stake',
            args: [amountWei, arweaveBytes32],
        } as const;
    }

    /**
     * Create contract configuration for withdrawing tokens
     * @param amount - Amount to withdraw in USDS
     * @param arweaveAddress - Arweave address as bytes32
     */
    createWithdrawConfig(amount: string, arweaveAddress: string) {
        const amountWei = parseEther(amount);
        // Convert arweave address string to bytes32
        const arweaveBytes32 = convertArweaveAddressToBytes32(arweaveAddress);

        return {
            address: this.config.stakingContractAddress,
            abi: USDS_STAKING_ABI,
            functionName: 'withdraw',
            args: [amountWei, arweaveBytes32],
        } as const;
    }


    /**
     * Create contract configuration for reading deposit token address
     */
    createDepositTokenConfig() {
        return {
            address: this.config.stakingContractAddress,
            abi: USDS_STAKING_ABI,
            functionName: 'depositToken',
        } as const;
    }

    /**
     * Create contract configuration for reading vault address
     */
    createVaultAddressConfig() {
        return {
            address: this.config.stakingContractAddress,
            abi: USDS_STAKING_ABI,
            functionName: 'vaultAddress',
        } as const;
    }

    /**
     * Create configuration for reading USDS balance
     */
    createUSDSBalanceConfig(userAddress: Address, usdsTokenAddress: Address) {
        return {
            address: usdsTokenAddress,
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
