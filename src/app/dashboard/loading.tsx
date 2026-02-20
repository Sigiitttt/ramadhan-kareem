// app/dashboard/loading.tsx
// app/dashboard/loading.tsx
export default function LoadingDashboard() {
    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <div className="h-8 w-40 bg-gray-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
                <div className="h-4 w-48 bg-gray-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
            </div>

            {/* Level Card */}
            <div className="h-[180px] bg-gray-200 dark:bg-zinc-800 rounded-2xl w-full animate-pulse"></div>

            {/* Sholat Card */}
            <div className="flex flex-col gap-2">
                <div className="h-5 w-32 bg-gray-200 dark:bg-zinc-800 rounded-md animate-pulse mb-1"></div>
                <div className="h-[140px] bg-emerald-600/30 dark:bg-emerald-900/30 rounded-2xl w-full animate-pulse"></div>
            </div>

            {/* Habit Summary Card */}
            <div className="flex flex-col gap-2">
                <div className="h-5 w-32 bg-gray-200 dark:bg-zinc-800 rounded-md animate-pulse mb-1"></div>
                <div className="h-[88px] bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl w-full animate-pulse"></div>
            </div>
        </div>
    );
}