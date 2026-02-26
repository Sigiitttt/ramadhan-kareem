// app/prayer/loading.tsx
export default function LoadingPrayer() {
    return (
        <div className="flex flex-col gap-5 w-full">
            {/* Skeleton Header */}
            <div className="flex flex-col gap-2 mb-1">
                <div className="h-8 w-48 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
            </div>

            {/* Skeleton Countdown */}
            {/* Tinggi dikurangi sedikit dan sudut diubah ke 3xl */}
            <div className="bg-emerald-600/20 dark:bg-emerald-900/20 rounded-3xl p-4 h-[130px] animate-pulse"></div>

            {/* Skeleton Compass */}
            {/* Tinggi disesuaikan dan padding dikurangi agar selaras */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-5 h-[320px] shadow-sm animate-pulse flex flex-col items-center justify-center">
                <div className="h-5 w-32 bg-gray-200 dark:bg-zinc-800 rounded-md mb-6"></div>
                <div className="w-56 h-56 rounded-full bg-gray-200 dark:bg-zinc-800"></div>
            </div>

            {/* Skeleton Prayer List (6 baris sholat) */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-2 shadow-sm animate-pulse">
                {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="flex justify-between items-center p-3.5 border-b border-gray-50 dark:border-zinc-800/50 last:border-0">
                        <div className="h-5 w-20 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
                        <div className="h-6 w-16 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}