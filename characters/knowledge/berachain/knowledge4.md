# Distributor [​](https://docs.berachain.com/developers/contracts/distributor#distributor)

> [0xD2f19a79b026Fb636A7c300bF5947df113940761](https://berascan.com/address/0xD2f19a79b026Fb636A7c300bF5947df113940761) \| [ABI JSON](https://github.com/berachain/doc-abis/blob/main/core/Distributor.json)

The Distributor contract is responsible for distributing the block rewards from the reward controller and the reward allocation weights, to the reward allocation receivers.

_Each validator has its own reward allocation, if it does not exist, a default reward allocation is used. And if governance has not set the default reward allocation, the rewards are not minted and distributed._

## Functions [​](https://docs.berachain.com/developers/contracts/distributor#functions)

### distributeFor [​](https://docs.berachain.com/developers/contracts/distributor#distributefor)

Distribute the rewards to the reward allocation receivers.

_Permissionless function to distribute rewards by providing the necessary Merkle proofs. Reverts if the proofs are invalid._

solidity

```
function distributeFor(
    uint64 nextTimestamp,
    uint64 proposerIndex,
    bytes calldata pubkey,
    bytes32[] calldata proposerIndexProof,
    bytes32[] calldata pubkeyProof
)
    external;
```

**Parameters**

| Name                 | Type        | Description                                                                                                                                                                          |
| -------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `nextTimestamp`      | `uint64`    | The timestamp of the next beacon block to distribute for. The EIP-4788 Beacon Roots contract is queried by this key, returning the parent beacon block root from the next timestamp. |
| `proposerIndex`      | `uint64`    | The proposer index of the beacon block. This should be the validator index corresponding to the pubkey in the validator registry in the beacon state.                                |
| `pubkey`             | `bytes`     | The validator pubkey of the proposer.                                                                                                                                                |
| `proposerIndexProof` | `bytes32[]` | The Merkle proof of the proposer index in the beacon block.                                                                                                                          |
| `pubkeyProof`        | `bytes32[]` | The Merkle proof of the validator pubkey of the proposer in the beacon block.                                                                                                        |

## Events [​](https://docs.berachain.com/developers/contracts/distributor#events)

### Distributed [​](https://docs.berachain.com/developers/contracts/distributor#distributed)

solidity

```
event Distributed(bytes indexed valPubkey, uint64 indexed nextTimestamp, address indexed receiver, uint256 amount);
```

# Create2Deployer [​](https://docs.berachain.com/developers/contracts/create2#create2deployer)

> [0x4e59b44847b379578588920cA78FbF26c0B4956C](https://berascan.com/address/0x4e59b44847b379578588920cA78FbF26c0B4956C)

Can be used to deploy contracts with CREATE2 Factory.

## State Variables [​](https://docs.berachain.com/developers/contracts/create2#state-variables)

### CREATE2_FACTORY [​](https://docs.berachain.com/developers/contracts/create2#create2-factory)

\_Used by default when deploying with create2, [https://github.com/Arachnid/deterministic-deployment-proxy.\_](https://github.com/Arachnid/deterministic-deployment-proxy._)

solidity

```
address public constant _CREATE2_FACTORY = 0x4e59b44847b379578588920cA78FbF26c0B4956C;
```

## Functions [​](https://docs.berachain.com/developers/contracts/create2#functions)

### deployWithCreate2 [​](https://docs.berachain.com/developers/contracts/create2#deploywithcreate2)

_Deploys a contract using the \_CREATE2_FACTORY._

_The call data is encoded as `abi.encodePacked(salt, initCode)`._

_The return data is `abi.encodePacked(addr)`._

solidity

```
function deployWithCreate2(uint256 salt, bytes memory initCode) internal returns (address addr);
```

**Parameters**

| Name       | Type      | Description                              |
| ---------- | --------- | ---------------------------------------- |
| `salt`     | `uint256` | The salt to use for the deployment.      |
| `initCode` | `bytes`   | The init code of the contract to deploy. |

**Returns**

| Name   | Type      | Description                           |
| ------ | --------- | ------------------------------------- |
| `addr` | `address` | The address of the deployed contract. |

### deployWithCreate2IfNecessary [​](https://docs.berachain.com/developers/contracts/create2#deploywithcreate2ifnecessary)

_Deploys a contract using the \_CREATE2_FACTORY if it hasn't been deployed yet._

solidity

```
function deployWithCreate2IfNecessary(uint256 salt, bytes memory initCode) internal returns (address addr);
```

### getCreate2Address [​](https://docs.berachain.com/developers/contracts/create2#getcreate2address)

Returns the deterministic address of a contract for the given salt and init code.

_Assumes that the contract will be deployed using `deployWithCreate2`._

solidity

```
function getCreate2Address(uint256 salt, bytes memory initCode) internal pure returns (address);
```

**Parameters**

| Name       | Type      | Description                              |
| ---------- | --------- | ---------------------------------------- |
| `salt`     | `uint256` | The salt to use for the deployment.      |
| `initCode` | `bytes`   | The init code of the contract to deploy. |

**Returns**

| Name     | Type      | Description                                |
| -------- | --------- | ------------------------------------------ |
| `<none>` | `address` | addr The address of the deployed contract. |

### getCreate2Address [​](https://docs.berachain.com/developers/contracts/create2#getcreate2address-1)

Returns the deterministic address of a contract for the given salt and init code.

_Assumes that the contract will be deployed using `deployWithCreate2`._

solidity

```
function getCreate2Address(uint256 salt, bytes32 initCodeHash) internal pure returns (address);
```

**Parameters**

| Name           | Type      | Description                                  |
| -------------- | --------- | -------------------------------------------- |
| `salt`         | `uint256` | The salt to use for the deployment.          |
| `initCodeHash` | `bytes32` | The init codehash of the contract to deploy. |

**Returns**

| Name     | Type      | Description                                |
| -------- | --------- | ------------------------------------------ |
| `<none>` | `address` | addr The address of the deployed contract. |

### deployProxyWithCreate2 [​](https://docs.berachain.com/developers/contracts/create2#deployproxywithcreate2)

Deploys a ERC1967 Proxy for the already deployed implementation contract.

solidity

```
function deployProxyWithCreate2(address implementation, uint256 salt) internal returns (address);
```

**Parameters**

| Name             | Type      | Description                                                 |
| ---------------- | --------- | ----------------------------------------------------------- |
| `implementation` | `address` | The implementation contract address.                        |
| `salt`           | `uint256` | The salt that will be used for the deployment of the proxy. |

**Returns**

| Name     | Type      | Description                                                       |
| -------- | --------- | ----------------------------------------------------------------- |
| `<none>` | `address` | instance The determinitic address of the deployed proxy contract. |

### deployProxyWithCreate2IfNecessary [​](https://docs.berachain.com/developers/contracts/create2#deployproxywithcreate2ifnecessary)

Deploys a ERC1967 Proxy for the already deployed implementation contract if it hasn't been deployed yet.

solidity

```
function deployProxyWithCreate2IfNecessary(address implementation, uint256 salt) internal returns (address);
```

### getCreate2ProxyAddress [​](https://docs.berachain.com/developers/contracts/create2#getcreate2proxyaddress)

Returns the deterministic address of a ERC1967 proxy for the given implementation and salt.

_Assumes that the proxy is deployed using `deployProxyWithCreate2`._

solidity

```
function getCreate2ProxyAddress(address implementation, uint256 salt) internal pure returns (address);
```

**Parameters**

| Name             | Type      | Description                                                 |
| ---------------- | --------- | ----------------------------------------------------------- |
| `implementation` | `address` | The implementation contract address.                        |
| `salt`           | `uint256` | The salt that will be used for the deployment of the proxy. |

**Returns**

| Name     | Type      | Description                                          |
| -------- | --------- | ---------------------------------------------------- |
| `<none>` | `address` | instance The address of the deployed proxy contract. |

# BlockRewardController [​](https://docs.berachain.com/developers/contracts/block-reward-controller#blockrewardcontroller)

> [0x1AE7dD7AE06F6C58B4524d9c1f816094B1bcCD8e](https://berascan.com/address/0x1AE7dD7AE06F6C58B4524d9c1f816094B1bcCD8e) \| [ABI JSON](https://github.com/berachain/doc-abis/blob/main/core/BlockRewardController.json)

The BlockRewardController contract is responsible for managing the reward rate of BGT. Owned by the governance module, It is the only contract that can mint the BGT token.

## Functions [​](https://docs.berachain.com/developers/contracts/block-reward-controller#functions)

### baseRate [​](https://docs.berachain.com/developers/contracts/block-reward-controller#baserate)

Returns the constant base rate for BGT.

solidity

```
function baseRate() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                                                        |
| -------- | --------- | ------------------------------------------------------------------ |
| `<none>` | `uint256` | The constant base amount of BGT to be minted in the current block. |

### rewardRate [​](https://docs.berachain.com/developers/contracts/block-reward-controller#rewardrate)

Returns the reward rate for BGT.

solidity

```
function rewardRate() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                                                   |
| -------- | --------- | ------------------------------------------------------------- |
| `<none>` | `uint256` | The unscaled amount of BGT to be minted in the current block. |

### minBoostedRewardRate [​](https://docs.berachain.com/developers/contracts/block-reward-controller#minboostedrewardrate)

Returns the minimum boosted reward rate for BGT.

solidity

```
function minBoostedRewardRate() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                                                  |
| -------- | --------- | ------------------------------------------------------------ |
| `<none>` | `uint256` | The minimum amount of BGT to be minted in the current block. |

### boostMultiplier [​](https://docs.berachain.com/developers/contracts/block-reward-controller#boostmultiplier)

Returns the boost mutliplier param in the reward function.

solidity

```
function boostMultiplier() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                                      |
| -------- | --------- | ------------------------------------------------ |
| `<none>` | `uint256` | The parameter that determines the inflation cap. |

### rewardConvexity [​](https://docs.berachain.com/developers/contracts/block-reward-controller#rewardconvexity)

Returns the reward convexity param in the reward function.

solidity

```
function rewardConvexity() external view returns (int256);
```

**Returns**

| Name     | Type     | Description                                                               |
| -------- | -------- | ------------------------------------------------------------------------- |
| `<none>` | `int256` | The parameter that determines how fast the function converges to its max. |

### computeReward [​](https://docs.berachain.com/developers/contracts/block-reward-controller#computereward)

Computes the reward given specified parameters, according to the formula.

emission=\[B+max(m,(a+1)(1−11+axb)R)\]

_Returns 0 for boost == 0 even if conv == 0, since contract enforces conv > 0._

solidity

```
function computeReward(
    uint256 boostPower,
    uint256 _rewardRate,
    uint256 _boostMultiplier,
    int256 _rewardConvexity
)
    external
    pure
    returns (uint256);
```

**Parameters**

| Name               | Type      | Description                     |
| ------------------ | --------- | ------------------------------- |
| `boostPower`       | `uint256` | the normalized boost.           |
| `_rewardRate`      | `uint256` | the reward rate parameter.      |
| `_boostMultiplier` | `uint256` | the boost multiplier parameter. |
| `_rewardConvexity` | `int256`  | the reward convexity parameter. |

**Returns**

| Name     | Type      | Description        |
| -------- | --------- | ------------------ |
| `<none>` | `uint256` | the reward amount. |

### processRewards [​](https://docs.berachain.com/developers/contracts/block-reward-controller#processrewards)

Processes the rewards for the specified block and mints BGT to validator's operator and distributor.

_This function can only be called by the distributor._

_If in genesis only base rate for validators is minted._

solidity

```
function processRewards(bytes calldata pubkey, uint64 nextTimestamp, bool isReady) external returns (uint256);
```

**Parameters**

| Name            | Type     | Description                                                                     |
| --------------- | -------- | ------------------------------------------------------------------------------- |
| `pubkey`        | `bytes`  | The validator's pubkey.                                                         |
| `nextTimestamp` | `uint64` | The timestamp of the next beacon block that was processed.                      |
| `isReady`       | `bool`   | The flag to enable reward minting to distributor (true when BeraChef is ready). |

**Returns**

| Name     | Type      | Description                              |
| -------- | --------- | ---------------------------------------- |
| `<none>` | `uint256` | the amount of BGT minted to distributor. |

### setBaseRate [​](https://docs.berachain.com/developers/contracts/block-reward-controller#setbaserate)

Sets the constant base reward rate for BGT.

_This function can only be called by the owner, which is the governance address._

solidity

```
function setBaseRate(uint256 _baseRate) external;
```

**Parameters**

| Name        | Type      | Description        |
| ----------- | --------- | ------------------ |
| `_baseRate` | `uint256` | The new base rate. |

### setRewardRate [​](https://docs.berachain.com/developers/contracts/block-reward-controller#setrewardrate)

Sets the reward rate for BGT.

_This function can only be called by the owner, which is the governance address._

solidity

```
function setRewardRate(uint256 _rewardRate) external;
```

**Parameters**

| Name          | Type      | Description          |
| ------------- | --------- | -------------------- |
| `_rewardRate` | `uint256` | The new reward rate. |

### setMinBoostedRewardRate [​](https://docs.berachain.com/developers/contracts/block-reward-controller#setminboostedrewardrate)

Sets the min boosted reward rate for BGT.

_This function can only be called by the owner, which is the governance address._

solidity

```
function setMinBoostedRewardRate(uint256 _minBoostedRewardRate) external;
```

**Parameters**

| Name                    | Type      | Description                      |
| ----------------------- | --------- | -------------------------------- |
| `_minBoostedRewardRate` | `uint256` | The new min boosted reward rate. |

### setBoostMultiplier [​](https://docs.berachain.com/developers/contracts/block-reward-controller#setboostmultiplier)

Sets the boost multiplier parameter for the reward formula.

_This function can only be called by the owner, which is the governance address._

solidity

```
function setBoostMultiplier(uint256 _boostMultiplier) external;
```

**Parameters**

| Name               | Type      | Description               |
| ------------------ | --------- | ------------------------- |
| `_boostMultiplier` | `uint256` | The new boost multiplier. |

### setRewardConvexity [​](https://docs.berachain.com/developers/contracts/block-reward-controller#setrewardconvexity)

Sets the reward convexity parameter for the reward formula.

_This function can only be called by the owner, which is the governance address._

solidity

```
function setRewardConvexity(uint256 _rewardConvexity) external;
```

**Parameters**

| Name               | Type      | Description               |
| ------------------ | --------- | ------------------------- |
| `_rewardConvexity` | `uint256` | The new reward convexity. |

### setDistributor [​](https://docs.berachain.com/developers/contracts/block-reward-controller#setdistributor)

Sets the distributor contract that receives the minted BGT.

_This function can only be called by the owner, which is the governance address._

solidity

```
function setDistributor(address _distributor) external;
```

**Parameters**

| Name           | Type      | Description                   |
| -------------- | --------- | ----------------------------- |
| `_distributor` | `address` | The new distributor contract. |

## Events [​](https://docs.berachain.com/developers/contracts/block-reward-controller#events)

### BaseRateChanged [​](https://docs.berachain.com/developers/contracts/block-reward-controller#baseratechanged)

Emitted when the constant base rate has changed.

solidity

```
event BaseRateChanged(uint256 oldBaseRate, uint256 newBaseRate);
```

**Parameters**

| Name          | Type      | Description        |
| ------------- | --------- | ------------------ |
| `oldBaseRate` | `uint256` | The old base rate. |
| `newBaseRate` | `uint256` | The new base rate. |

### RewardRateChanged [​](https://docs.berachain.com/developers/contracts/block-reward-controller#rewardratechanged)

Emitted when the reward rate has changed.

solidity

```
event RewardRateChanged(uint256 oldRewardRate, uint256 newRewardRate);
```

**Parameters**

| Name            | Type      | Description          |
| --------------- | --------- | -------------------- |
| `oldRewardRate` | `uint256` | The old reward rate. |
| `newRewardRate` | `uint256` | The new reward rate. |

### MinBoostedRewardRateChanged [​](https://docs.berachain.com/developers/contracts/block-reward-controller#minboostedrewardratechanged)

Emitted when the min boosted reward rate has changed.

solidity

```
event MinBoostedRewardRateChanged(uint256 oldMinBoostedRewardRate, uint256 newMinBoostedRewardRate);
```

**Parameters**

| Name                      | Type      | Description                      |
| ------------------------- | --------- | -------------------------------- |
| `oldMinBoostedRewardRate` | `uint256` | The old min boosted reward rate. |
| `newMinBoostedRewardRate` | `uint256` | The new min boosted reward rate. |

### BoostMultiplierChanged [​](https://docs.berachain.com/developers/contracts/block-reward-controller#boostmultiplierchanged)

Emitted when the boostMultiplier parameter has changed.

solidity

```
event BoostMultiplierChanged(uint256 oldBoostMultiplier, uint256 newBoostMultiplier);
```

**Parameters**

| Name                 | Type      | Description                         |
| -------------------- | --------- | ----------------------------------- |
| `oldBoostMultiplier` | `uint256` | The old boost multiplier parameter. |
| `newBoostMultiplier` | `uint256` | The new boost multiplier parameter. |

### RewardConvexityChanged [​](https://docs.berachain.com/developers/contracts/block-reward-controller#rewardconvexitychanged)

Emitted when the reward formula convexity parameter has changed.

solidity

```
event RewardConvexityChanged(uint256 oldRewardConvexity, uint256 newRewardConvexity);
```

**Parameters**

| Name                 | Type      | Description                                 |
| -------------------- | --------- | ------------------------------------------- |
| `oldRewardConvexity` | `uint256` | The old reward formula convexity parameter. |
| `newRewardConvexity` | `uint256` | The new reward formula convexity parameter. |

### SetDistributor [​](https://docs.berachain.com/developers/contracts/block-reward-controller#setdistributor-1)

Emitted when the distributor is set.

solidity

```
event SetDistributor(address indexed rewardDistribution);
```

### BlockRewardProcessed [​](https://docs.berachain.com/developers/contracts/block-reward-controller#blockrewardprocessed)

Emitted when the rewards for the specified block have been processed.

solidity

```
event BlockRewardProcessed(bytes indexed pubkey, uint64 nextTimestamp, uint256 baseRate, uint256 rewardRate);
```

**Parameters**

| Name            | Type      | Description                                                |
| --------------- | --------- | ---------------------------------------------------------- |
| `pubkey`        | `bytes`   | The validator's pubkey.                                    |
| `nextTimestamp` | `uint64`  | The timestamp of the next beacon block that was processed. |
| `baseRate`      | `uint256` | The base amount of BGT minted to the validator's operator. |
| `rewardRate`    | `uint256` | The amount of BGT minted to the distributor.               |

# BGTStaker [​](https://docs.berachain.com/developers/contracts/bgt-staker#bgtstaker)

> [0x44F07Ce5AfeCbCC406e6beFD40cc2998eEb8c7C6](https://berascan.com/address/0x44F07Ce5AfeCbCC406e6beFD40cc2998eEb8c7C6)

A contract for staking BGT tokens without transferring them. BGT delegators stake in this contract and receive dApp fees.

## Functions [​](https://docs.berachain.com/developers/contracts/bgt-staker#functions)

### notifyRewardAmount [​](https://docs.berachain.com/developers/contracts/bgt-staker#notifyrewardamount)

Notify the staker of a new reward amount.

_Can only be called by the fee collector._

solidity

```
function notifyRewardAmount(uint256 reward) external;
```

**Parameters**

| Name     | Type      | Description                     |
| -------- | --------- | ------------------------------- |
| `reward` | `uint256` | The amount of reward to notify. |

### recoverERC20 [​](https://docs.berachain.com/developers/contracts/bgt-staker#recovererc20)

Recover ERC20 tokens.

_Revert if the tokenAddress is the reward token._

_Can only be called by the owner._

solidity

```
function recoverERC20(address tokenAddress, uint256 tokenAmount) external;
```

**Parameters**

| Name           | Type      | Description                          |
| -------------- | --------- | ------------------------------------ |
| `tokenAddress` | `address` | The address of the token to recover. |
| `tokenAmount`  | `uint256` | The amount of token to recover.      |

### setRewardsDuration [​](https://docs.berachain.com/developers/contracts/bgt-staker#setrewardsduration)

Set the rewards duration.

_Revert if the reward cycle has started._

_Can only be called by the owner._

solidity

```
function setRewardsDuration(uint256 _rewardsDuration) external;
```

**Parameters**

| Name               | Type      | Description           |
| ------------------ | --------- | --------------------- |
| `_rewardsDuration` | `uint256` | The rewards duration. |

### stake [​](https://docs.berachain.com/developers/contracts/bgt-staker#stake)

Stake BGT tokens.

_Can only be called by the BGT contract._

solidity

```
function stake(address account, uint256 amount) external;
```

**Parameters**

| Name      | Type      | Description                 |
| --------- | --------- | --------------------------- |
| `account` | `address` | The account to stake for.   |
| `amount`  | `uint256` | The amount of BGT to stake. |

### withdraw [​](https://docs.berachain.com/developers/contracts/bgt-staker#withdraw)

Withdraw BGT tokens.

_Can only be called by the BGT contract._

solidity

```
function withdraw(address account, uint256 amount) external;
```

**Parameters**

| Name      | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `account` | `address` | The account to withdraw for.   |
| `amount`  | `uint256` | The amount of BGT to withdraw. |

### getReward [​](https://docs.berachain.com/developers/contracts/bgt-staker#getreward)

Get the reward.

_Get the reward for the caller._

solidity

```
function getReward() external returns (uint256);
```

**Returns**

| Name     | Type      | Description        |
| -------- | --------- | ------------------ |
| `<none>` | `uint256` | The reward amount. |

## Events [​](https://docs.berachain.com/developers/contracts/bgt-staker#events)

### Recovered [​](https://docs.berachain.com/developers/contracts/bgt-staker#recovered)

Emitted when a token has been recovered.

solidity

```
event Recovered(address token, uint256 amount);
```

**Parameters**

| Name     | Type      | Description                        |
| -------- | --------- | ---------------------------------- |
| `token`  | `address` | The token that has been recovered. |
| `amount` | `uint256` | The amount of token recovered.     |

# BeraChef [​](https://docs.berachain.com/developers/contracts/berachef#berachef)

> [0xdf960E8F3F19C481dDE769edEDD439ea1a63426a](https://berascan.com/address/0xdf960E8F3F19C481dDE769edEDD439ea1a63426a) \| [ABI JSON](https://github.com/berachain/doc-abis/blob/main/core/BeraChef.json)

Interface of the BeraChef module for configuring where Validators are directing their `$BGT` emissions to different Reward Vaults.

## Functions [​](https://docs.berachain.com/developers/contracts/berachef#functions)

### getActiveRewardAllocation [​](https://docs.berachain.com/developers/contracts/berachef#getactiverewardallocation)

Returns the active reward allocation for validator with given pubkey

solidity

```
function getActiveRewardAllocation(bytes calldata valPubkey) external view returns (RewardAllocation memory);
```

**Parameters**

| Name        | Type    | Description             |
| ----------- | ------- | ----------------------- |
| `valPubkey` | `bytes` | The validator's pubkey. |

**Returns**

| Name     | Type               | Description                                    |
| -------- | ------------------ | ---------------------------------------------- |
| `<none>` | `RewardAllocation` | rewardAllocation The active reward allocation. |

### getQueuedRewardAllocation [​](https://docs.berachain.com/developers/contracts/berachef#getqueuedrewardallocation)

Returns the queued reward allocation for a validator with given pubkey

solidity

```
function getQueuedRewardAllocation(bytes calldata valPubkey) external view returns (RewardAllocation memory);
```

**Parameters**

| Name        | Type    | Description             |
| ----------- | ------- | ----------------------- |
| `valPubkey` | `bytes` | The validator's pubkey. |

**Returns**

| Name     | Type               | Description                                    |
| -------- | ------------------ | ---------------------------------------------- |
| `<none>` | `RewardAllocation` | rewardAllocation The queued reward allocation. |

### getSetActiveRewardAllocation [​](https://docs.berachain.com/developers/contracts/berachef#getsetactiverewardallocation)

Returns the active reward allocation set by the validator with given pubkey.

_This will return active reward allocation set by validators even if its not valid._

solidity

```
function getSetActiveRewardAllocation(bytes calldata valPubkey) external view returns (RewardAllocation memory);
```

**Parameters**

| Name        | Type    | Description             |
| ----------- | ------- | ----------------------- |
| `valPubkey` | `bytes` | The validator's pubkey. |

**Returns**

| Name     | Type               | Description                             |
| -------- | ------------------ | --------------------------------------- |
| `<none>` | `RewardAllocation` | rewardAllocation The reward allocation. |

### getDefaultRewardAllocation [​](https://docs.berachain.com/developers/contracts/berachef#getdefaultrewardallocation)

Returns the default reward allocation for validators that do not have a reward allocation.

solidity

```
function getDefaultRewardAllocation() external view returns (RewardAllocation memory);
```

**Returns**

| Name     | Type               | Description                                     |
| -------- | ------------------ | ----------------------------------------------- |
| `<none>` | `RewardAllocation` | rewardAllocation The default reward allocation. |

### isQueuedRewardAllocationReady [​](https://docs.berachain.com/developers/contracts/berachef#isqueuedrewardallocationready)

Returns the status of whether a queued reward allocation is ready to be activated.

solidity

```
function isQueuedRewardAllocationReady(bytes calldata valPubkey, uint256 blockNumber) external view returns (bool);
```

**Parameters**

| Name          | Type      | Description                     |
| ------------- | --------- | ------------------------------- |
| `valPubkey`   | `bytes`   | The validator's pubkey.         |
| `blockNumber` | `uint256` | The block number to be queried. |

**Returns**

| Name     | Type   | Description                                                                             |
| -------- | ------ | --------------------------------------------------------------------------------------- |
| `<none>` | `bool` | isReady True if the queued reward allocation is ready to be activated, false otherwise. |

### isReady [​](https://docs.berachain.com/developers/contracts/berachef#isready)

Returns the status of whether the BeraChef contract is ready to be used.

_This function should be used by all contracts that depend on a system call._

_This will return false if the governance module has not set a default reward allocation yet._

solidity

```
function isReady() external view returns (bool);
```

**Returns**

| Name     | Type   | Description                                                        |
| -------- | ------ | ------------------------------------------------------------------ |
| `<none>` | `bool` | isReady True if the BeraChef is ready to be used, false otherwise. |

### setMaxNumWeightsPerRewardAllocation [​](https://docs.berachain.com/developers/contracts/berachef#setmaxnumweightsperrewardallocation)

Sets the maximum number of weights per reward allocation.

solidity

```
function setMaxNumWeightsPerRewardAllocation(uint8 _maxNumWeightsPerRewardAllocation) external;
```

### setRewardAllocationBlockDelay [​](https://docs.berachain.com/developers/contracts/berachef#setrewardallocationblockdelay)

Sets the delay in blocks before a new reward allocation can be queued.

solidity

```
function setRewardAllocationBlockDelay(uint64 _rewardAllocationBlockDelay) external;
```

### setVaultWhitelistedStatus [​](https://docs.berachain.com/developers/contracts/berachef#setvaultwhitelistedstatus)

Updates the vault's whitelisted status

The caller of this function must be the governance module account.

solidity

```
function setVaultWhitelistedStatus(address receiver, bool isWhitelisted, string memory metadata) external;
```

**Parameters**

| Name            | Type      | Description                                                                       |
| --------------- | --------- | --------------------------------------------------------------------------------- |
| `receiver`      | `address` | The address to remove or add as whitelisted vault.                                |
| `isWhitelisted` | `bool`    | The whitelist status; true if the receiver is being whitelisted, false otherwise. |
| `metadata`      | `string`  | The metadata of the vault.                                                        |

### updateWhitelistedVaultMetadata [​](https://docs.berachain.com/developers/contracts/berachef#updatewhitelistedvaultmetadata)

Updates the metadata of a whitelisted vault, reverts if vault is not whitelisted.

The caller of this function must be the governance module account.

solidity

```
function updateWhitelistedVaultMetadata(address receiver, string memory metadata) external;
```

**Parameters**

| Name       | Type      | Description                                                                    |
| ---------- | --------- | ------------------------------------------------------------------------------ |
| `receiver` | `address` | The address of the whitelisted vault.                                          |
| `metadata` | `string`  | The metadata of the vault, to associate info with the vault in the events log. |

### setDefaultRewardAllocation [​](https://docs.berachain.com/developers/contracts/berachef#setdefaultrewardallocation)

Sets the default reward allocation for validators that do not have a reward allocation.

_The caller of this function must be the governance module account._

solidity

```
function setDefaultRewardAllocation(RewardAllocation calldata rewardAllocation) external;
```

**Parameters**

| Name               | Type               | Description                    |
| ------------------ | ------------------ | ------------------------------ |
| `rewardAllocation` | `RewardAllocation` | The default reward allocation. |

### queueNewRewardAllocation [​](https://docs.berachain.com/developers/contracts/berachef#queuenewrewardallocation)

Add a new reward allocation to the queue for validator with given pubkey. Does not allow overwriting of existing queued reward allocation.

_The weights of the reward allocation must add up to 100% or 1e4. Only whitelisted pools may be used as well._

solidity

```
function queueNewRewardAllocation(bytes calldata valPubkey, uint64 startBlock, Weight[] calldata weights) external;
```

**Parameters**

| Name         | Type       | Description                                            |
| ------------ | ---------- | ------------------------------------------------------ |
| `valPubkey`  | `bytes`    | The validator's pubkey.                                |
| `startBlock` | `uint64`   | The block that the reward allocation goes into effect. |
| `weights`    | `Weight[]` | The weights of the reward allocation.                  |

### activateReadyQueuedRewardAllocation [​](https://docs.berachain.com/developers/contracts/berachef#activatereadyqueuedrewardallocation)

Activates the queued reward allocation for a validator if its ready for the current block.

_Should be called by the distribution contract._

solidity

```
function activateReadyQueuedRewardAllocation(bytes calldata valPubkey) external;
```

**Parameters**

| Name        | Type    | Description             |
| ----------- | ------- | ----------------------- |
| `valPubkey` | `bytes` | The validator's pubkey. |

## Events [​](https://docs.berachain.com/developers/contracts/berachef#events)

### MaxNumWeightsPerRewardAllocationSet [​](https://docs.berachain.com/developers/contracts/berachef#maxnumweightsperrewardallocationset)

Emitted when the maximum number of weights per reward allocation has been set.

solidity

```
event MaxNumWeightsPerRewardAllocationSet(uint8 maxNumWeightsPerRewardAllocation);
```

**Parameters**

| Name                               | Type    | Description                                          |
| ---------------------------------- | ------- | ---------------------------------------------------- |
| `maxNumWeightsPerRewardAllocation` | `uint8` | The maximum number of weights per reward allocation. |

### RewardAllocationBlockDelaySet [​](https://docs.berachain.com/developers/contracts/berachef#rewardallocationblockdelayset)

Emitted when the delay in blocks before a new reward allocation can go into effect has been set.

solidity

```
event RewardAllocationBlockDelaySet(uint64 rewardAllocationBlockDelay);
```

**Parameters**

| Name                         | Type     | Description                                                            |
| ---------------------------- | -------- | ---------------------------------------------------------------------- |
| `rewardAllocationBlockDelay` | `uint64` | The delay in blocks before a new reward allocation can go into effect. |

### VaultWhitelistedStatusUpdated [​](https://docs.berachain.com/developers/contracts/berachef#vaultwhitelistedstatusupdated)

Emitted when the vault's whitelisted status have been updated.

solidity

```
event VaultWhitelistedStatusUpdated(address indexed receiver, bool indexed isWhitelisted, string metadata);
```

**Parameters**

| Name            | Type      | Description                                                                       |
| --------------- | --------- | --------------------------------------------------------------------------------- |
| `receiver`      | `address` | The address to remove or add as whitelisted vault.                                |
| `isWhitelisted` | `bool`    | The whitelist status; true if the receiver is being whitelisted, false otherwise. |
| `metadata`      | `string`  | The metadata of the vault.                                                        |

### WhitelistedVaultMetadataUpdated [​](https://docs.berachain.com/developers/contracts/berachef#whitelistedvaultmetadataupdated)

Emitted when the metadata of a whitelisted vault has been updated.

solidity

```
event WhitelistedVaultMetadataUpdated(address indexed receiver, string metadata);
```

**Parameters**

| Name       | Type      | Description                           |
| ---------- | --------- | ------------------------------------- |
| `receiver` | `address` | The address of the whitelisted vault. |
| `metadata` | `string`  | The metadata of the vault.            |

### QueueRewardAllocation [​](https://docs.berachain.com/developers/contracts/berachef#queuerewardallocation)

Emitted when a new reward allocation has been queued.

solidity

```
event QueueRewardAllocation(bytes indexed valPubkey, uint64 startBlock, Weight[] weights);
```

**Parameters**

| Name         | Type       | Description                                            |
| ------------ | ---------- | ------------------------------------------------------ |
| `valPubkey`  | `bytes`    | The validator's pubkey.                                |
| `startBlock` | `uint64`   | The block that the reward allocation goes into effect. |
| `weights`    | `Weight[]` | The weights of the reward allocation.                  |

### ActivateRewardAllocation [​](https://docs.berachain.com/developers/contracts/berachef#activaterewardallocation)

Emitted when a new reward allocation has been activated.

solidity

```
event ActivateRewardAllocation(bytes indexed valPubkey, uint64 startBlock, Weight[] weights);
```

**Parameters**

| Name         | Type       | Description                                            |
| ------------ | ---------- | ------------------------------------------------------ |
| `valPubkey`  | `bytes`    | The validator's pubkey.                                |
| `startBlock` | `uint64`   | The block that the reward allocation goes into effect. |
| `weights`    | `Weight[]` | The weights of the reward allocation.                  |

### SetDefaultRewardAllocation [​](https://docs.berachain.com/developers/contracts/berachef#setdefaultrewardallocation-1)

Emitted when the governance module has set a new default reward allocation.

solidity

```
event SetDefaultRewardAllocation(RewardAllocation rewardAllocation);
```

**Parameters**

| Name               | Type               | Description                    |
| ------------------ | ------------------ | ------------------------------ |
| `rewardAllocation` | `RewardAllocation` | The default reward allocation. |

## Structs [​](https://docs.berachain.com/developers/contracts/berachef#structs)

### RewardAllocation [​](https://docs.berachain.com/developers/contracts/berachef#rewardallocation)

Represents a RewardAllocation entry

solidity

```
struct RewardAllocation {
    uint64 startBlock;
    Weight[] weights;
}
```

### Weight [​](https://docs.berachain.com/developers/contracts/berachef#weight)

Represents a Weight entry

solidity

```
struct Weight {
    address receiver;
    uint96 percentageNumerator;
}
```

# BeaconDeposit [​](https://docs.berachain.com/developers/contracts/beacondeposit#beacondeposit)

> [0x4242424242424242424242424242424242424242](https://berascan.com/address/0x4242424242424242424242424242424242424242) \| [ABI JSON](https://github.com/berachain/doc-abis/blob/main/core/BeaconDeposit.json)

The contract handling validators deposits. Its events are used by the beacon chain to manage the staking process.

## Functions [​](https://docs.berachain.com/developers/contracts/beacondeposit#functions)

### getOperator [​](https://docs.berachain.com/developers/contracts/beacondeposit#getoperator)

Get the operator address for a given pubkey.

_Returns zero address if the pubkey is not registered._

solidity

```
function getOperator(bytes calldata pubkey) external view returns (address);
```

**Parameters**

| Name     | Type    | Description                  |
| -------- | ------- | ---------------------------- |
| `pubkey` | `bytes` | The pubkey of the validator. |

**Returns**

| Name     | Type      | Description                                |
| -------- | --------- | ------------------------------------------ |
| `<none>` | `address` | The operator address for the given pubkey. |

### deposit [​](https://docs.berachain.com/developers/contracts/beacondeposit#deposit)

Submit a deposit message to the Beaconchain.

This will be used to create a new validator or to top up an existing one, increasing stake.

_emits the Deposit event upon successful deposit._

_Reverts if the operator is already set and caller passed non-zero operator._

solidity

```
function deposit(
    bytes calldata pubkey,
    bytes calldata credentials,
    bytes calldata signature,
    address operator
)
    external
    payable;
```

**Parameters**

| Name          | Type      | Description                                              |
| ------------- | --------- | -------------------------------------------------------- |
| `pubkey`      | `bytes`   | is the consensus public key of the validator.            |
| `credentials` | `bytes`   | is the withdrawal credentials of the validator.          |
| `signature`   | `bytes`   | is the signature used only on the first deposit.         |
| `operator`    | `address` | is the address of the operator used for `POL` mechanics. |

### requestOperatorChange [​](https://docs.berachain.com/developers/contracts/beacondeposit#requestoperatorchange)

Request to change the operator of a validator.

_Only the current operator can request a change._

solidity

```
function requestOperatorChange(bytes calldata pubkey, address newOperator) external;
```

**Parameters**

| Name          | Type      | Description                  |
| ------------- | --------- | ---------------------------- |
| `pubkey`      | `bytes`   | The pubkey of the validator. |
| `newOperator` | `address` | The new operator address.    |

### cancelOperatorChange [​](https://docs.berachain.com/developers/contracts/beacondeposit#canceloperatorchange)

Cancel the operator change of a validator.

_Only the current operator can cancel the change._

solidity

```
function cancelOperatorChange(bytes calldata pubkey) external;
```

**Parameters**

| Name     | Type    | Description                  |
| -------- | ------- | ---------------------------- |
| `pubkey` | `bytes` | The pubkey of the validator. |

### acceptOperatorChange [​](https://docs.berachain.com/developers/contracts/beacondeposit#acceptoperatorchange)

Accept the operator change of a validator.

_Only the new operator can accept the change._

_Reverts if the queue delay has not passed._

solidity

```
function acceptOperatorChange(bytes calldata pubkey) external;
```

**Parameters**

| Name     | Type    | Description                  |
| -------- | ------- | ---------------------------- |
| `pubkey` | `bytes` | The pubkey of the validator. |

## Events [​](https://docs.berachain.com/developers/contracts/beacondeposit#events)

### Deposit [​](https://docs.berachain.com/developers/contracts/beacondeposit#deposit-1)

_Emitted when a deposit is made, which could mean a new validator or a top up of an existing one._

solidity

```
event Deposit(bytes pubkey, bytes credentials, uint64 amount, bytes signature, uint64 index);
```

**Parameters**

| Name          | Type     | Description                                     |
| ------------- | -------- | ----------------------------------------------- |
| `pubkey`      | `bytes`  | the public key of the validator.                |
| `credentials` | `bytes`  | is the withdrawal credentials of the validator. |
| `amount`      | `uint64` | the amount of stake being deposited, in Gwei.   |
| `signature`   | `bytes`  | the signature of the deposit message.           |
| `index`       | `uint64` | the index of the deposit.                       |

### OperatorChangeQueued [​](https://docs.berachain.com/developers/contracts/beacondeposit#operatorchangequeued)

Emitted when the operator change of a validator is queued.

solidity

```
event OperatorChangeQueued(
    bytes indexed pubkey, address queuedOperator, address currentOperator, uint256 queuedTimestamp
);
```

**Parameters**

| Name              | Type      | Description                               |
| ----------------- | --------- | ----------------------------------------- |
| `pubkey`          | `bytes`   | The pubkey of the validator.              |
| `queuedOperator`  | `address` | The new queued operator address.          |
| `currentOperator` | `address` | The current operator address.             |
| `queuedTimestamp` | `uint256` | The timestamp when the change was queued. |

### OperatorChangeCancelled [​](https://docs.berachain.com/developers/contracts/beacondeposit#operatorchangecancelled)

Emitted when the operator change of a validator is cancelled.

solidity

```
event OperatorChangeCancelled(bytes indexed pubkey);
```

**Parameters**

| Name     | Type    | Description                  |
| -------- | ------- | ---------------------------- |
| `pubkey` | `bytes` | The pubkey of the validator. |

### OperatorUpdated [​](https://docs.berachain.com/developers/contracts/beacondeposit#operatorupdated)

Emitted when the operator of a validator is updated.

solidity

```
event OperatorUpdated(bytes indexed pubkey, address newOperator, address previousOperator);
```

**Parameters**

| Name               | Type      | Description                    |
| ------------------ | --------- | ------------------------------ |
| `pubkey`           | `bytes`   | The pubkey of the validator.   |
| `newOperator`      | `address` | The new operator address.      |
| `previousOperator` | `address` | The previous operator address. |
