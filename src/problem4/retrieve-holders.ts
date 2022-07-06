import { ethers } from "ethers";

/*
    output should be:
        0x123d475e13aa54a43a7421d94caa4459da021c77 99,888,874.62734227
        0x0020c5222a24e4a96b720c06b803fb8d34adc0af 7,970,573.69197209
        0xfe808b079187cc460f47374580f5fb47c82b87a5 2,894,918.96152958

    ref:
        https://www.youtube.com/watch?v=yk7nVp5HTCk
 */

const swthAddr: string = "0x250b211ee44459dad5cd3bca803dd6a7ecb5d46c"
const addresses: string[] = [
    "0x123d475e13aa54a43a7421d94caa4459da021c77",
    "0x0020c5222a24e4a96b720c06b803fb8d34adc0af",
    "0xfe808b079187cc460f47374580f5fb47c82b87a5"
]
const provider = new ethers.providers.JsonRpcProvider(`https://bsc-dataseed.binance.org/`)
const ABI = [
    "function balanceOf(address) view returns (uint256)"
]

const contract = new ethers.Contract(swthAddr, ABI, provider);

// @ts-ignore
const main = async () => {
    for (const addr of addresses) {
        const balance = await contract.balanceOf(addr);
        console.log(`${addr} ${ethers.utils.formatEther(balance)}`)
    }
}

main()