// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {PerpPilotToken} from "../src/PerpPilotToken.sol";

contract PerpPilotTokenTest is Test {
    PerpPilotToken internal token;
    address internal owner = makeAddr("owner");

    function setUp() public {
        token = new PerpPilotToken(owner);
    }

    function test_initialSupplyMintedToOwner() public view {
        assertEq(token.balanceOf(owner), 1_000_000 ether);
        assertEq(token.totalSupply(), 1_000_000 ether);
    }

    function test_ownerCanMint() public {
        address recipient = makeAddr("recipient");

        vm.prank(owner);
        token.mint(recipient, 100 ether);

        assertEq(token.balanceOf(recipient), 100 ether);
    }
}
