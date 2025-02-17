import { cookieStorage, createStorage } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, arbitrum } from "@reown/appkit/networks";

export const PROJECT_ID = process.env.PROJECT_ID;

if (!PROJECT_ID) {
  throw new Error("Missing PROJECT_ID");
}

export const networks = [mainnet, arbitrum];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  networks,
  projectId: PROJECT_ID,
});

export const config = wagmiAdapter.wagmiConfig;
