import "@/styles/globals.css";
import { Lexend_Deca } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

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
      <Analytics />
      <body>{children}</body>
    </html>
  );
}
