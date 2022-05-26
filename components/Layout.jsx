import Footer from './Footer'
import Menu from './Menu'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useContext } from 'react'
import { Web3Context } from '../context/web3Context'
import ConnectButton from './ConenctButton'
import Jazzicon, {jsNumberForAddress} from 'react-jazzicon'

export default function Layout({ children }) {
  const [show, setShow] = useState(false)
  const { address, connect, network } = useContext(Web3Context)



  return (
    <>
      <Menu show={show} setShow={setShow}></Menu>
      <div className="min-h-screeb w-full bg-black bg-bg bg-cover bg-center">
        <div className="bg-gradient-to-tr from-main/10 via-black/50  to-black/20 px-4 pt-4 sm:px-8 lg:px-20 ">
          <div className="grid w-full grid-cols-2 ">
            <img
              src="kaiba-logo-white.png"
              className=" w-12 hover:cursor-pointer "
              alt=""
              onClick={() => setShow(true)}
            />
            <div className="flex items-center justify-end  font-thin text-white">
              <AnimatePresence>
                {!address && <ConnectButton></ConnectButton>}
                {address && (
                  <div className="flex items-center">
                    <span className="mx-2">
                      {address.slice(0, 4) +
                        '...' +
                        address.slice(address.length - 4, address.length)}
                    </span>

                    <Jazzicon
                      seed={jsNumberForAddress(address)}
                      diameter={20}
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
          {children}
          <Footer></Footer>
        </div>
      </div>
    </>
  )
}
