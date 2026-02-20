// features/prayer/components/PrayerCountdown.tsx
// features/prayer/components/PrayerCountdown.tsx
'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { InfoSholatBerikutnya } from '../types';
import { formatHitungMundur } from '../utils/prayerFormatter';

interface PropsCountdown {
    berikutnya: InfoSholatBerikutnya | null;
}

export default function PrayerCountdown({ berikutnya }: PropsCountdown) {
    const [sisaWaktu, setSisaWaktu] = useState<number>(berikutnya?.sisaWaktuMs || 0);

    useEffect(() => {
        if (!berikutnya) return;

        setSisaWaktu(berikutnya.sisaWaktuMs);

        const interval = setInterval(() => {
            setSisaWaktu((prev) => {
                if (prev <= 1000) {
                    clearInterval(interval);
                    return 0; // Waktu habis (saatnya Adzan)
                }
                return prev - 1000;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [berikutnya]);

    if (!berikutnya) {
        return (
            <div className="bg-emerald-600 rounded-2xl p-5 text-white shadow-md text-center">
                <p className="font-medium">Jadwal sholat hari ini telah selesai.</p>
                <p className="text-sm text-emerald-100">Menunggu hari esok...</p>
            </div>
        );
    }

    return (
        <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10">
                <Clock size={120} />
            </div>

            <p className="text-emerald-100 text-sm font-medium mb-1">Menuju Waktu {berikutnya.nama}</p>
            <div className="text-4xl font-black tabular-nums tracking-tight mb-2">
                {formatHitungMundur(sisaWaktu)}
            </div>
            <p className="text-sm font-medium bg-white/20 inline-block px-3 py-1 rounded-full backdrop-blur-sm">
                Pukul {berikutnya.waktu}
            </p>
        </div>
    );
}