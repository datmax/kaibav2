import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import DepositModal from './DepositModal'
export default function FarmUnit({ infos, apy, name, icon }) {
  const [depositModal, setDepositModal] = useState(false)

  return (
    <>
      <DepositModal
        open={depositModal}
        setOpen={setDepositModal}
      ></DepositModal>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        className="md:1/2 relative z-10 mx-auto   w-full  font-thin text-white hover:cursor-pointer sm:w-4/5 lg:w-1/3"
      >
        <svg
          className="absolute -bottom-8 -left-4 -z-10"
          width="30"
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
          className="absolute -right-4 -top-8 -z-10"
          width="30"
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
        <div className="flex flex-row-reverse">
          <div className="h-3 w-3 rounded-full bg-main"></div>
        </div>
        <div className="mt-4 grid w-full grid-cols-1 gap-4 px-4 py-4 text-center">
          <div className="flex justify-center">
            <img src={icon} className="w-1/3 rounded-full " alt="" />
          </div>
          <div className="pt-4 text-center text-xl text-white">{name}</div>
          <div className="tex-center pt-4 text-main">{apy}</div>
          <motion.button
            whileHover={{ backgroundColor: '#08D4B0', color: 'white' }}
            className="rounded-md bg-white py-2 font-light text-black"
            onClick={() => setDepositModal(true)}
          >
            deposit
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}
