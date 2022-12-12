import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Josefin_Sans } from "@next/font/google";

const font = Josefin_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});

console.log(font);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={font.className}>
      <Component {...pageProps} />
    </div>
  );
}
