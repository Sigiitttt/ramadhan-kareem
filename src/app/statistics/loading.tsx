// app/statistics/loading.tsx
export default function LoadingStatistik() {
    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <div className="h-8 w-32 bg-gray-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
                <div className="h-4 w-48 bg-gray-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
            </div>

            {/* Grid 2x2 Overview */}
            <div className="grid grid-cols-2 gap-3">
                {Array(4).fill(0).map((_, i) => (
                    <div key={i} className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 h-[104px] animate-pulse"></div>
                ))}
            </div>

            {/* Progress Card */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 h-[124px] animate-pulse"></div>

            {/* Chart */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 h-[216px] animate-pulse"></div>
        </div>
    );
}