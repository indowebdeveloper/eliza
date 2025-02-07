### Example \#1 - Activity-frequency rewards [​](https://docs.berachain.com/developers/quickstart/pol-integration#example-1-activity-frequency-rewards)

In this example we'll consider an example where an application wants to incentivize users to make trades often while still considering the size of the trades to reduce spam. The core idea would be to create a staking token that represents active trading participation.

Here's how it works:

-   ERC20 token representing active trading participation
-   Tracks trades within a 7-day rolling window
-   Awards points based on trading frequency and size

Core Mechanics:

-   Minimum 5 trades required in the window for rewards
-   Daily cap of 20 trades to prevent gaming
-   24-hour cooling period between score mints
-   Score calculation considers both trade frequency and size
-   Automatic staking of newly minted tokens in the reward vault

solidity

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./IRewardVault.sol";

interface IRewardVault {
    function delegateStake(address user, uint256 amount) external;
    function delegateWithdraw(address user, uint256 amount) external;
    function getDelegateStake(
        address account,
        address delegate
    ) external view returns (uint256);
}

/**
 * @title TraderScore
 * @notice ERC20 token that represents trading activity scores
 */
contract TraderScore is ERC20, Ownable, ReentrancyGuard {
    // Constants for scoring
    uint256 public constant TRADE_WINDOW = 7 days;
    uint256 public constant MIN_TRADES_FOR_REWARD = 5;
    uint256 public constant MAX_TRADES_PER_DAY = 20;
    uint256 public constant BASE_POINTS_PER_TRADE = 100; // 1 token = 100 points

    // Trading activity tracking
    struct TraderInfo {
        uint256[] tradeTimes;
        uint256 lastMintTimestamp;
        uint256 currentScore;
    }

    mapping(address => TraderInfo) public traderInfo;
    IRewardVault public immutable rewardVault;

    event TradeRecorded(address indexed trader, uint256 tradeSize, uint256 timestamp);
    event ScoreMinted(address indexed trader, uint256 score, uint256 timestamp);

    constructor(address _rewardVault) ERC20("Trader Score", "SCORE") {
        rewardVault = IRewardVault(_rewardVault);
    }

    /**
     * @notice Records a trade for a user and potentially mints score tokens
     * @param trader Address of the trader
     * @param tradeSize Size of the trade in base currency
     */
    function recordTrade(address trader, uint256 tradeSize) external onlyOwner nonReentrant {
        TraderInfo storage info = traderInfo[trader];
        uint256 currentTime = block.timestamp;

        // Add new trade
        info.tradeTimes.push(currentTime);
        emit TradeRecorded(trader, tradeSize, currentTime);

        // Calculate active trades in window
        uint256 activeTradeCount = getActiveTradeCount(trader);

        // Check if eligible for scoring
        if (activeTradeCount >= MIN_TRADES_FOR_REWARD &&
            currentTime - info.lastMintTimestamp >= 1 days) {

            uint256 newScore = _calculateScore(info, tradeSize, activeTradeCount);

            if (newScore > 0) {
                // Mint and stake following the correct pattern
                _mintAndDelegateStake(trader, newScore);

                info.lastMintTimestamp = currentTime;
                info.currentScore = newScore;

                emit ScoreMinted(trader, newScore, currentTime);
            }
        }
    }

    /**
     * @notice Calculates trading score based on frequency and size
     */
    function _calculateScore(
        TraderInfo storage info,
        uint256 tradeSize,
        uint256 activeTradeCount
    ) internal view returns (uint256) {
        // Calculate daily average trades
        uint256 avgDailyTrades = (activeTradeCount * 1 days) / TRADE_WINDOW;
        if (avgDailyTrades > MAX_TRADES_PER_DAY) {
            avgDailyTrades = MAX_TRADES_PER_DAY;
        }

        // Score based on trade frequency and size
        uint256 frequencyMultiplier = avgDailyTrades * BASE_POINTS_PER_TRADE;
        uint256 sizeMultiplier = (tradeSize * BASE_POINTS_PER_TRADE) / (1 ether);

        return (frequencyMultiplier + sizeMultiplier) / BASE_POINTS_PER_TRADE;
    }

    /**
     * @notice Mints tokens to contract and delegates stake to user
     */
    function _mintAndDelegateStake(address trader, uint256 newScore) internal {
    uint256 currentScore = traderInfo[trader].currentScore;
    uint256 scoreIncrease = newScore - currentScore;  // Calculate only the increase

    if (scoreIncrease > 0) {
        _mint(address(this), scoreIncrease);  // Mint only the difference
        approve(address(rewardVault), scoreIncrease);
        rewardVault.delegateStake(trader, scoreIncrease);
    }
}

    /**
     * @notice View function to get active trades in window
     */
    function getActiveTradeCount(address trader) public view returns (uint256) {
        TraderInfo storage info = traderInfo[trader];
        uint256 cutoffTime = block.timestamp - TRADE_WINDOW;
        uint256 count = 0;

        for (uint256 i = 0; i < info.tradeTimes.length; i++) {
            if (info.tradeTimes[i] >= cutoffTime) {
                count++;
            }
        }

        return count;
    }

    /**
     * @notice View function to get all trade timestamps for a trader
     */
    function getTradeHistory(address trader) external view returns (uint256[] memory) {
        return traderInfo[trader].tradeTimes;
    }

    /**
     * @notice View function to check if trader is eligible for score minting
     */
    function isEligibleForScoring(address trader) external view returns (bool) {
        TraderInfo storage info = traderInfo[trader];
        uint256 activeTradeCount = getActiveTradeCount(trader);

        return activeTradeCount >= MIN_TRADES_FOR_REWARD &&
               block.timestamp - info.lastMintTimestamp >= 1 days;
    }
}
```

Integration:

-   Deploy `TraderScore` contract with your `RewardVault` address (note: must implement `IRewardVault` interface)
-   After each trade, call `recordTrade` with trader's address and trade size
-   Contract automatically mints tokens to itself and delegates stakes to users via `RewardVault` when thresholds are met
-   The contract holds the tokens and delegates them to users, rather than users directly staking

### Example \#2 - Gameplay Progression Rewards [​](https://docs.berachain.com/developers/quickstart/pol-integration#example-2-gameplay-progression-rewards)

This system incentivizes three key engagement metrics:

**Daily Playtime**

-   Target of 30 minutes daily playtime
-   Additional rewards for playing up to 4 hours
-   Prevents gaming by capping max daily rewards

**Streak Maintenance**

-   Rewards consecutive days of play
-   Streak multiplier up to 7 days
-   Streak breaks if player misses a day

**Progression**

-   Points for each level completed
-   Level points stack with daily/streak bonuses
-   Encourages both regular play and advancement

The scoring system:

-   Base daily score for meeting minimum playtime (1000 points)
-   Level bonus (100 points per level)
-   Streak multiplier (up to 70% bonus for 7-day streak)
-   Extra playtime bonus (up to 2x for hitting max daily time)

solidity

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IRewardVault {
    function delegateStake(address user, uint256 amount) external;
    function delegateWithdraw(address user, uint256 amount) external;
    function getDelegateStake(
        address account,
        address delegate
    ) external view returns (uint256);
}

/**
 * @title GameEngagement
 * @notice Tracks and rewards consistent gameplay and progression
 */
contract GameEngagement is ERC20, Ownable, ReentrancyGuard {
    // Engagement tracking constants
    uint256 public constant DAILY_SESSION_TARGET = 30 minutes;
    uint256 public constant MAX_DAILY_PLAYTIME = 4 hours;
    uint256 public constant POINTS_PER_LEVEL = 100;
    uint256 public constant STREAK_MULTIPLIER = 10;
    uint256 public constant BASE_DAILY_POINTS = 1000;

    struct PlayerStats {
        uint256 lastPlayTimestamp;
        uint256 dailyPlayTime;
        uint256 currentLevel;
        uint256 playStreak;      // Consecutive days played
        uint256 lastMintTimestamp;
        uint256 lastDailyReset;
        uint256 currentScore;    // Track current score for incremental minting
    }

    mapping(address => PlayerStats) public playerStats;
    IRewardVault public immutable rewardVault;

    event SessionRecorded(address indexed player, uint256 duration, uint256 timestamp);
    event LevelCompleted(address indexed player, uint256 level, uint256 timestamp);
    event EngagementScoreMinted(address indexed player, uint256 score, uint256 timestamp);

    constructor(address _rewardVault) ERC20("Game Engagement Score", "PLAY") {
        rewardVault = IRewardVault(_rewardVault);
    }

    /**
     * @notice Records a gameplay session
     * @param player Address of the player
     * @param duration Duration of play session in seconds
     */
    function recordGameSession(address player, uint256 duration) external onlyOwner nonReentrant {
        PlayerStats storage stats = playerStats[player];
        uint256 currentTime = block.timestamp;

        // Check if we need to reset daily stats
        if (block.timestamp >= stats.lastDailyReset + 1 days) {
            _resetDailyStats(stats);
        }

        // Update play time (cap at max daily)
        uint256 newDailyTime = stats.dailyPlayTime + duration;
        stats.dailyPlayTime = newDailyTime > MAX_DAILY_PLAYTIME ? MAX_DAILY_PLAYTIME : newDailyTime;

        // Update streak if this is their first session of the day
        if (stats.lastPlayTimestamp < stats.lastDailyReset) {
            stats.playStreak++;
        }

        stats.lastPlayTimestamp = currentTime;
        emit SessionRecorded(player, duration, currentTime);

        // Try to mint score if eligible
        _checkAndMintScore(player, stats);
    }

    /**
     * @notice Records completion of a new level
     * @param player Address of the player
     * @param newLevel The new level achieved
     */
    function recordLevelUp(address player, uint256 newLevel) external onlyOwner nonReentrant {
        PlayerStats storage stats = playerStats[player];
        require(newLevel > stats.currentLevel, "Invalid level");

        uint256 currentTime = block.timestamp;
        stats.currentLevel = newLevel;

        emit LevelCompleted(player, newLevel, currentTime);

        // Try to mint score if eligible
        _checkAndMintScore(player, stats);
    }

    function _resetDailyStats(PlayerStats storage stats) private {
        // If they didn't play yesterday, reset streak
        if (stats.lastPlayTimestamp < stats.lastDailyReset) {
            stats.playStreak = 0;
        }

        stats.dailyPlayTime = 0;
        stats.lastDailyReset = block.timestamp;
    }

    function _checkAndMintScore(address player, PlayerStats storage stats) private {
        // Can only mint once per day
        if (block.timestamp - stats.lastMintTimestamp < 1 days) {
            return;
        }

        // Must meet minimum daily play time
        if (stats.dailyPlayTime < DAILY_SESSION_TARGET) {
            return;
        }

        uint256 newScore = _calculateScore(stats);
        uint256 scoreIncrease = newScore - stats.currentScore;

        if (scoreIncrease > 0) {
            _mintAndDelegateStake(player, scoreIncrease);
            stats.currentScore = newScore;
            stats.lastMintTimestamp = block.timestamp;
            emit EngagementScoreMinted(player, scoreIncrease, block.timestamp);
        }
    }

    function _calculateScore(PlayerStats memory stats) private pure returns (uint256) {
        // Base score for meeting daily target
        uint256 score = BASE_DAILY_POINTS;

        // Add points for current level
        score += stats.currentLevel * POINTS_PER_LEVEL;

        // Multiply by streak bonus (cap at 7 days)
        uint256 streakBonus = stats.playStreak > 7 ? 7 : stats.playStreak;
        score += (score * streakBonus * STREAK_MULTIPLIER) / 100;

        // Bonus for exceeding daily target (up to 2x for max playtime)
        if (stats.dailyPlayTime > DAILY_SESSION_TARGET) {
            uint256 extraTime = stats.dailyPlayTime - DAILY_SESSION_TARGET;
            uint256 maxExtraTime = MAX_DAILY_PLAYTIME - DAILY_SESSION_TARGET;
            score += (score * extraTime) / maxExtraTime;
        }

        return score;
    }

    /**
     * @notice Mints tokens to contract and delegates stake to user
     * @dev Following the pattern from OnlyPaws.sol
     */
    function _mintAndDelegateStake(address player, uint256 amount) private {
        _mint(address(this), amount);  // 1. Mint to contract
        approve(address(rewardVault), amount);  // 2. Contract approves vault
        rewardVault.delegateStake(player, amount);  // 3. Delegate stake to user
    }

    // View functions for game client
    function getPlayerStats(address player) external view returns (
        uint256 dailyPlayTime,
        uint256 currentLevel,
        uint256 playStreak,
        bool eligibleForMint
    ) {
        PlayerStats memory stats = playerStats[player];
        return (
            stats.dailyPlayTime,
            stats.currentLevel,
            stats.playStreak,
            _isEligibleForMint(stats)
        );
    }

    function _isEligibleForMint(PlayerStats memory stats) private view returns (bool) {
        return stats.dailyPlayTime >= DAILY_SESSION_TARGET &&
               block.timestamp - stats.lastMintTimestamp >= 1 days;
    }
}
```

