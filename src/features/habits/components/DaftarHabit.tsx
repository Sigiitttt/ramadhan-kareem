// features/habits/components/DaftarHabit.tsx
import { ListChecks, Sparkles, Layers } from 'lucide-react';
import { DataHabit } from '../types';
import KartuHabit from './HabitCard';

interface PropsDaftarHabit {
    daftarHabit: DataHabit[];
    tanggalAktif: string;
    onToggle: (id: string, tanggal: string) => void;
    onHapus: (id: string) => void;
}

export default function DaftarHabit({ daftarHabit, tanggalAktif, onToggle, onHapus }: PropsDaftarHabit) {

    // 1. Tampilan Jika Belum Ada Habit (Empty State)
    if (daftarHabit.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-50 dark:bg-zinc-900/50 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-zinc-800 mt-4 relative overflow-hidden group hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                {/* Dekorasi Latar Belakang */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent dark:from-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 p-5 bg-white dark:bg-zinc-800 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-5 group-hover:scale-110 transition-transform duration-300">
                    <ListChecks size={48} className="text-emerald-500 dark:text-emerald-400" strokeWidth={1.5} />
                    {/* Ikon Sparkles kecil berkedip */}
                    <Sparkles size={24} className="absolute -top-2 -right-2 text-yellow-400 animate-pulse" />
                </div>

                <h3 className="relative z-10 font-bold text-xl text-gray-800 dark:text-gray-100 mb-2">
                    Masih Kosong, Nih!
                </h3>
                <p className="relative z-10 text-gray-500 dark:text-gray-400 text-sm max-w-xs leading-relaxed mb-4">
                    Yuk mulai bangun kebiasaan baik pertamamu. Sedikit demi sedikit lama-lama menjadi bukit! ✨
                </p>

                <p className="relative z-10 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full animate-bounce delay-1000">
                    Klik tombol tambah di bawah 👇
                </p>
            </div>
        );
    }

    // 2. Tampilan Daftar Habit
    return (
        <div className="flex flex-col mt-6 relative">
            {/* Header Kecil Daftar */}
            <div className="flex items-center justify-between px-1 mb-4">
                <div className="flex items-center gap-2">
                    <Layers size={18} className="text-emerald-600 dark:text-emerald-400" />
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-base">
                        Rutinitas Harian
                    </h3>
                </div>
                {/* Badge Jumlah Habit */}
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full">
                    {daftarHabit.length} Aktivitas
                </span>
            </div>

            {/* List Kartu dengan Jarak Lebih Lega */}
            <div className="flex flex-col gap-3 pb-6 relative z-10">
                {daftarHabit.map((habit, index) => (
                    // Tambahkan animasi masuk (fade-in slide-up) staggered berdasarkan index
                    <div
                        key={habit.id}
                        className="animate-in fade-in slide-in-from-bottom-3 duration-500 fill-mode-backwards"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <KartuHabit
                            habit={habit}
                            tanggalAktif={tanggalAktif}
                            onToggle={onToggle}
                            onHapus={onHapus}
                        />
                    </div>
                ))}
            </div>

            {/* Dekorasi Blur di Belakang List agar terlihat menyatu */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-3/4 bg-emerald-400/5 dark:bg-emerald-500/5 blur-3xl -z-10 pointer-events-none rounded-full"></div>
        </div>
    );
}