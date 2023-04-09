import "@/styles/globals.css";
import { Lexend_Deca } from "next/font/google";

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
      <body>{children}</body>
    </html>
  );
}
