/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMinus } from 'react-icons/fi'
import staticTokens from '../web3/tokens'
import { fetchTokenData } from '../web3/web3Helper'

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

export default function SettingsModal({ open, setOpen, slippage, setSlippage, deadline, setDeadline, address }) {

  const slippageChangeHanlder = (e)=>{
    setSlippage(e.target.value)
  }

  const deadlineChangeHandler = (e)=>{
    setDeadline(e.target.value)
  }


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black  bg-opacity-95 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto text-white">
          <div className=" flex min-h-full justify-center p-4 text-center  sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <motion.div
                variants={variant}
                initial="initial"
                animate="animate"
                exit="exit"
                className=" w-full flex-row justify-center pt-20 font-thin md:w-1/2 lg:w-1/3 "
              >
                <Dialog.Panel>
                  <h1 className="mb-10 w-full py-4 text-center font-thin">
                   {address && address.slice(0,4) + "..." + address.slice(address.length - 4, address.length)}
                  </h1>
                  <h2 className='mb-10 text-main'>Settings</h2>
                  <AnimatePresence exitBeforeEnter>
                    <motion.div
                      className="grid grid-cols-1 gap-8"
                      variants={variant}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      
                      <div className="grid grid-cols-2">
                        <h1>Slippage: </h1>
                        <input
                          type="number"
                          className="bg-transparent font-thin text-white"
                          placeholder="amount"
                          value={slippage}
                          onChange={slippageChangeHanlder}
                        />
                      </div>
                      <div className="grid grid-cols-2">
                        <h1>Deadline: </h1>
                        <input
                          value={deadline}
                          type="number"
                          className="bg-transparent font-thin text-white"
                          placeholder="amount"
                          onChange={deadlineChangeHandler}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </Dialog.Panel>
              </motion.div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
