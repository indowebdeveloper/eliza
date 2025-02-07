### UpdateRewardVaultImplementation [​](https://docs.berachain.com/developers/contracts/reward-vault-factory#updaterewardvaultimplementation)

Emitted when the vault implementation is updated.

solidity

```
event UpdateRewardVaultImplementation(address indexed oldVaultImpl, address indexed newVaultImpl);
```

**Parameters**

| Name           | Type      | Description                                  |
| -------------- | --------- | -------------------------------------------- |
| `oldVaultImpl` | `address` | The address of the old vault implementation. |
| `newVaultImpl` | `address` | The address of the new vault implementation. |

# Permit2 [​](https://docs.berachain.com/developers/contracts/permit2#permit2)

> [0x000000000022D473030F116dDEE9F6B43aC78BA3](https://berascan.com/address/0x000000000022D473030F116dDEE9F6B43aC78BA3)

Permit2 handles signature-based transfers in SignatureTransfer and allowance-based transfers in AllowanceTransfer.

_Users must approve Permit2 before calling any of the transfer functions._

## State Variables [​](https://docs.berachain.com/developers/contracts/permit2#state-variables)

### allowance [​](https://docs.berachain.com/developers/contracts/permit2#allowance)

Maps users to tokens to spender addresses and information about the approval on the token

_Indexed in the order of token owner address, token address, spender address_

_The stored word saves the allowed amount, expiration on the allowance, and nonce_

solidity

```
mapping(address => mapping(address => mapping(address => PackedAllowance))) public allowance;
```

### nonceBitmap [​](https://docs.berachain.com/developers/contracts/permit2#noncebitmap)

A map from token owner address and a caller specified word index to a bitmap. Used to set bits in the bitmap to prevent against signature replay protection

_Uses unordered nonces so that permit messages do not need to be spent in a certain order_

solidity

```
mapping(address => mapping(uint256 => uint256)) public nonceBitmap;
```

## Functions [​](https://docs.berachain.com/developers/contracts/permit2#functions)

### permitTransferFrom [​](https://docs.berachain.com/developers/contracts/permit2#permittransferfrom)

Transfers a token using a signed permit message

_Reverts if the requested amount is greater than the permitted signed amount_

solidity

```
function permitTransferFrom(
    PermitTransferFrom memory permit,
    SignatureTransferDetails calldata transferDetails,
    address owner,
    bytes calldata signature
) external;
```

**Parameters**

| Name              | Type                       | Description                                                      |
| ----------------- | -------------------------- | ---------------------------------------------------------------- |
| `permit`          | `PermitTransferFrom`       | The permit data signed over by the owner                         |
| `transferDetails` | `SignatureTransferDetails` | The spender's requested transfer details for the permitted token |
| `owner`           | `address`                  | The owner of the tokens to transfer                              |
| `signature`       | `bytes`                    | The signature to verify                                          |

### permitWitnessTransferFrom [​](https://docs.berachain.com/developers/contracts/permit2#permitwitnesstransferfrom)

Transfers a token using a signed permit message

_The witness type string must follow EIP712 ordering of nested structs and must include the TokenPermissions type definition_

solidity

```
function permitWitnessTransferFrom(
    PermitTransferFrom memory permit,
    SignatureTransferDetails calldata transferDetails,
    address owner,
    bytes32 witness,
    string calldata witnessTypeString,
    bytes calldata signature
) external;
```

**Parameters**

| Name                | Type                       | Description                                                           |
| ------------------- | -------------------------- | --------------------------------------------------------------------- |
| `permit`            | `PermitTransferFrom`       | The permit data signed over by the owner                              |
| `transferDetails`   | `SignatureTransferDetails` | The spender's requested transfer details for the permitted token      |
| `owner`             | `address`                  | The owner of the tokens to transfer                                   |
| `witness`           | `bytes32`                  | Extra data to include when checking the user signature                |
| `witnessTypeString` | `string`                   | The EIP-712 type definition for remaining string stub of the typehash |
| `signature`         | `bytes`                    | The signature to verify                                               |

### \_permitTransferFrom [​](https://docs.berachain.com/developers/contracts/permit2#permittransferfrom-1)

Transfers a token using a signed permit message.

solidity

```
function _permitTransferFrom(
    PermitTransferFrom memory permit,
    SignatureTransferDetails calldata transferDetails,
    address owner,
    bytes32 dataHash,
    bytes calldata signature
) private;
```

**Parameters**

| Name              | Type                       | Description                                                        |
| ----------------- | -------------------------- | ------------------------------------------------------------------ |
| `permit`          | `PermitTransferFrom`       | The permit data signed over by the owner                           |
| `transferDetails` | `SignatureTransferDetails` | The spender's requested transfer details for the permitted token   |
| `owner`           | `address`                  | The owner of the tokens to transfer                                |
| `dataHash`        | `bytes32`                  | The EIP-712 hash of permit data to include when checking signature |
| `signature`       | `bytes`                    | The signature to verify                                            |

### permitTransferFrom [​](https://docs.berachain.com/developers/contracts/permit2#permittransferfrom-2)

Transfers a token using a signed permit message

_Reverts if the requested amount is greater than the permitted signed amount_

solidity

```
function permitTransferFrom(
    PermitBatchTransferFrom memory permit,
    SignatureTransferDetails[] calldata transferDetails,
    address owner,
    bytes calldata signature
) external;
```

**Parameters**

| Name              | Type                         | Description                                                      |
| ----------------- | ---------------------------- | ---------------------------------------------------------------- |
| `permit`          | `PermitBatchTransferFrom`    | The permit data signed over by the owner                         |
| `transferDetails` | `SignatureTransferDetails[]` | The spender's requested transfer details for the permitted token |
| `owner`           | `address`                    | The owner of the tokens to transfer                              |
| `signature`       | `bytes`                      | The signature to verify                                          |

### permitWitnessTransferFrom [​](https://docs.berachain.com/developers/contracts/permit2#permitwitnesstransferfrom-1)

Transfers a token using a signed permit message

_The witness type string must follow EIP712 ordering of nested structs and must include the TokenPermissions type definition_

solidity

```
function permitWitnessTransferFrom(
    PermitBatchTransferFrom memory permit,
    SignatureTransferDetails[] calldata transferDetails,
    address owner,
    bytes32 witness,
    string calldata witnessTypeString,
    bytes calldata signature
) external;
```

**Parameters**

| Name                | Type                         | Description                                                           |
| ------------------- | ---------------------------- | --------------------------------------------------------------------- |
| `permit`            | `PermitBatchTransferFrom`    | The permit data signed over by the owner                              |
| `transferDetails`   | `SignatureTransferDetails[]` | The spender's requested transfer details for the permitted token      |
| `owner`             | `address`                    | The owner of the tokens to transfer                                   |
| `witness`           | `bytes32`                    | Extra data to include when checking the user signature                |
| `witnessTypeString` | `string`                     | The EIP-712 type definition for remaining string stub of the typehash |
| `signature`         | `bytes`                      | The signature to verify                                               |

### \_permitTransferFrom [​](https://docs.berachain.com/developers/contracts/permit2#permittransferfrom-3)

Transfers tokens using a signed permit messages

solidity

```
function _permitTransferFrom(
    PermitBatchTransferFrom memory permit,
    SignatureTransferDetails[] calldata transferDetails,
    address owner,
    bytes32 dataHash,
    bytes calldata signature
) private;
```

**Parameters**

| Name              | Type                         | Description                                                        |
| ----------------- | ---------------------------- | ------------------------------------------------------------------ |
| `permit`          | `PermitBatchTransferFrom`    | The permit data signed over by the owner                           |
| `transferDetails` | `SignatureTransferDetails[]` |                                                                    |
| `owner`           | `address`                    | The owner of the tokens to transfer                                |
| `dataHash`        | `bytes32`                    | The EIP-712 hash of permit data to include when checking signature |
| `signature`       | `bytes`                      | The signature to verify                                            |

### invalidateUnorderedNonces [​](https://docs.berachain.com/developers/contracts/permit2#invalidateunorderednonces)

Invalidates the bits specified in mask for the bitmap at the word position

_The wordPos is maxed at type(uint248).max_

solidity

```
function invalidateUnorderedNonces(uint256 wordPos, uint256 mask) external;
```

**Parameters**

| Name      | Type      | Description                                                              |
| --------- | --------- | ------------------------------------------------------------------------ |
| `wordPos` | `uint256` | A number to index the nonceBitmap at                                     |
| `mask`    | `uint256` | A bitmap masked against msg.sender's current bitmap at the word position |

### bitmapPositions [​](https://docs.berachain.com/developers/contracts/permit2#bitmappositions)

Returns the index of the bitmap and the bit position within the bitmap. Used for unordered nonces

_The first 248 bits of the nonce value is the index of the desired bitmap_

_The last 8 bits of the nonce value is the position of the bit in the bitmap_

solidity

```
function bitmapPositions(uint256 nonce) private pure returns (uint256 wordPos, uint256 bitPos);
```

**Parameters**

| Name    | Type      | Description                                            |
| ------- | --------- | ------------------------------------------------------ |
| `nonce` | `uint256` | The nonce to get the associated word and bit positions |

**Returns**

| Name      | Type      | Description                                     |
| --------- | --------- | ----------------------------------------------- |
| `wordPos` | `uint256` | The word position or index into the nonceBitmap |
| `bitPos`  | `uint256` | The bit position                                |

### \_useUnorderedNonce [​](https://docs.berachain.com/developers/contracts/permit2#useunorderednonce)

Checks whether a nonce is taken and sets the bit at the bit position in the bitmap at the word position

solidity

```
function _useUnorderedNonce(address from, uint256 nonce) internal;
```

**Parameters**

| Name    | Type      | Description                     |
| ------- | --------- | ------------------------------- |
| `from`  | `address` | The address to use the nonce at |
| `nonce` | `uint256` | The nonce to spend              |

### approve [​](https://docs.berachain.com/developers/contracts/permit2#approve)

Approves the spender to use up to amount of the specified token up until the expiration

_The packed allowance also holds a nonce, which will stay unchanged in approve_

solidity

```
function approve(address token, address spender, uint160 amount, uint48 expiration) external;
```

**Parameters**

| Name         | Type      | Description                                            |
| ------------ | --------- | ------------------------------------------------------ |
| `token`      | `address` | The token to approve                                   |
| `spender`    | `address` | The spender address to approve                         |
| `amount`     | `uint160` | The approved amount of the token                       |
| `expiration` | `uint48`  | The timestamp at which the approval is no longer valid |

### permit [​](https://docs.berachain.com/developers/contracts/permit2#permit)

Permit a spender to a given amount of the owners token via the owner's EIP-712 signature

_May fail if the owner's nonce was invalidated in-flight by invalidateNonce_

solidity

```
function permit(address owner, PermitSingle memory permitSingle, bytes calldata signature)
    external;
```

**Parameters**

| Name           | Type           | Description                                                    |
| -------------- | -------------- | -------------------------------------------------------------- |
| `owner`        | `address`      | The owner of the tokens being approved                         |
| `permitSingle` | `PermitSingle` | Data signed over by the owner specifying the terms of approval |
| `signature`    | `bytes`        | The owner's signature over the permit data                     |

### permit [​](https://docs.berachain.com/developers/contracts/permit2#permit-1)

Permit a spender to a given amount of the owners token via the owner's EIP-712 signature

_May fail if the owner's nonce was invalidated in-flight by invalidateNonce_

solidity

```
function permit(address owner, PermitBatch memory permitBatch, bytes calldata signature) external;
```

**Parameters**

| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| `owner`       | `address`     | The owner of the tokens being approved     |
| `permitBatch` | `PermitBatch` |                                            |
| `signature`   | `bytes`       | The owner's signature over the permit data |

### transferFrom [​](https://docs.berachain.com/developers/contracts/permit2#transferfrom)

Transfer approved tokens from one address to another

_Requires the from address to have approved at least the desired amount of tokens to msg.sender._

solidity

```
function transferFrom(address from, address to, uint160 amount, address token) external;
```

**Parameters**

| Name     | Type      | Description                         |
| -------- | --------- | ----------------------------------- |
| `from`   | `address` | The address to transfer from        |
| `to`     | `address` | The address of the recipient        |
| `amount` | `uint160` | The amount of the token to transfer |
| `token`  | `address` | The token address to transfer       |

### transferFrom [​](https://docs.berachain.com/developers/contracts/permit2#transferfrom-1)

Transfer approved tokens from one address to another

_Requires the from address to have approved at least the desired amount of tokens to msg.sender._

solidity

```
function transferFrom(AllowanceTransferDetails[] calldata transferDetails) external;
```

**Parameters**

| Name              | Type                         | Description |
| ----------------- | ---------------------------- | ----------- |
| `transferDetails` | `AllowanceTransferDetails[]` |             |

### \_transfer [​](https://docs.berachain.com/developers/contracts/permit2#transfer)

Internal function for transferring tokens using stored allowances

_Will fail if the allowed timeframe has passed_

solidity

```
function _transfer(address from, address to, uint160 amount, address token) private;
```

### lockdown [​](https://docs.berachain.com/developers/contracts/permit2#lockdown)

Enables performing a "lockdown" of the sender's Permit2 identity by batch revoking approvals

solidity

```
function lockdown(TokenSpenderPair[] calldata approvals) external;
```

**Parameters**

| Name        | Type                 | Description                   |
| ----------- | -------------------- | ----------------------------- |
| `approvals` | `TokenSpenderPair[]` | Array of approvals to revoke. |

### invalidateNonces [​](https://docs.berachain.com/developers/contracts/permit2#invalidatenonces)

Invalidate nonces for a given (token, spender) pair

_Can't invalidate more than 2\*\*16 nonces per transaction._

solidity

```
function invalidateNonces(address token, address spender, uint48 newNonce) external;
```

**Parameters**

| Name       | Type      | Description                                                |
| ---------- | --------- | ---------------------------------------------------------- |
| `token`    | `address` | The token to invalidate nonces for                         |
| `spender`  | `address` | The spender to invalidate nonces for                       |
| `newNonce` | `uint48`  | The new nonce to set. Invalidates all nonces less than it. |

### \_updateApproval [​](https://docs.berachain.com/developers/contracts/permit2#updateapproval)

Sets the new values for amount, expiration, and nonce.

_Will check that the signed nonce is equal to the current nonce and then incrememnt the nonce value by 1._

_Emits a Permit event._

solidity

```
function _updateApproval(PermitDetails memory details, address owner, address spender) private;
```

# Multicall3 [​](https://docs.berachain.com/developers/contracts/multicall3#multicall3)

> [0xcA11bde05977b3631167028862bE2a173976CA11](https://berascan.com/address/0xcA11bde05977b3631167028862bE2a173976CA11) \| [ABI JSON](https://github.com/berachain/doc-abis/blob/main/core/Multicall3.json)

The Multicall3 contract is a Solidity contract implemented by the MakerDAO team. Its primary purpose is to aggregate results from multiple function calls in a single transaction, which can help reduce gas costs and improve efficiency when interacting with multiple contracts or making multiple calls to the same contracts.

The contract is backwards-compatible with [Multicall](https://github.com/makerdao/multicall/blob/master/src/Multicall.sol) and [Multicall2](https://github.com/makerdao/multicall/blob/master/src/Multicall2.sol) contracts, and it provides several functions for aggregating calls, such as `aggregate`, `tryAggregate`, `blockAndAggregate`, `aggregate3`, and `aggregate3Value`. These functions accept arrays of `Call`, `Call3`, or `Call3Value` structs, which contain the target contract address, call data, and other optional parameters like whether to allow failures and the value to be sent with the call.

The contract also provides utility functions to retrieve information about the current block, such as block number, block hash, block coinbase, block difficulty, block gas limit, block timestamp, and the balance of a given address.

Use of Multicall3 is particularly useful when working with decentralized applications that require multiple contract interactions or when batching multiple calls to save on gas costs.

Aggregate results from multiple function calls

_Multicall & Multicall2 backwards-compatible_

_Aggregate methods are marked `payable` to save 24 gas per call_

## Functions [​](https://docs.berachain.com/developers/contracts/multicall3#functions)

### aggregate [​](https://docs.berachain.com/developers/contracts/multicall3#aggregate)

Backwards-compatible call aggregation with Multicall

solidity

```
function aggregate(Call[] calldata calls) public payable returns (uint256 blockNumber, bytes[] memory returnData);
```

**Parameters**

| Name    | Type     | Description              |
| ------- | -------- | ------------------------ |
| `calls` | `Call[]` | An array of Call structs |

**Returns**

| Name          | Type      | Description                                    |
| ------------- | --------- | ---------------------------------------------- |
| `blockNumber` | `uint256` | The block number where the calls were executed |
| `returnData`  | `bytes[]` | An array of bytes containing the responses     |

### tryAggregate [​](https://docs.berachain.com/developers/contracts/multicall3#tryaggregate)

Backwards-compatible with Multicall2

Aggregate calls without requiring success

solidity

```
function tryAggregate(bool requireSuccess, Call[] calldata calls) public payable returns (Result[] memory returnData);
```

**Parameters**

| Name             | Type     | Description                           |
| ---------------- | -------- | ------------------------------------- |
| `requireSuccess` | `bool`   | If true, require all calls to succeed |
| `calls`          | `Call[]` | An array of Call structs              |

**Returns**

| Name         | Type       | Description                |
| ------------ | ---------- | -------------------------- |
| `returnData` | `Result[]` | An array of Result structs |

### tryBlockAndAggregate [​](https://docs.berachain.com/developers/contracts/multicall3#tryblockandaggregate)

Backwards-compatible with Multicall2

Aggregate calls and allow failures using tryAggregate

solidity

```
function tryBlockAndAggregate(bool requireSuccess, Call[] calldata calls)
    public
    payable
    returns (uint256 blockNumber, bytes32 blockHash, Result[] memory returnData);
```

**Parameters**

| Name             | Type     | Description              |
| ---------------- | -------- | ------------------------ |
| `requireSuccess` | `bool`   |                          |
| `calls`          | `Call[]` | An array of Call structs |

**Returns**

| Name          | Type       | Description                                         |
| ------------- | ---------- | --------------------------------------------------- |
| `blockNumber` | `uint256`  | The block number where the calls were executed      |
| `blockHash`   | `bytes32`  | The hash of the block where the calls were executed |
| `returnData`  | `Result[]` | An array of Result structs                          |

### blockAndAggregate [​](https://docs.berachain.com/developers/contracts/multicall3#blockandaggregate)

Backwards-compatible with Multicall2

Aggregate calls and allow failures using tryAggregate

solidity

```
function blockAndAggregate(Call[] calldata calls)
    public
    payable
    returns (uint256 blockNumber, bytes32 blockHash, Result[] memory returnData);
```

**Parameters**

| Name    | Type     | Description              |
| ------- | -------- | ------------------------ |
| `calls` | `Call[]` | An array of Call structs |

**Returns**

| Name          | Type       | Description                                         |
| ------------- | ---------- | --------------------------------------------------- |
| `blockNumber` | `uint256`  | The block number where the calls were executed      |
| `blockHash`   | `bytes32`  | The hash of the block where the calls were executed |
| `returnData`  | `Result[]` | An array of Result structs                          |

### aggregate3 [​](https://docs.berachain.com/developers/contracts/multicall3#aggregate3)

Aggregate calls, ensuring each returns success if required

solidity

```
function aggregate3(Call3[] calldata calls) public payable returns (Result[] memory returnData);
```

**Parameters**

| Name    | Type      | Description               |
| ------- | --------- | ------------------------- |
| `calls` | `Call3[]` | An array of Call3 structs |

**Returns**

| Name         | Type       | Description                |
| ------------ | ---------- | -------------------------- |
| `returnData` | `Result[]` | An array of Result structs |

### aggregate3Value [​](https://docs.berachain.com/developers/contracts/multicall3#aggregate3value)

Aggregate calls with a msg value

Reverts if msg.value is less than the sum of the call values

solidity

```
function aggregate3Value(Call3Value[] calldata calls) public payable returns (Result[] memory returnData);
```

**Parameters**

| Name    | Type           | Description                    |
| ------- | -------------- | ------------------------------ |
| `calls` | `Call3Value[]` | An array of Call3Value structs |

**Returns**

| Name         | Type       | Description                |
| ------------ | ---------- | -------------------------- |
| `returnData` | `Result[]` | An array of Result structs |

### getBlockHash [​](https://docs.berachain.com/developers/contracts/multicall3#getblockhash)

Returns the block hash for the given block number

solidity

```
function getBlockHash(uint256 blockNumber) public view returns (bytes32 blockHash);
```

**Parameters**

| Name          | Type      | Description      |
| ------------- | --------- | ---------------- |
| `blockNumber` | `uint256` | The block number |

### getBlockNumber [​](https://docs.berachain.com/developers/contracts/multicall3#getblocknumber)

Returns the block number

solidity

```
function getBlockNumber() public view returns (uint256 blockNumber);
```

### getCurrentBlockCoinbase [​](https://docs.berachain.com/developers/contracts/multicall3#getcurrentblockcoinbase)

Returns the block coinbase

solidity

```
function getCurrentBlockCoinbase() public view returns (address coinbase);
```

### getCurrentBlockDifficulty [​](https://docs.berachain.com/developers/contracts/multicall3#getcurrentblockdifficulty)

Returns the block difficulty

solidity

```
function getCurrentBlockDifficulty() public view returns (uint256 difficulty);
```

### getCurrentBlockGasLimit [​](https://docs.berachain.com/developers/contracts/multicall3#getcurrentblockgaslimit)

Returns the block gas limit

solidity

```
function getCurrentBlockGasLimit() public view returns (uint256 gaslimit);
```

### getCurrentBlockTimestamp [​](https://docs.berachain.com/developers/contracts/multicall3#getcurrentblocktimestamp)

Returns the block timestamp

solidity

```
function getCurrentBlockTimestamp() public view returns (uint256 timestamp);
```

### getEthBalance [​](https://docs.berachain.com/developers/contracts/multicall3#getethbalance)

Returns the (ETH) balance of a given address

solidity

```
function getEthBalance(address addr) public view returns (uint256 balance);
```

### getLastBlockHash [​](https://docs.berachain.com/developers/contracts/multicall3#getlastblockhash)

Returns the block hash of the last block

solidity

```
function getLastBlockHash() public view returns (bytes32 blockHash);
```

### getBasefee [​](https://docs.berachain.com/developers/contracts/multicall3#getbasefee)

Gets the base fee of the given block

Can revert if the BASEFEE opcode is not implemented by the given chain

solidity

```
function getBasefee() public view returns (uint256 basefee);
```

### getChainId [​](https://docs.berachain.com/developers/contracts/multicall3#getchainid)

Returns the chain id

solidity

```
function getChainId() public view returns (uint256 chainid);
```

## Structs [​](https://docs.berachain.com/developers/contracts/multicall3#structs)

### Call [​](https://docs.berachain.com/developers/contracts/multicall3#call)

solidity

```
struct Call {
    address target;
    bytes callData;
}
```

### Call3 [​](https://docs.berachain.com/developers/contracts/multicall3#call3)

solidity

```
struct Call3 {
    address target;
    bool allowFailure;
    bytes callData;
}
```

### Call3Value [​](https://docs.berachain.com/developers/contracts/multicall3#call3value)

solidity

```
struct Call3Value {
    address target;
    bool allowFailure;
    uint256 value;
    bytes callData;
}
```

### Result [​](https://docs.berachain.com/developers/contracts/multicall3#result)

solidity

```
struct Result {
    bool success;
    bytes returnData;
}
```

# Honey [​](https://docs.berachain.com/developers/contracts/honey-token#honey)

> [0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce](https://berascan.com/address/0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce) \| [ABI JSON](https://github.com/berachain/doc-abis/blob/main/core/HONEY.json)

This is the ERC20 token representation of Berachain's native stablecoin, HONEY.

## Functions [​](https://docs.berachain.com/developers/contracts/honey-token#functions)

### mint [​](https://docs.berachain.com/developers/contracts/honey-token#mint)

Mint Honey to the receiver.

_Only the factory can call this function._

solidity

```
function mint(address to, uint256 amount) external onlyFactory;
```

**Parameters**

| Name     | Type      | Description                  |
| -------- | --------- | ---------------------------- |
| `to`     | `address` | The receiver address.        |
| `amount` | `uint256` | The amount of Honey to mint. |

### burn [​](https://docs.berachain.com/developers/contracts/honey-token#burn)

Burn Honey from an account.

_Only the factory can call this function._

solidity

```
function burn(address from, uint256 amount) external onlyFactory;
```

**Parameters**

| Name     | Type      | Description                     |
| -------- | --------- | ------------------------------- |
| `from`   | `address` | The account to burn Honey from. |
| `amount` | `uint256` | The amount of Honey to burn.    |

### name [​](https://docs.berachain.com/developers/contracts/honey-token#name)

solidity

```
function name() public pure override returns (string memory);
```

### symbol [​](https://docs.berachain.com/developers/contracts/honey-token#symbol)

solidity

```
function symbol() public pure override returns (string memory);
```

### decimals [​](https://docs.berachain.com/developers/contracts/honey-token#decimals)

Returns the number of decimals used to get its user representation.

For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5,05` ( `505 / 10 ** 2`).

solidity

```
function decimals() public view returns (uint8);
```

### totalSupply [​](https://docs.berachain.com/developers/contracts/honey-token#totalsupply)

Returns the amount of tokens in existence.

solidity

```
function totalSupply() public view override returns (uint256);
```

### balanceOf [​](https://docs.berachain.com/developers/contracts/honey-token#balanceof)

Returns the amount of tokens owned by `owner`.

solidity

```
function balanceOf(address account) public view override returns (uint256);
```

### transfer [​](https://docs.berachain.com/developers/contracts/honey-token#transfer)

Transfer `amount` tokens from the caller to `to`.

-   the caller must have a balance of at least `amount`

solidity

```
function transfer(address recipient, uint256 amount) public virtual override returns (bool);
```

### allowance [​](https://docs.berachain.com/developers/contracts/honey-token#allowance)

Returns the amount of tokens that `spender` can spend on behalf of `owner`.

solidity

```
function allowance(address owner, address spender) public view virtual override returns (uint256);
```

### approve [​](https://docs.berachain.com/developers/contracts/honey-token#approve)

Sets `amount` as the allowance of `spender` over the caller's tokens.

solidity

```
function approve(address spender, uint256 amount) public virtual override returns (bool);
```

### transferFrom [​](https://docs.berachain.com/developers/contracts/honey-token#transferfrom)

Transfers `amount` tokens from `from` to `to`.

-   `sender` must have a balance of at least `amount`
-   the caller must have allowance for `sender`'s tokens of at least `amount`

solidity

```
function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool);
```

# HoneyFactory [​](https://docs.berachain.com/developers/contracts/honey-factory#honeyfactory)

> [0xA4aFef880F5cE1f63c9fb48F661E27F8B4216401](https://berascan.com/address/0xA4aFef880F5cE1f63c9fb48F661E27F8B4216401) \| [ABI JSON](https://github.com/berachain/doc-abis/blob/main/core/HoneyFactory.json)

This is the router contract for minting and redeeming Honey.

## Functions [​](https://docs.berachain.com/developers/contracts/honey-factory#functions)

### mint [​](https://docs.berachain.com/developers/contracts/honey-factory#mint)

Mint Honey by sending ERC20 to this contract.

_Assest must be registered and must be a good collateral._

solidity

```
function mint(address asset, uint256 amount, address receiver) external returns (uint256);
```

**Parameters**

| Name       | Type      | Description                          |
| ---------- | --------- | ------------------------------------ |
| `asset`    | `address` |                                      |
| `amount`   | `uint256` | The amount of ERC20 to mint with.    |
| `receiver` | `address` | The address that will receive Honey. |

**Returns**

| Name     | Type      | Description                 |
| -------- | --------- | --------------------------- |
| `<none>` | `uint256` | The amount of Honey minted. |

### redeem [​](https://docs.berachain.com/developers/contracts/honey-factory#redeem)

Redeem assets by sending Honey in to burn.

solidity

```
function redeem(address asset, uint256 honeyAmount, address receiver) external returns (uint256[] memory);
```

**Parameters**

| Name          | Type      | Description                           |
| ------------- | --------- | ------------------------------------- |
| `asset`       | `address` |                                       |
| `honeyAmount` | `uint256` | The amount of Honey to redeem.        |
| `receiver`    | `address` | The address that will receive assets. |

**Returns**

| Name     | Type        | Description                    |
| -------- | ----------- | ------------------------------ |
| `<none>` | `uint256[]` | The amount of assets redeemed. |

### liquidate [​](https://docs.berachain.com/developers/contracts/honey-factory#liquidate)

Liquidate a bad collateral asset.

solidity

```
function liquidate(
    address badCollateral,
    address goodCollateral,
    uint256 goodAmount
)
    external
    returns (uint256 badAmount);
```

**Parameters**

| Name             | Type      | Description                          |
| ---------------- | --------- | ------------------------------------ |
| `badCollateral`  | `address` | The ERC20 asset to liquidate.        |
| `goodCollateral` | `address` | The ERC20 asset to provide in place. |
| `goodAmount`     | `uint256` | The amount provided.                 |

**Returns**

| Name        | Type      | Description          |
| ----------- | --------- | -------------------- |
| `badAmount` | `uint256` | The amount obtained. |

### recapitalize [​](https://docs.berachain.com/developers/contracts/honey-factory#recapitalize)

Recapitalize a collateral vault.

solidity

```
function recapitalize(address asset, uint256 amount) external;
```

**Parameters**

| Name     | Type      | Description                      |
| -------- | --------- | -------------------------------- |
| `asset`  | `address` | The ERC20 asset to recapitalize. |
| `amount` | `uint256` | The amount provided.             |

### isBasketModeEnabled [​](https://docs.berachain.com/developers/contracts/honey-factory#isbasketmodeenabled)

Get the status of the basket mode.

_On mint, basket mode is enabled if all collaterals are either depegged or bad._

_On redeem, basket mode is enabled if at least one asset is deppegged except for the collateral assets that have been fully liquidated._

solidity

```
function isBasketModeEnabled(bool isMint) public view returns (bool basketMode);
```