Integration:

-   Game server calls `recordGameSession` periodically during gameplay
-   `recordLevelUp` called when player completes a new level

When players are eligible, tokens are:

-   Minted to the contract
-   Automatically delegated to players via `RewardVault`

Daily reset ensures players must come back each day to maintain their streak. Players accumulate score progressively rather than receiving the full amount each mint.

### Example \#3 - Incentivizing Trading Positions [​](https://docs.berachain.com/developers/quickstart/pol-integration#example-3-incentivizing-trading-positions)

Here's how this system works:

-   Creates an ERC20 token representing healthy perps positions
-   Token is automatically staked in RewardVault to earn BGT

Token Minting Based On:

-   Position Size: 1 token per $1000 in position size
-   Health Ratio: Must maintain at least 110% collateral
-   Duration: Bonus for longer-held positions
-   Optimal Maintenance: 50% bonus for keeping 150%+ health ratio

solidity

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IRewardVault.sol";

/**
 * @title PerpsStakingToken
 * @notice Mints tokens based on perpetual futures position health, automatically staking them for BGT rewards
 */
contract PerpsStakingToken is ERC20, Ownable, ReentrancyGuard {
    struct Position {
        uint256 size;           // Position size in USD
        uint256 collateral;     // Collateral amount in USD
        uint256 openTimestamp;  // When position was opened
        bool isLong;           // Long or short position
        bool isActive;         // Position status
        uint256 lastTokenMintTimestamp; // Last time tokens were minted
    }

    uint256 public constant MIN_HEALTH_RATIO = 110;    // 1.1x minimum health ratio (110%)
    uint256 public constant OPTIMAL_HEALTH_RATIO = 150; // 1.5x optimal health ratio (150%)
    uint256 public constant MIN_POSITION_SIZE = 100e18; // Minimum $100 position
    uint256 public constant MINT_INTERVAL = 1 days;    // How often tokens can be minted

    IRewardVault public immutable rewardVault;
    mapping(address => mapping(uint256 => Position)) public positions; // user => positionId => Position
    mapping(address => uint256) public positionCount;

    event PositionOpened(address indexed user, uint256 indexed positionId, uint256 size, bool isLong);
    event PositionModified(address indexed user, uint256 indexed positionId, uint256 newSize, uint256 newCollateral);
    event PositionClosed(address indexed user, uint256 indexed positionId);
    event TokensStaked(address indexed user, uint256 amount);

    constructor(address _rewardVault) ERC20("Perps Position Token", "pPOS") {
        rewardVault = IRewardVault(_rewardVault);
    }

    /**
     * @notice Called by perps platform when a new position is opened
     */
    function openPosition(
        address user,
        uint256 size,
        uint256 collateral,
        bool isLong
    ) external onlyOwner nonReentrant {
        require(size >= MIN_POSITION_SIZE, "Position too small");
        require(collateral > 0, "No collateral");

        uint256 positionId = positionCount[user];
        positions[user][positionId] = Position({
            size: size,
            collateral: collateral,
            openTimestamp: block.timestamp,
            isLong: isLong,
            isActive: true,
            lastTokenMintTimestamp: block.timestamp
        });

        positionCount[user]++;
        emit PositionOpened(user, positionId, size, isLong);
    }

    /**
     * @notice Called when position size or collateral changes
     */
    function modifyPosition(
        address user,
        uint256 positionId,
        uint256 newSize,
        uint256 newCollateral
    ) external onlyOwner nonReentrant {
        Position storage position = positions[user][positionId];
        require(position.isActive, "Position not active");

        // Mint tokens before updating position
        _mintTokensForPosition(user, positionId);

        position.size = newSize;
        position.collateral = newCollateral;

        emit PositionModified(user, positionId, newSize, newCollateral);
    }

    /**
     * @notice Called when position is closed
     */
    function closePosition(
        address user,
        uint256 positionId
    ) external onlyOwner nonReentrant {
        Position storage position = positions[user][positionId];
        require(position.isActive, "Position not active");

        // Final token minting before closing
        _mintTokensForPosition(user, positionId);
        position.isActive = false;

        emit PositionClosed(user, positionId);
    }

    /**
     * @notice Mints tokens based on position health and duration and stakes them for the user
     */
    function _mintTokensForPosition(address user, uint256 positionId) internal {
        Position storage position = positions[user][positionId];

        if (!position.isActive ||
            block.timestamp < position.lastTokenMintTimestamp + MINT_INTERVAL) {
            return;
        }

        // Calculate health ratio
        uint256 healthRatio = (position.collateral * 100) / position.size;

        if (healthRatio >= MIN_HEALTH_RATIO) {
            // Base token amount is 1 token per $1000 in position size per day
            uint256 tokens = (position.size) / 1000e18;

            // Bonus for optimal health ratio
            if (healthRatio >= OPTIMAL_HEALTH_RATIO) {
                tokens = (tokens * 150) / 100; // 50% bonus
            }

            // Time multiplier (up to 2x for positions held 10+ days)
            uint256 daysOpen = (block.timestamp - position.openTimestamp) / 1 days;
            if (daysOpen > 0) {
                uint256 timeMultiplier = 100 + (daysOpen * 10); // +10% per day
                timeMultiplier = timeMultiplier > 200 ? 200 : timeMultiplier;
                tokens = (tokens * timeMultiplier) / 100;
            }

            // Mint tokens to this contract
            _mint(address(this), tokens);

            // Approve and delegate stake to the user
            approve(address(rewardVault), tokens);
            rewardVault.delegateStake(user, tokens);

            emit TokensStaked(user, tokens);
        }

        position.lastTokenMintTimestamp = block.timestamp;
    }

    /**
     * @notice Allows users to manually mint tokens for their positions
     */
    function mintPositionTokens(uint256 positionId) external nonReentrant {
        _mintTokensForPosition(msg.sender, positionId);
    }
}
```

Integration:

-   Perps platform calls openPosition when positions are created
-   `modifyPosition` on size/collateral changes
-   `closePosition` when positions are closed
-   Users can trigger their own minting via mintPositionTokens

# Build a Frontend [​](https://docs.berachain.com/developers/quickstart/frontend#build-a-frontend)

To ensure you can connect to the Berachain blockchain, make sure you have your browser wallet configured to [Connect to Berachain](https://docs.berachain.com/developers/network-configurations).

This walkthrough will show you how to build a frontend that allows for a wallet connection and makes and RPC request to Berachain for the current block number as defined by [JSON-RPC endpoints](https://geth.ethereum.org/docs/interacting-with-geth/rpc).

The goal of this project is use **Vanilla JavaScript** to interact with Berachain and understand the very basics or JSON-RPC requests.

## Requirements [​](https://docs.berachain.com/developers/quickstart/frontend#requirements)

Before beginning, made sure you have the following setup on your computer:

-   VSCode IDE (Recommended)
-   NVM or Node ( `v22` or higher)
-   `pnpm`, `yarn`, or `npm`

## Code Setup [​](https://docs.berachain.com/developers/quickstart/frontend#code-setup)

Let's start by creating our project folder.

bash

```
mkdir frontend-berachain;
cd frontend-berachain;
```

From here we'll instance some dependencies that will allow us to server an HTTP server to view our HTML and JS in a web page.

bash

```
# FROM: ./frontend-berachain;

