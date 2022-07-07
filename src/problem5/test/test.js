const ethers = require("ethers");
const { abi } = require("../build/contracts/Reader.json");
require('dotenv').config();


const ADDR = "0x6B175474E89094C44Da98b954EedeAC495271d0F";   // your contract address
const ABI = [abi];    // your contract ABI

const ADDRESS = "0x6c6Bc977E13Df9b0de53b251522280BB72383700"; // some wallet address with token balance
const TOKENS = [
    "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359"
];

// you can use your own RPC provider url (no need to deploy to mainnet)
// const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_ID}`);
const provider = new ethers.providers.getDefaultProvider('ropsten')

const main = async () => {
	const contract = new ethers.Contract(ADDR, ABI, provider);
	const balances = await contract.getBalances(ADDRESS, TOKENS);

    // return in expected struct
	balances.map(bal => {
        return {
            token: bal.token,
            balance: bal.balance
        }
    });

	console.log(balances)
};

main()