// Distribution contract ABI (used for both ETH and DAI staking)
export const DISTRIBUTION_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "previousAdmin",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "newAdmin",
                "type": "address"
            }
        ],
        "name": "AdminChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "beacon",
                "type": "address"
            }
        ],
        "name": "BeaconUpgraded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "version",
                "type": "uint8"
            }
        ],
        "name": "Initialized",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "OverplusBridged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "poolId",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "uint128",
                        "name": "payoutStart",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "decreaseInterval",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "withdrawLockPeriod",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "claimLockPeriod",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "withdrawLockPeriodAfterStake",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint256",
                        "name": "initialReward",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardDecrease",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minimalStake",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isPublic",
                        "type": "bool"
                    }
                ],
                "indexed": false,
                "internalType": "struct IDistribution.Pool",
                "name": "pool",
                "type": "tuple"
            }
        ],
        "name": "PoolCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "poolId",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "uint128",
                        "name": "payoutStart",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "decreaseInterval",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "withdrawLockPeriod",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "claimLockPeriod",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "withdrawLockPeriodAfterStake",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint256",
                        "name": "initialReward",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardDecrease",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minimalStake",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isPublic",
                        "type": "bool"
                    }
                ],
                "indexed": false,
                "internalType": "struct IDistribution.Pool",
                "name": "pool",
                "type": "tuple"
            }
        ],
        "name": "PoolEdited",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "implementation",
                "type": "address"
            }
        ],
        "name": "Upgraded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "poolId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "UserClaimed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "poolId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "arweaveAddress",
                "type": "bytes32"
            }
        ],
        "name": "UserStaked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "poolId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "arweaveAddress",
                "type": "bytes32"
            }
        ],
        "name": "UserWithdrawn",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "depositToken_",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "aoDistributionWallet_",
                "type": "address"
            },
            {
                "components": [
                    {
                        "internalType": "uint128",
                        "name": "payoutStart",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "decreaseInterval",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "withdrawLockPeriod",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "claimLockPeriod",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "withdrawLockPeriodAfterStake",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint256",
                        "name": "initialReward",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardDecrease",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minimalStake",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isPublic",
                        "type": "bool"
                    }
                ],
                "internalType": "struct IDistribution.Pool[]",
                "name": "poolsInfo_",
                "type": "tuple[]"
            },
            {
                "internalType": "address",
                "name": "refunderAddress_",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "fallbackAddress_",
                "type": "address"
            }
        ],
        "name": "Distribution_init",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "aoDistributionWallet",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "bridgeOverplus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint128",
                        "name": "payoutStart",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "decreaseInterval",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "withdrawLockPeriod",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "claimLockPeriod",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "withdrawLockPeriodAfterStake",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint256",
                        "name": "initialReward",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardDecrease",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minimalStake",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isPublic",
                        "type": "bool"
                    }
                ],
                "internalType": "struct IDistribution.Pool",
                "name": "pool_",
                "type": "tuple"
            }
        ],
        "name": "createPool",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "depositToken",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "poolId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "ejectStakedFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "poolId_",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "user_",
                "type": "address"
            }
        ],
        "name": "getCurrentUserReward",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "poolId_",
                "type": "uint256"
            },
            {
                "internalType": "uint128",
                "name": "startTime_",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "endTime_",
                "type": "uint128"
            }
        ],
        "name": "getPeriodReward",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isNotUpgradeable",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "overplus",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "pools",
        "outputs": [
            {
                "internalType": "uint128",
                "name": "payoutStart",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "decreaseInterval",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "withdrawLockPeriod",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "claimLockPeriod",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "withdrawLockPeriodAfterStake",
                "type": "uint128"
            },
            {
                "internalType": "uint256",
                "name": "initialReward",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "rewardDecrease",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "minimalStake",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isPublic",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "poolsData",
        "outputs": [
            {
                "internalType": "uint128",
                "name": "lastUpdate",
                "type": "uint128"
            },
            {
                "internalType": "uint256",
                "name": "rate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalDeposited",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "proxiableUUID",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "removeUpgradeability",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "poolId_",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount_",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "arweaveAddress_",
                "type": "bytes32"
            }
        ],
        "name": "stake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalDepositedInPublicPools",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newImplementation",
                "type": "address"
            }
        ],
        "name": "upgradeTo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newImplementation",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "upgradeToAndCall",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "usersData",
        "outputs": [
            {
                "internalType": "uint128",
                "name": "lastStake",
                "type": "uint128"
            },
            {
                "internalType": "uint256",
                "name": "deposited",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "rate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "pendingRewards",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "poolId_",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount_",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "arweaveAddress_",
                "type": "bytes32"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const;

// Custom proxy contract ABI provided by user
export const PROXY_ABI = [
    {
        inputs: [
            { internalType: 'address', name: '_logic', type: 'address' },
            { internalType: 'bytes', name: '_data', type: 'bytes' }
        ],
        stateMutability: 'payable',
        type: 'constructor'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: 'address', name: 'previousAdmin', type: 'address' },
            { indexed: false, internalType: 'address', name: 'newAdmin', type: 'address' }
        ],
        name: 'AdminChanged',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'beacon', type: 'address' }
        ],
        name: 'BeaconUpgraded',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'implementation', type: 'address' }
        ],
        name: 'Upgraded',
        type: 'event'
    },
    { stateMutability: 'payable', type: 'fallback' },
    { stateMutability: 'payable', type: 'receive' }
] as const;