pnpm init;

# [Expected Output]:
# {
#   "name": "frontend-berachain",
#   "version": "1.0.0",
#   "description": "",
#   "main": "index.js",
#   "scripts": {
#     "test": "echo \"Error: no test specified\" && exit 1"
#   },
#   "keywords": [],
#   "author": "",
#   "license": "ISC"
# }
```

Install the dependencies, which will allow us to live reload our page and create an http server.

bash

```
# FROM: ./frontend-berachain;

pnpm add -D live-server;
```

Next, we'll create new folder called `app` and create both an `index.html` and `scripts.js` file in it.

bash

```
# FROM: ./frontend-berachain;

mkdir app;
touch app/index.html;
touch app/scripts.js;
echo "node_modules" > .gitignore;
git init;
```

Let's modify out index.html to show something in the meantime.

**File:** `./app/index.html`

html

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Berachain Frontend</title>
  </head>
  <body>
    <h1>Berachain Frontend</h1>
  </body>
</html>
```

Now let's make it so that we can see these changes by adding a run command to our `package.json`

**File:** `./package.json`

json

```
{
  "name": "frontend-berachain",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "./node_modules/.bin/live-server --port=3001 --watch=app --mount=/:./app",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "live-server": "^1.2.2"
  }
}
```

Run our server by running the following command:

