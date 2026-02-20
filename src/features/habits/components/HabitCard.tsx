// features/habits/components/HabitCard.tsx
import { Check, Trash2, Zap } from 'lucide-react';
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

    // Hitung streak sederhana untuk 7 hari terakhir (Mini-gamification)
    const streak7Hari = tujuhHariTerakhir.filter(tgl => habit.riwayatSelesai.includes(tgl)).length;

    return (
        <div className={`group relative overflow-hidden bg-white dark:bg-zinc-900 border rounded-3xl p-5 transition-all duration-500 hover:shadow-md mb-1 ${udahSelesaiHariIni
            ? 'border-emerald-200 dark:border-emerald-800/60 bg-gradient-to-br from-emerald-50/40 to-white dark:from-emerald-950/20 dark:to-zinc-900 shadow-[0_4px_20px_rgba(16,185,129,0.06)]'
            : 'border-gray-100 dark:border-zinc-800'
            }`}>

            {/* Dekorasi Latar Belakang (Muncul saat selesai) */}
            {udahSelesaiHariIni && (
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-2xl pointer-events-none transition-opacity duration-700"></div>
            )}

            <div className="flex justify-between items-center mb-5 relative z-10">

                {/* Info Habit */}
                <div className="flex flex-col gap-1.5 flex-grow pr-4">
                    <div className="flex items-center gap-2">
                        {/* Badge Kategori */}
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md transition-colors duration-300 ${udahSelesaiHariIni
                            ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'
                            : 'bg-gray-100 text-gray-500 dark:bg-zinc-800 dark:text-gray-400'
                            }`}>
                            {habit.kategori}
                        </span>

                        {/* Indikator Api (Menyala jika 3+ hari dalam seminggu) */}
                        {streak7Hari >= 3 && (
                            <span className="flex items-center gap-0.5 text-[10px] font-bold text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-1.5 py-0.5 rounded-md" title={`${streak7Hari} hari minggu ini`}>
                                <Zap size={10} className="fill-orange-500" /> {streak7Hari}/7
                            </span>
                        )}
                    </div>

                    {/* Nama Habit dengan Efek Coret */}
                    <span className={`font-bold text-[17px] leading-tight transition-all duration-500 ${udahSelesaiHariIni
                        ? 'text-gray-400 dark:text-gray-500 line-through decoration-emerald-500/40 decoration-2'
                        : 'text-gray-800 dark:text-gray-100'
                        }`}>
                        {habit.nama}
                    </span>
                </div>

                {/* Kontrol Aksi */}
                <div className="flex items-center gap-2 shrink-0">

                    {/* Tombol Hapus (Hanya untuk habit custom) */}
                    {/* Tombol Hapus (Sekarang untuk SEMUA habit) */}
                    <button
                        onClick={() => onHapus(habit.id)}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-2xl transition-all duration-300"
                        title="Hapus Habit"
                    >
                        <Trash2 size={18} />
                    </button>

                    {/* Tombol Checklist Utama (Squircle Besar) */}
                    <button
                        onClick={() => onToggle(habit.id, tanggalAktif)}
                        className={`relative w-14 h-14 flex items-center justify-center rounded-[1.25rem] transition-all duration-500 active:scale-90 overflow-hidden ${udahSelesaiHariIni
                            ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:scale-105'
                            : 'bg-gray-50 dark:bg-zinc-800 text-gray-300 dark:text-zinc-600 hover:bg-emerald-50 hover:text-emerald-500 dark:hover:bg-zinc-700 border border-gray-100 dark:border-zinc-700'
                            }`}
                    >
                        {/* Efek Kilauan (Shimmer) saat selesai */}
                        {udahSelesaiHariIni && (
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1.5s_infinite] skew-x-12"></div>
                        )}
                        <Check size={28} strokeWidth={udahSelesaiHariIni ? 3 : 2} className="relative z-10" />
                    </button>
                </div>
            </div>

            {/* Tracker 7 Hari Sederhana (Pil Vertikal) */}
            <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 relative z-10">
                <div className="flex justify-between items-center gap-1">
                    {tujuhHariTerakhir.map((tgl) => {
                        const selesai = habit.riwayatSelesai.includes(tgl);
                        const hariIni = tgl === tanggalAktif;

                        return (
                            <div key={tgl} className="flex flex-col items-center gap-1.5 flex-1">
                                <span className={`text-[9px] uppercase font-bold tracking-wider ${hariIni ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'
                                    }`}>
                                    {formatHariSingkat(tgl)}
                                </span>

                                <div
                                    className={`w-full max-w-[32px] h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${selesai
                                        ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 shadow-sm'
                                        : hariIni
                                            ? 'bg-white dark:bg-zinc-900 border-2 border-dashed border-emerald-300 dark:border-emerald-800/60'
                                            : 'bg-gray-50 dark:bg-zinc-800/50 text-transparent border border-gray-100 dark:border-zinc-800/80'
                                        }`}
                                >
                                    {selesai && <Check size={14} strokeWidth={3} />}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}