import { wagmiAdapter, PROJECT_ID } from "../config";
import { createAppKit } from "@reown/appkit";
import { mainnet, arbitrum } from "@reown/appkit/networks";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

const queryClient = new QueryClient();

if (!PROJECT_ID) {
  throw new Error("Project ID is not provided");
}

const metadata = {
  name: "appkit-example",
  description: "AppKit Example - EVM",
  url: "https://example.com",
  icons: "https://example.com/icon",
};

const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId: PROJECT_ID,
  networks: [mainnet, arbitrum],
  defaultNetwork: mainnet,
  features: {
    analytics: true,
    email: true,
    socials: ["google", "github", "x", "discord"],
    emailShowWallets: true,
  },
  themeMode: "dark",
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
