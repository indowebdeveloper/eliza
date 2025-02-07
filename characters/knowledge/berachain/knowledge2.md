# Block Production and Emissions [​](https://docs.berachain.com/learn/pol/bgtmath#block-production-and-emissions)

Proof-of-Liquidity governs block rewards and token emissions on Berachain using the `$BGT` token. This page explains the mathematical principles behind validator selection, block rewards, and emissions calculations.

## Validator Selection [​](https://docs.berachain.com/learn/pol/bgtmath#validator-selection)

The network maintains an active set of N validators who are eligible for block production. Selection criteria include:

-   Only top N validators by `$BERA` stake are included in active set
-   Block proposal probability is proportional to staked `$BERA` and does not affect reward amounts
-   Stake limitations per validator:
    -   Minimum: 250,000 `$BERA`
    -   Maximum: 10,000,000 `$BERA`

## $BGT Emissions Structure [​](https://docs.berachain.com/learn/pol/bgtmath#bgt-emissions-structure)

When a validator produces a block, `$BGT` tokens are emitted through two emission components:

1. Base Emission

    - **Fixed amount** equal to a `base rate` parameter (B)
    - Paid directly to block-producing validator

2. Reward Vault Emission

    - **Variable amount** dependent on validator's boost (x)
        - i.e. percentage of total `$BGT` delegated to the validator
    - Distributed to [Reward Vaults](https://docs.berachain.com/learn/pol/rewardvaults) selected by validator
        - Proportional to weights configured in the validator's [Reward Allocation](https://docs.berachain.com/nodes/guides/reward-allocation)
        - Valdators receive [Incentives](https://docs.berachain.com/learn/pol/incentives) from projects based on amounts directed to their Reward Vaults

## Validator Boosts [​](https://docs.berachain.com/learn/pol/bgtmath#validator-boosts)

Boost is a crucial metric that determines a validator's reward emissions:

-   Calculated as the percentage of `$BGT` delegation a validator has compared to the total `$BGT` delegated in the network
-   Expressed as a decimal between 0 and 1
-   Example: If a validator has 1000 `$BGT` delegated and the network has 10000 total `$BGT` delegated, their boost would be 0.1 (10%) Higher boost leads to higher reward emissions, subject to the emission formula

## $BGT Emissions Per Block [​](https://docs.berachain.com/learn/pol/bgtmath#bgt-emissions-per-block)

The total `$BGT` emitted per block is calculated using the following formula:

emission=\[B+max(m,(a+1)(1−11+axb)R)\]

### Parameters [​](https://docs.berachain.com/learn/pol/bgtmath#parameters)

| Parameter                       | Description                                                      | Impact                                         |
| ------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------- |
| x (boost)                       | Fraction of total `$BGT` delegated to validator (range: \[0,1\]) | Determines `$BGT` emissions to Reward Vaults   |
| B (base rate)                   | Fixed amount of 0.5 `$BGT` for block production                  | Determines baseline validator rewards          |
| R (reward rate)                 | Base `$BGT` amount for reward vaults                             | Sets foundation for reward emissions           |
| a (boost multiplier)            | Boost impact coefficient                                         | Higher values increase boost importance        |
| b (convexity parameter)         | Boost impact curve steepness                                     | Higher values penalize low boost more severely |
| m (minimum boosted reward rate) | Floor for reward vault emissions                                 | Higher values benefit low-boost validators     |

### Sample Emissions Chart [​](https://docs.berachain.com/learn/pol/bgtmath#sample-emissions-chart)

Using the following sample parameters, we can visualize how emissions scale with `$BGT` delegation:

B=0.5,R=1.5,a=3.5,b=0.4,m=0

![chart showing how emissions scale with  delegation](https://docs.berachain.com/assets/updatedemission.CuRf4m7q.png)

## Max Block Inflation [​](https://docs.berachain.com/learn/pol/bgtmath#max-block-inflation)

`$BGT` emissions grow with the amount of boost a validator has, up to a cap. The Maximum theoretical block emission occurs at 100% boost:

maxE\[emission\]=\[B+max(m,aR)\]

# How To Get $BERA 🐻 [​](https://docs.berachain.com/learn/how-to-get-bera#how-to-get-bera-%F0%9F%90%BB)

`$BERA` is the network token used to pay for transactions on Berachain. This article describes a number of ways for users to obtain `$BERA` to participate in the network.

Learn more about the [BERA Token](https://docs.berachain.com/learn/pol/tokens/bera).

## Bridging 🤝 [​](https://docs.berachain.com/learn/how-to-get-bera#bridging-%F0%9F%A4%9D)

Bridging services enable users to transfer tokens from one blockchain to another. The canonical bridge to Berachain is the [Berachain Bridge](https://bridge.berachain.com/), powered by LayerZero. There are a number of source chains supporting bridging to Berachain.

When using the bridge, users have the option to exchange for a small amount of `$BERA` on the destination.

![Berachain Bridging](https://docs.berachain.com/assets/bera-bridge.png)

## Exchanges [​](https://docs.berachain.com/learn/how-to-get-bera#exchanges)

There are a number of centralized exchanges that have listed `$BERA`. Other assets can be traded for `$BERA` on these platforms and then bridged to Berachain.

# Glossary 📖 [​](https://docs.berachain.com/learn/help/glossary#glossary-%F0%9F%93%96)

## BERA Token [​](https://docs.berachain.com/learn/help/glossary#bera-token)

`$BERA` is the native gas token of Berachain's L1 and it serves multiple purposes:

-   Used for paying transaction fees
-   Initial validator staking token to secure the network
    -   More BERA staked = more blocks proposed
    -   Validators earn base emissions and transaction fees(ie MEV) for each block proposed
-   Can be obtained by burning BGT (one-way conversion)

Read more in [Tokens - $BERA](https://docs.berachain.com/learn/pol/tokens/bera).

## BGT(Bera Governance Token) [​](https://docs.berachain.com/learn/help/glossary#bgt-bera-governance-token)

`$BGT` is Berachain's staking and governance token, which is non-transferrable, can only be earned by participating in [Proof of Liquidity](https://docs.berachain.com/learn/help/glossary#proof-of-liquidity) (PoL):

-   Validator delegation and rewards
    -   More BGT delegated = more reward emissions for reward vaults s
-   Governance participation (proposals and voting)
-   Can be burned for `$BERA` (one-way conversion)
-   Can only be earned through participating in [Proof of Liquidity](https://docs.berachain.com/learn/help/glossary#proof-of-liquidity)

Read more in [Tokens - $BGT](https://docs.berachain.com/learn/pol/tokens/bgt).

## BeaconKit [​](https://docs.berachain.com/learn/help/glossary#beaconkit)

BeaconKit is a modular and customizable consensus layer framework, leveraging the CometBFT consensus algorithm, for building Ethereum based blockchains.

## Block [​](https://docs.berachain.com/learn/help/glossary#block)

A data unit containing a list of transactions, which is permanently added to the blockchain in a sequential manner.

## BeraSwap [​](https://docs.berachain.com/learn/help/glossary#beraswap)

Berachain's native [decentralized exchange](https://docs.berachain.com/learn/help/glossary#dex-decentralized-exchange), called _BeraSwap_. Read more in [Native dApps > BeraSwap](https://docs.berachain.com/learn/dapps/beraswap).

## Block Time [​](https://docs.berachain.com/learn/help/glossary#block-time)

The time it takes to create a new block on the blockchain. Berachain has an average block time of < 3 seconds. Note that block time can increase depending on the network congestion.

## CometBFT [​](https://docs.berachain.com/learn/help/glossary#cometbft)

A general purpose blockchain consensus engine used by Berachain to achieve high throughput and fast finality in transactions. Read more at [Cometbft.com](https://cometbft.com/).

## Consensus Client [​](https://docs.berachain.com/learn/help/glossary#consensus-client)

The consensus client is a piece of software that is responsible for achieving agreement among the network nodes about the current state of the blockchain. It handles the process of validating transactions and blocks, ensuring they adhere to network rules, and deciding which blocks get added to the blockchain. The consensus client focuses on network-wide rules and the order of transactions. It is often paired with an [execution client](https://docs.berachain.com/learn/help/glossary#execution-client).

## Consensus Mechanism [​](https://docs.berachain.com/learn/help/glossary#consensus-mechanism)

The protocol by which nodes in the Berachain network agree on the state of the blockchain. Berachain uses [Proof-of-Liquidity](https://docs.berachain.com/learn/help/glossary#proof-of-liquidity) to select validators based on their provided liquidity.

## Delegation [​](https://docs.berachain.com/learn/help/glossary#delegation)

The process by which a token holder grants voting or validation power to another participant in the network.

## DEX (Decentralized Exchange) [​](https://docs.berachain.com/learn/help/glossary#dex-decentralized-exchange)

A platform that enables the buying and selling of tokens directly on the blockchain, without a centralized intermediary. All liquidity is verifiably owned by smart contracts.

## Engine API [​](https://docs.berachain.com/learn/help/glossary#engine-api)

The Engine API is the interface that allows communication between the [execution](https://docs.berachain.com/learn/help/glossary#execution-client) and the [consensus](https://docs.berachain.com/learn/help/glossary#consensus-client) layer of an EVM node. [BeaconKit](https://docs.berachain.com/learn/help/glossary#beaconkit), as a consensus layer, leverages this to be easily paired with any execution client.

## Execution Client [​](https://docs.berachain.com/learn/help/glossary#execution-client)

An EVM (Ethereum Virtual Machine) execution client (sometimes referred to as the execution layer) is a software application that is responsible for the actual computation of transactions within blocks. It interprets and executes the code of smart contracts using the EVM, manages state changes, and executes the transaction logic. This client ensures that all actions are performed correctly according to the smart contract's code and EVM protocol.

EVM Execution Clients:

-   **Geth:** Official Go implementation of the Ethereum protocol.
-   **Erigon:** More performant, feature-rich client forked from go-ethereum.
-   **Nethermind:** .NET based client with full support for Ethereum protocols.
-   **Besu:** Enterprise-grade client, Apache 2.0 licensed, written in Java.
-   **Reth:** Rust-based client focusing on performance and reliability.
-   **Ethereumjs:** Javascript based client managed by the Ethereum Foundation.

## Finality [​](https://docs.berachain.com/learn/help/glossary#finality)

The assurance that once a transaction is confirmed on the blockchain, it cannot be altered or reversed. Berachain provides instant finality for transactions.

## Governance [​](https://docs.berachain.com/learn/help/glossary#governance)

The system by which decisions are made within the Berachain ecosystem. Governance involves proposals, voting, and the implementation of changes for PoL & Berachain's native dapps(BeraSwap, HoneySwap) using BGT tokens for participation. [Read more about Governance](https://docs.berachain.com/learn/governance/).

## HONEY [​](https://docs.berachain.com/learn/help/glossary#honey)

`$HONEY` is the native stablecoin of the Berachain ecosystem, soft-pegged to 1 USDC. It is used throughout the Berachain ecosystem and involves minting and burning fees. Read more in [Tokens - $HONEY](https://docs.berachain.com/learn/pol/tokens/honey).

## IBC [​](https://docs.berachain.com/learn/help/glossary#ibc)

Inter-Blockchain Communication protocol that handles transport of data between Cosmos blockchains.

## Liquidity [​](https://docs.berachain.com/learn/help/glossary#liquidity)

The availability of liquid assets to facilitate trading on the Berachain network. Liquidity is often provided by users through liquidity pools.

## Liquidity Pool [​](https://docs.berachain.com/learn/help/glossary#liquidity-pool)

A collection of funds locked in smart contracts, used to facilitate trading on decentralized exchanges and other DeFi services.

## Liquidity Provider [​](https://docs.berachain.com/learn/help/glossary#liquidity-provider)

A user who deposits tokens into a liquidity pool, earning a portion of fees generated from swaps in the pool, as well as other potential rewards (from PoL or otherwise).

## Mainnet [​](https://docs.berachain.com/learn/help/glossary#mainnet)

The primary network where transactions comprising real value occur on the Berachain blockchain, as opposed to test networks used for development.

## Proof-of-Liquidity [​](https://docs.berachain.com/learn/help/glossary#proof-of-liquidity)

A consensus mechanism which aligns economic incentives between validators, applications and users. Premised on a two-token model, validators have varying probabilities of being selected based on the amount of `$BERA` they have staked. Block rewards are distributed as `$BGT` tokens, the amount of which is influenced by the amount of `$BGT` delegated to them by users. This `$BGT` is deployed towards liquidity incentives to ecosystem protocols, for which validators receive incentives from the protocols in return.

## Single Slot Finality [​](https://docs.berachain.com/learn/help/glossary#single-slot-finality)

A process where [finality](https://docs.berachain.com/learn/help/glossary#finality) is achieved in the same block proposed. Sometimes also referred to as _Instant Finality_.

## Staking [​](https://docs.berachain.com/learn/help/glossary#staking)

The process of locking up tokens to support the operations of a blockchain network. In Berachain, staking is used to secure the network and participate in governance.

## Swap [​](https://docs.berachain.com/learn/help/glossary#swap)

The process of exchanging one token for another on a decentralized exchange. Swaps involve a fee, which varies depending on the pool's settings.

# Berachain Frequently Asked Questions ❓ [​](https://docs.berachain.com/learn/help/faqs#berachain-frequently-asked-questions-%E2%9D%93)

## What do Berachain's performance metrics look like? [​](https://docs.berachain.com/learn/help/faqs#what-do-berachain-s-performance-metrics-look-like)

Berachain has the following properties:

-   Block time: Block times varies, for latest feel free to check it out at [BeraScan Block Explorer](https://berascan.com/).
-   Transactions per Second (TPS): This can vary but the following should help with the number of possible transactions (Block gas limit (30m) / Average gas limit per txn) / Block time (2s) = TPS.
-   Finality: single slot finality

## What is a DEX? [​](https://docs.berachain.com/learn/help/faqs#what-is-a-dex)

DEX stands for Decentralized Exchange. It is a place where you can buy and sell tokens that lives directly on the chain instead of being run by any one centralized service. This means that all liquidity can be seen directly on-chain, and is verifiably owned by the smart contracts themselves. A DEX enables you to swap tokens directly from your wallet, as well as allowing anyone to launch their own tokens and provide liquidity.

## What is a swap? [​](https://docs.berachain.com/learn/help/faqs#what-is-a-swap)

A swap is the process of exchanging one token for another. This can be thought of as a buy or a sell, depending on which token you're looking at. For example, if you're looking to buy `$BERA` with `$ETH`, you would be swapping `$ETH` for `$BERA`. This is essentially "selling" `$ETH` and "buying" `$BERA`.

## How much does it cost to swap? [​](https://docs.berachain.com/learn/help/faqs#how-much-does-it-cost-to-swap)

Each swap has a fee which varies dependening on the fee that was set when the pool was created. Common fees are 0.05%, 0.1%, 0.3% or 1% but you should always check when performing a swap to ensure you are okay with the fee on that pool.

## What is liquidity? [​](https://docs.berachain.com/learn/help/faqs#what-is-liquidity)

Liquidity is the term for the amount of a token that is available to be swapped. The more liquidity a token has, the easier it is to swap that token.

## What is a liquidity pool? [​](https://docs.berachain.com/learn/help/faqs#what-is-a-liquidity-pool)

Liquidity pools are pairings of 2 or more tokens that liquidity providers deposit tokens into. This enables DEX users to swap between any of the tokens in the pool.

## What is a liquidity provider? [​](https://docs.berachain.com/learn/help/faqs#what-is-a-liquidity-provider)

Liquidity providers are users who deposit tokens into a liquidity pool. They are rewarded with a portion of the fees that are generated from swaps in the pool.

## What is APY? [​](https://docs.berachain.com/learn/help/faqs#what-is-apy)

APY stands for annual perentage yield. In the context of BeraSwap pools, this refers to the current APY for a given pool. APY yield comes from fees collected on every swap made using that pool?

## What is $HONEY? [​](https://docs.berachain.com/learn/help/faqs#what-is-honey)

`$HONEY` is the native stablecoin of the Berachain ecosystem. It is a multicollateral backed stablecoin, and is used throughout the Berachain ecosystem.

## Does it cost anything to mint or burn $HONEY? [​](https://docs.berachain.com/learn/help/faqs#does-it-cost-anything-to-mint-or-burn-honey)

In order to ensure stability, there is a small fee taken on every mint and burn of `$HONEY`. This fee is currently set to 0.2% of the amount minted or burned and can be changed via governance proposals.

Additionally, because minting & burning requires a transaction, there will be a small gas fee in `$BERA`.

## What stablecoins can I mint $HONEY with during Testnet? [​](https://docs.berachain.com/learn/help/faqs#what-stablecoins-can-i-mint-honey-with-during-testnet)

There are various USD-pegged stablecoins that can be used to mint `$HONEY`. Currently, the following stablecoins are supported:

-   stgUSDC
-   BYUSD

More tokens may be added based on governance.

## What is `$BGT`? [​](https://docs.berachain.com/learn/help/faqs#what-is-bgt)

$BGT is Berachain's staking & governance token. That means it is used to secure the network & earn rewards via Proof of Liquidity as well as to vote on governance proposals.

## What is a Validator? [​](https://docs.berachain.com/learn/help/faqs#what-is-a-validator)

A validator can refer to three things:

1. A blockchain node being run to validate transactions, produce blocks and come to consensus with other validators in the network
2. The entity that owns and operates the validator node
3. The blend of points #1 and #2 that manages a portion of Proof of Liquidity & Governance votes

## Why should I boost a validator with my `$BGT`? [​](https://docs.berachain.com/learn/help/faqs#why-should-i-boost-a-validator-with-my-bgt)

Delegating `$BGT` allows you to participate in Proof of Liquidity while helping secure the network.

## Why should I boost my `$BGT` instead of burning it for `$BERA`? [​](https://docs.berachain.com/learn/help/faqs#why-should-i-boost-my-bgt-instead-of-burning-it-for-bera)

Rewards are the main reason.

With Proof of Liquidity, you can earn many different types of rewards:

-   A share of protocol-provided [incentives](https://docs.berachain.com/learn/pol/incentives), provided in exchange for `$BGT` emissions directed to those protocols' Reward Vaults
-   A share of Berachain core dApp fees, namely fees from BeraSwap and HoneySwap

## How do I get `$BGT`? [​](https://docs.berachain.com/learn/help/faqs#how-do-i-get-bgt)

`$BGT` is earned through Reward Vaults when validators direct `$BGT` emissions towards Reward Vaults. See [Earning `$BGT`](https://docs.berachain.com/learn/pol/tokens/bgt#earning-bgt) for more.

## What is governance? [​](https://docs.berachain.com/learn/help/faqs#what-is-governance)

Governance is the process by which the community decides what changes are made to the Berachain protocol. This includes how the node is upgraded and what parameters are set for various components on the chain.

## Once you’ve provided liquidity into an eligible pool in BeraSwap (or some other PoL-eligible pool) how do you get `$BGT`? Is `$BGT` automatically sent to recipients? [​](https://docs.berachain.com/learn/help/faqs#once-you-ve-provided-liquidity-into-an-eligible-pool-in-beraswap-or-some-other-pol-eligible-pool-how-do-you-get-bgt-is-bgt-automatically-sent-to-recipients)

Each eligible (whitelisted) pool on BeraSwap has an associated LP token. Once liquidity is depositted into a BeraSwap pool, an LP token would be issued relative the users total contribution percentage to the pool. With this LP token, users must stake (take an additional action) them into their respective Reward Vaults in order to be eligible to receive `$BGT`. As validators direct `$BGT` emissions to Reward Vaults, a user will accumulate `$BGT` to claim. Users must perform an additional action to claim `$BGT`, it is _NOT_ automatically sent to the user. Users can claim their `$BGT` from any wallet address they choose.

## Can only Validators vote on or create proposals? [​](https://docs.berachain.com/learn/help/faqs#can-only-validators-vote-on-or-create-proposals)

Anyone with the required minimum amounts of `$BGT` can propose and vote on proposals.

## What is the actual staking token of the network, `$BERA` or `$BGT`? [​](https://docs.berachain.com/learn/help/faqs#what-is-the-actual-staking-token-of-the-network-bera-or-bgt)

-   Validators stake `$BERA`
-   Network incentives are received in `$BGT`

## Can validators with `$BERA` alone build blocks and what are the rewards? [​](https://docs.berachain.com/learn/help/faqs#can-validators-with-bera-alone-build-blocks-and-what-are-the-rewards)

Yes, validators only need to stake `$BERA` within the designated min and max range of 250K and 10M, and once in the active set they will propose blocks. Validators receive rewards in `$BGT`.

## Do incentives only go to the validators with `$BGT` boost? [​](https://docs.berachain.com/learn/help/faqs#do-incentives-only-go-to-the-validators-with-bgt-boost)

The incentives a validator receives depend solely on the amount of rewards offered in the specific reward vault that the validator chooses to fill.

## Can Reward Vaults route emissions to a single pool within a dApp, or only the whole dApp? [​](https://docs.berachain.com/learn/help/faqs#can-reward-vaults-route-emissions-to-a-single-pool-within-a-dapp-or-only-the-whole-dapp)

The dapp can request a Reward Vault for any encapsulated thing they want. The encapsulated thing just requires a representative ERC-20 token that users can stake in the vault. Developers also have the ability to stake in Vaults on [behalf of users](https://docs.berachain.com/developers/guides/advanced-pol).

# Berachain Governance [​](https://docs.berachain.com/learn/governance/#berachain-governance)

Berachain's Governance system uses `$BGT` to allow token holders to make important decisions about core functions of Proof of Liquidity & our core dapps. Here's a few examples of what governance can be used for:

-   Proof-of-Liquidity asset whitelisting (e.g., new staking assets, whitelisting incentive assets)
-   Native dApp governance (e.g., changes to BeraSwap's protocol fees)

## Governance Process [​](https://docs.berachain.com/learn/governance/#governance-process)

![Governance Process](https://docs.berachain.com/assets/governance-process.png)

The governance process on Berachain follows several stages:

1. **Proposal Creation**: Any user with sufficient voting power can create a governance proposal.

2. **Pending State**: Once created, the proposal enters a waiting period before becoming active for voting.

3. **Active Voting**: During the voting period, `$BGT` holders can cast their votes.

4. **Proposal Outcome**: After the voting period, the proposal is either marked as Succeeded or Defeated. A quorum of `$BGT` is required for a proposal to pass.

5. **Timelock**: If the proposal succeeds, it enters a queue with a timelock delay.

6. **Execution**: After the timelock period, the proposal can be executed, implementing the proposed changes.

## Guardian Oversight [​](https://docs.berachain.com/learn/governance/#guardian-oversight)

During the **Timelock** period, Berachain's guardian system provides an additional layer of security. Guardians can veto malicious proposals (e.g., hostile takeover, unauthorized code changes) to protect the Berachain ecosystem.

Guardians act through a 5-of-9 multisig with elected signers. Their veto power is enacted as a cancellation of a proposal during the timelock period, serving as a last line of defense against potentially harmful changes.

## Creating a Governance Proposal [​](https://docs.berachain.com/learn/governance/#creating-a-governance-proposal)

Governance proposals can be discussed and created on [BeraHub](https://hub.berachain.com/governance/general/).

Generally, creating a governance proposal on Berachain Governance requires adhering to the following:

1. **Ensure Sufficient Voting Power**: You need sufficient `$BGT`, either owned directly or delegated to you by other token holders.

2. **Delegate `$BGT`**: Even if you own the required `$BGT`, you must delegate it to yourself (or have it delegated by others) to gain voting power.

3. **Prepare Your Proposal**: Clearly define the changes you want to implement. For example, to whitelist a Reward Vault to the BeraChef contract, you would need to specify the vault address and encode the correct function signature.

4. **Submit the Proposal**: Use the governance contract to submit your proposal on-chain. This typically involves calling a `propose` function with the necessary parameters.

5. **Monitor and Participate**: Once submitted, monitor your proposal's progress through the various stages. Encourage other `$BGT` holders to vote and participate in discussions about your proposal.

6. **Execute if Passed**: If your proposal passes and completes the timelock period, you or another user can execute it to implement the changes.

For a detailed walkthrough of creating a governance proposal, including code examples and step-by-step instructions, please refer to our [full tutorial](https://github.com/berachain/guides/tree/main/apps/berachain-governance-proposal).

## Governance Parameters [​](https://docs.berachain.com/learn/governance/#governance-parameters)

| State             | Criteria                                            |
| ----------------- | --------------------------------------------------- |
| Proposal Creation | 10000 `$BGT` Required                               |
| Pending State     | 1-hour waiting period                               |
| Voting Period     | 5-days                                              |
| Proposal Outcome  | 20% of total `$BGT` supply required to reach quorum |
| Timelock          | 2 days delay                                        |

# Reward Vault Governance [​](https://docs.berachain.com/learn/governance/rewardvault#reward-vault-governance)

> **NOTE:** For a detailed guide on creating reward vaults and associated governance proposals see this [blog post](https://blog.berachain.com/blog/creating-a-governance-proposal-for-berachain-reward-vaults).

While creating a [Reward Vault](https://docs.berachain.com/learn/pol/rewardvaults) is permissionless, for it to receive `$BGT` emissions from validators, it must be whitelisted through a governance proposal. This process ensures community oversight and alignment over projects joining the Proof-of-Liquidity (PoL) ecosystem.

There are two components to whitelisting a new Reward Vault:

1. Whitelisting the Reward Vault
2. Whitelisting incentive token(s)

These are both typically done concurrently through a single governance proposal.

## Reward Vault Whitelisting [​](https://docs.berachain.com/learn/governance/rewardvault#reward-vault-whitelisting)

Reward Vaults are whitelisted on the [BeraChef](https://docs.berachain.com/developers/contracts/berachef) contract to make them eligible for receiving `$BGT` emissions:

1. Deploy a reward vault using the [Reward Vault Factory](https://docs.berachain.com/developers/contracts/reward-vault-factory), specifying the staking token. This produces a new vault address

2. Submit and pass a governance proposal for whitelisting the vault, using the vault address obtained from the factory deployment:

solidity

```
function setVaultWhitelistedStatus(address receiver, bool isWhitelisted, string memory metadata) external;
```

## Token Whitelisting [​](https://docs.berachain.com/learn/governance/rewardvault#token-whitelisting)

Protocols can supply [Incentives](https://docs.berachain.com/learn/pol/incentives) to entice validators to direct emissions to their vaults. Incentive tokens must first be whitelisted on the **particular Reward Vault** being incentivized:

1. Prepare the following parameters:

    - Incentive token address
    - Minimum incentive rate - lowest exchange rate between incentive token and `$BGT`
        - Incentive rates below this floor are not accepted
    - Token manager address
        - Account that will control incentive parameters
        - Only one entitled to add incentives to a vault

2. Submit and pass a governance proposal for whitelisting the incentive token, using the vault address obtained from the factory deployment:

solidity

```
function whitelistIncentiveToken(address token, uint256 minIncentiveRate, address manager) external
```

TIP

Each reward vault maintains separate incentive token whitelists

### Governance Process [​](https://docs.berachain.com/learn/governance/rewardvault#governance-process)

The above whitelisting procedures are performed through [BGT Governance](https://docs.berachain.com/learn/governance/).

# Berachain Honey Swap 🐻⛓️ [​](https://docs.berachain.com/learn/dapps/honey-swap#berachain-honey-swap-%F0%9F%90%BB%E2%9B%93%EF%B8%8F)

Honey Swap allows users to trade approved stables/assets for [$HONEY](https://docs.berachain.com/learn/pol/tokens/honey).

Learn more about the mechanics of [$HONEY](https://docs.berachain.com/learn/pol/tokens/honey).

[![Beracahin Honey Swap dApp](https://docs.berachain.com/assets/honey_swap.png)](https://honey.berachain.com/)

> [https://honey.berachain.com/](https://honey.berachain.com/)

# Beratrail Block Explorer 🐻⛓️ [​](https://docs.berachain.com/learn/dapps/beratrail#beratrail-block-explorer-%F0%9F%90%BB%E2%9B%93%EF%B8%8F)

[![Berachain Beratrail Block Explorer dApp](https://docs.berachain.com/assets/dapp-beratrail.png)](https://berascan.com/)

> [https://berascan.com/](https://berascan.com/)

Beratrail is Berachain's canonical block explorer which allows for easy reviewing of transactions, contracts, wallet, code, contract interactions, and verifying contracts.

# Berachain BeraSwap 🐻⛓️ [​](https://docs.berachain.com/learn/dapps/beraswap#berachain-beraswap-%F0%9F%90%BB%E2%9B%93%EF%B8%8F)

Berachain's native decentralized exchange (DEX) is called BeraSwap, which allows for trading of any arbitrary pair of crypto assets via swapping and providing liquidity into [liquidity pools](https://docs.berachain.com/learn/help/glossary#liquidity-pool).

[![Berachain BeraSwap Native dApp](https://docs.berachain.com/assets/beraswap.png)](https://hub.berachain.com/swap)

> [https://hub.berachain.com/swap](https://hub.berachain.com/swap)

Pools deposits in BeraSwap can become eligible for [$BGT](https://docs.berachain.com/learn/pol/tokens/bgt) emissions & incentivization by whitelisting associated [Reward Vaults](https://docs.berachain.com/learn/pol/rewardvaults) via governance.

> To learn more, check out the [Berachain Swap Docs](https://docs.swap.berachain.com/).

## Default Reward Allocation [​](https://docs.berachain.com/learn/dapps/beraswap#default-reward-allocation)

Each validator can customize how their rewards are distributed across different reward vaults. If no custom allocation is set, default allocations are used, benefitting key BeraSwap liquidity pools. The default allocation is as follows:

| Pool assets           | Type     | Weights | Allocation  | Fee   | Amplification |
| --------------------- | -------- | ------- | ----------- | ----- | ------------- |
| BERA - HONEY          | Weighted | 50-50   | 35.00%      | 0.30% | n.a.          |
| BERA - WETH           | Weighted | 50-50   | 25.00%      | 0.30% | n.a.          |
| BERA - WBTC           | Weighted | 50-50   | 25.00%      | 0.30% | n.a.          |
| USDC - HONEY          | Stable   | 50-50   | 7.50%       | 0.01% | 2000          |
| BYUSD (pyUSD) - HONEY | Stable   | 50-50   | 7.50%       | 0.01% | 1000          |
| **Total**             |          |         | **100.00%** |       |               |

# Berachain's BeraHub 🐻⛓️ [​](https://docs.berachain.com/learn/dapps/berahub#berachain-s-berahub-%F0%9F%90%BB%E2%9B%93%EF%B8%8F)

BeraHub is the place to manage all things `$BGT` and access Berachain liquidity through BeraSwap.

[![Berachain BeraHub dApp](https://docs.berachain.com/assets/berahub.png)](https://hub.berachain.com/)

> [https://hub.berachain.com/](https://hub.berachain.com/)

Users can expect to:

1. Review active [Reward Vaults](https://hub.berachain.com/vaults)
2. Review active [Validators](https://hub.berachain.com/validators)
3. [Boost](https://hub.berachain.com/validators) validators with `$BGT`
4. [Redeem](https://hub.berachain.com/redeem) `$BGT` for `$BERA`
5. [Claim earned](https://hub.berachain.com/rewards) `$BGT` rewards
6. [Swap assets](https://hub.berachain.com/swap)
7. [Provide BeraSwap liquidity](https://hub.berachain.com/pools)
8. [Participate in Governance](https://hub.berachain.com/governance)

# How To Connect A Wallet With Berachain 🔌 [​](https://docs.berachain.com/learn/connect-to-berachain#how-to-connect-a-wallet-with-berachain-%F0%9F%94%8C)

Blockchain wallets are what allow you, and only you, to access your assets on Berachain. Wallets enable this by allowing you to create and store your private keys, which can then be used to prove that you can access the assets in the wallet to do things such as trade tokens, buy NFTs, play games, and more.

## Berachain Mainnet RPC 🌐 [​](https://docs.berachain.com/learn/connect-to-berachain#berachain-mainnet-rpc-%F0%9F%8C%90)

Copy and paste these values into any wallet that supports importing RPCs.

Quickly add Berachain's network to your wallet with one-click.

Wallet Not Supported

| Key                | Value                      |
| ------------------ | -------------------------- |
| Network            | Berachain Mainnet          |
| RPC URL            | https://rpc.berachain.com/ |
| Chain ID           | 80094                      |
| Currency symbol    | BERA                       |
| Block explorer URL | https://berascan.com/      |

## Supported Wallets 👛 [​](https://docs.berachain.com/learn/connect-to-berachain#supported-wallets-%F0%9F%91%9B)

Currently, any [EVM-based wallet](https://ethereum.org/en/wallets/find-wallet/) that allows `RPC importing` can be configured to work with Berachain.

Here are some examples of compatible wallets:

-   [MetaMask](https://metamask.io/)
-   [Rabby](https://rabby.io/)
-   [Coinbase Wallet](https://www.coinbase.com/wallet)
-   [Brave Wallet](https://brave.com/wallet/)
-   [Frame](https://frame.sh/)

## How To Setup A MetaMask Wallet With Berachain 🦊 [​](https://docs.berachain.com/learn/connect-to-berachain#how-to-setup-a-metamask-wallet-with-berachain-%F0%9F%A6%8A)

This will walk you through the steps of setting up and configure a MetaMask wallet with Berachain.

**NOTE:** Recommended that you set this up through Chrome.

### Step 1 - Install MetaMask [​](https://docs.berachain.com/learn/connect-to-berachain#step-1-install-metamask)

Go to Metamask's [website](https://metamask.io/) and click to download the browser extension for your browser of choice. Make sure the extension is being offered by `metamask.io`.

![Metamask Chrome Store](https://docs.berachain.com/assets/metamask-chrome-store.png)

### Step 2 - Create Your Wallet in MetaMask [​](https://docs.berachain.com/learn/connect-to-berachain#step-2-create-your-wallet-in-metamask)

Once MetaMask finishes installing as a Chrome extension, the initial prompt still show up. Click the `Create a new wallet` button to start the process.

![Metamask Get Started](https://docs.berachain.com/assets/metamask-get-started.png)

This will ask you to first set a password. This is the password you will enter when you open up the MetaMask extension:

![Metamask Create Password](https://docs.berachain.com/assets/metamask-create-password.png)

Next, follow the instructions to secure your wallet phrase. This step is very important as the wallet phrase is what is used to prove that you own the assets in your wallet.

![Metamask Recovery Phrase](https://docs.berachain.com/assets/metamask-recovery-phrase.png)

🎉 Congratulations! You've setup your MetaMask wallet!

## Add Berachain Network To Your Wallet 🐻 [​](https://docs.berachain.com/learn/connect-to-berachain#add-berachain-network-to-your-wallet-%F0%9F%90%BB)

Wallets can connect to various blockchains, with MetaMask setting Ethereum as its default blockchain. In order to connect to Berachain, we'll need to add the network to MetaMask and select it.

### Add Berachain Network in One Click [​](https://docs.berachain.com/learn/connect-to-berachain#add-berachain-network-in-one-click)

Click the button below to add the network to your MetaMask in one click.

Wallet Not Supported

### Add Berachain Network Manually [​](https://docs.berachain.com/learn/connect-to-berachain#add-berachain-network-manually)

To add the network manually, click the drop-down in the top-left of MetaMask.

![Metamask Add Network Step 1](https://docs.berachain.com/assets/metamask-add-network-01.png)

When the modal appears, click `Add network` button.

![Metamask Add Network Step 2](https://docs.berachain.com/assets/metamask-add-network-02.png)

At the bottom of the existing list, click `Add network manually`.

![Metamask Add Network Step 3](https://docs.berachain.com/assets/metamask-add-network-03.png)

Enter the following details into MetaMask to configure the network and connect to Berachain Testnet.

Once the data is entered correctly, click `Save`.

![Metamask Add Network Step 4](https://docs.berachain.com/assets/metamask-add-network-04.png)

After saving the network configuration, you should be connected to the Berachain Testnet!

![Metamask Testnet](https://docs.berachain.com/assets/metamask-testnet.png)

# $BERA Airdrop 🐻 [​](https://docs.berachain.com/learn/claim-bera-airdrop#bera-airdrop-%F0%9F%90%BB)

For any questions, discussion, or learning about about Berachain claim, please visit the [Berachain Discord](https://discord.com/invite/berachain).

The BERA airdrop checker will be live on **February 5th**, and the airdrop will be live **February 6th**.

Ensure you are only checking allocation on **[https://checker.berachain.com](https://checker.berachain.com/)**.

Ensure you are only claiming tokens on **[https://airdrop.berachain.com](https://airdrop.berachain.com/)**.

![Bera Airdrop Checker](https://docs.berachain.com/assets/berachain-airdrop.jpg)

## Check $BERA Airdrop 🔍 [​](https://docs.berachain.com/learn/claim-bera-airdrop#check-bera-airdrop-%F0%9F%94%8D)

The airdrop checker is a tool to let you learn your allocation on launch day. Your genesis allocation from testnet use, testnet user RFA allocations, and ecosystem NFTs is already in your wallet.

You can check your allocations in two ways:

-   Enter your address
-   Connect relevant socials

You will be able to see your tokens available to claim on launch.

The checker reads NFT token allocations from official Bera NFTs on Ethereum mainnet. Recipients of the social airdrop and RFB must use social login, then tie their allocations to a wallet. RFB and social airdrop claims will be distributed on Feb 10th.

## Claim $BERA Airdrop 🎁 [​](https://docs.berachain.com/learn/claim-bera-airdrop#claim-bera-airdrop-%F0%9F%8E%81)

The airdrop claim is a tool to allow you to accept your tokens. Claim your tokens by following the steps below.

1. Connect to **[https://airdrop.berachain.com](https://airdrop.berachain.com/)**.

2. Click "Claim" and approve the proposed transaction

3. Your claim is complete and should be available in your wallet on the Berchain network.

# Proof of Liquidity Overview [​](https://docs.berachain.com/developers/#proof-of-liquidity-overview)

Berachain's Proof of Liquidity (PoL) mechanism can be broken down into two broad categories:

1. [**BGT Distribution**](https://docs.berachain.com/developers/#_1-bgt-distribution): How $BGT is created from the block production process
2. [**Incentive Marketplace**](https://docs.berachain.com/developers/#_2-incentive-marketplace): How protocols compete for validator $BGT allocations by issuing incentives

The below diagram shows the relationship between the main PoL contracts and how they interact.

![PoL Overview For Devs](https://docs.berachain.com/assets/pol-architecture.png)

## 1\. BGT Distribution [​](https://docs.berachain.com/developers/#_1-bgt-distribution)

As discussed in [Block Production](https://docs.berachain.com/learn/pol/bgtmath), $BGT emissions stem from the block production process. A variable component $BGT emissions per block is determined by the proposing validator's $BGT delegation (also referred to as "boost").

### Distributor [​](https://docs.berachain.com/developers/#distributor)

The [Distributor](https://docs.berachain.com/developers/contracts/distributor) contract is the entrypoint for BGT distribution. The `distributeFor()` function accepts a Merkle proof that a validator has proposed a certain beacon block. The Distributor then:

-   Receives newly minted BGT from the `BlockRewardController`
-   Processes rewards based on validator-specified allocations via `BeraChef`
-   Distributes BGT to the validator's designated Reward Vaults

### BlockRewardController [​](https://docs.berachain.com/developers/#blockrewardcontroller)

The [BlockRewardController](https://docs.berachain.com/developers/contracts/block-reward-controller) contract is the only entity authorized to mint $BGT. It is entered through the `processRewards` function from the `Distributor` contract. The BlockRewardController then:

-   Mints a base $BGT amount to the proposing validator's operator
-   Mints a variable $BGT amount based on the validator's boost which is sent to the `Distributor`

### BeraChef [​](https://docs.berachain.com/developers/#berachef)

The [BeraChef](https://docs.berachain.com/developers/contracts/berachef) contract manages validator reward allocations. These preferences are set by the validator operator and can be updated following a short delay. The BeraChef contract then forwards these allocations to the `Distributor` contract for distribution to specified Reward Vaults.

## 2\. Incentive Marketplace [​](https://docs.berachain.com/developers/#_2-incentive-marketplace)

The Incentive Marketplace creates a market-driven liquidity incentive system where protocols compete for validators' $BGT allocations.

### RewardVault [​](https://docs.berachain.com/developers/#rewardvault)

[RewardVaults](https://docs.berachain.com/developers/contracts/reward-vault) act as the core PoL integration point, they:

-   Receive $BGT emissions from the `Distributor`
-   Allow protocols to add incentive tokens with a minimum incentive rate per 1 $BGT emitted
-   Manage token staking and $BGT distribution to liquidity providers/users

Validators are incentivized to allocate $BGT to vaults offering higher protocol incentives, as they receive these rewards proportional to the $BGT allocated. This creates the "marketplace" dynamic where protocols compete by offering better incentives to attract more $BGT allocations.

TIP

RewardVault creation is permissionless, but vaults must be approved by [governance](https://docs.berachain.com/learn/governance/rewardvault) to be included in validators' reward allocations.

The [RewardVaultFactory](https://docs.berachain.com/developers/contracts/reward-vault-factory) contract deploys standardized RewardVault contracts and maintains a registry of approved vaults.

# Build a Smart Contract [​](https://docs.berachain.com/developers/quickstart/#build-a-smart-contract)

The [ERC-20 token standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) provides a common interface for tokens on Berachain. ERC-20s follow a standard interface such that other applications can easily interact with them on-chain, but can be extended to do much, much more. They power everything from simple value transfers to complex DeFi interactions.

In this guide, we'll walk through how to create an ERC-20 token using Solidity and deploy it to the Berachain Testnet.

## Pre-requisites [​](https://docs.berachain.com/developers/quickstart/#pre-requisites)

Before you start, make sure you have the following:

-   [Foundry](https://github.com/foundry-rs/foundry)
-   A code editor of your choice

## Initialize Repository [​](https://docs.berachain.com/developers/quickstart/#initialize-repository)

First, we'll create a new project using Forge's `init` command:

bash

```
forge init my_token;
```

This will create a new directory called `my_token` with a basic forge project structure and example contracts. If using VS Code as your text editor, you can add the `--vscode` flag like so to initialize some extra defaults.

bash

```
forge init my_token --vscode;
```

Now you can `cd` into the directory so you're ready to run commands later:

bash

```
cd my_token;
```

Feel free to delete the generated files:

-   `src/Counter.sol`
-   `test/Counter.t.sol`
-   `script/Counter.s.sol`

bash

```
# FROM: ./my_token

rm src/Counter.sol test/Counter.t.sol script/Counter.s.sol;
```

They serve as a good example of how to write contracts and tests in Forge Foundry's format, but we won't need them for this guide.

## Install Dependencies [​](https://docs.berachain.com/developers/quickstart/#install-dependencies)

### OpenZeppelin ERC-20 [​](https://docs.berachain.com/developers/quickstart/#openzeppelin-erc-20)

OpenZeppelin provides commonly used interfaces & implementations of various ERC standards, including ERC-20. We'll use their ERC-20 implementation to create our token as these are audited and battle-tested. It also makes it much easier to get up and running quickly without reinventing the wheel.

**Foundry**

If using Foundry, install the OpenZeppelin library using the following command:

bash

```
# FROM: ./my_token

forge install openzeppelin/openzeppelin-contracts --no-commit;
```

This pulls the `OpenZeppelin` library, stages the .gitmodules file in git and makes a commit with the message "Installed openzeppelin-contracts".

In order to use the library, edit `remappings.txt` file at the root of your project.

Edit it to include the following line:

**File:** `./remappings.txt`

txt

```
ds-test/=lib/forge-std/lib/ds-test/src/
forge-std/=lib/forge-std/src/
@openzeppelin/=lib/openzeppelin-contracts/ // [!code++]
```

This tells Foundry where to find the `@openzeppelin` library when compiling your contracts.

## Create the Token Contract [​](https://docs.berachain.com/developers/quickstart/#create-the-token-contract)

Now we can start creating our token contract. We'll create a new file called `MyToken.sol` inside the `src/` folder and import the OpenZeppelin ERC-20 contract.

bash

```
# FROM: ./my_token

touch src/MyToken.sol;
```

**File:** `./src/MyToken.sol`

solidity

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

This imports the `ERC20` contract from the OpenZeppelin library, which includes basic implementations of all of the functions in the ERC-20 standard. We'll use this as the base for our token contract.

Next, we'll create the actual contract which extends the ERC-20 contract we imported. With this token we will:

-   Set the name to "MyToken"
-   Set the symbol to "MT"
-   Set the initial supply to 1,000,000 tokens

**File:** `./src/MyToken.sol`

solidity

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 1 ether;

    constructor() ERC20("MyToken", "MT"){
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
```

TIP

The `1 ether` is an easy way to make a unit conversion. The default `decimals` for the ERC-20 token standard is 18, so this will mint 1 million tokens with 18 decimal places. To learn more, check out [this article on decimals](https://docs.openzeppelin.com/contracts/3.x/erc20#a-note-on-decimals).

Technically, this is all you need to create your own token contract! If satisfied, you could take this contract and deploy it. It would then mint 1 million tokens to your wallet that deployed the contract ( `msg.sender`). This would allow you to do whatever with the supply that you want, for example pairing those tokens with another token in the Berachain BeraSwap so others can acquire it.

However, we usually want to make a token that's a little more interesting so it stands out. Let's add some more functionality to our token contract.

Let's make it so our token burns a small fee on every transfer. To do so, we'll add a few more constants and then override the default `_update` function in OpenZeppelin's `ERC20.sol` like so:

solidity

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 1 ether;
    uint256 public constant BURN_PERCENTAGE = 1; // 1%
    address public constant BURN_ADDRESS = 0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF;

    constructor() ERC20("MyToken", "MT"){
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function _update(address sender, address recipient, uint256 amount) internal override {
        uint256 burnAmount = (amount * BURN_PERCENTAGE) / 100;
        super._update(sender, recipient, amount - burnAmount);
        super._update(sender, BURN_ADDRESS, burnAmount);
    }
}
```

As you can see, we override the parent class's `_transfer` function by redefining `_transfer` in our `MyToken` contract with the `override` modifier. We can still call the default `_transfer` function from the parent class using `super._transfer` and do so to handle the actual token transfer logic after the burn has been calculated.

## Deploy Token Contract [​](https://docs.berachain.com/developers/quickstart/#deploy-token-contract)

Next step is to use forge script to deploy this contract to Berachain.

bash

```
# FROM: ./my_token

forge create --rpc-url https://rpc.berachain.com/ --private-key <YOUR_PRIVATE_KEY> src/MyToken.sol:MyToken --legacy;

# [Expected Output]:
# Deployer: 0x852Fc561Fd842ef1Af923ABfc64acC8A5624fe80
# Deployed to: 0x53E365fE5fDF332dD475E90bA8383B7F9853a49F
# Transaction hash: 0x59254ddcbb8dc1da89c7a1c7e300d8c6bd2f906b816b4497d046c717102d5725
```

## Verifying Contract [​](https://docs.berachain.com/developers/quickstart/#verifying-contract)

The last step is now verify that contract that was successfully deployed.

bash

```
forge verify-contract 0x53E365fE5fDF332dD475E90bA8383B7F9853a49F src/MyToken.sol:MyToken --verifier-url 'https://berascan.com/api' --etherscan-api-key "verifyContract" --num-of-optimizations 200

# [Expected Output]:
# Start verifying contract `0x53E365fE5fDF332dD475E90bA8383B7F9853a49F` deployed on mainnet
#
# Submitting verification for [src/MyToken.sol:MyToken] 0x53E365fE5fDF332dD475E90bA8383B7F9853a49F.
# Submitted contract for verification:
# Response: `OK`
# GUID: `321091ec-e529-5a11-a75c-cf1ffc6987d7`
# URL: https://etherscan.io/address/0x53e365fe5fdf332dd475e90ba8383b7f9853a49f
#
# !NOTE: Should be https://berascan.com//address/0x53e365fe5fdf332dd475e90ba8383b7f9853a49f
```

## Next Steps [​](https://docs.berachain.com/developers/quickstart/#next-steps)

Now that you understand how to deploy a contract to Berachain with foundry, checkout the [Developer Guides](https://docs.berachain.com/developers/guides/community-guides) to start building out other contracts or building other dApps.

# Integrating your dApp with Proof of Liquidity [​](https://docs.berachain.com/developers/quickstart/pol-integration#integrating-your-dapp-with-proof-of-liquidity)

This page showcases creative ways to leverage PoL for incentivizing user activity, illustrated with code samples:

-   [Trading activity rewards](https://docs.berachain.com/developers/quickstart/pol-integration#example-1-activity-frequency-rewards)
-   [Gameplay progression rewards](https://docs.berachain.com/developers/quickstart/pol-integration#example-2-gameplay-progression-rewards)
-   [DeFi positions rewards](https://docs.berachain.com/developers/quickstart/pol-integration#example-3-incentivizing-trading-positions)

## Flexible Design [​](https://docs.berachain.com/developers/quickstart/pol-integration#flexible-design)

From the perspective of an application on Berachain, the PoL system is fundamentally a mechanism that works in the following way:

1. A [Reward Vault](https://docs.berachain.com/learn/pol/rewardvaults) smart contract that targets an ERC20 token
2. Users stake the designated ERC20 in this vault
3. Distributes BGT rewards proportionally to its stakers

The dev work for all PoL integrations essentially boils down to:

1. Deploying a Reward Vault from the [Factory](https://docs.berachain.com/developers/contracts/reward-vault-factory)
2. Design an ERC20 token that is minted when users perform actions you would like to incentivize
3. Have these ERC20 positions staked in your Reward Vault

All `RewardVault` contracts are deployed using the `RewardVaultFactory` contract and therefore follow a standardized implementation. Teams can't modify the RewardVault logic. This means all reward customization needs to happen at the staking token level, **not the vault level**. This means determining allocation of rewards must happen at the staking token level, fully defined by your app. The vault only uses the ERC20 balances of the staking token to distribute BGT proportionally.

Below are some examples of this pattern. If you wanted to incentivize:

| Activity to incentivize | ERC20 minting logic                          |
| ----------------------- | -------------------------------------------- |
| Trading activity        | minting based on trading frequency/volume    |
| Content creation        | minting based on post engagement metrics     |
| Gaming                  | minting based on playtime/achievements       |
| NFT usage               | minting based on time NFTs are actively used |
| Education               | minting based on course completion           |

The creativity comes in:

-   What behavior you want to incentivize
-   How you design the ERC20's minting logic to accurately capture that behavior
-   How you prevent gaming of the system
-   How you make the rewards meaningful enough to drive behavior while being sustainable

## Examples [​](https://docs.berachain.com/developers/quickstart/pol-integration#examples)

The following example leverages the [`delegateStake`](https://docs.berachain.com/developers/contracts/reward-vault#delegatestake) functionality of the RewardVault contract. This [guide](https://docs.berachain.com/developers/guides/advanced-pol) explains its use in detail.
