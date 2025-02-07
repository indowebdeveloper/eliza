# Community Developer Guides [​](https://docs.berachain.com/developers/guides/community-guides#community-developer-guides)

These are a list of community developer guides for Berachain.

## Wallet Connections [​](https://docs.berachain.com/developers/guides/community-guides#wallet-connections)

| Project Name                                                   | Git Repository                                                                             |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| NextJS WalletConnect WAGMI + Viem Frontend Contract Deployment | [GitHub](https://github.com/berachain/guides/tree/main/apps/walletconnect-nextjs)          |
| ThirdWeb ConnectWallet NextJS                                  | [GitHub](https://github.com/berachain/guides/tree/main/apps/thirdweb-connectwallet-nextjs) |
| Particle Auth Core Vite                                        | [GitHub](https://github.com/berachain/guides/tree/main/apps/particle-auth-core-vite)       |
| RainbowKit Vite                                                | [GitHub](https://github.com/berachain/guides/tree/main/apps/rainbowkit-vite)               |
| WalletConnect Expo                                             | [GitHub](https://github.com/berachain/guides/tree/main/apps/walletconnect-expo)            |
| RPC Provider Guide                                             | [Guide](https://blog.berachain.com/blog/your-berachain-rpc-guide)                          |

## Bridging [​](https://docs.berachain.com/developers/guides/community-guides#bridging)

| Project Name                                         | Git Repository                                                             |
| ---------------------------------------------------- | -------------------------------------------------------------------------- |
| Bridging ERC20 Tokens to Berachain with LayerZero V2 | [GitHub](https://github.com/berachain/guides/tree/main/apps/layerzero-oft) |

## Smart Contract Deployment & Verification [​](https://docs.berachain.com/developers/guides/community-guides#smart-contract-deployment-verification)

| Project Name                                    | Git Repository                                                                             |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Deploy HelloWorld Contract With Ethers6 & solc  | [GitHub](https://github.com/berachain/guides/tree/main/apps/ethers6-solc-helloworld)       |
| Deploy HelloWorld Contract With Viem & solc     | [GitHub](https://github.com/berachain/guides/tree/main/apps/viem-solc-helloworld)          |
| Create HelloWorld Contract Using Hardhat & Viem | [GitHub](https://github.com/berachain/guides/tree/main/apps/hardhat-viem-helloworld)       |
| Hardhat Ethers6 Contract Verification           | [GitHub](https://github.com/berachain/guides/tree/main/apps/hardhat-contract-verification) |
| Hardhat Ethers6 ERC1155                         | [GitHub](https://github.com/berachain/guides/tree/main/apps/hardhat-ethers6-erc1155)       |
| Create ERC20 Contract Using Foundry             | [GitHub](https://github.com/berachain/guides/tree/main/apps/foundry-erc20)                 |
| Deploy Upgradeable Contracts                    | [GitHub](https://github.com/berachain/guides/tree/main/apps/openzeppelin-upgrades)         |

## Indexing and Querying [​](https://docs.berachain.com/developers/guides/community-guides#indexing-and-querying)

| Project Name                              | Git Repository                                                                   |
| ----------------------------------------- | -------------------------------------------------------------------------------- |
| Index & Query Berachain Data with Goldsky | [GitHub](https://github.com/berachain/guides/tree/main/apps/goldsky-subgraph)    |
| Envio Indexer ERC20                       | [GitHub](https://github.com/berachain/guides/tree/main/apps/envio-indexer-erc20) |

## Verifiable Randomness [​](https://docs.berachain.com/developers/guides/community-guides#verifiable-randomness)

| Project Name                         | Git Repository                                                            |
| ------------------------------------ | ------------------------------------------------------------------------- |
| Using Gelato VRF                     | [GitHub](https://github.com/berachain/guides/tree/main/apps/gelato-vrf)   |
| Provably Fair NFTs with Pyth Entropy | [GitHub](https://github.com/berachain/guides/tree/main/apps/pyth-entropy) |

## Oracles [​](https://docs.berachain.com/developers/guides/community-guides#oracles)

| Project Name | Git Repository                                                           |
| ------------ | ------------------------------------------------------------------------ |
| Pyth Oracle  | [GitHub](https://github.com/berachain/guides/tree/main/apps/pyth-oracle) |

## Governance [​](https://docs.berachain.com/developers/guides/community-guides#governance)

| Project Name                                    | Git Repository                                                                             |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Berachain Governance Proposal For Reward Vaults | [GitHub](https://github.com/berachain/guides/tree/main/apps/berachain-governance-proposal) |

## Storage [​](https://docs.berachain.com/developers/guides/community-guides#storage)

| Project Name                                | Git Repository                                                                |
| ------------------------------------------- | ----------------------------------------------------------------------------- |
| Irys NodeJS Upload Script With $BERA Tokens | [GitHub](https://github.com/berachain/guides/tree/main/apps/irys-bera-nodejs) |

## Relayers/Gasless Transactions [​](https://docs.berachain.com/developers/guides/community-guides#relayers-gasless-transactions)

| Project Name       | Source                                                                                   |
| ------------------ | ---------------------------------------------------------------------------------------- |
| Using Gelato Relay | [Guide](https://docs.google.com/document/d/1dsSGGYZ4IIE8EAhrMH8SOQFmIygcaibRYHiar2Vj2Kw) |

## Automation [​](https://docs.berachain.com/developers/guides/community-guides#automation)

| Project Name                | Source                                                                                   |
| --------------------------- | ---------------------------------------------------------------------------------------- |
| Using Gelato Web3 Functions | [Guide](https://docs.google.com/document/d/1kUuvYwUH6tyLM4mNJYNu22jS6lPynvSSF_x8NDAZzRg) |

## Proof of Liquidity Examples [​](https://docs.berachain.com/developers/guides/community-guides#proof-of-liquidity-examples)

| Project Name         | Source                                                                                  |
| -------------------- | --------------------------------------------------------------------------------------- |
| SocialFi             | [Guide](https://blog.berachain.com/blog/poltech-proof-of-liquidity-goes-social)         |
| Time-limited Rewards | [Guide](https://blog.berachain.com/blog/onlypaws-bearing-it-all-for-proof-of-liquidity) |

# Proof of Liquidity Integration Guide for Non-ERC20 Protocols [​](https://docs.berachain.com/developers/guides/advanced-pol#proof-of-liquidity-integration-guide-for-non-erc20-protocols)

## Introduction [​](https://docs.berachain.com/developers/guides/advanced-pol#introduction)

Users typically engage with Proof of Liquidity by staking ERC20 receipt tokens into [Reward Vaults](https://docs.berachain.com/learn/pol/rewardvaults) to earn `$BGT`. However, this approach may not be suitable for all protocols.

This guide demonstrates how to integrate Berachain's Proof of Liquidity (PoL) system for protocols who don't naturally produce stakeable ERC20 receipt tokens or otherwise need to track balances internally. For example, a perpetual futures exchange may wish to reward users who open trading positions with `$BGT`, and cease rewards when the position is closed.

By implementing this approach, such protocols can still participate in PoL, benefiting from the improved incentive efficiencies it provides.

WARNING

Note that this article provides only one possible workaround for integrating PoL with non-ERC20 protocols. The solution is not exhaustive and may not be suitable for all use cases.

## Description of Approach [​](https://docs.berachain.com/developers/guides/advanced-pol#description-of-approach)

The described approach involves the creation of a dummy `StakingToken` that is staked in a Reward Vault on behalf of users by a protocol. This dummy token is used to track the staked balances of users and is minted and burned by the protocol (operating through `ProtocolContract`) as users provide/withdraw their liquidity from the protocol.

The staked dummy token balance entitles users to earn `$BGT` as if they had staked an ERC20 receipt token in a PoL vault themselves. This approach is enabled by the `delegateStake` and `delegateWithdraw` methods in the [RewardVault](https://docs.berachain.com/developers/contracts/reward-vault) contract.

## Requirements [​](https://docs.berachain.com/developers/guides/advanced-pol#requirements)

Before beginning, make sure you have Foundry installed beforehand.

-   [Foundry](https://book.getfoundry.sh/getting-started/installation)

## Project Setup [​](https://docs.berachain.com/developers/guides/advanced-pol#project-setup)

1. Initialize a new Forge project and install dependencies:

bash

```
forge init pol-smart-stake --no-commit --no-git;
cd pol-smart-stake;
forge install OpenZeppelin/openzeppelin-contracts --no-commit --no-git;
```

2. Create a `remappings.txt` file for OpenZeppelin imports:

bash

```
# FROM: ./pol-smart-stake

echo "@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/" > remappings.txt;
```

## Implement Contracts [​](https://docs.berachain.com/developers/guides/advanced-pol#implement-contracts)

#### 1\. Create the dummy token contract at `src/StakingToken.sol`: [​](https://docs.berachain.com/developers/guides/advanced-pol#_1-create-the-dummy-token-contract-at-src-stakingtoken-sol)

solidity

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakingToken is ERC20, Ownable {
    constructor() ERC20("StakingToken", "STK") Ownable(msg.sender) {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
}
```

This contract creates a dummy ERC20 token that will be used for staking in PoL vaults. Only the owner ( `ProtocolContract`) can mint and burn tokens.

#### 2\. Create a mock protocol contract at `src/ProtocolContract.sol`: [​](https://docs.berachain.com/developers/guides/advanced-pol#_2-create-a-mock-protocol-contract-at-src-protocolcontract-sol)

solidity

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./StakingToken.sol";
import {IRewardVault, IRewardVaultFactory} from "./interfaces/IRewardVaults.sol";

contract ProtocolContract {
    StakingToken public stakingToken;
    IRewardVault public rewardVault;

    mapping(address => uint256) public userActivity;

    constructor(address _vaultFactory) {
        // Create new staking token
        stakingToken = new StakingToken();

        // Create vault for newly created token
        address vaultAddress = IRewardVaultFactory(_vaultFactory)
            .createRewardVault(address(stakingToken));

        rewardVault = IRewardVault(vaultAddress);
    }

    function addActivity(address user, uint256 amount) external {
        // Protocol actions/logic here
        userActivity[user] += amount;

        // Mint StakingTokens
        stakingToken.mint(address(this), amount);

        // Stake tokens in RewardVault on behalf of user
        stakingToken.approve(address(rewardVault), amount);
        rewardVault.delegateStake(user, amount);
    }

    function removeActivity(address user, uint256 amount) external {
        // Protocol actions/logic here
        require(userActivity[user] >= amount, "Insufficient user activity");
        userActivity[user] -= amount;

        // Withdraw tokens from the RewardVault
        rewardVault.delegateWithdraw(user, amount);

        // Burn the withdrawn StakingTokens
        stakingToken.burn(address(this), amount);
    }
}
```

This contract is a simple representation of an arbitrary protocol's contract:

-   `userActivity` represents the internal accounting and logic specific to that protocol
-   The remainder of the `addActivity` and `removeActivity` methods mint and burn `StakingTokens`, and interacts with the relevant RewardVault to stake/unstake on behalf of users

#### 3\. Add the PoL Interfaces at `src/interfaces/IRewardVaults.sol`: [​](https://docs.berachain.com/developers/guides/advanced-pol#_3-add-the-pol-interfaces-at-src-interfaces-irewardvaults-sol)

solidity

```
pragma solidity ^0.8.19;

interface IRewardVault {
    function delegateStake(address account, uint256 amount) external;

    function delegateWithdraw(address account, uint256 amount) external;

    function getTotalDelegateStaked(
        address account
    ) external view returns (uint256);

}

interface IRewardVaultFactory {
    function createRewardVault(
        address stakingToken
    ) external returns (address);
}
```

These interfaces define the methods for spinning up a new RewardVault from the Factory contract, and for subsequently interacting with it.

## Testing the Integration [​](https://docs.berachain.com/developers/guides/advanced-pol#testing-the-integration)

Now, we wire everything together with tests to ensure that the integration works as expected. Below is an example test suite for the `ProtocolContract` contract.

Feel free to look at each individual test to get a better idea on how successful scenarios are handled.

solidity

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/ProtocolContract.sol";
import {IRewardVault, IRewardVaultFactory} from "../src/interfaces/IRewardVaults.sol";

contract ProtocolContractTest is Test {
    ProtocolContract public protocol;
    IRewardVault public rewardVault;

    address public user1 = address(0x1);
    address public user2 = address(0x2);

    function setUp() public {
        IRewardVaultFactory vaultFactory = IRewardVaultFactory(
            0x94Ad6Ac84f6C6FbA8b8CCbD71d9f4f101def52a8
        );
        protocol = new ProtocolContract(address(vaultFactory));
        rewardVault = protocol.rewardVault();
    }

    function testAddActivity() public {
        protocol.addActivity(user1, 1);
        assertEq(protocol.userActivity(user1), 1);
        assertEq(rewardVault.getTotalDelegateStaked(user1), 1);
    }

    function testRemoveActivity() public {
        protocol.addActivity(user1, 2);

        vm.warp(block.timestamp + 1 days);

        protocol.removeActivity(user1, 1);
        assertEq(protocol.userActivity(user1), 1);
        assertEq(rewardVault.getTotalDelegateStaked(user1), 1);
    }

    function testMultipleUsers() public {
        protocol.addActivity(user1, 1);
        protocol.addActivity(user2, 2);
        assertEq(rewardVault.getTotalDelegateStaked(user1), 1);
        assertEq(rewardVault.getTotalDelegateStaked(user2), 2);
    }
}
```

### Run the Test [​](https://docs.berachain.com/developers/guides/advanced-pol#run-the-test)

Finally, we run the test to check that the integration works as expected:

bash

```
# FROM: ./pol-smart-stake

forge test --rpc-url https://rpc.berachain.com/;

# [Expected Output]:
# [⠊] Compiling...x
# No files changed, compilation skipped

# Ran 3 tests for test/StakingToken.t.sol:ProtocolContractTest
# [PASS] testAddActivity() (gas: 252067)
# [PASS] testMultipleUsers() (gas: 371503)
# [PASS] testRemoveActivity() (gas: 272693)
# Suite result: ok. 3 passed; 0 failed; 0 skipped; finished in 1.73s (1.22ms CPU time)
```

# Developer Tools [​](https://docs.berachain.com/developers/developer-tools#developer-tools)

This section provides an overview of the developer tools that are available on the Berachain network.

Since Berachain is EVM-compatible, if you're familiar with creating dApps on other EVM chains then you'll feel right at home building on Berachain.

### Smart Contract Programming Languages [​](https://docs.berachain.com/developers/developer-tools#smart-contract-programming-languages)

-   [Solidity](https://docs.soliditylang.org/en/v0.8.20/)
-   [Vyper](https://docs.vyperlang.org/en/stable/)

### Development Environments [​](https://docs.berachain.com/developers/developer-tools#development-environments)

-   [Foundry](https://github.com/foundry-rs/foundry)
-   [Hardhat](https://hardhat.org/)
-   [Remix](https://remix.ethereum.org/)

### Frontend Libraries [​](https://docs.berachain.com/developers/developer-tools#frontend-libraries)

-   [Viem](https://viem.sh/)
-   [Ethers.js](https://docs.ethers.org/v5/)
-   [Web3.js](https://web3js.readthedocs.io/en/v1.10.0/)

### RPC & Infrastructure Providers [​](https://docs.berachain.com/developers/developer-tools#rpc-infrastructure-providers)

-   [QuickNode RPC](https://quicknode.notion.site/QuickNode-Benefits-for-Berachain-Developers-175d54ec5d644f598fde797633add2c1?pvs=4)
-   [Nirvana](https://nirvanalabs.io/nodes/berachain)
-   [Alchemy](https://docs.alchemy.com/reference/berachain-api-quickstart)
-   [Envio](https://envio.dev/) (optimized read-only)
-   [Validation Cloud](https://www.validationcloud.io/berachain-rpc) (RPC with full archive)
-   [BlockPI](https://blockpi.io/)
-   [Thirdweb](https://thirdweb.com/chainlist)
-   [Tenderly](https://dashboard.tenderly.co/)

### Wallets & Multisigs [​](https://docs.berachain.com/developers/developer-tools#wallets-multisigs)

-   [Metamask](https://metamask.io/)
-   [Frame](https://frame.sh/)
-   [Rabby](https://rabby.io/)
-   [Binance Web3 Wallet](https://www.binance.com/en/web3wallet)
-   [Keplr](https://keplr.app/)
-   [Rainbow Wallet](https://rainbow.me/en/)
-   [Safe](https://safe.berachain.com/welcome)

and a [full Geth JSON-RPC interface](https://geth.ethereum.org/docs/interacting-with-geth/rpc) for calling the chain.

## Authentication & Account Abstraction [​](https://docs.berachain.com/developers/developer-tools#authentication-account-abstraction)

-   [Privy](https://www.privy.io/)
-   [Dynamic](https://www.dynamic.xyz/)
-   [Para](https://getpara.com/)
-   [Thirdweb](https://thirdweb.com/explore/smart-wallet)
-   [Turnkey](https://www.turnkey.com/)
-   [ZeroDev](https://zerodev.app/)
-   [Particle](https://particle.network/)

### Subgraphs & Data Indexers [​](https://docs.berachain.com/developers/developer-tools#subgraphs-data-indexers)

-   [Goldsky](https://docs.goldsky.com/chains/berachain)
-   [Ghost Graph](https://ghostgraph.xyz/)
-   [GoldRush (powered by Covalent)](https://goldrush.dev/docs/networks/berachain-testnet/)
-   [Envio](https://envio.dev/)
-   [The Graph](https://thegraph.com/)
-   [Thirdweb](https://thirdweb.com/insight?ref=blog.thirdweb.com)

### Oracles [​](https://docs.berachain.com/developers/developer-tools#oracles)

-   [API3](https://api3.org/)
-   [Chronicle](https://chroniclelabs.org/)
-   [Pyth](https://pyth.network/)
-   [Redstone](https://docs.redstone.finance/docs/introduction)
-   [Stork](https://www.stork.network/)
-   [Supra](https://supra.com/)

### Automation [​](https://docs.berachain.com/developers/developer-tools#automation)

-   [Gelato](https://www.gelato.network/web3-functions)

### Verifiable Randomness [​](https://docs.berachain.com/developers/developer-tools#verifiable-randomness)

-   [Gelato](https://app.gelato.network/vrf)
-   [Pyth](https://docs.pyth.network/entropy)

# Deployed Contract Addresses [​](https://docs.berachain.com/developers/deployed-contracts#deployed-contract-addresses)

These are a list of addresses where contracts can be read or written to.

> A full list of Contract ABIs can be found at [https://github.com/berachain/doc-abis](https://github.com/berachain/doc-abis)

| Name                                                                                                 | Address                                                                                                               | ABI                                                                                    |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [BeraChef](https://docs.berachain.com/developers/contracts/berachef)                                 | [0xdf960E8F3F19C481dDE769edEDD439ea1a63426a](https://berascan.com/address/0xdf960E8F3F19C481dDE769edEDD439ea1a63426a) | [ABI](https://github.com/berachain/doc-abis/blob/main/core/BeraChef.json)              |
| [BGT Token](https://docs.berachain.com/developers/contracts/bgt-token)                               | [0x656b95E550C07a9ffe548bd4085c72418Ceb1dba](https://berascan.com/address/0x656b95E550C07a9ffe548bd4085c72418Ceb1dba) | [ABI](https://github.com/berachain/doc-abis/blob/main/core/BGT.json)                   |
| [BGT Staker](https://docs.berachain.com/developers/contracts/bgt-staker)                             | [0x44F07Ce5AfeCbCC406e6beFD40cc2998eEb8c7C6](https://berascan.com/address/0x44F07Ce5AfeCbCC406e6beFD40cc2998eEb8c7C6) |                                                                                        |
| [Block Rewards Controller](https://docs.berachain.com/developers/contracts/block-rewards-controller) | [0x1AE7dD7AE06F6C58B4524d9c1f816094B1bcCD8e](https://berascan.com/address/0x1AE7dD7AE06F6C58B4524d9c1f816094B1bcCD8e) | [ABI](https://github.com/berachain/doc-abis/blob/main/core/BlockRewardController.json) |
| [CREATE2](https://docs.berachain.com/developers/contracts/create2)                                   | [0x4e59b44847b379578588920cA78FbF26c0B4956C](https://berascan.com/address/0x4e59b44847b379578588920cA78FbF26c0B4956C) |                                                                                        |
| [Distributor](https://docs.berachain.com/developers/contracts/distributor)                           | [0xD2f19a79b026Fb636A7c300bF5947df113940761](https://berascan.com/address/0xD2f19a79b026Fb636A7c300bF5947df113940761) | [ABI](https://github.com/berachain/doc-abis/blob/main/core/Distributor.json)           |
| [Fee Collector](https://docs.berachain.com/developers/contracts/fee-collector)                       | [0x7Bb8DdaC7FbE3FFC0f4B3c73C4F158B06CF82650](https://berascan.com/address/0x7Bb8DdaC7FbE3FFC0f4B3c73C4F158B06CF82650) | [ABI](https://github.com/berachain/doc-abis/blob/main/core/FeeCollector.json)          |
| [Governance](https://docs.berachain.com/developers/contracts/governance)                             | [0x4f4A5c2194B8e856b7a05B348F6ba3978FB6f6D5](https://berascan.com/address/0x4f4A5c2194B8e856b7a05B348F6ba3978FB6f6D5) |                                                                                        |
| [Honey Factory](https://docs.berachain.com/developers/contracts/honey-factory)                       | [0xA4aFef880F5cE1f63c9fb48F661E27F8B4216401](https://berascan.com/address/0xA4aFef880F5cE1f63c9fb48F661E27F8B4216401) | [ABI](https://github.com/berachain/doc-abis/blob/main/core/HoneyFactory.json)          |
| [Honey Token](https://docs.berachain.com/developers/contracts/honey-token)                           | [0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce](https://berascan.com/address/0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce) | [ABI](https://github.com/berachain/doc-abis/blob/main/core/HONEY.json)                 |
| [Multicall3](https://docs.berachain.com/developers/contracts/multicall3)                             | [0xcA11bde05977b3631167028862bE2a173976CA11](https://berascan.com/address/0xcA11bde05977b3631167028862bE2a173976CA11) | [ABI](https://github.com/berachain/doc-abis/blob/main/core/Multicall3.json)            |
| [Permit2](https://docs.berachain.com/developers/contracts/permit2)                                   | [0x000000000022D473030F116dDEE9F6B43aC78BA3](https://berascan.com/address/0x000000000022D473030F116dDEE9F6B43aC78BA3) |                                                                                        |
| [Reward Vault](https://docs.berachain.com/developers/contracts/reward-vault)                         |                                                                                                                       | [ABI](https://github.com/berachain/doc-abis/blob/main/core/RewardVault.json)           |
| [Reward Vault Factory](https://docs.berachain.com/developers/contracts/reward-vault-factory)         | [0x94Ad6Ac84f6C6FbA8b8CCbD71d9f4f101def52a8](https://berascan.com/address/0x94Ad6Ac84f6C6FbA8b8CCbD71d9f4f101def52a8) | [ABI](https://github.com/berachain/doc-abis/blob/main/core/RewardVaultFactory.json)    |
| [TimeLock](https://docs.berachain.com/developers/contracts/timelock)                                 | [0xb5f2000b5744f207c931526cAE2134cAa8b6862a](https://berascan.com/address/0xb5f2000b5744f207c931526cAE2134cAa8b6862a) |                                                                                        |
| [USDC Token](https://docs.berachain.com/developers/deployed-contracts)                               | [0x549943e04f40284185054145c6E4e9568C1D3241](https://berascan.com/address/0x549943e04f40284185054145c6E4e9568C1D3241) |                                                                                        |
| [WBERA Token](https://docs.berachain.com/developers/contracts/wbera-token)                           | [0x6969696969696969696969696969696969696969](https://berascan.com/address/0x6969696969696969696969696969696969696969) | [ABI](https://github.com/berachain/doc-abis/blob/main/core/WBERA.json)                 |
| [WBTC Token](https://docs.berachain.com/developers/deployed-contracts)                               | [0x0555E30da8f98308EdB960aa94C0Db47230d2B9c](https://berascan.com/address/0x0555E30da8f98308EdB960aa94C0Db47230d2B9c) |                                                                                        |
| [WETH Token](https://docs.berachain.com/developers/deployed-contracts)                               | [0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590](https://berascan.com/address/0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590) |                                                                                        |

# WBERA [​](https://docs.berachain.com/developers/contracts/wbera-token#wbera)

> [0x6969696969696969696969696969696969696969](https://berascan.com/address/0x6969696969696969696969696969696969696969) \| [ABI JSON](https://github.com/berachain/doc-abis/blob/main/core/WBERA.json)

**Inherits:** [Solady WETH](https://github.com/vectorized/solady/blob/main/src/tokens/WETH.sol)

## Functions [​](https://docs.berachain.com/developers/contracts/wbera-token#functions)

### deposit [​](https://docs.berachain.com/developers/contracts/wbera-token#deposit)

solidity

```
function deposit() external payable;
```

### withdraw [​](https://docs.berachain.com/developers/contracts/wbera-token#withdraw)

solidity

```
function withdraw(uint256) external;
```

### name [​](https://docs.berachain.com/developers/contracts/wbera-token#name)

solidity

```
function name() public pure override returns (string memory);
```

### symbol [​](https://docs.berachain.com/developers/contracts/wbera-token#symbol)

solidity

```
function symbol() public pure override returns (string memory);
```

### decimals [​](https://docs.berachain.com/developers/contracts/wbera-token#decimals)

Returns the number of decimals used to get its user representation.

For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5,05` ( `505 / 10 ** 2`).

solidity

```
function decimals() public view returns (uint8);
```

### totalSupply [​](https://docs.berachain.com/developers/contracts/wbera-token#totalsupply)

Returns the amount of tokens in existence.

solidity

```
function totalSupply() public view override returns (uint256);
```

### balanceOf [​](https://docs.berachain.com/developers/contracts/wbera-token#balanceof)

Returns the amount of tokens owned by `owner`.

solidity

```
function balanceOf(address account) public view override returns (uint256);
```

### transfer [​](https://docs.berachain.com/developers/contracts/wbera-token#transfer)

Transfer `amount` tokens from the caller to `to`.

-   the caller must have a balance of at least `amount`

solidity

```
function transfer(address recipient, uint256 amount) public virtual override returns (bool);
```

### allowance [​](https://docs.berachain.com/developers/contracts/wbera-token#allowance)

Returns the amount of tokens that `spender` can spend on behalf of `owner`.

solidity

```
function allowance(address owner, address spender) public view virtual override returns (uint256);
```

### approve [​](https://docs.berachain.com/developers/contracts/wbera-token#approve)

Sets `amount` as the allowance of `spender` over the caller's tokens.

solidity

```
function approve(address spender, uint256 amount) public virtual override returns (bool);
```

### transferFrom [​](https://docs.berachain.com/developers/contracts/wbera-token#transferfrom)

Transfers `amount` tokens from `from` to `to`.

-   `sender` must have a balance of at least `amount`
-   the caller must have allowance for `sender`'s tokens of at least `amount`

solidity

```
function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool);
```

# RewardVault [​](https://docs.berachain.com/developers/contracts/reward-vault#rewardvault)

The RewardVault contract is the main Proof of Liquidity integration point for network incentives, handling the staking (of LP tokens) and rewards accounting of $BGT.

Rewards calculation is inspired by the battle-tested [Synthetix StakingRewards Contract](https://github.com/Synthetixio/synthetix/blob/develop/contracts/StakingRewards.sol).

## Functions [​](https://docs.berachain.com/developers/contracts/reward-vault#functions)

### distributor [​](https://docs.berachain.com/developers/contracts/reward-vault#distributor)

Get the address that is allowed to distribute rewards.

solidity

```
function distributor() external view returns (address);
```

**Returns**

| Name     | Type      | Description                                        |
| -------- | --------- | -------------------------------------------------- |
| `<none>` | `address` | The address that is allowed to distribute rewards. |

### operator [​](https://docs.berachain.com/developers/contracts/reward-vault#operator)

Get the operator for an account.

solidity

```
function operator(address account) external view returns (address);
```

**Parameters**

| Name      | Type      | Description                          |
| --------- | --------- | ------------------------------------ |
| `account` | `address` | The account to get the operator for. |

**Returns**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `<none>` | `address` | The operator for the account. |

### getWhitelistedTokensCount [​](https://docs.berachain.com/developers/contracts/reward-vault#getwhitelistedtokenscount)

Get the count of active incentive tokens.

solidity

```
function getWhitelistedTokensCount() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                           |
| -------- | --------- | ------------------------------------- |
| `<none>` | `uint256` | The count of active incentive tokens. |

### getWhitelistedTokens [​](https://docs.berachain.com/developers/contracts/reward-vault#getwhitelistedtokens)

Get the list of whitelisted tokens.

solidity

```
function getWhitelistedTokens() external view returns (address[] memory);
```

**Returns**

| Name     | Type        | Description                     |
| -------- | ----------- | ------------------------------- |
| `<none>` | `address[]` | The list of whitelisted tokens. |

### getTotalDelegateStaked [​](https://docs.berachain.com/developers/contracts/reward-vault#gettotaldelegatestaked)

Get the total amount staked by delegates.

solidity

```
function getTotalDelegateStaked(address account) external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                           |
| -------- | --------- | ------------------------------------- |
| `<none>` | `uint256` | The total amount staked by delegates. |

### getDelegateStake [​](https://docs.berachain.com/developers/contracts/reward-vault#getdelegatestake)

Get the amount staked by a delegate on behalf of an account.

solidity

```
function getDelegateStake(address account, address delegate) external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                      |
| -------- | --------- | -------------------------------- |
| `<none>` | `uint256` | The amount staked by a delegate. |

### initialize [​](https://docs.berachain.com/developers/contracts/reward-vault#initialize)

Initialize the vault, this is only callable once and by the factory since its the deployer.

solidity

```
function initialize(address _berachef, address _bgt, address _distributor, address _stakingToken) external;
```

**Parameters**

| Name            | Type      | Description                       |
| --------------- | --------- | --------------------------------- |
| `_berachef`     | `address` | The address of the berachef.      |
| `_bgt`          | `address` | The address of the BGT token.     |
| `_distributor`  | `address` | The address of the distributor.   |
| `_stakingToken` | `address` | The address of the staking token. |

### setDistributor [​](https://docs.berachain.com/developers/contracts/reward-vault#setdistributor)

Allows the owner to set the contract that is allowed to distribute rewards.

solidity

```
function setDistributor(address _rewardDistribution) external;
```

**Parameters**

| Name                  | Type      | Description                                        |
| --------------------- | --------- | -------------------------------------------------- |
| `_rewardDistribution` | `address` | The address that is allowed to distribute rewards. |

### notifyRewardAmount [​](https://docs.berachain.com/developers/contracts/reward-vault#notifyrewardamount)

Allows the distributor to notify the reward amount.

solidity

```
function notifyRewardAmount(bytes calldata pubkey, uint256 reward) external;
```

**Parameters**

| Name     | Type      | Description                     |
| -------- | --------- | ------------------------------- |
| `pubkey` | `bytes`   | The pubkey of the validator.    |
| `reward` | `uint256` | The amount of reward to notify. |

### recoverERC20 [​](https://docs.berachain.com/developers/contracts/reward-vault#recovererc20)

Allows the owner to recover any ERC20 token from the vault.

solidity

```
function recoverERC20(address tokenAddress, uint256 tokenAmount) external;
```

**Parameters**

| Name           | Type      | Description                          |
| -------------- | --------- | ------------------------------------ |
| `tokenAddress` | `address` | The address of the token to recover. |
| `tokenAmount`  | `uint256` | The amount of token to recover.      |

### setRewardsDuration [​](https://docs.berachain.com/developers/contracts/reward-vault#setrewardsduration)

Allows the owner to update the duration of the rewards.

solidity

```
function setRewardsDuration(uint256 _rewardsDuration) external;
```

**Parameters**

| Name               | Type      | Description                      |
| ------------------ | --------- | -------------------------------- |
| `_rewardsDuration` | `uint256` | The new duration of the rewards. |

### whitelistIncentiveToken [​](https://docs.berachain.com/developers/contracts/reward-vault#whitelistincentivetoken)

Allows the owner to whitelist a token to incentivize with.

solidity

```
function whitelistIncentiveToken(address token, uint256 minIncentiveRate, address manager) external;
```

**Parameters**

| Name               | Type      | Description                                                      |
| ------------------ | --------- | ---------------------------------------------------------------- |
| `token`            | `address` | The address of the token to whitelist.                           |
| `minIncentiveRate` | `uint256` | The minimum amount of the token to incentivize per BGT emission. |
| `manager`          | `address` | The address of the manager that can addIncentive for this token. |

### removeIncentiveToken [​](https://docs.berachain.com/developers/contracts/reward-vault#removeincentivetoken)

Allows the owner to remove a whitelisted incentive token.

solidity

```
function removeIncentiveToken(address token) external;
```

**Parameters**

| Name    | Type      | Description                         |
| ------- | --------- | ----------------------------------- |
| `token` | `address` | The address of the token to remove. |

### setMaxIncentiveTokensCount [​](https://docs.berachain.com/developers/contracts/reward-vault#setmaxincentivetokenscount)

Allows the owner to update the maxIncentiveTokensCount.

solidity

```
function setMaxIncentiveTokensCount(uint8 _maxIncentiveTokensCount) external;
```

**Parameters**

| Name                       | Type    | Description                       |
| -------------------------- | ------- | --------------------------------- |
| `_maxIncentiveTokensCount` | `uint8` | The new maxIncentiveTokens count. |

### pause [​](https://docs.berachain.com/developers/contracts/reward-vault#pause)

Allows the owner to pause the vault.

solidity

```
function pause() external;
```

### unpause [​](https://docs.berachain.com/developers/contracts/reward-vault#unpause)

Allows the owner to unpause the vault.

solidity

```
function unpause() external;
```

### exit [​](https://docs.berachain.com/developers/contracts/reward-vault#exit)

Exit the vault with the staked tokens and claim the reward.

_Only the account holder can call this function, not the operator._

_Clears out the user self-staked balance and rewards._

solidity

```
function exit(address recipient) external;
```

**Parameters**

| Name        | Type      | Description                              |
| ----------- | --------- | ---------------------------------------- |
| `recipient` | `address` | The address to send the 'BGT' reward to. |

### getReward [​](https://docs.berachain.com/developers/contracts/reward-vault#getreward)

Claim the reward.

_The operator only handles BGT, not STAKING_TOKEN._

_Callable by the operator or the account holder._

solidity

```
function getReward(address account, address recipient) external returns (uint256);
```

**Parameters**

| Name        | Type      | Description                        |
| ----------- | --------- | ---------------------------------- |
| `account`   | `address` | The account to get the reward for. |
| `recipient` | `address` | The address to send the reward to. |

**Returns**

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `<none>` | `uint256` | The amount of the reward claimed. |

### stake [​](https://docs.berachain.com/developers/contracts/reward-vault#stake)

Stake tokens in the vault.

solidity

```
function stake(uint256 amount) external;
```

**Parameters**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `amount` | `uint256` | The amount of tokens to stake. |

### delegateStake [​](https://docs.berachain.com/developers/contracts/reward-vault#delegatestake)

Stake tokens on behalf of another account.

solidity

```
function delegateStake(address account, uint256 amount) external;
```

**Parameters**

| Name      | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `account` | `address` | The account to stake for.      |
| `amount`  | `uint256` | The amount of tokens to stake. |

### withdraw [​](https://docs.berachain.com/developers/contracts/reward-vault#withdraw)

Withdraw the staked tokens from the vault.

solidity

```
function withdraw(uint256 amount) external;
```

**Parameters**

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `amount` | `uint256` | The amount of tokens to withdraw. |

### delegateWithdraw [​](https://docs.berachain.com/developers/contracts/reward-vault#delegatewithdraw)

Withdraw tokens staked on behalf of another account by the delegate (msg.sender).

solidity

```
function delegateWithdraw(address account, uint256 amount) external;
```

**Parameters**

| Name      | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `account` | `address` | The account to withdraw for.      |
| `amount`  | `uint256` | The amount of tokens to withdraw. |

### setOperator [​](https://docs.berachain.com/developers/contracts/reward-vault#setoperator)

Allows msg.sender to set another address to claim and manage their rewards.

solidity

```
function setOperator(address _operator) external;
```

**Parameters**

| Name        | Type      | Description                                                   |
| ----------- | --------- | ------------------------------------------------------------- |
| `_operator` | `address` | The address that will be allowed to claim and manage rewards. |

### updateIncentiveManager [​](https://docs.berachain.com/developers/contracts/reward-vault#updateincentivemanager)

Update the manager of an incentive token.

_Permissioned function, only allow factory owner to update the manager._

solidity

```
function updateIncentiveManager(address token, address newManager) external;
```

**Parameters**

| Name         | Type      | Description                             |
| ------------ | --------- | --------------------------------------- |
| `token`      | `address` | The address of the incentive token.     |
| `newManager` | `address` | The new manager of the incentive token. |

### addIncentive [​](https://docs.berachain.com/developers/contracts/reward-vault#addincentive)

Add an incentive token to the vault.

The incentive token's transfer should not exceed a gas usage of 500k units. In case the transfer exceeds 500k gas units, your incentive will fail to be transferred to the validator and its delegates.

_Permissioned function, only callable by incentive token manager._

solidity

```
function addIncentive(address token, uint256 amount, uint256 incentiveRate) external;
```

**Parameters**

| Name            | Type      | Description                                              |
| --------------- | --------- | -------------------------------------------------------- |
| `token`         | `address` | The address of the token to add as an incentive.         |
| `amount`        | `uint256` | The amount of the token to add as an incentive.          |
| `incentiveRate` | `uint256` | The amount of the token to incentivize per BGT emission. |

## Events [​](https://docs.berachain.com/developers/contracts/reward-vault#events)

### DelegateStaked [​](https://docs.berachain.com/developers/contracts/reward-vault#delegatestaked)

Emitted when a delegate has staked on behalf of an account.

solidity

```
event DelegateStaked(address indexed account, address indexed delegate, uint256 amount);
```

**Parameters**

| Name       | Type      | Description                            |
| ---------- | --------- | -------------------------------------- |
| `account`  | `address` | The account whose delegate has staked. |
| `delegate` | `address` | The delegate that has staked.          |
| `amount`   | `uint256` | The amount of staked tokens.           |

### DelegateWithdrawn [​](https://docs.berachain.com/developers/contracts/reward-vault#delegatewithdrawn)

Emitted when a delegate has withdrawn on behalf of an account.

solidity

```
event DelegateWithdrawn(address indexed account, address indexed delegate, uint256 amount);
```

**Parameters**

| Name       | Type      | Description                               |
| ---------- | --------- | ----------------------------------------- |
| `account`  | `address` | The account whose delegate has withdrawn. |
| `delegate` | `address` | The delegate that has withdrawn.          |
| `amount`   | `uint256` | The amount of withdrawn tokens.           |

### Recovered [​](https://docs.berachain.com/developers/contracts/reward-vault#recovered)

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

### OperatorSet [​](https://docs.berachain.com/developers/contracts/reward-vault#operatorset)

Emitted when the msg.sender has set an operator to handle its rewards.

solidity

```
event OperatorSet(address account, address operator);
```

**Parameters**

| Name       | Type      | Description                            |
| ---------- | --------- | -------------------------------------- |
| `account`  | `address` | The account that has set the operator. |
| `operator` | `address` | The operator that has been set.        |

### DistributorSet [​](https://docs.berachain.com/developers/contracts/reward-vault#distributorset)

Emitted when the distributor is set.

solidity

```
event DistributorSet(address indexed distributor);
```

**Parameters**

| Name          | Type      | Description                     |
| ------------- | --------- | ------------------------------- |
| `distributor` | `address` | The address of the distributor. |

### IncentiveManagerChanged [​](https://docs.berachain.com/developers/contracts/reward-vault#incentivemanagerchanged)

Emitted when the manager of an incentive token is changed.

solidity

```
event IncentiveManagerChanged(address indexed token, address newManager, address oldManager);
```

**Parameters**

| Name         | Type      | Description                             |
| ------------ | --------- | --------------------------------------- |
| `token`      | `address` | The address of the incentive token.     |
| `newManager` | `address` | The new manager of the incentive token. |
| `oldManager` | `address` | The old manager of the incentive token. |

### IncentiveTokenWhitelisted [​](https://docs.berachain.com/developers/contracts/reward-vault#incentivetokenwhitelisted)

Emitted when an incentive token is whitelisted.

solidity

```
event IncentiveTokenWhitelisted(address indexed token, uint256 minIncentiveRate, address manager);
```

**Parameters**

| Name               | Type      | Description                                                                |
| ------------------ | --------- | -------------------------------------------------------------------------- |
| `token`            | `address` | The address of the token that has been whitelisted.                        |
| `minIncentiveRate` | `uint256` | The minimum amount of the token to incentivize per BGT emission.           |
| `manager`          | `address` | The address of the manager that can addIncentive for this incentive token. |

### IncentiveTokenRemoved [​](https://docs.berachain.com/developers/contracts/reward-vault#incentivetokenremoved)

Emitted when an incentive token is removed.

solidity

```
event IncentiveTokenRemoved(address indexed token);
```

**Parameters**

| Name    | Type      | Description                                     |
| ------- | --------- | ----------------------------------------------- |
| `token` | `address` | The address of the token that has been removed. |

### MaxIncentiveTokensCountUpdated [​](https://docs.berachain.com/developers/contracts/reward-vault#maxincentivetokenscountupdated)

Emitted when maxIncentiveTokensCount is updated.

solidity

```
event MaxIncentiveTokensCountUpdated(uint8 maxIncentiveTokensCount);
```

**Parameters**

| Name                      | Type    | Description                        |
| ------------------------- | ------- | ---------------------------------- |
| `maxIncentiveTokensCount` | `uint8` | The max count of incentive tokens. |

### IncentivesProcessed [​](https://docs.berachain.com/developers/contracts/reward-vault#incentivesprocessed)

Emitted when incentives are processed for the operator of a validator.

solidity

```
event IncentivesProcessed(bytes indexed pubkey, address indexed token, uint256 bgtEmitted, uint256 amount);
```

### IncentivesProcessFailed [​](https://docs.berachain.com/developers/contracts/reward-vault#incentivesprocessfailed)

Emitted when incentives fail to be processed for the operator of a validator.

solidity

```
event IncentivesProcessFailed(bytes indexed pubkey, address indexed token, uint256 bgtEmitted, uint256 amount);
```

### IncentiveAdded [​](https://docs.berachain.com/developers/contracts/reward-vault#incentiveadded)

Emitted when incentives are added to the vault.

solidity

```
event IncentiveAdded(address indexed token, address sender, uint256 amount, uint256 incentiveRate);
```

**Parameters**

| Name            | Type      | Description                                              |
| --------------- | --------- | -------------------------------------------------------- |
| `token`         | `address` | The incentive token.                                     |
| `sender`        | `address` | The address that added the incentive.                    |
| `amount`        | `uint256` | The amount of the incentive.                             |
| `incentiveRate` | `uint256` | The amount of the token to incentivize per BGT emission. |

# RewardVaultFactory [​](https://docs.berachain.com/developers/contracts/reward-vault-factory#rewardvaultfactory)

> [0x94Ad6Ac84f6C6FbA8b8CCbD71d9f4f101def52a8](https://berascan.com/address/0x94Ad6Ac84f6C6FbA8b8CCbD71d9f4f101def52a8) \| [ABI JSON](https://github.com/berachain/doc-abis/blob/main/core/RewardVaultFactory.json)

## Functions [​](https://docs.berachain.com/developers/contracts/reward-vault-factory#functions)

### createRewardVault [​](https://docs.berachain.com/developers/contracts/reward-vault-factory#createrewardvault)

Creates a new reward vault for the given staking token.

_Reverts if the staking token is not a contract._

_Reverts if a vault already exists for the given staking token and the base vault implementation hasn't changed as its deployment is deterministic._

solidity

```
function createRewardVault(address stakingToken) external returns (address);
```

**Parameters**

| Name           | Type      | Description                       |
| -------------- | --------- | --------------------------------- |
| `stakingToken` | `address` | The address of the staking token. |

**Returns**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `<none>` | `address` | The address of the new vault. |

### setRewardVaultImplementation [​](https://docs.berachain.com/developers/contracts/reward-vault-factory#setrewardvaultimplementation)

Updates the vault implementation.

_Only callable by the governance._

solidity

```
function setRewardVaultImplementation(address _vaultImpl) external;
```

**Parameters**

| Name         | Type      | Description                                  |
| ------------ | --------- | -------------------------------------------- |
| `_vaultImpl` | `address` | The address of the new vault implementation. |

### VAULT_MANAGER_ROLE [​](https://docs.berachain.com/developers/contracts/reward-vault-factory#vault-manager-role)

Gets the VAULT_MANAGER_ROLE.

solidity

```
function VAULT_MANAGER_ROLE() external view returns (bytes32);
```

**Returns**

| Name     | Type      | Description             |
| -------- | --------- | ----------------------- |
| `<none>` | `bytes32` | The VAULT_MANAGER_ROLE. |

### getVault [​](https://docs.berachain.com/developers/contracts/reward-vault-factory#getvault)

Gets the vault for the given staking token.

solidity

```
function getVault(address stakingToken) external view returns (address);
```

**Parameters**

| Name           | Type      | Description                       |
| -------------- | --------- | --------------------------------- |
| `stakingToken` | `address` | The address of the staking token. |

**Returns**

| Name     | Type      | Description               |
| -------- | --------- | ------------------------- |
| `<none>` | `address` | The address of the vault. |

### allVaultsLength [​](https://docs.berachain.com/developers/contracts/reward-vault-factory#allvaultslength)

Gets the number of vaults that have been created.

solidity

```
function allVaultsLength() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description           |
| -------- | --------- | --------------------- |
| `<none>` | `uint256` | The number of vaults. |

### predictRewardVaultAddress [​](https://docs.berachain.com/developers/contracts/reward-vault-factory#predictrewardvaultaddress)

Predicts the address of the reward vault for the given staking token.

solidity

```
function predictRewardVaultAddress(address stakingToken) external view returns (address);
```

**Parameters**

| Name           | Type      | Description                       |
| -------------- | --------- | --------------------------------- |
| `stakingToken` | `address` | The address of the staking token. |

**Returns**

| Name     | Type      | Description                      |
| -------- | --------- | -------------------------------- |
| `<none>` | `address` | The address of the reward vault. |

## Events [​](https://docs.berachain.com/developers/contracts/reward-vault-factory#events)

### VaultCreated [​](https://docs.berachain.com/developers/contracts/reward-vault-factory#vaultcreated)

Emitted when a new vault is created.

solidity

```
event VaultCreated(address indexed stakingToken, address indexed vault);
```

**Parameters**

| Name           | Type      | Description                       |
| -------------- | --------- | --------------------------------- |
| `stakingToken` | `address` | The address of the staking token. |
| `vault`        | `address` | The address of the vault.         |
