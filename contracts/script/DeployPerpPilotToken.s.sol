// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {PerpPilotToken} from "../src/PerpPilotToken.sol";

contract DeployPerpPilotToken is Script {
    function run() external returns (PerpPilotToken token) {
        uint256 deployerPrivateKey = _loadPrivateKey();

        vm.startBroadcast(deployerPrivateKey);

        token = new PerpPilotToken();

        vm.stopBroadcast();

        console2.log("PerpPilotToken (PPT) deployed at:", address(token));
        console2.log("Max mint amount:", token.MAX_MINT_AMOUNT());
        console2.log("Mint cooldown (seconds):", token.MINT_COOLDOWN());
    }

    /// @dev Accepts PRIVATE_KEY with or without "0x" prefix.
    function _loadPrivateKey() internal view returns (uint256) {
        string memory raw = vm.envString("PRIVATE_KEY");
        bytes memory rawBytes = bytes(raw);
        require(rawBytes.length > 0, "PRIVATE_KEY is not set");

        if (rawBytes.length >= 2 && rawBytes[0] == 0x30 && rawBytes[1] == 0x78) {
            return vm.parseUint(raw);
        }

        return vm.parseUint(string.concat("0x", raw));
    }
}
