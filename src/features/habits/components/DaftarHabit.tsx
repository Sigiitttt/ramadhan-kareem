// features/habits/components/DaftarHabit.tsx
import { ListChecks, Sparkles, Target, Trophy, CheckCircle2 } from 'lucide-react';
import { DataHabit } from '../types';
import KartuHabit from './HabitCard';

interface PropsDaftarHabit {
    daftarHabit: DataHabit[];
    tanggalAktif: string;
    onToggle: (id: string, tanggal: string) => void;
    onHapus: (id: string) => void;
}

export default function DaftarHabit({ daftarHabit, tanggalAktif, onToggle, onHapus }: PropsDaftarHabit) {

    // Kalkulasi Progress Hari Ini
    const totalHabit = daftarHabit.length;
    const habitSelesai = daftarHabit.filter(h => h.riwayatSelesai.includes(tanggalAktif)).length;
    const persentase = totalHabit > 0 ? Math.round((habitSelesai / totalHabit) * 100) : 0;
    const semuaSelesai = totalHabit > 0 && habitSelesai === totalHabit;

    // 1. Tampilan Jika Belum Ada Habit (Empty State)
    if (totalHabit === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-900/50 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-zinc-800 mt-4 relative overflow-hidden group hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors shadow-sm hover:shadow-xl duration-500">

                {/* Dekorasi Cahaya */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl group-hover:bg-emerald-400/20 transition-colors duration-500 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* Ikon Mengambang (Floating Animation) */}
                <div className="relative z-10 p-5 bg-white dark:bg-zinc-800 rounded-full shadow-[0_10px_40px_rgba(16,185,129,0.15)] mb-6 animate-[bounce_4s_ease-in-out_infinite] border border-gray-50 dark:border-zinc-700">
                    <ListChecks size={56} className="text-emerald-500 dark:text-emerald-400" strokeWidth={1.5} />
                    <Sparkles size={28} className="absolute -top-3 -right-3 text-yellow-400 animate-pulse drop-shadow-md" />
                </div>

                <h3 className="relative z-10 font-black text-2xl text-gray-800 dark:text-gray-100 mb-3 tracking-tight">
                    Masih Kosong, Nih!
                </h3>
                <p className="relative z-10 text-gray-500 dark:text-gray-400 text-sm max-w-[260px] leading-relaxed mb-6">
                    Perjalanan seribu mil dimulai dengan satu langkah. Yuk buat rutinitas pertamamu! ✨
                </p>
            </div>
        );
    }

    // 2. Tampilan Daftar Habit dengan Animasi
    return (
        <div className="flex flex-col mt-4 relative">

            {/* KARTU PROGRESS HARIAN (Fitur Baru!) */}
            <div className={`relative overflow-hidden rounded-3xl p-5 mb-6 transition-all duration-700 animate-in fade-in slide-in-from-top-4 ${semuaSelesai
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-[0_10px_40px_rgba(16,185,129,0.3)] scale-[1.02]'
                    : 'bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm'
                }`}>
                {semuaSelesai && (
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                )}

                <div className="relative z-10 flex justify-between items-end mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-2xl ${semuaSelesai ? 'bg-white/20 text-white backdrop-blur-md shadow-inner' : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400'}`}>
                            {semuaSelesai ? <Trophy size={24} className="animate-bounce" /> : <Target size={24} />}
                        </div>
                        <div>
                            <h3 className={`font-bold text-lg leading-tight ${semuaSelesai ? 'text-white' : 'text-gray-800 dark:text-gray-100'}`}>
                                {semuaSelesai ? 'Alhamdulillah Tuntas!' : 'Progress Hari Ini'}
                            </h3>
                            <p className={`text-xs font-medium ${semuaSelesai ? 'text-emerald-100' : 'text-gray-500 dark:text-gray-400'}`}>
                                {habitSelesai} dari {totalHabit} rutinitas selesai
                            </p>
                        </div>
                    </div>
                    <div className={`text-3xl font-black tracking-tighter ${semuaSelesai ? 'text-white' : 'text-emerald-600 dark:text-emerald-500'}`}>
                        {persentase}%
                    </div>
                </div>

                {/* Progress Bar Dinamis */}
                <div className={`w-full h-3 rounded-full overflow-hidden relative z-10 ${semuaSelesai ? 'bg-black/20 shadow-inner' : 'bg-gray-100 dark:bg-zinc-800'}`}>
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${semuaSelesai ? 'bg-yellow-400' : 'bg-gradient-to-r from-emerald-400 to-teal-500'
                            }`}
                        style={{ width: `${persentase}%` }}
                    >
                        {/* Animasi Shimmer di dalam bar */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite] skew-x-12"></div>
                    </div>
                </div>
            </div>

            {/* HEADER DAFTAR HABIT */}
            <div className="flex items-center justify-between px-2 mb-3">
                <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-gray-400 dark:text-gray-500" />
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm uppercase tracking-wider">
                        Daftar Rutinitas
                    </h3>
                </div>
            </div>

            {/* LIST KARTU HABIT DENGAN STAGGERED ANIMATION */}
            <div className="flex flex-col gap-3 pb-6 relative z-10">
                {daftarHabit.map((habit, index) => {
                    // Menghitung delay berjenjang untuk setiap kartu (50ms, 100ms, 150ms, dst)
                    const delayStyle = { animationDelay: `${index * 80}ms` };

                    return (
                        <div
                            key={habit.id}
                            className="animate-in fade-in slide-in-from-top-4 duration-500 fill-mode-both"
                            style={delayStyle}
                        >
                            <KartuHabit
                                habit={habit}
                                tanggalAktif={tanggalAktif}
                                onToggle={onToggle}
                                onHapus={onHapus}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Dekorasi Latar List */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-emerald-400/5 dark:bg-emerald-500/5 blur-[80px] -z-10 pointer-events-none rounded-full"></div>
        </div>
    );
}