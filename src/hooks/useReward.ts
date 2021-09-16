import { useCallback } from 'react'

import useHoney from './useHoney'
import { useWallet } from 'use-wallet'

import { harvest, getMasterChefContract } from '../honey/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const honey = useHoney()
  const masterChefContract = getMasterChefContract(honey)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, honey])

  return { onReward: handleReward }
}

export default useReward