bash

```
# FROM: ./frontend-berachain;

pnpm dev;

# [Expected Output]:
# Mapping / to "/path/to/frontend-berachain/app"
# Serving "/path/to/frontend-berachain" at http://127.0.0.1:3001
# Ready for changes
```

![Developer Quickstart - Berachain Frontend Initial Page](https://docs.berachain.com/assets/berachain-frontend-01.png)

## Creating Our UI [​](https://docs.berachain.com/developers/quickstart/frontend#creating-our-ui)

In order to make our UI a bit easier to make, we'll take advantage of [Tailwind](https://tailwindcss.com/) from a CDN to adopt its classes for html elements.

To that, we'll modify out `index.html` file by adding a script tag for CDN to Tailwind and adding our `scripts.js` file.

> **NOTE:** This is optional but makes the overall page look a bit better.

**File:** `./app/index.html`

html

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="scripts.js"></script>
    <title>Berachain Frontend</title>
  </head>
  <body class="bg-zinc-900 pt-24 lg:pt-0">
    <main class="p-8">
      <h1 class="text-2xl text-white mb-4">Berachain Frontend</h1>

      <p class="text-zinc-400 mb-4">Must use MetaMask for wallet connection.</p>

      <!-- START: Main interaction to connect our wallet -->
      <div class="mb-6">
        <button
          type="button"
          disabled
          id="button-connect"
          class="h-10 bg-zinc-200 text-zinc-800 px-5 rounded-full font-medium disabled:bg-opacity-30"
        >
          Connect Wallet (Unsupported)
        </button>
        <div
          id="div-error-connect"
          class="mt-4 bg-red-300 rounded p-6 text-red-800 hidden"
        ></div>
      </div>
      <!-- END -->

      <hr class="border-zinc-700 mb-8" />

      <!-- START: Main section that will appear when our wallet is connected -->
      <section id="section-connected" class="hidden">
        <h2 id="wallet-connection" class="text-xl text-zinc-200 mb-4">
          Wallet Connection
        </h2>

        <p class="text-zinc-400 mb-4">
          If you're seeing this then your wallet is connected.
        </p>

        <div class="mb-4">
          <button
            type="button"
            id="button-disconnect"
            class="h-10 mb-2 bg-zinc-200 text-zinc-800 px-5 rounded-full font-medium disabled:bg-opacity-30"
          >
            Disconnect*
          </button>
          <p class="text-sm text-zinc-300">
            <small
              >*Remember you're not really disconnecting unless the wallet
              removes the website from Connected Sites.</small
            >
          </p>
        </div>
        <div class="mb-4">
          <label class="block mb-2 text-zinc-600">Wallet Connected</label>
          <code class="block bg-zinc-500 p-6 rounded bg-zinc-800 text-zinc-200">
            <pre id="pre-wallet-address"></pre>
          </code>
        </div>
        <div class="mb-6">
          <label class="block mb-2 text-zinc-600">Network</label>
          <code class="block bg-zinc-500 p-6 rounded bg-zinc-800 text-zinc-200">
            <pre id="pre-wallet-network"></pre>
          </code>
        </div>

        <hr class="border-zinc-700 mb-8" />

        <h2 id="eth-blocknumber" class="text-xl text-zinc-100 mb-4">
          Get Berachain Block Number
        </h2>

        <p class="text-zinc-400 mb-4">
          Will make a JSON-RPC request to Berachain to retrieve the current
          block number with
          <span class="bg-zinc-700 text-zinc-200 py-1 px-1.5 rounded"
            >eth_blockNumber</span
          >.
        </p>

        <form id="form-eth-blocknumber">
          <div class="mb-4">
            <button
              type="submit"
              class="h-10 mb-2 bg-zinc-200 text-zinc-800 px-5 rounded-full font-medium disabled:bg-opacity-30"
            >
              Get Block Number
            </button>
          </div>

          <!-- Where the results are displayed -->
          <div class="mb-4">
            <label class="block mb-2 text-zinc-600">Response</label>
            <code
              class="block bg-zinc-500 p-6 rounded bg-zinc-800 text-zinc-200"
            >
              <pre id="pre-eth-blocknumber"></pre>
            </code>
          </div>
        </form>
      </section>
      <!-- END -->
    </main>
  </body>
</html>
```

![Developer Quickstart - Berachain Frontend Tailwind](https://docs.berachain.com/assets/berachain-frontend-02.png)

## JavaScript Functionality [​](https://docs.berachain.com/developers/quickstart/frontend#javascript-functionality)

Now that we have our HTML structure setup, let's add the functionality that would allow us to connect our wallet to the browser.

This will be quite a bit of code, but look through the comments to get a better idea of all the functionality.

**File:** `./app/scripts.js`

js

```
// Main Function
// ========================================================
/**
 * Main wallet connection interaction
 */
const connect = async () => {
  console.group("connect");

  // Hide errors when trying to connect
  const devErrorConnect = document.getElementById("div-error-connect");
  devErrorConnect.innerHTML = "";
  devErrorConnect.classList = devErrorConnect.classList.value.includes("hidden")
    ? devErrorConnect.classList.value
    : `${devErrorConnect.classList.value} hidden`;

  // Attempt to connect to wallet with JSON-RPC request
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const chainId = await ethereum.request({ method: "eth_chainId" });

    // Disable connect button
    const buttonConnect = document.getElementById("button-connect");
    buttonConnect.setAttribute("disabled", true);
    buttonConnect.innerHTML = "Connected";

    // Show connected section
    const sectionConnected = document.getElementById("section-connected");
    sectionConnected.classList = "";

    // Display wallet connected
    const preWalletAddress = document.getElementById("pre-wallet-address");
    preWalletAddress.innerHTML = accounts[0];

    // Display current network connected
    const preWalletNetwork = document.getElementById("pre-wallet-network");
    preWalletNetwork.innerHTML = `${chainId}`;
  } catch (error) {
    console.log({ error });
    devErrorConnect.innerHTML =
      error?.message ?? "Unknown wallet connection error.";
    devErrorConnect.classList = devErrorConnect.classList.value.replaceAll(
      "hidden",
      ""
    );
  }
  console.groupEnd();
};

