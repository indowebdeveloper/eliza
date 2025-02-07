[Skip to content](https://docs.berachain.com/#VPContent)

![Berachain Docs](https://docs.berachain.com/DocsBear.png)

![](https://docs.berachain.com/assets/berachain-icon.svg)

# Berachain Docs

Learn, integrate, and build on a new modular EVM with Berachain.

[**Learn About Berachain** \\
Understand the fundamentals of the Berachain protocol](https://docs.berachain.com/learn/) [**Developers** \\
Get up and running and building with Berachain](https://docs.berachain.com/developers/) [**Run a Node** \\
Setup and configure a validator, rpc, and more](https://docs.berachain.com/nodes/)

## More Berachain Docs [​](https://docs.berachain.com/#more-berachain-docs)

[![](https://docs.berachain.com/assets/BEX.png)**BeraSwap Docs** \\
Berachain Native DEX Docs](https://docs.swap.berachain.com/)

## Other Berachain Resources [​](https://docs.berachain.com/#other-berachain-resources)

[**BeaconKit** \\
BeaconKit Repo](https://github.com/berachain/beacon-kit) [**Berascan** \\
Block Explorer](https://beratrail.io/) [**Faucet** \\
Get Testnet Tokens](https://bartio.faucet.berachain.com/) [**Bera Hub** \\
Manage $BGT](https://hub.berachain.com/) [**BeraSwap** \\
Berachain Native DEX](https://hub.berachain.com/swap) [**Honey Swap** \\
Berachain $HONEY Swapping](https://honey.berachain.com/) [**Berachain Foundation** \\
Main Foundation Website](https://www.berachain.com/)

# Berachain Node Architecture Overview 📓 [​](https://docs.berachain.com/nodes/#berachain-node-architecture-overview-%F0%9F%93%93)

Berachain's network relies on validator nodes and RPC nodes. Each can be configured as a full node or archive node.

Each of these types of nodes are a a pair of both an [execution client](https://docs.berachain.com/learn/help/glossary#execution-client) and a [consensus client](https://docs.berachain.com/learn/help/glossary#consensus-client). Berachain is a Layer 1 EVM Identical chain, which means that for the execution layer it supports any EVM execution client, which is paired with a consensus client and framework built by Berachain called [BeaconKit](https://docs.berachain.com/nodes/beaconkit-consensus).

![Berachain Node Architecture](https://docs.berachain.com/assets/berachain-node-architecture.png)

# Berachain Run A Node Quickstart ⚡ [​](https://docs.berachain.com/nodes/quickstart#berachain-run-a-node-quickstart-%E2%9A%A1)

This will walk you through on setting up a mainnet full node with `beacond` consensus client and a `reth` execution client.

## Requirements ⚙️ [​](https://docs.berachain.com/nodes/quickstart#requirements-%E2%9A%99%EF%B8%8F)

The following requirements are needed to run both the execution and consensus client.

-   **OS**: Linux AMD64, Linux ARM64, MacOS ARM64
-   **CPU**: 8 Physical Cores
-   **RAM**: 48GB
-   **Storage**: 4TB (SSD with high IOPS)

Ensure you have have [Golang](https://go.dev/dl/) v1.22.0 or greater installed. Recommend to install to `/opt/go/` and add `/opt/go/bin` to your PATH.

## Getting ready [​](https://docs.berachain.com/nodes/quickstart#getting-ready)

Make an area to work in:

bash

```
# FROM: $HOME

mkdir quickstart
cd quickstart
```

Create a file called `env.sh` and add the following:

env.sh

```
#!/bin/sh

# CHANGE THESE TWO VALUES
export MONIKER_NAME=camembera
export WALLET_ADDRESS_FEE_RECIPIENT=0x9BcaA41DC32627776b1A4D714Eef627E640b3EF5

# CHAIN CONSTANTS
export CHAIN=mainnet-beacon-80094
export SEED_DATA_URL=https://raw.githubusercontent.com/berachain/beacon-kit/refs/heads/main/testing/networks/80094

# THESE DEPEND ON YOUR LOCAL SETUP
export BEACOND_BIN=$(pwd)/beacond
export BEACOND_DATA=$(pwd)/var/beacond
export BEACOND_CONFIG=$(pwd)/var/beacond/config

export EL_AUTHRPC_PORT=8551
export RPC_DIAL_URL=http://localhost:$EL_AUTHRPC_PORT
export JWT_PATH=$BEACOND_CONFIG/jwt.hex

export RETH_BIN=$(pwd)/reth
export RETH_DATA=$(pwd)/var/reth
export RETH_GENESIS_PATH=$RETH_DATA/genesis.json

export LOG_DIR=$(pwd)/var/log/

# Create required directories
mkdir -p "$BEACOND_DATA"
mkdir -p "$BEACOND_CONFIG"
mkdir -p "$RETH_DATA"
mkdir -p "$LOG_DIR"

# Check executables exist and are executable
if [ ! -x "$BEACOND_BIN" ]; then
    echo "Error: $BEACOND_BIN does not exist or is not executable"
    exit 1
fi

if [ ! -x "$RETH_BIN" ]; then
    echo "Error: $RETH_BIN does not exist or is not executable"
    exit 1
fi
```

These two constants should be changed:

1. **MONIKER_NAME**: Should be a name of your choice for your node. This is a name presented on the chain to other nodes and is useful for debugging.
2. **WALLET_ADDRESS_FEE_RECIPIENT**: This is the address that will receive the priority fees for blocks sealed by your node.

The following constants should be checked:

-   **BEACOND_BIN** should be the full path to where you placed `beacond`. The value shown above would be used if you placed `beacond` in the `quickstart` directory.
-   **RETH_BIN** should be the full path to where you placed `reth`. The value shown above would be used if you placed `reth` in the `quickstart` directory.
-   **BEACOND_DATA** and **BEACOND_CONFIG** are the directories for the database and configuration files for the consensus client.
-   **RPC_DIAL_URL** is the URL of the execution client. If you choose to arrange beacond and reth to run on different machines, you will need to change this value to the RPC URL of reth.
-   **LOG_DIR** is the directory for the log files, and should be set up with log rotation when in production.

Test env.sh to make sure it works:

bash

```
# FROM: ~/quickstart

source env.sh
env

# [Expected Output]:
# BEACOND_BIN=/Users/camembera/quickstart/beacond
# BEACOND_DATA=/Users/camembera/quickstart/var/beacond
# BEACOND_CONFIG=/Users/camembera/quickstart/var/beacond/config
# RPC_DIAL_URL=http://localhost:8551
# JWT_PATH=/Users/camembera/quickstart/var/beacond/config/jwt.hex
# RETH_BIN=/Users/camembera/quickstart/reth
# RETH_DATA=/Users/camembera/quickstart/var/reth
...
```

## Fetch genesis, bootnodes, etc [​](https://docs.berachain.com/nodes/quickstart#fetch-genesis-bootnodes-etc)

The key network parameters for Berachain mainnet are downloaded by the following script. Note the above env.sh defines `SEED_DATA_URL` to point to the `ooga-booga` repo.

If you prefer, you can check out `https://github.com/berachain/ooga-booga.git` into the `quickstart` directory, and the script will copy the files from there instead.

fetch-berachain-params.sh

```
#!/bin/bash

set -e
. ./env.sh

mkdir -p seed-data
if [ -z "$SEED_DATA_URL" ]; then
    cp -r ooga-booga/80094/* seed-data/
else
    mkdir -p seed-data
    curl -s -o seed-data/kzg-trusted-setup.json $SEED_DATA_URL/kzg-trusted-setup.json$SEED_DATA_URL_SUFFIX
    curl -s -o seed-data/genesis.json $SEED_DATA_URL/genesis.json$SEED_DATA_URL_SUFFIX
    curl -s -o seed-data/eth-genesis.json $SEED_DATA_URL/eth-genesis.json$SEED_DATA_URL_SUFFIX
    curl -s -o seed-data/el-peers.txt $SEED_DATA_URL/el-peers.txt$SEED_DATA_URL_SUFFIX
    curl -s -o seed-data/app.toml $SEED_DATA_URL/app.toml$SEED_DATA_URL_SUFFIX
    curl -s -o seed-data/config.toml $SEED_DATA_URL/config.toml
fi

md5sum seed-data/*
```

You can invoke the script as follows. It will print out an md5 hash of the files to verify integrity.

bash

```
# FROM: ~/quickstart

./fetch-berachain-params.sh

# [Expected Output]:
# 6e4179e38e11696f8402cd5f8e872726  seed-data/app.toml
# 1021d186aae506482deb760e63143ae6  seed-data/config.toml
# 3caf21bb2134ed4c1970c904d2128d30  seed-data/el-peers.txt
# cd3a642dc78823aea8d80d5239231557  seed-data/eth-genesis.json
# c66dbea5ee3889e1d0a11f856f1ab9f0  seed-data/genesis.json
# 5d0d482758117af8dfc20e1d52c31eef  seed-data/kzg-trusted-setup.json
```

Check the signatures above with your results, and contact Discord: #bug-reports or your Validator Relations contact if you have a mismatch.

## Set up the consensus client [​](https://docs.berachain.com/nodes/quickstart#set-up-the-consensus-client)

The script puts in place the seed data for the chain downloaded above, and updates the configuration files for the consensus client to refer to certain paths correctly, then runs runs `beacond init` and `beacond jwt generate`.

setup-beacond.sh

```
#!/bin/bash

set -e
. ./env.sh
mkdir -p $BEACOND_DATA
mkdir -p $BEACOND_CONFIG

if [ -f "$BEACOND_CONFIG/priv_validator_key.json" ]; then
    echo "Error: $BEACOND_CONFIG/priv_validator_key.json already exists"
    exit 1
fi

$BEACOND_BIN init $MONIKER_NAME --chain-id $CHAIN --home $BEACOND_DATA

cp seed-data/genesis.json $BEACOND_CONFIG/genesis.json
cp seed-data/kzg-trusted-setup.json $BEACOND_CONFIG/kzg-trusted-setup.json
cp seed-data/app.toml $BEACOND_CONFIG/app.toml
cp seed-data/config.toml $BEACOND_CONFIG/config.toml

# choose sed options based on OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    SED_OPT="-i ''"
else
    SED_OPT='-i'
fi

sed $SED_OPT 's|^moniker = ".*"|moniker = "'$MONIKER_NAME'"|' $BEACOND_CONFIG/config.toml
sed $SED_OPT 's|^rpc-dial-url = ".*"|rpc-dial-url = "'$RPC_DIAL_URL'"|' $BEACOND_CONFIG/app.toml
sed $SED_OPT 's|^jwt-secret-path = ".*"|jwt-secret-path = "'$JWT_PATH'"|' $BEACOND_CONFIG/app.toml
sed $SED_OPT 's|^trusted-setup-path = ".*"|trusted-setup-path = "'$BEACOND_CONFIG/kzg-trusted-setup.json'"|' $BEACOND_CONFIG/app.toml
sed $SED_OPT 's|^suggested-fee-recipient = ".*"|suggested-fee-recipient = "'$WALLET_ADDRESS_FEE_RECIPIENT'"|' $BEACOND_CONFIG/app.toml

$BEACOND_BIN jwt generate -o $JWT_PATH
```

The key result of `beacond init` is the file `var/beacond/config/priv_validator_key.json`. This contains your node's private key, and _especially if you intend to become a validator_, this file should be kept safe. It cannot be regenerated, and losing it means you will not be able to participate in the consensus process.

The other important file generated is `var/beacond/config/jwt.hex`. This contains a secret shared between the consensus client and the execution client so they can securely communicate. Protect this file. If you suspect it has been leaked, generate a new one with `beacond jwt generate -o $JWT_PATH`.

Invoke the script:

bash

```
# FROM: ~/quickstart

./setup-beacond.sh

# [Expected Output]:
# {
#  "moniker": "<your moniker here>",
#  "chain_id": "mainnet-beacon-80094",
#  "stateRoot": "0x12965ab9cbe2d2203f61d23636eb7e998f167cb79d02e452f532535641e35bcc",
#  "blockHash": "0xcfff92cd918a186029a847b59aca4f83d3941df5946b06bca8de0861fc5d0850",
# }
# Successfully wrote new JSON-RPC authentication secret to: /Users/somebody/quickstart/var/beacond/config/jwt.hex

find var/beacond

# [Expected Output]:
# var/beacond
# var/beacond/config
# var/beacond/config/config.toml
# var/beacond/config/genesis.json
# var/beacond/config/priv_validator_key.json
# var/beacond/config/app.toml
# var/beacond/config/client.toml
# var/beacond/config/node_key.json
# var/beacond/config/kzg-trusted-setup.json
# var/beacond/config/jwt.hex
# var/beacond/config/app.toml
# var/beacond/config/config.toml
# var/beacond/data
# var/beacond/data/priv_validator_state.json
```

Your state root and block hash **must** agree with the above.

## Set up the execution client [​](https://docs.berachain.com/nodes/quickstart#set-up-the-execution-client)

Create the following script:

setup-reth.sh

```
#!/bin/bash

set -
. ./env.sh
mkdir -p $RETH_DATA

cp seed-data/eth-genesis.json $RETH_GENESIS_PATH
$RETH_BIN init --chain $RETH_GENESIS_PATH --datadir $RETH_DATA
```

Similar to the consensus client, the script puts in place the seed data for the chain downloaded above, and initializes the reth data store in `var/reth/`. Invoke the script:

bash

```
# FROM: ~/quickstart

./setup-reth.sh

# [Expected Output]:
# INFO Initialized tracing, debug log directory: /Users/camembearbera/Library/Caches/reth/logs/80094
# INFO reth init starting
# INFO Opening storage db_path="/Users/camembearbera/src/bera-quickstart/var/reth/db" sf_path="/Users/camembearbera/src/bera-quickstart/var/reth/static_files"
# INFO Verifying storage consistency.
# INFO Genesis block written hash=0xd57819422128da1c44339fc7956662378c17e2213e669b427ac91cd11dfcfb38

find var/beacond

find var/reth
# var/reth
# var/reth/genesis.json
# var/reth/reth.toml
# var/reth/static_files
# var/reth/static_files/static_file_receipts_0_499999.off
# var/reth/static_files/static_file_transactions_0_499999.conf
# var/reth/static_files/static_file_headers_0_499999.conf
# var/reth/static_files/static_file_transactions_0_499999.off
# var/reth/static_files/static_file_receipts_0_499999
# var/reth/static_files/static_file_receipts_0_499999.conf
# var/reth/static_files/static_file_headers_0_499999.off
# var/reth/static_files/static_file_transactions_0_499999
# var/reth/static_files/static_file_headers_0_499999
# var/reth/db
# var/reth/db/mdbx.dat
# var/reth/db/database.version
# var/reth/db/mdbx.lck
```

Your genesis block hash **must** agree with the above.

## Optional: Download snapshots [​](https://docs.berachain.com/nodes/quickstart#optional-download-snapshots)

Though you can choose to sync the chain from scratch, it will take a while. Check out our [list of community-supplied snapshots](https://github.com/berachain/beacon-kit/blob/main/testing/networks/80094/snapshots.md).

Carefully place the snapshots files under `var/beacond/data` and `var/reth/data` respectively.

## Run both clients [​](https://docs.berachain.com/nodes/quickstart#run-both-clients)

The following two scripts run the consensus and execution clients.

run-beacond.sh

```
#!/bin/bash

set -e
. ./env.sh
$BEACOND_BIN start --home $BEACOND_DATA
```

run-reth.sh

```
#!/bin/bash

set -e
. ./env.sh

if [ -f "seed-data/el-bootnodes.txt" ]; then
    export EL_SEEDS=$(grep '^enode://' "seed-data/el-bootnodes.txt"| tr '\n' ',' | sed 's/,$//')
fi
if [ -f "seed-data/el-peers.txt" ]; then
    export EL_PEERS=$(grep '^enode://' "seed-data/el-peers.txt"| tr '\n' ',' | sed 's/,$//')
fi

$RETH_BIN node \
--authrpc.jwtsecret=$JWT_PATH \
--chain=$RETH_GENESIS_PATH \
--datadir=$RETH_DATA \
--port=30303 \
--http \
--http.addr=0.0.0.0 \
--http.port=8545 \
--http.corsdomain="*" \
--bootnodes=$EL_PEERS \
--trusted-peers=$EL_PEERS \
--ws \
--ws.addr=0.0.0.0 \
--ws.port=8546 \
--ws.origins="*" \
--authrpc.addr=0.0.0.0 \
--authrpc.port=$EL_AUTHRPC_PORT \
--log.file.directory=$LOG_DIR ;
```

Launch two windows. In the first, run the consensus client:

bash

```
# FROM: ~/quickstart

./run-beacond.sh
```

In the second, run the execution client:

bash

```
# FROM: ~/quickstart

./run-reth.sh
```

Initially this will not appear to respond, but within a minute blocks should begin flowing. There should be no significant quantity of error messages, except for minor complaints about disconnecting or slow peers from time to time.

## Testing your node [​](https://docs.berachain.com/nodes/quickstart#testing-your-node)

### Check Sync Status 🔄 [​](https://docs.berachain.com/nodes/quickstart#check-sync-status-%F0%9F%94%84)

To check on the sync status of the consensus layer, in another terminal run the following which will retrieve the current block height from the consensus client:

bash

```
# FROM: ~/quickstart

# Don't have jq? `brew install jq`;
./build/bin/beacond --home=./build/bin/config/beacond status | jq;

# [Expected Output]:
# {
#   "node_info": {...
#   },
#   "sync_info": {
#     "latest_block_hash": "A72E1C5BD31B0E14604BB6DBA5A313F5B17F78FEE482453D9ED703E49D0C059B",
#     "latest_app_hash": "FC649179895650C9B6EB4320A096F46D8882CAD3AAFEE1B0D997B338BDF31618",
#     "latest_block_height": "1126228",<---- CURRENT NETWORK BLOCK
#     "latest_block_time": "2024-07-05T03:50:15.349853738Z",
#     "earliest_block_hash": "F10DEBCEF3E370F813E93BD8BBFA3DAC0392E6C3E9A8A63871E932ACDE44EE1F",
#     "earliest_app_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
#     "earliest_block_height": "1",
#     "earliest_block_time": "2024-06-05T14:00:00Z",
#     "catching_up": false<---- IF `true` = STILL SYNCING
#   },
#   "validator_info": {
#     "address": "74F0F7AC6C37306E765487F8C43F01059EE28391",
#     "pub_key": {
#       "type": "cometbft/PubKeyBls12_381",
#       "value": "i/z8e0Fz1+EiW1YGe9wdqCuAM9sny3r8s4gpjLlDHGFQfv36Vffq/+KoCJKuGRT8"
#     },
#     "voting_power": "0"
#   }
# }
```

If `catching_up` is set to `true`, it is still syncing.

### Testing Local RPC Node ✅ [​](https://docs.berachain.com/nodes/quickstart#testing-local-rpc-node-%E2%9C%85)

Now that we have our RPC running, let's go through a few steps to verify that the network is working currently but performing a few RPC requests.

TIP

Make sure that your node is fully synced before proceeding with these steps.

### Get current execution block number [​](https://docs.berachain.com/nodes/quickstart#get-current-execution-block-number)

bash

```
curl --location 'http://localhost:8545' \
--header 'Content-Type: application/json' \
--data '{
	"jsonrpc":"2.0",
	"method":"eth_blockNumber",
	"params":[],
	"id":83
}';

# [Expected Output]:
# {
#     "jsonrpc": "2.0",
#     "result": "0xfae90",<---- compare with block explorer
#     "id": 83
# }
```

### Get Current Consensus Block Number [​](https://docs.berachain.com/nodes/quickstart#get-current-consensus-block-number)

bash

```
curl -s http://localhost:26657/status | jq '.result.sync_info.latest_block_height';

# [Expected Output]:
# 1653733
```

## Followup steps [​](https://docs.berachain.com/nodes/quickstart#followup-steps)

Particularly if you are a validator, consult the guide to [Becoming an Awesome Validator](https://github.com/chuck-bear/awesome-berachain-validators/tree/main).

1. Cause your operating system's startup process to launch beacond and reth at boot.

2. Monitor your node's disk space, memory consumption, and service availability. You can add `--metrics=<ip>:6060` to the reth invocation to enable prometheus metrics collection. Specify an internal IP address accessible only to your prometheus server, or ensure this port is firewalled off from the internet.

3. If you're hosting this for a dapp of your own, you will want to modify the CORS origins ("\*") set on reth.

# Run A Validator Node On Berachain [​](https://docs.berachain.com/nodes/guides/validator#run-a-validator-node-on-berachain)

This guide will walk you through the process of running a validator node on Berachain.

## Requirements [​](https://docs.berachain.com/nodes/guides/validator#requirements)

-   Run Full Node & Fully Synced - See [Quickstart](https://docs.berachain.com/nodes/quickstart)
-   [Foundry](https://book.getfoundry.sh/getting-started/installation)
-   Berachain Wallet Address with a minimum of 250,000 $BERA (or the current minimum to meet the Active Set) + gas to process the transaction

## Becoming A Validator [​](https://docs.berachain.com/nodes/guides/validator#becoming-a-validator)

These are the steps to perform to become a validator.

WARNING

You must have a node that is fully synced prior to running these steps.

### Step 1 - Configuration File [​](https://docs.berachain.com/nodes/guides/validator#step-1-configuration-file)

Create a configuration file with a set of environment variables.

bash

```
# FROM: / (The same directory as your `beacond` binary)

touch env;
```

Replace the correct values in this new `env` file.

**File:** `./env`

bash

````
# Wallet Configuration
YOUR_ETH_WALLET_PRIVATE_KEY="<YOUR_ETH_WALLET_PRIVATE_KEY>"

# BeaconKit Configuration - Example `$HOME/.beacond` or `/.beacond`
YOUR_BEACOND_HOME_DIR="<YOUR_BEACOND_HOME_DIRECTORY>"

# Your RPC URL - typically localhost if in the same instance / environment
YOUR_ETH_RPC_URL="http://localhost:8545"

# Wallet address - Can be the same from private key
YOUR_VALIDATOR_OPERATOR_ADDRESS="<0xYOUR_ETH_WALLET_ADDRESS>"

# This can be the same as your wallet address for the VALIDATOR_OPERATOR_ADDRESS
YOUR_VALIDATOR_WITHDRAW_CRED_ADDRESS="<0xYOUR_VALIDATOR_WITHDRAW_CRED_ADDRESS>"

# Genesis Configurations - DO NOT CHANGE THESE
GENESIS_VALIDATORS_ROOT="0x053397d1ddb01f3910e91ef762070a075e4b17ba3472c3c4dd391a68bd5d95a1"
GENESIS_FORK_VERSION="0x04000000"
VAL_DEPOSIT_GWEI_AMOUNT=32000000000 # Adjust this amount to be the minimum amount of $BERA mentioned in Requirements
DEPOSIT_CONTRACT_ADDRESS="0x4242424242424242424242424242424242424242"

# Validator Configuration - DO NOT CHANGE THESE
OUTPUT=$(./beacond deposit create-validator $YOUR_VALIDATOR_WITHDRAW_CRED_ADDRESS $VAL_DEPOSIT_GWEI_AMOUNT $GENESIS_FORK_VERSION $GENESIS_VALIDATORS_ROOT --home $YOUR_BEACOND_HOME_DIR);
VAL_PUB_KEY=$(echo "$OUTPUT" | awk -F'pubkey=' '{print $2}' | awk '{print $1}' |
 sed -r 's/\x1B\[[0-9;]*[mK]//g');\
SEND_DEPOSIT_SIGNATURE=$(echo "$output" | awk -F'signature=' '{print $2}' | awk '{print $1}' | sed -r 's/\x1B\[[0-9;]*[mK]//g');\
VAL_WITHDRAW_CREDENTIAL=$(echo "$OUTPUT" | awk -F'credentials=' '{print $2}' | awk '{print $1}' | sed -r 's/\x1B\[[0-9;]*[mK]//g');\
```\
\
### Step 2 - Perform Deposit To Become Active Validator [​](https://docs.berachain.com/nodes/guides/validator\#step-2-perform-deposit-to-become-active-validator)\
\
bash\
\
```\
# FROM: / (The same directory as your `beacond` binary)\
\
# Load values into environment variables\
source env;\
\
# Perform deposit\
cast send "$DEPOSIT_CONTRACT_ADDRESS" \\
'deposit(bytes,bytes,bytes,address)' \\
"$VAL_PUB_KEY" \\
"$VAL_WITHDRAW_CREDENTIAL" \\
"$SEND_DEPOSIT_SIGNATURE" \\
"$YOUR_VALIDATOR_OPERATOR_ADDRESS" \\
--private-key "$YOUR_ETH_WALLET_PRIVATE_KEY" \\
--value 32ether \\
-r $YOUR_ETH_RPC_URL;\
\
# [Expected Successful Output]:\
# blockHash               0xf70...\
# blockNumber             1542...\
# contractAddress\
# cumulativeGasUsed       1817228\
# effectiveGasPrice       5247018757\
# from                    0xYOUR_VALIDATOR_OPERATOR_ADDRESS\
# gasUsed                 69241\
# logs                    [{"address":"0x4242424242424242424242424242424242424242","topics":\
# # ...\
# root\
# status                  1 (success)\
# transactionHash         0x...\
# transactionIndex        4\
# type                    2\
# blobGasPrice\
# blobGasUsed\
# authorizationList\
# to                      0x4242424242424242424242424242424242424242\
```\
\
You can double check that your validator has become an operator by running the following command:\
\
bash\
\
```\
# FROM: /\
\
cast call 0x4242424242424242424242424242424242424242 "getOperator(bytes calldata pubkey)" "$VAL_PUB_KEY" --rpc-url $YOUR_BERA_RPC_URL;\
\
# [Expected Similar Output]:\
# 0xYOUR_VALIDATOR_OPERATOR_ADDRESS\
```\
\
Additionally, monitor your validator operator address to see $BGT that has been accrued.\
\
## Steps After Becoming A Validator [​](https://docs.berachain.com/nodes/guides/validator\#steps-after-becoming-a-validator)\
\
Perform the following steps after becoming a validator.\
\
### Step 1 - Add To Default Validator List [​](https://docs.berachain.com/nodes/guides/validator\#step-1-add-to-default-validator-list)\
\
Make a PR to the following Github repository to add your validator to the default validator list.\
\
[https://github.com/berachain/default-lists](https://github.com/berachain/default-lists)\
\
json\
\
```\
{\
  "id": "<YOUR_VALIDATOR_PUBKEY>",\
  "logoURI": "<PNG_OR_JPG_URL_OF_YOUR_VALIDATOR>",\
  "name": "<VALIDATOR_NAME>",\
  "description": "<VALIDATOR_DESCRIPTION>",\
  "website": "<VALIDATOR_WEBSITE_URL>",\
  "twitter": "<VALIDATOR_TWITTER_URL>"\
}\
```\
\
### Step 2 - Send Berachain Team Wallet Addresses [​](https://docs.berachain.com/nodes/guides/validator\#step-2-send-berachain-team-wallet-addresses)\
\
Reach out to the Berachain team with your `YOUR_VALIDATOR_OPERATOR_ADDRESS` and `YOUR_VALIDATOR_WITHDRAW_CRED_ADDRESS` to aid with better metrics.\
\
### Step 3 - Send Berachain Your CometBFT Address [​](https://docs.berachain.com/nodes/guides/validator\#step-3-send-berachain-your-cometbft-address)\
\
Reach out to the Berachain team with your CometBFT address found in your `priv_validator_key.json` file.\
\
This is the 40 character address found in your `priv_validator_key.json` file.\
\
You can get this by looking at the file or running the following:\
\
bash\
\
```\
# FROM: /\
\
# OR /path/to/$HOME/config/priv_validator_key.json\
cat ./.beacond/config/priv_validator_key.json | jq -r ".address";\
\
# [Expected Similat Address]\
# A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0\
````

# Restoring Berachain Nodes from Snapshots [​](https://docs.berachain.com/nodes/guides/snapshots#restoring-berachain-nodes-from-snapshots)

This guide will walk you through the process of using node snapshots to quickly restore a node.

## Snapshot Providers [​](https://docs.berachain.com/nodes/guides/snapshots#snapshot-providers)

Snapshots are provided and managed by the community.

You can find the [latest snapshots for Berachain here](https://github.com/berachain/beacon-kit/blob/main/testing/networks/80094/snapshots.md). Instructions for restoring Berachain Foundation snapshots are available below.

## What are Node Snapshots? [​](https://docs.berachain.com/nodes/guides/snapshots#what-are-node-snapshots)

Snapshots are a way to quickly restore a node without having to re-sync the entire chain from scratch. Without them, the node would have to start from the genesis block and download every single block from the network. Instead, snapshots can save days or even weeks of syncing time.

That being said, snapshots will always require some syncing time as they are only a copy of the chain at a specific point in time. Make sure to always check the snapshot's timestamp to ensure it is recent enough to be useful.

## How can Snapshots differ? [​](https://docs.berachain.com/nodes/guides/snapshots#how-can-snapshots-differ)

### Different Client Types [​](https://docs.berachain.com/nodes/guides/snapshots#different-client-types)

In the case of Berachain, snapshots can be found for both the Consensus Client and the Execution Client. Only the Consensus Client snapshot is required to run a node, as the Execution Client can rebuild the chain history from its paired Consensus Client, but, when available, the Execution Client snapshot is recommended to skip the rebuilding process & reduce the amount of time syncing.

#### Consensus Client Snapshots [​](https://docs.berachain.com/nodes/guides/snapshots#consensus-client-snapshots)

**Consensus Database**

On Beacon-Kit, it's possible to run your node with different databases. The default is `pebbledb`, but it's also possible to use others (the full list can be found in the [config.toml](https://github.com/berachain/beacon-kit/blob/main/testing/networks/80094/app.toml) file after you initialize your client with beacond).

#### Execution Client Snapshots [​](https://docs.berachain.com/nodes/guides/snapshots#execution-client-snapshots)

**Chosen Execution Client**

Each [Execution Client](https://docs.berachain.com/learn/help/glossary#execution-client) saves their data differently, so it's important to make sure the snapshot you are using was made with the same Execution Client as your node. Remember, if you can't find a snapshot for your Execution Client, you can always sync your execution client from the paired Consensus Client.

### Different Snapshot Size Types [​](https://docs.berachain.com/nodes/guides/snapshots#different-snapshot-size-types)

There are two types of snapshot sizes:

| Snapshot Type | History              | Size  | Benefits                       |
| ------------- | -------------------- | ----- | ------------------------------ |
| **Archive**   | Entire chain history | Large | Historical queries             |
| **Pruned**    | Most recent blocks   | Small | Quick syncs & validating chain |

## How To Import Node Snapshots [​](https://docs.berachain.com/nodes/guides/snapshots#how-to-import-node-snapshots)

Different snapshot providers may have different instructions for using their snapshots, however, here we provide an overview for how to use snapshots from the Berachain Foundation.

### Step 1 - Download Snapshots [​](https://docs.berachain.com/nodes/guides/snapshots#step-1-download-snapshots)

Select which beacon client snapshot, based on your region and preferred snapshot type, you would like to use from the Berachain Foundation. The following options are available:

| Region            | Snapshot Type    | Link                                                                 |
| ----------------- | ---------------- | -------------------------------------------------------------------- |
| **North America** | Archive / Pruned | [Link](https://storage.googleapis.com/bartio-snapshot/index.html)    |
| **Europe**        | Archive / Pruned | [Link](https://storage.googleapis.com/bartio-snapshot-eu/index.html) |
| **Asia**          | Archive / Pruned | [Link](https://storage.googleapis.com/bartio-snapshot-as/index.html) |

#### Step 1A - Downloading Beacon Client Snapshot [​](https://docs.berachain.com/nodes/guides/snapshots#step-1a-downloading-beacon-client-snapshot)

In the snapshot folder, you will find beacon snapshots under the following paths:

-   `beacon/pruned/`
-   `beacon/full/`

Download the snapshot you would like to use with the following command:

bash

```
# $SNAPSHOT_URL example: https://storage.googleapis.com/bartio-snapshot/beacon/full/snapshot_beacond_full_20240913200045.tar.lz4
wget $SNAPSHOT_URL;
```

Where `$SNAPSHOT_URL` is the URL of the snapshot you would like to download.

INFO

`curl`, `aria2c` and other downloaders also work if you prefer to use them for downloading the snapshot.

#### Step 1B - Downloading Execution Client Snapshot [​](https://docs.berachain.com/nodes/guides/snapshots#step-1b-downloading-execution-client-snapshot)

In the snapshot folder, you will find execution snapshots under the following paths:

-   `exec/geth/pruned/`
-   `exec/geth/archive/`
-   etc... for each execution client

INFO

Execution client snapshots coming soon. They are not required to run a node.

### Step 2 - Verify Snapshot (Optional) [​](https://docs.berachain.com/nodes/guides/snapshots#step-2-verify-snapshot-optional)

You can verify the snapshot against the checksum to ensure the snapshot downloaded is valid. The checksum is a hash of the snapshot file that can be used to verify the snapshot's integrity.

Checksum files are provided by the Berachain Foundation with the file extension `.sha256` added to the end of the snapshot file name. For example, if you would like the sha256sum for the snapshot file example above, it is `https://storage.googleapis.com/bartio-snapshot/beacon/full/snapshot_beacond_full_20240913200045.tar.lz4.sha256`.

The following is an example of how to download and verify the checksum for the beacon snapshot:

bash

```
# Download the checksum file
# $SNAPSHOT_URL example: https://storage.googleapis.com/bartio-snapshot/beacon/pruned/beacond-pruned-snapshot-202408292106.tar.lz4
wget $SNAPSHOT_URL.sha256;

# Verify the checksum
# The following command will check the hash against the snapshot file as long as the filename matches
# $SNAPSHOT_CHECKSUM_FILE example: beacond-pruned-snapshot-202408292106.tar.lz4.sha256
sha256sum -c $SNAPSHOT_CHECKSUM_FILE;

# [Expected Equivalent Output]:
# beacond-pruned-snapshot-202408292106.tar.lz4: OK
```

Where `$SNAPSHOT_CHECKSUM_FILE` is the name of the checksum file you downloaded.

WARNING

It's important to ensure that the filename of the snapshot file is the same as the filename inside the checksum file, otherwise `sha256sum` will not be able to verify the snapshot. Additionally, the snapshot file and its checksum file must be located in the same directory.

### Step 3 - Extract Snapshot(s) [​](https://docs.berachain.com/nodes/guides/snapshots#step-3-extract-snapshot-s)

Your extracted snapshot will look similar to the following folders and files:

bash

```
# $EXTRACTED_SNAPSHOT_DIR example: /root/beacon-snapshot
tree $EXTRACTED_SNAPSHOT_DIR;

# [Expected Equivalent Output]:
# /root/beacon-snapshot
# ├── data
#     ├── application.db
#     │   ├── 000056.sst
#     │   ├── ...
#     │   ├── CURRENT
#     │   ├── LOCK
#     │   ├── MANIFEST-014039
#     │   ├── MANIFEST-014065
#     │   └── OPTIONS-014066
#     ├── blockstore.db
#     │   ├── 002506.sst
#     │   ├── ...
#     │   ├── CURRENT
#     │   ├── LOCK
#     │   ├── MANIFEST-047787
#     │   ├── MANIFEST-047831
#     │   └── OPTIONS-047832
#     ├── deposits.db
#     │   ├── 001142.log
#     │   ├── ...
#     │   ├── CURRENT
#     │   ├── LOCK
#     │   ├── MANIFEST-001125
#     │   ├── MANIFEST-001131
#     │   └── OPTIONS-001132
#     ├── evidence.db
#     │   ├── 000075.sst
#     │   ├── 000076.sst
#     │   ├── 000077.log
#     │   ├── CURRENT
#     │   ├── LOCK
#     │   ├── MANIFEST-000073
#     │   ├── MANIFEST-000078
#     │   └── OPTIONS-000079
#     ├── priv_validator_state.json
#     ├── state.db
#         ├── 001750.sst
#         ├── ...
#         ├── CURRENT
#         ├── LOCK
#         ├── MANIFEST-008554
#         ├── MANIFEST-008576
#         └── OPTIONS-008577
#
# 13 directories, 4804 files
```

WARNING

If you are already running a node, make sure to stop the node before extracting the snapshot. Otherwise, you may end up with data corruption.

#### Step 3A - Consensus Client Snapshot Configuration [​](https://docs.berachain.com/nodes/guides/snapshots#step-3a-consensus-client-snapshot-configuration)

Let's first extract the Beacon-Kit snapshot. Extracting can be done with the following command:

bash

```
# Ensure that you have `lz4` installed on your system
# $BEACOND_SNAPSHOT_FILE example: beacond-pruned-snapshot-202408292106.tar.lz4
# $BEACOND_HOME example: /root/.beacond/
lz4 -d $BEACOND_SNAPSHOT_FILE | tar -xvf - --strip-components=2 -C $BEACOND_HOME;
```

In the above command, the `$BEACOND_SNAPSHOT_FILE` variable points to the name of the beacon snapshot file you downloaded. Make sure that the `$BEACOND_HOME` variable points to the correct directory of your beacond config.

#### Step 3B - Execution Client Snapshot Configuration (Optional) [​](https://docs.berachain.com/nodes/guides/snapshots#step-3b-execution-client-snapshot-configuration-optional)

The steps will differ depending on the Execution Client you are using, however, the general process is the same.

For example, if you are using `geth`, you can expect a command similar to the following:

bash

```
# $GETH_SNAPSHOT_FILE example: geth-pruned-snapshot-202408292106.tar.lz4
# $GETH_DATA_DIR example: /root/.ethereum/data/geth
lz4 -c -d $GETH_SNAPSHOT_FILE | tar -x -C $GETH_DATA_DIR;
```

In the above command, the `$GETH_SNAPSHOT_FILE` variable points to the name of the geth snapshot file you downloaded. Make sure that the `$GETH_DATA_DIR` variable points to the correct directory of your geth data.

### Step 4 - Start Your Node [​](https://docs.berachain.com/nodes/guides/snapshots#step-4-start-your-node)

Now you're good to start your node back up! Run the appropriate binary command, systemd service or other custom configuration to start your beacon node back up, as well as the same for your execution client.
