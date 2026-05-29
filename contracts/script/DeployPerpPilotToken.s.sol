// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {PerpPilotToken} from "../src/PerpPilotToken.sol";

contract DeployPerpPilotToken is Script {
    function run() external returns (PerpPilotToken token) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);

        token = new PerpPilotToken(deployer);

        vm.stopBroadcast();

        console2.log("PerpPilotToken deployed at:", address(token));
        console2.log("Owner:", deployer);
    }
}
