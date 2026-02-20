// app/statistics/page.tsx
'use client';

import { useStatistics } from '@/features/statistics/hooks/useStatistics';
import { useHabits } from '@/features/habits/hooks/useHabits';
import RingkasanStatistik from '@/features/statistics/components/StatsOverview';
import KartuProgress from '@/features/statistics/components/ProgressCard';
import GrafikPenyelesaian from '@/features/statistics/components/CompletionChart';

export default function HalamanStatistik() {
    const { dataStatistik, sudahDimuat } = useStatistics();
    const { daftarHabit } = useHabits();

    if (!sudahDimuat) return null;

    return (
        // Tambahkan pb-28 di sini dan rapikan div terluarnya
        <div className="flex flex-col gap-6 pb-28 min-h-screen">

            {/* Ambient Background (Opsional, bikin keren) */}
            <div className="fixed top-0 left-0 w-full h-72 bg-gradient-to-b from-blue-50/80 to-transparent dark:from-blue-950/20 pointer-events-none -z-10"></div>

            <div className="flex flex-col px-4 pt-6">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Statistik</h2>
                <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400 mt-1">
                    Pantau konsistensi ibadahmu sejak awal
                </p>
            </div>
            <div className="flex flex-col gap-8 px-4">
                <RingkasanStatistik data={dataStatistik} />
                <KartuProgress konsistensi30Hari={dataStatistik.konsistensi30Hari} />
                <GrafikPenyelesaian daftarHabit={daftarHabit} />
            </div>

        </div>
    );
}