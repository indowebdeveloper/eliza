# Managing Validator Reward Allocations 🧑‍🍳 [​](https://docs.berachain.com/nodes/guides/reward-allocation#managing-validator-reward-allocations-%F0%9F%A7%91%E2%80%8D%F0%9F%8D%B3)

This guide will walk you through managing your validator's reward allocations using [BeraChef](https://docs.berachain.com/developers/contracts/berachef) via Foundry `cast` and the BeraHub UI.

## Requirements [​](https://docs.berachain.com/nodes/guides/reward-allocation#requirements)

-   Active Validator Node
-   Validator Operator Wallet Address & Private Key
-   Validator PubKey
-   [Foundry](https://book.getfoundry.sh/getting-started/installation) using `cast`

## Understanding Reward Allocations [​](https://docs.berachain.com/nodes/guides/reward-allocation#understanding-reward-allocations)

Each validator can customize how their rewards are distributed across different reward vaults. If no custom allocation is set, a default allocation is used.

**Key concepts:**

-   Reward allocations must total 100% (10000 basis points)
-   Only whitelisted vaults can receive allocations
-   Changes require queuing and a delay period before activation
-   Current delay: 8191 blocks

## Option A - Using Foundry CLI [​](https://docs.berachain.com/nodes/guides/reward-allocation#option-a-using-foundry-cli)

### Step 1 - Check Active Allocation [​](https://docs.berachain.com/nodes/guides/reward-allocation#step-1-check-active-allocation)

Start by checking your validator's current reward allocation:

bash

```
cast call 0xdf960E8F3F19C481dDE769edEDD439ea1a63426a \
"getActiveRewardAllocation(bytes)" \
"<YOUR_VALIDATOR_PUBKEY>" \
--rpc-url https://rpc.berachain.com/;

# [Expected Similar Output]:
# 0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000001b68ee000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000cc03066a3a06f3ac68d3a0d36610f52f7c208770000000000000000000000000000000000000000000000000000000000000686000000000000000000000000842c6cc319de7af0cd43f55009b5c1519cb06800000000000000000000000000000000000000000000000000000000000000068200000000000000000000000067993fc90a8ec45625447ad2ff454cfd3fbe9d7900000000000000000000000000000000000000000000000000000000000006820000000000000000000000007d949a79259d55da7da18ef947468b6e0b34f5cf0000000000000000000000000000000000000000000000000000000000000682000000000000000000000000b930dcbfb60b5599836f7ab4b7053fb4d881940e000000000000000000000000000000000000000000000000000000000000068200000000000000000000000079dc1bd33e5f6437e103ba321395c4d4629d580e0000000000000000000000000000000000000000000000000000000000000682
```

Example decoded output:

bash

```
cast --abi-decode "getActiveRewardAllocation(bytes)((uint64,(address,uint96)[]))" \
"0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000001b68ee000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000cc03066a3a06f3ac68d3a0d36610f52f7c208770000000000000000000000000000000000000000000000000000000000000686000000000000000000000000842c6cc319de7af0cd43f55009b5c1519cb06800000000000000000000000000000000000000000000000000000000000000068200000000000000000000000067993fc90a8ec45625447ad2ff454cfd3fbe9d7900000000000000000000000000000000000000000000000000000000000006820000000000000000000000007d949a79259d55da7da18ef947468b6e0b34f5cf0000000000000000000000000000000000000000000000000000000000000682000000000000000000000000b930dcbfb60b5599836f7ab4b7053fb4d881940e000000000000000000000000000000000000000000000000000000000000068200000000000000000000000079dc1bd33e5f6437e103ba321395c4d4629d580e0000000000000000000000000000000000000000000000000000000000000682"

# (1796334,
# [(0x0cc03066a3a06F3AC68D3A0D36610F52f7C20877, 1670),\
# (0x842c6CC319De7aF0cd43F55009B5c1519CB06800, 1666),\
# (0x67993Fc90A8EC45625447Ad2ff454cfD3fbE9d79, 1666),\
# (0x7D949A79259d55Da7da18EF947468B6E0b34f5cf, 1666),\
# (0xb930dCBfB60B5599836f7aB4B7053fB4D881940E, 1666),\
# (0x79DC1bd33e5F6437e103ba321395C4d4629d580e, 1666)])
```

The output is your validator's `RewardAllocation` struct, a tuple containing:

1. The allocation start block
2. An array of tuples, each containing the vault address and the percentage numerator (adding up to `10000`)

### Step 2 - Queue New Allocation [​](https://docs.berachain.com/nodes/guides/reward-allocation#step-2-queue-new-allocation)

An example command to queue a new allocation resembles the following:

bash

```
cast send 0xdf960E8F3F19C481dDE769edEDD439ea1a63426a \
"queueNewRewardAllocation(bytes,uint64,tuple(address,uint96)[])" \
"<YOUR_VALIDATOR_PUBKEY>" \
"$START_BLOCK" \
"[(0x12345...,5000),(0x56789...,5000)]" \
--private-key <YOUR_VALIDATOR_OPERATOR_ADDRESS_PRIVATE_KEY> \
--rpc-url https://rpc.berachain.com/
```

INFO

Remember that your `START_BLOCK` must be greater than the current block number + the block delay

### Step 3 - Check Your Queued Allocation [​](https://docs.berachain.com/nodes/guides/reward-allocation#step-3-check-your-queued-allocation)

Check your new pending allocation:

bash

```
cast call 0xdf960E8F3F19C481dDE769edEDD439ea1a63426a \
"getQueuedRewardAllocation(bytes)" \
"<YOUR_VALIDATOR_PUBKEY>" \
--rpc-url https://rpc.berachain.com/;
```

Once the `startBlock` is reached, the new allocation will be automatically activated the next time rewards are distributed for your validator.

## Option B - Using BeraHub UI [​](https://docs.berachain.com/nodes/guides/reward-allocation#option-b-using-berahub-ui)

You can also manage your reward allocations through the Berachain Dashboard: ![Reward Allocation](https://docs.berachain.com/assets/reward-allocation.png)

1. Navigate to [Validator Dashboard](https://hub.berachain.com/validators) on Berachain Hub
2. Connect your validator operator wallet
3. Click **Manage as a validator**
4. Click the **Configuration** tab
5. Select your vaults and choose desired allocation percentages (ensuring they add up to 100%)
6. Click **Queue** and submit the transaction

# Change Your Validator Operator Address Programmatically [​](https://docs.berachain.com/nodes/guides/operator-address#change-your-validator-operator-address-programmatically)

The following will walk you through the process of changing your operator address utilizing Foundry `cast`.

## What Is An Operator Address? [​](https://docs.berachain.com/nodes/guides/operator-address#what-is-an-operator-address)

The Operator Address is the BERA wallet address that is associated with a validator node.

It is responsible for receiving block rewards and is the sole address that has permission to change the Reward Allocation to distribute `$BGT` emissions to Reward Vaults.

## Requirements [​](https://docs.berachain.com/nodes/guides/operator-address#requirements)

Before you begin, ensure you have the following:

-   Operator Address Private Key
-   Your Validator Withdraw Credential Address (If Different Than Operator Address)
-   [BeaconKit Binary](https://github.com/berachain/beacon-kit/releases) (For Validator PubKey)
-   `$BERA` to process the transaction
-   [Foundry](https://book.getfoundry.sh/getting-started/installation)

## Steps To Change Your Operator Address Via Foundry [​](https://docs.berachain.com/nodes/guides/operator-address#steps-to-change-your-operator-address-via-foundry)

WARNING

This process revokes the current operator's permissions to receive block rewards and change the validator's Reward Allocation.

### Step 1 - Get Your Validator PubKey [​](https://docs.berachain.com/nodes/guides/operator-address#step-1-get-your-validator-pubkey)

bash

```
# FROM: /path/to/beacond

# BeaconKit Configuration - Example `$HOME/.beacond` or `/.beacond`
YOUR_BEACOND_HOME_DIR="<YOUR_BEACOND_HOME_DIRECTORY>";

# Withdraw Credential Address - Can be the same as the Operator Address
YOUR_VALIDATOR_WITHDRAW_CRED_ADDRESS="<0xYOUR_VALIDATOR_WITHDRAW_CRED_ADDRESS>";

# Genesis Configurations - DO NOT CHANGE THESE
GENESIS_VALIDATORS_ROOT="0x053397d1ddb01f3910e91ef762070a075e4b17ba3472c3c4dd391a68bd5d95a1";
GENESIS_FORK_VERSION="0x04000000";
VAL_DEPOSIT_GWEI_AMOUNT="32000000000";
DEPOSIT_CONTRACT_ADDRESS="0x4242424242424242424242424242424242424242";

DEPOSIT_OUTPUT=$(./beacond deposit create-validator $YOUR_VALIDATOR_WITHDRAW_CRED_ADDRESS $VAL_DEPOSIT_GWEI_AMOUNT $GENESIS_FORK_VERSION $GENESIS_VALIDATORS_ROOT --home $YOUR_BEACOND_HOME_DIR);
echo $DEPOSIT_OUTPUT;

# [Expected Similar Output]:
# 7:00AM INF Deposit Message CallData amount=0x773594000
# pubkey=0xYOUR_VALIDATOR_PUBKEY
# signature=0x...
#withdrawal credentials=0x010000000000000000000000YOUR_VALIDATOR_WITHDRAW_CRED_ADDRESS...

YOUR_VALIDATOR_PUBKEY=$(echo "$DEPOSIT_OUTPUT" | grep "pubkey=" | awk -F'pubkey=' '{print $2}' | awk -F' ' '{print $1}');
echo $YOUR_VALIDATOR_PUBKEY;

# [Expected Similar Output]:
# 0xYOUR_VALIDATOR_PUBKEY_92CHARS_INCLUDING_0X
```

### Step 2 - Check Your Current Operator Address [​](https://docs.berachain.com/nodes/guides/operator-address#step-2-check-your-current-operator-address)

This will double check your current operator address.

bash

```
# RPC URL assumed to be local but can use https://rpc.berachain.com/
cast call 0x4242424242424242424242424242424242424242 "getOperator(bytes)" <0xYOUR_VALIDATOR_PUBKEY> --rpc-url http://localhost:8545;

# [Expected Similar Output]:
# 0x000000000000000000000000YOUR_CURRENT_OPERATOR_ADDRESS
```

### Step 3 - Change Your Operator Address [​](https://docs.berachain.com/nodes/guides/operator-address#step-3-change-your-operator-address)

This will change your operator address.

bash

```
# RPC URL assumed to be local but can use https://rpc.berachain.com/
cast send 0x4242424242424242424242424242424242424242 "requestOperatorChange(bytes,address)" <0xYOUR_VALIDATOR_PUBKEY> <0xYOUR_NEW_OPERATOR_ADDRESS> --rpc-url [<rpc_url>](http://localhost:8545) --private-key <0xYOUR_CURRENT_OPERATOR_PRIVATE_KEY>;
```

# Berachain Local Devnet With Kurtosis [​](https://docs.berachain.com/nodes/guides/kurtosis#berachain-local-devnet-with-kurtosis)

The following will walk you through setting up a local Berachain devnet-not connected to bArtio.

WARNING

Some features like natives dApps, contracts, and more may still be a work in progress.

## Requirements [​](https://docs.berachain.com/nodes/guides/kurtosis#requirements)

Before starting, make sure that you have the following installed on your computer.

-   [Docker](https://docs.docker.com/get-docker/) `version 25.0.2` or greater
-   [Kurtosis](https://docs.kurtosis.com/install) `v0.90.1` or greater
-   [Foundry](https://book.getfoundry.sh/getting-started/installation) `v0.2.0` or greater - (For testing purposes)

## Kurtosis Local Devnet [​](https://docs.berachain.com/nodes/guides/kurtosis#kurtosis-local-devnet)

Going through this process will setup and run multiple services and execution clients.

WARNING

This may require a decent amount of resources to run, and if you run into limits, modify the yaml configuration file to limit the number of node / services.

If you run the default kurtosis configuration, it will run the following:

-   5 validator nodes
-   3 full nodes
-   6 additional services

You can modify the [beaconkit-all.yaml](https://github.com/berachain/beacon-kit/blob/main/kurtosis/beaconkit-all.yaml) to fit your system requirements.

### Step 1 - Clone Repository & Run Nodes [​](https://docs.berachain.com/nodes/guides/kurtosis#step-1-clone-repository-run-nodes)

First step is to clone the BeaconKit repository.

bash

```
git clone https://github.com/berachain/beacon-kit;
cd beacon-kit;
```

After cloning the repository, run the Make script.

TIP

If you encounter issues, please see [Debugging Issues](https://docs.berachain.com/nodes/guides/kurtosis#debugging-issues).

bash

```
# FROM: ./beacon-kit

make start-devnet;

# [Expected Output]:
# Checking for Kurtosis installation...
# Kurtosis is already installed
# /Applications/Xcode.app/Contents/Developer/usr/bin/make build-docker VERSION=kurtosis-local start-devnet-no-build
# Build a release docker image for the Cosmos SDK chain...
# docker build \
# 	--platform linux/arm64 \
# 	--build-arg GIT_COMMIT=f3738205bcd8c91f3c262618b078eeefb48a67f3 \
# 	--build-arg GIT_VERSION=kurtosis-local \
# 	--build-arg GIT_BRANCH=main \
# 	--build-arg GOOS=linux \
# 	--build-arg GOARCH=arm64 \
# 	-f ./Dockerfile \
# 	-t beacond:kurtosis-local \
# 	.
# [+] Building 26.0s (33/41)
# ...
# Starlark code successfully run. No output was returned.
#
# ⭐ us on GitHub - https://github.com/kurtosis-tech/kurtosis
# INFO[2024-06-27T00:16:11-04:00] ========================================================
# INFO[2024-06-27T00:16:11-04:00] ||          Created enclave: my-local-devnet          ||
# INFO[2024-06-27T00:16:11-04:00] ========================================================
# Name:            my-local-devnet
# UUID:            3c23eccb8c64
# Status:          RUNNING
# Creation Time:   Thu, 27 Jun 2024 00:14:55 EDT
# Flags:
#
# ========================================= Files Artifacts =========================================
# UUID           Name
# b5aae73c6271   ancient-butterfly
# 601914df8eea   cosmos-genesis-final
# 2c8346b3df40   el_cl_genesis_data
# 38571b521297   genesis_file
# 978405cf0e0f   geth-config
# 46c4a6d9988e   jwt_file
# 39ab7b9e6b01   kzg_trusted_setup
# 0f6148946b08   multiple-premined-deposits
# c59bf8b35b60   nether_genesis_file
# 0c84ab86dd73   nethermind-config
# e965d7a7faa0   node-beacond-config-0
# 030b600e169c   node-beacond-config-1
# 8d644e614430   node-beacond-config-2
# 618d91e2218d   node-beacond-config-3
# 447d51638f49   node-beacond-config-4
# 7d656edde80a   prometheus-config
# 9d93c25b6424   reth-config
# 3e7411b9e325   vast-storm
#
# ========================================== User Services ==========================================
# UUID           Name                        Ports                                                  Status
# 79f7561b4b43   blockscout                  http: 4000/tcp -> http://127.0.0.1:53414               RUNNING
# 26c02bed0a42   blockscout-postgres         postgresql: 5432/tcp -> postgresql://127.0.0.1:53306   RUNNING
# fd16c170438f   blockscout-verif            http: 8050/tcp -> http://127.0.0.1:53345               RUNNING
# f545ea9b37d9   blutgang                    admin: 5715/tcp -> http://127.0.0.1:52505              RUNNING
#                                            http: 3000/tcp -> http://127.0.0.1:52506
# b018cf002dc9   cl-full-beaconkit-0         cometbft-grpc: 9090/tcp -> 127.0.0.1:51243             RUNNING
#                                            cometbft-p2p: 26656/tcp -> 127.0.0.1:51245
#                                            cometbft-rest: 1317/tcp -> 127.0.0.1:51244
#                                            cometbft-rpc: 26657/tcp -> 127.0.0.1:51246
#                                            metrics: 26660/tcp -> 127.0.0.1:51247
# e2e1c5b99640   cl-full-beaconkit-1         cometbft-grpc: 9090/tcp -> 127.0.0.1:51235             RUNNING
#                                            cometbft-p2p: 26656/tcp -> 127.0.0.1:51237
#                                            cometbft-rest: 1317/tcp -> 127.0.0.1:51236
#                                            cometbft-rpc: 26657/tcp -> 127.0.0.1:51233
#                                            metrics: 26660/tcp -> 127.0.0.1:51234
# 85954427d8ed   cl-full-beaconkit-2         cometbft-grpc: 9090/tcp -> 127.0.0.1:51239             RUNNING
#                                            cometbft-p2p: 26656/tcp -> 127.0.0.1:51241
#                                            cometbft-rest: 1317/tcp -> 127.0.0.1:51240
#                                            cometbft-rpc: 26657/tcp -> 127.0.0.1:51242
#                                            metrics: 26660/tcp -> 127.0.0.1:51238
# 01c06ac63cdf   cl-seed-beaconkit-0         cometbft-grpc: 9090/tcp -> 127.0.0.1:51194             RUNNING
#                                            cometbft-p2p: 26656/tcp -> 127.0.0.1:51191
#                                            cometbft-rest: 1317/tcp -> 127.0.0.1:51195
#                                            cometbft-rpc: 26657/tcp -> 127.0.0.1:51192
#                                            metrics: 26660/tcp -> 127.0.0.1:51193
# 0f4df1fc5824   cl-validator-beaconkit-0    cometbft-grpc: 9090/tcp -> 127.0.0.1:52318             RUNNING
#                                            cometbft-p2p: 26656/tcp -> 127.0.0.1:52315
#                                            cometbft-rest: 1317/tcp -> 127.0.0.1:52314
#                                            cometbft-rpc: 26657/tcp -> 127.0.0.1:52316
#                                            metrics: 26660/tcp -> 127.0.0.1:52317
# 81d2e6091425   cl-validator-beaconkit-1    cometbft-grpc: 9090/tcp -> 127.0.0.1:52321             RUNNING
#                                            cometbft-p2p: 26656/tcp -> 127.0.0.1:52323
#                                            cometbft-rest: 1317/tcp -> 127.0.0.1:52322
#                                            cometbft-rpc: 26657/tcp -> 127.0.0.1:52319
#                                            metrics: 26660/tcp -> 127.0.0.1:52320
# 31ac5a4a8367   cl-validator-beaconkit-2    cometbft-grpc: 9090/tcp -> 127.0.0.1:52342             RUNNING
#                                            cometbft-p2p: 26656/tcp -> 127.0.0.1:52339
#                                            cometbft-rest: 1317/tcp -> 127.0.0.1:52338
#                                            cometbft-rpc: 26657/tcp -> 127.0.0.1:52340
#                                            metrics: 26660/tcp -> 127.0.0.1:52341
# 16a9f7c56f2c   cl-validator-beaconkit-3    cometbft-grpc: 9090/tcp -> 127.0.0.1:52332             RUNNING
#                                            cometbft-p2p: 26656/tcp -> 127.0.0.1:52329
#                                            cometbft-rest: 1317/tcp -> 127.0.0.1:52328
#                                            cometbft-rpc: 26657/tcp -> 127.0.0.1:52330
#                                            metrics: 26660/tcp -> 127.0.0.1:52331
# 350ad296d808   cl-validator-beaconkit-4    cometbft-grpc: 9090/tcp -> 127.0.0.1:52337             RUNNING
#                                            cometbft-p2p: 26656/tcp -> 127.0.0.1:52334
#                                            cometbft-rest: 1317/tcp -> 127.0.0.1:52333
#                                            cometbft-rpc: 26657/tcp -> 127.0.0.1:52335
#                                            metrics: 26660/tcp -> 127.0.0.1:52336
# 6e118e6069ea   el-full-geth-2              engine-rpc: 8551/tcp -> 127.0.0.1:51205                RUNNING
#                                            eth-json-rpc: 8545/tcp -> 127.0.0.1:51208
#                                            eth-json-rpc-ws: 8546/tcp -> 127.0.0.1:51204
#                                            metrics: 9001/tcp -> 127.0.0.1:51206
#                                            tcp-discovery: 30303/tcp -> 127.0.0.1:51207
#                                            udp-discovery: 30303/udp -> 127.0.0.1:62535
# a02f6e9ffb57   el-full-reth-0              engine-rpc: 8551/tcp -> 127.0.0.1:51216                RUNNING
#                                            eth-json-rpc: 8545/tcp -> 127.0.0.1:51214
#                                            eth-json-rpc-ws: 8546/tcp -> 127.0.0.1:51215
#                                            metrics: 9001/tcp -> 127.0.0.1:51217
#                                            tcp-discovery: 30303/tcp -> 127.0.0.1:51218
#                                            udp-discovery: 30303/udp -> 127.0.0.1:63859
# 66ec4f86f9a8   el-full-reth-1              engine-rpc: 8551/tcp -> 127.0.0.1:51211                RUNNING
#                                            eth-json-rpc: 8545/tcp -> 127.0.0.1:51209
#                                            eth-json-rpc-ws: 8546/tcp -> 127.0.0.1:51210
#                                            metrics: 9001/tcp -> 127.0.0.1:51212
#                                            tcp-discovery: 30303/tcp -> 127.0.0.1:51213
#                                            udp-discovery: 30303/udp -> 127.0.0.1:52493
# 985f34bb632c   el-seed-reth-0              engine-rpc: 8551/tcp -> 127.0.0.1:51178                RUNNING
#                                            eth-json-rpc: 8545/tcp -> 127.0.0.1:51181
#                                            eth-json-rpc-ws: 8546/tcp -> 127.0.0.1:51182
#                                            metrics: 9001/tcp -> 127.0.0.1:51179
#                                            tcp-discovery: 30303/tcp -> 127.0.0.1:51180
#                                            udp-discovery: 30303/udp -> 127.0.0.1:64586
# ff5d4880de7e   el-validator-besu-0         engine-rpc: 8551/tcp -> 127.0.0.1:51449                RUNNING
#                                            eth-json-rpc: 8545/tcp -> 127.0.0.1:51452
#                                            eth-json-rpc-ws: 8546/tcp -> 127.0.0.1:51453
#                                            metrics: 9001/tcp -> 127.0.0.1:51450
#                                            tcp-discovery: 30303/tcp -> 127.0.0.1:51451
#                                            udp-discovery: 30303/udp -> 127.0.0.1:55464
# 3677d9c2ab08   el-validator-erigon-4       engine-rpc: 8551/tcp -> 127.0.0.1:51416                RUNNING
#                                            eth-json-rpc: 8545/tcp -> 127.0.0.1:51419
#                                            eth-json-rpc-ws: 8546/tcp -> 127.0.0.1:51415
#                                            metrics: 9001/tcp -> 127.0.0.1:51417
#                                            tcp-discovery: 30303/tcp -> 127.0.0.1:51418
#                                            udp-discovery: 30303/udp -> 127.0.0.1:52140
# 8a8d0605d110   el-validator-geth-3         engine-rpc: 8551/tcp -> 127.0.0.1:51456                RUNNING
#                                            eth-json-rpc: 8545/tcp -> 127.0.0.1:51454
#                                            eth-json-rpc-ws: 8546/tcp -> 127.0.0.1:51455
#                                            metrics: 9001/tcp -> 127.0.0.1:51457
#                                            tcp-discovery: 30303/tcp -> 127.0.0.1:51458
#                                            udp-discovery: 30303/udp -> 127.0.0.1:57790
# 27c61431bf07   el-validator-nethermind-1   engine-rpc: 8551/tcp -> 127.0.0.1:51440                RUNNING
#                                            eth-json-rpc: 8545/tcp -> 127.0.0.1:51443
#                                            eth-json-rpc-ws: 8546/tcp -> 127.0.0.1:51444
#                                            metrics: 9001/tcp -> 127.0.0.1:51441
#                                            tcp-discovery: 30303/tcp -> 127.0.0.1:51442
#                                            udp-discovery: 30303/udp -> 127.0.0.1:60619
# bb829e4f06e5   el-validator-reth-2         engine-rpc: 8551/tcp -> 127.0.0.1:51423                RUNNING
#                                            eth-json-rpc: 8545/tcp -> 127.0.0.1:51421
#                                            eth-json-rpc-ws: 8546/tcp -> 127.0.0.1:51422
#                                            metrics: 9001/tcp -> 127.0.0.1:51424
#                                            tcp-discovery: 30303/tcp -> 127.0.0.1:51420
#                                            udp-discovery: 30303/udp -> 127.0.0.1:52707
# cc6bfe221c4e   goomy-blob-spammer          <none>                                                 RUNNING
# 6e417d31c1dd   grafana                     dashboards: 3000/tcp -> http://127.0.0.1:52841         RUNNING
# 5c5b3c300c71   prometheus                  http: 9090/tcp -> http://127.0.0.1:52746               RUNNING
# e5d817a7ff20   pyroscope                   pyroscope: 4040/tcp -> http://127.0.0.1:53224          RUNNING
# fc84cfef2319   tx-fuzz-0                   <none>                                                 RUNNING
# 1dd2fece619b   tx-fuzz-1                   <none>                                                 RUNNING
# 26df503b9a05   tx-fuzz-10                  <none>                                                 RUNNING
# 9e979dffa8f3   tx-fuzz-11                  <none>                                                 RUNNING
# e6bf3df68ab5   tx-fuzz-12                  <none>                                                 RUNNING
# caf8e90eb636   tx-fuzz-13                  <none>                                                 RUNNING
# b37cfe191eba   tx-fuzz-14                  <none>                                                 RUNNING
# ac0a401c2e31   tx-fuzz-15                  <none>                                                 RUNNING
# c7877a3e9efa   tx-fuzz-2                   <none>                                                 RUNNING
# c13b0dd16da6   tx-fuzz-3                   <none>                                                 RUNNING
# f92b5661000c   tx-fuzz-4                   <none>                                                 RUNNING
# 6afbb7c0a215   tx-fuzz-5                   <none>                                                 RUNNING
# d6cc564bf8fd   tx-fuzz-6                   <none>                                                 RUNNING
# d6f6ac4fcba1   tx-fuzz-7                   <none>                                                 RUNNING
# 00dc8cdbb379   tx-fuzz-8                   <none>                                                 RUNNING
# 78f3100e7ce8   tx-fuzz-9                   <none>                                                 RUNNING
```

### Step 2 - Test Devnet [​](https://docs.berachain.com/nodes/guides/kurtosis#step-2-test-devnet)

To see that the local devnet is working, one of the services that is run alongside the network is a local blockscout block explorer.

bash

```
open http://127.0.0.1:53414; # NOTE: Port is random so this may vary for yourself
```

![Berachain Devnet Block Explorer](https://docs.berachain.com/assets/berachain-devnet-kurtosis-blockexplorer.png)

### Step 3 - Configure Wallet [​](https://docs.berachain.com/nodes/guides/kurtosis#step-3-configure-wallet)

If you want to see a list of all defined wallet addresses and private keys, see [constants.star](https://github.com/berachain/beacon-kit/blob/main/kurtosis/src/constants.star).

Start by adding the network to your MetaMask wallet.

TIP

**NOTE:** The port number may vary for yourself, so please check the logs.

| Key                | Value                  |
| ------------------ | ---------------------- |
| Network            | Berachain Local Devnet |
| RPC URL            | http://127.0.0.1:51208 |
| Chain ID           | 80087                  |
| Currency symbol    | BERA                   |
| Block explorer URL | http://127.0.0.1:53414 |

Next import one of the private keys defined in [constants.star](https://github.com/berachain/beacon-kit/blob/main/kurtosis/src/constants.star).

**File:** `./kurtosis/src/constants.star`

python

````
# ...

PRE_FUNDED_ACCOUNTS = [\
    new_prefunded_account(\
        "0x20f33ce90a13a4b5e7697e3544c3083b8f8a51d4",\
        # Import this ↓\
        "fffdbb37105441e14b0ee6330d855d8504ff39e705c3afa8f859ac9865f99306", #\
    ),\
\
# ...\
```\
\
If you're successful, you should see the account address `0x20f33ce90a13a4b5e7697e3544c3083b8f8a51d4` added with a the following balance:\
\
![Berachain Local Devnet Metamask Wallet Configuration](https://docs.berachain.com/assets/berachain-local-devnet-metamask-configuration.png)\
\
### Step 4 - Deploy Contract [​](https://docs.berachain.com/nodes/guides/kurtosis\#step-4-deploy-contract)\
\
To demonstrate deploying a contract to the local devnet, let's use the [Berachain Guides HelloWorld.sol](https://github.com/berachain/guides/blob/main/apps/hardhat-viem-helloworld/contracts/HelloWorld.sol).\
\
bash\
\
```\
# FROM: ./beacon-kit;\
\
mkdir tmp;\
touch tmp/HelloWorld.sol;\
```\
\
**File:** `./tmp/HelloWorld.sol`\
\
solidity\
\
```\
// SPDX-License-Identifier: UNLICENSED\
pragma solidity ^0.8.9;\
\
contract HelloWorld {\
    // Events that allows for emitting a message\
    event NewGreeting(address sender, string message);\
\
    // Variables\
    string greeting;\
\
    // Main constructor run at deployment\
    constructor(string memory _greeting) {\
        greeting = _greeting;\
        emit NewGreeting(msg.sender, _greeting);\
    }\
\
    // Get function\
    function getGreeting() public view returns (string memory) {\
        return greeting;\
    }\
\
    // Set function\
    function setGreeting(string memory _greeting) public {\
        greeting = _greeting;\
        emit NewGreeting(msg.sender, _greeting);\
    }\
}\
```\
\
Let's use a `cast` request to deploy the bytecode.\
\
bash\
\
```\
# FROM: ./\
\
forge create --rpc-url http://127.0.0.1:51208 --private-key fffdbb37105441e14b0ee6330d855d8504ff39e705c3afa8f859ac9865f99306 tmp/HelloWorld.sol:HelloWorld --constructor-args "Initial greeting message" --legacy;\
\
# [Expected Output]:\
# [⠊] Compiling...\
# No files changed, compilation skipped\
# Deployer: 0x20f33CE90A13a4b5E7697E3544c3083B8F8A51D4\
# Deployed to: 0x4d31F9761DEe0132A17794018143360113575cFE\
# Transaction hash: 0xf18d36b5aeb9b5acc6711b65944a392fd659f34966156e475c5d15cb733677d9\
```\
\
You should now be able to see this in the block explorer.\
\
bash\
\
```\
# NOTE: The block explorer will take time to index everything so it might not show up right away\
open http://127.0.0.1:53414/tx/0xf18d36b5aeb9b5acc6711b65944a392fd659f34966156e475c5d15cb733677d9;\
```\
\
### Step 5 - Read Contract [​](https://docs.berachain.com/nodes/guides/kurtosis\#step-5-read-contract)\
\
Let's read from the contract to verify that the contract was deployed and the initial message was set.\
\
bash\
\
```\
cast call 0x4d31F9761DEe0132A17794018143360113575cFE "getGreeting()" --rpc-url http://127.0.0.1:51208 | xxd -r -p;\
\
# [Expected Output]:\
# Initial greeting message\
```\
\
### Step 6 - Write Contract [​](https://docs.berachain.com/nodes/guides/kurtosis\#step-6-write-contract)\
\
Next, let's write to the contract and read from it again with an updated message.\
\
Writing to the contract:\
\
bash\
\
```\
cast send 0x4d31F9761DEe0132A17794018143360113575cFE "setGreeting(string)" "Hello From Devnet" --rpc-url http://127.0.0.1:51208 --private-key fffdbb37105441e14b0ee6330d855d8504ff39e705c3afa8f859ac9865f99306 --legacy;\
\
# [Expected Output]:\
# blockHash               0xa47a10872a0b162d7f95f2339a246b3be2fa0b5df262bc0ccb9ebd50bcc20269\
# blockNumber             1783\
# contractAddress\
# cumulativeGasUsed       29746\
# effectiveGasPrice       258831769\
# from                    0x20f33CE90A13a4b5E7697E3544c3083B8F8A51D4\
# gasUsed                 29746\
# logs                    [{"address":"0x4d31f9761dee0132a17794018143360113575cfe","topics":["0xcbc299eeb7a1a982d3674880645107c4fe48c3227163794e48540a7522722354"],"data":"0x00000000000000000000000020f33ce90a13a4b5e7697e3544c3083b8f8a51d40000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000001148656c6c6f2046726f6d204465766e6574000000000000000000000000000000","blockHash":"0xa47a10872a0b162d7f95f2339a246b3be2fa0b5df262bc0ccb9ebd50bcc20269","blockNumber":"0x6f7","transactionHash":"0xc7ef2bbd80866be88cbd83abddeeaeab10af5263bc1ef86ce683cafbd52d8a16","transactionIndex":"0x0","logIndex":"0x0","removed":false}]\
# logsBloom               0x00000000000000000000000000000000008000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000080000000100040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000\
# root\
# status                  1 (success)\
# transactionHash         0xc7ef2bbd80866be88cbd83abddeeaeab10af5263bc1ef86ce683cafbd52d8a16\
# transactionIndex        0\
# type                    0\
# blobGasPrice\
# blobGasUsed\
# to                      0x4d31F9761DEe0132A17794018143360113575cFE\
```\
\
Reading from the contract:\
\
bash\
\
```\
cast call 0x4d31F9761DEe0132A17794018143360113575cFE "getGreeting()" --rpc-url http://127.0.0.1:51208 | xxd -r -p;\
\
# [Expected Output]:\
# Hello From Devnet\
```\
\
### Step 7 - Tear Down [​](https://docs.berachain.com/nodes/guides/kurtosis\#step-7-tear-down)\
\
To remove all services and clean up, run the following:\
\
bash\
\
```\
# FROM: ./beacon-kit\
\
# NOTE: These may get stuck - in that case see Debugging Issues below\
make stop-devnet;\
make rm-devnet;\
\
# [Expected Output]:\
# kurtosis enclave stop my-local-devnet\
# ...\
```\
\
## Debugging Issues [​](https://docs.berachain.com/nodes/guides/kurtosis\#debugging-issues)\
\
There is a possibility that Docker will stop working on MacOS. In those cases, try `kurtosis clean -a` and if the problem still persists try removing all containers and restarting Docker.\
\
bash\
\
```\
# To remove all docker instances quickly\
docker rm -f $(docker ps -aq);\
\
# [Expected Output]:\
# 7c1dce7eebfb\
# 91bb1725781b\
# 41691876aeda\
# ...\
````

# Increase A Validator's $BERA Stake [​](https://docs.berachain.com/nodes/guides/increase-validator-bera-stake#increase-a-validator-s-bera-stake)

The following steps will guide you through the process of increasing a Validator's `$BERA` stake to increase their stake weight and increase the probability of proposing blocks.

This guide assumes that a Validator is already in the Active Set.

## Active Set & $BERA Stake [​](https://docs.berachain.com/nodes/guides/increase-validator-bera-stake#active-set-bera-stake)

Currently, the Active Set consists of `69` Validators, which is the number of Validators that can propose blocks.

The Active Set is determined by the amount of `$BERA` staked, where the top stakers are included in the Active Set. To be included in the Active Set, a Validator must stake at least 32 `$BERA` or 1 `$BERA` more than the lowest staker in the Active Set (whichever is greater).

If a Validator is removed from the Active Set, all `$BERA` staked to that Validator will be returned to the Validator's Withdrawal Credentials Address.

## Staking Considerations [​](https://docs.berachain.com/nodes/guides/increase-validator-bera-stake#staking-considerations)

There are a few points to consider with staking:

-   **Stake Returned To Single Address** \- All `$BERA` staked to a Validator is returned to the Validator's Withdrawal Credentials Address. If there are multiple stakers, an agreement must be put in place with the Validator to ensure that the `$BERA` is returned to the correct addresses.
-   **Minimum Stake Deadline** \- The minimum stake deadline is 1 epoch. If the Validator does not meet the minimum stake or the minimum amount to overtake another Validator in that timeframe, the existing `$BERA` will be returned to the Validator's Withdrawal Credentials Address.
-   **Liquid Staking Protocols** \- Managing multiple stakers with a single Validator can be difficult. As an alternative, Liquid Staking Protocols are an option.

## Requirements [​](https://docs.berachain.com/nodes/guides/increase-validator-bera-stake#requirements)

Before you begin, ensure you have the following:

-   A Validator that is already in the Active Set
-   A Validator's `pubkey` \- PubKeys can be found at [Berachain Hub Validators](https://docs.berachain.com/nodes/guides/undefined/validators)
-   A minimum of 32 `$BERA` or 1 `$BERA` more than the lowest staker in the Active Set (whichever is greater)
-   [Foundry](https://book.getfoundry.sh/getting-started/installation)

## Steps To Increase A Validator's $BERA Stake [​](https://docs.berachain.com/nodes/guides/increase-validator-bera-stake#steps-to-increase-a-validator-s-bera-stake)

INFO

**ERROR CODE DEFINITIONS:** See the following for more information about specific hex error codes: [https://docs.berachain.com/berachain-docs/error-codes](https://docs.berachain.com/berachain-docs/error-codes)

bash

```
# FROM: /

VALIDATOR_PUB_KEY=<VALIDATOR_PUB_KEY_98CHARS_WITH_0x>;
YOUR_ETH_WALLET_PRIVATE_KEY=<YOUR_ETH_WALLET_PRIVATE_KEY>;
YOUR_ETH_RPC_URL=<YOUR_ETH_RPC_URL>;
YOUR_STAKED_AMOUNT=<NUMBER>ether;

# The 0x0.. are NOT typos
cast send "0x4242424242424242424242424242424242424242" \
'deposit(bytes,bytes,bytes,address)' \
"$VALIDATOR_PUB_KEY" \
"0x0000000000000000000000000000000000000000000000000000000000000000" \
"0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000" \
"0x0000000000000000000000000000000000000000" \
--private-key "$YOUR_ETH_WALLET_PRIVATE_KEY" \
--value $YOUR_STAKED_AMOUNT \
-r $YOUR_ETH_RPC_URL;
```

# Distribute Block Rewards [​](https://docs.berachain.com/nodes/guides/distribute-block-rewards#distribute-block-rewards)

The following steps will guide you through the process of distributing block rewards on Berachain for both Validators and Reward Vaults.

## How Block Rewards Are Distributed [​](https://docs.berachain.com/nodes/guides/distribute-block-rewards#how-block-rewards-are-distributed)

Block rewards are distributed to both a Validator and Reward Vaults defined by the respective Validator's Reward Allocation.

Reward distribution does not happen automatically and requires that the `distributeFor` function be called in the [Distributor](https://berascan.com//address/0xD2f19a79b026Fb636A7c300bF5947df113940761) contract.

## Who Can Distribute Block Rewards? [​](https://docs.berachain.com/nodes/guides/distribute-block-rewards#who-can-distribute-block-rewards)

Anyone can trigger this function, as long as they have access to the proof generation endpoint provided by `beacond`. Anyone can also execute the `distributeFor` function for past blocks.

## Distribution Considerations [​](https://docs.berachain.com/nodes/guides/distribute-block-rewards#distribution-considerations)

There are a few points to consider with distribution:

1. **Distribute At Block N-1** \- The Distributor contract can only distribute block rewards for the block that was last created and not the current block.
2. **Block Rewards Expiration** \- If rewards are not distributed before a block span of `8191`, the rewards are lost.
3. **Foundation Trigger Fallback** \- The Berachain foundation has set up a service to call the `distributeFor` function periodically, including sometimes in a `multicall` to ensure that block rewards are distributed. However, this fallback should be considered a last resort, and Validators should plan to set up a service to handle triggering the distribution themselves.
4. **Block Reward Tracking** \- It is recommended that node operators track the block rewards they have distributed to ensure that they are not missing any rewards.

## Requirements [​](https://docs.berachain.com/nodes/guides/distribute-block-rewards#requirements)

Before you begin, ensure you have the following:

-   A full node synced to the latest block with `beacond` and an execution client
-   `$BERA` to process the transaction
-   [Foundry](https://book.getfoundry.sh/getting-started/installation)

## Steps To Distribute Block Rewards Via Foundry [​](https://docs.berachain.com/nodes/guides/distribute-block-rewards#steps-to-distribute-block-rewards-via-foundry)

The following is a single bash command that can be run to distribute block rewards.

INFO

**NOTE:** If the transaction fails, it is possible that these block rewards have already been distributed.

bash

```
# FROM: /

# STEP 1: Get Block(s) To Be Distributed
# ----------------------------------------------------
# Get recent finalized block's number from Exec Layer -> Get timestamp of its parent block
# Example: 1730756547

cast block finalized --rpc-url http://localhost:8545;

# [Expected Similar Output]:
# baseFeePerGas        7
# difficulty           0
# extraData            0xd883010e05846765746888676f312e32322e34856c696e7578
# gasLimit             30000000
# gasUsed              1362987
# hash                 0xb576213ebb325ca33e9ceb47f2d1a813b193fb87aa46f82a31111e19bfafc130
# logsBloom            0x0000020000000000000000000000000010008002420000040000000020010400004000000000000000000001000000000004128000000000000000000028810104000008000000200020200800000001000040240000000000000c0001800000001001000200000000000040000408000402000800900080000000100000000000c40080010000000404040500a010000000000000000100200080400000000002042000040208400000200000000000180000000001000008200000008000000008000200000000000000000000000000000b010010080a00800000000020000010040000003800210000082000400088008000081000000000204110800001
# miner                0x0000000000000000000000000000000000000000
# mixHash              0x768a48d830a60995602bf4c788feeeb73dcb033f860a5f5fbd310dcc66f2da2b
# nonce                0x0000000000000000
# number               2340989 <---- WE NEED THIS
# ...

TARGET_BLOCK=`cast block finalized --rpc-url http://localhost:8545 | grep number | awk '{print $2}'`;
PARENT_BLOCK=`expr $TARGET_BLOCK + 1`;

# Get the next timestamp - we will generate the rewards by referencing the parent block
# Each second identifies a specific block; use the next second to reference the parent block.
TIMESTAMP=`cast block $PARENT_BLOCK --rpc-url http://localhost:8545 | grep timestamp | awk '{print $2}'`;
echo $TIMESTAMP;

# [Expected Similar Output]:
# 1734598728

# STEP 2: Generate Proofs For Block
# ----------------------------------------------------
# Sanity check - isTimestampActionable? Returns true if rewards have not yet been distributed for this block.

# NOTE: Distribute contract may differ
cast call "0xD2f19a79b026Fb636A7c300bF5947df113940761" "isTimestampActionable(uint64 timestamp) returns (bool success)" "$TIMESTAMP" --rpc-url http://localhost:8545;

# [Expected Output]:
# true

# This is in the scenario where `beacond` is running locally.
PROOF_JSON=`curl http://localhost:3500/bkit/v1/proof/block_proposer/t$TIMESTAMP`
echo $PROOF_JSON;

# STEP 3: Distribute Block Rewards
# ----------------------------------------------------
# Retrieve needed data
PROPOSER_INDEX=`echo $PROOF_JSON|jq -r '.beacon_block_header.proposer_index'`;
VAL_PUBKEY=`echo $PROOF_JSON|jq -r '.validator_pubkey'`;
PROPOSER_PROOF=`echo $PROOF_JSON|jq -j '.proposer_index_proof'|sed 's/"//g'|tr -d '\\n'`;
VAL_PUBKEY_PROOF=`echo $PROOF_JSON|jq -j '.validator_pubkey_proof'|sed 's/"//g'|tr -d '\\n'`;

# Execute tx after setting PK of wallet sending tx (or use --ledger if not using raw PK)
# Example: Transaction successfully executed. Gas used: 104467
WALLET_PRIVATE_KEY=<0xYOUR_WALLET_PRIVATE_KEY>;

cast send "0xD2f19a79b026Fb636A7c300bF5947df113940761" \
"distributeFor(uint64 nextTimestamp, uint64 proposerIndex, bytes calldata pubkey, bytes32[] calldata proposerIndexProof, bytes32[] calldata pubkeyProof)" \
"$TIMESTAMP" \
"$PROPOSER_INDEX" \
"$VAL_PUBKEY" \
"$PROPOSER_PROOF" \
"$VAL_PUBKEY_PROOF" \
--private-key $WALLET_PRIVATE_KEY \
--rpc-url http://localhost:8545;
```

# EVM Execution Layer ⟠ [​](https://docs.berachain.com/nodes/evm-execution#evm-execution-layer-%E2%9F%A0)

The execution layer has multiple implementations in the form of EVM execution clients that handle transactions, transaction gossiping, state management, and support the Ethereum Virtual Machine - they are not responsible for block building.

The following are the execution clients that BeaconKit has tested and verified support for:

| Client                                                          | Language   | Sync Strategies                    | State Pruning   | Maintainer          |
| --------------------------------------------------------------- | ---------- | ---------------------------------- | --------------- | ------------------- |
| [Geth](https://github.com/ethereum/go-ethereum)                 | Golang     | Snap, Full                         | Archive, Pruned | Ethereum Foundation |
| [Nethermind](https://github.com/NethermindEth/nethermind)       | C#,.NET    | Snap (without serving), Fast, Full | Archive, Pruned | Nethermind          |
| [Besu](https://github.com/hyperledger/besu/)                    | Java       | Snap, Fast, Full                   | Archive, Pruned | Hyperledger         |
| [Erigon](https://github.com/ledgerwatch/erigon)                 | Golang     | Full                               | Archive, Pruned | Erigon              |
| [Reth](https://github.com/paradigmxyz/reth)                     | Rust       | Full                               | Archive, Pruned | Paradigm            |
| [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo) | TypeScript | Full                               | Pruned          | Ethereum Foundation |

# BeaconKit Consensus Layer ⛵✨ [​](https://docs.berachain.com/nodes/beaconkit-consensus#beaconkit-consensus-layer-%E2%9B%B5%E2%9C%A8)

![Berachain BeaconKit](https://docs.berachain.com/assets/beaconkit-banner.png)

[BeaconKit](https://docs.berachain.com/learn/what-is-beaconkit) is both a consensus client and framework for building EVM chains.

BeaconKit leverages CometBFT for its consensus algorithm, wrapped to interface with any EVM-compatible execution environment. As a consensus client, it allows the network (an EVM blockchain like Berachain) to come to an agreement based on the data provided by the execution client.

By conforming to Eth2 modularity, which separates consensus and execution, BeaconKit is able to leverage all the benefits that come with EVM execution clients. It achieves this by adhering to the [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md), which is a JSON-RPC API that enables communication between consensus and execution clients.

## BeaconKit Benefits ✅ [​](https://docs.berachain.com/nodes/beaconkit-consensus#beaconkit-benefits-%E2%9C%85)

Some of the benefits that come with BeaconKit are:

1. **Eth2 Modularity** \- Adheres to separation of execution and consensus with communication via Engine API
2. **Promotes Execution Client Diversity** \- Any EVM execution upgrades can be supported out of the box, avoiding the need to run and maintain a custom forked EVM execution client to work with the chain
3. **CometBFT** \- Leverages a trusted consensus algorithm
4. **Instant Finality** \- Achieves [Single Slot Finality / Instant Finality](https://docs.berachain.com/learn/help/glossary#single-slot-finality), compared to Ethereum's finality of ~13 minutes
5. **Leverages EVM Tooling** \- The majority of all EVM tooling is supported.
6. **Modular** \- BeaconKit is also a modular framework that can allow for the potential implementation of a custom block builder, rollup, data availability layer, and more

![Berachain BeaconKit vs Ethereum](https://docs.berachain.com/assets/berachain-ethereum-vs-beaconkit.png)

# What is Berachain? 🐻⛓️ [​](https://docs.berachain.com/learn/#what-is-berachain)

[![Berachain.com](https://docs.berachain.com/assets/berachaindotcom.png)](https://berachain.com/)

Berachain is a high-performance [EVM-Identical](https://docs.berachain.com/learn/#berachain-evm-identical-%E2%9F%A0) Layer 1 blockchain utilizing [Proof-of-Liquidity](https://docs.berachain.com/learn/#proof-of-liquidity-%F0%9F%A4%9D) (PoL), and built on top of the modular EVM-focused consensus client framework [BeaconKit](https://docs.berachain.com/learn/#beaconkit-%E2%9B%B5%E2%9C%A8).

## EVM Identical ⟠ [​](https://docs.berachain.com/learn/#evm-identical-%E2%9F%A0)

Berachain's execution layer is identical to the Ethereum Virtual Machine (EVM) runtime environment seen on Ethereum Mainnet. This means that it uses existing unmodified [execution clients](https://docs.berachain.com/learn/help/glossary#execution-client) like Geth, Reth, Erigon, Nethermind, and more to handle executing smart contracts, and supports all the tooling that comes native with the EVM.

Identical means that whenever the EVM is upgraded, Berachain can adopt the latest version—for example, Dencun—straight out of the box. This includes compatibility with all RPC namespaces and endpoints and any improvements made to execution clients could be applied immediately to Berachain.

## Proof-of-Liquidity 🤝 [​](https://docs.berachain.com/learn/#proof-of-liquidity-%F0%9F%A4%9D)

Proof-of-Liquidity radically changes the way L1 economics are structured, prioritizing users and applications over validator rewards at baseline. Network incentives go towards enriching ecosystem liquidity, contributing to efficient trading, price stability, securing the chain, and increasing the network/user growth.

PoL strongly aligns the incentives of [network participants](https://docs.berachain.com/learn/pol/participants) (validators, protocols, users) and contributes to the overall long-term health of the chain.

Beyond providing seamless day-one utility, the native dApps, such as [BeraSwap](https://docs.berachain.com/learn/dapps/beraswap), serve as reference implementations of how developers can build on-top of Proof-of-Liquidity.

Read more in [What Is Proof-of-Liquidity](https://docs.berachain.com/learn/what-is-proof-of-liquidity).

## BeaconKit ⛵✨ [​](https://docs.berachain.com/learn/#beaconkit-%E2%9B%B5%E2%9C%A8)

BeaconKit is a modular framework developed by Berachain for building EVM [consensus clients](https://docs.berachain.com/learn/help/glossary#consensus-client). It integrates the benefits of CometBFT consensus, including increased composability, [single slot finality (SSF)](https://ethereum.org/en/roadmap/single-slot-finality/), and more.

Read more in [What Is BeaconKit](https://docs.berachain.com/learn/what-is-beaconkit).

# What is Proof-of-Liquidity? 🤝 [​](https://docs.berachain.com/learn/what-is-proof-of-liquidity#what-is-proof-of-liquidity-%F0%9F%A4%9D)

Proof-of-Liquidity (PoL) is a novel economic mechanism that uses network incentives to align incentives of ecosystem participants and to bolster application-layer alongside chain security.

## Two Token Model [​](https://docs.berachain.com/learn/what-is-proof-of-liquidity#two-token-model)

Berachain consensus borrows from the Proof-of-Stake (PoS) model, containing two key components:

1. [`$BERA`](https://docs.berachain.com/learn/pol/tokens/bera) \- Validators secure the chain by staking the native gas token
2. [`$BGT`](https://docs.berachain.com/learn/pol/tokens/bgt) \- A soulbound governance token distributed by validators for proposing new blocks, which is ultimately rewarded to users providing ecosystem liquidity (see [Reward Vaults](https://docs.berachain.com/learn/pol/rewardvaults))

A validator's `$BGT` emissions increase with the amount of `$BGT` delegated to them. Protocol-provided [Incentives](https://docs.berachain.com/learn/pol/incentives) are received for these emissions, which validators pass to their delegators after collecting a commission.

This model creates meaningful economic alignment between previously isolated groups. Validators that return the maximum value to their `$BGT` delegators are likely to receive more delegations.

![Proof-of-Liquidity Flywheel](https://docs.berachain.com/assets/proof-of-liquidity-flywheel.png)

### Separation of Concerns [​](https://docs.berachain.com/learn/what-is-proof-of-liquidity#separation-of-concerns)

Significantly, Proof-of-Liquidity separates the token responsible for gas and security from the token used to govern chain rewards/economic incentives.

The following diagram illustrates the role of tokens in Berachain's PoL compared to Ethereum's PoS:

![Proof-of-Stake vs Proof-of-Liquidity](https://docs.berachain.com/assets/berachain-pos-vs-pol.png)

> Read more in [Proof-of-Liquidity Overview](https://docs.berachain.com/learn/pol/)

# What Is BeaconKit ⛵✨ [​](https://docs.berachain.com/learn/what-is-beaconkit#what-is-beaconkit-%E2%9B%B5%E2%9C%A8)

BeaconKit is a modular and customizable consensus layer for Ethereum based blockchains.

[![BeaconKit GitHub Repository](https://docs.berachain.com/assets/beacon-kit-github-repository.png)](https://github.com/berachain/beacon-kit)

> Check out the official [BeaconKit GitHub Repository](https://github.com/berachain/beacon-kit).

BeaconKit is an innovative framework that makes the [CometBFT](https://docs.cometbft.com/v0.38/) consensus algorithm available to arbitrary EVM execution environments. In other words, BeaconKit is a modular [consensus layer](https://docs.berachain.com/learn/help/glossary#consensus-client) adaptable for Ethereum-based blockchains.

BeaconKit packages the CometBFT consensus algorithm with a modular middleware layer capable of receiving blocks from any execution environment conforming to the [Engine API](https://docs.berachain.com/learn/help/glossary#engine-api) specification. This allows for those blocks to be processed through CometBFT consensus. In practice, this enables support for unmodified EVM [execution clients](https://docs.berachain.com/learn/help/glossary#execution-client), to run on top of BeaconKit, allowing chains to be [EVM identical](https://docs.berachain.com/learn/#berachain-evm-identical-%E2%9F%A0).

The framework is built with modularity in mind and can be extended with different layers that may include a custom block builder, a rollup layer, a data availability layer, among others. This modularity enables the building of not only Layer 1 blockchains but also serves as a framework for Layer 2 solutions.

## BeaconKit Advantages [​](https://docs.berachain.com/learn/what-is-beaconkit#beaconkit-advantages)

Running a BeaconKit-based chain provides several advantages (assuming the default configuration of pairing with an EVM execution client):

-   Single slot finality (compared to Ethereum's ~13 minutes)
-   Optimistic payload building (executing block proposal in parallel with voting) reduces block times by up to 40%
-   Conformity to Eth2 modularity
-   Full EIP compatibility

# Berachain Testnet V1 vs V2 🆕 [​](https://docs.berachain.com/learn/testnet/berachain-testnet-v1-vs-v2#berachain-testnet-v1-vs-v2-%F0%9F%86%95)

> On June 9, 2024, Berachain officially launched version 2 of its testnet called `bArtio`.

The Berachain `bArtio` network is a re-architecture of the chain to make it more modular and EVM-aligned. In order to achieve these goals, an entirely new framework was needed and [**BeaconKit**](https://docs.berachain.com/learn/what-is-beaconkit) was born.

V2 is an implementation of the `BeaconKit` framework, which separates the execution and consensus, and focuses on implementing an consensus client that can be paired with any EVM execution client (Ex: Geth, Reth, etc).

## Main Changes from V1 to V2 🐻 [​](https://docs.berachain.com/learn/testnet/berachain-testnet-v1-vs-v2#main-changes-from-v1-to-v2-%F0%9F%90%BB)

Berachain's V1 testnet ( `Artio`) was built on top of [Polaris](https://github.com/berachain/polaris), which tightly coupled EVM execution with the Cosmos SDK and introduced a monolithic framework for building highly optimized precompiles.

Despite this optimization, Cosmos could not handle the volume of transactions that Berachain received, alongside the compatibility challenges that came with precompiles and supporting a forked EVM execution client.

![Polaris vs BeaconKit](https://docs.berachain.com/assets/berachain-polaris-vs-beaconkit.png)

V2 introduced a modular architecture of separating the consensus and execution layer. Compared with V1, where validators would run a single [Polaris](https://github.com/berachain/polaris) client, V2 validators would need to run 2 clients, BeaconKit client (for consensus) alongside any EVM execution client (e.g. Geth, Erigon). This modular approach allows for specialization of concerns - for the execution layer to benefit from EVM innovations, and for BeaconKit to provide a highly customizable and performant consensus layer.

In addition to the technical changes with BeaconKit, the economic design of Berachain's native tokens has evolved. The following table highlights the main changes between V1 and V2:

![Berachain Testnet Comparison - V1 vs V2](https://docs.berachain.com/assets/v1-vs-v2.png)

Some significant points to note:

1. `$BERA` is staked for activating validators, rather than `$BGT`.
2. `$BGT` delegators no longer at risk of slashing.
3. The execution layer is now EVM identical.

# Proof-of-Liquidity Overview 📓 [​](https://docs.berachain.com/learn/pol/#proof-of-liquidity-overview-%F0%9F%93%93)

Proof-of-Liquidity (PoL) is an extension of Proof-of-Stake (PoS) that realigns economic incentives between validators, applications, and users. This is enabled through a two-token model - a token responsible for chain security ( `$BERA`) and a token responsible for governance and rewards ( `$BGT`).

## Core Components [​](https://docs.berachain.com/learn/pol/#core-components)

### Security Layer ($BERA) [​](https://docs.berachain.com/learn/pol/#security-layer-bera)

Berachain's Active Set of validators (validators participating in consensus) is determined by validators' `$BERA` stake, with a minimum of 250,000 `$BERA` and a maximum cap of 10,000,000 ` $BERA`. The top N validators ranked by stake are in the Active Set. Within the Active Set, a validator's probability of proposing a block is proportional to their staked `$BERA` — more `$BERA` staked increases the likelihood of proposing a block.

### Reward Layer ($BGT) [​](https://docs.berachain.com/learn/pol/#reward-layer-bgt)

The size of a validator's `$BGT` block reward is determined by their Boost, which is a percentage calculated from the validator's `$BGT` boost out of the total `$BGT` boosted to all validators. Boosts are obtained from `$BGT` holders delegating to validators.

Learn more about how emissions are calculated on the [emissions page](https://docs.berachain.com/learn/pol/bgtmath).

## PoL Lifecycle [​](https://docs.berachain.com/learn/pol/#pol-lifecycle)

![Berachain Proof-of-Liquidity Steps](https://docs.berachain.com/assets/proof-of-liquidity-steps.png)

### 1\. Validator Lifecycle [​](https://docs.berachain.com/learn/pol/#_1-validator-lifecycle)

The journey begins when a Prospective Validator stakes their `$BERA` as a security bond (①). Validators are chosen to propose blocks with probability proportional to their staked amount (②). For each block proposed, the validator receives both a base emission and a variable reward emission based on their boost percentage (③) (see [emissions](https://docs.berachain.com/learn/pol/bgtmath)).

### 2\. Reward Distribution [​](https://docs.berachain.com/learn/pol/#_2-reward-distribution)

After collecting the base `$BGT` rewards for themselves, validators direct the remaining variable `$BGT` rewards to whitelisted [Reward Vaults](https://docs.berachain.com/learn/pol/rewardvaults) of their choosing (④). In exchange for directing their emissions, validators receive protocol-provided [Incentives](https://docs.berachain.com/learn/pol/incentives) from Reward Vaults (the `$BGT` is earned by users supplying liquidity to the protocol).

### 3\. Liquidity Provider Flow [​](https://docs.berachain.com/learn/pol/#_3-liquidity-provider-flow)

The ecosystem's liquidity providers (i.e. users) play a crucial role in PoL. Users can provide liquidity to protocols like BeraSwap (⑤) and receive receipt tokens as proof of their contribution (⑥). These receipt tokens are then staked in Reward Vaults (⑦), where users earn `$BGT` proportional to their share of the vault (⑧).

### 4\. Delegation Cycle [​](https://docs.berachain.com/learn/pol/#_4-delegation-cycle)

As `$BGT` Holders accumulate tokens, they can delegate them to validators (⑨), directly influencing the validator's boost. This creates a virtuous cycle where higher delegation leads to increased validator boost, resulting in larger `$BGT` emissions when that validator proposes blocks. Validators are incentivized to share their received protocol Incentives with delegators to attract more boosts, fostering a collaborative ecosystem.

## Ecosystem Alignment 🤝 [​](https://docs.berachain.com/learn/pol/#ecosystem-alignment-%F0%9F%A4%9D)

By integrating the Berachain's native network rewards amongst all ecosystem participants, PoL creates alignment between:

-   **Validators**: Need `$BGT` delegation to maximize their block rewards and must efficiently direct emissions to reward vaults to earn Incentives and attract more boost.
-   **Protocols**: Compete for `$BGT` emissions by offering attractive Incentive rates in their reward vaults
-   **Users**: Earn `$BGT` by providing liquidity, then delegate to validators who maximize returns

# Reward Vaults [​](https://docs.berachain.com/learn/pol/vaults#reward-vaults)

Reward Vaults are smart contracts in which users can stake their Proof-of-Liquidity (PoL) eligible assets in order to receive `$BGT` rewards. Reward Vaults are the only way in which anyone can earn `$BGT` rewards, which are the basic building blocks of the PoL ecosystem.

![Reward Vaults](https://docs.berachain.com/assets/reward-vaults.png)

## User Interactions [​](https://docs.berachain.com/learn/pol/vaults#user-interactions)

The amount of `$BGT` rewards a user earns from Reward Vaults is a function of:

1. The user's share of total assets staked in the vault
2. The amount of `$BGT` rewards emitted to the vault

After staking assets in a Reward Vault, users are free to claim the earned rewards as soon as they are distributed to the vault, add to their existing deposits, or withdraw their assets whenever they wish.

`$BGT` farming with Reward Vaults is meant to resemble familiar DeFi actions, providing a low barrier to entry for regular users.

## How $BGT Ends up in Reward Vaults [​](https://docs.berachain.com/learn/pol/vaults#how-bgt-ends-up-in-reward-vaults)

Validators choose to direct some portion of their `$BGT` emissions to specific Reward Vaults.

To understand why validators would choose to emit `$BGT` to a particular Reward Vault over another, refer to [Incentives in PoL](https://docs.berachain.com/learn/pol/incentives), which discusses how protocols can influence validator behaviour with economic incentives.

## Creation of New Reward Vaults [​](https://docs.berachain.com/learn/pol/vaults#creation-of-new-reward-vaults)

New Reward Vaults are created through the _Reward Vault Whitelisting_ process, conducted with `$BGT` via governance proposals. Developers or protocols can submit a proposal to create a new Reward Vault for a specific eligible asset. If the proposal passes, the new Reward Vault is created and added to the list of approved Reward Vaults that validators can direct `$BGT` emissions to.

# Berachain Tokenomics [​](https://docs.berachain.com/learn/pol/tokens/tokenomics#berachain-tokenomics)

## Overview [​](https://docs.berachain.com/learn/pol/tokens/tokenomics#overview)

| Property                | Details                                                  |
| ----------------------- | -------------------------------------------------------- |
| Token Name              | BERA                                                     |
| Total Supply at Genesis | 500,000,000 BERA                                         |
| Inflation Schedule      | ~10% annually (via BGT emissions), subject to governance |
| Decimals                | 18                                                       |

`$BERA` serves as the native gas and staking token of Berachain, the first blockchain powered by Proof-of-Liquidity, whilst `$BGT` facilitates governance and economic incentives.

[Learn more about BERA's role in the network](https://docs.berachain.com/learn/pol/tokens/bera).

## Distribution and Allocation [​](https://docs.berachain.com/learn/pol/tokens/tokenomics#distribution-and-allocation)

The total genesis supply of 500 million `$BERA` is allocated across five categories:

![BERA Allocation](https://docs.berachain.com/assets/bera-allocation.png)

#### Initial Core Contributors - 84,000,000 (16.8%) [​](https://docs.berachain.com/learn/pol/tokens/tokenomics#initial-core-contributors-84-000-000-16-8)

Tokens distributed to advisors and members of Big Bera Labs, the core contributors to the Berachain blockchain.

#### Investors - 171,500,000 (34.3%) [​](https://docs.berachain.com/learn/pol/tokens/tokenomics#investors-171-500-000-34-3)

Tokens distributed to Berachain’s Seed, Series A and Series B investors.

#### Community Allocations [​](https://docs.berachain.com/learn/pol/tokens/tokenomics#community-allocations)

Berachain's growth to date is largely driven by an unparalleled community and a massive developer ecosystem leveraging Proof of Liquidity to power the next generation of applications. The community allocation ( **244,500,000** `$BERA` total, or 48.9% of supply) is broken down across three key areas:

##### Airdrop - 79,000,000 (15.8%) [​](https://docs.berachain.com/learn/pol/tokens/tokenomics#airdrop-79-000-000-15-8)

15.8% of Berachain's token supply will be distributed through airdrops, recognizing a variety of parties within the Berachain ecosystem, including testnet users, Berachain NFT holders, ecosystem NFT holders, social supporters, ecosystem dApps, community builders and more. For more information on the airdrop breakdown, please visit the [Blog](https://blog.berachain.com/blog/berachain-airdrop-overview).

##### Future Community Initiatives - 65,500,000 (13.1%) [​](https://docs.berachain.com/learn/pol/tokens/tokenomics#future-community-initiatives-65-500-000-13-1)

13.1% of Berachain's token supply will be dedicated to applications, developers and users through incentive programs, grants and more, with input from the community itself via Snapshots, RFPs etc.

##### Ecosystem & R&D - 100,000,000 (20%) [​](https://docs.berachain.com/learn/pol/tokens/tokenomics#ecosystem-r-d-100-000-000-20)

20% of Berachain's token supply will be used to support ecosystem development, R&D, growth initiatives, and the operations of the Berachain Foundation. This will largely focus on programs for developers and builders (see [Boyco](https://boyco.berachain.com/)), node operator delegations, and evolutions of Proof-of-Liquidity and BeaconKit.

_At launch, 9.5% of `$BERA` supply is unlocked from this bucket for ecosystem growth, developer tooling / infrastructure, liquidity provisioning and more._