/**
 * Main function that disconnects from the browser
 */
const disconnect = () => {
  console.group("disconnect");

  // Hide connected section
  const sectionConnected = document.getElementById("section-connected");
  sectionConnected.classList = "hidden";

  // Enabled connect button
  const buttonConnect = document.getElementById("button-connect");
  buttonConnect.removeAttribute("disabled");
  buttonConnect.innerHTML = "Connect Wallet";

  console.groupEnd();
};

/**
 * Main function that handles the form request for a read JSON-RPC request
 * @param {*} event
 */
const onSubmitEthBlockNumber = async (event) => {
  event.preventDefault();
  console.group("onSubmitEthBlockNumber");

  // Reset & Set Loading State
  const preEthBlockNumber = document.getElementById("pre-eth-blocknumber");
  const button = document.querySelector(`#${event.currentTarget.id} button`);
  button.setAttribute("disabled", true);
  button.innerHTML = `${button.innerHTML} (Loading...)`;

  // Attempt request for block number
  try {
    const result = await window.ethereum.request({
      method: "eth_blockNumber",
    });

    console.log({ result });

    preEthBlockNumber.innerHTML = `${result}\n\n// Block Number:\n// ${parseInt(
      result,
      16
    )}`;
  } catch (error) {
    console.log({ error });
    preEthBlockNumber.innerHTML = error?.message ?? "Unknown JSON-RPC error.";
  }

  button.removeAttribute("disabled");
  button.innerHTML = "Get Block Number";
};

