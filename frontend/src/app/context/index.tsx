"use client";

import { wagmiAdapter, projectId } from "../config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import {
  sepolia,
  zoraSepolia,
  mainnet,
  auroraTestnet,
} from "@reown/appkit/networks";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
//import { EVMWalletChain,NetworkId } from '@/config';

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
  name: "AI Collab",
  description: "",
  url: "", // origin must match your domain & subdomain
  icons: [""],
};

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

// Create the modal
const modal = createAppKit({
  themeMode: "dark",
  themeVariables: {},
  adapters: [wagmiAdapter],
  projectId,
  networks: [zoraSepolia, auroraTestnet],
  defaultNetwork: zoraSepolia,
  allowUnsupportedChain: true,
  metadata: metadata,
  features: {
    analytics: false, // Optional - defaults to your Cloud configuration
  },
});

function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
