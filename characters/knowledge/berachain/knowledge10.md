## Configuring Hardhat for Berachain Contract Deployment [​](https://docs.berachain.com/developers/guides/create-helloworld-contract-using-hardhat#configuring-hardhat-for-berachain-contract-deployment)

> **NOTE:** Hardhat with viem doesn't fully support custom chains out of the box yet, but this will be supported later when Berachain is launched.

In order to get our `hardhat.config.ts` setup correctly, let's take advantage of the `dotenv` package we installed by creating a `.env` file which will allow us to declare environment variables for our configuration to read.

bash

```
# FROM ./create-helloworld-contract-using-hardhat;

touch .env;
```

In our new `.env` let's enter the following information:

> **NOTE:** These values are subject to change, but the overall configuration is the same.

**File:** `./.env`

bash

```
# Chain Configurations
CHAIN_ID=80094
NETWORK_NAME="berachainMainnet"
CURRENCY_DECIMALS=18
CURRENCY_NAME="BERA Token"
CURRENCY_SYMBOL="BERA"

# API key for Beratrail Block Explorer, can be any value for now
BLOCK_EXPLORER_NAME=BeraScan Block Explorer
BLOCK_EXPLORER_API_KEY=YOUR_API_KEY
BLOCK_EXPLORER_API_URL=https://berascan.com/api
BLOCK_EXPLORER_URL=https://berascan.com/

# Wallet + RPC configurations
RPC_URL=https://rpc.berachain.com/
# Private key generated from Hardhat local - replace with Berachain
# NEVER SHARE THIS WITH ANYONE AND AVOID COMMITTING THIS WITH YOUR GIT REPOSITORY
WALLET_PRIVATE_KEY=0xYOUR_WALLET_PRIVATE_KEY
```

With our environment variable setup, we can now load them into our `hardhat.config.ts` with the following code:

**File:** `./hardhat.config.ts`

ts

```
// Imports
// ========================================================
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import dotenv from "dotenv";

// Load Environment Variables
// ========================================================
dotenv.config();

// Main Hardhat Config
// ========================================================
const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    // For localhost network
    hardhat: {
      chainId: 1337,
    },
    // NOTE: hardhat viem currently doesn't yet support this method for custom chains through Hardhat config ↴
    berachainTestnet: {
      chainId: parseInt(`${process.env.CHAIN_ID}`),
      url: `${process.env.RPC_URL || ""}`,
      accounts: process.env.WALLET_PRIVATE_KEY
        ? [`${process.env.WALLET_PRIVATE_KEY}`]
        : [],
    },
  },
};

// Exports
// ========================================================
export default config;
```

## Deploying HelloWorld Contract [​](https://docs.berachain.com/developers/guides/create-helloworld-contract-using-hardhat#deploying-helloworld-contract)

Now that we have the configuration setup, let's try running a local node and deploying it there.

But first, let's make it a bit easier by making some modifications to our `package.json` to make these commands a bit easier to run.

**File:** `./package.json`

json

```
{
  "name": "create-helloworld-contract-using-hardhat",
  "scripts": {
    "compile": "./node_modules/.bin/hardhat compile",
    "node": "./node_modules/.bin/hardhat node",
    "deploy:localhost": "./node_modules/.bin/hardhat run scripts/deploy.ts --network localhost",
    "deploy:berachain": "./node_modules/.bin/hardhat run scripts/deploy.ts --network berachainTestnet",
    "test": "./node_modules/.bin/hardhat test"
  },
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox-viem": "^1.0.0",
    "dotenv": "^16.3.1",
    "hardhat": "^2.18.3"
  }
}
```

We'll also need to configure our `./scripts/deploy.ts` script to make sure things are deployed correctly.

**File:** `./scripts/deploy.ts`

ts

```
// Imports
// ========================================================
import hre from "hardhat";

// Main Deployment Script
// ========================================================
async function main() {
  const contract = await hre.viem.deployContract("HelloWorld", [\
    "Hello from the contract!",\
  ]);
  console.log(`HelloWorld deployed to ${contract.address}`);
}

// Init
// ========================================================
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

With our deployment script set, let's run a local node in one Terminal and deploy the contract in another Terminal.

**Terminal 1**

bash

```
# FROM ./create-helloworld-contract-using-hardhat;

pnpm node;

