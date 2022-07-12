// SPDX-License-Identifier: MIT

pragma solidity >=0.4.0;
pragma experimental ABIEncoderV2;

interface ERC20Basic {
    function balanceOf(address tokenOwner) external view returns (uint256);
}

contract Reader {

    struct TokenBalance {
        address token;
        uint256 balance;
    }

    // EVM stores info in 3 places -- storage, memory, stack
    // storage:     every contract has its own storage; persists between function calls; expensive
    // memory:      temporary; no persistance between function calls; inexpensive
    // stack:       holds small local variables; very cheap but has limited space
    
    // since this is a one-time use function, we can store the results in memory 
    function getBalances(address walletAddress, address[] memory tokens) public view returns (TokenBalance[] memory) {
            TokenBalance[] memory res = new TokenBalance[](tokens.length);
            for (uint i = 0; i < tokens.length; i++) {
                res[i] = TokenBalance(
                    tokens[i], 
                    ERC20Basic(tokens[i]).balanceOf(walletAddress)
                );
            }
            return res;
    }
}