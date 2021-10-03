import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Card from '../Card'
import CardContent from '../CardContent'
import Label from '../Label'
import Spacer from '../Spacer'
import Value from '../Value'
import HoneyIcon from '../HoneyIcon'
import useAllEarnings from '../../hooks/useAllEarnings'
import useAllStakedValue from '../../hooks/useAllStakedValue'
import useFarms from '../../hooks/useFarms'
import useTokenBalance from '../../hooks/useTokenBalance'
import useHoney from '../../hooks/useHoney'
import { getHoneyAddress, getHoneySupply } from '../../honey/utils'
import { getBalanceNumber } from '../../utils/formatBalance'

interface PendingRewardsProps {
    earnings?: number
}

const PendingRewards: React.FC<PendingRewardsProps> = ({ earnings }) => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)
  

  // const earnings = useAllEarnings()

  useEffect(() => {
      setStart(end)
      setEnd(earnings)
  }, [earnings])


  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
        fontSize: 'font-size 14px',
        color: 'color: #e36f10',
      }}
    >
      ~$
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={1}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
 
}



export default PendingRewards

