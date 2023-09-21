export default function Loading() {
  return (
    <>
      <div className="relative flex flex-col gap-4 animate-pulse">
        <div className="bg-cover w-96 h-8 bg-gray-300 mb-6" />
        <div className="flex items-center gap-4 mb-2">
          <div className="rounded-full bg-gray-300 w-6 h-6" />
          <div className="w-32 h-4 bg-gray-300" />
        </div>

        <div className="bg-cover w-32 h-4 bg-gray-300 mb-2" />

        <div className="bg-cover w-32 h-4 bg-gray-300 mb-2" />

        <div className="flex items-center gap-4 mt-4">
          <div className="rounded-lg bg-gray-300 w-12 h-6" />
          <div className="rounded-lg bg-gray-300 w-12 h-6" />
        </div>
      </div>

      <div className="mt-6">
        <div className="animate-pulse h-96 bg-gray-300 rounded max-w-full w-full mb-8" />
      </div>
    </>
  );
}
