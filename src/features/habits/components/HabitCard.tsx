// features/habits/components/HabitCard.tsx
import { Check, Trash2 } from 'lucide-react';
import { DataHabit } from '../types';
import { dapatkanTujuhHariTerakhir, formatHariSingkat } from '@/utils/tanggal';

interface PropsKartuHabit {
    habit: DataHabit;
    tanggalAktif: string;
    onToggle: (id: string, tanggal: string) => void;
    onHapus: (id: string) => void;
}

export default function KartuHabit({ habit, tanggalAktif, onToggle, onHapus }: PropsKartuHabit) {
    const udahSelesaiHariIni = habit.riwayatSelesai.includes(tanggalAktif);
    const tujuhHariTerakhir = dapatkanTujuhHariTerakhir();

    return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm mb-3">
            <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
                        {habit.nama}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
                        {habit.kategori}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    {/* Tombol Hapus (Cuma muncul kalau habit custom) */}
                    {habit.id.startsWith('h-custom') && (
                        <button
                            onClick={() => onHapus(habit.id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    )}

                    {/* Tombol Checklist Besar */}
                    <button
                        onClick={() => onToggle(habit.id, tanggalAktif)}
                        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${udahSelesaiHariIni
                                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                                : 'bg-gray-100 dark:bg-zinc-800 text-gray-300 dark:text-zinc-600 hover:bg-gray-200 dark:hover:bg-zinc-700'
                            }`}
                    >
                        <Check size={24} strokeWidth={udahSelesaiHariIni ? 3 : 2} />
                    </button>
                </div>
            </div>

            {/* Calendar View Sederhana (Mini Tracker 7 Hari) */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-zinc-800">
                {tujuhHariTerakhir.map((tgl) => {
                    const selesai = habit.riwayatSelesai.includes(tgl);
                    const hariIni = tgl === tanggalAktif;

                    return (
                        <div key={tgl} className="flex flex-col items-center gap-1">
                            <span className={`text-[10px] ${hariIni ? 'font-bold text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                                {formatHariSingkat(tgl)}
                            </span>
                            <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${selesai
                                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                                        : 'bg-gray-50 dark:bg-zinc-800 text-transparent'
                                    } ${hariIni && !selesai ? 'ring-2 ring-gray-200 dark:ring-zinc-700' : ''}`}
                            >
                                {selesai && <Check size={12} strokeWidth={3} />}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}