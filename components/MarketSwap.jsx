import { motion } from 'framer-motion'
import { useState, useEffect, useContext } from 'react'

import { Web3Context } from '../context/web3Context'
import useSwap from '../hooks/useSwap'
import { getTokenBalance } from '../web3/web3Helper'

function MarketSwap({ input, output, type }) {
  const { balance, address, network, provider } = useContext(Web3Context)

  const [inputAmount, setInputAmount] = useState(0)
  const [outputAmount, setOutputAmount] = useState('0')
  const [inputBalance, setInputBalance] = useState(0)
  const [outputBalance, setOutputBalance] = useState(0)

  const { previewSwap, swap } = useSwap(input, output)

  //------BALANCE UPDATES------//
  useEffect(async () => {
    if (address) {
      if (input.symbol == 'ETH') {
        setInputBalance(balance)
      } else {
        getTokenBalance(input, address).then((res) => {
          setInputBalance(res)
        })
      }
    }
  }, [input, address, balance])

  useEffect(async () => {
    clearFields()   
    if (address) {
      if (output.symbol == 'ETH') {
        setOutputBalance(balance)
      }
      getTokenBalance(output, address).then((res) => {
        console.log(res)
      })
    }
  }, [output, address, balance])
  //---------------------------//

  useEffect(() => {
    if (inputAmount == 0) {
      setOutputAmount(0)
    } else {
      setOutputAmount('...')
      previewSwap(input, output, inputAmount)
        .then((res) => {
          console.log(res)
          setOutputAmount(res)
        })
        .catch((err) => setOutputAmount(0))
    }
  }, [inputAmount])

  const inputAmountHandler = (e) => {
    setInputAmount(e.target.value)
  }

  const clearFields = () => {
    setInputAmount(0)
    setOutputAmount(0)
  }

  const confirmSwap = async () => {
    if (network == 1) {
      const signer = await provider.getSigner()
      try {
        const success = swap(
          input,
          output,
          inputAmount,
          outputAmount,
          signer,
          address
        )
        console.log(success)
      } catch (err) {
        console.error(err)
      }
    }
  }

  useEffect(() => {}, [type])

  return (
    <div className="grid grid-cols-1 gap-y-4 px-4 py-2">
      <div className="px-2">
        <p>From({input.symbol})</p>
      </div>
      <input
        type="number"
        step="0.001"
        className=" -mt-2 rounded-lg bg-shadeblack px-2  py-4 font-thin active:outline-none active:ring-0"
        placeholder="enter an amount."
        value={inputAmount}
        onChange={inputAmountHandler}
      />
      <input
        type="range"
        min="0"
        max="100"
        className="mx-2 -mt-1 h-0.5 appearance-none rounded-lg bg-white outline-none focus:bg-white focus:ring-0"
      />
      <div className="mx-2 -mt-1 flex justify-between font-thin opacity-50">
        <p className="text-left">0</p>
        <p className="text-right">max</p>
      </div>

      <p className="px-2">To({output.symbol})</p>
      <input
        type="number"
        disabled
        className="-mt-2 bg-shadeblack px-2 py-4 font-thin active:outline-none active:ring-0"
        placeholder="Total"
        value={outputAmount}
      />

      <p className="-mt-4 px-2 opacity-50">
        Available balance: {address ? inputBalance : 0}
      </p>
      <p className="-mt-4 px-2 opacity-80">50$ saved </p>
      <motion.button
        whileHover={{
          backgroundColor: '#08D4B0',
          transition: { duration: 0.3 },
        }}
        className="rounded-lg bg-white px-2 py-2 text-center text-xl font-thin text-black"
        onClick={confirmSwap}
      >
        swap
      </motion.button>
    </div>
  )
}

export default MarketSwap
