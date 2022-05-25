import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

import useSwap from '../hooks/useSwap'

function MarketSwap({ input, output, type, balance }) {
  const [inputAmount, setInputAmount] = useState(0)
  const [outputAmount, setOutputAmount] = useState('0')

  const { previewSwap } = useSwap()
  const inputAmountHandler = (e) => {
    const stripped = parseFloat(e.target.value, 10)
    console.log(BigInt(e.target.value).toString())
    setInputAmount(e.target.value)
  }

  useEffect(() => {}, [type])

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

  return (
    <div className="grid grid-cols-1 gap-y-4 px-4 py-2">
      <div className="px-2">
        <p>From({input.symbol})</p>
      </div>
      <input
        type="number"
        className=" -mt-2 rounded-lg bg-shadeblack px-2  py-4 font-thin active:outline-none active:ring-0"
        placeholder="enter an amount."
        value={BigInt(inputAmount).toString()}
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
        Available balance: {balance ? balance : 0} ETH
      </p>
      <p className="-mt-4 px-2 opacity-80">50$ saved </p>
      <motion.button
        whileHover={{
          backgroundColor: '#08D4B0',
          transition: { duration: 0.3 },
        }}
        className="rounded-lg bg-white px-2 py-2 text-center text-xl font-thin text-black"
      >
        swap
      </motion.button>
    </div>
  )
}

export default MarketSwap
