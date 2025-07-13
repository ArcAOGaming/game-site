/**
 * ETH Staking Hooks Documentation
 * 
 * These hook interfaces define the expected structure for wagmi hooks that would be used
 * to interact with the ETH staking contract. They are not actual hook implementations,
 * but rather TypeScript interfaces that describe what the hooks should return.
 * 
 * In a React component, you would use these with wagmi hooks like:
 * 
 * Reading Contract Data:
 * - useReadContract() - for reading contract state (staked balance, rewards, etc.)
 * - useBalance() - for reading ETH balance
 * 
 * Writing to Contract:
 * - useWriteContract() - for executing contract functions (stake, unstake, claim)
 * - useWaitForTransactionReceipt() - for waiting for transaction confirmation
 * 
 * Example Usage:
 * ```typescript
 * import { useReadContract, useWriteContract } from 'wagmi';
 * import { ethStaking } from '../utils/AO/ETHStaking';
 * 
 * function StakingComponent() {
 *   const { address } = useAccount();
 *   
 *   // Read staked balance
 *   const { data: stakedBalance } = useReadContract(
 *     ethStaking.createStakedBalanceConfig(address)
 *   );
 *   
 *   // Write contract for staking
 *   const { writeContract: stake } = useWriteContract();
 *   
 *   const handleStake = () => {
 *     stake(ethStaking.createStakeConfig('1.0')); // Stake 1 ETH
 *   };
 * }
 * ```
 * 
 * The hooks provide:
 * 1. Type safety for contract interactions
 * 2. Loading states for UI feedback
 * 3. Error handling for failed transactions
 * 4. Automatic refetching of data when needed
 * 5. Optimistic updates and cache management
 */

export const HOOKS_DOCUMENTATION = {
    purpose: "Define interfaces for wagmi hooks used with ETH staking contract",
    usage: "Import and use with wagmi's useReadContract and useWriteContract",
    benefits: [
        "Type safety",
        "Loading states",
        "Error handling",
        "Automatic refetching",
        "Cache management"
    ]
} as const;
