import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

import { rootURL, honeyContract, vsCurrency } from '../constants/coinGeckoApi'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getMasterChefAddress = (honey) => {
  return honey && honey.masterChefAddress
}
export const getHoneyAddress = (honey) => {
  return honey && honey.honeyAddress
}
export const getWethContract = (honey) => {
  return honey && honey.contracts && honey.contracts.weth
}

export const getMasterChefContract = (honey) => {
  return honey && honey.contracts && honey.contracts.masterChef
}
export const getHoneyContract = (honey) => {
  return honey && honey.contracts && honey.contracts.honey
}

export const getFarms = (honey) => {
  return honey
    ? honey.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
		  tokenAddress2,
          tokenSymbol,
		  tokenSymbol2,
          tokenContract,
		  tokenContract2,
          lpAddress,
          lpContract,
		  poolActive,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
		  tokenAddress2,
          tokenSymbol,
		  tokenSymbol2,
          tokenContract,
		  tokenContract2,
          earnToken: 'honey',
          earnTokenAddress: honey.contracts.honey.options.address,
          icon,
		  poolActive,
        }),
      )
    : []
}


export const getDegenFarms = (honey) => {
	return honey
	  ? honey.contracts.pools.map(
		  ({
			pid,
			name,
			symbol,
			icon,
			tokenAddress,
			tokenAddress2,
			tokenSymbol,
			tokenSymbol2,
			tokenContract,
			tokenContract2,
			lpAddress,
			lpContract,
		  }) => ({
			pid,
			id: symbol,
			name,
			lpToken: symbol,
			lpTokenAddress: lpAddress,
			lpContract,
			tokenAddress,
			tokenAddress2,
			tokenSymbol,
			tokenSymbol2,
			tokenContract,
			tokenContract2,
			earnToken: 'honey',
			earnTokenAddress: honey.contracts.honey.options.address,
			icon,
			
		  }),
		)
	  : []
  }

export const getPoolWeight = async (masterChefContract, pid) => {
  const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await masterChefContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (masterChefContract, pid, account) => {
  return masterChefContract.methods.pendingHoney(pid, account).call()
}

export const getTotalLPWethValue = async (
  masterChefContract,
  wethContract,
  lpContract,
  tokenContract,
  tokenContract2,
  pid,
) => {
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
	const tokenAmountWholeLP2 = await tokenContract2.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  const tokenDecimals2 = await tokenContract2.methods.decimals().call()

  // Get the share of lpContract that masterChefContract owns
  const balance = await lpContract.methods
    .balanceOf(masterChefContract.options.address)
    .call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total weth value for the lpContract = w1
  const lpContractWeth = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

const tokenAmount2 = new BigNumber(tokenAmountWholeLP2)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals2))

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))
  return {
    tokenAmount,
	tokenAmount2,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(tokenDecimals)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight: await getPoolWeight(masterChefContract, pid),
  }
}

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const getHoneySupply = async (honey) => {
  return new BigNumber(await honey.contracts.honey.methods.totalSupply().call())
}

export const stake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (masterChefContract, pid, account) => {
  try {
    const { amount } = await masterChefContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (masterChefContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const honeyPrice = () => {
  /*
  let response = await fetch(rootURL+honeyContract+vsCurrency)
  if (response.status === 200) {
    let data = await response.json()
    return data['0xde31e75182276738b0c025daa8f80020a4f2fbfe']['usd']
  }
  else {
    return 0
  }
  */
 const status = response => {
   console.log(response)
   if (response.status === 200) {
     return Promise.resolve(response)
   }
   return Promise.reject(new Error(response.statusText))
 }
 const json = response => response.json()
 return fetch(rootURL+honeyContract+vsCurrency)
  .then(status)
  .then(json)
  .then(data => {
    console.log(data)
    return data['0xde31e75182276738b0c025daa8f80020a4f2fbfe']['usd']
  })
}
