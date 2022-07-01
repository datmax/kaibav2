import { ethers } from 'ethers'
import erc20 from '../erc20'
const empty = '0x0000000000000000000000000000000000000000'

const url = 'https://klc.live'

export async function getPriceByAddress(address) {
  
}

export async function getUltraPair(token0, token1) {
  
}

export async function changeNetwork() {
  window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0x68' }],
  })
}

export async function addToken(address) {
  
}

export async function getTokenBalance(token, address) {
  const provider = new ethers.providers.StaticJsonRpcProvider(url)
  const contract = new ethers.Contract(token.address, erc20, provider)
  console.log(token)
  const balance = await contract.balanceOf(address)
  return balance / Math.pow(10, token.decimals)
}

export async function fetchTokenData(address) {
    var symbol;
    var image;
    const contract = new ethers.Contract(address, erc20, provider)
    const decimals = await contract.decimals()
    return {
      symbol: symbol,
      decimals: decimals,
      address: address,
      logo: image,
    }
}
