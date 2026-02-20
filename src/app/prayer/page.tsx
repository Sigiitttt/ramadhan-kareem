// app/prayer/page.tsx
'use client';

import { usePrayerTimes } from '@/features/prayer/hooks/usePrayerTimes';
import PrayerCountdown from '@/features/prayer/components/PrayerCountdown';
import PrayerCard from '@/features/prayer/components/PrayerCard';
import KompasKiblat from '@/features/prayer/components/QiblaCompass';
import LoadingPrayer from './loading'; 

export default function HalamanPrayer() {
    const { jadwal, sholatBerikutnya, loading, error } = usePrayerTimes();

    if (loading) {
        return <LoadingPrayer />;
    }

    if (error || !jadwal) {
        return <div className="p-4 text-center text-red-500 bg-red-50 rounded-xl">{error || 'Terjadi kesalahan'}</div>;
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Jadwal Sholat & Kiblat</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Waktu zona {jadwal.meta.timezone.replace('_', ' ')}
                </p>
            </div>

            <PrayerCountdown berikutnya={sholatBerikutnya} />
            <KompasKiblat />
            <PrayerCard jadwal={jadwal.timings} sholatBerikutnya={sholatBerikutnya?.nama} />
        </div>
    );
}