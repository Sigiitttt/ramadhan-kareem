// app/prayer/loading.tsx
export default function LoadingPrayer() {
    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Skeleton Header */}
            <div className="flex flex-col gap-2">
                <div className="h-8 w-48 bg-gray-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
            </div>

            {/* Skeleton Countdown */}
            <div className="bg-emerald-600/50 dark:bg-emerald-900/50 rounded-2xl p-6 h-[140px] animate-pulse"></div>

            {/* Skeleton Compass */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 h-[340px] shadow-sm animate-pulse flex flex-col items-center justify-center">
                <div className="h-6 w-32 bg-gray-200 dark:bg-zinc-800 rounded-md mb-6"></div>
                <div className="w-60 h-60 rounded-full bg-gray-200 dark:bg-zinc-800"></div>
            </div>

            {/* Skeleton Prayer List (6 baris sholat) */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-2 shadow-sm animate-pulse">
                {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-zinc-800/50 last:border-0">
                        <div className="h-5 w-20 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
                        <div className="h-6 w-16 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}