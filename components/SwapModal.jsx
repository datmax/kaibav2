/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMinus } from 'react-icons/fi'
import staticTokens from '../web3/tokens'
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

const tokensVariant = {
  initial: {
    opacity: 0,
    x: 200,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.1,
      staggerChildren: 0.01,
    },
  },
  exit: {
    opacity: 0.3,
    x: -200,
    transition: {
      duration: 0.2,
    },
  },
}

const linkAnimation = {
  x: 20,
}

function Input({
  onChangeInput,
  onNextStep,
  onSearch,
  search,
  searching,
  res,
  tokens,
}) {
  const [current, setCurrent] = useState(null)
  console.log(res, res.error == undefined)
  return (
    <AnimatePresence>
      <div>
        <div className="flex flex-row items-center justify-center px-8">
          <div className=" basis-1/3"></div>
          <div className="flex basis-1/3 justify-center ">Input</div>
          <div className="flex basis-1/3 justify-end">
            <svg
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={onNextStep}
            >
              <path
                d="M1.8032 14.934L1.80131 14.9321L0.697792 13.8286C0.433019 13.5638 0.435752 13.1397 0.695901 12.8823L0.697792 12.8804L5.40482 8.17338L5.75838 7.81982L5.40482 7.46627L0.697792 2.75924C0.433019 2.49447 0.435752 2.07033 0.695896 1.81296L0.695921 1.81298L0.700125 1.80872L1.79744 0.696779C2.06228 0.433026 2.48566 0.436084 2.74271 0.695896L2.74459 0.697792L9.38521 7.33842L9.38709 7.34028C9.65352 7.60391 9.6535 8.02807 9.3901 8.29147L2.74947 14.9321C2.4847 15.1969 2.06057 15.1941 1.8032 14.934ZM11.1763 0.697792L11.1763 0.697797L11.1782 0.695896C11.4356 0.435752 11.8597 0.433019 12.1245 0.697792L18.7651 7.33842C19.0309 7.60427 19.0254 8.02688 18.7689 8.27792L18.7689 8.2779L18.7651 8.2817L12.1245 14.9223L12.1245 14.9223L12.1226 14.9242C11.8652 15.1844 11.4411 15.1871 11.1763 14.9223L10.0728 13.8188L10.0709 13.8169C9.81075 13.5595 9.80802 13.1354 10.0728 12.8706L14.7798 8.16361L15.1334 7.81006L14.7798 7.4565L10.0728 2.74947L10.0709 2.74759C9.81075 2.49021 9.80802 2.06608 10.0728 1.80131L11.1763 0.697792Z"
                stroke="white"
              />
            </svg>
          </div>
        </div>
        <div className=" grid grid-cols-1">
          <motion.input
            whileFocus={{ borderColor: '#08D4B0' }}
            type="text"
            className="mt-6 border-b bg-transparent py-2 text-center focus:outline-none focus:ring-0 active:outline-none lg:mx-8"
            onChange={onSearch}
            value={search}
          />
          {!searching && (
            <div className="flex flex-wrap px-8">
              {tokens?.map((el, index) => (
                <motion.button
                  key={index}
                  whileHover={{ border: '1px solid pink' }}
                  className=" mx-2 my-2 flex flex-grow items-center justify-center rounded-md border border-transparent px-2 py-2"
                  onClick={() => onChangeInput(el)}
                >
                  <img src={el.logo} className="w-8 rounded-full pr-2" alt="" />
                  <span>{el.symbol}</span>
                </motion.button>
              ))}
            </div>
          )}
          {searching && (
            <div className="mx-2 my-2 w-full  px-2 py-2">
              {res.symbol != undefined && (
                <motion.div className="px-8">
                  <motion.div
                    className="mx-2 my-2 grid grid-cols-2 items-center rounded-md border border-transparent px-8 "
                    whileHover={{ border: '1px solid pink' }}
                  >
                    <div className="flex justify-start">
                      {res.symbol.toUpperCase()}
                    </div>
                    <div className="flex justify-end">
                      <img className="w-16 " src={res.image.large}></img>
                    </div>
                  </motion.div>
                </motion.div>
              )}
              {res.error && <div>Token not found</div>}
            </div>
          )}
        </div>
      </div>
    </AnimatePresence>
  )
}

