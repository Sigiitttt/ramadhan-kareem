// app/quran/loading.tsx
export default function LoadingQuran() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col mb-2 gap-2">
                <div className="h-8 w-40 bg-gray-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
                <div className="h-4 w-48 bg-gray-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 h-40 animate-pulse"></div>

            <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 h-32 animate-pulse"></div>
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 h-32 animate-pulse"></div>
            </div>
        </div>
    );
}