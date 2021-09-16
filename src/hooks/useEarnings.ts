import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract } from '../honey/utils'
import useHoney from './useHoney'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const honey = useHoney()
  const masterChefContract = getMasterChefContract(honey)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, masterChefContract, honey])

  useEffect(() => {
    if (account && masterChefContract && honey) {
      fetchBalance()
    }
  }, [account, block, masterChefContract, setBalance, honey])

  return balance
}

export default useEarnings
