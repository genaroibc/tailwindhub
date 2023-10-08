import { LoginModal } from "@/app/components/LoginModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LoginModal />
        {children}
      </body>
    </html>
  );
}
