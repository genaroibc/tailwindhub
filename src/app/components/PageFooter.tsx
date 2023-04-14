import Link from "next/link";
import { GitHubIcon } from "./shared/Icons";

export function PageFooter() {
  return (
    <footer>
      <section className="text-center flex flex-col gap-4 justify-center items-center max-w-7xl mx-auto py-8 px-4">
        TailwindHub is an open source project
        <Link
          className="flex gap-2 items-center justify-center"
          href="https://github.com/genaroibc/tailwindhub"
        >
          Collaborate on GitHub <GitHubIcon />
        </Link>
      </section>
    </footer>
  );
}
