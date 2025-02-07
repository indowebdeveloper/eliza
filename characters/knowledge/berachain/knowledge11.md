## Events [​](https://docs.berachain.com/developers/contracts/honey-factory#events)

### MintRateSet [​](https://docs.berachain.com/developers/contracts/honey-factory#mintrateset)

Emitted when a mint rate is set for an asset.

solidity

```
event MintRateSet(address indexed asset, uint256 rate);
```

### RedeemRateSet [​](https://docs.berachain.com/developers/contracts/honey-factory#redeemrateset)

Emitted when a redemption rate is set for an asset.

solidity

```
event RedeemRateSet(address indexed asset, uint256 rate);
```

### POLFeeCollectorFeeRateSet [​](https://docs.berachain.com/developers/contracts/honey-factory#polfeecollectorfeerateset)

Emitted when the POLFeeCollector fee rate is set.

solidity

```
event POLFeeCollectorFeeRateSet(uint256 rate);
```

### HoneyMinted [​](https://docs.berachain.com/developers/contracts/honey-factory#honeyminted)

Emitted when honey is minted

solidity

```
event HoneyMinted(
    address indexed from, address indexed to, address indexed asset, uint256 assetAmount, uint256 mintAmount
);
```

**Parameters**

| Name          | Type      | Description                                            |
| ------------- | --------- | ------------------------------------------------------ |
| `from`        | `address` | The account that supplied assets for the minted honey. |
| `to`          | `address` | The account that received the honey.                   |
| `asset`       | `address` | The asset used to mint the honey.                      |
| `assetAmount` | `uint256` | The amount of assets supplied for minting the honey.   |
| `mintAmount`  | `uint256` | The amount of honey that was minted.                   |

### HoneyRedeemed [​](https://docs.berachain.com/developers/contracts/honey-factory#honeyredeemed)

Emitted when honey is redeemed

solidity

```
event HoneyRedeemed(
    address indexed from, address indexed to, address indexed asset, uint256 assetAmount, uint256 redeemAmount
);
```

**Parameters**

| Name           | Type      | Description                                            |
| -------------- | --------- | ------------------------------------------------------ |
| `from`         | `address` | The account that redeemed the honey.                   |
| `to`           | `address` | The account that received the assets.                  |
| `asset`        | `address` | The asset for redeeming the honey.                     |
| `assetAmount`  | `uint256` | The amount of assets received for redeeming the honey. |
| `redeemAmount` | `uint256` | The amount of honey that was redeemed.                 |

### BasketModeForced [​](https://docs.berachain.com/developers/contracts/honey-factory#basketmodeforced)

Emitted when the basked mode is forced.

solidity

```
event BasketModeForced(bool forced);
```

**Parameters**

| Name     | Type   | Description                                     |
| -------- | ------ | ----------------------------------------------- |
| `forced` | `bool` | The flag that represent the forced basket mode. |

### DepegOffsetsSet [​](https://docs.berachain.com/developers/contracts/honey-factory#depegoffsetsset)

Emitted when the depeg offsets are changed.

solidity

```
event DepegOffsetsSet(address asset, uint256 lower, uint256 upper);
```

**Parameters**

| Name    | Type      | Description                                   |
| ------- | --------- | --------------------------------------------- |
| `asset` | `address` | The asset that the depeg offsets are changed. |
| `lower` | `uint256` | The lower depeg offset.                       |
| `upper` | `uint256` | The upper depeg offset.                       |

### LiquidationStatusSet [​](https://docs.berachain.com/developers/contracts/honey-factory#liquidationstatusset)

Emitted when the liquidation is enabled or disabled.

solidity

```
event LiquidationStatusSet(bool enabled);
```

**Parameters**

| Name      | Type   | Description                                     |
| --------- | ------ | ----------------------------------------------- |
| `enabled` | `bool` | The flag that represent the liquidation status. |

### ReferenceCollateralSet [​](https://docs.berachain.com/developers/contracts/honey-factory#referencecollateralset)

Emitted when the reference collateral is set.

solidity

```
event ReferenceCollateralSet(address old, address asset);
```

**Parameters**

| Name    | Type      | Description                   |
| ------- | --------- | ----------------------------- |
| `old`   | `address` | The old reference collateral. |
| `asset` | `address` | The new reference collateral. |

### RecapitalizeBalanceThresholdSet [​](https://docs.berachain.com/developers/contracts/honey-factory#recapitalizebalancethresholdset)

Emitted when the recapitalize balance threshold is set.

solidity

```
event RecapitalizeBalanceThresholdSet(address asset, uint256 target);
```

**Parameters**