# [Expected Output]:
# Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
#
# Accounts
# ========
#
# WARNING: These accounts, and their private keys, are publicly known.
# Any funds sent to them on Mainnet or any other live network WILL BE LOST.
#
# Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
# Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

Copy the Private Key and paste it our `.env` file for the `WALLET_PRIVATE_KEY`

**File:** `./.env`

bash

```
WALLET_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

**Teminal 2**

bash

```
# FROM ./create-helloworld-contract-using-hardhat;

pnpm deploy:localhost;
# [Expected Similar Output]:
# HelloWorld deployed to 0x5fbdb2315678afecb367f032d93f642f64180aa3
```

Now that we can see that the contract can be successfully deployed for a local node, let's configure our deployment script to take advantage of deploying directly to Berachain.

> **NOTE:** Custom configurations are needed for viem to support custom chains. This will show how set that up with Berachain. When Berachain is public, these extra configurations might not be needed.

**File:** `./scripts/deploy.ts`

ts

```
// Imports
// ========================================================
import hre from "hardhat";
import fs from "fs";
import { defineChain } from "viem";
import { privateKeyToAccount } from "viem/accounts";

// Config Needed For Custom Chain
// ========================================================
const chainConfiguration = defineChain({

  id: parseInt(`${process.env.CHAIN_ID}`),
  name: `${process.env.NETWORK_NAME}`,
  network: `${process.env.NETWORK_NAME}`,
  nativeCurrency: {

    decimals: parseInt(`${process.env.CURRENCY_DECIMALS}`),
    name: `${process.env.CURRENCY_NAME}`,
    symbol: `${process.env.CURRENCY_SYMBOL}`,
  },
  rpcUrls: {

    default: {

      http: [`${process.env.RPC_URL}`],
    },
    public: {

      http: [`${process.env.RPC_URL}`],
    },
  },
  blockExplorers: {

    default: {
      name: `${process.env.BLOCK_EXPLORER_NAME}`,
      url: `${process.env.BLOCK_EXPLORER_URL}`,
    },
  },
});

// Main Deployment Script
// ========================================================
async function main() {
  // NOTE: hardhat with viem currently doesn't support custom chains so there needs to be some custom functionality ↴
  if (hre.network.name === "berachainTestnet") {

    // Retrieve contract artifact ABI & Bytecode
    const contractName = "HelloWorld";
    const artifactFile = fs.readFileSync(
      `${hre.artifacts._artifactsPath}/contracts/${contractName}.sol/${contractName}.json`
    );
    const artifactJSON = JSON.parse(artifactFile.toString()) as any;

    // Configure wallet client
    const walletClient = await hre.viem.getWalletClient(

      // wallet account
      privateKeyToAccount(hre.network.config.accounts?.[0] as `0x${string}`),
      // configured chain
      {

        chain: chainConfiguration,
      }
    );

    // Deploy contract
    const hash = await walletClient.deployContract({

      abi: artifactJSON.abi,
      bytecode: artifactJSON.bytecode,
      args: ["Hello From Deployed Contract"],
    });
    console.log({ hash });

    // Retrieve deployed contract address
    const publicClient = await hre.viem.getPublicClient({

      chain: chainConfiguration,
    });
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    console.log(`${contractName} deployed to ${receipt?.contractAddress}`);
  } else {

    const contract = await hre.viem.deployContract("HelloWorld", [\
      "Hello from the contract!",\
    ]);
    console.log(`HelloWorld deployed to ${contract.address}`);
  }
}

