import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const addressMap = {
  sushiswapFactoryV2: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  YFI: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
  YCRV: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
  UNIAmpl: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
  WETH: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
  UNIRouter: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  
}

export const contractAddresses = {
  honey: {
    42161: '0xdE31e75182276738B0c025daa8F80020A4F2fbFE',
  },
  masterChef: {
    42161: '0xf85CD66461088284480a455D2B2933E69B789BAF',
  },
  weth: {
    42161: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
  },
}

//https://app.honey.com/add/ETH/0xeD3fB761414DA74b74F33e5c5a1f78104b188DfC //Add liquidity links



export const supportedPools = [
  {
    pid: 1,
    lpAddresses: {
		42161:  '0xfc1acf07202f6fac951947427b79284d86a965d2',
    },
    tokenAddresses: {
		42161: '0xdE31e75182276738B0c025daa8F80020A4F2fbFE',
    },
	tokenAddresses2: {
		42161: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    },
	
    name: 'The Bee Hive!',
    symbol: 'HONEY-ETH SLP',
    tokenSymbol: 'HONEY',
	tokenSymbol2: 'WETH',
    icon: '🍯',
	poolActive: true,
	startTime: 	0,
	endTime: 0,
	poolType: '1',

  },
  {
    pid: 2,
    lpAddresses: {
      42161: '0x541F00D41947ECc5F08f08D7D68833C3B1951186',
    },
    tokenAddresses2: {
      42161: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    },
	tokenAddresses: {
		42161: '0xdE31e75182276738B0c025daa8F80020A4F2fbFE',
    },
	
    name: 'Tether Turtle Cove',
    symbol: 'USDT-HONEY SLP',
    tokenSymbol2: 'USDT',
	tokenSymbol: 'HONEY',
	poolActive: true,
	startTime: '0',
	endTime: 0,
	poolType: 1,

    icon: '🐢',
  },
  {
    pid: 3,
    lpAddresses: {
      42161: '0x3101836cD04E1981eC1225fFE39BD1206664C4bB',
    },
    tokenAddresses2: {
      42161: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
	  
    },
	tokenAddresses: {
		42161: '0xdE31e75182276738B0c025daa8F80020A4F2fbFE',
    },
	
    name: 'Circle Snail',
    symbol: 'USDC-HONEY SLP',
    tokenSymbol2: 'USDC',
	tokenSymbol: 'HONEY',
	poolActive: true,
	startTime: 0,
	endTime: 0,
	poolType: '1',

    icon: '🐌',
  },
  {
    pid: 4,
	lpAddresses: {
		42161: '0x41f6c51f0Ca52279380bE89B4F7c1dF082d30FeD',
	  },
	  tokenAddresses2: {
		42161: '0x1a7BD9EDC36Fb2b3c0852bcD7438c2A957Fd7Ad5',
	  },
	  tokenAddresses: {
		42161: '0xdE31e75182276738B0c025daa8F80020A4F2fbFE',
    },
	  
	  name: 'Arbinauts',
	  symbol: 'AMOON-HONEY SLP',
	  tokenSymbol2: 'AMOON',
	  tokenSymbol: 'HONEY',
	  poolActive: true,
	  startTime: 0,
	  endTime: Date.UTC(2021, 9, 17, 12, 0, 0),
	  poolType: '1',

	  icon: '🌕',
  },

  {
    pid: 5,
    lpAddresses: {
		42161: '0x39fad1c9dbda7623b22717f54407734d016a3bc9',
	  },
	  tokenAddresses2: {
		42161: '0x155f0dd04424939368972f4e1838687d6a831151',
	  },
	  tokenAddresses: {
		42161: '0xdE31e75182276738B0c025daa8F80020A4F2fbFE',
      },
	  name: 'The Dog Kennel',
	  symbol: 'ADOGE-HONEY SLP',
	  tokenSymbol2: 'ADOGE',
	  tokenSymbol: 'HONEY',
	  poolActive: true,
	  startTime: 0,
	  endTime: 0,
	  poolType: '1',

	  icon: '🐕',
  },
  {
    pid: 6,
    lpAddresses: {
      42161: '0x0b8495404505cc0e6f0d5ff2d074dc92901053ff',
    },
    tokenAddresses2: {
      42161: '0xd4d42f0b6def4ce0383636770ef773390d85c61a',
    },
	tokenAddresses: {
		42161: '0xdE31e75182276738B0c025daa8F80020A4F2fbFE',
    },
    name: 'Sushi with Honey?',
    symbol: 'HONEY-SUSHI LP',
    tokenSymbol2: 'SUSHI',
	tokenSymbol: 'HONEY',
	poolActive: true,
	startTime: 0,
	endTime: 0,
	poolType: '1',

    icon: '🍣',
  },
 
   {
    pid: 8,
    lpAddresses: {
      42161: '0x125cbe478f28D4Fc6E9bDDefa9Cb583B9de0Fc6B',
    },
    tokenAddresses2: {
      42161: '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a',
    },
	tokenAddresses: {
		42161: '0xdE31e75182276738B0c025daa8F80020A4F2fbFE',
    },
    name: 'Gomix That Honey',
    symbol: 'HONEY-GMX SLP',
    tokenSymbol: 'HONEY',
	tokenSymbol2: 'GMX',
    icon: '🥄',

	startTime: 0,
	endTime: 0,
	poolType: '1',

	poolActive: true,
  },
 
  {
    pid: 10,
    lpAddresses: {
      42161: '0x6Fd357858D5Bf7F447a63c363893C44E3744534c',
    },
    tokenAddresses2: {
		42161: '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
    },
	tokenAddresses: {
		42161: '0xdE31e75182276738B0c025daa8F80020A4F2fbFE',
    },
    name: 'Bee Marines',
    symbol: 'HONEY-LINK SLP',
    tokenSymbol2: 'LINK',
	tokenSymbol: 'HONEY',
	poolActive: true,
	startTime: 0,
	endTime: 0,
	poolType: '1',

    icon: '🔗',
  },
  {
    pid: 12,
    lpAddresses: {
      42161: '0x28e18F15c147162FAeb1e771260BEcB45BdF6Bfc',
    },
    tokenAddresses: {
		42161: '0xdE31e75182276738B0c025daa8F80020A4F2fbFE',
    },
	tokenAddresses2: {
		42161: '0x86a1012d437bbff84fbdf62569d12d4fd3396f8c',
    },
    name: 'Meats in Honey',
    symbol: 'HONEY-ARBYS SLP',
    tokenSymbol2: 'ARBYS',
	tokenSymbol: 'HONEY',
	poolActive: true,
	startTime: 0,
	endTime: 0,
	poolType: '1',

    icon: '🥩',
  },


{
    pid: 11,
    lpAddresses: {
      42161: '0x20899cC3752c8eF24C138b2d70fEdFa618D3C5e4',
    },
    tokenAddresses2: {
      42161: '0x31efa0ec18339845805cdf16dfb3a818f10e090f',
    },
	tokenAddresses: {
		42161: '0xdE31e75182276738B0c025daa8F80020A4F2fbFE',
    },
    name: 'Shroomed up Bees',
    symbol: 'HONEY-SHROOM SLP',
    tokenSymbol2: 'SHROOM',
	tokenSymbol: 'HONEY',
    icon: '🍄',

	poolActive: true,
	endTime: 0,
	poolType: '1',

	startTime: 0,
  },

  //
//      CLOSED POOLS            CLOSED POOLS                CLOSED POOLS                CLOSED POOLS                CLOSED POOLS          
//
//   {
//     pid: 7,
//     lpAddresses: {
//       42161: '0xda7424e032fbd5c1bc0c418e84479d74043668eb',
//     },
//     tokenAddresses2: {
//       42161: '0x955b9fe60a5b5093df9dc4b1b18ec8e934e77162',
//     },
// 	tokenAddresses: {
// 		42161: '0xdE31e75182276738B0c025daa8F80020A4F2fbFE',
//     },
	
//     name: 'Bee Swapr',
//     symbol: 'HONEY-SWPR SLP',
//     tokenSymbol2: 'SWPR',
// 	tokenSymbol: 'HONEY',
// 	poolActive: false,
// 	startTime: 0,
// 	endTime: 0,
// 	poolType: '1',

//     icon: '💰',
//   },
//   {
//     pid: 6,
//     lpAddresses: {
//       1: '0x43ae24960e5534731fc831386c07755a2dc33d47',
//     },
//     tokenAddresses: {
//       1: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
//     },
//     name: 'Synthetic Snake',
//     symbol: 'SNX-ETH UNI-V2 LP',
//     tokenSymbol: 'SNX',
//     icon: '🐍',
//   },
//   {
//     pid: 11,
//     lpAddresses: {
//       1: '0x2fdbadf3c4d5a8666bc06645b8358ab803996e28',
//     },
//     tokenAddresses: {
//       1: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
//     },
//     name: 'YFI Whale',
//     symbol: 'YFI-ETH UNI-V2 LP',
//     tokenSymbol: 'YFI',
//     icon: '🐋',
//   },
//   {
//     pid: 13,
//     lpAddresses: {
//       1: '0x8bd1661da98ebdd3bd080f0be4e6d9be8ce9858c',
//     },
//     tokenAddresses: {
//       1: '0x408e41876cccdc0f92210600ef50372656052a38',
//     },
//     name: 'REN Rhino',
//     symbol: 'REN-ETH UNI-V2 LP',
//     tokenSymbol: 'REN',
//     icon: '🦏',
//   },
//   {
//     pid: 14,
//     lpAddresses: {
//       1: '0xaad22f5543fcdaa694b68f94be177b561836ae57',
//     },
//     tokenAddresses: {
//       1: '0x68A118Ef45063051Eac49c7e647CE5Ace48a68a5',
//     },
//     name: 'BASED Bull',
//     symbol: 'BASE-sUSD UNI-V2 LP',
//     tokenSymbol: 'BASED',
//     icon: '🐂',
//   },
//   {
//     pid: 15,
//     lpAddresses: {
//       1: '0xcc3d1ecef1f9fd25599dbea2755019dc09db3c54',
//     },
//     tokenAddresses: {
//       1: '0x476c5E26a75bd202a9683ffD34359C0CC15be0fF',
//     },
//     name: 'SRM Shark',
//     symbol: 'SRM-ETH UNI-V2 LP',
//     tokenSymbol: 'SRM',
//     icon: '🦈',
//   },
//   {
//     pid: 16,
//     lpAddresses: {
//       1: '0xa5904961f61bae7c4dd8478077556c91bf291cfd',
//     },
//     tokenAddresses: {
//       1: '0xaba8cac6866b83ae4eec97dd07ed254282f6ad8a',
//     },
//     name: 'SUSHIv2 SUSHI',
//     symbol: 'SUSHIv2-ETH UNI-V2 LP',
//     tokenSymbol: 'SUSHIv2',
//     icon: '🍠',
//   },
//   {
//     pid: 17,
//     lpAddresses: {
//       1: '0x3da1313ae46132a397d90d95b1424a9a7e3e0fce',
//     },
//     tokenAddresses: {
//       1: '0xD533a949740bb3306d119CC777fa900bA034cd52',
//     },
//     name: 'CRV Crocodile',
//     symbol: 'CRV-ETH UNI-V2 LP',
//     tokenSymbol: 'CRV',
//     icon: '🐊',
//   },
]

export const supportedPoolsDegen = [
	{
	  pid: 1,
	  lpAddresses: {
		  42161:  '0xfc1acf07202f6fac951947427b79284d86a965d2',
	  },
	  tokenAddresses: {
		  42161: '0xdE31e75182276738B0c025daa8F80020A4F2fbFE',
	  },
	  tokenAddresses2: {
		  42161: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
	  },
	  
	  name: 'The Bee Hive!',
	  symbol: 'HONEY-ETH SLP',
	  tokenSymbol: 'HONEY',
	  tokenSymbol2: 'WETH',
	  icon: '🍯',
	},
]
