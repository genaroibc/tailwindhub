import Link from "next/link";

export function Hero() {
  return (
    <div className="flex-col gap-12 px-2 flex justify-center items-center py-20 max-w-[1200px] my-0 mx-auto md:gap-8 md:px-4 md:flex-row">
      <div className="w-full text-center p-0 md:p-4 md:w-3/5 md:text-left">
        <h1 className="text-4xl font-bold md:text-6xl">TailwindHub</h1>
        <p className="text-base mt-4 mx-auto mb-8 md:text-2xl">
          Free, open-source platform to share Tailwind components
        </p>
        <Link
          href="/editor"
          className="my-0 mx-auto text-base block w-fit bg-light-brown text-white rounded-full py-3 px-6 font-bold border-none cursor-pointer transition-colors hover:bg-dark-brown md:m-0"
        >
          Go to editor
        </Link>
      </div>

      <div className="w-full bg-dimmed-black rounded-full grid gap-6 grid-cols-2 grid-rows-2 md:w-2/5 [&>img]:w-full [&>img]:h-full [&>img]:rounded-lg [&>img]:max-w-[150px] [&>img]:md:max-w-[250px]">
        <img
          className="justify-self-end self-end"
          width="200"
          height="200"
          src="https://res.cloudinary.com/shape-snap/image/upload/w_400,h_400,ar_1,c_fill/v1686001918/qjyoqs4bca56qoccgayn.png"
          alt="Timeline component preview"
        />
        <img
          className="translate-y-1/4 justify-self-start self-end"
          width="200"
          height="200"
          src="https://res.cloudinary.com/shape-snap/image/upload/w_400,h_400,ar_1,c_fill/v1686002391/aowxw2jn1opalqj9crwi.png"
          alt="Product card component preview"
        />
        <img
          className="justify-self-end self-start"
          width="200"
          height="200"
          src="https://res.cloudinary.com/shape-snap/image/upload/w_400,h_400,ar_1,c_fill/v1686000874/le7owgocnv9ofvtzzwcn.png"
          alt="Button component preview"
        />
        <img
          className="translate-y-1/4 justify-self-start self-start"
          width="200"
          height="200"
          src="https://res.cloudinary.com/shape-snap/image/upload/w_400,h_400,ar_1,c_fill/v1686001762/hzovyl8x16e6cbreyg0j.png"
          alt="SignUp form component preview"
        />
      </div>
    </div>
  );
}