// Initial Script Loaded On Window Loaded
// ========================================================
/**
 * Init
 */
window.onload = async () => {
  console.log("WINDOW ONLOAD!");

  // Get All Elements
  const buttonConnect = document.getElementById("button-connect");
  const buttonDisconnect = document.getElementById("button-disconnect");
  const formEthBlockNumber = document.getElementById("form-eth-blocknumber");

  // Add Interactions
  buttonConnect.addEventListener("click", connect);
  buttonDisconnect.addEventListener("click", disconnect);
  formEthBlockNumber.addEventListener("submit", onSubmitEthBlockNumber);

  // Check if browser has wallet integration
  if (typeof window?.ethereum !== "undefined") {
    // Activate elements
    buttonConnect.removeAttribute("disabled");
    buttonConnect.innerHTML = "Connect Wallet";
  }
};
```

Now if we connect with our browser that has a MetaMask setup on it, we can see the following interactions.

> **NOTE:** Make sure you are set to the Berachain Network in your wallet.

We can connect to the site and see our current wallet address and current chain id.

![Developer Quickstart - Berachain Frontend Wallet Connection](https://docs.berachain.com/assets/berachain-frontend-03.png)

If we submit the form and peform an RPC request, we can see the result shown.

![Developer Quickstart - Berachain Frontend JSON-RPC Request Eth Block Bumber](https://docs.berachain.com/assets/berachain-frontend-04.png)

## Next Steps [​](https://docs.berachain.com/developers/quickstart/frontend#next-steps)

There are quite a few libraries and frameworks that help speed up building dApps, from React, NextJS, Svelte, Wagmi, Ethers, Viem, WalletConnect, and RainbowKit to name a few. See [Developer Tools](https://docs.berachain.com/developers/developer-tools) for more.

Now that you understand how to interact with Berachain through a frontend, go through some of the [Developer Guides](https://docs.berachain.com/developers/guides/community-guides) to start building out contracts or building other frontend applications.

# Connecting to Berachain [​](https://docs.berachain.com/developers/network-configurations#connecting-to-berachain)

To start using Berachain, join the testnet below.

### Add the network in One Click [​](https://docs.berachain.com/developers/network-configurations#add-the-network-in-one-click)

Click the button below to add the network to your MetaMask in one click.

Wallet Not Supported

### Add the Network Manually [​](https://docs.berachain.com/developers/network-configurations#add-the-network-manually)

To add the network manually, insert the network details below into your wallet of choice:

| Key                | Value                      |
| ------------------ | -------------------------- |
| Network            | Berachain Mainnet          |
| RPC URL            | https://rpc.berachain.com/ |
| Chain ID           | 80094                      |
| Currency symbol    | BERA                       |
| Block Explorer URL | https://berascan.com/      |

### RPC Providers [​](https://docs.berachain.com/developers/network-configurations#rpc-providers)

See our [RPC partners](https://docs.berachain.com/developers/developer-tools#rpc-providers) under Developer Tools.

TIP

**NOTE:** Berachain WebSocket connections are available through our [RPC partners](https://docs.berachain.com/developers/developer-tools#rpc-providers)

### What is a Testnet? [​](https://docs.berachain.com/developers/network-configurations#what-is-a-testnet)

Testnet is an additional blockchain network that runs separately from the Mainnet blockchain and is a test environment that has no economic value associated with the tokens in it

### What is a Testnet Used for? [​](https://docs.berachain.com/developers/network-configurations#what-is-a-testnet-used-for)

-   Creating your test address and getting test funds
-   Developing applications to ensure they work properly prior to deploying them on mainnet
-   Testing applications against new upgrades to the Berachain network prior to them being released on mainnet

## Mainnet [​](https://docs.berachain.com/developers/network-configurations#mainnet)

Berachain Mainnet is _NOT_ currently live and its official date is still pending.

# Migration Guide [​](https://docs.berachain.com/developers/guides/migration-guide#migration-guide)

This guide aims to capture high-level differences in Proof of Liquidity (PoL) contracts between the bArtio testnet and Berachain mainnet, with the aim of helping developers migrate their code to the new version.

## Contents [​](https://docs.berachain.com/developers/guides/migration-guide#contents)

-   [RewardVault.sol](https://docs.berachain.com/developers/guides/migration-guide#rewardvault-sol)
-   [BeraChef.sol](https://docs.berachain.com/developers/guides/migration-guide#berachef-sol)
-   [BeaconDeposit.sol](https://docs.berachain.com/developers/guides/migration-guide#beacondeposit-sol)

## Validator and Operator Relationship [​](https://docs.berachain.com/developers/guides/migration-guide#validator-and-operator-relationship)

-   The Validator and Operator relationship has been moved out of [BeraChef](https://docs.berachain.com/developers/contracts/berachef) and is now managed in the [BeaconDeposit](https://docs.berachain.com/developers/contracts/beacondeposit) contract
-   Validators are defined by a 48-byte public key ( `pubKey` in contracts), and have a corresponding `operator` address that is responsible for managing the PoL contract interactions and receiving rewards

## Contract Renaming [​](https://docs.berachain.com/developers/guides/migration-guide#contract-renaming)

The following contracts have been renamed:

diff

```
- BerachainRewardsVault.sol
+ RewardVault.sol

