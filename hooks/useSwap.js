import { ethers } from 'ethers'
import uniswap from '../web3/uniswap'
function useSwap() {
  const previewSwap = async (from, to, input) => {
    const provider = new ethers.providers.StaticJsonRpcProvider(
      'https://mainnet.infura.io/v3/9ed182e6c7b44c5fa80bd8c3b3779a6f'
    )
    const contract = new ethers.Contract(uniswap.address, uniswap.abi, provider)
    const inputFormatted = BigInt(input * Math.pow(10, from.decimals))
    try {
      const output = await contract.getAmountsOut(inputFormatted, [
        from.address,
        to.address,
      ])
      console.log(output)
      return (output[1] / Math.pow(10, to.decimals)).toFixed(2)
    } catch (err) {
      throw new Error(err)
    }
  }

  return {
    previewSwap,
  }
}

export default useSwap
