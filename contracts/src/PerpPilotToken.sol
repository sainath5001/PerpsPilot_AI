// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title PerpPilotToken
/// @notice Faucet-style ERC20 for PerpPilot AI portfolio and risk simulation on Sepolia.
contract PerpPilotToken is ERC20 {
    uint256 public constant MAX_MINT_AMOUNT = 1_000 ether;
    uint256 public constant MINT_COOLDOWN = 5 minutes;

    mapping(address => uint256) public lastMintTime;

    event FaucetMint(address indexed account, uint256 amount, uint256 timestamp);

    error InvalidMintAmount();
    error MintCooldownActive(uint256 secondsRemaining);

    constructor() ERC20("PerpPilot Token", "PPT") {}

    /// @notice Mint PPT tokens to the caller (faucet).
    /// @param amount Amount of tokens to mint (max 1,000 PPT per transaction).
    function mint(uint256 amount) external {
        if (amount == 0 || amount > MAX_MINT_AMOUNT) {
            revert InvalidMintAmount();
        }

        uint256 unlockTime = lastMintTime[msg.sender] + MINT_COOLDOWN;
        if (lastMintTime[msg.sender] != 0 && block.timestamp < unlockTime) {
            revert MintCooldownActive(unlockTime - block.timestamp);
        }

        lastMintTime[msg.sender] = block.timestamp;
        _mint(msg.sender, amount);

        emit FaucetMint(msg.sender, amount, block.timestamp);
    }

    /// @notice Returns seconds until the caller can mint again (0 if ready).
    function mintCooldownRemaining(address account) external view returns (uint256) {
        uint256 last = lastMintTime[account];
        if (last == 0) return 0;

        uint256 unlockTime = last + MINT_COOLDOWN;
        if (block.timestamp >= unlockTime) return 0;

        return unlockTime - block.timestamp;
    }
}
