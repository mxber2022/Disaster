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
//import { EVMWalletChain,NetworkId } from '@/config';

export const projectId = "9b2fd99411b0746ea4ca219cf395723d";

// const near = {
//   id: EVMWalletChain.chainId,
//   name: EVMWalletChain.name,
//   nativeCurrency: {
//     decimals: 18,
//     name: 'NEAR',
//     symbol: 'NEAR',
//   },
//   rpcUrls: {
//     default: { http: [EVMWalletChain.rpc] },
//     public: { http: [EVMWalletChain.rpc] },
//   },
//   blockExplorers: {
//     default: {
//       name: 'NEAR Explorer',
//       url: EVMWalletChain.explorer,
//     },
//   },
//   testnet: NetworkId === 'testnet',
// };

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [zoraSepolia, auroraTestnet];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