| Name     | Type      | Description                                               |
| -------- | --------- | --------------------------------------------------------- |
| `asset`  | `address` | The asset that the recapitalize balance threshold is set. |
| `target` | `uint256` | The target balance threshold.                             |

### MinSharesToRecapitalizeSet [​](https://docs.berachain.com/developers/contracts/honey-factory#minsharestorecapitalizeset)

Emitted when the min shares to recapitalize is set.

solidity

```
event MinSharesToRecapitalizeSet(uint256 minShareAmount);
```

**Parameters**

| Name             | Type      | Description                     |
| ---------------- | --------- | ------------------------------- |
| `minShareAmount` | `uint256` | The min shares to recapitalize. |

### MaxFeedDelaySet [​](https://docs.berachain.com/developers/contracts/honey-factory#maxfeeddelayset)

Emitted when the max feed delay is set.

solidity

```
event MaxFeedDelaySet(uint256 maxFeedDelay);
```

**Parameters**

| Name           | Type      | Description         |
| -------------- | --------- | ------------------- |
| `maxFeedDelay` | `uint256` | The max feed delay. |

### LiquidationRateSet [​](https://docs.berachain.com/developers/contracts/honey-factory#liquidationrateset)

Emitted when the liquidation rate is set.

solidity

```
event LiquidationRateSet(address asset, uint256 rate);
```

**Parameters**

| Name    | Type      | Description                                 |
| ------- | --------- | ------------------------------------------- |
| `asset` | `address` | The asset that the liquidation rate is set. |
| `rate`  | `uint256` | The liquidation rate.                       |

### GlobalCapSet [​](https://docs.berachain.com/developers/contracts/honey-factory#globalcapset)

Emitted when the global cap is set.

solidity

```
event GlobalCapSet(uint256 globalCap);
```

**Parameters**

| Name        | Type      | Description     |
| ----------- | --------- | --------------- |
| `globalCap` | `uint256` | The global cap. |

### RelativeCapSet [​](https://docs.berachain.com/developers/contracts/honey-factory#relativecapset)

Emitted when the relative cap is set.

solidity

```
event RelativeCapSet(address asset, uint256 relativeCap);
```

**Parameters**

| Name          | Type      | Description                             |
| ------------- | --------- | --------------------------------------- |
| `asset`       | `address` | The asset that the relative cap is set. |
| `relativeCap` | `uint256` | The relative cap.                       |

### Liquidated [​](https://docs.berachain.com/developers/contracts/honey-factory#liquidated)

Emitted when the liquidate is performed.

solidity

```
event Liquidated(address badAsset, address goodAsset, uint256 amount, address sender);
```

**Parameters**

| Name        | Type      | Description                                 |
| ----------- | --------- | ------------------------------------------- |
| `badAsset`  | `address` | The bad asset that is liquidated.           |
| `goodAsset` | `address` | The good asset that is provided.            |
| `amount`    | `uint256` | The amount of good asset provided.          |
| `sender`    | `address` | The account that performed the liquidation. |

### Recapitalized [​](https://docs.berachain.com/developers/contracts/honey-factory#recapitalized)

Emitted when the collateral vault is recapitalized.

solidity

```
event Recapitalized(address asset, uint256 amount, address sender);
```

**Parameters**

| Name     | Type      | Description                                      |
| -------- | --------- | ------------------------------------------------ |
| `asset`  | `address` | The asset that is recapitalized.                 |
| `amount` | `uint256` | The amount of asset provided.                    |
| `sender` | `address` | The account that performed the recapitalization. |

# HoneyFactoryReader [​](https://docs.berachain.com/developers/contracts/honey-factory-reader#honeyfactoryreader)

