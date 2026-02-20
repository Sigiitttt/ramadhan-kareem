// features/quran/components/QuranProgressCard.tsx
import { BookOpen, Minus, Plus, Target } from 'lucide-react';

interface PropsQuranCard {
    targetKhatam: number;
    totalJuzTerbaca: number;
    targetTotalJuz: number;
    persentaseProgress: number;
    juzHariIni: number;
    onUpdateJuz: (tambahan: number) => void;
    onUbahTarget: (target: number) => void;
}

export default function KartuProgressQuran({
    targetKhatam,
    totalJuzTerbaca,
    targetTotalJuz,
    persentaseProgress,
    juzHariIni,
    onUpdateJuz,
    onUbahTarget
}: PropsQuranCard) {

    return (
        <div className="flex flex-col gap-4">
            {/* Kartu Progress Utama */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Progress Khatam</h3>
                            <p className="text-sm text-gray-500">{totalJuzTerbaca} dari {targetTotalJuz} Juz</p>
                        </div>
                    </div>
                    <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        {persentaseProgress}%
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-3 mb-2">
                    <div
                        className="bg-emerald-500 h-3 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${persentaseProgress}%` }}
                    ></div>
                </div>

                <div className="flex justify-between text-xs font-medium text-gray-400 mt-2">
                    <span>Mulai</span>
                    <span>Target: {targetKhatam}x Khatam</span>
                </div>
            </div>

            {/* Kartu Input Harian & Target */}
            <div className="grid grid-cols-2 gap-3">
                {/* Input Juz Hari Ini */}
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center">
                    <span className="text-sm text-gray-500 font-medium mb-3">Bacaan Hari Ini</span>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => onUpdateJuz(-0.5)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/50"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="text-xl font-bold w-12 text-center">{juzHariIni} <span className="text-xs text-gray-400 block font-normal">Juz</span></span>
                        <button
                            onClick={() => onUpdateJuz(0.5)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/50"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>

                {/* Setting Target Khatam */}
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center">
                    <span className="text-sm text-gray-500 font-medium mb-3 flex items-center gap-1">
                        <Target size={14} /> Target Khatam
                    </span>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => onUbahTarget(targetKhatam - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-400"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="text-xl font-bold w-8 text-center">{targetKhatam}x</span>
                        <button
                            onClick={() => onUbahTarget(targetKhatam + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-400"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}