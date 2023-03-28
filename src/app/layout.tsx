import "@/styles/globals.css";
import { Header } from "./components/Header/Header";
import { Lexend_Deca } from "next/font/google";
import Script from "next/script";

const lexendDeca = Lexend_Deca({
  weight: ["300", "600", "800"],
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html className={lexendDeca.className} lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <Script strategy="beforeInteractive" src="tailwind-3.2.6.min.js" />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
