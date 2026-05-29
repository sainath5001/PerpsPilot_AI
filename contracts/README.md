# PerpPilot Contracts (Foundry)

## Setup

```bash
cd contracts
forge install OpenZeppelin/openzeppelin-contracts --no-commit
cp .env.example .env
```

## Test

```bash
forge test -vv
```

## Deploy to Sepolia

Load env vars first, then deploy:

```bash
cd contracts
source .env

# Confirm RPC points to Sepolia (URL should contain "sepolia")
echo $SEPOLIA_RPC_URL

forge script script/DeployPerpPilotToken.s.sol:DeployPerpPilotToken \
  --rpc-url $SEPOLIA_RPC_URL \
  --chain sepolia \
  --broadcast
```

`PRIVATE_KEY` works with or without the `0x` prefix.

**Important:** Always use `--chain sepolia`. Without it, Foundry may broadcast to mainnet (chain 1) and fail with insufficient funds.

### Sepolia test ETH

Your deployer wallet needs Sepolia ETH (not mainnet ETH):

- [Alchemy Sepolia Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Google Cloud Sepolia Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)

## Deploy (without verification)

```bash
source .env

forge script script/DeployPerpPilotToken.s.sol:DeployPerpPilotToken \
  --rpc-url $SEPOLIA_RPC_URL \
  --chain sepolia \
  --broadcast
```

## Verify on Etherscan

Replace `<CONTRACT_ADDRESS>` with the deployed address:

```bash
source .env

forge verify-contract \
  <CONTRACT_ADDRESS> \
  src/PerpPilotToken.sol:PerpPilotToken \
  --chain sepolia \
  --etherscan-api-key $ETHERSCAN_API_KEY \
  --watch
```

## Frontend Configuration

After deployment, set the token address in `frontend/.env.local`:

```bash
NEXT_PUBLIC_PPT_TOKEN_ADDRESS=<CONTRACT_ADDRESS>
```

## Contract Overview

| Constant | Value |
| --- | --- |
| Name | PerpPilot Token |
| Symbol | PPT |
| Max mint per tx | 1,000 PPT |
| Cooldown | 5 minutes |

`mint(uint256 amount)` — public faucet mint to `msg.sender`.
