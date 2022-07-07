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