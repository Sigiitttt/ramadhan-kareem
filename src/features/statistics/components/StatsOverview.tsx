// features/statistics/components/StatsOverview.tsx
import { Flame, Trophy, Zap, Activity } from 'lucide-react';
import { DataStatistik } from '../types';

interface PropsOverview {
    data: DataStatistik;
}

export default function RingkasanStatistik({ data }: PropsOverview) {
    const kartu = [
        { label: 'Total Ibadah', nilai: data.totalIbadah, ikon: Activity, warna: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
        { label: 'Streak Terpanjang', nilai: `${data.streakTerpanjang} Hari`, ikon: Trophy, warna: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
        { label: 'Streak Saat Ini', nilai: `${data.streakSaatIni} Hari`, ikon: Flame, warna: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
        { label: 'Penyelesaian', nilai: `${data.completionRate}%`, ikon: Zap, warna: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    ];

    return (
        <div className="grid grid-cols-2 gap-3">
            {kartu.map((item, index) => {
                const Ikon = item.ikon;
                return (
                    <div key={index} className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 ${item.bg} ${item.warna}`}>
                            <Ikon size={16} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{item.nilai}</div>
                            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">{item.label}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}