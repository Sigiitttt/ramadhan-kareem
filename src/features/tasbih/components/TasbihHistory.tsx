// features/tasbih/components/TasbihHistory.tsx
import { Activity } from 'lucide-react';

interface PropsRiwayat {
    totalHariIni: number;
}

export default function RiwayatTasbih({ totalHariIni }: PropsRiwayat) {
    return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                    <Activity size={20} />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Total Hari Ini</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Seluruh dzikir tersimpan</span>
                </div>
            </div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {totalHariIni}
            </div>
        </div>
    );
}