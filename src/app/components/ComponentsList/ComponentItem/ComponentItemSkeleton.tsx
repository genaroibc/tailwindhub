export function ComponentItemSkeleton() {
  return (
    <article className="max-w-full self-stretch flex flex-col items-stretch justify-between bg-transparent animate-pulse rounded-lg shadow-lg">
      <div className="block aspect-square object-cover rounded-2xl bg-gray-300"></div>
      <div className="flex flex-row gap-2 py-4 px-0 items-center">
        <div className="rounded-full w-full max-w-[2.5rem] max-h-[2.5rem] h-full aspect-square bg-gray-300"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </article>
  );
}