function Output({
  onChangeOutput,
  onNextStep,
  onSearch,
  search,
  searching,
  res,
  tokens,
}) {
  return (
    <div>
      <div className="flex flex-row items-center justify-center px-8">
        <div className=" basis-1/3"></div>
        <div className="flex basis-1/3 justify-center ">Output</div>
        <div className="flex basis-1/3 justify-end">
          <svg
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onNextStep}
          >
            <path
              d="M1.8032 14.934L1.80131 14.9321L0.697792 13.8286C0.433019 13.5638 0.435752 13.1397 0.695901 12.8823L0.697792 12.8804L5.40482 8.17338L5.75838 7.81982L5.40482 7.46627L0.697792 2.75924C0.433019 2.49447 0.435752 2.07033 0.695896 1.81296L0.695921 1.81298L0.700125 1.80872L1.79744 0.696779C2.06228 0.433026 2.48566 0.436084 2.74271 0.695896L2.74459 0.697792L9.38521 7.33842L9.38709 7.34028C9.65352 7.60391 9.6535 8.02807 9.3901 8.29147L2.74947 14.9321C2.4847 15.1969 2.06057 15.1941 1.8032 14.934ZM11.1763 0.697792L11.1763 0.697797L11.1782 0.695896C11.4356 0.435752 11.8597 0.433019 12.1245 0.697792L18.7651 7.33842C19.0309 7.60427 19.0254 8.02688 18.7689 8.27792L18.7689 8.2779L18.7651 8.2817L12.1245 14.9223L12.1245 14.9223L12.1226 14.9242C11.8652 15.1844 11.4411 15.1871 11.1763 14.9223L10.0728 13.8188L10.0709 13.8169C9.81075 13.5595 9.80802 13.1354 10.0728 12.8706L14.7798 8.16361L15.1334 7.81006L14.7798 7.4565L10.0728 2.74947L10.0709 2.74759C9.81075 2.49021 9.80802 2.06608 10.0728 1.80131L11.1763 0.697792Z"
              stroke="white"
            />
          </svg>
        </div>
      </div>
      <div className=" grid grid-cols-1">
        <motion.input
          whileFocus={{ borderColor: '#08D4B0' }}
          type="text"
          className="mt-6 border-b bg-transparent py-2 text-center focus:outline-none focus:ring-0 active:outline-none lg:mx-8"
          onChange={onSearch}
          value={search}
        />
        {!searching && (
          <div className="flex flex-wrap px-8">
            {tokens?.map((el, index) => (
              <motion.button
                key={index}
                whileHover={{ border: '1px solid pink' }}
                className=" mx-2 my-2 flex flex-grow items-center justify-center rounded-md border border-transparent px-2 py-2"
                onClick={() => onChangeOutput(el)}
              >
                <img src={el.logo} className="w-8 rounded-full pr-2" alt="" />
                <span>{el.symbol}</span>
              </motion.button>
            ))}
          </div>
        )}
        {searching && (
          <div className="mx-2 my-2 w-full  px-2 py-2">
            {res.error != undefined && (
              <motion.div className="px-8">
                <motion.div
                  onClick={onChangeOutput}
                  className="mx-2 my-2 grid grid-cols-2 items-center rounded-md border border-transparent px-8 "
                  whileHover={{ border: '1px solid pink' }}
                >
                  <div className="flex justify-start">
                    {res.symbol.toUpperCase()}
                  </div>
                  <div className="flex justify-end">
                    <img className="w-16 " src={res.image.large}></img>
                  </div>
                </motion.div>
              </motion.div>
            )}
            {res.error && <div>Token not found</div>}
          </div>
        )}
      </div>
    </div>
  )
}

export default function SwapModal({ open, setOpen, onClose }) {
  const [step, setStep] = useState(0)
  const [newInput, setNewInput] = useState(null)
  const [newOutput, setNewOutput] = useState(null)
  const [search, setSearch] = useState('')
  const [searching, setSearching] = useState(false)
  const [res, setRes] = useState({})
  const [tokens, setTokens] = useState(staticTokens)

  useEffect(() => {
    let stored = localStorage.getItem('tokens')
    if (stored) {
      setTokens((currentList) => {
        return [...currentList, ...JSON.parse(stored)]
      })
    }
  }, [])
  const addTokenHandler = (token) => {
    let inTokens = false
    tokens.forEach((currentToken) => {
      if (token.address == currentToken.address) {
        inTokens = true
      }
    })
    if (!inTokens) {
      console.log('Culo!')
      let saved = localStorage.getItem('tokens')
      if (saved != null) {
        saved = JSON.parse(saved)

        localStorage.setItem('tokens', JSON.stringify([...saved, token]))
      } else {
        console.log('hello???')
        localStorage.setItem('tokens', JSON.stringify([token]))
      }

      setTokens((currentList) => {
        return [...currentList, token]
      })
    }
  }

  useEffect(() => {
    if (step == 2) {
      closeHandler()
    }
    setSearching(false)
    setSearch('')
  }, [step])

  useEffect(() => {
    if (search == '') {
      setSearching(false)
    }
  }, [search])

  const changeInputHandler = (token) => {
    console.log('input ')
    setNewInput(token)
    setStep(1)
  }

  const changeOutputHandler = (token) => {
    console.log(token)
    setNewOutput(token)
    setStep(2)
  }

  const addToken = (token) => {}

  const closeHandler = () => {
    setStep(0)
    console.log(newInput, newOutput)
    onClose(newInput, newOutput)
    setOpen(false)
  }

  const searchHandler = async (e) => {
    setSearch(e.target.value)
    const res = await fetchToken(e.target.value)
    console.log(res.error)
    setRes(res)
    e.target.value.length <= 0 ? setSearching(false) : setSearching(true)
  }

  const fetchToken = async (address) => {
    
    console.log(parsed)
    return parsed
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
          <div className="fixed inset-0 bg-black  bg-opacity-90 transition-opacity" />
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
                  <h1 className="w-full text-center font-thin ">2.4 ETH</h1>
                  <h1 className="mb-20 w-full py-4 text-center font-thin">
                    0x000000000000000
                  </h1>
                  <AnimatePresence exitBeforeEnter>
                    {step == 0 && (
                      <motion.div
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={tokensVariant}
                        key="input"
                      >
                        <Input
                          key="input"
                          currentToken={newInput}
                          onNextStep={() => setStep(1)}
                          onChangeInput={changeInputHandler}
                          onSearch={searchHandler}
                          search={search}
                          searching={searching}
                          res={res}
                          tokens={tokens}
                        ></Input>
                      </motion.div>
                    )}

                    {step == 1 && (
                      <motion.div
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key="miao"
                        variants={tokensVariant}
                      >
                        <Output
                          key="output"
                          onChangeOutput={changeOutputHandler}
                          onNextStep={() => setStep(2)}
                          onSearch={searchHandler}
                          search={search}
                          searching={searching}
                          res={res}
                          tokens={tokens}
                          
                        ></Output>
                      </motion.div>
                    )}
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
