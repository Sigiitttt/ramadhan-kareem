// app/tasbih/loading.tsx
export default function LoadingTasbih() {
  return (
    <div className="flex flex-col gap-6">
      {/* Skeleton Header */}
      <div className="flex flex-col gap-2">
        <div className="h-8 w-40 bg-gray-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
        <div className="h-4 w-48 bg-gray-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
      </div>

      {/* Skeleton Riwayat Harian */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 h-[76px] w-full animate-pulse flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-zinc-800"></div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
            <div className="h-3 w-32 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
          </div>
        </div>
        <div className="h-8 w-12 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
      </div>

      {/* Skeleton Counter Besar */}
      <div className="flex flex-col items-center justify-center py-10 gap-10">
        <div className="w-64 h-64 rounded-full bg-gray-200 dark:bg-zinc-800 animate-pulse"></div>
        <div className="h-12 w-40 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}