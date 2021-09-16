import { useCallback } from 'react'

import useHoney from './useHoney'
import { useWallet } from 'use-wallet'

import { stake, getMasterChefContract } from '../honey/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const honey = useHoney()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMasterChefContract(honey),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, honey],
  )

  return { onStake: handleStake }
}

export default useStake
