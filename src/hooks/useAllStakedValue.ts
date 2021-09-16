import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getMasterChefContract,
  getWethContract,
  getFarms,
  getDegenFarms,
  getTotalLPWethValue,
} from '../honey/utils'
import useHoney from './useHoney'
import useBlock from './useBlock'

export interface StakedValue {
  tokenAmount: BigNumber
  tokenAmount2: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const honey = useHoney()
  const farms = getFarms(honey)
  const degenFarms = getDegenFarms(honey)
  const masterChefContract = getMasterChefContract(honey)
  const wethContact = getWethContract(honey)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
		  tokenContract2,
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
		  tokenContract2: Contract
        }) =>
          getTotalLPWethValue(
            masterChefContract,
            wethContact,
            lpContract,
            tokenContract,
			tokenContract2,
            pid,
          ),
      ),
    )

    setBalance(balances)
  }, [account, masterChefContract, honey])

  useEffect(() => {
    if (account && masterChefContract && honey) {
      fetchAllStakedValue()
    }
  }, [account, block, masterChefContract, setBalance, honey])

  return balances
}

export default useAllStakedValue
