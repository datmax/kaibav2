import { ethers, providers } from 'ethers'
import uniswap from '../web3/uniswap'
import { useState, useEffect, useMemo } from 'react'
import erc20 from '../web3/erc20'

type token = {
  address: string
  decimals: number
  logo: String
  symbol: String
  name: String
}

const useSwap = (currentInput: token, currentOutput: token) => {
  const previewSwap = async (from: token, to: token, input: number) => {
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
      contract
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
        .then((res: any) => {
          res
            .wait()
            .then((confirm: any) => {
              return confirm
            })
            .catch((err: string) => {
              console.error(err)
              return new Error(err)
            })
        })
        .catch((err: string) => {
          console.error(err)
        })
    } else if (to.symbol == 'ETH') {
      const contract = new ethers.Contract(uniswap.address, uniswap.abi, signer)
      console.log(from, to, input, output, signer, addy)
      contract
        .swapExactTokensForETHSupportingFeeOnTransferTokens(
          input * Math.pow(10, from.decimals),
          0,
          [from.address, to.address],
          addy,
          Date.now() + 60 * 5
        )
        .then((res: any) => {
          res
            .wait()
            .then((confirm: any) => {
              return confirm
            })
            .catch((err: string) => {
              console.error(err)
              return new Error(err)
            })
        })
        .catch((err: string) => {
          console.error(err)
        })
    } else {
      const contract = new ethers.Contract(uniswap.address, uniswap.abi, signer)
      console.log(from, to, input, output, signer, addy)
      contract
        .swapExactTokensForTokensSupportingFeeOnTransferTokens(
          input * Math.pow(10, from.decimals),
          0,
          [from.address, to.address],
          addy,
          Date.now() + 60 * 5
        )
        .then((res: any) => {
          res
            .wait()
            .then((confirm: any) => {
              return confirm
            })
            .catch((err: string) => {
              console.error(err)
              return new Error(err)
            })
        })
        .catch((err: string) => {
          console.error(err)
        })
    }
  }

  return {
    previewSwap,
    swap,
  }
}

export default useSwap
