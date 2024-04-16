import Page from "../components/Layout/Page";
import { Inter } from "next/font/google";
import InfiniteCanvas from "../components/Sections/InfiniteCanvas";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Page>
      <InfiniteCanvas />
    </Page>
  );
}
