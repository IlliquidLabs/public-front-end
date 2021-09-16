import React, { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import ConfirmTransactionModal from '../../components/ConfirmTransactionModal'
import {
  getAddresses
} from '../../constants/tokenAddresses'
import useYam from '../../hooks/useYam'

import {
  getExitableAmount,
  getSingleEarned,
  getSingleStakeBalances,
  getSingleStakingEndTime,
  singleExit,
  honeySingleHarvest,
  honeySingleRedeem,
  honeySingleStake,
} from '../../yam-sdk/utils'

import Context from './Context'
import { SingleStake } from '../../constants/poolValues'


const addresses = getAddresses()

const Provider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [isHarvesting, setIsHarvesting] = useState(false)
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)
  const [totalStaked, setTotakStaked] = useState<BigNumber>()
  const [earnedHoneyPoolBalance, setEarnedHoneyPoolBalance] = useState<BigNumber>()
  const [userStakes, setUserStakes] = useState<SingleStake[]>([])
  const [withdrawStakeAmount, setWithdrawStakeAmount] = useState<BigNumber>()
  const [endTime, setEndTime] = useState<BigNumber>()
  const [lastExpiringStake, setLastExpiringStake] = useState<SingleStake>()

  const yam = useYam()
  const { account } = useWallet()

  const getIncentivizerAddress = () => {
    return addresses.honeyEthIncAddress
  }

  const fetchStakedBalance = useCallback(async () => {
    if (!account || !yam) return
    const exitableAmount = await getExitableAmount(yam.contracts.honeyInc_pool, account);
    setWithdrawStakeAmount(new BigNumber(String(exitableAmount)).dividedBy(new BigNumber(10).pow(18)))

    const stakes: SingleStake[] = await getSingleStakeBalances(yam.contracts.honeyInc_pool, account)
    const totalStaked = stakes.reduce((p, s) => p.plus(s.amount), new BigNumber(0))
    setTotakStaked(totalStaked)
    setUserStakes(stakes)

    if (stakes && stakes.length > 0) {
      const current = (new Date().getTime() / 1000);
      const lastExpiringStake = stakes.filter(s => s.lockDate > current)
        .sort((a, b) => Number(a.lockDate) < Number(b.lockDate) ? 1 : -1)
      if (lastExpiringStake && lastExpiringStake.length > 0) {
        setLastExpiringStake(lastExpiringStake[0])
      }
      else {
        setLastExpiringStake(undefined)
      }
    }
  }, [
    account,
    setTotakStaked,
    setUserStakes,
    yam
  ])

  const fetchEarnedBalance = useCallback(async () => {
    if (!account || !yam) return
    const balance = await getSingleEarned(yam, yam.contracts.honeyInc_pool, account)
    setEarnedHoneyPoolBalance(balance)
  }, [
    account,
    setEarnedHoneyPoolBalance,
    yam
  ])

  const fetchBalances = useCallback(async () => {
    fetchEarnedBalance()
    fetchStakedBalance()
  }, [
    fetchEarnedBalance,
    fetchStakedBalance
  ])

  const handleHarvest = useCallback(async () => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    setIsHarvesting(true)
    await honeySingleHarvest(yam.contracts.honeyInc_pool, yam.web3.eth, account, () => {
      setConfirmTxModalIsOpen(false)
    }).catch(e => {
      console.error(e)
    })
    setIsHarvesting(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsHarvesting,
    yam
  ])

  // amount is the amount of HONEY user wants to exit and will claim all STXP
  const handleRedeem = useCallback(async (amount) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    setIsRedeeming(true)
    await honeySingleRedeem(yam.contracts.honeyInc_pool, yam.web3.eth, amount, account, () => {
      setConfirmTxModalIsOpen(false)
    }).catch(e => {
      console.error(e)
      setIsRedeeming(false)
    })
    setIsRedeeming(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsRedeeming,
    yam
  ])

  const handleStake = useCallback(async (duration: string, amount: string) => {
    console.log('staking, stake, is yam undefined', yam === undefined);
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    setIsStaking(true)
    await honeySingleStake(yam.contracts.honeyInc_pool, yam.web3.eth, duration, amount, account, () => {
      setConfirmTxModalIsOpen(false)
    }).catch(e => {
      console.error(e)
      setIsStaking(false)
    })
    setIsStaking(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsStaking,
    yam
  ])

  const handleUnstake = useCallback(async (amount: string) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    setIsUnstaking(true)
    await singleExit(yam.contracts.honeyInc_pool, yam.web3.eth, amount, account, () => {
      setConfirmTxModalIsOpen(false)
    }).catch(e => {
      console.error(e)
      setIsUnstaking(false)
    })
    setIsUnstaking(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsUnstaking,
    yam
  ])

  useEffect(() => {
    if (yam) getSingleStakingEndTime(yam, yam.contracts.honeyInc_pool).then(endTime => setEndTime(endTime))
    fetchBalances()
    let refreshInterval = setInterval(() => {
      fetchBalances()
    }, 10000)
    return () => clearInterval(refreshInterval)
  }, [fetchBalances, yam])

  return (
    <Context.Provider value={{
      setConfirmTxModalIsOpen,
      earnedHoneyPoolBalance,
      isHarvesting,
      isRedeeming,
      isStaking,
      isUnstaking,
      onHarvest: handleHarvest,
      onRedeem: handleRedeem,
      onStake: handleStake,
      onUnstake: handleUnstake,
      getIncentivizerAddress,
      totalStaked,
      honeyTokenAddress: addresses.honeyTokenAddress,
      endTime,
      withdrawStakeAmount,
      lastExpiringStake,
      userStakes
    }}>
      {children}
      <ConfirmTransactionModal isOpen={confirmTxModalIsOpen} />
    </Context.Provider>
  )
}

export default Provider