- BeaconDepositContract.sol
+ BeaconDeposit.sol
```

## RewardVault.sol [​](https://docs.berachain.com/developers/guides/migration-guide#rewardvault-sol)

Summary of changes made to the `RewardVault.sol` contract:

-   `notifyRewardAmount` now requires a `pubkey` instead of an `address`
-   `getReward` now requires a `recipient` parameter
-   `Incentive` tokens have a `manager` address. Only this address can add incentives.

### Reward Management [​](https://docs.berachain.com/developers/guides/migration-guide#reward-management)

#### getReward [​](https://docs.berachain.com/developers/guides/migration-guide#getreward)

The `getReward` function has been updated to include a `recipient` parameter, which enables BGT rewards to be claimed directly to a different address than the account holder.

diff

```
- function getReward(address account)
+ function getReward(address account, address recipient)
```

#### notifyRewardAmount [​](https://docs.berachain.com/developers/guides/migration-guide#notifyrewardamount)

diff

```
- function notifyRewardAmount(address coinbase, uint256 reward)
+ function notifyRewardAmount(bytes calldata pubkey, uint256 reward)
```

### Incentive Management [​](https://docs.berachain.com/developers/guides/migration-guide#incentive-management)

#### Incentive Struct [​](https://docs.berachain.com/developers/guides/migration-guide#incentive-struct)

The `Incentive` struct has been expanded to include a dedicated manager for each incentive token:

diff

```
struct Incentive {
    uint256 minIncentiveRate;
    uint256 incentiveRate;
    uint256 amountRemaining;
+   address manager;
}
```

#### Incentive Whitelisting [​](https://docs.berachain.com/developers/guides/migration-guide#incentive-whitelisting)

The whitelist function now requires a `manager` address to be specified. Only this address can call the `addIncentive` function for the token.

diff

```
function whitelistIncentiveToken(
    address token,
    uint256 minIncentiveRate,
+   address manager
)
```

The `manager` address can be changed through governance:

solidity

```
function updateIncentiveManager(
    address token,
    address newManager
) external onlyFactoryOwner onlyWhitelistedToken(token)
```

#### Events [​](https://docs.berachain.com/developers/guides/migration-guide#events)

Updated events include manager information:

diff

```
event IncentiveTokenWhitelisted(
    address token,
    uint256 minIncentiveRate,
+   address manager
);

