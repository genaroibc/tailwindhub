import { TailwindHubLogo } from "@/app/(with-header)/components/shared/Icons";
import Link from "next/link";

export function HomeLink() {
  return (
    <Link href="/">
      <span className="font-bold flex items-center justify-center gap-2">
        <TailwindHubLogo />
        <span className="hidden sm:block">TailwindHub</span>
      </span>
    </Link>
  );
}
