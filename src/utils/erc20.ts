import Web3 from 'web3'
import { provider, TransactionReceipt } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import ERC20ABI from '../constants/abi/ERC20.json'
import { ethers } from 'ethers'

export const getContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(
    (ERC20ABI.abi as unknown) as AbiItem,
    address,
  )
  return contract
}

export const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
  };
  

export const waitTransaction = async (provider: provider, txHash: string) => {
	const web3 = new Web3(provider);
	let txReceipt: TransactionReceipt | null = null;
	while (txReceipt === null) {
	  const r = await web3.eth.getTransactionReceipt(txHash);
	  txReceipt = r;
	  await sleep(2000);
	}
	return txReceipt.status;
  };

export const getAllowance = async (
  lpContract: Contract,
  masterChefContract: Contract,
  account: string,
): Promise<string> => {
  try {
    const allowance: string = await lpContract.methods
      .allowance(account, masterChefContract.options.address)
      .call()
    return allowance
  } catch (e) {
    return '0'
  }
}
export const getAllowanceHoney = async (userAddress: string, spenderAddress: string, tokenAddress: string, provider: provider): Promise<string> => {
	try {
	  const tokenContract = getERC20Contract(provider, tokenAddress);
	  const allowance: string = await tokenContract.methods.allowance(userAddress, spenderAddress).call();
	  return allowance;
	} catch (e) {
	  return "0";
	}
  };

  export const getERC20Contract = (provider: provider, address: string) => {
	const web3 = new Web3(provider);
	const contract = new web3.eth.Contract((ERC20ABI.abi as unknown) as AbiItem, address);
	return contract;
  };

export const getBalance = async (
  provider: provider,
  tokenAddress: string,
  userAddress: string,
): Promise<string> => {
  const lpContract = getContract(provider, tokenAddress)
  try {
    const balance: string = await lpContract.methods
      .balanceOf(userAddress)
      .call()
    return balance
  } catch (e) {
    return '0'
  }
}

export const approve = async (
	userAddress: string,
	spenderAddress: string,
	tokenAddress: string,
	provider: provider,
	onTxHash?: (txHash: string) => void
  ): Promise<boolean> => {
	try {
	  const tokenContract = getERC20Contract(provider, tokenAddress);
	  return tokenContract.methods
		.approve(spenderAddress, ethers.constants.MaxUint256)
		.send({ from: userAddress, gas: 80000 }, async (error: any, txHash: string) => {
		  if (error) {
			console.log("ERC20 could not be approved", error);
			onTxHash && onTxHash("");
			return false;
		  }
		  if (onTxHash) {
			onTxHash(txHash);
		  }
		  const status = await waitTransaction(provider, txHash);
		  if (!status) {
			console.log("Approval transaction failed.");
			return false;
		  }
		  return true;
		});
	} catch (e) {
	  console.log("error", e);
	  return false;
	}
  };
