import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterChefContract } from '../honey/utils'
import useHoney from './useHoney'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const honey = useHoney()
  const masterChefContract = getMasterChefContract(honey)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, honey])

  useEffect(() => {
    if (account && honey) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, honey])

  return balance
}

export default useStakedBalance
