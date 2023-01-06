import { ethers } from "ethers";
import { sample } from "lodash";
import { isDevelopment } from "lib/legacy";
import { NetworkMetadata } from "lib/wallets";

const { parseEther } = ethers.utils;

export const MAINNET = 82;
export const METERTEST = 83;

// TODO take it from web3
export const DEFAULT_CHAIN_ID = METERTEST;
export const CHAIN_ID = DEFAULT_CHAIN_ID;

export const SUPPORTED_CHAIN_IDS = [METERTEST];

if (isDevelopment()) {
  SUPPORTED_CHAIN_IDS.push(MAINNET);
}

export const IS_NETWORK_DISABLED = {
  [METERTEST]: false,
  [MAINNET]: false,
};

export const CHAIN_NAMES_MAP = {
  [MAINNET]: "METER",
  [METERTEST]: "METER Testnet",
};

export const GAS_PRICE_ADJUSTMENT_MAP = {
  [METERTEST]: "500000000000", // 500 gwei
};

export const MAX_GAS_PRICE_MAP = {
  [METERTEST]: "500000000000", // 500 gwei
};

export const HIGH_EXECUTION_FEES_MAP = {
  [MAINNET]: 3, // 3 USD
  [METERTEST]: 3, // 3 USD
};

const constants = {
  [MAINNET]: {
    nativeTokenSymbol: "MTR",
    defaultCollateralSymbol: "MTR",
    defaultFlagOrdersEnabled: false,
    positionReaderPropsLength: 8,
    v2: false,
  },

  [METERTEST]: {
    wrappedTokenSymbol: "WMTR",
    nativeTokenSymbol: "MTR",
    defaultCollateralSymbol: "MTR",
    defaultFlagOrdersEnabled: true,
    positionReaderPropsLength: 8,
    SWAP_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
    INCREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
    DECREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.000300001"),
    v2: false,
  },

  // [ARBITRUM_TESTNET]: {
  //   nativeTokenSymbol: "ETH",
  //   defaultCollateralSymbol: "USDC",
  //   defaultFlagOrdersEnabled: false,
  //   positionReaderPropsLength: 9,
  //   v2: true,

  //   SWAP_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
  //   INCREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
  //   // contract requires that execution fee be strictly greater than instead of gte
  //   DECREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.000300001"),
  // },
};

const ALCHEMY_WHITELISTED_DOMAINS = ["gmx.io", "app.gmx.io"];

export const ARBITRUM_RPC_PROVIDERS = [getDefaultArbitrumRpcUrl()];
export const AVALANCHE_RPC_PROVIDERS = ["https://api.avax.network/ext/bc/C/rpc"];
export const METERTEST_RPC_PROVIDERS = ["https://rpctest.meter.io"];

// BSC METERTEST
// const RPC_PROVIDERS = [
//   "https://data-seed-prebsc-1-s1.binance.org:8545",
//   "https://data-seed-prebsc-2-s1.binance.org:8545",
//   "https://data-seed-prebsc-1-s2.binance.org:8545",
//   "https://data-seed-prebsc-2-s2.binance.org:8545",
//   "https://data-seed-prebsc-1-s3.binance.org:8545",
//   "https://data-seed-prebsc-2-s3.binance.org:8545"
// ]

// METER MAINNET
export const METER_RPC_PROVIDERS = ["https://rpc.meter.io"];

// METER MAINNET
export const METER_TEST_RPC_PROVIDERS = ["https://rpctest.meter.io"];

export const ETH_MAINNET_PROVIDERS = ["https://rpc.ankr.com/eth"];

export const RPC_PROVIDERS = {
  [MAINNET]: METER_RPC_PROVIDERS,
  [METERTEST]: METER_TEST_RPC_PROVIDERS,
};

export const FALLBACK_PROVIDERS = {
  [METERTEST]: [getAlchemyHttpUrl()],
  [MAINNET]: ["https://rpc.meter.io"],
};

export const NETWORK_METADATA: { [chainId: number]: NetworkMetadata } = {
  [MAINNET]: {
    chainId: "0x" + MAINNET.toString(16),
    chainName: "METER",
    nativeCurrency: {
      name: "MTR",
      symbol: "MTR",
      decimals: 18,
    },
    rpcUrls: METER_RPC_PROVIDERS,
    blockExplorerUrls: ["https://scan.meter.io"],
  },
  [METERTEST]: {
    chainId: "0x" + METERTEST.toString(16),
    chainName: "METER Testnet",
    nativeCurrency: {
      name: "MTR",
      symbol: "MTR",
      decimals: 18,
    },
    rpcUrls: METER_TEST_RPC_PROVIDERS,
    blockExplorerUrls: ["https://scan-warringstakes.meter.io/"],
  },
  // [ARBITRUM_TESTNET]: {
  //   chainId: "0x" + ARBITRUM_TESTNET.toString(16),
  //   chainName: "Arbitrum Testnet",
  //   nativeCurrency: {
  //     name: "ETH",
  //     symbol: "ETH",
  //     decimals: 18,
  //   },
  //   rpcUrls: ["https://rinkeby.arbitrum.io/rpc"],
  //   blockExplorerUrls: ["https://rinkeby-explorer.arbitrum.io/"],
  // },
  // [ARBITRUM]: {
  //   chainId: "0x" + ARBITRUM.toString(16),
  //   chainName: "Arbitrum",
  //   nativeCurrency: {
  //     name: "ETH",
  //     symbol: "ETH",
  //     decimals: 18,
  //   },
  //   rpcUrls: ARBITRUM_RPC_PROVIDERS,
  //   blockExplorerUrls: [getExplorerUrl(ARBITRUM)],
  // },
  // [AVALANCHE]: {
  //   chainId: "0x" + AVALANCHE.toString(16),
  //   chainName: "Avalanche",
  //   nativeCurrency: {
  //     name: "AVAX",
  //     symbol: "AVAX",
  //     decimals: 18,
  //   },
  //   rpcUrls: AVALANCHE_RPC_PROVIDERS,
  //   blockExplorerUrls: [getExplorerUrl(AVALANCHE)],
  // },
};

export const getConstant = (chainId: number, key: string) => {
  if (!constants[chainId]) {
    throw new Error(`Unsupported chainId ${chainId}`);
  }

  if (!(key in constants[chainId])) {
    throw new Error(`Key ${key} does not exist for chainId ${chainId}`);
  }

  return constants[chainId][key];
};

export function getChainName(chainId: number) {
  return CHAIN_NAMES_MAP[chainId];
}

export function getDefaultArbitrumRpcUrl() {
  return "https://arb1.arbitrum.io/rpc";
}

export function getRpcUrl(chainId: number): string | undefined {
  return sample(RPC_PROVIDERS[chainId]);
}

export function getFallbackRpcUrl(chainId: number): string | undefined {
  return sample(FALLBACK_PROVIDERS[chainId]);
}

export function getAlchemyHttpUrl() {
  return "https://rpctest.meter.io";
}

export function getAlchemyWsUrl() {
  return "wss://wstest.meter.io";
}

export function getExplorerUrl(chainId) {
  if (chainId === MAINNET) {
    return "https://scan.meter.io/";
  } else if (chainId === METERTEST) {
    return "https://scan-warringstakes.meter.io/";
  }
  return "https://etherscan.io/";
}

export function getHighExecutionFee(chainId) {
  return HIGH_EXECUTION_FEES_MAP[chainId] || 3;
}

export function isSupportedChain(chainId) {
  return SUPPORTED_CHAIN_IDS.includes(chainId);
}
