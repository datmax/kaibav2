import Head from 'next/head'
import Image from 'next/image'
import { FaCog, FaAngleDown } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useState, useEffect, useContext, useMemo } from 'react'
import SwapExchange from '../components/SwapExchange'
import SwapModal from '../components/SwapModal'
import LimitSwap from '../components/LimitSwap'
import MarketSwap from '../components/MarketSwap'
import { Web3Context } from '../context/web3Context'
import SettingsModal from '../components/SettingsModal'

import staticTokens from '../web3/tokens'
const Swap = () => {
  const { address, provider, balance, network } = useContext(Web3Context)

  const [input, setInput] = useState(staticTokens[1])
  const [output, setOutput] = useState(staticTokens[0])
  const [deadline, setDeadline] = useState(30)
  const [slippage, setSlippage] = useState(1)
  const [showTokenModal, setShowTokenModal] = useState(false)
  const [isBuying, setIsBuying] = useState(true)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [type, setType] = useState(0) //0: MARKET; 1:LIMIT
  const swapHandler = (newInput, newOutput) => {
    setInput(newInput)
    setOutput(newOutput)
  }

  useMemo(() => {
    const temp = output
    setOutput(input)
    setInput(temp)
  }, [isBuying])

  return (
    <>
      <SwapModal
        open={showTokenModal}
        setOpen={setShowTokenModal}
        onClose={swapHandler}
      ></SwapModal>
      <SettingsModal
        open={showSettingsModal}
        deadline={deadline}
        setDeadline={setDeadline}
        slippage={slippage}
        setSlippage={setSlippage}
        setOpen={setShowSettingsModal}
        address={address}
      ></SettingsModal>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-screen items-center justify-center  py-2"
      >
        <Head>
          <title>Kaibex: swap</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="md:1/2 relative z-10  w-full font-thin text-white sm:w-4/5 lg:w-1/3">
          <svg
            className="absolute -bottom-8 -left-4 -z-10"
            width="70"
            height="69"
            viewBox="0 0 70 69"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.999994 5.98846e-06L0.999998 43L26 68L69.5 68"
              stroke="white"
              stroke-width="2"
            />
          </svg>
          <svg
            className="absolute -right-4 -top-4 -z-10"
            width="70"
            height="69"
            viewBox="0 0 70 69"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M68.5 69L68.5 26L43.5 1L0 1"
              stroke="white"
              stroke-width="2"
            />
          </svg>

          <div className="grid grid-cols-1 gap-y-4 px-4 py-2">
            <div className="grid grid-cols-2">
              <div className="">
                <div className="flex">
                  <div
                    className="flex items-center  hover:cursor-pointer"
                    onClick={() => setShowTokenModal(true)}
                  >
                    <img
                      src={input.logo}
                      width="40"
                      alt=""
                      className="relative rounded-full "
                    />
                    <img
                      src={output.logo}
                      width="20"
                      alt=""
                      className="absolute left-2 top-2  -z-10 rounded-full "
                    />

                    <p className="pl-2 text-lg sm:text-2xl">
                      {input.symbol} / {output.symbol}
                    </p>
                    <span>
                      <FaAngleDown className="pl-2"></FaAngleDown>
                    </span>
                  </div>
                </div>
              </div>
              <motion.div className="flex items-center justify-end">
                <motion.div
                  onClick={() => setShowSettingsModal(true)}
                  whileHover={{ rotateZ: 360 }}
                  className="hover:cursor-pointer"
                >
                  <FaCog></FaCog>
                </motion.div>
              </motion.div>
            </div>

            <div className="rounded-lg bg-shadeblack ">
              <div className="grid grid-cols-2 gap-2 text-xl font-thin">
                <button
                  className={
                    isBuying ? 'rounded-md bg-main  py-1' : 'rounded-md  py-1'
                  }
                  onClick={() => setIsBuying(true)}
                >
                  Buy
                </button>
                <button
                  className={
                    isBuying ? 'rounded-md   py-1' : 'rounded-md bg-error  py-1'
                  }
                  onClick={() => setIsBuying(false)}
                >
                  Sell
                </button>
              </div>
            </div>
            <div className="flex gap-x-8 ">
              <span className="border-b-2 border-main">Market</span>
              <span>Limit</span>
            </div>
          </div>
          <MarketSwap
            input={input}
            output={output}
            type={type}
            balance={balance}
            deadline={deadline}
            slippage={slippage}
          ></MarketSwap>
        </div>
      </motion.div>
    </>
  )
}

export default Swap
