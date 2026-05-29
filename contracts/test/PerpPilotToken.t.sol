// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {PerpPilotToken} from "../src/PerpPilotToken.sol";

contract PerpPilotTokenTest is Test {
    PerpPilotToken internal token;
    address internal user = makeAddr("user");

    uint256 internal constant MAX_MINT = 1_000 ether;

    function setUp() public {
        token = new PerpPilotToken();
    }

    function test_metadata() public view {
        assertEq(token.name(), "PerpPilot Token");
        assertEq(token.symbol(), "PPT");
        assertEq(token.decimals(), 18);
        assertEq(token.totalSupply(), 0);
    }

    function test_mintWithinLimit() public {
        vm.prank(user);
        token.mint(500 ether);

        assertEq(token.balanceOf(user), 500 ether);
        assertEq(token.totalSupply(), 500 ether);
    }

    function test_mintMaxAmount() public {
        vm.prank(user);
        token.mint(MAX_MINT);

        assertEq(token.balanceOf(user), MAX_MINT);
    }

    function test_revertMintZeroAmount() public {
        vm.prank(user);
        vm.expectRevert(PerpPilotToken.InvalidMintAmount.selector);
        token.mint(0);
    }

    function test_revertMintAboveMax() public {
        vm.prank(user);
        vm.expectRevert(PerpPilotToken.InvalidMintAmount.selector);
        token.mint(MAX_MINT + 1);
    }

    function test_revertMintDuringCooldown() public {
        vm.startPrank(user);
        token.mint(100 ether);

        vm.expectRevert(
            abi.encodeWithSelector(
                PerpPilotToken.MintCooldownActive.selector,
                token.MINT_COOLDOWN()
            )
        );
        token.mint(100 ether);
        vm.stopPrank();
    }

    function test_mintAfterCooldown() public {
        vm.startPrank(user);
        token.mint(100 ether);

        vm.warp(block.timestamp + token.MINT_COOLDOWN());
        token.mint(200 ether);
        vm.stopPrank();

        assertEq(token.balanceOf(user), 300 ether);
    }

    function test_mintCooldownRemaining() public {
        assertEq(token.mintCooldownRemaining(user), 0);

        vm.prank(user);
        token.mint(100 ether);

        assertEq(token.mintCooldownRemaining(user), token.MINT_COOLDOWN());

        vm.warp(block.timestamp + token.MINT_COOLDOWN());
        assertEq(token.mintCooldownRemaining(user), 0);
    }

    function test_emitFaucetMintEvent() public {
        vm.expectEmit(true, false, false, true);
        emit PerpPilotToken.FaucetMint(user, 250 ether, block.timestamp);

        vm.prank(user);
        token.mint(250 ether);
    }
}
