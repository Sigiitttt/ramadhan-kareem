// features/statistics/components/ProgressCard.tsx
import { Target } from 'lucide-react';

interface PropsProgress {
    konsistensi30Hari: number;
}

export default function KartuProgress({ konsistensi30Hari }: PropsProgress) {
    return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <Target size={20} className="text-emerald-600 dark:text-emerald-400" />
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">Konsistensi 30 Hari</h3>
                </div>
                <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{konsistensi30Hari}%</span>
            </div>

            <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-4 mb-2 overflow-hidden">
                <div
                    className="bg-emerald-500 h-4 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${konsistensi30Hari}%` }}
                />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                {konsistensi30Hari >= 80 ? 'Luar biasa! Pertahankan terus konsistensimu. 🔥' :
                    konsistensi30Hari >= 50 ? 'Bagus! Masih bisa ditingkatkan lagi. 💪' :
                        'Yuk semangat lagi! Belum terlambat untuk mengejar target. ✨'}
            </p>
        </div>
    );
}