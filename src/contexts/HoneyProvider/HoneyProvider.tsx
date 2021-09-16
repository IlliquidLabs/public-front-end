import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Honey } from '../../honey'

export interface HoneyContext {
  honey?: typeof Honey
}

export const Context = createContext<HoneyContext>({
  honey: undefined,
})

declare global {
  interface Window {
    honeysauce: any
  }
}

const HoneyProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [honey, setHoney] = useState<any>()

  // @ts-ignore
  window.honey = honey
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const honeyLib = new Honey(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setHoney(honeyLib)
      window.honeysauce = honeyLib
    }
  }, [ethereum])

  return <Context.Provider value={{ honey }}>{children}</Context.Provider>
}

export default HoneyProvider