> [0x285e147060CDc5ba902786d3A471224ee6cE0F91](https://berascan.com/address/0x285e147060CDc5ba902786d3A471224ee6cE0F91) \| [ABI JSON](https://github.com/berachain/doc-abis/blob/main/core/HoneyFactoryReader.json)

The Honey Factory Reader contract is responsible for providing previews of minting/redeeming HONEY.

## Functions [​](https://docs.berachain.com/developers/contracts/honey-factory-reader#functions)

### previewMint [​](https://docs.berachain.com/developers/contracts/honey-factory-reader#previewmint)

Get the amount of Honey that can be minted with the given ERC20.

solidity

```
function previewMint(address asset, uint256 amount) external view returns (uint256 honeyAmount);
```

**Parameters**

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `asset`  | `address` | The ERC20 to mint with.           |
| `amount` | `uint256` | The amount of ERC20 to mint with. |

**Returns**

| Name          | Type      | Description                             |
| ------------- | --------- | --------------------------------------- |
| `honeyAmount` | `uint256` | The amount of Honey that can be minted. |

### previewRedeem [​](https://docs.berachain.com/developers/contracts/honey-factory-reader#previewredeem)

Get the amount of ERC20 that can be redeemed with the given Honey.

solidity

```
function previewRedeem(address asset, uint256 honeyAmount) external view returns (uint256);
```

**Parameters**

| Name          | Type      | Description                    |
| ------------- | --------- | ------------------------------ |
| `asset`       | `address` | The ERC20 to redeem.           |
| `honeyAmount` | `uint256` | The amount of Honey to redeem. |

**Returns**

| Name     | Type      | Description                               |
| -------- | --------- | ----------------------------------------- |
| `<none>` | `uint256` | The amount of ERC20 that can be redeemed. |

### previewRequiredCollateral [​](https://docs.berachain.com/developers/contracts/honey-factory-reader#previewrequiredcollateral)

Previews the amount of ERC20 required to mint an exact amount of honey.

solidity

```
function previewRequiredCollateral(
    address asset,
    uint256 exactHoneyAmount
)
    external
    view
    returns (uint256[] memory res);
```

**Parameters**

| Name               | Type      | Description                        |
| ------------------ | --------- | ---------------------------------- |
| `asset`            | `address` | The ERC20 asset to use.            |
| `exactHoneyAmount` | `uint256` | The exact amount of honey to mint. |

### previewRedeemBasketMode [​](https://docs.berachain.com/developers/contracts/honey-factory-reader#previewredeembasketmode)

Previews the amount of ERC20 assets that can be redeemed from honey.

solidity

```
function previewRedeemBasketMode(uint256 honeyAmount) external view returns (uint256[] memory res);
```

**Parameters**

| Name          | Type      | Description                                           |
| ------------- | --------- | ----------------------------------------------------- |
| `honeyAmount` | `uint256` | The amount of honey to use for redeeming collaterals. |

**Returns**

| Name  | Type        | Description                                      |
| ----- | ----------- | ------------------------------------------------ |
| `res` | `uint256[]` | The amount of ERC20 assets that can be redeemed. |

### previewHoneyToRedeem [​](https://docs.berachain.com/developers/contracts/honey-factory-reader#previewhoneytoredeem)

Previews the amount of honey required to redeem an exact amount of target ERC20 asset.

solidity

```
function previewHoneyToRedeem(address asset, uint256 exactAmount) external view returns (uint256);
```

**Parameters**

| Name          | Type      | Description                            |
| ------------- | --------- | -------------------------------------- |
| `asset`       | `address` | The ERC20 asset to receive.            |
| `exactAmount` | `uint256` | The exact amount of assets to receive. |

# BerachainGovernance [​](https://docs.berachain.com/developers/contracts/governance#berachaingovernance)

[0x4f4A5c2194B8e856b7a05B348F6ba3978FB6f6D5](https://berascan.com/address/0x4f4A5c2194B8e856b7a05B348F6ba3978FB6f6D5)

The Berachain Governance contract extends [OpenZeppelin's governor contracts](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/governance). It uses the `$BGT` token as its governance token, which determines voting power in the governance system. Users must hold `$BGT` tokens to participate in governance activities such as creating proposals and voting.

## State Variables [​](https://docs.berachain.com/developers/contracts/governance#state-variables)

### VOTING_DELAY [​](https://docs.berachain.com/developers/contracts/governance#voting-delay)

The delay between when a proposal is created and when voting begins.

solidity

```
uint48 internal constant VOTING_DELAY = 6 hours;
```

### VOTING_PERIOD [​](https://docs.berachain.com/developers/contracts/governance#voting-period)

The duration of voting on a proposal.

solidity

```
uint32 internal constant VOTING_PERIOD = 6 hours;
```

### BLOCK_INTERVAL [​](https://docs.berachain.com/developers/contracts/governance#block-interval)

The time interval between blocks.

solidity

```
uint32 internal constant BLOCK_INTERVAL = 4 seconds;
```

## Enums [​](https://docs.berachain.com/developers/contracts/governance#enums)

### ProposalState [​](https://docs.berachain.com/developers/contracts/governance#proposalstate)

solidity

```
enum ProposalState {
    Pending,    // Proposal is created but not yet active
    Active,     // Proposal is currently being voted on
    Canceled,   // Proposal was canceled
    Defeated,   // Proposal failed to meet quorum or was voted down
    Succeeded,  // Proposal passed but not yet queued/executed
    Queued,     // Proposal passed and waiting in timelock
    Expired,    // Proposal passed but expired before execution
    Executed    // Proposal was successfully executed
}
```

## Events [​](https://docs.berachain.com/developers/contracts/governance#events)

### ProposalCreated [​](https://docs.berachain.com/developers/contracts/governance#proposalcreated)

solidity

```
event ProposalCreated(
    uint256 proposalId,
    address proposer,
    address[] targets,
    uint256[] values,
    string[] signatures,
    bytes[] calldatas,
    uint256 voteStart,
    uint256 voteEnd,
    string description
);
```

Emitted when a new proposal is created.

### ProposalQueued [​](https://docs.berachain.com/developers/contracts/governance#proposalqueued)

solidity

```
event ProposalQueued(uint256 proposalId, uint256 etaSeconds);
```

Emitted when a proposal is queued for execution.

### ProposalExecuted [​](https://docs.berachain.com/developers/contracts/governance#proposalexecuted)

solidity

```
event ProposalExecuted(uint256 proposalId);
```

Emitted when a proposal is executed.

### ProposalCanceled [​](https://docs.berachain.com/developers/contracts/governance#proposalcanceled)

solidity

```
event ProposalCanceled(uint256 proposalId);
```

Emitted when a proposal is canceled.

### VoteCast [​](https://docs.berachain.com/developers/contracts/governance#votecast)

solidity

```
event VoteCast(
    address indexed voter,
    uint256 proposalId,
    uint8 support,
    uint256 weight,
    string reason
);
```

Emitted when a vote is cast without parameters.

### VoteCastWithParams [​](https://docs.berachain.com/developers/contracts/governance#votecastwithparams)

solidity

```
event VoteCastWithParams(
    address indexed voter,
    uint256 proposalId,
    uint8 support,
    uint256 weight,
    string reason,
    bytes params
);
```

Emitted when a vote is cast with additional parameters.

## Functions [​](https://docs.berachain.com/developers/contracts/governance#functions)

### name [​](https://docs.berachain.com/developers/contracts/governance#name)

Returns the name of the governor instance.

Initializes the governance contract.

solidity

```
function name() external view returns (string memory);
```

**Returns**

| Type     | Description                       |
| -------- | --------------------------------- |
| `string` | The name of the governor instance |

### version [​](https://docs.berachain.com/developers/contracts/governance#version)

Returns the version of the governor instance.

Initializes the governance contract with the voting token and timelock controller.

solidity

```
function version() external view returns (string memory);
```

**Returns**

| Type     | Description                          |
| -------- | ------------------------------------ |
| `string` | The version of the governor instance |

### clock [​](https://docs.berachain.com/developers/contracts/governance#clock)

Returns the current timepoint according to the mode the contract is operating in.

solidity

```
function clock() public view returns (uint48);
```

**Returns**

| Type     | Description                        |
| -------- | ---------------------------------- |
| `uint48` | The current timepoint per EIP-6372 |

### CLOCK_MODE [​](https://docs.berachain.com/developers/contracts/governance#clock-mode)

Returns the clock mode of the contract.

solidity

```
function CLOCK_MODE() external view returns (string);
```

**Returns**

| Type     | Description                 |
| -------- | --------------------------- |
| `string` | The clock mode per EIP-6372 |

### COUNTING_MODE [​](https://docs.berachain.com/developers/contracts/governance#counting-mode)

Returns a description of the possible vote support values and how they are counted.

solidity

```
function COUNTING_MODE() external view returns (string memory);
```

**Returns**

| Type     | Description                                                         |
| -------- | ------------------------------------------------------------------- |
| `string` | URL-encoded string describing vote counting (e.g., "support=bravo") |

### hashProposal [​](https://docs.berachain.com/developers/contracts/governance#hashproposal)

Computes the proposal ID from its components.

solidity

```
function hashProposal(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
) external pure returns (uint256);
```

**Parameters**

| Name              | Type        | Description                                 |
| ----------------- | ----------- | ------------------------------------------- |
| `targets`         | `address[]` | Array of contract addresses to call         |
| `values`          | `uint256[]` | Array of BERA values to send with each call |
| `calldatas`       | `bytes[]`   | Array of function call data for each target |
| `descriptionHash` | `bytes32`   | Hash of the proposal description            |

**Returns**

| Type      | Description     |
| --------- | --------------- |
| `uint256` | The proposal ID |

I apologize for my previous confusion. Let me provide these three functions with their exact descriptions:

### state [​](https://docs.berachain.com/developers/contracts/governance#state)

Current state of a proposal, following Compound's convention.

solidity

```
function state(uint256 proposalId) public view returns (IGovernor.ProposalState);
```

**Parameters**

| Name         | Type      | Description            |
| ------------ | --------- | ---------------------- |
| `proposalId` | `uint256` | The ID of the proposal |

**Returns**

| Type            | Description                |
| --------------- | -------------------------- |
| `ProposalState` | The current proposal state |

### proposalSnapshot [​](https://docs.berachain.com/developers/contracts/governance#proposalsnapshot)

Timepoint used to retrieve user's votes and quorum. If using block number (as per Compound's Comp), the snapshot is performed at the end of this block. Hence, voting for this proposal starts at the beginning of the following block.

solidity

```
function proposalSnapshot(uint256 proposalId) public view returns (uint256);
```

**Parameters**

| Name         | Type      | Description            |
| ------------ | --------- | ---------------------- |
| `proposalId` | `uint256` | The ID of the proposal |

**Returns**

| Type      | Description            |
| --------- | ---------------------- |
| `uint256` | The snapshot timepoint |

### proposalDeadline [​](https://docs.berachain.com/developers/contracts/governance#proposaldeadline)

Timepoint at which votes close. If using block number, votes close at the end of this block, so it is possible to cast a vote during this block.

solidity

```
function proposalDeadline(uint256 proposalId) public view returns (uint256);
```

**Parameters**

| Name         | Type      | Description            |
| ------------ | --------- | ---------------------- |
| `proposalId` | `uint256` | The ID of the proposal |

**Returns**

| Type      | Description            |
| --------- | ---------------------- |
| `uint256` | The deadline timepoint |

### proposalProposer [​](https://docs.berachain.com/developers/contracts/governance#proposalproposer)

The account that created a proposal.

solidity

```
function proposalProposer(uint256 proposalId) public view returns (address);
```

**Parameters**

| Name         | Type      | Description            |
| ------------ | --------- | ---------------------- |
| `proposalId` | `uint256` | The ID of the proposal |

**Returns**

| Type      | Description                           |
| --------- | ------------------------------------- |
| `address` | The address that created the proposal |

### votingDelay [​](https://docs.berachain.com/developers/contracts/governance#votingdelay)

Delay between when a proposal is created and the vote starts. The unit this duration is expressed in depends on the clock (see EIP-6372) this contract uses.

solidity

```
function votingDelay() public view returns (uint256);
```

**Returns**

| Type      | Description                                       |
| --------- | ------------------------------------------------- |
| `uint256` | The delay in timestamp units before voting starts |

**Note**: This can be increased to leave time for users to buy voting power, or delegate it, before the voting of a proposal starts.

### votingPeriod [​](https://docs.berachain.com/developers/contracts/governance#votingperiod)

Delay between the vote start and vote end. The unit this duration is expressed in depends on the clock (see EIP-6372) this contract uses.

solidity

```
function votingPeriod() public view returns (uint256);
```

**Returns**

| Type      | Description                               |
| --------- | ----------------------------------------- |
| `uint256` | The duration of voting in timestamp units |

**Note**: The votingDelay can delay the start of the vote. This must be considered when setting the voting duration compared to the voting delay.

### quorum [​](https://docs.berachain.com/developers/contracts/governance#quorum)

Minimum number of cast voted required for a proposal to be successful.

solidity

```
function quorum(uint256 timepoint) public view returns (uint256);
```

**Parameters**

| Name        | Type      | Description                               |
| ----------- | --------- | ----------------------------------------- |
| `timepoint` | `uint256` | The timestamp to check quorum requirement |

**Returns**

| Type      | Description                          |
| --------- | ------------------------------------ |
| `uint256` | The minimum number of votes required |

**Note**: The timepoint parameter corresponds to the snapshot used for counting vote. This allows to scale the quorum depending on values such as the totalSupply of a token at this timepoint (see ERC20Votes).

### getVotes [​](https://docs.berachain.com/developers/contracts/governance#getvotes)

Voting power of an account at a specific timepoint.

solidity

```
function getVotes(address account, uint256 timepoint) public view returns (uint256);
```

**Parameters**

| Name        | Type      | Description                            |
| ----------- | --------- | -------------------------------------- |
| `account`   | `address` | The address to check voting power for  |
| `timepoint` | `uint256` | The timestamp to check voting power at |

**Returns**

| Type      | Description                                 |
| --------- | ------------------------------------------- |
| `uint256` | The voting power in BGT tokens at timepoint |

**Note**: This can be implemented in a number of ways, for example by reading the delegated balance from one (or multiple), ERC20Votes tokens.

### getVotesWithParams [​](https://docs.berachain.com/developers/contracts/governance#getvoteswithparams)

Voting power of an account at a specific timepoint given additional encoded parameters.

solidity

```
function getVotesWithParams(
    address account,
    uint256 timepoint,
    bytes params
) public view returns (uint256);
```

**Parameters**

| Name        | Type      | Description                            |
| ----------- | --------- | -------------------------------------- |
| `account`   | `address` | The address to check voting power for  |
| `timepoint` | `uint256` | The timestamp to check voting power at |
| `params`    | `bytes`   | Additional encoded parameters          |

**Returns**

| Type      | Description                                 |
| --------- | ------------------------------------------- |
| `uint256` | The voting power in BGT tokens at timepoint |

### hasVoted [​](https://docs.berachain.com/developers/contracts/governance#hasvoted)

Returns whether an account has cast a vote on a proposal.

solidity

```
function hasVoted(uint256 proposalId, address account) public view returns (bool);
```

**Parameters**

| Name         | Type      | Description                        |
| ------------ | --------- | ---------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal             |
| `account`    | `address` | The address to check voting status |

**Returns**

| Type   | Description                                    |
| ------ | ---------------------------------------------- |
| `bool` | True if the account has voted, false otherwise |

### propose [​](https://docs.berachain.com/developers/contracts/governance#propose)

Creates a new proposal.

solidity

```
function propose(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    string memory description
) external returns (uint256 proposalId);
```

**Parameters**

| Name          | Type        | Description                                 |
| ------------- | ----------- | ------------------------------------------- |
| `targets`     | `address[]` | Array of contract addresses to call         |
| `values`      | `uint256[]` | Array of BERA values to send with each call |
| `calldatas`   | `bytes[]`   | Array of function call data for each target |
| `description` | `string`    | Description of the proposal                 |

**Returns**

| Type      | Description                          |
| --------- | ------------------------------------ |
| `uint256` | The ID of the newly created proposal |

### queue [​](https://docs.berachain.com/developers/contracts/governance#queue)

Queues a proposal for execution.

solidity

```
function queue(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
) external returns (uint256 proposalId);
```

**Parameters**

| Name              | Type        | Description                                 |
| ----------------- | ----------- | ------------------------------------------- |
| `targets`         | `address[]` | Array of contract addresses to call         |
| `values`          | `uint256[]` | Array of BERA values to send with each call |
| `calldatas`       | `bytes[]`   | Array of function call data for each target |
| `descriptionHash` | `bytes32`   | Hash of the proposal description            |

**Returns**

| Type      | Description                   |
| --------- | ----------------------------- |
| `uint256` | The ID of the queued proposal |

### execute [​](https://docs.berachain.com/developers/contracts/governance#execute)

Executes a successful proposal.

solidity

```
function execute(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
) external payable returns (uint256 proposalId);
```

**Parameters**

| Name              | Type        | Description                                 |
| ----------------- | ----------- | ------------------------------------------- |
| `targets`         | `address[]` | Array of contract addresses to call         |
| `values`          | `uint256[]` | Array of BERA values to send with each call |
| `calldatas`       | `bytes[]`   | Array of function call data for each target |
| `descriptionHash` | `bytes32`   | Hash of the proposal description            |

**Returns**

| Type      | Description                     |
| --------- | ------------------------------- |
| `uint256` | The ID of the executed proposal |

### cancel [​](https://docs.berachain.com/developers/contracts/governance#cancel)

Cancels a proposal.

solidity

```
function cancel(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
) external returns (uint256 proposalId);
```

**Parameters**

| Name              | Type        | Description                                 |
| ----------------- | ----------- | ------------------------------------------- |
| `targets`         | `address[]` | Array of contract addresses to call         |
| `values`          | `uint256[]` | Array of BERA values to send with each call |
| `calldatas`       | `bytes[]`   | Array of function call data for each target |
| `descriptionHash` | `bytes32`   | Hash of the proposal description            |

**Returns**

| Type      | Description                      |
| --------- | -------------------------------- |
| `uint256` | The ID of the cancelled proposal |

### castVote [​](https://docs.berachain.com/developers/contracts/governance#castvote)

Casts a vote on a proposal.

solidity

```
function castVote(uint256 proposalId, uint8 support) external returns (uint256 balance);
```

**Parameters**

| Name         | Type      | Description                                   |
| ------------ | --------- | --------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on             |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain |

**Returns**

| Type      | Description                                      |
| --------- | ------------------------------------------------ |
| `uint256` | The voting power (in `$BGT` tokens) used to vote |

### castVoteWithReason [​](https://docs.berachain.com/developers/contracts/governance#castvotewithreason)

Casts a vote on a proposal with an explanation.

solidity

```
function castVoteWithReason(
    uint256 proposalId,
    uint8 support,
    string calldata reason
) external returns (uint256 balance);
```

**Parameters**

| Name         | Type      | Description                                   |
| ------------ | --------- | --------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on             |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain |
| `reason`     | `string`  | The reason/explanation for the vote           |

**Returns**

| Type      | Description                                      |
| --------- | ------------------------------------------------ |
| `uint256` | The voting power (in `$BGT` tokens) used to vote |

### castVoteWithReasonAndParams [​](https://docs.berachain.com/developers/contracts/governance#castvotewithreasonandparams)

Casts a vote on a proposal with an explanation and additional parameters.

solidity

```
function castVoteWithReasonAndParams(
    uint256 proposalId,
    uint8 support,
    string calldata reason,
    bytes memory params
) external returns (uint256 balance);
```

**Parameters**

| Name         | Type      | Description                                   |
| ------------ | --------- | --------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on             |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain |
| `reason`     | `string`  | The reason/explanation for the vote           |
| `params`     | `bytes`   | Additional encoded parameters for the vote    |

**Returns**

| Type      | Description                                      |
| --------- | ------------------------------------------------ |
| `uint256` | The voting power (in `$BGT` tokens) used to vote |

### castVoteBySig [​](https://docs.berachain.com/developers/contracts/governance#castvotebysig)

Casts a vote using the voter's cryptographic signature.

solidity

```
function castVoteBySig(
    uint256 proposalId,
    uint8 support,
    address voter,
    bytes memory signature
) external returns (uint256 balance);
```

**Parameters**

| Name         | Type      | Description                                   |
| ------------ | --------- | --------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on             |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain |
| `voter`      | `address` | The address of the voter                      |
| `signature`  | `bytes`   | The cryptographic signature of the vote       |

**Returns**

| Type      | Description                                      |
| --------- | ------------------------------------------------ |
| `uint256` | The voting power (in `$BGT` tokens) used to vote |

**Note**: This function supports ERC-1271 signatures for smart contract wallets.

### castVoteWithReasonAndParamsBySig [​](https://docs.berachain.com/developers/contracts/governance#castvotewithreasonandparamsbysig)

Casts a vote with reason and parameters using the voter's cryptographic signature.

solidity

```
function castVoteWithReasonAndParamsBySig(
    uint256 proposalId,
    uint8 support,
    address voter,
    string calldata reason,
    bytes memory params,
    bytes memory signature
) external returns (uint256 balance);
```

**Parameters**

| Name         | Type      | Description                                   |
| ------------ | --------- | --------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on             |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain |
| `voter`      | `address` | The address of the voter                      |
| `reason`     | `string`  | The reason for the vote                       |
| `params`     | `bytes`   | Additional parameters for the vote            |
| `signature`  | `bytes`   | The cryptographic signature of the vote       |

**Returns**

| Type      | Description                                      |
| --------- | ------------------------------------------------ |
| `uint256` | The voting power (in `$BGT` tokens) used to vote |

**Note**: This function supports ERC-1271 signatures for smart contract wallets.

# FeeCollector [​](https://docs.berachain.com/developers/contracts/fee-collector#feecollector)

> [0x7Bb8DdaC7FbE3FFC0f4B3c73C4F158B06CF82650](https://berascan.com/address/0x7Bb8DdaC7FbE3FFC0f4B3c73C4F158B06CF82650) \| [ABI JSON](https://github.com/berachain/doc-abis/blob/main/core/FeeCollector.json)

The Fee Collector contract is responsible for collecting fees from Berachain Dapps and auctioning them for a Payout token which then is distributed among the BGT stakers.

This contract is inspired by the [Uniswap V3 Factory Owner contract](https://github.com/uniswapfoundation/UniStaker/blob/main/src/V3FactoryOwner.sol).

## Functions [​](https://docs.berachain.com/developers/contracts/fee-collector#functions)

### queuePayoutAmountChange [​](https://docs.berachain.com/developers/contracts/fee-collector#queuepayoutamountchange)

Queues a new payout amount. Must be called by admin.

Update the payout amount to a new value. Must be called by admin.

solidity

```
function queuePayoutAmountChange(uint256 _newPayoutAmount) external;
```

**Parameters**

| Name               | Type      | Description                                   |
| ------------------ | --------- | --------------------------------------------- |
| `_newPayoutAmount` | `uint256` | The value that will be the new payout amount. |

### payoutToken [​](https://docs.berachain.com/developers/contracts/fee-collector#payouttoken)

The ERC-20 token which must be used to pay for fees when claiming dapp fees.

solidity

```
function payoutToken() external view returns (address);
```

### queuedPayoutAmount [​](https://docs.berachain.com/developers/contracts/fee-collector#queuedpayoutamount)

The amount of payout token that is queued to be set as the payout amount.

_It becomes the payout amount after the next claim._

solidity

```
function queuedPayoutAmount() external view returns (uint256);
```

### payoutAmount [​](https://docs.berachain.com/developers/contracts/fee-collector#payoutamount)

The amount of payout token that is required to claim dapp fees of a particular token.

_This works as first come first serve basis. whoever pays this much amount of the payout amount first will get the fees._

solidity

```
function payoutAmount() external view returns (uint256);
```

### rewardReceiver [​](https://docs.berachain.com/developers/contracts/fee-collector#rewardreceiver)

The contract that receives the payout and is notified via method call, when dapp fees are claimed.

solidity

```
function rewardReceiver() external view returns (address);
```

### claimFees [​](https://docs.berachain.com/developers/contracts/fee-collector#claimfees)

Claim collected dapp fees and transfer them to the recipient.

_Caller needs to pay the PAYMENT_AMOUNT of PAYOUT_TOKEN tokens._

_This function is NOT implementing slippage protection. Caller has to check that received amounts match the minimum expected._

solidity

```
function claimFees(address recipient, address[] calldata feeTokens) external;
```

**Parameters**

| Name        | Type        | Description                                                   |
| ----------- | ----------- | ------------------------------------------------------------- |
| `recipient` | `address`   | The address to which collected dapp fees will be transferred. |
| `feeTokens` | `address[]` | The addresses of the fee token to collect to the recipient.   |

### donate [​](https://docs.berachain.com/developers/contracts/fee-collector#donate)

directly sends dapp fees from msg.sender to the BGTStaker reward receiver.

_The dapp fee ERC20 token MUST be the payoutToken._

_The amount must be at least payoutAmount to notify the reward receiver._

solidity

```
function donate(uint256 amount) external;
```

**Parameters**

| Name     | Type      | Description                                                      |
| -------- | --------- | ---------------------------------------------------------------- |
| `amount` | `uint256` | the amount of fee token to directly send to the reward receiver. |

### pause [​](https://docs.berachain.com/developers/contracts/fee-collector#pause)

Allows the owner to pause the collector.

solidity

```
function pause() external;
```

### unpause [​](https://docs.berachain.com/developers/contracts/fee-collector#unpause)

Allows the owner to unpause the collector.

solidity

```
function unpause() external;
```

## Events [​](https://docs.berachain.com/developers/contracts/fee-collector#events)

### QueuedPayoutAmount [​](https://docs.berachain.com/developers/contracts/fee-collector#queuedpayoutamount-1)

Emitted when the admin queues the payout amount.

solidity

```
event QueuedPayoutAmount(uint256 queuedPayoutAmount, uint256 currentPayoutAmount);
```

### PayoutAmountSet [​](https://docs.berachain.com/developers/contracts/fee-collector#payoutamountset)

Emitted when the payout amount is updated.

Emitted when the admin updates the payout amount.

solidity

```
event PayoutAmountSet(uint256 indexed oldPayoutAmount, uint256 indexed newPayoutAmount);
```

### FeesClaimed [​](https://docs.berachain.com/developers/contracts/fee-collector#feesclaimed)

Emitted when the dapp fees are claimed.

solidity

```
event FeesClaimed(address indexed caller, address indexed recipient);
```

**Parameters**

| Name        | Type      | Description                                                   |
| ----------- | --------- | ------------------------------------------------------------- |
| `caller`    | `address` | Caller of the `claimFees` function.                           |
| `recipient` | `address` | The address to which collected dapp fees will be transferred. |

### PayoutDonated [​](https://docs.berachain.com/developers/contracts/fee-collector#payoutdonated)

Emitted when the `PayoutToken` is donated.

solidity

```
event PayoutDonated(address indexed caller, uint256 amount);
```

**Parameters**

| Name     | Type      | Description                                    |
| -------- | --------- | ---------------------------------------------- |
| `caller` | `address` | Caller of the `donate` function.               |
| `amount` | `uint256` | The amount of payout token that is transfered. |

### FeesClaimed [​](https://docs.berachain.com/developers/contracts/fee-collector#feesclaimed-1)

Emitted when the fees are claimed.

solidity

```
event FeesClaimed(address indexed caller, address indexed recipient, address indexed feeToken, uint256 amount);
```

**Parameters**

| Name        | Type      | Description                                                   |
| ----------- | --------- | ------------------------------------------------------------- |
| `caller`    | `address` | Caller of the `claimFees` function.                           |
| `recipient` | `address` | The address to which collected dapp fees will be transferred. |
| `feeToken`  | `address` | The address of the fee token to collect.                      |
| `amount`    | `uint256` | The amount of fee token to transfer.                          |
