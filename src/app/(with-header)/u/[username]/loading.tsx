import { ComponentItemSkeleton } from "@/app/(with-header)/components/ComponentsList/ComponentItem/ComponentItemSkeleton";

export default function Loading() {
  return (
    <main>
      <section className="relative bg-slate-950 px-4 py-20 flex flex-col gap-4 items-center animate-pulse">
        <div className="max-w-page-max-width mx-auto">
          <article className="flex flex-col items-center gap-2 mt-4 mb-6">
            <div className="bg-cover aspect-square rounded-full h-32 w-32 bg-gray-300 mb-4" />

            <div className="text-3xl text-gray-100 w-60 h-7 mb-2 rounded-md bg-gray-300" />
            <div className="text-xl text-gray-400 w-16 h-5 rounded-md bg-gray-300" />
          </article>

          <div className="flex h-6 w-32 mx-auto items-center gap-2 bg-gray-300"></div>
        </div>
      </section>

      <div className="my-20">
        <div className="animate-pulse h-14 bg-gray-300 rounded max-w-full w-96 mx-auto mb-8" />
        <section className="grid grid-cols-[repeat(auto-fit,minmax(min(150px,100%),1fr))] md:grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-8 w-full max-w-page-max-width my-0 mx-auto px-4">
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <ComponentItemSkeleton key={index} />
            ))}
        </section>
      </div>
    </main>
  );
}
