import { useCallback } from 'react'

import useHoney from './useHoney'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract } from '../honey/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const Honey = useHoney()
  const masterChefContract = getMasterChefContract(Honey)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, Honey],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
