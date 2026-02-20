// app/settings/loading.tsx
export default function LoadingSetelan() {
    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
                <div className="h-8 w-32 bg-gray-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
                <div className="h-4 w-48 bg-gray-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
            </div>

            <div className="bg-gray-200 dark:bg-zinc-800 rounded-2xl p-5 h-[88px] animate-pulse"></div>

            <div className="flex flex-col gap-3 mt-2">
                <div className="h-5 w-32 bg-gray-200 dark:bg-zinc-800 rounded-md mb-1 animate-pulse"></div>
                {Array(3).fill(0).map((_, i) => (
                    <div key={i} className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 h-[116px] animate-pulse"></div>
                ))}
            </div>
        </div>
    );
}