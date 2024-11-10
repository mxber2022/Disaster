import { cookieStorage, createStorage, http } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  mainnet,
  arbitrum,
  sepolia,
  zoraSepolia,
  storyTestnet,
  baseSepolia,
  auroraTestnet,
} from "@reown/appkit/networks";
import { defineChain } from "@reown/appkit/networks";

export const projectId = "9b2fd99411b0746ea4ca219cf395723d";

const customNetwork = defineChain({
  id: 5115,
  caipNetworkId: "eip155:5115",
  chainNamespace: "eip155",
  name: "CITREA TESTNET",
  nativeCurrency: {
    decimals: 18,
    name: "CBTC",
    symbol: "CBTC",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.citrea.xyz"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "BLOCK_EXPLORER_URL" },
  },
  contracts: {},
});

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [zoraSepolia, auroraTestnet, customNetwork];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
