import { ethers, providers } from 'ethers'
import uniswap from '../web3/uniswap'
import { useState, useEffect, useMemo } from 'react'
import erc20 from '../web3/erc20'
import toast from 'react-hot-toast'
const bigNumber =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935'

type token = {
  address: string
  decimals: number
  logo: String
  symbol: String
  name: String
}

const estimateGas = async (
  from: token,
  to: token,
  input: number,
  output: number,
  signer: any,
  addy: String
) => {
  if (from.symbol == 'ETH') {
    const contract = new ethers.Contract(uniswap.address, uniswap.abi, signer)
    console.log(from, to, input, output, signer, addy)
    contract.callStatic
      .swapExactETHForTokensSupportingFeeOnTransferTokens(
        //output * Math.pow(10, to.decimals),
        0,
        [from.address, to.address],
        addy,
        Date.now() + 60 * 5,
        {
          value: BigInt(input * Math.pow(10, 18)),
        }
      )
      .then((res) => {
        res.wait().then((res: any) => {
          console.log(res)
        })
      })
  } else if (to.symbol == 'ETH') {
    const contract = new ethers.Contract(uniswap.address, uniswap.abi, signer)
    console.log(from, to, input, output, signer, addy)
    contract.callStatic
      .swapExactTokensForETHSupportingFeeOnTransferTokens(
        input * Math.pow(10, from.decimals),
        0,
        [from.address, to.address],
        addy,
        Date.now() + 60 * 5
      )
      .then((res) => {
        console.log(res)
      })
  } else {
    const contract = new ethers.Contract(uniswap.address, uniswap.abi, signer)
    console.log(from, to, input, output, signer, addy)
    contract.callStatic
      .swapExactTokensForTokensSupportingFeeOnTransferTokens(
        input * Math.pow(10, from.decimals),
        0,
        [from.address, to.address],
        addy,
        Date.now() + 60 * 5
      )
      .then((res) => {
        res.wait().then((res: any) => {
          console.log(res)
        })
      })
  }
}

const useSwap = (currentInput: token, currentOutput: token) => {
  const checkAllowance = async (address: string, tokenAddress: string) => {
    const provider = new ethers.providers.StaticJsonRpcProvider(
      'https://mainnet.infura.io/v3/9ed182e6c7b44c5fa80bd8c3b3779a6f'
    )
    const contract = new ethers.Contract(tokenAddress, erc20, provider)
    const allowance = await contract.allowance(address, uniswap.address)
    const res = (await allowance) / 1
    return res
  }

  const approve = async (
    tokenAddress: string,
    signer: any
  ) => {
    const contract = new ethers.Contract(tokenAddress, erc20, signer)
    return contract.approve(uniswap.address, bigNumber)
  }

  const deposit = async () => {}

  const previewSwap = async (
    from: token,
    to: token,
    input: number,
    output: number,
    prov: any,
    addy: any
  ) => {
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
    } catch (error) {
      throw new Error('Error during the preview')
    }
  }

  const approved = async (address: string, token: token) => {
    if (token.symbol != 'ETH') {
      return true
    } else {
      const provider = new ethers.providers.StaticJsonRpcProvider(
        'https://mainnet.infura.io/v3/9ed182e6c7b44c5fa80bd8c3b3779a6f'
      )
      const contract = new ethers.Contract(token.address, erc20, provider)
      const allowance = await contract.allowance()
      if (allowance / 1 > 0) return true
      else return false
    }
  }

  const swap = async (
    from: token,
    to: token,
    input: number,
    output: number,
    signer: any,
    addy: String
  ) => {
    if (from.symbol == 'ETH') {
      const contract = new ethers.Contract(uniswap.address, uniswap.abi, signer)
      console.log(from, to, input, output, signer, addy)
      return contract.swapExactETHForTokensSupportingFeeOnTransferTokens(
        output * Math.pow(10, to.decimals),
        //0,
        [from.address, to.address],
        addy,
        Date.now() + 60 * 5,
        {
          value: BigInt(input * Math.pow(10, 18)),
        }
      )
    } else if (to.symbol == 'ETH') {
      const contract = new ethers.Contract(uniswap.address, uniswap.abi, signer)
      console.log(from, to, input, output, signer, addy)
      return contract.swapExactTokensForETHSupportingFeeOnTransferTokens(
        input * Math.pow(10, from.decimals),
        output * Math.pow(10, to.decimals),

        [from.address, to.address],
        addy,
        Date.now() + 60 * 5
      )
    } else {
      const contract = new ethers.Contract(uniswap.address, uniswap.abi, signer)
      console.log(from, to, input, output, signer, addy)
      return contract.swapExactTokensForTokensSupportingFeeOnTransferTokens(
        input * Math.pow(10, from.decimals),
        output * Math.pow(10, to.decimals),

        [from.address, to.address],
        addy,
        Date.now() + 60 * 5
      )
    }
  }

  return {
    previewSwap,
    swap,
    checkAllowance,
    approve,
    approved
  }
}

export default useSwap
