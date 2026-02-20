// app/statistics/page.tsx
// app/statistics/page.tsx
'use client';

import { useStatistics } from '@/features/statistics/hooks/useStatistics';
import { useHabits } from '@/features/habits/hooks/useHabits';
import RingkasanStatistik from '@/features/statistics/components/StatsOverview';
import KartuProgress from '@/features/statistics/components/ProgressCard';
import GrafikPenyelesaian from '@/features/statistics/components/CompletionChart';

export default function HalamanStatistik() {
    const { dataStatistik, sudahDimuat } = useStatistics();
    const { daftarHabit } = useHabits(); // Dipanggil khusus untuk di-passing ke chart

    if (!sudahDimuat) return null; // Akan di-handle oleh loading.tsx

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Statistik</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pantau perkembangan ibadahmu</p>
            </div>

            <RingkasanStatistik data={dataStatistik} />

            <KartuProgress konsistensi30Hari={dataStatistik.konsistensi30Hari} />

            <GrafikPenyelesaian daftarHabit={daftarHabit} />
        </div>
    );
}