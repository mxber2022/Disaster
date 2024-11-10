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
import { defineChain } from "@reown/appkit/networks";

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

const modal = createAppKit({
  themeMode: "dark",
  themeVariables: {},
  adapters: [wagmiAdapter],
  projectId,
  networks: [zoraSepolia, auroraTestnet, customNetwork],
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
