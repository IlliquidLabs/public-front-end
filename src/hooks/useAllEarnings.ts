import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract, getFarms, getDegenFarms } from '../honey/utils'
import useHoney from './useHoney'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const honey = useHoney()
  const farms = getFarms(honey)
  const degenFarms = getDegenFarms(honey)
  const masterChefContract = getMasterChefContract(honey)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterChefContract, honey])

  const fetchAllDegenBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      degenFarms.map(({ pid }: { pid: number }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterChefContract, honey])

  useEffect(() => {
    if (account && masterChefContract && honey) {
      fetchAllBalances()
	  fetchAllDegenBalances()
    }
  }, [account, block, masterChefContract, setBalance, honey])

  return balances
}

export default useAllEarnings
