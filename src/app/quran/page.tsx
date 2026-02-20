// app/quran/page.tsx
'use client';

import { useQuranTracker } from '@/features/quran/hooks/useQuranTracker';
import KartuProgressQuran from '@/features/quran/components/QuranProgressCard';
import { dapatkanTanggalHariIni } from '@/utils/tanggal';

export default function HalamanQuran() {
    const {
        dataQuran,
        totalJuzTerbaca,
        targetTotalJuz,
        persentaseProgress,
        aturTargetKhatam,
        updateJuzHarian,
        sudahDimuat
    } = useQuranTracker();

    const tanggalHariIni = dapatkanTanggalHariIni();
    // Ambil data bacaan khusus hari ini, default 0
    const bacaanHariIni = dataQuran.riwayatBacaan[tanggalHariIni] || 0;

    if (!sudahDimuat) return null; // Akan di-handle oleh loading.tsx

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col mb-2">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Quran Tracker</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pantau target tilawah harianmu</p>
            </div>

            <KartuProgressQuran
                targetKhatam={dataQuran.targetKhatam}
                totalJuzTerbaca={totalJuzTerbaca}
                targetTotalJuz={targetTotalJuz}
                persentaseProgress={persentaseProgress}
                juzHariIni={bacaanHariIni}
                onUpdateJuz={(tambahan) => updateJuzHarian(tanggalHariIni, tambahan)}
                onUbahTarget={aturTargetKhatam}
            />
        </div>
    );
}