// app/tasbih/page.tsx
'use client';

import { useTasbih } from '@/features/tasbih/hooks/useTasbih';
import KonterTasbih from '@/features/tasbih/components/TasbihCounter';
import RiwayatTasbih from '@/features/tasbih/components/TasbihHistory';

export default function HalamanTasbih() {
    const {
        hitunganSaatIni,
        totalHariIni,
        tambahHitungan,
        resetHitungan,
        sudahDimuat
    } = useTasbih();

    if (!sudahDimuat) return null; // Nanti kita buat loading.tsx-nya kalau perlu

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Tasbih Digital</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Hitung dzikir harianmu</p>
            </div>

            <RiwayatTasbih totalHariIni={totalHariIni} />

            <KonterTasbih
                hitungan={hitunganSaatIni}
                onTambah={tambahHitungan}
                onReset={resetHitungan}
            />
        </div>
    );
}