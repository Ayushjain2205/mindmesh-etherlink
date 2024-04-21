import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  embeddedWallet,
  smartWallet,
} from "@thirdweb-dev/react";
import { Toaster } from "react-hot-toast";
import { MorphTestnet } from "@thirdweb-dev/chains";

const smartWalletConfig = {
  factoryAddress: "0x77e8DFa0a5A5F50bc4e62A52E8eB4F30a8162176",
  gasless: true,
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={MorphTestnet}
      clientId="aa131b3a51f3247c974b4611ac4ff73e"
      supportedWallets={[smartWallet(embeddedWallet(), smartWalletConfig)]}
    >
      <Toaster />
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
