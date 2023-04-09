import Link from "next/link";

export function Hero() {
  return (
    <div className="flex-col gap-4 px-2 flex justify-center items-center py-20 max-w-[1200px] my-0 mx-auto md:gap-8 md:px-4 md:flex-row">
      <div className="w-full text-center p-0 md:p-4 md:w-3/5 md:text-left">
        <h1 className="text-4xl font-bold md:text-6xl">TailwindHub</h1>
        <p className="text-base mt-4 mx-auto mb-8 md:text-2xl">
          The best place to share Tailwind components
        </p>
        <Link
          href="/editor"
          className="my-0 mx-auto text-base block w-fit bg-light-brown text-white rounded-full py-3 px-6 font-bold border-none cursor-pointer transition-colors hover:bg-dark-brown md:m-0"
        >
          Go to editor
        </Link>
      </div>

      <div className="w-full grid gap-6 grid-cols-2 grid-rows-2 md:w-2/5 [&>img]:w-4/5 [&>img]:h-4/5 [&>img]:rounded-lg [&>img]:max-w-[100px] [&>img]:md:max-w-[200px]">
        <img
          className="justify-self-end self-end"
          src="https://picsum.photos/200"
          alt="a login form component"
        />
        <img
          className="translate-y-1/4 justify-self-start self-end"
          src="https://picsum.photos/200"
          alt="a user card component"
        />
        <img
          className="justify-self-end self-start"
          src="https://picsum.photos/200"
          alt="a fancy button component"
        />
        <img
          className="translate-y-1/4 justify-self-start self-start"
          src="https://picsum.photos/200"
          alt="a unordered list component"
        />
      </div>
    </div>
  );
}
