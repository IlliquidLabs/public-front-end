import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import PendingRewards from '../../../components/PendingRewards'
import useEarnings from '../../../hooks/useEarnings'
import useReward from '../../../hooks/useReward'
import useHoneyPrice from '../../../hooks/useHoneyPrice'
import { getBalanceNumber } from '../../../utils/formatBalance'

interface HarvestProps {
  pid: number
}

const Harvest: React.FC<HarvestProps> = ({ pid }) => {
  const earnings = useEarnings(pid)
  
  const [pendingTx, setPendingTx] = useState(false)
  const [pendingValue, setPendingValue] = useState(0)
  const { onReward } = useReward(pid)

  const earningsBalance = getBalanceNumber(earnings)
  const price = useHoneyPrice(earningsBalance)

  
  /*
  const getHoneyValue = async (earnings: number) => {
    const price = await useHoneyPrice(earnings)
    console.log(price * earningsBalance)
    return price * earningsBalance
  }
  */

  useEffect(() => {
    setPendingValue(price * earningsBalance)
  }, [earningsBalance, price])
  
  

  

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>🍯</CardIcon>
            <Value value={earningsBalance} />
            <Label text="HONEY Earned" />
            <StyledPendingRewards>
              <PendingRewards earnings={pendingValue} />
            </StyledPendingRewards>
          </StyledCardHeader>

          <StyledCardActions>
            <Button
              disabled={!earnings.toNumber() || pendingTx}
              text={pendingTx ? 'Collecting HONEY' : 'Harvest'}
              onClick={async () => {
                setPendingTx(true)
                await onReward()
                setPendingTx(false)
              }}
            />
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

const StyledPendingRewards = styled.span`
  color: ${(props) => props.theme.color.grey[600]};
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
  margin-top: ${(props) => props.theme.spacing[2]}px;

`


export default Harvest
