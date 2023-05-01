import Link from "next/link";

export function Hero() {
  return (
    <div className="flex-col gap-4 px-2 flex justify-center items-center py-20 max-w-[1200px] my-0 mx-auto md:gap-8 md:px-4 md:flex-row">
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

      <div className="w-full grid gap-6 grid-cols-2 grid-rows-2 md:w-2/5 [&>img]:w-4/5 [&>img]:h-4/5 [&>img]:rounded-lg [&>img]:max-w-[100px] [&>img]:md:max-w-[200px]">
        <img
          className="justify-self-end self-end"
          src="https://res.cloudinary.com/shape-snap/image/upload/v1682357375/myjakklmgr7ul1f0l7hd.png"
          alt="Timeline component preview"
        />
        <img
          className="translate-y-1/4 justify-self-start self-end"
          src="https://res.cloudinary.com/shape-snap/image/upload/v1682362688/mjf2vot4s6r4iplkq3m1.png"
          alt="Product card component preview"
        />
        <img
          className="justify-self-end self-start"
          src="https://res.cloudinary.com/shape-snap/image/upload/w_400,h_400,ar_1,c_fill/v1682535061/f8zw37cnl8n45ukux9tj.png"
          alt="Button component preview"
        />
        <img
          className="translate-y-1/4 justify-self-start self-start"
          src="https://res.cloudinary.com/shape-snap/image/upload/w_400,h_400,ar_1,c_fill/v1682533754/zvzjjl7lvfpsps9qf4ch.png"
          alt="SignUp form component preview"
        />
      </div>
    </div>
  );
}
