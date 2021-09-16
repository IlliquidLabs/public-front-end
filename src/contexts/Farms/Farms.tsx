import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useHoney from '../../hooks/useHoney'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../honey/utils'
import { getFarms, getDegenFarms } from '../../honey/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const honey = useHoney()
  const { account } = useWallet()

  const farms = getFarms(honey)

  const degenFarms = getDegenFarms(honey)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
