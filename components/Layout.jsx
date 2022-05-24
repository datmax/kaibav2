import Footer from './Footer'
import Menu from './Menu'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

import ConnectButton from './ConenctButton'

export default function Layout({ children }) {
  const [show, setShow] = useState(false)

  return (
    <>
      <Menu show={show} setShow={setShow}></Menu>

      <div className="min-h-screeb w-full bg-bg bg-cover bg-center">
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
                <ConnectButton></ConnectButton>
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
