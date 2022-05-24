import { AnimatePresence, motion } from 'framer-motion'
import { ethers } from 'ethers'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'

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

export default function SwapExchange({
  show,
  setShow,
  currentInput,
  currentOutput,
}) {
  const [newInput, setNewInput] = useState(null)
  const [newOutput, setNewOutput] = useState(null)
  return (
    <div onClose={() => setShow(false)}>
      <AnimatePresence>
        {show && (
          <motion.div
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className=" fixed inset-0  flex min-h-screen w-full  bg-black bg-opacity-90 text-white"
          >
           
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
