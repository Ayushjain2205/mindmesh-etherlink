import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  embeddedWallet,
  smartWallet,
} from "@thirdweb-dev/react";
import { Toaster } from "react-hot-toast";
import { EtherlinkTestnet } from "@thirdweb-dev/chains";

const smartWalletConfig = {
  factoryAddress: "0xe0670FA34Bfd91D1239A52e430D985d3862e132A",
  gasless: true,
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={EtherlinkTestnet}
      clientId="aa131b3a51f3247c974b4611ac4ff73e"
      supportedWallets={[smartWallet(embeddedWallet(), smartWalletConfig)]}
    >
      <Toaster />
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