// Init
// ========================================================
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Now replace your `WALLET_PRIVATE_KEY` with a wallet that has BERA tokens. You can also get Testnet BERA tokens from the [Berachain Testnet Faucet](https://docs.berachain.com/learn/dapps/faucet).

**File:** `./.env`

bash

```
WALLET_PRIVATE_KEY=0xYOUR_WALLET_PRIVATE_KEY
```

Now let's deploy our contract to Berachain directly.

bash

```
# FROM ./create-helloworld-contract-using-hardhat;

pnpm deploy:berachain;

# [Expected Similar Output]:
# {
#   hash: '0x3ff0120c126b20d9f286657521c9d2d1edbb38f60dcd5fc6b95638a192588182'
# }
# HelloWorld deployed to 0x38f8423cc4390938c01616d7a9f761972e7f116a
```

We can also see our deployed contract in the Berachain Beratrail Block Explorer by going to the following address:

bash

```
open https://berascan.com/address/0x38f8423cc4390938c01616d7a9f761972e7f116a

# [Expected Result Should Open Your Browser]
```

You'll see that our contract has been successfully deployed but not verified as it still shows the contract bytecode.

## Verifying HelloWorld Contract [​](https://docs.berachain.com/developers/guides/create-helloworld-contract-using-hardhat#verifying-helloworld-contract)

To verify our contract, we just need add an additional configuration to our `hardhat.config.ts` file.

**File:** `./hardhat.config.ts`

ts

```
// Imports
// ========================================================
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import dotenv from "dotenv";

// Load Environment Variables
// ========================================================
dotenv.config();

// Main Hardhat Config
// ========================================================
const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // NOTE: hardhat viem currently doesn't yet support this method for custom chains through Hardhat config ↴
    berachainTestnet: {
      chainId: parseInt(`${process.env.CHAIN_ID}`),
      url: `${process.env.RPC_URL || ""}`,
      accounts: process.env.WALLET_PRIVATE_KEY
        ? [`${process.env.WALLET_PRIVATE_KEY}`]
        : [],
    },
  },
  // For Contract Verification
  etherscan: {

    apiKey: `${process.env.BLOCK_EXPLORER_API_KEY}`,
    customChains: [\
\
      {\
\
        network: "Berachain Testnet",\
        chainId: parseInt(`${process.env.CHAIN_ID}`),\
        urls: {\
\
          apiURL: `${process.env.BLOCK_EXPLORER_API_URL}`,\
          browserURL: `${process.env.BLOCK_EXPLORER_URL}`,\
        },\
      },\
    ],
  },
};

// Exports
// ========================================================
export default config;
```

Now that we have the configuration setup, let's add another run command to our `package.json`

**File:** `./package.json`

json

```
{
  "name": "create-helloworld-contract-using-hardhat",
  "scripts": {
    "compile": "./node_modules/.bin/hardhat compile",
    "node": "./node_modules/.bin/hardhat node",
    "deploy:localhost": "./node_modules/.bin/hardhat run scripts/deploy.ts --network localhost",
    "deploy:berachain": "./node_modules/.bin/hardhat run scripts/deploy.ts --network berachainTestnet",
    "test": "./node_modules/.bin/hardhat test",
    "verify": "./node_modules/.bin/hardhat verify --network berachainTestnet"
  },
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox-viem": "^1.0.0",
    "dotenv": "^16.3.1",
    "hardhat": "^2.18.3"
  }
}
```

With our previously deploy contract address and taking into account that we deployed our contract with the initial argument of `"Hello From Deployed Contract"`, let's run the following to confirm our contract.

bash

```
# FROM ./create-helloworld-contract-using-hardhat;

# Equivalent to: npx hardhat verify 0x38f8423cc4390938c01616d7a9f761972e7f116a "Hello From Deployed Contract"
pnpm verify 0x38f8423cc4390938c01616d7a9f761972e7f116a "Hello From Deployed Contract";

# [Expected Output]:
#
# Successfully submitted source code for contract
# contracts/HelloWorld.sol:HelloWorld at 0x38f8423cc4390938c01616d7a9f761972e7f116a
# for verification on the block explorer. Waiting for verification result...
#
# Successfully verified contract HelloWorld on the block explorer.
# https://berascan.com/address/0x38f8423cc4390938c01616d7a9f761972e7f116a#code
```

We should now see on Beratail that the contract is verified and that the Solidity code is now showing.

## Full Code Repository [​](https://docs.berachain.com/developers/guides/create-helloworld-contract-using-hardhat#full-code-repository)

The full github code repository can be found in the [guides section](https://github.com/berachain/guides/) of this repository under [Create HelloWorld Contract Using Hardhat](https://github.com/berachain/guides/tree/main/apps/hardhat-viem-helloworld).

# Create ERC-20 Contract Using Foundry [​](https://docs.berachain.com/developers/guides/create-erc20-contract-using-foundry#create-erc-20-contract-using-foundry)

> See the full [GitHub Project Code Repository](https://github.com/berachain/guides/tree/main/apps/foundry-erc20).

This developer guide will walk you through setting up a new Solidity contract, configuring the Berachain network details, deploying to Berachain, and verifying the contract, all with [Foundry](https://getfoundry.sh/).

## Requirements [​](https://docs.berachain.com/developers/guides/create-erc20-contract-using-foundry#requirements)

Before beginning, make sure you have the following installed or setup on your computer before hand.

-   [Foundry](https://book.getfoundry.sh/getting-started/installation)

## Creating ERC20 Project Code Setup [​](https://docs.berachain.com/developers/guides/create-erc20-contract-using-foundry#creating-erc20-project-code-setup)

Let's start by creating the project folder for the entire code.

bash

```
mkdir create-erc20-contract-using-foundry;
cd create-erc20-contract-using-foundry;
```

Next, start by creating the initial template project defined by Foundry by running the following command:

bash

```
# FROM: ./create-erc20-contract-using-foundry

forge init; # forge init --force; # if there is already an existing .git repository associated

# [Expected Output]:
# ...
# Resolving deltas: 100% (129/129), done.
#     Installed forge-std v1.7.1
#     Initialized forge project
```

If templated correctly, we should see the following structure:

bash

```
# FROM: ./create-erc20-contract-using-foundry
.
├── README.md
├── foundry.toml
├── lib
│   └── forge-std
├── script
│   └── Counter.s.sol
├── src
│   └── Counter.sol
└── test
    └── Counter.t.sol
```

Now that all the code has been setup, install the dependencies needed for an ERC20 contract from [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts), by funning the following:

bash

```
# FROM: ./create-erc20-contract-using-foundry

forge install OpenZeppelin/openzeppelin-contracts;
# If existing git setup run:
# forge install OpenZeppelin/openzeppelin-contracts --no-commit;

# [Expected Output]:
# ...
# Resolving deltas: 100% (129/129), done.
#     Installed openzeppelin-contracts v5.0.0
```

## Creating the ERC20 Contract [​](https://docs.berachain.com/developers/guides/create-erc20-contract-using-foundry#creating-the-erc20-contract)

To create our contract, convert the existing `src/Counter.sol` to a new `BingBongToken.sol` and replace the code with the following Solidity code:

bash

```
# FROM: ./create-erc20-contract-using-foundry

mv src/Counter.sol src/BingBongToken.sol;
```

**File:** `./src/BingBongToken.sol`

solidity

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BingBongToken is ERC20 {
    /**
     * @dev Init constructor for setting token name and symbol
     */
    constructor(string memory name_, string memory symbol_, uint256 mintedTokens_) ERC20(name_, symbol_) {
        _mint(msg.sender, mintedTokens_);
    }
}
```

Confirm that this compiles correctly by running the following:

bash

```
# FROM: ./create-erc20-contract-using-foundry

forge compile;

# [Expected Error Output]:
# [⠊] Compiling...
# [⠒] Unable to resolve imports:
#       "../src/Counter.sol" in "/path/to/create-erc20-contract-using-foundry/test/Counter.t.sol"
#  ...
```

This error happens because it references a file that no longer exists. To fix this, we'll rename it to `BingBongToken.t.sol` and replace it some placeholder code.

bash

```
# FROM: ./create-erc20-contract-using-foundry

mv test/Counter.t.sol test/BingBongToken.t.sol;
```

**File:** `./test/BingBongToken.t.sol`

solidity

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {BingBongToken} from "../src/BingBongToken.sol";

contract BingBongTokenTest is Test {

}
```

Now when running `forge compile` the following results should show up:

bash

```
# FROM: ./create-erc20-contract-using-foundry

forge compile;

# [Expected Output]:
# [⠢] Compiling...
# [⠰] Compiling 27 files with 0.8.21
# [⠃] Solc 0.8.21 finished in 6.25s
# Compiler run successful!
```

## Testing the ERC20 Contract [​](https://docs.berachain.com/developers/guides/create-erc20-contract-using-foundry#testing-the-erc20-contract)

With our newly renamed `BingBongToken.t.sol` file, add the following tests that cover a wide range of ERC20 tests.

Feel free to look at each individual test to get a better idea on how revert and successful scenarios are handled.

**File:** `./test/BingBongToken.t.sol`

solidity

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2, stdError} from "forge-std/Test.sol";
import {BingBongToken} from "../src/BingBongToken.sol";

contract BingBongTokenTest is Test {
    // Variables
    BingBongToken public token;
    address supplyOwnerAddress = makeAddr("BerachainWalletUser"); // 0xE3284cB941608AA9E65F7EDdbb50c461D936622f
    address randomWalletAddress = makeAddr("GiveMeTokens"); // 0x187A660c372Fa04D09C1A71f2927911e62e98a89
    address anotherWalletAddress = makeAddr("AnotherAddress"); // 0x0F3B9cC98eef350B12D5b7a338D8B76c2F9a92CC
    error ERC20InvalidReceiver(address receiver);

    // Initial Read Tests
    // ========================================================
    /**
     * @dev Initial contract setup
     */
    function setUp() public {
        vm.prank(supplyOwnerAddress);
        token = new BingBongToken("BingBong Token", "BBT", 10000);
    }

    /**
     * @dev Test initiatted token name
     */
    function test_name() public {
        assertEq(token.name(), "BingBong Token");
    }

    /**
     * @dev Test initiatted token symbol
     */
    function test_symbol() public {
        assertEq(token.symbol(), "BBT");
    }

    /**
     * @dev Test default decimals
     */
    function test_decimals() public {
        assertEq(token.decimals(), 18);
    }

    /**
     * @dev Test initial total token supply
     */
    function test_totalSupply() public {
        assertEq(token.totalSupply(), 10000);
    }

    /**
     * @dev Test initial random account balance
     */
    function test_balanceOfAddress0() public {
        assertEq(token.balanceOf(address(0)), 0);
    }

    /**
     * @dev Test account balance of original deployer
     */
    function test_balanceOfAddressSupplyOwner() public {
        assertEq(token.balanceOf(supplyOwnerAddress), 10000);
    }

    /**
     * @dev Test Revert transfer to sender as 0x0
     */
    function test_transferRevertInvalidSender() public {
        vm.prank(address(0));
        vm.expectRevert(abi.encodeWithSignature("ERC20InvalidSender(address)", address(0)));
        token.transfer(randomWalletAddress, 100);
    }

    /**
     * @dev Test Revert transfer to receiver as 0x0
     */
    function test_transferRevertInvalidReceiver() public {
        vm.prank(supplyOwnerAddress);
        vm.expectRevert(abi.encodeWithSignature("ERC20InvalidReceiver(address)", address(0)));
        token.transfer(address(0), 100);
    }

    /**
     * @dev Test Revert transfer to sender with insufficient balance
     */
    function test_transferRevertInsufficientBalance() public {
        vm.prank(randomWalletAddress);
        // NOTE: Make sure to keep this string for `encodeWithSignature` free of spaces for the string (" ")
        vm.expectRevert(abi.encodeWithSignature("ERC20InsufficientBalance(address,uint256,uint256)", randomWalletAddress, 0, 100));
        token.transfer(supplyOwnerAddress, 100);
    }

    /**
     * @dev Test transfer to receiver from sender with sufficient balance
     */
    function test_transfer() public {
        vm.prank(supplyOwnerAddress);
        assertEq(token.transfer(randomWalletAddress, 100), true);
        assertEq(token.balanceOf(randomWalletAddress), 100);
        assertEq(token.balanceOf(supplyOwnerAddress), 10000 - 100);
    }

    /**
     * @dev Test allowance of random address for supplyOwner
     */
    function test_allowance() public {
        assertEq(token.allowance(supplyOwnerAddress, randomWalletAddress), 0);
    }

    /**
     * @dev Test Revert approve of owner as 0x0
     */
    function test_approveRevertInvalidApprover() public {
        vm.prank(address(0));
        vm.expectRevert(abi.encodeWithSignature("ERC20InvalidApprover(address)", address(0)));
        token.approve(randomWalletAddress, 100);
    }

    /**
     * @dev Test Revert approve of spender as 0x0
     */
    function test_approveRevertInvalidSpender() public {
        vm.prank(supplyOwnerAddress);
        vm.expectRevert(abi.encodeWithSignature("ERC20InvalidSpender(address)", address(0)));
        token.approve(address(0), 100);
    }

    /**
     * @dev Test approve of spender for 0 and 50
     */
    function test_approve() public {
        vm.prank(supplyOwnerAddress);
        assertEq(token.approve(randomWalletAddress, 0), true);
        assertEq(token.approve(randomWalletAddress, 50), true);
    }

    /**
     * @dev Test Revert transferFrom of spender with 0 approveed
     */
    function test_transferFromRevertInsufficientAllowanceFor0x0() public {
        vm.prank(supplyOwnerAddress);
        vm.expectRevert(abi.encodeWithSignature("ERC20InsufficientAllowance(address,uint256,uint256)", supplyOwnerAddress, 0, 100));
        token.transferFrom(randomWalletAddress, address(0), 100);
    }

    /**
     * @dev Test Revert transferFrom of spender transferring to 0x0
     */
    function test_transferFromRevertInvalidReceiver() public {
        // Setup
        vm.prank(supplyOwnerAddress);
        token.approve(randomWalletAddress, 30);

        // Test
        vm.prank(randomWalletAddress);
        vm.expectRevert(abi.encodeWithSignature("ERC20InvalidReceiver(address)", address(0)));
        token.transferFrom(supplyOwnerAddress, address(0), 30);
    }

    /**
     * @dev Test Revert transferFrom of spender transferring 50/30 approved
     */
    function test_transferFromRevertInsufficientAllowance() public {
        // Setup
        vm.prank(supplyOwnerAddress);
        token.approve(randomWalletAddress, 30);

        // Test
        vm.prank(randomWalletAddress);
        vm.expectRevert(abi.encodeWithSignature("ERC20InsufficientAllowance(address,uint256,uint256)", randomWalletAddress, 30, 50));
        token.transferFrom(supplyOwnerAddress, anotherWalletAddress, 50);
    }

    /**
     * @dev Test transferFrom of spender 10/30 approved
     */
    function test_transferFrom() public {
        // Setup
        vm.prank(supplyOwnerAddress);
        token.approve(randomWalletAddress, 30);

        // Test
        vm.prank(randomWalletAddress);
        assertEq(token.transferFrom(supplyOwnerAddress, anotherWalletAddress, 10), true);
        assertEq(token.balanceOf(anotherWalletAddress), 10);
        assertEq(token.balanceOf(supplyOwnerAddress), 10000 - 10);
        assertEq(token.allowance(supplyOwnerAddress, randomWalletAddress), 30 - 10);
    }
}
```

Compile the code and then run a test to see the different tests pass.

bash

```
# FROM: ./create-erc20-contract-using-foundry

forge test -vvv; # v stands for verbose and multiple vvv allow for more details for tests

# [Expected Output]:
# [⠰] Compiling...
# No files changed, compilation skipped
#
# Running 18 tests for test/BingBongToken.t.sol:BingBongTokenTest
# [PASS] test_allowance() (gas: 12341)
# [PASS] test_approve() (gas: 42814)
# [PASS] test_approveRevertInvalidApprover() (gas: 11685)
# [PASS] test_approveRevertInvalidSpender() (gas: 11737)
# [PASS] test_balanceOfAddress0() (gas: 7810)
# [PASS] test_balanceOfAddressSupplyOwner() (gas: 9893)
# [PASS] test_decimals() (gas: 5481)
# [PASS] test_name() (gas: 9541)
# [PASS] test_symbol() (gas: 9650)
# [PASS] test_totalSupply() (gas: 7546)
# [PASS] test_transfer() (gas: 44880)
# [PASS] test_transferFrom() (gas: 75384)
# [PASS] test_transferFromRevertInsufficientAllowance() (gas: 42626)
# [PASS] test_transferFromRevertInsufficientAllowanceFor0x0() (gas: 16597)
# [PASS] test_transferFromRevertInvalidReceiver() (gas: 28334)
# [PASS] test_transferRevertInsufficientBalance() (gas: 16477)
# [PASS] test_transferRevertInvalidReceiver() (gas: 11796)
# [PASS] test_transferRevertInvalidSender() (gas: 11746)
# Test result: ok. 18 passed; 0 failed; 0 skipped; finished in 2.07ms
#
# Ran 1 test suites: 18 tests passed, 0 failed, 0 skipped (18 total tests)
```

## Configuring Foundry for Berachain Contract Deployment [​](https://docs.berachain.com/developers/guides/create-erc20-contract-using-foundry#configuring-foundry-for-berachain-contract-deployment)

Now that the code and tests have all be defined, the next step is to create the deployment script needed to deploy the `BingBongToken.sol` file. To accomplish this, simply repurpose the script file `Course.s.sol` file as our new `BingBongToken.s.sol`.

bash

```
# FROM: ./create-erc20-contract-using-foundry

mv script/Counter.s.sol script/BingBongToken.s.sol;
```

Next, replace the existing code the following to handle importing the wallet private key, and deploying the contract.

**File:** `./script/BingBongToken.s.sol`

solidity

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/BingBongToken.sol";

contract BingBongTokenScript is Script {
    /**
     * @dev Relevant source part starts here and spans across multiple lines
     */
    function setUp() public {
    }

    /**
     * @dev Main deployment script
     */
    function run() public {
        // Setup
        uint256 deployerPrivateKey = vm.envUint("WALLET_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy
        BingBongToken bbt = new BingBongToken("BingBongToken", "BBT", 5678);

        // Verify + End
        console2.log(bbt.totalSupply());
        vm.stopBroadcast();
    }
}
```

To verify that the contract can actually be deployed, test it with a local node by running `anvil`. Take note of the private key.

**Terminal 1:**

bash

```
# FROM: ./create-erc20-contract-using-foundry

anvil;

# [Expected Output]:
#
#
#                              _   _
#                             (_) | |
#       __ _   _ __   __   __  _  | |
#      / _` | | '_ \  \ \ / / | | | |
#     | (_| | | | | |  \ V /  | | | |
#      \__,_| |_| |_|   \_/   |_| |_|
#
#     0.2.0 (f5b9c02 2023-10-28T00:16:04.060987000Z)
#     https://github.com/foundry-rs/foundry
#
# Available Accounts
# ==================
#
# (0) "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" (10000.000000000000000000 ETH)
# ...
#
# Private Keys
# ==================
#
# (0) 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
# ...
```

With the provided private key, replace the `WALLET_PRIVATE_KEY` in `.env` file.

**File:** `./.env`

bash

```
WALLET_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

**Terminal 2:**

In other terminal window, run the following command to deploy the contract to the local node rpc.

bash

```
# FROM ./create-erc20-contract-using-foundry

forge script script/BingBongToken.s.sol --fork-url http://localhost:8545 --broadcast;

# [Expected Output]:
# Compiler run successful!
# Script ran successfully.
#
# == Logs ==
#   5678
# ...
# ✅  [Success]Hash: 0xc2b647051d11d8dbd88d131ff268ada417caa27e423747497b624cc3e9c75db8
# Contract Address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
# Block: 1
# ...
```

Success! Make sure to stop the `anvil` service in **Terminal 1** by using `ctrl + c`.

## Deploying ERC20 Contract [​](https://docs.berachain.com/developers/guides/create-erc20-contract-using-foundry#deploying-erc20-contract)

> **NOTE:** For this step, make sure to have a wallet that contains `BERA` tokens to pay for the transaction and make sure to change the `WALLET_PRIVATE_KEY` the `.env` file.

With a local node configure, the deployment to Berachain Testnet should be the same process, but with a specified RPC URL endpoint.

bash

```
# FROM ./create-erc20-contract-using-foundry

forge script script/BingBongToken.s.sol --rpc-url https://rpc.berachain.com/ --broadcast;

# [Expected Output]:
# Compiler run successful!
# Script ran successfully.
#
# == Logs ==
#   5678
# ...
# ✅  [Success]Hash: 0x69aeb8ee5084c44cce00cae2fda3563bd10efb9c8c663ec7b6a6929d6d48a50e
# Contract Address: 0x01870EC5C7656723b31a884259537B183FE15Fa7
# Block: 68764
# ...
```

## Verifying ERC20 Contract [​](https://docs.berachain.com/developers/guides/create-erc20-contract-using-foundry#verifying-erc20-contract)

> **NOTE:** Currently with forge `v0.2.0` there are some issues with verifying contracts that are preventing contract verification. As soon as these are up and running, the following command should help with verifying the contract:

bash

```
# FROM ./create-erc20-contract-using-foundry

forge verify-contract 0xYOUR_DEPLOYED_CONTRACT_ADDRESS BingBongToken \
    --etherscan-api-key=YOUR_API_KEY \
    --watch \
    --constructor-args $(cast abi-encode "constructor(string,string,uint256)" "BingBongToken" "BBT" 5678) \
    --retries=2 \
    --verifier-url=https://berascan.com/api;
```

## Full Code Repository [​](https://docs.berachain.com/developers/guides/create-erc20-contract-using-foundry#full-code-repository)

The full github code repository can be found in the [guides section](https://github.com/berachain/guides/) of this repository under [Create ERC20 Contract Using Foundry](https://github.com/berachain/guides/tree/main/apps/foundry-erc20).

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
