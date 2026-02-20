// app/dashboard/page.tsx
// app/dashboard/page.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useGamification } from '@/features/gamification/hooks/useGamification';
import { usePrayerTimes } from '@/features/prayer/hooks/usePrayerTimes';
import { useHabits } from '@/features/habits/hooks/useHabits';
import { dapatkanTanggalHariIni } from '@/utils/tanggal';

import LencanaLevel from '@/features/gamification/components/LevelBadge';
import PrayerCountdown from '@/features/prayer/components/PrayerCountdown';

export default function HalamanDashboard() {
    const { dataGamifikasi, sudahDimuat: gamifikasiDimuat } = useGamification();
    const { sholatBerikutnya, loading: sholatLoading } = usePrayerTimes();
    const { daftarHabit, sudahDimuat: habitDimuat } = useHabits();

    const sudahDimuat = gamifikasiDimuat && habitDimuat && !sholatLoading;

    if (!sudahDimuat) return null; // Nanti di-handle oleh loading.tsx

    const tanggalHariIni = dapatkanTanggalHariIni();
    const habitSelesaiHariIni = daftarHabit.filter(h => h.riwayatSelesai.includes(tanggalHariIni)).length;
    const totalHabit = daftarHabit.length;

    return (
        <div className="flex flex-col gap-6 pb-6">
            {/* Header Sapaan */}
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ringkasan ibadahmu hari ini, {tanggalHariIni}
                </p>
            </div>

            {/* 1. Gamifikasi Level (Menggunakan komponen dari Fase 6) */}
            <LencanaLevel data={dataGamifikasi} />

            {/* 2. Jadwal Sholat Berikutnya (Menggunakan komponen dari Fase 4) */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end px-1">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">Sholat Berikutnya</h3>
                    <Link href="/prayer" className="text-xs font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        Lihat Jadwal <ArrowRight size={12} />
                    </Link>
                </div>
                <PrayerCountdown berikutnya={sholatBerikutnya} />
            </div>

            {/* 3. Ringkasan Habit Hari Ini */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end px-1">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">Aktivitas Hari Ini</h3>
                    <Link href="/habits" className="text-xs font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        Buka Tracker <ArrowRight size={12} />
                    </Link>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                            <CheckCircle2 size={24} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-800 dark:text-gray-100 text-lg">
                                {habitSelesaiHariIni} / {totalHabit}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Habit selesai hari ini</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                            {totalHabit > 0 ? Math.round((habitSelesaiHariIni / totalHabit) * 100) : 0}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}