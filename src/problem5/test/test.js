const ethers = require("ethers");
const { abi } = require("../build/contracts/Reader.json");

const ADDR = "0x4ce99954673B7026F6C560FED9eBde64ecFB8c90";   // your contract address
const ABI = [abi];    // your contract ABI

const ADDRESS = "0x13F3bB32Fe57bF4c4434b2cF426995044123EAE4"; // some wallet address with token balance
const TOKENS = [];

// you can use your own RPC provider url (no need to deploy to mainnet)
const provider = ethers.providers.getDefaultProvider('kovan');

const test = async () => {
	const contract = new ethers.Contract(ADDR, ABI, provider);

	const balances = await contract.getBalances(ADDRESS, TOKENS);

    // return in expected struct
	return balances.map(bal => {
        return {
            token: bal.token,
            balance: bal.balance
        }
    });

};

test().then(console.log);