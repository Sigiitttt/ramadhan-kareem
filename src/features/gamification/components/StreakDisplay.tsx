// features/gamification/components/StreakDisplay.tsx
// features/gamification/components/StreakDisplay.tsx
import { Flame } from 'lucide-react';

interface PropsStreak {
    streakSaatIni: number;
    streakTerpanjang: number;
}

export default function TampilanStreak({ streakSaatIni, streakTerpanjang }: PropsStreak) {
    const apiMenyala = streakSaatIni > 0;

    return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${apiMenyala
                        ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.2)]'
                        : 'bg-gray-100 dark:bg-zinc-800 text-gray-400'
                    }`}>
                    <Flame size={26} className={apiMenyala ? 'fill-orange-500 animate-pulse' : ''} />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">
                        {streakSaatIni} Hari Runtun
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Rekor terbaik: <strong className="text-gray-700 dark:text-gray-300">{streakTerpanjang} hari</strong>
                    </p>
                </div>
            </div>

            {apiMenyala ? (
                <span className="text-xs font-bold bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400 px-3 py-1 rounded-full">
                    On Fire! 🔥
                </span>
            ) : (
                <span className="text-xs font-medium bg-gray-100 text-gray-500 dark:bg-zinc-800 dark:text-gray-400 px-3 py-1 rounded-full">
                    Mulai Runtunan
                </span>
            )}
        </div>
    );
}