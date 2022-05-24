import Head from 'next/head'
import Image from 'next/image'
import { FaCog, FaAngleDown } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import SwapExchange from '../components/SwapExchange'
import SwapModal from '../components/SwapModal'

const Swap = () => {
  const [input, setInput] = useState(null)
  const [output, setOutput] = useState(null)
  const [showTokenModal, setShowTokenModal] = useState(false)

  return (
    <>
      <SwapModal open={showTokenModal} setOpen={setShowTokenModal}></SwapModal>
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
                <div className="flex  ">
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

                    <p className="pl-2 text-lg sm:text-2xl">KAIBA / ETH</p>
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
              <span className="border-b-2 border-main  ">Limit</span>
              <span>Market</span>
            </div>
            <div>
              <p className="w-full">Price(ETH)</p>
            </div>
            <div className="-mt-2 flex flex-row items-center rounded-lg bg-shadeblack  px-2">
              <input
                type="number"
                className=" basis-3/5 bg-transparent py-2 font-thin active:outline-none active:ring-0 "
                placeholder="amount"
              />
              <div className="mr-2 basis-2/5 text-right opacity-50">$380</div>
            </div>
            <div className="px-2">
              <p>Amount(KAIBA)</p>
            </div>
            <input
              type="number"
              className=" -mt-2 rounded-lg bg-shadeblack px-2  py-4 font-thin active:outline-none active:ring-0"
              placeholder="enter an amount."
            />
            <p className="px-2">Total(ETH)</p>

            <input
              type="number"
              className="-mt-2 bg-shadeblack px-2 py-4 font-thin active:outline-none active:ring-0"
              placeholder="Total"
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
            <p className="-mt-4 px-2 opacity-50">Available balance: 3 ETH</p>
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
        </div>
      </div>
    </>
  )
}

export default Swap
