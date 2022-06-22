import { AnimatePresence, motion } from 'framer-motion'
import { ethers } from 'ethers'
import { useContext } from 'react'
import { Web3Context } from '../context/web3Context'

import Link from 'next/link'
const links = [
  { name: 'Swap', href: '/' },
  { name: 'Farms', href: '/farms' },
]

const variant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    paddingLeft: 20,
    transition: {
      duration: 0.2,
    },
  },
}

const linkAnimation = {
  x: 20,
}

export default function Menu({ show, setShow }) {
  const { address, balance } = useContext(Web3Context)
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="min-w-screen fixed inset-0 z-20 flex min-h-screen justify-center bg-black bg-opacity-90 text-white"
          onClick={() => setShow(false)}
        >
          <motion.div
            variants={variant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative pt-20 font-thin"
          >
            <h1 className="w-full text-center font-thin">
              {balance && balance + "ETH"} 
            </h1>
            <h1 className="mb-20 w-full py-4 text-center font-thin">
              {address &&
                address.slice(0, 4) +
                  '...' +
                  address.slice(address.length - 4, address.length)}
            </h1>
            <div>
              <svg
                className="absolute -left-20 "
                width="72"
                height="265"
                viewBox="0 0 72 265"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L35.5 35.5V229L71 264.5" stroke="#08D4B0" />
              </svg>

              {links.map((el, index) => (
                <Link href={el.href}>
                  <a>
                    <motion.h1
                      className=" hover:curs w-full py-6 text-center font-thin hover:text-main"
                      whileHover={linkAnimation}
                    >
                      {el.name}
                    </motion.h1>
                  </a>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
