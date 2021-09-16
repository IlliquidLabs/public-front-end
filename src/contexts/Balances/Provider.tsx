import React, { useCallback, useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";

import { HoneyAddress, yycrvHoneyLp, HONEYWETHAddress } from "../../constants/tokenAddresses";
import { getBalance } from "../../utils/erc20";

import Context from "./Context";

const Provider: React.FC = ({ children }) => {
  const [HONEYBalance, setHONEYBalance] = useState<BigNumber>();
  const [yycrvHoneyLpBalance, setYycrvHoneyLpBalance] = useState<BigNumber>();
  const [HONEYWETHBalance, setHONEYWETHLPBalance] = useState<BigNumber>();

  const { account, ethereum }: { account: string | null; ethereum: provider } = useWallet();

  const fetchBalances = useCallback(
    async (userAddress: string, provider: provider) => {
      const balances = await Promise.all([
        await getBalance(provider, HoneyAddress, userAddress),
        await getBalance(provider, yycrvHoneyLp, userAddress),
        await getBalance(provider, HONEYWETHAddress, userAddress),
      ]);
      setHONEYBalance(new BigNumber(balances[0]).dividedBy(new BigNumber(10).pow(24)));
      setYycrvHoneyLpBalance(new BigNumber(balances[2]).dividedBy(new BigNumber(10).pow(18)));
      setHONEYWETHLPBalance(new BigNumber(balances[2]).dividedBy(new BigNumber(10).pow(18)));
    },
    [setHONEYBalance,  setYycrvHoneyLpBalance, setHONEYWETHLPBalance]
  );

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum);
    }
  }, [account, ethereum, fetchBalances]);

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum);
      let refreshInterval = setInterval(() => fetchBalances(account, ethereum), 10000);
      return () => clearInterval(refreshInterval);
    }
  }, [account, ethereum, fetchBalances]);

  return (
    <Context.Provider
      value={{
        HONEYBalance,
        yycrvHoneyLpBalance,
        HONEYWETHBalance,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
