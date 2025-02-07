## Token Release Schedule [​](https://docs.berachain.com/learn/pol/tokens/tokenomics#token-release-schedule)

All parties follow an identical vesting schedule:

-   Initial Unlock: After a one-year cliff, 1/6th of allocated tokens are unlocked
-   Linear Vesting: The remaining 5/6ths of tokens vest linearly over the subsequent 24 months

![BERA Inflation](https://docs.berachain.com/assets/bera-inflation.png)

# $HONEY [​](https://docs.berachain.com/learn/pol/tokens/honey#honey)

[0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce](https://berascan.com//address/0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce)

![](https://docs.berachain.com/assets/HONEY.png) $HONEY

`$HONEY` is Berachain's native stablecoin, designed to provide a stable and reliable means of exchange within the Berachain ecosystem and beyond. `$HONEY` is fully collateralized and soft-pegged to the US Dollar.

## How to Get $HONEY? [​](https://docs.berachain.com/learn/pol/tokens/honey#how-to-get-honey)

`$HONEY` can be minted by depositing whitelisted collateral into a vault, and minting `$HONEY` against that collateral through the [HoneySwap dApp](https://honey.berachain.com/) . The minting rates of `$HONEY` are configurable by `$BGT` governance for each different collateral asset.

Alternatively, `$HONEY` can be obtained by swapping from other assets on [BeraSwap](https://docs.berachain.com/learn/dapps/beraswap) or another decentralized exchange.

### Collateral Assets [​](https://docs.berachain.com/learn/pol/tokens/honey#collateral-assets)

The initial collateral options will be `$USDC` and `$BYUSD` ( `$pyUSD`). New assets used to mint `$HONEY` can be added via governance.

## How is $HONEY Used? [​](https://docs.berachain.com/learn/pol/tokens/honey#how-is-honey-used)

`$HONEY` shares the same uses as other stablecoins, such as for payments/remittances, and as a hedge against market volatility. `$HONEY` can also be used within the Berachain DeFi ecosystem.

## $HONEY Architecture [​](https://docs.berachain.com/learn/pol/tokens/honey#honey-architecture)

A flow diagram of the `$HONEY` minting process and associated contracts is shown below: ![HONEY Minting](https://docs.berachain.com/assets/honey-minting.png)

### $HONEY Vaults [​](https://docs.berachain.com/learn/pol/tokens/honey#honey-vaults)

`$HONEY` is minted by depositing eligible collateral into specialized vault contracts. Each vault is specific to a particular collateral type, with its own unique mint and redemption rate.

In the top flow of the above example, the user deposits `$USDC` to mint `$HONEY`. Only the `$USDC` vault is interacted with, and not the `$pyUSD` vault.

### HoneyFactory [​](https://docs.berachain.com/learn/pol/tokens/honey#honeyfactory)

At the heart of the `$HONEY` minting process is the HoneyFactory contract. This contract acts as a central hub, connecting all the different `$HONEY` Vaults and is responsible for minting new `$HONEY` tokens.

As shown in the diagram, users' deposits are routed through the `HoneyFactory` contract to the appropriate vault. The `HoneyFactory` custodies the shares minted by the vault (corresponding to users' deposit) and mints `$HONEY` tokens to the user.

## Depegging and Basket Mode [​](https://docs.berachain.com/learn/pol/tokens/honey#depegging-and-basket-mode)

Basket Mode is a safety mechanism that activates when collateral assets become unstable. It affects both minting and redemption of `$HONEY` in specific ways:

**Redemption:**

-   When ANY collateral asset depegs, Basket Mode automatically activates.
-   In this mode, users can't choose which asset they redeem their `$HONEY` for
-   Instead, users redeem for a proportional share of ALL collateral assets in the basket
-   For example, if you redeem 1 `$HONEY` token with Basket Mode active, you'll get:
    -   Some `$USDC` based on its relative proportion as collateral
    -   Some `$pyUSD` based on its relative proportion as collateral

**Minting:**

-   Basket Mode for minting is considered an edge case which only occurs if ALL collateral assets are either depegged or blacklisted. Depegged assets cannot be used to mint `$HONEY`.
-   In this situation, to mint `$HONEY`, users must provide proportional amounts of all collateral assets in the basket, rather than choosing a single asset
-   If one asset is depegged you can mint only with the other asset

## Fees [​](https://docs.berachain.com/learn/pol/tokens/honey#fees)

Fees collected from minting and redeeming `$HONEY` are distributed to `$BGT` holders. Fees are determined based on the mint and redemption rates of each vault. For example, if the mint rate of the USDC vault is 0.999 (1 `$USDC` for 0.999 HONEY),thenafeeof0.001or0.1USDC\` deposited.

### Example [​](https://docs.berachain.com/learn/pol/tokens/honey#example)

Let's consider an example with the following parameters:

-   User wishes to deposit `1,000 $USDC`
-   Mint rate for `$USDC` is set at `0.999` ( `99.9%`)

Here's how the minting process would work:

1. The user deposits `1,000 $USDC` into the HoneyFactory contract
2. The HoneyFactory calculates the amount of `$HONEY` to mint:

-   `$HONEY` to mint = Vault shares × Mint rate
-   `$HONEY` to mint = `1,000` × `0.999` = `999 $HONEY`

3. The HoneyFactory transfers 999 `$USDC` to the USDC vault and receives 999 vault shares in return

-   Fee shares = Vault shares - `$HONEY` to mint
-   Fee shares = `1,000 - 999 = 1 share`
-   The HoneyFactory transfers 1 vault share to the fee receiver.

# $BGT [​](https://docs.berachain.com/learn/pol/tokens/bgt#bgt)

[0x656b95E550C07a9ffe548bd4085c72418Ceb1dba](https://berascan.com//address/0x656b95E550C07a9ffe548bd4085c72418Ceb1dba)

![](https://docs.berachain.com/assets/BGT.png) $BGT

Proof-of-Stake blockchains typically have a single token that is used to secure the network through staking, and which is additionally used for gas, governance and economic incentives. `$BGT` and the two-token model bifurcates the first two functions from the latter two.

Through Berachain's two-token Proof-of-Liquidity (PoL) model, the functions of governance and economic incentives (emissions & block rewards) are separated into its own token - `$BGT` (Bera Governance Token). `$BGT` is non-transferrable and can only be acquired by engaging in productive activities within the Berachain ecosystem.

## Earning `$BGT` [​](https://docs.berachain.com/learn/pol/tokens/bgt#earning-bgt)

`$BGT` is earned by performing certain actions in dApps with whitelisted [Reward Vaults](https://docs.berachain.com/learn/pol/rewardvaults). Most of the time, this is related to providing liquidity, but it is not limited to this. Reward Vault deposits correspond to some form of productive activity on Berachain.

The typical flow is for users to supply liquidity and receive a receipt token for that activity, which they can then stake in reward vaults to earn `$BGT`. Some examples include:

-   Depositing liquidity in the native BeraSwap for an LP pair whitelisted to earn `$BGT` emissions
-   Supplying assets to a lending market, and staking the interest-bearing receipt tokens in a reward vault

Users can see available earning options at [https://hub.berachain.com/pools](https://hub.berachain.com/pools).

Users can claim accumulated `$BGT` from Berahub.

## What can you do with $BGT? [​](https://docs.berachain.com/learn/pol/tokens/bgt#what-can-you-do-with-bgt)

### Governance [​](https://docs.berachain.com/learn/pol/tokens/bgt#governance)

`$BGT` is used to vote on governance proposals. `$BGT` holders are responsible for a wide variety of ecosystem decisions (see [Governance](https://docs.berachain.com/learn/governance)).

`$BGT` holders can either vote on proposals themselves or delegate their voting power to another address. This governance delegation operates independently of boosting validators for controlling their `$BGT` emissions.

### Earn [​](https://docs.berachain.com/learn/pol/tokens/bgt#earn)

#### Boosting Validators/Incentives [​](https://docs.berachain.com/learn/pol/tokens/bgt#boosting-validators-incentives)

Users can select validators to "boost" with their `$BGT`, increasing the validator's [reward emission](https://docs.berachain.com/learn/pol/bgtmath). The amount of [Incentives](https://docs.berachain.com/learn/pol/incentives) earned is determined by validators' aggregate boost. These incentives are returned to the `$BGT` holders that boosted the validator.

#### dApp Fees [​](https://docs.berachain.com/learn/pol/tokens/bgt#dapp-fees)

Users who are boosting validators with their `$BGT` earn a share of Berachain core dApp fees, namely fees from BeraSwap and HoneySwap. This is done via the [`FeeCollector`](https://docs.berachain.com/developers/contracts/fee-collector) contract.

At a high level, `FeeCollector` auctions fees collected from dApps for `$WBERA`, and then distributes them pro rata to `$BGT` holders who have boosted validators.

### Burning for `$BERA` [​](https://docs.berachain.com/learn/pol/tokens/bgt#burning-for-bera)

`$BGT` can be burned 1:1 for `$BERA`. This is a one-way function, and `$BERA` cannot be converted into `$BGT`. This limits the ability to earn the chain's economic incentives solely to `$BGT` holders.

# $BERA [​](https://docs.berachain.com/learn/pol/tokens/bera#bera)

`$WBERA`: [0x6969696969696969696969696969696969696969](https://berascan.com//address/0x6969696969696969696969696969696969696969)

![](https://docs.berachain.com/assets/BERA.png) $BERA

`$BERA` serves as the native gas and staking token of Berachain, the first blockchain powered by Proof-of-Liquidity.

## Role of BERA [​](https://docs.berachain.com/learn/pol/tokens/bera#role-of-bera)

The `$BERA` token serves two main purposes on the Berachain network.

### Transaction Fees [​](https://docs.berachain.com/learn/pol/tokens/bera#transaction-fees)

Paying for transactions on the Berachain network ( `$BERA` is also referred to as the "gas token" for this reason). Tokens utilized for transaction fees are burned, removing them from the circulating supply.

### Validator Staking [​](https://docs.berachain.com/learn/pol/tokens/bera#validator-staking)

Validators stake `$BERA` to operate a validator. Within the active set, the more `$BERA` a validator has staked, the more frequently they are chosen to propose blocks. The ratio of a validator's `$BERA` to the total stake is linear with their chances of block production. The economic value of all `$BERA` tokens staked forms the economic security of the chain, with [$BGT](https://docs.berachain.com/learn/pol/tokens/bgt) dynamics controlling its inflation.

To learn more about how `$BERA` staking affects block production and emissions, see [Block Production](https://docs.berachain.com/learn/pol/bgtmath).

# Reward vaults [​](https://docs.berachain.com/learn/pol/rewardvaults#reward-vaults)

Reward vaults are smart contracts in which users can stake their Proof-of-Liquidity (PoL) eligible assets in order to receive `$BGT` rewards. Reward vaults are the only way in which anyone can earn `$BGT` rewards, and therefore serve the important function of gating entry into the PoL ecosystem.

Reward vaults are a key piece of infrastructure that allows protocols to leverage PoL, enabling teams to incentivize users' actions in exchange for `$BGT`. A protocol can have multiple reward vaults, each with its own PoL-eligible asset to be staked. For example, BeraSwap can have multiple pools earning `$BGT`, each with its own reward vault and respective PoL-eligible asset.

TIP

A different reward vault contract exists for each PoL-eligible asset

## User Interactions [​](https://docs.berachain.com/learn/pol/rewardvaults#user-interactions)

### Staking in a Reward Vault [​](https://docs.berachain.com/learn/pol/rewardvaults#staking-in-a-reward-vault)

![Reward Vaults](https://docs.berachain.com/assets/reward-vaults.png)

In order to receive `$BGT`, a user must be staking the PoL-eligible asset in its reward vault. The protocol that deployed the reward vault is able to decide how the user acquires the PoL-eligible asset to stake. The idea is that protocols would leverage this to attract liquidity or stimulate activity, and in return award users with the asset they can stake in their vault.

1. The user takes some action that results in receiving a PoL-eligible asset, generally referred to as a receipt token.
2. The user stakes the PoL-eligible asset in the corresponding vault.
3. The user earns a portion of all the BGT emitted to that vault.

### Earning BGT [​](https://docs.berachain.com/learn/pol/rewardvaults#earning-bgt)

![Reward Vaults](https://docs.berachain.com/assets/reward-vault-staking.jpg)

The amount of `$BGT` rewards a user earns from a reward vault is a function of:

1. The user's share of total assets staked in the reward vault
2. The amount of `$BGT` rewards emitted to the reward vault

After staking assets in a reward vault, users are free to claim the earned rewards, add to their deposits, or withdraw their assets whenever they wish.

`$BGT` farming with reward vaults is meant to resemble familiar DeFi actions, providing a low barrier to entry for regular users.

## $BGT Flow [​](https://docs.berachain.com/learn/pol/rewardvaults#bgt-flow)

When a validator is chosen to propose a block, they direct some portion of their `$BGT` emissions to specific reward vaults of their choice. To learn more about how `$BGT` is calculated in block production, check out the docs on [emissions](https://docs.berachain.com/learn/pol/bgtmath).

To understand why validators would choose to emit `$BGT` to a particular reward vault over another, refer to [Incentives](https://docs.berachain.com/learn/pol/incentives) in PoL, which discusses how protocols can influence validator behavior with economic incentives.

![Reward Vaults](https://docs.berachain.com/assets/rewardallocation.png)

## Vault Creation [​](https://docs.berachain.com/learn/pol/rewardvaults#vault-creation)

New Reward Vaults can be created permissionlessly, and can be done so at [https://hub.berachain.com/vaults/create](https://hub.berachain.com/vaults/create).

Protocols creating reward vaults must additionally [whitelist their vaults](https://docs.berachain.com/learn/governance/rewardvault), conducted by `$BGT` governance in order to be eligible to receive emissions from validators.

# Proof-of-Liquidity Participants 👥 [​](https://docs.berachain.com/learn/pol/participants#proof-of-liquidity-participants-%F0%9F%91%A5)

This article explores the different players in the Proof-of-Liquidity (PoL) ecosystem and their roles. The following diagram shows a breakdown of the different participants and their priorities/responsibilities:

![PoL Stakeholders](https://docs.berachain.com/assets/val-stakeholder-overview.png)

## Validators ✅ [​](https://docs.berachain.com/learn/pol/participants#validators-%E2%9C%85)

The active set of validators consists of the top N validators ordered by BERA staked. Being part of the active set entitles validators to earn block rewards, so a key priority for validators is to obtain sufficient `$BERA` stake to be in the active set. Validators earn through three primary means:

1. Gas fees and priority fees
2. Collecting incentives provided by protocols for directing BGT rewards to their [Reward Vaults](https://docs.berachain.com/learn/pol/rewardvaults)
3. A base block reward (in `$BGT`) for successfully proposing a block

### Validator Incentives 💎 [​](https://docs.berachain.com/learn/pol/participants#validator-incentives-%F0%9F%92%8E)

When a validator directs `$BGT` emissions to a reward vault, they receive project-supplied [Incentives](https://docs.berachain.com/learn/pol/incentives) provided to attract these emissions (thus increasing the attractiveness of depositing into that project). These Incentives can be in the form of the protocol's native token or any other whitelisted ERC20 token.

Successful validators in PoL optimize for:

-   Securing `$BGT` delegation to increase their block rewards
-   Efficiently exchanging `$BGT` block rewards for protocol incentives
-   Distributing value back to their `$BGT` delegators

## BGT Holders & Farmers 🥕 [​](https://docs.berachain.com/learn/pol/participants#bgt-holders-farmers-%F0%9F%A5%95)

BGT holders play a crucial role in:

-   Voting on governance proposals
-   Influencing economic incentives through `$BGT` delegation
-   Supplying ecosystem liquidity in reward vaults to earn `$BGT`

TIP

$BGT that is delegated to validators is not subject to slashing. Only validators' $BERA stakes can be slashed.

### Earning and Delegating $BGT ⬇️ [​](https://docs.berachain.com/learn/pol/participants#earning-and-delegating-bgt-%E2%AC%87%EF%B8%8F)

Users can earn `$BGT` by staking PoL-eligible receipt tokens in reward vaults. These receipt tokens are generated by performing actions that benefit the Berachain ecosystem, such as providing liquidity to a BeraSwap pool.

When selecting a validator to delegate `$BGT` to, users typically consider:

-   Which reward vaults validators direct emissions to
-   Validator commission rates and incentive distribution strategies
-   Validator uptime and performance

The primary goal is to earn as much Incentives as possible through delegation.

## Ecosystem Projects 🧸 [​](https://docs.berachain.com/learn/pol/participants#ecosystem-projects-%F0%9F%A7%B8)

Projects participate in PoL by:

1. Creating a reward vault through the factory contract
2. Submitting a governance proposal to whitelist the vault
3. Supplying incentive tokens and managing rates in their vault

The [Incentives marketplace](https://docs.berachain.com/learn/pol/incentives) allows protocols to bid for validators' emissions using whitelisted tokens, creating alignment between all stakeholders to increase the overall value of the network. Projects must earn also gain the favor of `$BGT` holders to enter into the PoL system.

# Incentive Marketplace [​](https://docs.berachain.com/learn/pol/incentives#incentive-marketplace)

Proof-of-Liquidity (PoL) enables protocols to bid for validator `$BGT` emissions to Reward Vaults using whitelisted incentive tokens. In doing so, protocols attract users to their protocol with `$BGT` rewards.

In a nutshell, here's how Incentives work:

1. A protocol sets an incentive rate for their reward vault (e.g., 10 protocol tokens per 1 `$BGT`)
2. When a validator directs `$BGT` emissions to this vault, they receive the corresponding amount of Incentives (e.g. 10 protocol tokens for directing 1 `$BGT`)
3. Validators can take a commission on these Incentives before distributing the remainder to their `$BGT` delegators
4. The amount of `$BGT` a validator can direct (and thus Incentives they can earn) depends on their delegation weight

![Reward Vault Incentives](https://docs.berachain.com/assets/reward-vault-incentives.png)

## Incentive Marketplace Operations [​](https://docs.berachain.com/learn/pol/incentives#incentive-marketplace-operations)

[Token managers](https://docs.berachain.com/learn/governance/rewardvault#token-whitelisting) are the only ones entitled to 1) add incentive tokens and 2) control incentive parameters on a Reward Vault. The key entrypoint is the `addIncentive` function on the Reward Vault contract:

solidity

```
function addIncentive(address token, uint256 amount, uint256 incentiveRate) external;
```

### Rate Adjustments [​](https://docs.berachain.com/learn/pol/incentives#rate-adjustments)

Each time incentives are added to a Reward Vault, the manager sets the rate (r) for the next distribution (until `$BGT` is depleted).

Example: Setting rate `r=10` means:

-   10 protocol tokens exchanged per 1 `$BGT`
-   1000 incentive tokens deposited enables 100 `$BGT` worth of emissions flowing to vault

Rate modifications follow these rules:

1. Empty vault: Can update to any rate above the minimum
   r≥rmin
2. Non-empty vault: Can only increase rate
   r∗>r

The rate cannot be decreased until vault incentives deplete (reverting to scenario #1)

### Parameters [​](https://docs.berachain.com/learn/pol/incentives#parameters)

| Parameter        | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| p                | Incentive rate - Protocol tokens given per BGT               |
| minIncentiveRate | Minimum allowed exchange rate between protocol token and BGT |
| p\*              | New incentive rate (when updating)                           |

### Distribution Flow [​](https://docs.berachain.com/learn/pol/incentives#distribution-flow)

1. Validator emits `$BGT` to protocol vault
2. Validator receives ( `r × $BGT`) protocol token incentives
3. Validator expected to share portion of incentives with delegates (this will be an on-chain operation in the future)

# Proof-of-Liquidity Frequently Asked Questions ❓ [​](https://docs.berachain.com/learn/pol/faqs#proof-of-liquidity-frequently-asked-questions-%E2%9D%93)

## Validator Requirements & Operations [​](https://docs.berachain.com/learn/pol/faqs#validator-requirements-operations)

### Can anyone stake $BERA to become a validator? [​](https://docs.berachain.com/learn/pol/faqs#can-anyone-stake-bera-to-become-a-validator)

While anyone can stake $BERA to try to become a validator in the active set, there are specific staking requirements:

There is a minimum floor of 250K $BERA required to be a validator. There is a maximum cap of 10M $BERA for any validator's stake. Only the top N validators (ordered by $BERA staked) can be in the active validator set. Even if someone stakes above the minimum 250K $BERA, they would still need to have enough stake to be within the top N validators to be part of the active validator set that can produce blocks.

### Can validators with no $BGT boosted to them build blocks and earn rewards? [​](https://docs.berachain.com/learn/pol/faqs#can-validators-with-no-bgt-boosted-to-them-build-blocks-and-earn-rewards)

The ability to build blocks is determined by `$BERA` stake, not `$BGT` boost. As long as a validator has enough `$BERA` staked and is in the active set, they can produce blocks regardless of how much `$BGT` is boosted to them. For every block a validator proposes, that validator receives a reward.

### Is there a cap for the number of active validators? [​](https://docs.berachain.com/learn/pol/faqs#is-there-a-cap-for-the-number-of-active-validators)

There will be a mechanism for capping validators to a safe level. The validators in this cap are known as the 'active set.'

## dApps & Reward Vaults [​](https://docs.berachain.com/learn/pol/faqs#dapps-reward-vaults)

### Can dApps that don't have a token still participate in PoL? [​](https://docs.berachain.com/learn/pol/faqs#can-dapps-that-don-t-have-a-token-still-participate-in-pol)

Yes, a fundamental aspect of Proof-of-Liquidity (PoL) is the use of whitelisted Reward Vaults. A protocol only needs to issue a receipt token that can be staked in the protocol's respective whitelisted Reward Vault. The receipt token is different from a native token and can be thought of as a form of bookkeeping token. For example, when a user provides liquidity to a BeraSwap pool, they receive a receipt token in the form of an LP token. That LP token can be staked in a Reward Vault to earn $BGT from emissions directed from validators.

### Are there restrictions on what kinds of dApps can have whitelisted Reward Vaults? [​](https://docs.berachain.com/learn/pol/faqs#are-there-restrictions-on-what-kinds-of-dapps-can-have-whitelisted-reward-vaults)

No, any dApp can deploy a Reward Vault and submit it as a governance proposal to have it whitelisted.

### Are rewards vaults created only by whitelisting governance proposals? [​](https://docs.berachain.com/learn/pol/faqs#are-rewards-vaults-created-only-by-whitelisting-governance-proposals)

Technically, the creation of rewards vaults is permissionless, but for validators to direct $BGT emissions to those rewards vaults, a governance proposal for whitelisting the rewards vault must pass.

### Do native dApps have an advantage over non-native dApps that participate in PoL? [​](https://docs.berachain.com/learn/pol/faqs#do-native-dapps-have-an-advantage-over-non-native-dapps-that-participate-in-pol)

All Reward Vaults are treated equally and their status is determined solely by validators distributing rewards to Reward Vaults. The only exception would be that if a Validator does not specify their Reward Allocation, native dApps are set as default Reward Vaults for Reward Allocation for validators.

## Rewards and Emissions [​](https://docs.berachain.com/learn/pol/faqs#rewards-and-emissions)

### How much $BGT could any given Reward Vault earn? [​](https://docs.berachain.com/learn/pol/faqs#how-much-bgt-could-any-given-reward-vault-earn)

The amount of $BGT a given Reward Vault can earn is a function of following:

1. How many validators are directing emissions to those vaults
2. How much $BGT is boosted to the validators directing emissions to those vaults

### Is the size of the `$BGT` emission linear to the amount of `$BGT` boosted to a validator? [​](https://docs.berachain.com/learn/pol/faqs#is-the-size-of-the-bgt-emission-linear-to-the-amount-of-bgt-boosted-to-a-validator)

No, the `$BGT` emission is not linear to the amount of `$BGT` boosted to a validator. The emission formula is:

emission=\[B+max(m,(a+1)(1−1/(1+axb))R)\]

where `B` is the base rate, representing the basic BGT amount that a validator gets for producing a block `R` is the reward rate, which is the base BGT amount allocated for reward vaults before any boost is applied `a` is the boost multiplier that determines how much impact boost has on emissions toward reward vaults `b` is the convexity parameter that controls how quickly boost affects emissions - with high values, validators with low boost get more heavily penalized `m` is the minimum reward, acting as a floor for emissions to reward vaults - when this is higher, even validators with low boost are guaranteed more emissions

### How does Berachain manage hyperinflation of $BGT? [​](https://docs.berachain.com/learn/pol/faqs#how-does-berachain-manage-hyperinflation-of-bgt)

The inflation of $BGT is equivalent to traditional PoS systems having some percentage of inflation per year. Berachain just takes that PoS inflation and distributes it between a validator and reward vaults.

The end result is that the inflation cadence should effectively mirror an equivalent PoS platform, it's just allocated in a manner that better aligns the interests of validators, protocols and users.

### Why are Incentive emissions defined per $BGT instead of being pool-based? [​](https://docs.berachain.com/learn/pol/faqs#why-are-incentive-emissions-defined-per-bgt-instead-of-being-pool-based)

Incentives are denominated in $BGT– ultimately users, validators, and protocols want to be able to calculate the per $BGT they're earning, so it's more of a choice of UI to facilitate understanding the value $BGT drives.

### Can only validators vote on or create governance proposals? [​](https://docs.berachain.com/learn/pol/faqs#can-only-validators-vote-on-or-create-governance-proposals)

Anyone who holds enough $BGT can vote on proposals. Anyone who meets the threshold of 10000 $BGT can create a proposal.
