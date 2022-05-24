import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import WalletConnectProvider from '@walletconnect/web3-provider'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import Authereum from "authereum";


const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: 'Democracy', // Required
      infuraId: '43b50f70f77542f8ba909a4c9cfb2a94',
    },
  },
    authereum: {
      package: Authereum // required
  },
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: '43b50f70f77542f8ba909a4c9cfb2a94', // required
    },
  },
  
}


export default function useProvider() {
  const [provider, setProvider] = useState(null);
  const [network, setNetwork] = useState(null);
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [block, setBlock] = useState(null);
  const [owner, setOwner] = useState(false);

  const connect = () => {
    setConnecting(true);
  };

  const disconnect = () =>{
    console.log("hhaah")
    setProvider(null)
    setNetwork(null)
    setAddress(null)
    setBalance(null)
    setConnected(false)
    setConnecting(false)
    setBlock(null)
    setOwner(false)
  }


  useEffect(() => {
    if (connecting) {
      setConnecting(false);
      const get = async () => {
        try {
          const web3Modal = new Web3Modal({
            network:"mainnet",
            cacheProvider: true,
            disableInjectedProvider: false,
            providerOptions , // required
          });
          const instance = await web3Modal.connect();
          const provider = new ethers.providers.Web3Provider(instance);
          const signer = provider.getSigner();

          provider.on("block", (block) => {
            setBlock(block);
          });
          instance.on("chainChanged", (chainId) => {
            setNetwork(chainId);
            // Handle the new chain.
            // Correctly handling chain changes can be complicated.
            // We recommend reloading the page unless you have good reason not to.
          });
          instance.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
              setAddress(accounts[0]);
            } else {
              setAddress(null);
            }
            // Handle the new accounts, or lack thereof.
            // "accounts" will always be an array, but it can be empty.
          });

          setAddress(await signer.getAddress());

          setProvider(provider);
          setNetwork((await provider.getNetwork()).chainId);
          setBalance((await signer.getBalance())._hex);
          setConnecting(false);
          setConnected(true);
        } catch (err) {
          console.error(err);
          setConnecting(false);
          //CONNECTION HANDLING
        }
      };
      get();
    }
  }, [connecting]);

  return {
    provider: provider,
    balance: balance,
    address: address,
    connect: connect,
    network: network,
    block: block,
    connected: connected,
    connecting: connecting,
    owner: owner,
    disconnect:disconnect
  };
}
