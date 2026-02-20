// features/tasbih/components/TasbihCounter.tsx
import { RotateCcw } from 'lucide-react';
import { hitungProgressSiklus } from '../utils/tasbihLogic';

interface PropsCounter {
    hitungan: number;
    onTambah: () => void;
    onReset: () => void;
}

export default function KonterTasbih({ hitungan, onTambah, onReset }: PropsCounter) {
    const siklusSaatIni = hitungProgressSiklus(hitungan, 33);
    const persentaseSiklus = (siklusSaatIni / 33) * 100;

    return (
        <div className="flex flex-col items-center justify-center py-10">
            <button
                onClick={onTambah}
                className="relative w-64 h-64 flex flex-col items-center justify-center rounded-full bg-white dark:bg-zinc-900 border-8 border-gray-50 dark:border-zinc-800 shadow-xl active:scale-95 transition-transform duration-100"
            >
                <div
                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 opacity-20"
                    style={{ transform: `rotate(${persentaseSiklus * 3.6}deg)` }}
                />

                <span className="text-7xl font-black text-gray-800 dark:text-gray-100 tabular-nums tracking-tighter">
                    {hitungan}
                </span>
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-2">
                    Ketuk untuk dzikir
                </span>
            </button>

            {/* Tombol Reset Sesi */}
            <button
                onClick={onReset}
                disabled={hitungan === 0}
                className="mt-10 flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 font-medium disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
            >
                <RotateCcw size={18} /> Reset Hitungan
            </button>
        </div>
    );
}