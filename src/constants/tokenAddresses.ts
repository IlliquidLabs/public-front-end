export const addresses = {
	42161: {honey : '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
	honeyLP : "0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16",

	},
	4: {honey : '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
	}
}

export const chainId = 42161;

export const honeyv2 = '0xaba8cac6866b83ae4eec97dd07ed254282f6ad8a'
export const honeyAddress = '0xdE31e75182276738B0c025daa8F80020A4F2fbFE'
export const masterChefAddress = '0x245A074cA9814fB46A21562bC70fAB92F8A3F779'

export const marbiHoneylp = ""
export const honeySSS =""


// Legacys
export const yycrvHoneyLp = "0xb93Cc05334093c6B3b8Bfd29933bb8d5C031caBC";
export const migrator = "0x72cfed9293cbfb2bfc7515c413048c697c6c811c";
export const reservesContractv2 = "0xCF27cA116dd5C7b4201c75B46489D1c075362087";
export const HONEYWETHAddress = "0x0f82e57804d0b1f6fab2370a43dcfad3c7cb239c";
export const UMA = "0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828";

export const HoneyAddress = "0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16";

export const yamv3 = "0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16";

export const OldContractIncentivizer = "0x5b0501F7041120d36Bc8c6DC3FAeA0b74b32a0Ed";
export const ContractGovernor = "0x2da253835967d6e721c6c077157f9c9742934aea";
export const ContractTimelock = "0x8b4f1616751117C38a0f84F9A146cca191ea3EC5";
export const ContractRebaser = "0xd93f403b432d39aa0f736c2021be6051d85a1d55";
export const ContractIncentivizer = "0xD67c05523D8ec1c60760Fd017Ef006b9F6e496D0";
export const ContractReserves = "0x97990b693835da58a281636296d2bf02787dea17";
export const ContractMigrator = "0x72CFEd9293cbFB2bfC7515c413048c697C6c811C";
export const ContractContributorGovernor = "0xdcec4a3aa84f79249c1b5325a06c1560d202dd87";
export const ContractContribtorTimelock = "0xd40a03e520d49339e91bc58c2c9b8966ee7f490f";
export const ContractIndexStaking = "0x205Cc7463267861002b27021C7108Bc230603d0F";
export const ContractVestingPool = "0xDCf613db29E4d0B35e7e15e93BF6cc6315eB0b82";
export const ContractMonthlyAllowance = "0x03A882495Bc616D3a1508211312765904Fb062d1";

export function getAddresses(): { [name: string]: string } {
	return addresses[chainId];
  }
  
  export function getMulticallAddress(): string {
	const addresses = {
	  42161: "0xdE31e75182276738B0c025daa8F80020A4F2fbFE",
	  4: "0xdE31e75182276738B0c025daa8F80020A4F2fbFE",
	};
	return addresses[chainId];
  }