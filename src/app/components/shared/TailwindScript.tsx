import Script from "next/script";

export function TailwindScript() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script strategy="beforeInteractive" src="/tailwind-3.2.6.min.js" />
    </>
  );
}
