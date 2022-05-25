import Head from 'next/head'
import Image from 'next/image'
import { FaCog, FaAngleDown } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useState, useEffect, useContext } from 'react'
import SwapExchange from '../components/SwapExchange'
import SwapModal from '../components/SwapModal'
import LimitSwap from '../components/LimitSwap'
import MarketSwap from '../components/MarketSwap'
import { Web3Context } from '../context/web3Context'

import tokens from '../web3/tokens'
const Swap = () => {
  const { address, provider, balance, network } = useContext(Web3Context)
  const [input, setInput] = useState(tokens[0])
  const [output, setOutput] = useState(tokens[1])
  const [showTokenModal, setShowTokenModal] = useState(false)
  const [type, setType] = useState(0) //0: MARKET; 1:LIMIT
  const swapHandler = (newInput, newOutput) => {
    console.log('miao')
    setInput(newInput)
    setOutput(newOutput)
  }

  return (
    <>
      <SwapModal
        open={showTokenModal}
        setOpen={setShowTokenModal}
        onClose={swapHandler}
      ></SwapModal>
      <div className="flex min-h-screen items-center justify-center  py-2">
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
                      src="kaiba-logo-white.png"
                      width="36"
                      alt=""
                      className="relative rounded-full border border-white"
                    />
                    <img
                      src="kaiba-logo-white.png"
                      width="20"
                      alt=""
                      className="absolute left-2 top-1  -z-10 rounded-full border border-white"
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
                  whileHover={{ rotateZ: 360 }}
                  className="hover:cursor-pointer"
                >
                  <FaCog></FaCog>
                </motion.div>
              </motion.div>
            </div>

            <div className="rounded-lg bg-shadeblack ">
              <div className="grid grid-cols-2 gap-2 text-xl font-thin">
                <button className="rounded-md bg-main py-1">Buy</button>
                <button className=" rounded-md py-1">Sell</button>
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
          ></MarketSwap>
        </div>
      </div>
    </>
  )
}

export default Swap
