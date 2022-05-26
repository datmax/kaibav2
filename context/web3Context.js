import React, { useEffect, createContext, useState } from 'react'
import useProvider from '../hooks/useWeb3'
export const Web3Context = createContext()

export const Web3Provider = ({ children }) => {
  const {
    provider,
    network,
    address,
    balance,
    connect,
    block,
    connected,
    connecting,
    owner,
    disconnect,
  } = useProvider()

  return (
    <Web3Context.Provider
      value={{
        connect,
        address,
        balance,
        block,
        network,
        provider,
        owner,
        disconnect,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}