+ event IncentiveManagerChanged(
+   address token,
+   address newManager,
+   address oldManager
);
```

## BeraChef.sol [​](https://docs.berachain.com/developers/guides/migration-guide#berachef-sol)

Summary of changes made to the `BeraChef.sol` contract:

-   Renamed `CuttingBoard` to `RewardAllocation` for clarity
-   Replaced `FriendOfTheChef` with `WhitelistedVault`

### Reward Allocation Management [​](https://docs.berachain.com/developers/guides/migration-guide#reward-allocation-management)

diff

```
- function queueNewCuttingBoard(
+ function queueNewRewardAllocation(
-   address valCoinbase,
+   bytes calldata valPubkey,
    uint64 startBlock,
    Weight[] calldata weights
)
```

### Reward Vault Whitelisting [​](https://docs.berachain.com/developers/guides/migration-guide#reward-vault-whitelisting)

Function signatures changed from `FriendOfTheChef` to `WhitelistedVault`, with addition of metadata:

diff

```
- function updateFriendsOfTheChef(address receiver, bool isFriend);
+ function setVaultWhitelistedStatus(address receiver, bool isWhitelisted, string memory metadata);

+ function updateWhitelistedVaultMetadata(address vault, string memory metadata);
```

### Storage Changes [​](https://docs.berachain.com/developers/guides/migration-guide#storage-changes)

diff

```
- mapping(address valCoinbase => CuttingBoard) internal activeCuttingBoards;
+ mapping(bytes valPubkey => RewardAllocation) internal activeRewardAllocations;

- mapping(address valCoinbase => CuttingBoard) internal queuedCuttingBoards;
+ mapping(bytes valPubkey => RewardAllocation) internal queuedRewardAllocations;

- mapping(address valCoinbase => address operator) internal validatorOperator;
// Removed - now uses BeaconDeposit for operator management

- mapping(address receiver => bool) public isFriendOfTheChef;
+ mapping(address receiver => bool) public isWhitelistedVault;
```

## BeaconDeposit.sol [​](https://docs.berachain.com/developers/guides/migration-guide#beacondeposit-sol)

Summary of changes made to the `BeaconDeposit.sol` contract:

-   Added operator management functionality including queueing and acceptance delays
-   Removed dependency on deposit authorization
-   Simplified deposit process with operator assignment on first deposit
-   Added genesis deposits root storage

### Deposits [​](https://docs.berachain.com/developers/guides/migration-guide#deposits)

The `deposit` function has been updated to manage operator assignment on initial deposit. Subsequent deposits must have the operator address as `address(0)`:

diff

```
function deposit(
    bytes calldata pubkey,
    bytes calldata credentials,
-   uint64 amount,
    bytes calldata signature,
+   address operator
)
```

### Operator Management [​](https://docs.berachain.com/developers/guides/migration-guide#operator-management)

New functions are provided for validators to manage their `operator` address. The process for changing operators is to first request the change, then accept the change, or cancel the change.

solidity

```
function requestOperatorChange(bytes calldata pubkey, address newOperator);

function cancelOperatorChange(bytes calldata pubkey);

function acceptOperatorChange(bytes calldata pubkey);
```

# Deploy Contract Using NextJS & WalletConnect [​](https://docs.berachain.com/developers/guides/deploy-contract-using-nextjs-walletconnect#deploy-contract-using-nextjs-walletconnect)

> See the full [GitHub Project Code Repository](https://github.com/berachain/guides/tree/main/apps/walletconnect-nextjs).

This developer guide will walk you through setting up a new NextJS web app, configuring the Berachain network details, setup basic wallet connection, and deploy your contract through a frontend with [WalletConnect](https://docs.walletconnect.com/).

## Requirements [​](https://docs.berachain.com/developers/guides/deploy-contract-using-nextjs-walletconnect#requirements)

Before beginning, make sure you have the following installed or setup on your computer before hand.

-   NVM or Node `v20.11.0`
-   `pnpm`, `yarn`, or `npm`
-   Wallet that contains `BERA` token _(for deployment)_ \- Check [Berachain Testnet Faucet](https://docs.berachain.com/learn/connect-to-berachain).

## Creating NextJS Project Code Setup [​](https://docs.berachain.com/developers/guides/deploy-contract-using-nextjs-walletconnect#creating-nextjs-project-code-setup)

Start by creating a new project folder for the project:

bash

```
npx create-next-app@latest;

# [Expected Prompts & Responses]:
# ✔ What is your project named? … walletconnect-nextjs
# ✔ Would you like to use TypeScript? … No / _Yes_
# ✔ Would you like to use ESLint? … No / _Yes_
# ✔ Would you like to use Tailwind CSS? … No / _Yes_
# ✔ Would you like to use `src/` directory? … _No_ / Yes
# ✔ Would you like to use App Router? (recommended) … No / _Yes_
# ✔ Would you like to customize the default import alias (@/*)? … _No_ / Yes
# Creating a new Next.js app in /path/to/walletconnect-nextjs.
#
# Using npm.
#
# Initializing project with template: app-tw
#
# ...
#
# Success! Created walletconnect-nextjs at /path/to/walletconnect-nextjs

cd walletconnect-nextjs;
```

## Adding Dependencies [​](https://docs.berachain.com/developers/guides/deploy-contract-using-nextjs-walletconnect#adding-dependencies)

bash

```
# FROM: ./walletconnect-nextjs

pnpm add @web3modal/wagmi wagmi viem @tanstack/react-query;
```

## Getting WalletConnect Project ID [​](https://docs.berachain.com/developers/guides/deploy-contract-using-nextjs-walletconnect#getting-walletconnect-project-id)

Got to [https://cloud.walletconnect.com/](https://cloud.walletconnect.com/), sign up for an account and create a new project to generate a **Project ID**.

We'll first need to create a new project.

![Guide Berachain WalletConnect Setup Project](https://docs.berachain.com/assets/guide-berachain-walletconnect-setup-project.png)

Add our project details.

![Guide Berachain WalletConnect Project Configuration](https://docs.berachain.com/assets/guide-berachain-walletconnect-project-config.png)

Get our project id.
